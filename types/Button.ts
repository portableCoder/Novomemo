type Button = {
    icon: string | JSX.Element;
    children: any;
    onClick?: () => void;
    active?: boolean
} & React.HTMLAttributes<HTMLButtonElement>
export type { Button }