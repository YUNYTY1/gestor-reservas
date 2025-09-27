import React, { useState } from 'react';
import Icon from "../AppIcon";
import Button from './Button';

const NotificationCenter = ({ 
  notifications = [], 
  isOpen = false, 
  onToggle, 
  onMarkAsRead, 
  onMarkAllAsRead,
  onClearAll,
  position = 'right' 
}) => {
  const [filter, setFilter] = useState('all');

  const notificationTypes = {
    reservation: {
      icon: 'Calendar',
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    },
    order: {
      icon: 'Package',
      color: 'text-warning',
      bgColor: 'bg-warning/10'
    },
    system: {
      icon: 'Bell',
      color: 'text-muted-foreground',
      bgColor: 'bg-muted'
    },
    promotion: {
      icon: 'Tag',
      color: 'text-accent',
      bgColor: 'bg-accent/10'
    },
    alert: {
      icon: 'AlertTriangle',
      color: 'text-error',
      bgColor: 'bg-error/10'
    }
  };

  const filteredNotifications = notifications?.filter(notification => {
    if (filter === 'all') return true;
    if (filter === 'unread') return !notification?.read;
    return notification?.type === filter;
  });

  const unreadCount = notifications?.filter(n => !n?.read)?.length;

  const formatTime = (timestamp) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInMinutes = Math.floor((now - time) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Ahora';
    if (diffInMinutes < 60) return `${diffInMinutes}m`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h`;
    return `${Math.floor(diffInMinutes / 1440)}d`;
  };

  const handleNotificationClick = (notification) => {
    if (!notification?.read && onMarkAsRead) {
      onMarkAsRead(notification?.id);
    }
    
    // Handle notification action if provided
    if (notification?.action) {
      notification?.action();
    }
  };

  const positionClasses = {
    right: 'right-0',
    left: 'left-0',
    center: 'left-1/2 transform -translate-x-1/2'
  };

  return (
    <div className="relative">
      {/* Notification Bell */}
      <Button
        variant="ghost"
        size="sm"
        iconName="Bell"
        onClick={onToggle}
        className="relative"
      >
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-error text-error-foreground text-xs rounded-full flex items-center justify-center">
            {unreadCount > 99 ? '99+' : unreadCount}
          </span>
        )}
      </Button>
      {/* Notification Panel */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-overlay bg-black/20 lg:hidden"
            onClick={onToggle}
          />
          
          {/* Panel */}
          <div className={`absolute top-full mt-2 w-80 max-w-sm bg-popover border border-border rounded-lg shadow-elevated z-dropdown ${positionClasses?.[position]}`}>
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-border">
              <h3 className="font-semibold text-popover-foreground">
                Notificaciones
              </h3>
              <div className="flex items-center space-x-2">
                {unreadCount > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={onMarkAllAsRead}
                    className="text-xs"
                  >
                    Marcar todas
                  </Button>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="X"
                  onClick={onToggle}
                />
              </div>
            </div>

            {/* Filters */}
            <div className="flex items-center space-x-1 p-3 border-b border-border overflow-x-auto">
              {['all', 'unread', 'reservation', 'order', 'system']?.map((filterType) => (
                <button
                  key={filterType}
                  onClick={() => setFilter(filterType)}
                  className={`px-3 py-1 text-xs font-medium rounded-full whitespace-nowrap transition-smooth ${
                    filter === filterType
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                >
                  {filterType === 'all' ? 'Todas' :
                   filterType === 'unread' ? 'No leídas' :
                   filterType === 'reservation' ? 'Reservas' :
                   filterType === 'order' ? 'Pedidos' :
                   'Sistema'}
                </button>
              ))}
            </div>

            {/* Notifications List */}
            <div className="max-h-96 overflow-y-auto">
              {filteredNotifications?.length === 0 ? (
                <div className="p-8 text-center">
                  <Icon name="Bell" size={32} className="text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">
                    {filter === 'unread' ? 'No hay notificaciones sin leer' : 'No hay notificaciones'}
                  </p>
                </div>
              ) : (
                <div className="divide-y divide-border">
                  {filteredNotifications?.map((notification) => {
                    const typeConfig = notificationTypes?.[notification?.type] || notificationTypes?.system;
                    
                    return (
                      <button
                        key={notification?.id}
                        onClick={() => handleNotificationClick(notification)}
                        className={`w-full p-4 text-left hover:bg-muted/50 transition-smooth ${
                          !notification?.read ? 'bg-primary/5' : ''
                        }`}
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
                              <p className={`text-sm font-medium ${
                                !notification?.read ? 'text-foreground' : 'text-muted-foreground'
                              }`}>
                                {notification?.title}
                              </p>
                              <div className="flex items-center space-x-1 ml-2">
                                <span className="text-xs text-muted-foreground">
                                  {formatTime(notification?.timestamp)}
                                </span>
                                {!notification?.read && (
                                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                                )}
                              </div>
                            </div>
                            
                            <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                              {notification?.message}
                            </p>
                            
                            {notification?.actionLabel && (
                              <div className="mt-2">
                                <span className="text-xs text-primary font-medium">
                                  {notification?.actionLabel} →
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Footer */}
            {notifications?.length > 0 && (
              <div className="p-3 border-t border-border">
                <div className="flex items-center justify-between">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={onClearAll}
                    className="text-xs text-muted-foreground"
                  >
                    Limpiar todas
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {/* Navigate to full notifications page */}}
                    className="text-xs"
                  >
                    Ver todas
                  </Button>
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default NotificationCenter;