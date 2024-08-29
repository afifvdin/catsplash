import { db } from "@/drizzle/db"
import { lucia } from "@/drizzle/lucia"
import { verify } from "@node-rs/argon2"
import { cookies } from "next/headers"
import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"

export async function POST(req: NextRequest) {
  const data: {
    email: string
    password: string
  } = await req.json()

  const schema = z.object({
    email: z.string().min(1).email(),
    password: z.string().min(8),
  })

  const validation = schema.safeParse({
    email: data.email,
    password: data.password,
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

  const { email, password } = validation.data

  const user = await db.query.usersTable.findFirst({
    where: (users, { eq }) => eq(users.email, email),
  })

  if (!user) {
    return NextResponse.json(
      {
        ok: false,
        errors: {
          email: "Incorect email or password",
          password: "Incorect email or password",
        },
      },
      { status: 400 }
    )
  }

  const validPassword = await verify(password, user.password, {
    memoryCost: 19456,
    timeCost: 2,
    outputLen: 32,
    parallelism: 1,
  })
  if (!validPassword) {
    return NextResponse.json(
      {
        ok: false,
        errors: {
          email: "Incorect email or password",
          password: "Incorect email or password",
        },
      },
      { status: 400 }
    )
  }

  const session = await lucia.createSession(user.id, {})
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
