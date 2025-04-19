"use server";
import { signIn } from "@/auth"; // Nhớ kỹ nha dmmm luân
export async function authenticate(email: string, password: string) {
  try {
    const r = await signIn("credentials", {
      username: email,
      password: password,
      // callbackUrl: "/",
      redirect: false,
    });
    console.log(">>> check r: ", r);
    return r;
  } catch (error) {
    console.log(">>> check error: ", error);
    if ((error as any).name === "InvalidEmailPasswordError") {
      return {
        error: (error as any).type,
        code: 1,
      };
    } else if ((error as any).name === "InactiveAccountError") {
      return {
        error: (error as any).type,
        code: 2,
      };
    } else {
      return {
        error: "Internal server error",
        code: 0,
      };
    }
  }
}
