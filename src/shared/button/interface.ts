export default interface Button {
    buttonText?: string | undefined;
    buttonColor?: "primary" | "accent" | "white" | "error" | "succes" | string | undefined;
    buttonType?: "filled" | "border" | string | undefined;
    buttonSize?: "xs" | "sm" | "md" | "xl" | string | undefined;
    buttonIcon?: string | undefined;
    buttonIconSide?: "left" | "right" | "left-right" | string | undefined;
}