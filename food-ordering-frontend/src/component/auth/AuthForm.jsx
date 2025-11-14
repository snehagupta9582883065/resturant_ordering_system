import { useState } from "react";
import { Card } from "../components/ui/Card";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import { User } from "lucide-react";

export const AuthForm = ({ type, onAuth, loading, onToggle }) => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'customer' });
    const isRegister = type === 'register';

    const handleSubmit = (e) => {
        e.preventDefault();
        onAuth(isRegister, formData);
    };

    return (
        <div className="min-h-[calc(100vh-16rem)] flex items-center justify-center p-4">
            <Card className="max-w-md w-full p-8">
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl mb-4">
                        <User className="w-8 h-8 text-white" />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900">{isRegister ? 'Create Account' : 'Welcome Back'}</h2>
                    <p className="text-gray-600 mt-2">{isRegister ? 'Sign up to get started' : 'Sign in to your account'}</p>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-5">
                    {isRegister && (
                        <Input
                            type="text"
                            placeholder="Full Name"
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                    )}
                    <Input
                        type="email"
                        placeholder="Email Address"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                    <Input
                        type="password"
                        placeholder="Password"
                        required
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    />
                    {isRegister && (
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Account Type</label>
                            <select
                                value={formData.role}
                                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            >
                                <option value="customer">Customer</option>
                                <option value="admin">Admin</option>
                            </select>
                        </div>
                    )}
                    <Button type="submit" disabled={loading} loading={loading} fullWidth>
                        {isRegister ? 'Create Account' : 'Sign In'}
                    </Button>
                </form>
                
                <div className="mt-6 text-center">
                    <p className="text-sm text-gray-600">
                        {isRegister ? 'Already have an account?' : "Don't have an account?"}
                        <button
                            onClick={onToggle}
                            className="text-indigo-600 hover:text-indigo-800 ml-1 font-semibold"
                            disabled={loading}
                        >
                            {isRegister ? 'Sign In' : 'Sign Up'}
                        </button>
                    </p>
                </div>
            </Card>
        </div>
    );
};
