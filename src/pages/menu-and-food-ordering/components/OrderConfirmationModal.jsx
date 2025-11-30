import { useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const OrderConfirmationModal = ({ isOpen, onClose, orderDetails }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-foreground/50 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative bg-card border border-border rounded-lg shadow-warm-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex flex-col items-center text-center mb-6">
            <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mb-4">
              <Icon name="CheckCircle2" size={32} color="var(--color-success)" />
            </div>
            <h2 className="text-2xl font-heading font-bold text-foreground mb-2">
              ¡Orden Confirmada!
            </h2>
            <p className="text-sm text-muted-foreground">
              Tu orden ha sido recibida y está siendo preparada
            </p>
          </div>

          <div className="space-y-4 mb-6">
            <div className="p-4 bg-muted rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Número de Orden</span>
                <span className="font-mono font-semibold text-foreground">
                  #{orderDetails?.orderNumber}
                </span>
              </div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Total</span>
                <span className="text-lg font-heading font-bold text-primary">
                  S/ {orderDetails?.total?.toFixed(2)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Tiempo Estimado</span>
                <span className="font-semibold text-foreground">
                  {orderDetails?.estimatedTime} min
                </span>
              </div>
            </div>

            <div className="p-4 bg-accent/10 rounded-lg">
              <div className="flex items-start gap-3">
                <Icon name="Mail" size={20} color="var(--color-accent)" />
                <div>
                  <p className="text-sm font-semibold text-accent-foreground mb-1">
                    Confirmación Enviada
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Hemos enviado los detalles de tu orden a {orderDetails?.email}
                  </p>
                </div>
              </div>
            </div>

            {orderDetails?.tableNumber && (
              <div className="p-4 bg-primary/10 rounded-lg">
                <div className="flex items-center gap-3">
                  <Icon name="MapPin" size={20} color="var(--color-primary)" />
                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      Mesa #{orderDetails?.tableNumber}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Tu orden será servida en tu mesa
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Button
              variant="default"
              size="lg"
              fullWidth
              iconName="Eye"
              iconPosition="left"
              onClick={() => {
                onClose();
                window.location.href = '/order-tracking-dashboard';
              }}
            >
              Ver Estado de Orden
            </Button>
            <Button
              variant="outline"
              size="lg"
              fullWidth
              onClick={onClose}
            >
              Continuar Navegando
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmationModal;