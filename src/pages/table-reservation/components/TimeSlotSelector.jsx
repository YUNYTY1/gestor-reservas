import React from 'react';
import Icon from '../../../components/AppIcon';

const TimeSlotSelector = ({ selectedTime, onTimeSelect, availableSlots = [], partySize = 2 }) => {
  const timeSlots = [
    { time: '12:00', label: '12:00 PM', period: 'lunch' },
    { time: '12:30', label: '12:30 PM', period: 'lunch' },
    { time: '13:00', label: '1:00 PM', period: 'lunch' },
    { time: '13:30', label: '1:30 PM', period: 'lunch' },
    { time: '14:00', label: '2:00 PM', period: 'lunch' },
    { time: '14:30', label: '2:30 PM', period: 'lunch' },
    { time: '15:00', label: '3:00 PM', period: 'lunch' },
    { time: '19:00', label: '7:00 PM', period: 'dinner' },
    { time: '19:30', label: '7:30 PM', period: 'dinner' },
    { time: '20:00', label: '8:00 PM', period: 'dinner' },
    { time: '20:30', label: '8:30 PM', period: 'dinner' },
    { time: '21:00', label: '9:00 PM', period: 'dinner' },
    { time: '21:30', label: '9:30 PM', period: 'dinner' },
    { time: '22:00', label: '10:00 PM', period: 'dinner' }
  ];

  const getSlotAvailability = (time) => {
    const slot = availableSlots?.find(s => s?.time === time);
    if (!slot) return 'unavailable';
    
    if (slot?.availableTables >= 3) return 'available';
    if (slot?.availableTables > 0) return 'limited';
    return 'unavailable';
  };

  const getSlotClasses = (time) => {
    const isSelected = selectedTime === time;
    const availability = getSlotAvailability(time);
    
    let classes = 'flex flex-col items-center justify-center p-3 rounded-lg border transition-smooth cursor-pointer min-h-[80px] ';
    
    if (availability === 'unavailable') {
      classes += 'border-border bg-muted text-muted-foreground cursor-not-allowed opacity-50 ';
    } else if (isSelected) {
      classes += 'border-primary bg-primary text-primary-foreground shadow-soft ';
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

  const handleTimeSelect = (time) => {
    if (getSlotAvailability(time) === 'unavailable') return;
    onTimeSelect(time);
  };

  const lunchSlots = timeSlots?.filter(slot => slot?.period === 'lunch');
  const dinnerSlots = timeSlots?.filter(slot => slot?.period === 'dinner');

  const renderSlotGroup = (slots, title, icon) => (
    <div className="space-y-3">
      <div className="flex items-center space-x-2">
        <Icon name={icon} size={20} className="text-muted-foreground" />
        <h4 className="font-medium text-foreground">{title}</h4>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {slots?.map(slot => {
          const availability = getSlotAvailability(slot?.time);
          const availableCount = availableSlots?.find(s => s?.time === slot?.time)?.availableTables || 0;
          
          return (
            <button
              key={slot?.time}
              onClick={() => handleTimeSelect(slot?.time)}
              className={getSlotClasses(slot?.time)}
              disabled={availability === 'unavailable'}
            >
              <span className="font-semibold text-sm">{slot?.label}</span>
              {availability !== 'unavailable' && (
                <span className="text-xs mt-1 opacity-75">
                  {availableCount} mesa{availableCount !== 1 ? 's' : ''}
                </span>
              )}
              {availability === 'unavailable' && (
                <span className="text-xs mt-1">No disponible</span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="bg-card border border-border rounded-lg p-4 space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">Seleccionar Horario</h3>
        <div className="text-sm text-muted-foreground">
          Para {partySize} persona{partySize !== 1 ? 's' : ''}
        </div>
      </div>

      {renderSlotGroup(lunchSlots, 'Almuerzo', 'Sun')}
      {renderSlotGroup(dinnerSlots, 'Cena', 'Moon')}

      {/* Availability Legend */}
      <div className="pt-4 border-t border-border">
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-success rounded-full"></div>
            <span className="text-muted-foreground">Disponible</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-warning rounded-full"></div>
            <span className="text-muted-foreground">Pocas mesas</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-error rounded-full"></div>
            <span className="text-muted-foreground">No disponible</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimeSlotSelector;