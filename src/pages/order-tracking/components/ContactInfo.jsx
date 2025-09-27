import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ContactInfo = ({ restaurantInfo, onCall, onMessage }) => {
  const handleCall = () => {
    if (restaurantInfo?.phone) {
      window.open(`tel:${restaurantInfo?.phone}`, '_self');
      if (onCall) onCall();
    }
  };

  const handleMessage = () => {
    if (restaurantInfo?.whatsapp) {
      const message = encodeURIComponent('Hola, tengo una consulta sobre mi pedido.');
      window.open(`https://wa.me/${restaurantInfo?.whatsapp}?text=${message}`, '_blank');
      if (onMessage) onMessage();
    }
  };

  const handleDirections = () => {
    if (restaurantInfo?.address) {
      const encodedAddress = encodeURIComponent(restaurantInfo?.address);
      window.open(`https://www.google.com/maps/search/?api=1&query=${encodedAddress}`, '_blank');
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-soft">
      <h3 className="text-lg font-semibold text-foreground mb-4">
        Información de Contacto
      </h3>
      <div className="space-y-4">
        {/* Restaurant Name */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
            <Icon name="UtensilsCrossed" size={20} color="white" />
          </div>
          <div>
            <h4 className="font-medium text-foreground">{restaurantInfo?.name}</h4>
            <p className="text-sm text-muted-foreground">{restaurantInfo?.type}</p>
          </div>
        </div>
        
        {/* Contact Details */}
        <div className="space-y-3">
          {restaurantInfo?.phone && (
            <div className="flex items-center space-x-3">
              <Icon name="Phone" size={16} className="text-muted-foreground" />
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">{restaurantInfo?.phone}</p>
                <p className="text-xs text-muted-foreground">Teléfono principal</p>
              </div>
            </div>
          )}
          
          {restaurantInfo?.email && (
            <div className="flex items-center space-x-3">
              <Icon name="Mail" size={16} className="text-muted-foreground" />
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">{restaurantInfo?.email}</p>
                <p className="text-xs text-muted-foreground">Correo electrónico</p>
              </div>
            </div>
          )}
          
          {restaurantInfo?.address && (
            <div className="flex items-start space-x-3">
              <Icon name="MapPin" size={16} className="text-muted-foreground mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">{restaurantInfo?.address}</p>
                <p className="text-xs text-muted-foreground">Dirección del restaurante</p>
              </div>
            </div>
          )}
          
          {restaurantInfo?.hours && (
            <div className="flex items-start space-x-3">
              <Icon name="Clock" size={16} className="text-muted-foreground mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">{restaurantInfo?.hours}</p>
                <p className="text-xs text-muted-foreground">Horario de atención</p>
              </div>
            </div>
          )}
        </div>
        
        {/* Action Buttons */}
        <div className="border-t border-border pt-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Button
              variant="default"
              size="sm"
              iconName="Phone"
              iconPosition="left"
              onClick={handleCall}
              fullWidth
            >
              Llamar Ahora
            </Button>
            
            {restaurantInfo?.whatsapp && (
              <Button
                variant="outline"
                size="sm"
                iconName="MessageCircle"
                iconPosition="left"
                onClick={handleMessage}
                fullWidth
              >
                WhatsApp
              </Button>
            )}
            
            {restaurantInfo?.address && (
              <Button
                variant="ghost"
                size="sm"
                iconName="Navigation"
                iconPosition="left"
                onClick={handleDirections}
                fullWidth
                className="sm:col-span-2"
              >
                Cómo Llegar
              </Button>
            )}
          </div>
        </div>
        
        {/* Emergency Note */}
        <div className="bg-warning/10 border border-warning/20 rounded-lg p-3">
          <div className="flex items-start space-x-2">
            <Icon name="AlertTriangle" size={16} className="text-warning mt-0.5" />
            <div>
              <p className="text-sm font-medium text-warning">Consultas Urgentes</p>
              <p className="text-xs text-muted-foreground mt-1">
                Para consultas urgentes sobre tu pedido, llama directamente al restaurante.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;