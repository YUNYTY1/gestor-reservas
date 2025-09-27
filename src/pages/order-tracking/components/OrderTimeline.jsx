import React from 'react';
import Icon from '../../../components/AppIcon';

const OrderTimeline = ({ updates = [] }) => {
  const formatTime = (timestamp) => {
    return new Date(timestamp)?.toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatDate = (timestamp) => {
    return new Date(timestamp)?.toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'short'
    });
  };

  const getUpdateIcon = (type) => {
    switch (type) {
      case 'created':
        return 'Plus';
      case 'confirmed':
        return 'CheckCircle';
      case 'preparing':
        return 'ChefHat';
      case 'ready':
        return 'Package';
      case 'delivered':
        return 'Truck';
      case 'cancelled':
        return 'XCircle';
      case 'note':
        return 'MessageSquare';
      default:
        return 'Clock';
    }
  };

  const getUpdateColor = (type) => {
    switch (type) {
      case 'created': case'confirmed': case'delivered':
        return 'text-success';
      case 'preparing': case'ready':
        return 'text-primary';
      case 'cancelled':
        return 'text-error';
      case 'note':
        return 'text-warning';
      default:
        return 'text-muted-foreground';
    }
  };

  if (updates?.length === 0) {
    return (
      <div className="text-center py-8">
        <Icon name="Clock" size={32} className="text-muted-foreground mx-auto mb-2" />
        <p className="text-sm text-muted-foreground">
          No hay actualizaciones disponibles
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-foreground mb-4">
        Historial del Pedido
      </h3>
      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-border" />
        
        {/* Timeline items */}
        <div className="space-y-6">
          {updates?.map((update, index) => (
            <div key={index} className="relative flex items-start space-x-4">
              <div className={`relative z-10 w-8 h-8 rounded-full bg-background border-2 border-border flex items-center justify-center ${getUpdateColor(update?.type)}`}>
                <Icon 
                  name={getUpdateIcon(update?.type)} 
                  size={16} 
                />
              </div>
              
              <div className="flex-1 min-w-0 pb-4">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="text-sm font-medium text-foreground">
                    {update?.title}
                  </h4>
                  <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                    <span>{formatDate(update?.timestamp)}</span>
                    <span>•</span>
                    <span>{formatTime(update?.timestamp)}</span>
                  </div>
                </div>
                
                <p className="text-sm text-muted-foreground">
                  {update?.description}
                </p>
                
                {update?.staffNote && (
                  <div className="mt-2 p-2 bg-muted/50 rounded-lg">
                    <p className="text-xs text-muted-foreground">
                      <Icon name="MessageSquare" size={12} className="inline mr-1" />
                      Nota del personal: {update?.staffNote}
                    </p>
                  </div>
                )}
                
                {update?.estimatedTime && (
                  <div className="mt-2 flex items-center space-x-1 text-xs text-muted-foreground">
                    <Icon name="Clock" size={12} />
                    <span>Tiempo estimado: {update?.estimatedTime} min</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderTimeline;