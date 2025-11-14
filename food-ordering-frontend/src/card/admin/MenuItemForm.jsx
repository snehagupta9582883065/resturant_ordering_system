import { useState } from "react";
import { Input } from "../../component/components/ui/Input"
import { Card } from "../../component/components/ui/Card";
import { Button } from "../../component/components/ui/Button";
import { DollarSign } from "lucide-react";

export const MenuItemForm = ({ item, onSubmit, onCancel, loading }) => {
    const [formData, setFormData] = useState({
        name: item?.name || '',
        description: item?.description || '',
        price: item?.price || 0.00,
        category: item?.category || 'Mains',
        _id: item?._id || null,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: name === 'price' ? parseFloat(value) : value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
            <Card className="max-w-lg w-full p-8 animate-scale-in">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                    {item ? 'Edit Menu Item' : 'Add New Item'}
                </h3>
                <form onSubmit={handleSubmit} className="space-y-5">
                    <Input
                        type="text"
                        name="name"
                        placeholder="Item Name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        label="Name"
                    />
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Description</label>
                        <textarea
                            name="description"
                            placeholder="Describe the item"
                            value={formData.description}
                            onChange={handleChange}
                            required
                            rows="3"
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <Input
                            type="number"
                            name="price"
                            placeholder="0.00"
                            value={formData.price}
                            onChange={handleChange}
                            required
                            min="0.01"
                            step="0.01"
                            label="Price"
                            icon={DollarSign}
                        />
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">Category</label>
                            <select
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            >
                                <option value="Mains">Mains</option>
                                <option value="Sides">Sides</option>
                                <option value="Drinks">Drinks</option>
                                <option value="Desserts">Desserts</option>
                            </select>
                        </div>
                    </div>
                    <div className="flex gap-3 pt-4">
                        <Button type="button" onClick={onCancel} variant="secondary" fullWidth>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={loading} loading={loading} fullWidth>
                            Save Item
                        </Button>
                    </div>
                </form>
            </Card>
        </div>
    );
};