import { Header } from "components/InfoLomba/Header";
import { Outlet } from "react-router-dom";

import { Helmet, HelmetProvider } from "react-helmet-async";

export default function Index() {
  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Info Lomba</title>
        </Helmet>
      </HelmetProvider>
      <Header />
      <Outlet />
    </>
  );
}
