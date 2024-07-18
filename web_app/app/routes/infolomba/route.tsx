import { Outlet } from "@remix-run/react";
import { Footer } from "./Footer";
import { Header } from "./Header";

export default function infolomba() {
  return (
    <>
      <Header />
      <div style={{ minHeight: "75vh" }}>
        <Outlet />
      </div>
      <Footer />
    </>
  );
}
