interface IButton {
    label: string;
    onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    className?: string;
}

export default function Button({ label, onClick, className }: IButton) {


    return (
        <button
            onClick={onClick}
            className={`flex items-center justify-center space-x-1 p-2 border border-black rounded ${className}`}
        >
            <span className="flex items-center">
                <span>{label}</span>
            </span>
        </button>
    )
}

export type { IButton };