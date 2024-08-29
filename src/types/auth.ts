export interface AuthError {
  ok: boolean
  errors: {
    [key: string]: string
  }
}

export interface SignUpForm {
  name: string
  email: string
  password: string
  confirmPassword: string
}

export interface SignInForm {
  email: string
  password: string
}
