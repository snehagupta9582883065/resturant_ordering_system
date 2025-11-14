import { Coffee, Loader, ShoppingCart } from "lucide-react";
import { Button } from "../component/components/ui/Button";
import { MenuCard } from "../component/menu/MenuCard";

export const MenuPage = ({ menu, loading, cart, onAddToCart, isCustomer, onViewCart }) => {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <div className="p-4 sm:p-8">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h2 className="text-4xl font-bold text-gray-900 mb-2">Our Menu</h2>
                    <p className="text-gray-600">Discover our delicious selections</p>
                </div>
                {isCustomer && totalItems > 0 && (
                    <Button onClick={onViewCart} variant="success" icon={ShoppingCart} className="relative">
                        Cart
                        <span className="absolute -top-2 -right-2 inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 rounded-full">
                            {totalItems}
                        </span>
                    </Button>
                )}
            </div>
            
            {loading ? (
                <div className="flex justify-center items-center py-20">
                    <Loader className="w-8 h-8 text-indigo-600 animate-spin" />
                </div>
            ) : menu.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {menu.map(item => (
                        <MenuCard
                            key={item._id}
                            item={item}
                            onAddToCart={onAddToCart}
                            isCustomer={isCustomer}
                        />
                    ))}
                </div>
            ) : (
                <div className="text-center py-20">
                    <Coffee className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-xl text-gray-500">No menu items available</p>
                </div>
            )}
        </div>
    );
};