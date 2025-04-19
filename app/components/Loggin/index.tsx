"use client";
import Layout from "@/app/components/Layout/layout";
import { useState } from "react";

import { authenticate } from "@/app/(util)/actions";
import { useRouter } from "next/navigation";
type Form = {
  label: string;
  type: string;
  name: string;
};
type formData = {
  email: string;
  password: string;
};
function Login() {
  const Router = useRouter();
  const data: Form[] = [
    {
      label: "Email: ",
      type: "email",
      name: "email",
    },
    {
      label: "Password: ",
      type: "password",
      name: "password",
    },
  ];
  const [formData, setFormData] = useState<formData>({
    email: "",
    password: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleLoggin = async () => {
    const { email, password } = formData;
    await authenticate(email, password)
      .then((res) => console.log(res))
      .catch((err) => {
        console.log("a:", err);
      });
  
  };
  return (
    <div className="flex items-center justify-center">
      <Layout>
        <div className="flex justify-center items-center w-[600px] h-[400px]  mt-10">
          <div className="flex flex-col p-4 rounded-2xl border-2 w-full ">
            <h1 className=" text-center">Loggin</h1>
            <div className="space-y-4">
              {data.map((i, index) => (
                <div className="flex flex-col gap-2" key={index}>
                  <label htmlFor="">
                    <span className="text-red-500">*</span> {i.label}
                  </label>
                  <input
                    type={i.type}
                    className="border-2 rounded-2xl pl-2 p-2 "
                    onChange={handleChange}
                    name={i.name}
                  />
                </div>
              ))}
            </div>
            <button
              className="bg-amber-200 p-2 rounded-2xl mt-5"
              onClick={() => handleLoggin()}
            >
              Loggin
            </button>
          </div>
        </div>
      </Layout>
    </div>
  );
}

export default Login;
