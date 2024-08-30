"use client"

import Link from "next/link"

import React from "react"
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
import { useRouter } from "next/navigation"
import { FormEvent, useEffect, useState } from "react"
import { useSignUp } from "@/services/mutations"
import ErrorLine from "@/components/custom-ui/error-line"

export default function SignUpPage() {
  const router = useRouter()
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const { mutate: signUp, error, isPending, isIdle, isSuccess } = useSignUp()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    signUp(form)
  }

  useEffect(() => {
    if (!isSuccess) return
    router.push("/")
  }, [isSuccess, router])

  return (
    <div className="min-h-full flex flex-col items-center justify-center">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Sign Up</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  value={form.name}
                  onChange={handleChange}
                  name="name"
                  id="name"
                  placeholder="Your name"
                  required
                />
                {error?.response?.data.errors!.name && (
                  <ErrorLine>{error.response.data.errors.name}</ErrorLine>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  value={form.email}
                  onChange={handleChange}
                  name="email"
                  id="email"
                  type="email"
                  placeholder="john@example.com"
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
              <div className="grid gap-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  value={form.confirmPassword}
                  onChange={handleChange}
                  name="confirmPassword"
                  id="confirmPassword"
                  type="password"
                  placeholder="********"
                  required
                />
                {error?.response?.data.errors!.confirmPassword && (
                  <ErrorLine>
                    {error.response.data.errors.confirmPassword}
                  </ErrorLine>
                )}
              </div>
              <Button disabled={isPending} type="submit" className="w-full">
                {isPending && !isIdle ? "Submitting..." : "Sign Up"}
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Already have an account?{" "}
              <Link href="/auth/sign-in" className="underline">
                Sign in
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
