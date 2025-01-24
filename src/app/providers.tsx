import GlobalProvider from "@/providers/globalProvider";

export function Providers({ children }: { children: React.ReactNode }) {
  return <GlobalProvider>{children}</GlobalProvider>;
}
