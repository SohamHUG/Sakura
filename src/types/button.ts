import type { ReactNode } from "react";

export type ButtonProps = {
    children?: ReactNode;
    onClick?: () => void;
    disabled?: boolean;
    className?: string;
    type?: "button" | "submit" | "reset";
};