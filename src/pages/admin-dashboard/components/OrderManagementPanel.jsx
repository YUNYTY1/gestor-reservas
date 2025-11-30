import { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const OrderManagementPanel = ({ orders, onConfirm, onComplete, onCancel }) => {
  const [filterStatus, setFilterStatus] = useState('all');

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('es-PE', {
      style: 'currency',
      currency: 'PEN',
      minimumFractionDigits: 2
    })?.format(amount);
  };

  const formatTime = (timestamp) => {
    return new Intl.DateTimeFormat('es-PE', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    })?.format(new Date(timestamp));
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'pending': return 'bg-warning/10 text-warning border-warning/20';
      case 'confirmed': return 'bg-primary/10 text-primary border-primary/20';
      case 'preparing': return 'bg-accent/10 text-accent border-accent/20';
      case 'ready': return 'bg-success/10 text-success border-success/20';
      case 'completed': return 'bg-muted text-muted-foreground border-border';
      case 'cancelled': return 'bg-error/10 text-error border-error/20';
      default: return 'bg-muted text-muted-foreground border-border';
    }
  };

  const getStatusLabel = (status) => {
    switch(status) {
      case 'pending': return 'Pendiente';
      case 'confirmed': return 'Confirmado';
      case 'preparing': return 'Preparando';
      case 'ready': return 'Listo';
      case 'completed': return 'Completado';
      case 'cancelled': return 'Cancelado';
      default: return status;
    }
  };

  const filteredOrders = filterStatus === 'all' 
    ? orders 
    : orders?.filter(order => order?.status === filterStatus);

  const statusFilters = [
    { value: 'all', label: 'Todos', icon: 'List' },
    { value: 'pending', label: 'Pendientes', icon: 'Clock' },
    { value: 'confirmed', label: 'Confirmados', icon: 'CheckCircle' },
    { value: 'preparing', label: 'Preparando', icon: 'ChefHat' },
    { value: 'ready', label: 'Listos', icon: 'Package' }
  ];

  return (
    <div className="bg-card rounded-lg border border-border shadow-warm">
      <div className="p-6 border-b border-border">
        <h3 className="text-xl font-heading font-semibold text-foreground mb-4">
          Gestión de Pedidos
        </h3>
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide">
          {statusFilters?.map((filter) => (
            <button
              key={filter?.value}
              onClick={() => setFilterStatus(filter?.value)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap transition-smooth ${
                filterStatus === filter?.value
                  ? 'bg-primary text-primary-foreground shadow-warm'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              <Icon name={filter?.icon} size={16} />
              <span className="text-sm font-medium">{filter?.label}</span>
            </button>
          ))}
        </div>
      </div>
      <div className="p-6">
        {filteredOrders?.length === 0 ? (
          <div className="text-center py-12">
            <Icon name="ShoppingBag" size={48} color="var(--color-muted-foreground)" className="mx-auto mb-4" />
            <p className="text-muted-foreground">No hay pedidos en esta categoría</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredOrders?.map((order) => (
              <div 
                key={order?.id}
                className="bg-background rounded-lg border border-border p-4 hover:shadow-warm transition-smooth"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-semibold text-foreground">Pedido #{order?.orderNumber}</h4>
                      <span className={`px-2 py-1 rounded-md text-xs font-medium border ${getStatusColor(order?.status)}`}>
                        {getStatusLabel(order?.status)}
                      </span>
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Icon name="User" size={14} />
                        <span>{order?.customerName}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Icon name="Clock" size={14} />
                        <span>{formatTime(order?.timestamp)}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Icon name="MapPin" size={14} />
                        <span>Mesa {order?.tableNumber}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-heading font-bold text-primary">
                      {formatCurrency(order?.total)}
                    </p>
                  </div>
                </div>

                <div className="mt-3 pt-3 border-t border-border">
                  <p className="text-sm font-medium text-foreground mb-2">Artículos:</p>
                  <div className="space-y-1">
                    {order?.items?.map((item, index) => (
                      <div key={index} className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">
                          {item?.quantity}x {item?.name}
                        </span>
                        <span className="font-medium text-foreground">
                          {formatCurrency(item?.price * item?.quantity)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {order?.notes && (
                  <div className="mt-3 pt-3 border-t border-border">
                    <div className="flex items-start gap-2 text-sm">
                      <Icon name="MessageSquare" size={14} className="mt-0.5 text-muted-foreground" />
                      <span className="text-muted-foreground flex-1">{order?.notes}</span>
                    </div>
                  </div>
                )}

                <div className="flex items-center gap-2 mt-4 pt-4 border-t border-border">
                  {order?.status === 'pending' && (
                    <>
                      <Button
                        variant="default"
                        size="sm"
                        iconName="Check"
                        iconPosition="left"
                        onClick={() => onConfirm(order?.id)}
                        className="flex-1"
                      >
                        Confirmar
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        iconName="X"
                        iconPosition="left"
                        onClick={() => onCancel(order?.id)}
                        className="flex-1"
                      >
                        Cancelar
                      </Button>
                    </>
                  )}
                  {(order?.status === 'confirmed' || order?.status === 'preparing') && (
                    <Button
                      variant="default"
                      size="sm"
                      iconName="CheckCircle"
                      iconPosition="left"
                      onClick={() => onComplete(order?.id)}
                      fullWidth
                    >
                      Marcar como Listo
                    </Button>
                  )}
                  {order?.status === 'ready' && (
                    <Button
                      variant="success"
                      size="sm"
                      iconName="Check"
                      iconPosition="left"
                      onClick={() => onComplete(order?.id)}
                      fullWidth
                    >
                      Completar Pedido
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderManagementPanel;