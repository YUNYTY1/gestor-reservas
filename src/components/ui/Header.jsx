import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Icon from "../AppIcon";
import Button from './Button';

const Header = ({ isAuthenticated = false, userRole = 'customer' }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const customerNavItems = [
    { label: 'Reservas', path: '/table-reservation', icon: 'Calendar' },
    { label: 'Menú', path: '/menu-and-ordering', icon: 'UtensilsCrossed' },
    { label: 'Mis Pedidos', path: '/order-tracking', icon: 'Package' },
  ];

  const adminNavItems = [
    { label: 'Dashboard', path: '/admin-dashboard', icon: 'LayoutDashboard' },
    { label: 'Reservas', path: '/table-reservation', icon: 'Calendar' },
    { label: 'Pedidos', path: '/menu-and-ordering', icon: 'UtensilsCrossed' },
    { label: 'Seguimiento', path: '/order-tracking', icon: 'Package' },
  ];

  const authItems = [
    { label: 'Iniciar Sesión', path: '/login', icon: 'LogIn' },
    { label: 'Registrarse', path: '/register', icon: 'UserPlus' },
  ];

  const getNavigationItems = () => {
    if (!isAuthenticated) return authItems;
    return userRole === 'admin' ? adminNavItems : customerNavItems;
  };

  const handleNavigation = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  const handleLogout = () => {
    // Logout logic would be implemented here
    navigate('/login');
    setIsMobileMenuOpen(false);
  };

  const isActivePath = (path) => location?.pathname === path;

  return (
    <header className="fixed top-0 left-0 right-0 z-navigation bg-card border-b border-border shadow-soft">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <button
              onClick={() => navigate('/')}
              className="flex items-center space-x-2 transition-smooth hover:opacity-80"
            >
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Icon name="UtensilsCrossed" size={20} color="white" />
              </div>
              <span className="text-xl font-semibold text-foreground">
                RestaurantBooking
              </span>
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {getNavigationItems()?.map((item) => (
              <button
                key={item?.path}
                onClick={() => handleNavigation(item?.path)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-smooth ${
                  isActivePath(item?.path)
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                <Icon name={item?.icon} size={16} />
                <span>{item?.label}</span>
              </button>
            ))}
          </nav>

          {/* Desktop User Actions */}
          <div className="hidden md:flex items-center space-x-3">
            {isAuthenticated ? (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="Bell"
                  iconPosition="left"
                  className="relative"
                >
                  <span className="absolute -top-1 -right-1 w-2 h-2 bg-accent rounded-full"></span>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  iconName="User"
                  iconPosition="left"
                >
                  Perfil
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="LogOut"
                  iconPosition="left"
                  onClick={handleLogout}
                >
                  Salir
                </Button>
              </>
            ) : (
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate('/login')}
                >
                  Iniciar Sesión
                </Button>
                <Button
                  variant="default"
                  size="sm"
                  onClick={() => navigate('/register')}
                >
                  Registrarse
                </Button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              iconName={isMobileMenuOpen ? 'X' : 'Menu'}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </div>
        </div>
      </div>
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-card border-t border-border shadow-elevated">
          <div className="px-4 py-3 space-y-2">
            {getNavigationItems()?.map((item) => (
              <button
                key={item?.path}
                onClick={() => handleNavigation(item?.path)}
                className={`flex items-center space-x-3 w-full px-3 py-2 rounded-lg text-sm font-medium transition-smooth ${
                  isActivePath(item?.path)
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                <Icon name={item?.icon} size={18} />
                <span>{item?.label}</span>
              </button>
            ))}
            
            {isAuthenticated && (
              <>
                <div className="border-t border-border my-2"></div>
                <button
                  onClick={() => handleNavigation('/profile')}
                  className="flex items-center space-x-3 w-full px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-smooth"
                >
                  <Icon name="User" size={18} />
                  <span>Perfil</span>
                </button>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-3 w-full px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-smooth"
                >
                  <Icon name="LogOut" size={18} />
                  <span>Cerrar Sesión</span>
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;