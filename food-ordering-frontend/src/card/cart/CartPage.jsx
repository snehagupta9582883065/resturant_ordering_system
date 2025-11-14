import { Minus, Plus, Send, ShoppingCart, Trash2 } from "lucide-react";
import { Card } from "../../component/components/ui/Card";
import { Button } from "../../component/components/ui/Button";

export const CartPage = ({ cart, onUpdateQuantity, onClearCart, onPlaceOrder, loading }) => {
    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const tax = subtotal * 0.10;
    const total = subtotal + tax;

    if (cart.length === 0) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="text-center">
                    <ShoppingCart className="w-20 h-20 text-gray-300 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
                    <p className="text-gray-600 mb-6">Add some delicious items to get started!</p>
                </div>
            </div>
        );
    }

    return (
        <div className="p-4 sm:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">Shopping Cart</h2>
                    <div className="space-y-4">
                        {cart.map(item => (
                            <Card key={item.menuItemId} className="p-5">
                                <div className="flex items-center gap-4">
                                    <div className="flex-grow">
                                        <h3 className="font-semibold text-lg text-gray-900">{item.name}</h3>
                                        <p className="text-gray-500 text-sm">${item.price.toFixed(2)} each</p>
                                    </div>
                                    <div className="flex items-center gap-3 bg-gray-50 rounded-xl px-3 py-2">
                                        <button
                                            onClick={() => onUpdateQuantity(item, 'decrease')}
                                            className="p-1.5 bg-white rounded-lg hover:bg-gray-100 transition shadow-sm"
                                        >
                                            <Minus className="w-4 h-4 text-gray-600" />
                                        </button>
                                        <span className="font-bold text-lg w-8 text-center">{item.quantity}</span>
                                        <button
                                            onClick={() => onUpdateQuantity(item, 'increase')}
                                            className="p-1.5 bg-white rounded-lg hover:bg-gray-100 transition shadow-sm"
                                        >
                                            <Plus className="w-4 h-4 text-gray-600" />
                                        </button>
                                    </div>
                                    <div className="w-24 text-right">
                                        <p className="text-xl font-bold text-gray-900">
                                            ${(item.price * item.quantity).toFixed(2)}
                                        </p>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>

                <div>
                    <Card className="p-6 sticky top-24">
                        <h3 className="text-2xl font-bold text-gray-900 mb-6">Order Summary</h3>
                        <div className="space-y-3 mb-6">
                            <div className="flex justify-between text-gray-700">
                                <span>Subtotal</span>
                                <span className="font-semibold">${subtotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-gray-700">
                                <span>Tax (10%)</span>
                                <span className="font-semibold">${tax.toFixed(2)}</span>
                            </div>
                            <div className="border-t border-gray-200 pt-3">
                                <div className="flex justify-between text-xl font-bold text-gray-900">
                                    <span>Total</span>
                                    <span className="text-green-600">${total.toFixed(2)}</span>
                                </div>
                            </div>
                        </div>
                        
                        <Button
                            onClick={onPlaceOrder}
                            disabled={loading}
                            loading={loading}
                            fullWidth
                            icon={Send}
                            className="mb-3"
                        >
                            Place Order
                        </Button>
                        
                        <Button
                            onClick={onClearCart}
                            variant="danger"
                            fullWidth
                            icon={Trash2}
                            size="sm"
                        >
                            Clear Cart
                        </Button>
                    </Card>
                </div>
            </div>
        </div>
    );
};