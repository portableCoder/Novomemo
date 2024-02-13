type Button = {
    icon: string | JSX.Element;
    children?: any;
    onClick?: () => void;
    buttonActive?: boolean
} & React.HTMLAttributes<HTMLButtonElement>
export type { Button }