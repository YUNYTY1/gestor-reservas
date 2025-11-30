import Icon from '../../../components/AppIcon';

const PeruvianFeatures = () => {
  const features = [
    {
      icon: 'Calendar',
      title: 'Reservas Fáciles',
      description: 'Sistema intuitivo para reservar tu mesa en minutos'
    },
    {
      icon: 'UtensilsCrossed',
      title: 'Menú Auténtico',
      description: 'Platos tradicionales peruanos con precios en soles'
    },
    {
      icon: 'Bell',
      title: 'Notificaciones',
      description: 'Confirmaciones por correo de tus reservas y pedidos'
    },
    {
      icon: 'Clock',
      title: 'Seguimiento',
      description: 'Rastrea el estado de tus pedidos en tiempo real'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="text-xl font-heading font-bold text-foreground">
          Beneficios de Registrarte
        </h3>
        <p className="text-sm text-muted-foreground">
          Disfruta de una experiencia gastronómica peruana completa
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {features?.map((feature, index) => (
          <div
            key={index}
            className="flex items-start gap-3 p-4 bg-card border border-border rounded-lg hover:shadow-warm transition-smooth"
          >
            <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name={feature?.icon} size={20} color="var(--color-primary)" />
            </div>
            <div className="space-y-1">
              <h4 className="font-semibold text-foreground text-sm">
                {feature?.title}
              </h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {feature?.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    
    </div>
  );
};

export default PeruvianFeatures;