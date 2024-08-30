"use client"

import React from "react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { FormEvent, useEffect, useState } from "react"
import { useSignIn } from "@/services/mutations"
import ErrorLine from "@/components/custom-ui/error-line"
import { useRouter } from "next/navigation"

export default function SignInPage() {
  const router = useRouter()
  const [form, setForm] = useState({
    email: "",
    password: "",
  })
  const { mutate: signIn, error, isPending, isIdle, isSuccess } = useSignIn()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    signIn(form)
  }

  useEffect(() => {
    if (!isSuccess) return
    router.push("/")
  }, [isSuccess, router])

  return (
    <div className="min-h-full flex flex-col items-center justify-center">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Sign in</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  value={form.email}
                  onChange={handleChange}
                  name="email"
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
                {error?.response?.data.errors!.email && (
                  <ErrorLine>{error.response.data.errors.email}</ErrorLine>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  value={form.password}
                  onChange={handleChange}
                  name="password"
                  id="password"
                  type="password"
                  placeholder="********"
                  required
                />
                {error?.response?.data.errors!.password && (
                  <ErrorLine>{error.response.data.errors.password}</ErrorLine>
                )}
              </div>
              <Button disabled={isPending} type="submit" className="w-full">
                {isPending && !isIdle ? "Signing you in..." : "Sign In"}
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link href="/auth/sign-up" className="underline">
                Sign up
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
