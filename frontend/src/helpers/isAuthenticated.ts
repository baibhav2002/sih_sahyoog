import { cookies } from "next/headers";

export const isAuthenticated = () => {
  const token: string = cookies()?.get("sambandh_token")?.value || "";
  if (token?.length > 0) return true as boolean;
  return false as boolean;
};
