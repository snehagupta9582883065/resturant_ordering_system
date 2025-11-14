import { Card } from "../../component/components/ui/Card";
import { getStatusConfig } from "../../component/utils/order.utils";

export const OrderCard = ({ order, isAdmin, onUpdateStatus, loading }) => {
  const statusConfig = getStatusConfig(order.status);
  const StatusIcon = statusConfig.icon;

  return (
    <Card className="p-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-4">
        <div>
          <p className="text-sm text-gray-500 mb-1">Order ID</p>
          <p className="font-mono font-bold text-indigo-600">
            {order._id.slice(-8)}
          </p>
          {isAdmin && order.customer && (
            <p className="text-sm text-gray-600 mt-2">
              Customer: {order.customer.name}
            </p>
          )}
        </div>
        <div className="flex flex-col items-start sm:items-end gap-2">
          <div
            className={`flex items-center gap-2 px-3 py-1.5 rounded-xl ${statusConfig.bg} ${statusConfig.text} border ${statusConfig.border}`}
          >
            <StatusIcon className="w-4 h-4" />
            <span className="font-semibold text-sm">{order.status}</span>
          </div>
          {isAdmin && (
            <select
              value={order.status}
              onChange={(e) => onUpdateStatus(order._id, e.target.value)}
              disabled={loading}
              className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-indigo-500"
            >
              <option value="Pending">Pending</option>
              <option value="Processing">Processing</option>
              <option value="Delivered">Delivered</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          )}
        </div>
      </div>

      <div className="border-t border-gray-100 pt-4">
        <p className="text-sm font-semibold text-gray-700 mb-3">Order Items</p>
        <div className="space-y-2">
          {order.items.map((item, index) => (
            <div key={index} className="flex justify-between text-sm">
              <span className="text-gray-700">
                {item.menuItem?.name || "Unknown Item"}{" "}
                <span className="text-gray-500">× {item.quantity}</span>
              </span>
              <span className="font-semibold text-gray-900">
                $
                {(item.menuItem?.price
                  ? item.menuItem.price * item.quantity
                  : 0
                ).toFixed(2)}
              </span>
            </div>
          ))}
        </div>
        <div className="flex justify-between items-center pt-4 mt-4 border-t border-gray-200">
          <span className="font-bold text-gray-900">Total</span>
          <span className="text-2xl font-bold text-green-600">
            ${order.totalAmount.toFixed(2)}
          </span>
        </div>
      </div>
    </Card>
  );
};
