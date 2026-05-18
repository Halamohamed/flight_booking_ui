type Props =  React.ButtonHTMLAttributes<HTMLButtonElement>  & {
    variant?: "primary" | "secondary" | "danger";
}

const Button = ({variant = "primary", ...props }: Props) => {
    const base = "inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-60";

    const styles = {
        primary: "bg-sky-600 text-white hover:bg-sky-700",
        secondary: "border border-slate-300 bg-white text-slate-700 hover:bg-slate-50",
        danger: "bg-red-600 text-white hover:bg-red-700",
    };
    return <button className={`${base} ${styles[variant]}`} {...props} />;
};

export default Button;
