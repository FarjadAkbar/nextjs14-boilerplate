import React from "react";
import "./Label.scss";

interface LabelProps {
  htmlFor: string;
  children: React.ReactNode;
  isError?: boolean;
}

export const Label = ({ htmlFor, children, isError }: LabelProps) => (
  <label htmlFor={htmlFor} className={`label ${isError ? "error" : ""}`}>
    {children}
  </label>
);
