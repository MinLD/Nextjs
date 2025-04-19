"use client";

import { useRouter } from "next/navigation";

function Header() {
  const Router = useRouter();
  return (
    <div>
      <div className="w-full h-10 bg-amber-200 px-10 flex justify-center items-center">
        <div className="flex justify-between w-full max-w-screen-lg">
          <div onClick={() => Router.push("/")}>Home</div>
          <div onClick={() => Router.push("/auth/login")}>Login</div>
          <div onClick={() => Router.push("/auth/Register")}>Register</div>
        </div>
      </div>
    </div>
  );
}

export default Header;
