import type { FC } from "react";
import type { ButtonProps } from "../../types";

export const MainButton: FC<ButtonProps> = ({
    children,
    onClick,
    disabled = false,
    className = "",
    type = "button",
}) => {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`
                px-4 py-2 rounded-lg bg-main/90 text-white/100 font-noto font-medium transition-all cursor-pointer duration-500 hover:bg-main/100 hover:-translate-y-2 disabled:bg-gray-400 
                ${className}
            `}
        >
            {children}
        </button>
    );
};
