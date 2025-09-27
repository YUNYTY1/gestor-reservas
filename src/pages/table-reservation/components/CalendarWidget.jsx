import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const CalendarWidget = ({ selectedDate, onDateSelect, availabilityData = {} }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const months = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  const weekDays = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

  const getDaysInMonth = (date) => {
    const year = date?.getFullYear();
    const month = date?.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay?.getDate();
    const startingDayOfWeek = firstDay?.getDay();

    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days?.push(null);
    }
    
    // Add all days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days?.push(new Date(year, month, day));
    }
    
    return days;
  };

  const navigateMonth = (direction) => {
    setCurrentMonth(prev => {
      const newMonth = new Date(prev);
      newMonth?.setMonth(prev?.getMonth() + direction);
      return newMonth;
    });
  };

  const getDateAvailability = (date) => {
    if (!date) return null;
    const dateKey = date?.toISOString()?.split('T')?.[0];
    return availabilityData?.[dateKey] || 'available';
  };

  const isDateDisabled = (date) => {
    if (!date) return true;
    const today = new Date();
    today?.setHours(0, 0, 0, 0);
    return date < today;
  };

  const getDateClasses = (date) => {
    if (!date) return '';
    
    const isSelected = selectedDate && date?.toDateString() === selectedDate?.toDateString();
    const isDisabled = isDateDisabled(date);
    const availability = getDateAvailability(date);
    
    let classes = 'w-10 h-10 flex items-center justify-center text-sm font-medium rounded-lg transition-smooth cursor-pointer ';
    
    if (isDisabled) {
      classes += 'text-muted-foreground cursor-not-allowed opacity-50 ';
    } else if (isSelected) {
      classes += 'bg-primary text-primary-foreground shadow-soft ';
    } else {
      switch (availability) {
        case 'available':
          classes += 'text-foreground hover:bg-muted ';
          break;
        case 'limited':
          classes += 'text-warning bg-warning/10 hover:bg-warning/20 ';
          break;
        case 'full':
          classes += 'text-error bg-error/10 cursor-not-allowed ';
          break;
        default:
          classes += 'text-foreground hover:bg-muted ';
      }
    }
    
    return classes;
  };

  const handleDateClick = (date) => {
    if (!date || isDateDisabled(date) || getDateAvailability(date) === 'full') return;
    onDateSelect(date);
  };

  const days = getDaysInMonth(currentMonth);

  return (
    <div className="bg-card border border-border rounded-lg p-4">
      {/* Calendar Header */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => navigateMonth(-1)}
          className="p-2 hover:bg-muted rounded-lg transition-smooth"
        >
          <Icon name="ChevronLeft" size={20} />
        </button>
        
        <h3 className="text-lg font-semibold text-foreground">
          {months?.[currentMonth?.getMonth()]} {currentMonth?.getFullYear()}
        </h3>
        
        <button
          onClick={() => navigateMonth(1)}
          className="p-2 hover:bg-muted rounded-lg transition-smooth"
        >
          <Icon name="ChevronRight" size={20} />
        </button>
      </div>
      {/* Week Days Header */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {weekDays?.map(day => (
          <div key={day} className="text-center text-sm font-medium text-muted-foreground py-2">
            {day}
          </div>
        ))}
      </div>
      {/* Calendar Days */}
      <div className="grid grid-cols-7 gap-1">
        {days?.map((date, index) => (
          <div key={index} className="flex justify-center">
            {date ? (
              <button
                onClick={() => handleDateClick(date)}
                className={getDateClasses(date)}
                disabled={isDateDisabled(date) || getDateAvailability(date) === 'full'}
              >
                {date?.getDate()}
              </button>
            ) : (
              <div className="w-10 h-10"></div>
            )}
          </div>
        ))}
      </div>
      {/* Availability Legend */}
      <div className="mt-4 pt-4 border-t border-border">
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-success rounded-full"></div>
            <span className="text-muted-foreground">Disponible</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-warning rounded-full"></div>
            <span className="text-muted-foreground">Limitado</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-error rounded-full"></div>
            <span className="text-muted-foreground">Completo</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarWidget;