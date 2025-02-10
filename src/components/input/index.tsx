import type React from "react"
import { forwardRef } from "react"
import type { FieldError } from "react-hook-form"
import "./Input.scss"

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: FieldError
}

export const Input = forwardRef<HTMLInputElement, InputProps>(({ error, ...props }, ref) => (
  <div>
    <input ref={ref} className={`input ${error ? "error" : ""}`} {...props} />
    {error && <p className="error-message">{error.message}</p>}
  </div>
))

Input.displayName = "Input"

