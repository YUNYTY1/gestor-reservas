import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const NotificationCenter = ({ notifications = [], onMarkAsRead, onTakeAction }) => {
  const [filter, setFilter] = useState('all');

  const notificationTypes = {
    reservation: {
      icon: 'Calendar',
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      label: 'Reserva'
    },
    order: {
      icon: 'Package',
      color: 'text-warning',
      bgColor: 'bg-warning/10',
      label: 'Pedido'
    },
    system: {
      icon: 'AlertTriangle',
      color: 'text-error',
      bgColor: 'bg-error/10',
      label: 'Sistema'
    },
    staff: {
      icon: 'Users',
      color: 'text-accent',
      bgColor: 'bg-accent/10',
      label: 'Personal'
    }
  };

  const filters = [
    { value: 'all', label: 'Todas' },
    { value: 'unread', label: 'Sin leer' },
    { value: 'urgent', label: 'Urgentes' },
    { value: 'reservation', label: 'Reservas' },
    { value: 'order', label: 'Pedidos' }
  ];

  const getFilteredNotifications = () => {
    switch (filter) {
      case 'unread':
        return notifications?.filter(n => !n?.read);
      case 'urgent':
        return notifications?.filter(n => n?.priority === 'high');
      case 'reservation':
        return notifications?.filter(n => n?.type === 'reservation');
      case 'order':
        return notifications?.filter(n => n?.type === 'order');
      default:
        return notifications;
    }
  };

  const formatTime = (timestamp) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInMinutes = Math.floor((now - time) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Ahora';
    if (diffInMinutes < 60) return `${diffInMinutes}m`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h`;
    return `${Math.floor(diffInMinutes / 1440)}d`;
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'border-l-error';
      case 'medium': return 'border-l-warning';
      case 'low': return 'border-l-muted-foreground';
      default: return 'border-l-border';
    }
  };

  const filteredNotifications = getFilteredNotifications();
  const unreadCount = notifications?.filter(n => !n?.read)?.length;

  return (
    <div className="bg-card border border-border rounded-lg shadow-soft">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <h3 className="text-lg font-semibold text-foreground">Centro de Notificaciones</h3>
            {unreadCount > 0 && (
              <span className="px-2 py-1 text-xs font-medium bg-error text-error-foreground rounded-full">
                {unreadCount}
              </span>
            )}
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              iconName="CheckCheck"
              onClick={() => notifications?.forEach(n => onMarkAsRead(n?.id))}
            >
              Marcar todas
            </Button>
            <Button
              variant="ghost"
              size="sm"
              iconName="RefreshCw"
            >
              Actualizar
            </Button>
          </div>
        </div>
        
        {/* Filters */}
        <div className="flex items-center space-x-1 overflow-x-auto">
          {filters?.map((filterOption) => (
            <button
              key={filterOption?.value}
              onClick={() => setFilter(filterOption?.value)}
              className={`px-3 py-1 text-sm font-medium rounded-full whitespace-nowrap transition-smooth ${
                filter === filterOption?.value
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              {filterOption?.label}
            </button>
          ))}
        </div>
      </div>
      <div className="max-h-96 overflow-y-auto">
        {filteredNotifications?.length === 0 ? (
          <div className="p-8 text-center">
            <Icon name="Bell" size={48} className="text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">
              {filter === 'unread' ? 'No hay notificaciones sin leer' : 'No hay notificaciones'}
            </p>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {filteredNotifications?.map((notification) => {
              const typeConfig = notificationTypes?.[notification?.type] || notificationTypes?.system;
              
              return (
                <div
                  key={notification?.id}
                  className={`p-4 border-l-4 transition-smooth hover:bg-muted/30 ${
                    !notification?.read ? 'bg-primary/5' : ''
                  } ${getPriorityColor(notification?.priority)}`}
                >
                  <div className="flex items-start space-x-3">
                    <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${typeConfig?.bgColor}`}>
                      <Icon 
                        name={typeConfig?.icon} 
                        size={16} 
                        className={typeConfig?.color} 
                      />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center space-x-2">
                            <p className={`text-sm font-medium ${
                              !notification?.read ? 'text-foreground' : 'text-muted-foreground'
                            }`}>
                              {notification?.title}
                            </p>
                            <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">
                              {typeConfig?.label}
                            </span>
                          </div>
                          
                          <p className="text-sm text-muted-foreground mt-1">
                            {notification?.message}
                          </p>
                          
                          {notification?.details && (
                            <div className="mt-2 text-xs text-muted-foreground">
                              {notification?.details}
                            </div>
                          )}
                        </div>
                        
                        <div className="flex items-center space-x-2 ml-4">
                          <span className="text-xs text-muted-foreground">
                            {formatTime(notification?.timestamp)}
                          </span>
                          {!notification?.read && (
                            <div className="w-2 h-2 bg-primary rounded-full"></div>
                          )}
                        </div>
                      </div>
                      
                      {/* Action Buttons */}
                      {notification?.actions && notification?.actions?.length > 0 && (
                        <div className="flex items-center space-x-2 mt-3">
                          {notification?.actions?.map((action, index) => (
                            <Button
                              key={index}
                              variant={action?.variant || 'outline'}
                              size="sm"
                              onClick={() => onTakeAction(notification?.id, action?.id)}
                              iconName={action?.icon}
                              iconPosition="left"
                            >
                              {action?.label}
                            </Button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationCenter;