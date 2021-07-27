import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { getUser } from "../../services/UserService";
import useTokens from "../../utils/useTokens";
import GiftcardAdmin from "../Giftcard/GiftcardAdmin";
import StoreAdmin from "../Store/StoreAdmin";
import StoreCreate from "../Store/StoreCreate";

function Admin() {
  const { tokens } = useTokens();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState({ id: "", username: "", isManager: true, store: { id: "", name: "" } });

  useEffect(() => {
    (async () => {
      const user = await getUser({ tokens });
      setUser(user);
    })();

    if (tokens && user) {
      setIsLoading(false);

      if (!user.isManager) {
        router.push("/unauthorized");
      }
    }
  }, [tokens, user]);

  return (
    <div className="max-w-screen-xl mx-auto w-full flex flex-col items-center p-4">
      {isLoading ? (
        <div>LOADING...</div>
      ) : (
        <div className="flex flex-col items-center w-full md:w-1/2 p-5 my-5 rounded-md border-2 border-gray-500">
          <h1 className="pb-5 text-xl font-bold">관리자 페이지</h1>
          <div className="flex flex-col w-full space-y-3">
            <StoreCreate />
            <StoreAdmin />
            <GiftcardAdmin />
          </div>
        </div>
      )}
    </div>
  );
}

export default Admin;
