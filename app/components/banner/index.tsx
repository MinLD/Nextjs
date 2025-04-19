"use client";
import { signOut } from "next-auth/react";
type porps = {
  session: {
    user: {
      email: string;
      name: string;
      _id: string;
      access_token: string;
      id: string;
    };
    expires: string;
  };
};
function Banner({ session }: porps) {
  console.log("🔑 session:", session);
  return (
    <div>
      <div>{session?.user?.email}</div>
      <div>{session?.user?.name}</div>
      {session?.user?.id && <button onClick={() => signOut()}>Logout</button>}

      <div>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Harum enim
        accusamus consectetur dolore voluptatibus sapiente nostrum velit eum,
        explicabo vel odit repudiandae rerum molestias! Iusto incidunt officiis
        accusamus numquam odio?
      </div>
      <div>đấ</div>
    </div>
  );
}

export default Banner;
