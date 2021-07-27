import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import * as crypto from "crypto-js";

import { CRYPTO_SECRET_KEY } from "../src/utils/constants";
import useTokens from "../src/utils/useTokens";

function QrScan() {
  const { isLoggedIn } = useTokens();
  const router = useRouter();
  const [amount, setAmount] = useState(0);
  const onAmountChange = (e) => {
    setAmount(parseInt(e.target.value));
  };
  const QrReader = dynamic(() => import("react-qr-reader"), { ssr: false });

  const handleScan = (data: any) => {
    if (data) {
      /* Decrypt QR code data */
      const bytes = crypto.AES.decrypt(data, CRYPTO_SECRET_KEY);
      const decryptedData = JSON.parse(bytes.toString(crypto.enc.Utf8));

      const result = { ...decryptedData, amount };
      router.push({
        pathname: "/qr-read",
        query: { ...result },
      });
    }
  };

  const handleError = (err: any) => {
    console.error(err);
  };

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/");
    }
  }, []);

  return (
    <div className="max-w-screen-xl mx-auto w-full flex flex-col items-center">
      <div className="flex flex-col items-center my-5 md:m-5 w-full">
        <div className="text-3xl md:text-5xl font-bold mb-5 text-gray-600">QR 인식 (매장용)</div>
        <div className="font-bold mb-5 text-gray-600 mb-6">결제할 금액을 입력 후 QR을 인식해주세요.</div>
        <form className="w-full items-center flex flex-col" onSubmit={(e) => e.preventDefault()}>
          <label className="flex flex-col flex-shrink-0 mb-5">
            <div className="flex flex-row items-center whitespace-nowrap">
              <p className="w-24 font-bold">금액</p>
              <input
                className="p-1 rounded-md border-2 border-gray-500"
                type="number"
                placeholder="금액"
                onChange={onAmountChange}
                value={amount}
              />
            </div>
          </label>
          <QrReader className="w-full md:w-2/3 lg:w-1/2" delay={300} onError={handleError} onScan={handleScan} />
        </form>
      </div>
    </div>
  );
}

export default QrScan;
