export default interface Button {
    buttonText?: string;
    buttonColor?: "primary" | "accent" | "white" | "error" | "succes" | "black";
    buttonType?: "filled" | "border";
    buttonSize?: "xs" | "sm" | "md" | "xl";
    buttonIcon?: string;
    buttonIconSide?: "left" | "right" | "left-right";
    customIcon?: boolean;
}