"use client"
import * as React from "react";
import { cn } from "@/lib/utils";
import { EyeIcon, EyeOffIcon } from "lucide-react"
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);

    const togglePasswordVisibility = () => {
      setShowPassword((prevShowPassword) => !prevShowPassword);
    };

    return (
      <div className="relative">
        <input
          type={showPassword ? "text" : type} // Show plain text if showPassword is true
          className={cn(
            "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          ref={ref}
          {...props}
        />
        {type === "password" && (
          <button
            type="button"
            className="absolute inset-y-0 right-0 flex items-center px-3"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? 
            <EyeIcon
            className="h-4 w-4"
            aria-hidden="true"
          />
           : <EyeOffIcon
              className="h-4 w-4"
              aria-hidden="true"
            />}
          </button>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
