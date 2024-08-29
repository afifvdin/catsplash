import { AuthError, SignInForm, SignUpForm } from "@/types/auth"
import { useMutation } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { signIn, signUp } from "./apis"

export function useSignUp() {
  return useMutation({
    mutationKey: ["signUp"],
    mutationFn: (data: SignUpForm) => signUp(data),
    onError: (error: AxiosError<AuthError>) => {
      console.log(error)
    },
  })
}
export function useSignIn() {
  return useMutation({
    mutationKey: ["signIn"],
    mutationFn: (data: SignInForm) => signIn(data),
    onError: (error: AxiosError<AuthError>) => {},
  })
}
