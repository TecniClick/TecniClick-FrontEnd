/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";
import LoadingSkeleton from "../LoadingSkeleton/LoadingSkeleton";
import { useAuth } from "@/contexts/authContext";

const RouteProtect = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push("/login");
    }
  }, [loading, isAuthenticated]);

  if (!isClient || loading) {
    return <LoadingSkeleton />;
  }

  if (isAuthenticated) {
    return <>{children}</>;
  }

  return null;
};

export default RouteProtect;
