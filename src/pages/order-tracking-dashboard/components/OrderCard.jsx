import { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const OrderCard = ({ order, onStatusUpdate, onNotifyCustomer }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(order?.status);

  const statusConfig = {
    received: { 
      color: 'bg-accent/20 text-accent border-accent/30', 
      icon: 'Clock',
      label: 'Recibido' 
    },
    preparing: { 
      color: 'bg-warning/20 text-warning border-warning/30', 
      icon: 'ChefHat',
      label: 'Preparando' 
    },
    ready: { 
      color: 'bg-success/20 text-success border-success/30', 
      icon: 'CheckCircle2',
      label: 'Listo' 
    },
    served: { 
      color: 'bg-muted text-muted-foreground border-border', 
      icon: 'Check',
      label: 'Servido' 
    }
  };

  const priorityConfig = {
    high: { color: 'text-error', icon: 'AlertCircle', label: 'Alta' },
    medium: { color: 'text-warning', icon: 'AlertTriangle', label: 'Media' },
    low: { color: 'text-muted-foreground', icon: 'Info', label: 'Baja' }
  };

  const statusOptions = [
    { value: 'received', label: 'Recibido' },
    { value: 'preparing', label: 'Preparando' },
    { value: 'ready', label: 'Listo' },
    { value: 'served', label: 'Servido' }
  ];

  const currentStatus = statusConfig?.[order?.status];
  const currentPriority = priorityConfig?.[order?.priority];

  const handleStatusChange = (newStatus) => {
    setSelectedStatus(newStatus);
    onStatusUpdate(order?.id, newStatus);
  };

  const formatTime = (date) => {
    return new Date(date)?.toLocaleTimeString('es-PE', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const formatPrice = (price) => {
    return `S/ ${price?.toFixed(2)}`;
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-warm hover:shadow-warm-md transition-smooth overflow-hidden">
      <div className="p-4 lg:p-6">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex items-start gap-3 flex-1">
            <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg flex-shrink-0">
              <Icon name="UtensilsCrossed" size={24} color="var(--color-primary)" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-lg font-heading font-semibold text-foreground">
                  Pedido #{order?.orderNumber}
                </h3>
                <span className={`flex items-center gap-1 text-xs font-medium ${currentPriority?.color}`}>
                  <Icon name={currentPriority?.icon} size={14} />
                  {currentPriority?.label}
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Icon name="User" size={14} />
                  {order?.customerName}
                </span>
                <span className="flex items-center gap-1">
                  <Icon name="MapPin" size={14} />
                  Mesa {order?.tableNumber}
                </span>
                <span className="flex items-center gap-1">
                  <Icon name="Clock" size={14} />
                  {formatTime(order?.orderTime)}
                </span>
              </div>
            </div>
          </div>
          <div className={`px-3 py-1.5 rounded-lg border flex items-center gap-2 ${currentStatus?.color}`}>
            <Icon name={currentStatus?.icon} size={16} />
            <span className="text-sm font-semibold">{currentStatus?.label}</span>
          </div>
        </div>

        <div className="space-y-3 mb-4">
          {order?.items?.slice(0, isExpanded ? undefined : 2)?.map((item, index) => (
            <div key={index} className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
              <Image
                src={item?.image}
                alt={item?.imageAlt}
                className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h4 className="font-semibold text-foreground">{item?.name}</h4>
                  <span className="text-sm font-semibold text-foreground whitespace-nowrap">
                    {formatPrice(item?.price)}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mb-1">
                  Cantidad: {item?.quantity}
                </p>
                {item?.notes && (
                  <p className="text-xs text-muted-foreground italic">
                    Nota: {item?.notes}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        {order?.items?.length > 2 && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-quick mb-4"
          >
            <Icon name={isExpanded ? 'ChevronUp' : 'ChevronDown'} size={16} />
            {isExpanded ? 'Ver menos' : `Ver ${order?.items?.length - 2} más`}
          </button>
        )}

        {order?.specialInstructions && (
          <div className="p-3 bg-accent/10 border border-accent/30 rounded-lg mb-4">
            <div className="flex items-start gap-2">
              <Icon name="MessageSquare" size={16} color="var(--color-accent)" className="flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-semibold text-accent mb-1">Instrucciones Especiales:</p>
                <p className="text-sm text-foreground">{order?.specialInstructions}</p>
              </div>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between pt-4 border-t border-border">
          <div className="flex items-center gap-4">
            <div className="text-sm">
              <span className="text-muted-foreground">Tiempo estimado:</span>
              <span className="ml-2 font-semibold text-foreground">{order?.estimatedTime} min</span>
            </div>
            <div className="text-sm">
              <span className="text-muted-foreground">Total:</span>
              <span className="ml-2 font-semibold text-primary">{formatPrice(order?.totalAmount)}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 mt-4 pt-4 border-t border-border">
          <div className="flex-1">
            <Select
              options={statusOptions}
              value={selectedStatus}
              onChange={handleStatusChange}
              placeholder="Actualizar estado"
            />
          </div>
          <Button
            variant="outline"
            iconName="Bell"
            iconPosition="left"
            onClick={() => onNotifyCustomer(order?.id)}
          >
            Notificar Cliente
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;