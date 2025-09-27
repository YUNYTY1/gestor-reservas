import React from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const SpecialRequestsForm = ({ 
  specialRequests, 
  onSpecialRequestsChange,
  dietaryRestrictions = [],
  onDietaryRestrictionsChange,
  celebrationDetails,
  onCelebrationDetailsChange
}) => {
  const dietaryOptions = [
    { id: 'vegetarian', label: 'Vegetariano', icon: 'Leaf' },
    { id: 'vegan', label: 'Vegano', icon: 'Sprout' },
    { id: 'gluten_free', label: 'Sin Gluten', icon: 'Wheat' },
    { id: 'dairy_free', label: 'Sin Lácteos', icon: 'Milk' },
    { id: 'nut_allergy', label: 'Alergia a Frutos Secos', icon: 'AlertTriangle' },
    { id: 'seafood_allergy', label: 'Alergia a Mariscos', icon: 'Fish' },
    { id: 'diabetic', label: 'Diabético', icon: 'Heart' },
    { id: 'kosher', label: 'Kosher', icon: 'Star' },
    { id: 'halal', label: 'Halal', icon: 'Moon' }
  ];

  const celebrationOptions = [
    { value: '', label: 'Ninguna celebración especial' },
    { value: 'birthday', label: 'Cumpleaños' },
    { value: 'anniversary', label: 'Aniversario' },
    { value: 'engagement', label: 'Compromiso' },
    { value: 'graduation', label: 'Graduación' },
    { value: 'business', label: 'Cena de Negocios' },
    { value: 'date', label: 'Cita Romántica' },
    { value: 'other', label: 'Otra celebración' }
  ];

  const handleDietaryChange = (restrictionId, checked) => {
    let updatedRestrictions;
    if (checked) {
      updatedRestrictions = [...dietaryRestrictions, restrictionId];
    } else {
      updatedRestrictions = dietaryRestrictions?.filter(id => id !== restrictionId);
    }
    onDietaryRestrictionsChange(updatedRestrictions);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 space-y-6">
      <h3 className="text-lg font-semibold text-foreground">Solicitudes Especiales</h3>
      {/* Dietary Restrictions */}
      <div className="space-y-4">
        <div>
          <h4 className="text-sm font-medium text-foreground mb-1">Restricciones Dietéticas</h4>
          <p className="text-xs text-muted-foreground">Selecciona todas las que apliquen</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {dietaryOptions?.map(option => (
            <div key={option?.id} className="flex items-center space-x-3 p-3 rounded-lg border border-border hover:bg-muted/50 transition-smooth">
              <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-accent/10">
                <Icon name={option?.icon} size={14} className="text-accent" />
              </div>
              
              <Checkbox
                label={option?.label}
                checked={dietaryRestrictions?.includes(option?.id)}
                onChange={(e) => handleDietaryChange(option?.id, e?.target?.checked)}
              />
            </div>
          ))}
        </div>
      </div>
      {/* Celebration Details */}
      <div className="space-y-4">
        <div>
          <h4 className="text-sm font-medium text-foreground mb-1">Ocasión Especial</h4>
          <p className="text-xs text-muted-foreground">¿Estás celebrando algo especial?</p>
        </div>

        <Select
          options={celebrationOptions}
          value={celebrationDetails?.type || ''}
          onChange={(value) => onCelebrationDetailsChange({ 
            ...celebrationDetails, 
            type: value 
          })}
          placeholder="Seleccionar ocasión"
        />

        {celebrationDetails?.type && celebrationDetails?.type !== '' && (
          <Input
            label="Detalles adicionales"
            type="text"
            placeholder="Ej: Es el cumpleaños número 30 de mi esposa"
            value={celebrationDetails?.details || ''}
            onChange={(e) => onCelebrationDetailsChange({
              ...celebrationDetails,
              details: e?.target?.value
            })}
            description="Ayúdanos a hacer tu celebración más especial"
          />
        )}
      </div>
      {/* General Special Requests */}
      <div className="space-y-4">
        <div>
          <h4 className="text-sm font-medium text-foreground mb-1">Solicitudes Adicionales</h4>
          <p className="text-xs text-muted-foreground">Cualquier otra solicitud especial o comentario</p>
        </div>

        <div className="relative">
          <textarea
            value={specialRequests}
            onChange={(e) => onSpecialRequestsChange(e?.target?.value)}
            placeholder={`Ejemplo:\n• Preferencia por mesa junto a la ventana\n• Necesito un lugar tranquilo para conversación\n• Por favor, no música muy alta\n• Mesa alejada de la cocina`}
            className="w-full min-h-[120px] p-3 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground resize-none focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-smooth"
            maxLength={500}
          />
          <div className="absolute bottom-2 right-2 text-xs text-muted-foreground">
            {specialRequests?.length}/500
          </div>
        </div>
      </div>
      {/* Quick Request Buttons */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-foreground">Solicitudes Rápidas</h4>
        <div className="flex flex-wrap gap-2">
          {[
            'Mesa junto a ventana',
            'Zona tranquila',
            'Mesa privada',
            'Cerca del bar',
            'Lejos de la cocina',
            'Mesa redonda'
          ]?.map(request => (
            <button
              key={request}
              onClick={() => {
                const currentRequests = specialRequests || '';
                const newRequest = currentRequests ? `${currentRequests}\n• ${request}` : `• ${request}`;
                onSpecialRequestsChange(newRequest);
              }}
              className="px-3 py-1 text-xs bg-muted text-muted-foreground rounded-full hover:bg-primary hover:text-primary-foreground transition-smooth"
            >
              + {request}
            </button>
          ))}
        </div>
      </div>
      {/* Important Notice */}
      <div className="p-3 bg-muted/50 border border-border rounded-lg">
        <div className="flex items-start space-x-2">
          <Icon name="Info" size={16} className="text-primary mt-0.5" />
          <div className="text-sm">
            <p className="font-medium text-foreground">Nota Importante</p>
            <p className="text-muted-foreground mt-1">
              Haremos nuestro mejor esfuerzo para acomodar todas las solicitudes especiales, 
              aunque no podemos garantizar su disponibilidad en todos los casos.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpecialRequestsForm;