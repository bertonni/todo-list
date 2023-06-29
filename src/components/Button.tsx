import React, { ButtonHTMLAttributes, FunctionComponent } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	iconColor?: string;
  text?: string;
  children?: React.ReactNode;
}

export const Button: FunctionComponent<ButtonProps> = ({
	iconColor,
  text,
  children,
  ...rest
}) => {
	let textColor = '';

	if (iconColor) {
		textColor = iconColor;
	}
  return (
    <button
      {...rest}
      className={`p-2 hover:bg-white rounded-full ${textColor}
        transition-all`}
    >
      {children ?? text}
    </button>
  );
};
