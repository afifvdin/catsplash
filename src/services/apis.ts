import { SignInForm, SignUpForm } from "@/types/auth"
import { Cat, CatTag } from "@/types/cat"
import axios from "axios"

export const signUp = async (data: SignUpForm) => {
  return (await axios.post("/api/auth/sign-up", data)).data
}

export const signIn = async (data: SignInForm) => {
  return (await axios.post("/api/auth/sign-in", data)).data
}

export const getCats = async (page: number, tag: CatTag) => {
  return (
    await axios.get<Cat[]>("https://cataas.com/api/cats", {
      params: {
        skip: 15 * page,
        limit: 15,
        tags: tag,
      },
    })
  ).data
}
