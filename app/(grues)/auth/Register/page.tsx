"use client";
import Layout from "@/app/components/Layout/layout";
import { useState } from "react";

import { authenticate } from "@/app/(util)/actions";
import { useRouter } from "next/navigation";
import { sendRequest } from "@/app/(util)/api";
type Form = {
  label: string;
  type: string;
  name: string;
};
type formData = {
  email: string;
  password: string;
  name: string;
};
function Register() {
  const Router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
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
    {
      label: "Name: ",
      type: "text",
      name: "name",
    },
  ];
  const [formData, setFormData] = useState<formData>({
    email: "",
    password: "",
    name: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleLoggin = async () => {
    const { email, password, name } = formData;
    setLoading(true);
    const res = await sendRequest<IBackendRes<any>>({
      method: "POST",
      body: {
        email: email,
        password: password,
        name: name,
      },
      url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/register`,
    });
    console.log("res", res);
    if (res?.data) {
      Router.push(`/verify/${res?.data?._id}`);
      setLoading(false);
    } else {
      console.log(res);
      setError(res?.message);
      setLoading(false);
    }
  };
  return (
    <div className="flex items-center justify-center">
      <Layout>
        <div className="flex justify-center items-center w-[600px] h-[400px]  mt-10">
          <div className="flex flex-col p-4 rounded-2xl border-2 w-full ">
            <h1 className=" text-center">Register</h1>
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
              {loading ? "Loading..." : "Register"}
            </button>
            <div className="text-red-500 ">{error} </div>
          </div>
        </div>
      </Layout>
    </div>
  );
}

export default Register;
