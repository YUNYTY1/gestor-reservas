import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const TrustSignals = () => {
  const securityFeatures = [
    {
      icon: 'Shield',
      title: 'Datos Seguros',
      description: 'Encriptación SSL de 256 bits'
    },
    {
      icon: 'Lock',
      title: 'Privacidad',
      description: 'Cumplimiento GDPR'
    },
    {
      icon: 'CheckCircle',
      title: 'Verificado',
      description: 'Certificado de seguridad'
    }
  ];

  const testimonials = [
    {
      name: 'María González',
      rating: 5,
      comment: `Excelente servicio de reservas. La plataforma es muy fácil de usar y siempre encuentro mesa disponible.`,
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=64&h=64&fit=crop&crop=face'
    },
    {
      name: 'Carlos Rodríguez',
      rating: 5,
      comment: `He usado esta aplicación durante meses. La gestión de pedidos es perfecta y el seguimiento en tiempo real es increíble.`,
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=face'
    }
  ];

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Icon
        key={index}
        name="Star"
        size={14}
        className={index < rating ? 'text-accent fill-current' : 'text-muted-foreground'}
      />
    ));
  };

  return (
    <div className="space-y-8">
      {/* Security Features */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground">
          Tu seguridad es nuestra prioridad
        </h3>
        <div className="space-y-3">
          {securityFeatures?.map((feature, index) => (
            <div key={index} className="flex items-center space-x-3">
              <div className="flex-shrink-0 w-8 h-8 bg-success/10 rounded-full flex items-center justify-center">
                <Icon name={feature?.icon} size={16} className="text-success" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">
                  {feature?.title}
                </p>
                <p className="text-xs text-muted-foreground">
                  {feature?.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Customer Testimonials */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground">
          Lo que dicen nuestros clientes
        </h3>
        <div className="space-y-4">
          {testimonials?.map((testimonial, index) => (
            <div key={index} className="bg-muted/50 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <Image
                  src={testimonial?.avatar}
                  alt={`Avatar de ${testimonial?.name}`}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <p className="text-sm font-medium text-foreground">
                      {testimonial?.name}
                    </p>
                    <div className="flex items-center space-x-1">
                      {renderStars(testimonial?.rating)}
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {testimonial?.comment}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Trust Badges */}
      <div className="flex items-center justify-center space-x-4 pt-4 border-t border-border">
        <div className="flex items-center space-x-2">
          <Icon name="Award" size={16} className="text-accent" />
          <span className="text-xs text-muted-foreground">Certificado ISO</span>
        </div>
        <div className="flex items-center space-x-2">
          <Icon name="Users" size={16} className="text-primary" />
          <span className="text-xs text-muted-foreground">+10k usuarios</span>
        </div>
      </div>
    </div>
  );
};

export default TrustSignals;