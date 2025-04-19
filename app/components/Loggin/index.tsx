"use client";
import Layout from "@/app/components/Layout/layout";
import { useEffect, useState } from "react";

import { authenticate } from "@/app/(util)/actions";
import { useRouter } from "next/navigation";
import Verify from "@/app/components/verify";
import { sendRequest } from "@/app/(util)/api";
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
  const [isShowVerify, setIsShowVerify] = useState(false);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleLoggin = async () => {
    const { email, password } = formData;
    const res = await authenticate(email, password);
    await console.log(res);
    if (res?.error) {
      console.log(res);
      if (res?.code === 2) {
        setIsShowVerify(true);
      }
    } else {
      Router.push("/");
    }
  };
  const [isShowVerify1, setIsShowVerify1] = useState<string>("");

  const handleResendCode = async () => {
    const { email } = formData;
    const res = await sendRequest<IBackendRes<any>>({
      method: "POST",
      url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/resend-code`,
      body: {
        email: email,
      },
    });
    console.log(res);
    if (res?.data?._id) {
      setIsShowVerify1(res?.data?._id);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <Layout>
        {isShowVerify}
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
      {isShowVerify && (
        <div>
          <div className="w-full h-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-yellow-950 opacity-50"></div>
          <div className="bg-white shadow-2xl rounded-2xl p-2 z-[99999] w-[600px] h-[400px] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ">
            <div className="relative">
              <h1 className="text-center absolute top-2 right-2 bg-amber-100 p-2 rounded-2xl">
                X
              </h1>
              {isShowVerify1 ? (
                <Verify _id={isShowVerify1} />
              ) : (
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={formData?.email}
                    className="border rounded-2xl pl-2 p-2 max-w-[300px] w-full"
                    disabled
                  />
                  <button
                    className="border p-2  rounded-2xl pl-2 hover:text-amber-100"
                    onClick={handleResendCode}
                  >
                    {" "}
                    Resend codde
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Login;
