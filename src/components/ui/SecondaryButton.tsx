import type { FC } from "react";
import type { ButtonProps } from "../../types";

export const SecondaryButton: FC<ButtonProps> = ({
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
                px-4 py-2 text-sm rounded-2xl font-noto font-extralight transition-all cursor-pointer duration-500 hover:bg-secondary/90 disabled:bg-gray-400 disabled:cursor-not-allowed
                ${className}
            `}
        >
            {children}
        </button>
    );
};
