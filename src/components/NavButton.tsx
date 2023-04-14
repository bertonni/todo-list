import React, { ReactNode } from "react";

interface NavButtonProps {
  isActive: boolean;
  icon?: ReactNode;
  action: (value?: any) => void;
  title: string;
}

export const NavButton = ({
  isActive,
  title,
  icon = null,
  action,
}: NavButtonProps) => {
  const activeClass = "bg-gray-100";

  return (
    <button
      className={`px-6 pl-4 font-medium hover:bg-gray-200 py-2
        rounded-full flex items-center gap-2 transition-all
        ${isActive ? activeClass : ""}`}
      onClick={action}
    >
      {icon} {title}
    </button>
  );
};
