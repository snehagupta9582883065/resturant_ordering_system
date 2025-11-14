import { CheckCircle, XCircle } from "lucide-react";
import { useEffect } from "react";

export const Toast = ({ message, type, onClose }) => {
    useEffect(() => {
        const timer = setTimeout(onClose, 5000);
        return () => clearTimeout(timer);
    }, [onClose]);

    const config = {
        success: { bg: 'bg-green-500', Icon: CheckCircle },
        error: { bg: 'bg-red-500', Icon: XCircle },
    };

    const { bg, Icon } = config[type] || config.error;

    return (
        <div className={`${bg} text-white px-6 py-4 shadow-lg rounded-xl flex items-center space-x-3 animate-slide-down`}>
            <Icon className="w-5 h-5 flex-shrink-0" />
            <p className="font-medium">{message}</p>
        </div>
    );
};