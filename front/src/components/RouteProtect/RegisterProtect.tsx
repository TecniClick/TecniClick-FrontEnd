/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { redirect } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";
import LoadingSkeleton from "../LoadingSkeleton/LoadingSkeleton";
import { useAuth } from "@/contexts/authContext";

const RegisterProtect = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();

  const [is_client, set_is_client] = useState(false);

  useEffect(() => {
    if (user) { redirect("/dashboard") }
    if (!is_client) { set_is_client(true) }
  });

  useEffect(() => {
    if (user) { redirect("/dashboard") }
  }, [user]);

  if (!is_client) return <LoadingSkeleton />;
  else return <>{children}</>;
};

export default RegisterProtect;
