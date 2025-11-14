import { DollarSign, Plus } from "lucide-react";
import { Badge } from "../components/ui/Badge";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";

export const MenuCard = ({ item, onAddToCart, isCustomer }) => {
    return (
        <Card hover className="p-6 flex flex-col h-full">
            <div className="flex-grow">
                <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-bold text-gray-900">{item.name}</h3>
                    <Badge variant="primary">{item.category}</Badge>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">{item.description}</p>
            </div>
            <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                <div className="flex items-center space-x-1">
                    <DollarSign className="w-5 h-5 text-green-600" />
                    <span className="text-2xl font-bold text-green-600">{item.price.toFixed(2)}</span>
                </div>
                {isCustomer && (
                    <Button
                        onClick={() => onAddToCart(item)}
                        variant="primary"
                        size="sm"
                        icon={Plus}
                    >
                        Add
                    </Button>
                )}
            </div>
        </Card>
    );
};
