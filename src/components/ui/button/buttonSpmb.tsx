import type { ReactElement, ReactNode } from "react";
import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";

interface PrimaryButtonProps {
  readonly to: string;
  readonly children: ReactNode;
  readonly showArrow?: boolean;
}

export default function PrimaryButton({
  to,
  children,
  showArrow = true,
}: PrimaryButtonProps): ReactElement {
  return (
    <Link
      to={to}
      className="inline-flex items-center justify-center gap-2.5 rounded-full bg-blue-600 px-7 py-3.5 text-base font-bold text-white shadow-lg shadow-blue-600/25 hover:bg-blue-700 transition-all duration-200 active:scale-95"
    >
      <span>{children}</span>
      {showArrow && <FiArrowRight className="text-lg" />}
    </Link>
  );
}