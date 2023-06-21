import React from "react";

interface BadgeProps {
  value: number;
}

export const Badge = ({ value }: BadgeProps) => {
  return (
    <div className="rounded-full bg-indigo-500 w-fit p-1 min-w-[1.5rem]
      text-xs text-white">
      {value}
    </div>
  );
};
