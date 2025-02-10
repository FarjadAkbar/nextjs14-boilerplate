import React from "react";
import "./Button.scss";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline";
  loading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "default",
  loading = false,
  ...props
}) => (
  <button className={`button ${variant}`} disabled={loading || props.disabled} {...props}>
    {loading && <span className="loader animate-spin"></span>}
    {children}
  </button>
);
