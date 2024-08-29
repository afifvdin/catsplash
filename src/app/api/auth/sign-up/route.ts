import { db } from "@/drizzle/db"
import { lucia } from "@/drizzle/lucia"
import { usersTable } from "@/drizzle/schema"
import { hash } from "@node-rs/argon2"
import { generateId } from "lucia"
import { cookies } from "next/headers"
import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"

export async function POST(req: NextRequest) {
  const data: {
    name: string
    email: string
    password: string
    confirmPassword: string
  } = await req.json()

  if (data.password !== data.confirmPassword) {
    return NextResponse.json(
      {
        ok: false,
        errors: {
          confirmPassword: "Confirmation password should match",
        },
      },
      { status: 400 }
    )
  }

  const schema = z.object({
    name: z.string().min(1),
    email: z.string().min(1).email(),
    password: z.string().min(8),
    confirmPassword: z.string().min(8),
  })

  const validation = schema.safeParse({
    name: data.name,
    email: data.email,
    password: data.password,
    confirmPassword: data.confirmPassword,
  })

  if (!validation.success) {
    return NextResponse.json(
      {
        ok: false,
        errors: validation.error.flatten().fieldErrors,
      },
      { status: 400 }
    )
  }

  const { name, email, password } = validation.data

  const passwordHashed = await hash(password, {
    memoryCost: 19456,
    timeCost: 2,
    outputLen: 32,
    parallelism: 1,
  })
  const userId = generateId(15)

  const user = await db.insert(usersTable).values({
    id: userId,
    name,
    email,
    password: passwordHashed,
  })

  const session = await lucia.createSession(userId, {})
  const sessionCookie = lucia.createSessionCookie(session.id)

  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  )

  return NextResponse.json(
    {
      ok: true,
    },
    { status: 200 }
  )
}
