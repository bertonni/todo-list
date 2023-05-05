interface BagdeProps {
  size?: "xs" | "sm" | "base" | "lg" | "xl";
  color?: "primary" | "secondary" | "success" | "warning" | "error" | "info" | "neutral";
  text: string;
}

export const Chip = ({ size = "base", color = "primary", text }: BagdeProps) => {
  const fontSize =
    size === "xs"
      ? "text-xs"
      : size === "sm"
      ? "text-sm"
      : size === "lg"
      ? "text-lg"
      : size === "xl"
      ? "text-xl"
      : "text-base";

  const bgColor =
    color === "primary"
      ? "bg-indigo-100 text-indigo-500"
      : color === "secondary"
      ? "bg-teal-100 text-teal-500"
      : color === "success"
      ? "bg-green-100 text-green-500"
      : color === "warning"
      ? "bg-amber-100 text-amber-500"
      : color === "error"
      ? "bg-red-100 text-red-500"
      : color === "neutral"
      ? "bg-gray-100 text-gray-500"
      : "bg-sky-100 text-sky-500";

  return (
    <span className={`px-2 py-1 rounded-full font-medium ${fontSize} ${bgColor}`}>
      {text}
    </span>
  );
};
