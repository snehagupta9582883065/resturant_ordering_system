import { Loader } from "lucide-react";

export const Button = ({ 
    children, 
    onClick, 
    variant = 'primary', 
    size = 'md', 
    disabled = false, 
    loading = false,
    icon: Icon,
    fullWidth = false,
    className = ''
}) => {
    const baseClasses = 'font-semibold rounded-xl transition-all duration-200 flex items-center justify-center shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed';
    
    const variants = {
        primary: 'bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white',
        secondary: 'bg-white text-gray-700 border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50',
        success: 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white',
        danger: 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white',
        ghost: 'bg-transparent text-indigo-600 hover:bg-indigo-50',
    };
    
    const sizes = {
        sm: 'px-3 py-1.5 text-sm',
        md: 'px-5 py-2.5 text-base',
        lg: 'px-6 py-3 text-lg',
    };
    
    return (
        <button
            onClick={onClick}
            disabled={disabled || loading}
            className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${fullWidth ? 'w-full' : ''} ${className}`}
        >
            {loading && <Loader className="w-4 h-4 mr-2 animate-spin" />}
            {!loading && Icon && <Icon className="w-5 h-5 mr-2" />}
            {children}
        </button>
    );
};