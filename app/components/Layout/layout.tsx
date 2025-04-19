
import React from "react";

function Layout({ children }: React.PropsWithChildren) {
  return <div className="mx-auto max-w-[90vw] min-h-screen">{children}</div>;
}

export default Layout;
