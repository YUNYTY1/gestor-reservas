import { useState } from 'react';
import Icon from '../../../components/AppIcon';

const CalendarPicker = ({ selectedDate, onDateSelect, availableDates }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const monthNames = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  const dayNames = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

  const getDaysInMonth = (date) => {
    const year = date?.getFullYear();
    const month = date?.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay?.getDate();
    const startingDayOfWeek = firstDay?.getDay();

    const days = [];
    for (let i = 0; i < startingDayOfWeek; i++) {
      days?.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days?.push(new Date(year, month, i));
    }
    return days;
  };

  const isDateAvailable = (date) => {
    if (!date) return false;
    const today = new Date();
    today?.setHours(0, 0, 0, 0);
    if (date < today) return false;

    const dateStr = date?.toISOString()?.split('T')?.[0];
    return availableDates?.includes(dateStr);
  };

  const isSelectedDate = (date) => {
    if (!date || !selectedDate) return false;
    return date?.toISOString()?.split('T')?.[0] === selectedDate?.toISOString()?.split('T')?.[0];
  };

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const days = getDaysInMonth(currentMonth);

  return (
    <div className="bg-card rounded-lg border border-border p-4 shadow-warm">
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={handlePrevMonth}
          className="p-2 rounded-lg hover:bg-muted transition-quick"
          aria-label="Mes anterior"
        >
          <Icon name="ChevronLeft" size={20} />
        </button>
        <h3 className="text-lg font-semibold text-foreground">
          {monthNames?.[currentMonth?.getMonth()]} {currentMonth?.getFullYear()}
        </h3>
        <button
          onClick={handleNextMonth}
          className="p-2 rounded-lg hover:bg-muted transition-quick"
          aria-label="Mes siguiente"
        >
          <Icon name="ChevronRight" size={20} />
        </button>
      </div>
      <div className="grid grid-cols-7 gap-1 mb-2">
        {dayNames?.map((day) => (
          <div
            key={day}
            className="text-center text-xs font-medium text-muted-foreground py-2"
          >
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {days?.map((date, index) => {
          const available = isDateAvailable(date);
          const selected = isSelectedDate(date);

          return (
            <button
              key={index}
              onClick={() => date && available && onDateSelect(date)}
              disabled={!date || !available}
              className={`
                aspect-square rounded-lg text-sm font-medium transition-quick
                ${!date ? 'invisible' : ''}
                ${selected ? 'bg-primary text-primary-foreground shadow-warm' : ''}
                ${available && !selected ? 'bg-muted hover:bg-primary/10 text-foreground' : ''}
                ${!available && date ? 'bg-background text-muted-foreground cursor-not-allowed opacity-50' : ''}
              `}
            >
              {date ? date?.getDate() : ''}
            </button>
          );
        })}
      </div>
      <div className="mt-4 flex items-center gap-4 text-xs">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-primary" />
          <span className="text-muted-foreground">Seleccionado</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-muted" />
          <span className="text-muted-foreground">Disponible</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-background border border-border opacity-50" />
          <span className="text-muted-foreground">No disponible</span>
        </div>
      </div>
    </div>
  );
};

export default CalendarPicker;