export default interface Button {
    buttonText?: string;
    buttonColor?: "primary" | "accent" | "white" | "error" | "succes" | string;
    buttonType?: "filled" | "border" | string;
    buttonSize?: "xs" | "sm" | "md" | "xl" | string;
    buttonIcon?: string;
    buttonIconSide?: "left" | "right" | "left-right";
}