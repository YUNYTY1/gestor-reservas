import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const OrderCard = ({ order, onViewDetails, onContactRestaurant, onReorder }) => {
  const formatTime = (timestamp) => {
    return new Date(timestamp)?.toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatDate = (timestamp) => {
    return new Date(timestamp)?.toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'received':
        return 'text-success bg-success/10 border-success/20';
      case 'preparing':
        return 'text-warning bg-warning/10 border-warning/20';
      case 'ready':
        return 'text-primary bg-primary/10 border-primary/20';
      case 'delivered':
        return 'text-success bg-success/10 border-success/20';
      case 'cancelled':
        return 'text-error bg-error/10 border-error/20';
      default:
        return 'text-muted-foreground bg-muted border-border';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'received':
        return 'Pedido Recibido';
      case 'preparing':
        return 'En Preparación';
      case 'ready':
        return 'Listo para Recoger';
      case 'delivered':
        return 'Entregado';
      case 'cancelled':
        return 'Cancelado';
      default:
        return 'Estado Desconocido';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-soft">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-1">
            Pedido #{order?.id}
          </h3>
          <p className="text-sm text-muted-foreground">
            {formatDate(order?.createdAt)} • {formatTime(order?.createdAt)}
          </p>
        </div>
        <div className={`px-3 py-1 rounded-full border text-sm font-medium ${getStatusColor(order?.status)}`}>
          {getStatusLabel(order?.status)}
        </div>
      </div>
      <div className="space-y-3 mb-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Total de artículos:</span>
          <span className="text-sm font-medium text-foreground">
            {order?.items?.reduce((sum, item) => sum + item?.quantity, 0)} artículos
          </span>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Total:</span>
          <span className="text-lg font-semibold text-foreground">
            €{order?.total?.toFixed(2)}
          </span>
        </div>

        {order?.estimatedTime && (
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Tiempo estimado:</span>
            <div className="flex items-center space-x-1">
              <Icon name="Clock" size={14} className="text-muted-foreground" />
              <span className="text-sm font-medium text-foreground">
                {order?.estimatedTime} min
              </span>
            </div>
          </div>
        )}
      </div>
      <div className="border-t border-border pt-4">
        <div className="flex flex-wrap gap-2">
          <Button
            variant="default"
            size="sm"
            iconName="Eye"
            iconPosition="left"
            onClick={() => onViewDetails(order)}
          >
            Ver Detalles
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            iconName="Phone"
            iconPosition="left"
            onClick={() => onContactRestaurant(order)}
          >
            Contactar
          </Button>
          
          {order?.status === 'delivered' && (
            <Button
              variant="ghost"
              size="sm"
              iconName="RotateCcw"
              iconPosition="left"
              onClick={() => onReorder(order)}
            >
              Repetir Pedido
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderCard;