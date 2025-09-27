import React from 'react';
import Icon from "../AppIcon";

const ReservationStatusIndicator = ({ 
  status = 'pending', 
  reservationTime, 
  tableNumber, 
  partySize,
  showDetails = true,
  size = 'default' 
}) => {
  const statusConfig = {
    pending: {
      icon: 'Clock',
      label: 'Pendiente',
      color: 'text-warning',
      bgColor: 'bg-warning/10',
      borderColor: 'border-warning/20'
    },
    confirmed: {
      icon: 'CheckCircle',
      label: 'Confirmada',
      color: 'text-success',
      bgColor: 'bg-success/10',
      borderColor: 'border-success/20'
    },
    seated: {
      icon: 'Users',
      label: 'En Mesa',
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      borderColor: 'border-primary/20'
    },
    completed: {
      icon: 'Check',
      label: 'Completada',
      color: 'text-muted-foreground',
      bgColor: 'bg-muted',
      borderColor: 'border-border'
    },
    cancelled: {
      icon: 'XCircle',
      label: 'Cancelada',
      color: 'text-error',
      bgColor: 'bg-error/10',
      borderColor: 'border-error/20'
    },
    no_show: {
      icon: 'AlertTriangle',
      label: 'No Presentado',
      color: 'text-error',
      bgColor: 'bg-error/10',
      borderColor: 'border-error/20'
    }
  };

  const config = statusConfig?.[status] || statusConfig?.pending;
  
  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    default: 'px-3 py-2 text-sm',
    lg: 'px-4 py-3 text-base'
  };

  const iconSizes = {
    sm: 14,
    default: 16,
    lg: 20
  };

  const formatTime = (time) => {
    if (!time) return '';
    return new Date(time)?.toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatDate = (time) => {
    if (!time) return '';
    return new Date(time)?.toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'short'
    });
  };

  if (!showDetails) {
    return (
      <div className={`inline-flex items-center space-x-2 rounded-full border ${config?.bgColor} ${config?.borderColor} ${sizeClasses?.[size]}`}>
        <Icon 
          name={config?.icon} 
          size={iconSizes?.[size]} 
          className={config?.color} 
        />
        <span className={`font-medium ${config?.color}`}>
          {config?.label}
        </span>
      </div>
    );
  }

  return (
    <div className={`rounded-lg border ${config?.bgColor} ${config?.borderColor} p-4 transition-smooth`}>
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-3">
          <div className={`p-2 rounded-full ${config?.bgColor} border ${config?.borderColor}`}>
            <Icon 
              name={config?.icon} 
              size={20} 
              className={config?.color} 
            />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className={`font-semibold ${config?.color}`}>
                {config?.label}
              </span>
              {tableNumber && (
                <span className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded-full">
                  Mesa {tableNumber}
                </span>
              )}
            </div>
            {reservationTime && (
              <div className="flex items-center space-x-4 mt-1 text-sm text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <Icon name="Calendar" size={14} />
                  <span>{formatDate(reservationTime)}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="Clock" size={14} />
                  <span>{formatTime(reservationTime)}</span>
                </div>
                {partySize && (
                  <div className="flex items-center space-x-1">
                    <Icon name="Users" size={14} />
                    <span>{partySize} personas</span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        
        {status === 'pending' && (
          <div className="flex space-x-2">
            <button className="p-1 text-success hover:bg-success/10 rounded-full transition-smooth">
              <Icon name="Check" size={16} />
            </button>
            <button className="p-1 text-error hover:bg-error/10 rounded-full transition-smooth">
              <Icon name="X" size={16} />
            </button>
          </div>
        )}
      </div>
      {/* Progress indicator for active reservations */}
      {(status === 'confirmed' || status === 'seated') && reservationTime && (
        <div className="mt-3">
          <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
            <span>Tiempo estimado</span>
            <span>
              {status === 'confirmed' ? 'Llegada esperada' : 'En servicio'}
            </span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className={`h-2 rounded-full transition-smooth ${
                status === 'confirmed' ? 'bg-warning' : 'bg-primary'
              }`}
              style={{ width: status === 'confirmed' ? '60%' : '80%' }}
            ></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReservationStatusIndicator;