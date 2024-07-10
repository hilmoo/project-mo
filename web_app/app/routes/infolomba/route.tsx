import { Outlet } from "@remix-run/react";
import { Header } from "./Header";
import { Footer } from "./Footer";

export default function infolomba() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}
