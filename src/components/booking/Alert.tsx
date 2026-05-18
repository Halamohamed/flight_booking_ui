

const Alert = ({type, message}: {
    type: "success" | "error";
    message: string;
}) => {
    const styles = type === "success"
        ? "border-green-200 bg-green-50 text-green-800"
        : "border-red-200 bg-red-50 text-red-800";
    return (
        <div className={`rounded-lg border p-3 text-sm font-medium ${styles}`}>
            {message}
        </div>
    );
};

export default Alert;
