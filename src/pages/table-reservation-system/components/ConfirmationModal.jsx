import { useEffect } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const ConfirmationModal = ({ isOpen, onClose, reservationData }) => {
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

  const formatDate = (date) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return date?.toLocaleDateString('es-PE', options);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-foreground/40 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative bg-card rounded-lg shadow-warm-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-success text-success-foreground p-6 rounded-t-lg">
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 bg-success-foreground/20 rounded-full flex items-center justify-center">
              <Icon name="CheckCircle2" size={32} color="white" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-center">¡Reserva Confirmada!</h2>
          <p className="text-center text-success-foreground/90 mt-2">
            Su mesa ha sido reservada exitosamente
          </p>
        </div>

        <div className="p-6 space-y-6">
          <div className="bg-muted/50 rounded-lg p-4 space-y-3">
            <div className="flex items-center gap-3">
              <Icon name="User" size={20} color="var(--color-primary)" />
              <div className="flex-1">
                <p className="text-xs text-muted-foreground">Nombre</p>
                <p className="text-sm font-semibold text-foreground">{reservationData?.name}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Icon name="Mail" size={20} color="var(--color-primary)" />
              <div className="flex-1">
                <p className="text-xs text-muted-foreground">Correo</p>
                <p className="text-sm font-semibold text-foreground">{reservationData?.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Icon name="Phone" size={20} color="var(--color-primary)" />
              <div className="flex-1">
                <p className="text-xs text-muted-foreground">Teléfono</p>
                <p className="text-sm font-semibold text-foreground">{reservationData?.phone}</p>
              </div>
            </div>
          </div>

          <div className="bg-primary/10 rounded-lg p-4 space-y-3">
            <div className="flex items-center gap-3">
              <Icon name="Calendar" size={20} color="var(--color-primary)" />
              <div className="flex-1">
                <p className="text-xs text-muted-foreground">Fecha</p>
                <p className="text-sm font-semibold text-foreground capitalize">
                  {formatDate(reservationData?.date)}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Icon name="Clock" size={20} color="var(--color-primary)" />
              <div className="flex-1">
                <p className="text-xs text-muted-foreground">Horario</p>
                <p className="text-sm font-semibold text-foreground">{reservationData?.time}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Icon name="Users" size={20} color="var(--color-primary)" />
              <div className="flex-1">
                <p className="text-xs text-muted-foreground">Personas</p>
                <p className="text-sm font-semibold text-foreground">
                  {reservationData?.partySize} {parseInt(reservationData?.partySize) === 1 ? 'persona' : 'personas'}
                </p>
              </div>
            </div>
          </div>

          {reservationData?.specialRequests && (
            <div className="bg-muted/50 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <Icon name="MessageSquare" size={20} color="var(--color-primary)" className="mt-0.5" />
                <div className="flex-1">
                  <p className="text-xs text-muted-foreground mb-1">Solicitudes especiales</p>
                  <p className="text-sm text-foreground">{reservationData?.specialRequests}</p>
                </div>
              </div>
            </div>
          )}

          <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <Icon name="Mail" size={20} color="var(--color-accent)" className="mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-semibold text-foreground mb-1">
                  Confirmación enviada
                </p>
                <p className="text-xs text-muted-foreground">
                  Hemos enviado los detalles de su reserva a {reservationData?.email}. 
                  Por favor revise su bandeja de entrada y spam.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-muted/30 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <Icon name="Info" size={18} color="var(--color-primary)" className="mt-0.5" />
              <div className="flex-1">
                <p className="text-xs font-semibold text-foreground mb-2">Políticas de reserva</p>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li>• Llegue 10 minutos antes de su horario reservado</li>
                  <li>• La reserva es válida por 15 minutos después de la hora</li>
                  <li>• Para cancelaciones, contacte al +51 999 888 777</li>
                  <li>• Cambios permitidos hasta 2 horas antes</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <Button
              variant="default"
              size="lg"
              fullWidth
              iconName="UtensilsCrossed"
              iconPosition="left"
              onClick={() => window.location.href = '/menu-and-food-ordering'}
            >
              Ver Menú y Ordenar
            </Button>
            <Button
              variant="outline"
              size="lg"
              fullWidth
              onClick={onClose}
            >
              Cerrar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;