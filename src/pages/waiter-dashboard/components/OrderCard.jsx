import { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const OrderCard = ({ order, onConfirm, onModify, onNote }) => {
  const [showNotes, setShowNotes] = useState(false);
  const [noteText, setNoteText] = useState('');

  const getStatusColor = (status) => {
    const colors = {
      pending: 'bg-warning/10 text-warning border-warning/20',
      confirmed: 'bg-success/10 text-success border-success/20',
      preparing: 'bg-primary/10 text-primary border-primary/20',
      ready: 'bg-accent/10 text-accent border-accent/20'
    };
    return colors?.[status] || colors?.pending;
  };

  const getUrgencyIcon = (isUrgent) => {
    return isUrgent ? (
      <div className="flex items-center gap-1 px-2 py-1 bg-error/10 text-error rounded-lg">
        <Icon name="AlertCircle" size={14} />
        <span className="text-xs font-semibold">Urgente</span>
      </div>
    ) : null;
  };

  const handleSaveNote = () => {
    if (noteText?.trim()) {
      onNote(order?.id, noteText);
      setNoteText('');
      setShowNotes(false);
    }
  };

  return (
    <div className="bg-card border border-border rounded-xl shadow-warm overflow-hidden transition-smooth hover:shadow-warm-md">
      <div className="p-4 border-b border-border bg-muted/30">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg">
              <Icon name="UtensilsCrossed" size={24} color="var(--color-primary)" />
            </div>
            <div>
              <h3 className="text-lg font-heading font-semibold text-foreground">
                Mesa {order?.tableNumber}
              </h3>
              <p className="text-sm text-muted-foreground">
                Orden #{order?.orderNumber}
              </p>
            </div>
          </div>
          {getUrgencyIcon(order?.isUrgent)}
        </div>

        <div className="flex items-center gap-2">
          <div className={`px-3 py-1.5 rounded-lg border text-sm font-medium ${getStatusColor(order?.status)}`}>
            {order?.status === 'pending' && 'Pendiente'}
            {order?.status === 'confirmed' && 'Confirmado'}
            {order?.status === 'preparing' && 'Preparando'}
            {order?.status === 'ready' && 'Listo'}
          </div>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Icon name="Clock" size={14} />
            <span>{order?.estimatedTime} min</span>
          </div>
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-start gap-3 mb-4 pb-4 border-b border-border">
          <Image
            src={order?.customerImage}
            alt={order?.customerImageAlt}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div className="flex-1">
            <h4 className="font-semibold text-foreground">{order?.customerName}</h4>
            <div className="flex items-center gap-2 mt-1">
              <Icon name="Phone" size={14} color="var(--color-muted-foreground)" />
              <span className="text-sm text-muted-foreground">{order?.customerPhone}</span>
            </div>
          </div>
        </div>

        <div className="space-y-3 mb-4">
          <h5 className="text-sm font-semibold text-foreground flex items-center gap-2">
            <Icon name="ShoppingBag" size={16} />
            Platos Ordenados
          </h5>
          {order?.items?.map((item, index) => (
            <div key={index} className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
              <Image
                src={item?.image}
                alt={item?.imageAlt}
                className="w-16 h-16 rounded-lg object-cover"
              />
              <div className="flex-1">
                <div className="flex items-start justify-between gap-2">
                  <h6 className="font-semibold text-foreground">{item?.name}</h6>
                  <span className="text-sm font-semibold text-primary">
                    x{item?.quantity}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  S/ {item?.price?.toFixed(2)}
                </p>
                {item?.specialRequest && (
                  <div className="flex items-start gap-2 mt-2 p-2 bg-warning/10 rounded-lg">
                    <Icon name="MessageSquare" size={14} color="var(--color-warning)" />
                    <p className="text-xs text-warning flex-1">{item?.specialRequest}</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between p-3 bg-primary/5 rounded-lg mb-4">
          <span className="font-semibold text-foreground">Total</span>
          <span className="text-lg font-heading font-bold text-primary">
            S/ {order?.total?.toFixed(2)}
          </span>
        </div>

        {order?.status === 'pending' && (
          <div className="space-y-2">
            <div className="grid grid-cols-2 gap-2">
              <Button
                variant="default"
                size="sm"
                iconName="CheckCircle2"
                iconPosition="left"
                onClick={() => onConfirm(order?.id)}
                fullWidth
              >
                Confirmar
              </Button>
              <Button
                variant="outline"
                size="sm"
                iconName="Edit3"
                iconPosition="left"
                onClick={() => onModify(order?.id)}
                fullWidth
              >
                Modificar
              </Button>
            </div>
            <Button
              variant="ghost"
              size="sm"
              iconName="StickyNote"
              iconPosition="left"
              onClick={() => setShowNotes(!showNotes)}
              fullWidth
            >
              {showNotes ? 'Ocultar Notas' : 'Agregar Nota'}
            </Button>
          </div>
        )}

        {showNotes && (
          <div className="mt-3 p-3 bg-muted/50 rounded-lg space-y-2">
            <textarea
              value={noteText}
              onChange={(e) => setNoteText(e?.target?.value)}
              placeholder="Escribir nota especial para la cocina..."
              className="w-full p-3 bg-background border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
              rows={3}
            />
            <div className="flex gap-2">
              <Button
                variant="default"
                size="sm"
                onClick={handleSaveNote}
                fullWidth
              >
                Guardar Nota
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setShowNotes(false);
                  setNoteText('');
                }}
                fullWidth
              >
                Cancelar
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderCard;