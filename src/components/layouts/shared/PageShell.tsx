import type { ReactElement, ReactNode } from "react";
import FooterSekolah from "../home/footerSection";

interface PageShellProps {
  children: ReactNode;
}

export default function PageShell({ children }: PageShellProps): ReactElement {
  return (
    <>
      <main className="bg-white font-cabinet">{children}</main>
      <FooterSekolah />
    </>
  );
}
