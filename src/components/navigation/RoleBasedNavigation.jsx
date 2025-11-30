import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from '../ui/Button';

const RoleBasedNavigation = ({ userRole = 'customer', onLogout }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navigationConfig = {
    customer: [
      { path: '/customer-registration', label: 'Registrate', icon: 'UserPlus' },
      { path: '/admin-dashboard', label: 'Dashboard', icon: 'LayoutDashboard' },
      { path: '/table-reservation-system', label: 'Reservaciones', icon: 'Calendar' },
      { path: '/menu-and-food-ordering', label: 'Ordenar Comida', icon: 'UtensilsCrossed' },
    ],
    waiter: [
      { path: '/waiter-dashboard', label: 'Dashboard', icon: 'LayoutDashboard' },
      { path: '/order-tracking-dashboard', label: 'Order Tracking', icon: 'ClipboardList' },
    ],
    admin: [
      { path: '/admin-dashboard', label: 'Dashboard', icon: 'LayoutDashboard' },
      { path: '/order-tracking-dashboard', label: 'Seguimiento de Pedidos', icon: 'ClipboardList' },
      { path: '/table-reservation-system', label: 'Reservaciones', icon: 'Calendar' },
      { path: '/menu-and-food-ordering', label: 'Menu Admin', icon: 'UtensilsCrossed' },
    ],
  };

  const currentNavItems = navigationConfig?.[userRole] || navigationConfig?.customer;

  const isActive = (path) => location?.pathname === path;

  const handleNavigation = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  const handleLogout = () => {
    setIsMobileMenuOpen(false);
    if (onLogout) {
      onLogout();
    }
  };

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card border-b border-border shadow-warm">
      <nav className="flex items-center justify-between h-16 px-4 lg:px-6">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg">
            <Icon name="ChefHat" size={24} color="var(--color-primary)" />
          </div>
          <span className="text-xl font-heading font-semibold text-foreground">
            Vikingo Grill
          </span>
        </div>

        <div className="hidden md:flex items-center gap-1">
          {currentNavItems?.map((item) => (
            <button
              key={item?.path}
              onClick={() => handleNavigation(item?.path)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-quick ${
                isActive(item?.path)
                  ? 'bg-primary text-primary-foreground'
                  : 'text-foreground hover:bg-muted'
              }`}
            >
              <Icon name={item?.icon} size={18} />
              <span className="font-medium">{item?.label}</span>
            </button>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-muted rounded-lg">
            <Icon name="User" size={16} color="var(--color-muted-foreground)" />
            <span className="text-sm font-medium text-muted-foreground capitalize">
              {userRole}
            </span>
          </div>
          <Button
            variant="outline"
            size="sm"
            iconName="LogOut"
            iconPosition="left"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </div>

        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2 rounded-lg hover:bg-muted transition-quick"
          aria-label="Toggle menu"
        >
          <Icon name={isMobileMenuOpen ? 'X' : 'Menu'} size={24} />
        </button>
      </nav>
      {isMobileMenuOpen && (
        <>
          <div
            className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-40"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="fixed top-16 left-0 right-0 bottom-0 bg-card z-50 overflow-y-auto md:hidden">
            <div className="flex flex-col p-4 gap-2">
              {currentNavItems?.map((item) => (
                <button
                  key={item?.path}
                  onClick={() => handleNavigation(item?.path)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-quick ${
                    isActive(item?.path)
                      ? 'bg-primary text-primary-foreground'
                      : 'text-foreground hover:bg-muted'
                  }`}
                >
                  <Icon name={item?.icon} size={20} />
                  <span className="font-medium">{item?.label}</span>
                </button>
              ))}
              
              <div className="mt-4 pt-4 border-t border-border">
                <div className="flex items-center gap-2 px-4 py-3 bg-muted rounded-lg mb-2">
                  <Icon name="User" size={18} color="var(--color-muted-foreground)" />
                  <span className="text-sm font-medium text-muted-foreground capitalize">
                    {userRole} Account
                  </span>
                </div>
                <Button
                  variant="outline"
                  fullWidth
                  iconName="LogOut"
                  iconPosition="left"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </div>
            </div>
          </div>
        </>
      )}
    </header>
  );
};

export default RoleBasedNavigation;