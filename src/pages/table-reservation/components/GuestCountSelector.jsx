import React from 'react';
import Icon from '../../../components/AppIcon';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const GuestCountSelector = ({ 
  partySize, 
  onPartySizeChange, 
  specialAccommodations = [], 
  onAccommodationsChange 
}) => {
  const partySizeOptions = [
    { value: 1, label: '1 persona' },
    { value: 2, label: '2 personas' },
    { value: 3, label: '3 personas' },
    { value: 4, label: '4 personas' },
    { value: 5, label: '5 personas' },
    { value: 6, label: '6 personas' },
    { value: 7, label: '7 personas' },
    { value: 8, label: '8 personas' },
    { value: 9, label: '9 personas' },
    { value: 10, label: '10 personas' },
    { value: 11, label: '11+ personas (contactar)' }
  ];

  const accommodationOptions = [
    {
      id: 'highchair',
      label: 'Silla alta para niños',
      icon: 'Baby',
      description: 'Necesito silla alta para bebé/niño pequeño'
    },
    {
      id: 'wheelchair',
      label: 'Acceso para silla de ruedas',
      icon: 'Accessibility',
      description: 'Requiero mesa accesible para silla de ruedas'
    },
    {
      id: 'booster',
      label: 'Asiento elevador',
      icon: 'ArrowUp',
      description: 'Asiento elevador para niño'
    },
    {
      id: 'quiet',
      label: 'Mesa tranquila',
      icon: 'Volume1',
      description: 'Preferencia por zona silenciosa'
    }
  ];

  const handleAccommodationChange = (accommodationId, checked) => {
    let updatedAccommodations;
    if (checked) {
      updatedAccommodations = [...specialAccommodations, accommodationId];
    } else {
      updatedAccommodations = specialAccommodations?.filter(id => id !== accommodationId);
    }
    onAccommodationsChange(updatedAccommodations);
  };

  const incrementPartySize = () => {
    if (partySize < 11) {
      onPartySizeChange(partySize + 1);
    }
  };

  const decrementPartySize = () => {
    if (partySize > 1) {
      onPartySizeChange(partySize - 1);
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 space-y-6">
      <h3 className="text-lg font-semibold text-foreground">Número de Comensales</h3>
      {/* Party Size Counter */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <label className="text-sm font-medium text-foreground">Personas</label>
            <p className="text-xs text-muted-foreground">Selecciona el número de comensales</p>
          </div>
          
          <div className="flex items-center space-x-3">
            <button
              onClick={decrementPartySize}
              disabled={partySize <= 1}
              className="w-10 h-10 flex items-center justify-center rounded-full border border-border bg-background hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-smooth"
            >
              <Icon name="Minus" size={16} />
            </button>
            
            <div className="w-16 text-center">
              <span className="text-2xl font-bold text-foreground">{partySize}</span>
            </div>
            
            <button
              onClick={incrementPartySize}
              disabled={partySize >= 11}
              className="w-10 h-10 flex items-center justify-center rounded-full border border-border bg-background hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-smooth"
            >
              <Icon name="Plus" size={16} />
            </button>
          </div>
        </div>

        {/* Alternative Select Dropdown */}
        <div className="pt-2">
          <Select
            label="O selecciona del menú"
            options={partySizeOptions}
            value={partySize}
            onChange={onPartySizeChange}
            placeholder="Seleccionar número de personas"
          />
        </div>
      </div>
      {/* Special Accommodations */}
      <div className="space-y-4">
        <div>
          <h4 className="text-sm font-medium text-foreground mb-1">Necesidades Especiales</h4>
          <p className="text-xs text-muted-foreground">Selecciona si necesitas alguna acomodación especial</p>
        </div>

        <div className="space-y-3">
          {accommodationOptions?.map(option => (
            <div key={option?.id} className="flex items-start space-x-3 p-3 rounded-lg border border-border hover:bg-muted/50 transition-smooth">
              <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-primary/10">
                <Icon name={option?.icon} size={16} className="text-primary" />
              </div>
              
              <div className="flex-1 min-w-0">
                <Checkbox
                  label={option?.label}
                  description={option?.description}
                  checked={specialAccommodations?.includes(option?.id)}
                  onChange={(e) => handleAccommodationChange(option?.id, e?.target?.checked)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Large Party Notice */}
      {partySize >= 8 && (
        <div className="p-3 bg-warning/10 border border-warning/20 rounded-lg">
          <div className="flex items-start space-x-2">
            <Icon name="Info" size={16} className="text-warning mt-0.5" />
            <div className="text-sm">
              <p className="font-medium text-warning">Grupo Grande</p>
              <p className="text-muted-foreground mt-1">
                Para grupos de 8+ personas, recomendamos contactar directamente para garantizar la mejor experiencia.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GuestCountSelector;