"use client";

import useApiUrl from "@/components/apiUrl";
import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

function Page({ params }) {
  const [receipt, setReceipt] = useState({});
  const apiUrl = useApiUrl();
  const userId = params.id;

  const fetchReceipt = async () => {
    const res = await axios.get(`${apiUrl}/orders/find/${userId}`, {
      headers: { token: Cookies.get("token") },
    });
    setReceipt(res.data);
  };
  useEffect(() => {
    fetchReceipt();
  }, []);
  return (
    <>
      <div>successfully ordered!</div>
      {/* <div>{receipt && JSON.stringify(receipt, null, 2)}</div> */}
    </>
  );
}

export default Page;
