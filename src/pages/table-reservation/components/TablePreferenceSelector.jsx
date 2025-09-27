import React from 'react';
import Icon from '../../../components/AppIcon';

const TablePreferenceSelector = ({ 
  selectedPreference, 
  onPreferenceSelect, 
  availablePreferences = {} 
}) => {
  const preferences = [
    {
      id: 'interior',
      label: 'Interior',
      description: 'Mesas dentro del restaurante',
      icon: 'Home',
      features: ['Clima controlado', 'Ambiente íntimo', 'Menos ruido exterior']
    },
    {
      id: 'exterior',
      label: 'Terraza',
      description: 'Mesas al aire libre',
      icon: 'Trees',
      features: ['Aire fresco', 'Vista exterior', 'Ambiente relajado']
    },
    {
      id: 'window',
      label: 'Junto a Ventana',
      description: 'Mesas con vista a la calle',
      icon: 'Eye',
      features: ['Vista a la calle', 'Luz natural', 'Observar el movimiento']
    },
    {
      id: 'bar',
      label: 'Barra',
      description: 'Asientos en la barra del bar',
      icon: 'Wine',
      features: ['Vista a la cocina', 'Ambiente dinámico', 'Ideal para parejas']
    },
    {
      id: 'private',
      label: 'Área Privada',
      description: 'Zona reservada y tranquila',
      icon: 'Lock',
      features: ['Mayor privacidad', 'Ideal para negocios', 'Ambiente exclusivo']
    },
    {
      id: 'family',
      label: 'Zona Familiar',
      description: 'Área diseñada para familias',
      icon: 'Users',
      features: ['Espacio amplio', 'Sillas altas disponibles', 'Ambiente familiar']
    }
  ];

  const getPreferenceAvailability = (preferenceId) => {
    return availablePreferences?.[preferenceId] || 'available';
  };

  const getPreferenceClasses = (preferenceId) => {
    const isSelected = selectedPreference === preferenceId;
    const availability = getPreferenceAvailability(preferenceId);
    
    let classes = 'p-4 rounded-lg border transition-smooth cursor-pointer ';
    
    if (availability === 'unavailable') {
      classes += 'border-border bg-muted text-muted-foreground cursor-not-allowed opacity-50 ';
    } else if (isSelected) {
      classes += 'border-primary bg-primary/10 text-primary shadow-soft ';
    } else {
      switch (availability) {
        case 'available':
          classes += 'border-border bg-card text-foreground hover:border-primary hover:bg-primary/5 ';
          break;
        case 'limited':
          classes += 'border-warning bg-warning/10 text-warning hover:bg-warning/20 ';
          break;
        default:
          classes += 'border-border bg-card text-foreground hover:border-primary hover:bg-primary/5 ';
      }
    }
    
    return classes;
  };

  const handlePreferenceSelect = (preferenceId) => {
    if (getPreferenceAvailability(preferenceId) === 'unavailable') return;
    onPreferenceSelect(preferenceId);
  };

  const getAvailabilityText = (availability) => {
    switch (availability) {
      case 'available':
        return 'Disponible';
      case 'limited':
        return 'Pocas mesas';
      case 'unavailable':
        return 'No disponible';
      default:
        return 'Disponible';
    }
  };

  const getAvailabilityColor = (availability) => {
    switch (availability) {
      case 'available':
        return 'text-success';
      case 'limited':
        return 'text-warning';
      case 'unavailable':
        return 'text-error';
      default:
        return 'text-success';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">Preferencia de Mesa</h3>
        <div className="text-sm text-muted-foreground">Opcional</div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {preferences?.map(preference => {
          const availability = getPreferenceAvailability(preference?.id);
          
          return (
            <button
              key={preference?.id}
              onClick={() => handlePreferenceSelect(preference?.id)}
              className={getPreferenceClasses(preference?.id)}
              disabled={availability === 'unavailable'}
            >
              <div className="flex items-start space-x-3">
                <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                  selectedPreference === preference?.id 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-muted text-muted-foreground'
                }`}>
                  <Icon name={preference?.icon} size={20} />
                </div>
                
                <div className="flex-1 text-left">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-medium">{preference?.label}</h4>
                    <span className={`text-xs font-medium ${getAvailabilityColor(availability)}`}>
                      {getAvailabilityText(availability)}
                    </span>
                  </div>
                  
                  <p className="text-sm opacity-75 mb-2">{preference?.description}</p>
                  
                  <div className="space-y-1">
                    {preference?.features?.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-1">
                        <Icon name="Check" size={12} className="opacity-60" />
                        <span className="text-xs opacity-75">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>
      {/* No Preference Option */}
      <div className="pt-4 border-t border-border">
        <button
          onClick={() => handlePreferenceSelect('')}
          className={`w-full p-3 rounded-lg border transition-smooth ${
            selectedPreference === '' ?'border-primary bg-primary/10 text-primary' :'border-border bg-card text-foreground hover:border-primary hover:bg-primary/5'
          }`}
        >
          <div className="flex items-center justify-center space-x-2">
            <Icon name="Shuffle" size={16} />
            <span className="font-medium">Sin preferencia - Cualquier mesa disponible</span>
          </div>
        </button>
      </div>
      {/* Information Note */}
      <div className="p-3 bg-muted/50 border border-border rounded-lg">
        <div className="flex items-start space-x-2">
          <Icon name="Info" size={16} className="text-primary mt-0.5" />
          <div className="text-sm">
            <p className="font-medium text-foreground">Sobre las Preferencias</p>
            <p className="text-muted-foreground mt-1">
              Las preferencias de mesa están sujetas a disponibilidad. 
              Haremos nuestro mejor esfuerzo para acomodar tu solicitud.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TablePreferenceSelector;