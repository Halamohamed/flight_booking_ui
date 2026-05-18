import * as React from "react";

type Props = React.InputHTMLAttributes<HTMLInputElement>;

const Input = (props: Props) => {
    return (
        <input
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-200"
            {...props}
        />
    );
};

export default Input;
