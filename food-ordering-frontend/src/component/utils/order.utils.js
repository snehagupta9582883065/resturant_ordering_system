import { CheckCircle, Clock, Package, XCircle } from "lucide-react";

export const getStatusConfig = (status) => {
    const configs = {
        'Pending': { 
            bg: 'bg-yellow-50', 
            text: 'text-yellow-700', 
            border: 'border-yellow-200',
            icon: Clock
        },
        'Processing': { 
            bg: 'bg-blue-50', 
            text: 'text-blue-700', 
            border: 'border-blue-200',
            icon: Package
        },
        'Delivered': { 
            bg: 'bg-green-50', 
            text: 'text-green-700', 
            border: 'border-green-200',
            icon: CheckCircle
        },
        'Cancelled': { 
            bg: 'bg-red-50', 
            text: 'text-red-700', 
            border: 'border-red-200',
            icon: XCircle
        },
    };
    return configs[status] || configs['Pending'];
};