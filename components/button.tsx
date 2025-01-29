import { ReactElement } from "react";

interface IButton {
  variant: "primary" | "secondary";
  text: string;
  startIcon?: ReactElement;
  onClick?: () => void;
  type?: "button" | "submit" | "reset"; 
  className?: string;  // Added className
}

const buttonStyles = {
  primary: "bg-purple-400 text-white hover:bg-purple-500",
  secondary: "bg-purple-200 text-purple-800 hover:bg-purple-300",
};

const defaultStyle = "px-4 py-2 rounded-md font-light flex items-center transition-all";

export const Button = ({
  variant = "primary", 
  text,
  startIcon,
  onClick,
  type = "button", 
  className = ""  // Default className to empty string
}: IButton) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${defaultStyle} ${buttonStyles[variant]} ${className}`} // Merge className
      aria-label={text}
    >
      {startIcon && <div className="pr-2">{startIcon}</div>}
      {text}
    </button>
  );
};
