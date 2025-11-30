
import { useNavigate, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const DashboardNavigation = ({ userRole = 'admin' }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const adminTabs = [
    { path: '/admin-dashboard', label: 'Overview', icon: 'LayoutDashboard' },
    { path: '/order-tracking-dashboard', label: 'Orders', icon: 'ClipboardList' },
    { path: '/table-reservation-system', label: 'Reservations', icon: 'Calendar' },
    { path: '/menu-and-food-ordering', label: 'Menu', icon: 'UtensilsCrossed' },
  ];

  const waiterButtons = [
    { path: '/waiter-dashboard', label: 'Dashboard', icon: 'LayoutDashboard' },
    { path: '/order-tracking-dashboard', label: 'Orders', icon: 'ClipboardList' },
  ];

  const isActive = (path) => location?.pathname === path;

  const handleNavigation = (path) => {
    navigate(path);
  };

  if (userRole === 'admin') {
    return (
      <div className="bg-card border-b border-border shadow-warm">
        <div className="flex overflow-x-auto scrollbar-hide">
          {adminTabs?.map((tab) => (
            <button
              key={tab?.path}
              onClick={() => handleNavigation(tab?.path)}
              className={`flex items-center gap-2 px-6 py-4 whitespace-nowrap transition-quick border-b-2 ${
                isActive(tab?.path)
                  ? 'border-primary text-primary font-semibold' :'border-transparent text-muted-foreground hover:text-foreground hover:border-muted'
              }`}
            >
              <Icon name={tab?.icon} size={18} />
              <span className="font-medium">{tab?.label}</span>
            </button>
          ))}
        </div>
      </div>
    );
  }

  if (userRole === 'waiter') {
    return (
      <div className="bg-card border-b border-border shadow-warm p-4">
        <div className="flex gap-3 max-w-md">
          {waiterButtons?.map((button) => (
            <button
              key={button?.path}
              onClick={() => handleNavigation(button?.path)}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg transition-quick ${
                isActive(button?.path)
                  ? 'bg-primary text-primary-foreground shadow-warm'
                  : 'bg-muted text-foreground hover:bg-muted/80'
              }`}
            >
              <Icon name={button?.icon} size={20} />
              <span className="font-semibold">{button?.label}</span>
            </button>
          ))}
        </div>
      </div>
    );
  }

  return null;
};

export default DashboardNavigation;