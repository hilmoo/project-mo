import { Outlet } from "@remix-run/react";
import { useMemo, memo } from "react";
import { Footer } from "./Footer";
import { Header } from "./Header";

const MemoizedHeader = memo(Header);
const MemoizedFooter = memo(Footer);

export default function Infolomba() {
  const header = useMemo(() => <MemoizedHeader />, []);
  const footer = useMemo(() => <MemoizedFooter />, []);

  return (
    <>
      {header}
      <div className="content">
        <Outlet />
      </div>
      {footer}
    </>
  );
}
