"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ThemeProvider } from "next-themes";
import { useState } from "react";
import { Toaster } from "../ui/sonner";
export function AppProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1000 * 60 * 5, // Dữ liệu được coi là "fresh" trong 5 phút, không tự refetch trong khoảng thời gian này.
            gcTime: 1000 * 60 * 10, // Giữ cache trong 10 phút sau khi không còn component nào sử dụng. Hết thời gian sẽ bị xóa khỏi cache.
            retry: 2, // Nếu request thất bại, thử lại tối đa 2 lần trước khi báo lỗi.
            refetchOnWindowFocus: false, // Không tự gọi lại API khi người dùng chuyển sang tab khác rồi quay lại.
            refetchOnMount: true, // Khi component mount lại, nếu dữ liệu đã stale thì tự refetch.
            refetchOnReconnect: true, // Khi thiết bị mất mạng rồi có mạng lại, nếu dữ liệu stale thì tự refetch.
          },
          mutations: {
            retry: false, // Mutation (POST, PUT, DELETE...) nếu thất bại thì không tự thử lại.
          },
        },
      }),
  );
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <Toaster />
        {children}
      </ThemeProvider>
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </QueryClientProvider>
  );
}
