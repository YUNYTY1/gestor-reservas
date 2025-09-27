import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const RegistrationPrompt = () => {
  const navigate = useNavigate();

  const benefits = [
    {
      icon: 'Calendar',
      title: 'Reservas Rápidas',
      description: 'Reserva tu mesa en segundos'
    },
    {
      icon: 'UtensilsCrossed',
      title: 'Pedidos Online',
      description: 'Ordena desde casa o la oficina'
    },
    {
      icon: 'Gift',
      title: 'Ofertas Exclusivas',
      description: 'Descuentos especiales para miembros'
    },
    {
      icon: 'Clock',
      title: 'Historial',
      description: 'Accede a tus reservas y pedidos anteriores'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-semibold text-foreground mb-2">
          ¿Nuevo en RestaurantBooking?
        </h3>
        <p className="text-muted-foreground text-sm">
          Únete a miles de usuarios que ya disfrutan de nuestros servicios
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {benefits?.map((benefit, index) => (
          <div key={index} className="flex items-start space-x-3 p-3 bg-muted/30 rounded-lg">
            <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
              <Icon name={benefit?.icon} size={16} className="text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">
                {benefit?.title}
              </p>
              <p className="text-xs text-muted-foreground">
                {benefit?.description}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="text-center space-y-4">
        <Button
          variant="outline"
          size="lg"
          fullWidth
          onClick={() => navigate('/register')}
          iconName="UserPlus"
          iconPosition="left"
        >
          Crear Cuenta Nueva
        </Button>
        
        <p className="text-xs text-muted-foreground">
          Al registrarte, aceptas nuestros{' '}
          <button className="text-primary hover:text-primary/80 transition-smooth">
            Términos de Servicio
          </button>{' '}
          y{' '}
          <button className="text-primary hover:text-primary/80 transition-smooth">
            Política de Privacidad
          </button>
        </p>
      </div>
    </div>
  );
};

export default RegistrationPrompt;