import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SuccessModal = ({ isOpen, email, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-foreground/20 backdrop-blur-sm">
      <div className="bg-card rounded-2xl shadow-warm-lg max-w-md w-full p-6 md:p-8 animate-in fade-in zoom-in duration-300">
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center">
            <Icon name="CheckCircle2" size={32} color="var(--color-success)" />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-heading font-bold text-foreground">
              ¡Registro Exitoso!
            </h2>
            <p className="text-muted-foreground">
              Tu cuenta ha sido creada correctamente
            </p>
          </div>

          <div className="w-full p-4 bg-muted rounded-lg space-y-2">
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <Icon name="Mail" size={16} />
              <span>Correo de verificación enviado a:</span>
            </div>
            <p className="text-sm font-semibold text-foreground break-all">
              {email}
            </p>
          </div>

          <div className="w-full space-y-3 pt-2">
            <p className="text-sm text-muted-foreground">
              Por favor revisa tu bandeja de entrada y haz clic en el enlace de verificación para activar tu cuenta.
            </p>
            
            <div className="flex items-start gap-2 p-3 bg-warning/10 rounded-lg">
              <Icon name="AlertCircle" size={16} color="var(--color-warning)" className="mt-0.5 flex-shrink-0" />
              <p className="text-xs text-warning-foreground">
                Si no recibes el correo en 5 minutos, revisa tu carpeta de spam
              </p>
            </div>
          </div>

          <Button
            variant="default"
            size="lg"
            fullWidth
            onClick={onClose}
            iconName="ArrowRight"
            iconPosition="right"
          >
            Continuar al Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;