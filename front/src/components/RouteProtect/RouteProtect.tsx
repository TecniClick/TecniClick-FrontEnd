/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";
import LoadingSkeleton from "../LoadingSkeleton/LoadingSkeleton";

const RouteProtect = ({ children }: { children: ReactNode }) => {
  const { status } = useSession();
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  if (!isClient || status === "loading") {
    return <LoadingSkeleton />;
  }

  if (status === "authenticated") {
    return <>{children}</>;
  }

  return null; // Esto evita que se renderice algo innecesariamente
};

export default RouteProtect;

