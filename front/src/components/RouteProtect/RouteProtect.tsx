/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useAuth } from "@/contexts/authContext";
import { redirect } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";
import LoadingSkeleton from "../LoadingSkeleton/LoadingSkeleton";

const RouteProtect = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();

  const [is_client, set_is_client] = useState(false);

  useEffect(() => {
    if (!user) { redirect("/login") }
    if (!is_client) { set_is_client(true) }
  });

  useEffect(() => {
    if (!user) { redirect("/login") }
  }, [user]);

  if (!is_client) return <LoadingSkeleton />;
  else return <>{children}</>;
};

export default RouteProtect;
