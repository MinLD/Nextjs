import { signIn } from "next-auth/react";
export async function authenticate(email: string, password: string) {
  const res = await signIn("credentials", {
    email,
    password,
    redirect: false, // quan trọng: để tự xử lý lỗi
  });

  if (res?.error) {
    console.log("❌ Error:", res.error); // đây sẽ là "Email hoặc mật khẩu không đúng"
    // bạn có thể lưu vào state và hiện ra giao diện
  } else {
    // đăng nhập thành công, chuyển trang
    // router.push("/");
    console.log("✅ Success:", res);
    return res;
  }
  // try {
  //   const r = await signIn("credentials", {
  //     email: email,
  //     password: password,
  //     redirect: false,
  //   });
  //   console.log(">>>> Check r", r);
  //   return r;
  // } catch (error) {
  //   if ((error as any).name === "InvalidEmailPasswordError") {
  //     return {
  //       error: (error as any).type,
  //       code: 1,
  //     };
  //   } else if ((error as any).name === "InactiveAccountError") {
  //     return {
  //       error: (error as any).type,
  //       code: 2,
  //     };
  //   } else {
  //     return {
  //       error: "Internal server error",
  //       code: 0,
  //     };
  //   }
  // }
}
