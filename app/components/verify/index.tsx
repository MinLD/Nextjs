"use client";
import { sendRequest } from "@/app/(util)/api";
import { useState } from "react";
type props = {
  _id: string;
};
function Verify({ _id }: props) {
  const [code, setCode] = useState<string>("");

  console.log(_id);
  const HandleActiveAcount = async () => {
    const res = await sendRequest<IBackendRes<any>>({
      method: "POST",
      url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/check-code`,
      body: {
        _id: _id,
        code: code,
      },
    });
    console.log(res);
  };
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor="">Nhập Code</label>
      <input
        className="border border-black rounded-2xl max-w-lg pl-2 p-2"
        type="text"
        name=""
        id=""
        onChange={(e) => setCode(e.target.value)}
      />
      <button
        onClick={HandleActiveAcount}
        className="bg-amber-200 rounded-2xl max-w-md p-2"
      >
        Gửi
      </button>
    </div>
  );
}

export default Verify;
