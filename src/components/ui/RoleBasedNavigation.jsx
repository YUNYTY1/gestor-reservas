import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Icon from "../AppIcon";
import Button from './Button';

const RoleBasedNavigation = ({ 
  userRole = 'customer', 
  isAuthenticated = false,
  activeReservations = 0,
  pendingOrders = 0,
  notificationCount = 0 
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const customerNavigation = [
    {
      label: 'Mis Reservas',
      path: '/table-reservation',
      icon: 'Calendar',
      badge: activeReservations > 0 ? activeReservations : null,
      description: 'Gestiona tus reservas de mesa'
    },
    {
      label: 'Menú y Pedidos',
      path: '/menu-and-ordering',
      icon: 'UtensilsCrossed',
      description: 'Explora el menú y realiza pedidos'
    },
    {
      label: 'Seguir Pedidos',
      path: '/order-tracking',
      icon: 'Package',
      badge: pendingOrders > 0 ? pendingOrders : null,
      description: 'Rastrea el estado de tus pedidos'
    }
  ];

  const adminNavigation = [
    {
      label: 'Panel Principal',
      path: '/admin-dashboard',
      icon: 'LayoutDashboard',
      badge: notificationCount > 0 ? notificationCount : null,
      description: 'Vista general del restaurante'
    },
    {
      label: 'Gestión de Reservas',
      path: '/table-reservation',
      icon: 'Calendar',
      badge: activeReservations > 0 ? activeReservations : null,
      description: 'Administra todas las reservas'
    },
    {
      label: 'Gestión de Pedidos',
      path: '/menu-and-ordering',
      icon: 'UtensilsCrossed',
      description: 'Administra menú y pedidos'
    },
    {
      label: 'Estado de Pedidos',
      path: '/order-tracking',
      icon: 'Package',
      badge: pendingOrders > 0 ? pendingOrders : null,
      description: 'Monitorea todos los pedidos'
    }
  ];

  const authNavigation = [
    {
      label: 'Iniciar Sesión',
      path: '/login',
      icon: 'LogIn',
      description: 'Accede a tu cuenta'
    },
    {
      label: 'Crear Cuenta',
      path: '/register',
      icon: 'UserPlus',
      description: 'Regístrate para hacer reservas'
    }
  ];

  const getNavigationItems = () => {
    if (!isAuthenticated) return authNavigation;
    return userRole === 'admin' ? adminNavigation : customerNavigation;
  };

  const isActivePath = (path) => location?.pathname === path;

  const handleNavigation = (path) => {
    navigate(path);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setIsCollapsed(true);
      } else {
        setIsCollapsed(false);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <nav className={`fixed left-0 top-16 bottom-0 z-navigation bg-card border-r border-border shadow-soft transition-smooth ${
      isCollapsed ? 'w-16' : 'w-64'
    } lg:w-64`}>
      <div className="flex flex-col h-full">
        {/* Collapse Toggle - Desktop Only */}
        <div className="hidden lg:flex items-center justify-end p-4 border-b border-border">
          <Button
            variant="ghost"
            size="sm"
            iconName={isCollapsed ? 'ChevronRight' : 'ChevronLeft'}
            onClick={() => setIsCollapsed(!isCollapsed)}
          />
        </div>

        {/* Navigation Items */}
        <div className="flex-1 overflow-y-auto py-4">
          <div className="space-y-1 px-3">
            {getNavigationItems()?.map((item) => (
              <button
                key={item?.path}
                onClick={() => handleNavigation(item?.path)}
                className={`group relative flex items-center w-full px-3 py-3 rounded-lg text-sm font-medium transition-smooth ${
                  isActivePath(item?.path)
                    ? 'bg-primary text-primary-foreground shadow-soft'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
                title={isCollapsed ? item?.label : ''}
              >
                <div className="flex items-center min-w-0 flex-1">
                  <Icon 
                    name={item?.icon} 
                    size={20} 
                    className="flex-shrink-0"
                  />
                  {!isCollapsed && (
                    <span className="ml-3 truncate">{item?.label}</span>
                  )}
                </div>
                
                {/* Badge */}
                {item?.badge && (
                  <div className={`flex-shrink-0 ${isCollapsed ? 'absolute -top-1 -right-1' : 'ml-2'}`}>
                    <span className="inline-flex items-center justify-center w-5 h-5 text-xs font-medium bg-accent text-accent-foreground rounded-full">
                      {item?.badge > 99 ? '99+' : item?.badge}
                    </span>
                  </div>
                )}

                {/* Tooltip for collapsed state */}
                {isCollapsed && (
                  <div className="absolute left-full ml-2 px-2 py-1 bg-popover text-popover-foreground text-xs rounded-md shadow-elevated opacity-0 group-hover:opacity-100 transition-smooth pointer-events-none whitespace-nowrap z-dropdown">
                    {item?.label}
                    {item?.description && (
                      <div className="text-muted-foreground mt-1">
                        {item?.description}
                      </div>
                    )}
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* User Section */}
        {isAuthenticated && (
          <div className="border-t border-border p-4">
            <div className="space-y-2">
              <button
                onClick={() => navigate('/profile')}
                className="group relative flex items-center w-full px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-smooth"
                title={isCollapsed ? 'Perfil' : ''}
              >
                <Icon name="User" size={18} className="flex-shrink-0" />
                {!isCollapsed && <span className="ml-3">Perfil</span>}
                
                {isCollapsed && (
                  <div className="absolute left-full ml-2 px-2 py-1 bg-popover text-popover-foreground text-xs rounded-md shadow-elevated opacity-0 group-hover:opacity-100 transition-smooth pointer-events-none whitespace-nowrap z-dropdown">
                    Perfil
                  </div>
                )}
              </button>
              
              <button
                onClick={() => navigate('/settings')}
                className="group relative flex items-center w-full px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-smooth"
                title={isCollapsed ? 'Configuración' : ''}
              >
                <Icon name="Settings" size={18} className="flex-shrink-0" />
                {!isCollapsed && <span className="ml-3">Configuración</span>}
                
                {isCollapsed && (
                  <div className="absolute left-full ml-2 px-2 py-1 bg-popover text-popover-foreground text-xs rounded-md shadow-elevated opacity-0 group-hover:opacity-100 transition-smooth pointer-events-none whitespace-nowrap z-dropdown">
                    Configuración
                  </div>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default RoleBasedNavigation;