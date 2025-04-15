import RegisterProtect from "@/components/RouteProtect/RegisterProtect";
import LoginForm from "@/components/LoginForm/LoginForm";
import React from "react";

export default function LoginPage() {
  return (
    <RegisterProtect>
      <LoginForm />
    </RegisterProtect>
  );
}
