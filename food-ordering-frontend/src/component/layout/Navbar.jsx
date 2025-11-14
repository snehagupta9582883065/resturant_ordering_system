import { Coffee, Edit3, List, LogOut, MenuIcon, ShoppingCart, User } from "lucide-react";
import { Badge } from "../components/ui/Badge";
import { Button } from "../components/ui/Button";

export const Navbar = ({ user, page, setPage, onLogout }) => {
    const isLoggedIn = !!user;
    const isAdmin = user?.role === 'admin';
    const isCustomer = user?.role === 'customer';

    const NavButton = ({ onClick, active, icon: Icon, children }) => (
        <button
            onClick={onClick}
            className={`flex items-center px-4 py-2 text-sm font-medium rounded-xl transition-all duration-200 ${
                active 
                    ? 'bg-indigo-100 text-indigo-700 shadow-sm' 
                    : 'text-gray-600 hover:bg-gray-100'
            }`}
        >
            <Icon className="w-5 h-5 mr-1.5" />
            <span className="hidden sm:inline">{children}</span>
        </button>
    );

    return (
        <nav className="bg-white shadow-md sticky top-0 z-40 border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <button 
                        onClick={() => setPage(isAdmin ? 'admin_orders' : 'menu')} 
                        className="flex items-center space-x-2 group"
                    >
                        <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-2 rounded-xl group-hover:scale-110 transition-transform duration-200">
                            <Coffee className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                            FoodApp
                        </span>
                    </button>
                    
                    <div className="flex items-center space-x-2">
                        {isCustomer && (
                            <>
                                <NavButton onClick={() => setPage('menu')} active={page === 'menu'} icon={MenuIcon}>
                                    Menu
                                </NavButton>
                                <NavButton onClick={() => setPage('cart')} active={page === 'cart'} icon={ShoppingCart}>
                                    Cart
                                </NavButton>
                                <NavButton onClick={() => setPage('order_history')} active={page === 'order_history'} icon={List}>
                                    Orders
                                </NavButton>
                            </>
                        )}
                        
                        {isAdmin && (
                            <>
                                <NavButton onClick={() => setPage('admin_orders')} active={page === 'admin_orders'} icon={List}>
                                    Orders
                                </NavButton>
                                <NavButton onClick={() => setPage('admin_menu')} active={page === 'admin_menu'} icon={Edit3}>
                                    Menu
                                </NavButton>
                            </>
                        )}
                        
                        {!isLoggedIn ? (
                            <NavButton onClick={() => setPage('login')} active={page === 'login' || page === 'register'} icon={User}>
                                Login
                            </NavButton>
                        ) : (
                            <div className="flex items-center space-x-3 ml-2">
                                <div className="hidden md:flex items-center space-x-2 px-3 py-1.5 bg-gray-100 rounded-lg">
                                    <User className="w-4 h-4 text-gray-600" />
                                    <span className="text-sm font-medium text-gray-800">{user.name}</span>
                                    <Badge variant="primary" className="text-xs">{user.role}</Badge>
                                </div>
                                <Button onClick={onLogout} variant="danger" size="sm" icon={LogOut}>
                                    <span className="hidden sm:inline">Logout</span>
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};
