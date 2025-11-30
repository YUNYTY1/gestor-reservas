import { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const OrderSummaryPanel = ({ orderItems, onUpdateQuantity, onRemoveItem, onCheckout }) => {
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [isExpanded, setIsExpanded] = useState(true);

  const subtotal = orderItems?.reduce((sum, item) => sum + (item?.price * item?.quantity), 0);
  const tax = subtotal * 0.18;
  const total = subtotal + tax;

  const totalItems = orderItems?.reduce((sum, item) => sum + item?.quantity, 0);
  const estimatedTime = Math.max(...orderItems?.map(item => item?.prepTime), 0);

  if (orderItems?.length === 0) {
    return (
      <div className="bg-card border border-border rounded-lg p-6 shadow-warm">
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
            <Icon name="ShoppingCart" size={32} color="var(--color-muted-foreground)" />
          </div>
          <h3 className="font-heading font-semibold text-foreground mb-2">
            Tu orden está vacía
          </h3>
          <p className="text-sm text-muted-foreground">
            Agrega platillos del menú para comenzar tu orden
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-lg shadow-warm sticky top-20">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon name="ShoppingCart" size={20} color="var(--color-primary)" />
            <h3 className="font-heading font-semibold text-foreground">
              Tu Orden ({totalItems})
            </h3>
          </div>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="lg:hidden p-1 hover:bg-muted rounded transition-quick"
          >
            <Icon name={isExpanded ? 'ChevronUp' : 'ChevronDown'} size={20} />
          </button>
        </div>
      </div>
      {isExpanded && (
        <>
          <div className="max-h-96 overflow-y-auto p-4 space-y-3">
            {orderItems?.map((item) => (
              <div key={item?.id} className="flex gap-3 pb-3 border-b border-border last:border-0">
                <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                  <img
                    src={item?.image}
                    alt={item?.imageAlt}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-sm text-foreground truncate">{item?.name}</h4>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-sm font-semibold text-primary">
                      S/ {item?.price?.toFixed(2)}
                    </span>
                    <div className="flex items-center gap-1 bg-muted rounded">
                      <button
                        onClick={() => onUpdateQuantity(item?.id, item?.quantity - 1)}
                        className="w-6 h-6 flex items-center justify-center hover:bg-muted/80 rounded-l transition-quick"
                      >
                        <Icon name="Minus" size={12} />
                      </button>
                      <span className="w-6 text-center text-xs font-semibold">{item?.quantity}</span>
                      <button
                        onClick={() => onUpdateQuantity(item?.id, item?.quantity + 1)}
                        className="w-6 h-6 flex items-center justify-center hover:bg-muted/80 rounded-r transition-quick"
                      >
                        <Icon name="Plus" size={12} />
                      </button>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => onRemoveItem(item?.id)}
                  className="p-1 hover:bg-error/10 rounded transition-quick"
                >
                  <Icon name="Trash2" size={16} color="var(--color-error)" />
                </button>
              </div>
            ))}
          </div>

          <div className="p-4 border-t border-border space-y-3">
            <Input
              label="Instrucciones Especiales"
              type="text"
              placeholder="Ej: Sin cebolla, extra picante..."
              value={specialInstructions}
              onChange={(e) => setSpecialInstructions(e?.target?.value)}
            />

            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-semibold text-foreground">S/ {subtotal?.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">IGV (18%)</span>
                <span className="font-semibold text-foreground">S/ {tax?.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-border">
                <span className="font-heading font-semibold text-foreground">Total</span>
                <span className="text-2xl font-heading font-bold text-primary">
                  S/ {total?.toFixed(2)}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 p-3 bg-accent/10 rounded-lg">
              <Icon name="Clock" size={16} color="var(--color-accent)" />
              <span className="text-xs text-accent-foreground">
                Tiempo estimado: {estimatedTime} minutos
              </span>
            </div>

            <Button
              variant="default"
              size="lg"
              fullWidth
              iconName="CheckCircle2"
              iconPosition="left"
              onClick={() => onCheckout(specialInstructions)}
            >
              Confirmar Orden
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default OrderSummaryPanel;