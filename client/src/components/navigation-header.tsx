import { useAuth } from "@/hooks/use-auth";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Package, Settings, Receipt, User, LogOut } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { CartItemWithProduct } from "@shared/schema";

interface NavigationHeaderProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  onCartToggle: () => void;
}

export function NavigationHeader({ activeTab, onTabChange, onCartToggle }: NavigationHeaderProps) {
  const { user, logoutMutation } = useAuth();

  const { data: cartItems = [] } = useQuery<CartItemWithProduct[]>({
    queryKey: ["/api/cart"],
    enabled: !!user,
  });

  const cartItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-gray-900">ShopAPI</h1>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex space-x-8">
            <button
              onClick={() => onTabChange("products")}
              className={`flex items-center space-x-2 pb-2 font-medium transition-colors ${
                activeTab === "products"
                  ? "text-primary border-b-2 border-primary"
                  : "text-gray-700 hover:text-primary"
              }`}
            >
              <Package className="h-4 w-4" />
              <span>Products</span>
            </button>
            
            {user?.role === "admin" && (
              <button
                onClick={() => onTabChange("admin")}
                className={`flex items-center space-x-2 pb-2 font-medium transition-colors ${
                  activeTab === "admin"
                    ? "text-primary border-b-2 border-primary"
                    : "text-gray-700 hover:text-primary"
                }`}
              >
                <Settings className="h-4 w-4" />
                <span>Admin Panel</span>
              </button>
            )}
            
            <button
              onClick={() => onTabChange("orders")}
              className={`flex items-center space-x-2 pb-2 font-medium transition-colors ${
                activeTab === "orders"
                  ? "text-primary border-b-2 border-primary"
                  : "text-gray-700 hover:text-primary"
              }`}
            >
              <Receipt className="h-4 w-4" />
              <span>Orders</span>
            </button>
          </nav>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            {/* Cart Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={onCartToggle}
              className="relative"
            >
              <ShoppingCart className="h-5 w-5" />
              {cartItemCount > 0 && (
                <Badge 
                  variant="destructive" 
                  className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
                >
                  {cartItemCount}
                </Badge>
              )}
            </Button>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="flex items-center space-x-2">
                  <User className="h-5 w-5" />
                  <span className="hidden md:block">{user?.username}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
}
