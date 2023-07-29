"use client";

import { SessionProvider } from "next-auth/react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
type Props = {
  children?: React.ReactNode;
};
const queryClient = new QueryClient();
export const NextAuthProvider = ({ children }: Props) => {
  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider>{children}</SessionProvider>
    </QueryClientProvider>
  );
};
