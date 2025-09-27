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
      title: 'Privacidad Garantizada',
      description: 'Cumplimos con RGPD'
    },
    {
      icon: 'CheckCircle',
      title: 'Verificación Rápida',
      description: 'Activación en menos de 2 minutos'
    }
  ];

  const testimonials = [
    {
      id: 1,
      name: 'María González',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=64&h=64&fit=crop&crop=face',
      rating: 5,
      comment: `El proceso de registro fue súper fácil y rápido. Ahora puedo reservar mesa desde casa sin problemas.`,
      location: 'Madrid'
    },
    {
      id: 2,
      name: 'Carlos Ruiz',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=face',
      rating: 5,
      comment: `Me encanta poder ver el menú completo antes de ir al restaurante. Las recomendaciones personalizadas son geniales.`,
      location: 'Barcelona'
    },
    {
      id: 3,
      name: 'Ana Martín',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=64&h=64&fit=crop&crop=face',
      rating: 5,
      comment: `Perfecto para organizar cenas con amigos. La gestión de reservas es muy intuitiva.`,
      location: 'Valencia'
    }
  ];

  const certifications = [
    {
      name: 'SSL Certificado',
      icon: 'Shield',
      description: 'Conexión segura'
    },
    {
      name: 'RGPD Compliant',
      icon: 'FileCheck',
      description: 'Protección de datos'
    },
    {
      name: 'ISO 27001',
      icon: 'Award',
      description: 'Seguridad certificada'
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
      {/* Características de Seguridad */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground">
          Tu Seguridad es Nuestra Prioridad
        </h3>
        <div className="space-y-3">
          {securityFeatures?.map((feature, index) => (
            <div key={index} className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-8 h-8 bg-success/10 rounded-full flex items-center justify-center">
                <Icon name={feature?.icon} size={16} className="text-success" />
              </div>
              <div>
                <h4 className="font-medium text-foreground">{feature?.title}</h4>
                <p className="text-sm text-muted-foreground">{feature?.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Testimonios */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground">
          Lo que Dicen Nuestros Clientes
        </h3>
        <div className="space-y-4">
          {testimonials?.map((testimonial) => (
            <div key={testimonial?.id} className="bg-muted/30 rounded-lg p-4 border border-border">
              <div className="flex items-start space-x-3">
                <Image
                  src={testimonial?.avatar}
                  alt={`Avatar de ${testimonial?.name}`}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <h4 className="font-medium text-foreground text-sm">
                      {testimonial?.name}
                    </h4>
                    <span className="text-xs text-muted-foreground">
                      • {testimonial?.location}
                    </span>
                  </div>
                  <div className="flex items-center space-x-1 mb-2">
                    {renderStars(testimonial?.rating)}
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {testimonial?.comment}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Certificaciones */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground">
          Certificaciones y Cumplimiento
        </h3>
        <div className="grid grid-cols-1 gap-3">
          {certifications?.map((cert, index) => (
            <div key={index} className="flex items-center space-x-3 p-3 bg-card border border-border rounded-lg">
              <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                <Icon name={cert?.icon} size={16} className="text-primary" />
              </div>
              <div>
                <h4 className="font-medium text-foreground text-sm">{cert?.name}</h4>
                <p className="text-xs text-muted-foreground">{cert?.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Estadísticas */}
      <div className="bg-primary/5 rounded-lg p-4 border border-primary/10">
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center space-x-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">15.000+</div>
              <div className="text-xs text-muted-foreground">Clientes Activos</div>
            </div>
            <div className="w-px h-8 bg-border"></div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">50.000+</div>
              <div className="text-xs text-muted-foreground">Reservas Realizadas</div>
            </div>
            <div className="w-px h-8 bg-border"></div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">4.9</div>
              <div className="text-xs text-muted-foreground">Valoración Media</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrustSignals;