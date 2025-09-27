import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const BookingSummary = ({ 
  reservationDetails,
  onConfirm,
  onEdit,
  isLoading = false 
}) => {
  const {
    selectedDate,
    selectedTime,
    partySize,
    specialAccommodations = [],
    dietaryRestrictions = [],
    celebrationDetails,
    specialRequests,
    tablePreference,
    estimatedDuration = 120
  } = reservationDetails;

  const formatDate = (date) => {
    if (!date) return '';
    return new Date(date)?.toLocaleDateString('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (time) => {
    if (!time) return '';
    const [hours, minutes] = time?.split(':');
    const date = new Date();
    date?.setHours(parseInt(hours), parseInt(minutes));
    return date?.toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getEndTime = (startTime, duration) => {
    if (!startTime) return '';
    const [hours, minutes] = startTime?.split(':');
    const startDate = new Date();
    startDate?.setHours(parseInt(hours), parseInt(minutes));
    const endDate = new Date(startDate.getTime() + duration * 60000);
    return endDate?.toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const accommodationLabels = {
    highchair: 'Silla alta para niños',
    wheelchair: 'Acceso para silla de ruedas',
    booster: 'Asiento elevador',
    quiet: 'Mesa tranquila'
  };

  const dietaryLabels = {
    vegetarian: 'Vegetariano',
    vegan: 'Vegano',
    gluten_free: 'Sin Gluten',
    dairy_free: 'Sin Lácteos',
    nut_allergy: 'Alergia a Frutos Secos',
    seafood_allergy: 'Alergia a Mariscos',
    diabetic: 'Diabético',
    kosher: 'Kosher',
    halal: 'Halal'
  };

  const preferenceLabels = {
    interior: 'Interior',
    exterior: 'Terraza',
    window: 'Junto a Ventana',
    bar: 'Barra',
    private: 'Área Privada',
    family: 'Zona Familiar'
  };

  const celebrationLabels = {
    birthday: 'Cumpleaños',
    anniversary: 'Aniversario',
    engagement: 'Compromiso',
    graduation: 'Graduación',
    business: 'Cena de Negocios',
    date: 'Cita Romántica',
    other: 'Otra celebración'
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-foreground">Resumen de Reserva</h3>
        <Button
          variant="ghost"
          size="sm"
          iconName="Edit"
          iconPosition="left"
          onClick={onEdit}
        >
          Editar
        </Button>
      </div>
      {/* Main Reservation Details */}
      <div className="space-y-4">
        <div className="flex items-center space-x-3 p-4 bg-primary/5 border border-primary/20 rounded-lg">
          <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
            <Icon name="Calendar" size={24} color="white" />
          </div>
          <div>
            <h4 className="font-semibold text-foreground">{formatDate(selectedDate)}</h4>
            <p className="text-sm text-muted-foreground">
              {formatTime(selectedTime)} - {getEndTime(selectedTime, estimatedDuration)}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center space-x-3">
            <Icon name="Users" size={20} className="text-primary" />
            <div>
              <p className="font-medium text-foreground">{partySize} Persona{partySize !== 1 ? 's' : ''}</p>
              <p className="text-xs text-muted-foreground">Comensales</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <Icon name="Clock" size={20} className="text-primary" />
            <div>
              <p className="font-medium text-foreground">{estimatedDuration} min</p>
              <p className="text-xs text-muted-foreground">Duración estimada</p>
            </div>
          </div>
        </div>
      </div>
      {/* Table Preference */}
      {tablePreference && (
        <div className="space-y-2">
          <h4 className="font-medium text-foreground flex items-center space-x-2">
            <Icon name="MapPin" size={16} />
            <span>Preferencia de Mesa</span>
          </h4>
          <p className="text-sm text-muted-foreground ml-6">
            {preferenceLabels?.[tablePreference] || tablePreference}
          </p>
        </div>
      )}
      {/* Special Accommodations */}
      {specialAccommodations?.length > 0 && (
        <div className="space-y-2">
          <h4 className="font-medium text-foreground flex items-center space-x-2">
            <Icon name="Heart" size={16} />
            <span>Necesidades Especiales</span>
          </h4>
          <div className="ml-6 space-y-1">
            {specialAccommodations?.map(accommodation => (
              <p key={accommodation} className="text-sm text-muted-foreground">
                • {accommodationLabels?.[accommodation] || accommodation}
              </p>
            ))}
          </div>
        </div>
      )}
      {/* Dietary Restrictions */}
      {dietaryRestrictions?.length > 0 && (
        <div className="space-y-2">
          <h4 className="font-medium text-foreground flex items-center space-x-2">
            <Icon name="Utensils" size={16} />
            <span>Restricciones Dietéticas</span>
          </h4>
          <div className="ml-6 space-y-1">
            {dietaryRestrictions?.map(restriction => (
              <p key={restriction} className="text-sm text-muted-foreground">
                • {dietaryLabels?.[restriction] || restriction}
              </p>
            ))}
          </div>
        </div>
      )}
      {/* Celebration Details */}
      {celebrationDetails?.type && (
        <div className="space-y-2">
          <h4 className="font-medium text-foreground flex items-center space-x-2">
            <Icon name="PartyPopper" size={16} />
            <span>Ocasión Especial</span>
          </h4>
          <div className="ml-6">
            <p className="text-sm text-muted-foreground">
              {celebrationLabels?.[celebrationDetails?.type] || celebrationDetails?.type}
            </p>
            {celebrationDetails?.details && (
              <p className="text-sm text-muted-foreground mt-1">
                {celebrationDetails?.details}
              </p>
            )}
          </div>
        </div>
      )}
      {/* Special Requests */}
      {specialRequests && (
        <div className="space-y-2">
          <h4 className="font-medium text-foreground flex items-center space-x-2">
            <Icon name="MessageSquare" size={16} />
            <span>Solicitudes Especiales</span>
          </h4>
          <div className="ml-6 p-3 bg-muted/50 rounded-lg">
            <p className="text-sm text-muted-foreground whitespace-pre-line">
              {specialRequests}
            </p>
          </div>
        </div>
      )}
      {/* Cancellation Policy */}
      <div className="pt-4 border-t border-border">
        <h4 className="font-medium text-foreground mb-2">Política de Cancelación</h4>
        <div className="space-y-2 text-sm text-muted-foreground">
          <p>• Cancelación gratuita hasta 2 horas antes de la reserva</p>
          <p>• Modificaciones permitidas hasta 1 hora antes</p>
          <p>• No-show puede resultar en cargo del 50% del menú mínimo</p>
        </div>
      </div>
      {/* Confirmation Button */}
      <div className="pt-4">
        <Button
          variant="default"
          size="lg"
          fullWidth
          loading={isLoading}
          iconName="Check"
          iconPosition="left"
          onClick={onConfirm}
        >
          {isLoading ? 'Confirmando Reserva...' : 'Confirmar Reserva'}
        </Button>
      </div>
      {/* Contact Information */}
      <div className="p-3 bg-muted/50 border border-border rounded-lg">
        <div className="flex items-start space-x-2">
          <Icon name="Info" size={16} className="text-primary mt-0.5" />
          <div className="text-sm">
            <p className="font-medium text-foreground">¿Necesitas ayuda?</p>
            <p className="text-muted-foreground mt-1">
              Llámanos al (555) 123-4567 o envía un email a reservas@restaurante.com
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingSummary;