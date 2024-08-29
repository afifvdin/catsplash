import { SignInForm, SignUpForm } from "@/types/auth"
import axios from "axios"

export const signUp = async (data: SignUpForm) => {
  return (await axios.post("/api/auth/sign-up", data)).data
}

export const signIn = async (data: SignInForm) => {
  return (await axios.post("/api/auth/sign-in", data)).data
}
