import Icon from '../../../components/AppIcon';

const TimeSlotSelector = ({ selectedTime, onTimeSelect, availableSlots, selectedDate }) => {
  const timeSlots = [
    { time: '12:00', period: 'Almuerzo', capacity: 8 },
    { time: '12:30', period: 'Almuerzo', capacity: 6 },
    { time: '13:00', period: 'Almuerzo', capacity: 10 },
    { time: '13:30', period: 'Almuerzo', capacity: 4 },
    { time: '14:00', period: 'Almuerzo', capacity: 8 },
    { time: '14:30', period: 'Almuerzo', capacity: 5 },
    { time: '19:00', period: 'Cena', capacity: 12 },
    { time: '19:30', period: 'Cena', capacity: 10 },
    { time: '20:00', period: 'Cena', capacity: 8 },
    { time: '20:30', period: 'Cena', capacity: 6 },
    { time: '21:00', period: 'Cena', capacity: 10 },
    { time: '21:30', period: 'Cena', capacity: 8 },
  ];

  const isSlotAvailable = (time) => {
    if (!selectedDate) return false;
    return availableSlots?.some(slot => slot?.time === time && slot?.available);
  };

  const getSlotCapacity = (time) => {
    const slot = availableSlots?.find(s => s?.time === time);
    return slot ? slot?.capacity : 0;
  };

  const lunchSlots = timeSlots?.filter(slot => slot?.period === 'Almuerzo');
  const dinnerSlots = timeSlots?.filter(slot => slot?.period === 'Cena');

  const SlotButton = ({ slot }) => {
    const available = isSlotAvailable(slot?.time);
    const capacity = getSlotCapacity(slot?.time);
    const selected = selectedTime === slot?.time;

    return (
      <button
        onClick={() => available && onTimeSelect(slot?.time)}
        disabled={!available || !selectedDate}
        className={`
          p-4 rounded-lg border transition-quick text-left
          ${selected ? 'bg-primary text-primary-foreground border-primary shadow-warm' : ''}
          ${available && !selected ? 'bg-card border-border hover:border-primary hover:bg-primary/5' : ''}
          ${!available || !selectedDate ? 'bg-muted border-border opacity-50 cursor-not-allowed' : ''}
        `}
      >
        <div className="flex items-center justify-between mb-2">
          <span className="text-lg font-semibold">{slot?.time}</span>
          {available && (
            <Icon 
              name={selected ? 'CheckCircle2' : 'Clock'} 
              size={18} 
              color={selected ? 'currentColor' : 'var(--color-primary)'} 
            />
          )}
        </div>
        <div className="flex items-center gap-2 text-xs">
          <Icon name="Users" size={14} />
          <span className={selected ? 'text-primary-foreground' : 'text-muted-foreground'}>
            {capacity} mesas disponibles
          </span>
        </div>
      </button>
    );
  };

  if (!selectedDate) {
    return (
      <div className="bg-card rounded-lg border border-border p-8 text-center shadow-warm">
        <Icon name="Calendar" size={48} color="var(--color-muted-foreground)" className="mx-auto mb-4" />
        <p className="text-muted-foreground">
          Por favor seleccione una fecha para ver los horarios disponibles
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Icon name="Sun" size={20} color="var(--color-primary)" />
          <h3 className="text-lg font-semibold text-foreground">Almuerzo</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {lunchSlots?.map((slot) => (
            <SlotButton key={slot?.time} slot={slot} />
          ))}
        </div>
      </div>
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Icon name="Moon" size={20} color="var(--color-primary)" />
          <h3 className="text-lg font-semibold text-foreground">Cena</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {dinnerSlots?.map((slot) => (
            <SlotButton key={slot?.time} slot={slot} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TimeSlotSelector;