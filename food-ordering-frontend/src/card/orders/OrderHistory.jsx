import { List, Loader } from "lucide-react";
import { OrderCard } from "./OrderCard";

export const OrderHistory = ({ orders, loading, isAdmin, onUpdateStatus }) => {
    return (
        <div className="p-4 sm:p-8">
            <div className="mb-8">
                <h2 className="text-4xl font-bold text-gray-900 mb-2">{isAdmin ? 'All Orders' : 'Order History'}</h2>
                <p className="text-gray-600">{isAdmin ? 'Manage all customer orders' : 'Track your orders'}</p>
            </div>
            
            {loading ? (
                <div className="flex justify-center items-center py-20">
                    <Loader className="w-8 h-8 text-indigo-600 animate-spin" />
                </div>
            ) : orders.length === 0 ? (
                <div className="text-center py-20">
                    <List className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-xl text-gray-500">No orders found</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {orders.map(order => (
                        <OrderCard
                            key={order._id}
                            order={order}
                            isAdmin={isAdmin}
                            onUpdateStatus={onUpdateStatus}
                            loading={loading}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};
