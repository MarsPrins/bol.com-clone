"use client";
import { redirect } from "next/navigation";
import Cookies from "js-cookie";

function page() {
  Cookies.remove("token", { path: "/" });
  console.log(Cookies.get("token"));
  window.location.href = "/";
  redirect("/");
}

export default page;
