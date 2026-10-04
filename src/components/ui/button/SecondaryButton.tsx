import type { ReactElement, ReactNode } from "react";

interface SecondaryButtonProps {
  readonly href: string;
  readonly children: ReactNode;
}

export default function SecondaryButton({
  href,
  children,
}: SecondaryButtonProps): ReactElement {
  return (
    <a
      href={href}
      className="inline-flex items-center justify-center rounded-full bg-white px-7 py-3.5 text-base font-bold text-gray-700 border border-gray-200 hover:border-blue-600 hover:text-blue-600 transition-all duration-200 active:scale-95"
    >
      <span>{children}</span>
    </a>
  );
}