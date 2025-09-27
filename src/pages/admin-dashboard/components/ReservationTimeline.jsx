import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import ReservationStatusIndicator from '../../../components/ui/ReservationStatusIndicator';

const ReservationTimeline = ({ reservations = [], onUpdateReservation, onReassignTable }) => {
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('all');
  const [draggedReservation, setDraggedReservation] = useState(null);

  const timeSlots = [
    { value: 'all', label: 'Todo el día' },
    { value: 'breakfast', label: '08:00-11:00' },
    { value: 'lunch', label: '12:00-16:00' },
    { value: 'dinner', label: '19:00-23:00' }
  ];

  const getTimeSlotReservations = () => {
    if (selectedTimeSlot === 'all') return reservations;
    
    return reservations?.filter(reservation => {
      const hour = new Date(reservation.time)?.getHours();
      switch (selectedTimeSlot) {
        case 'breakfast': return hour >= 8 && hour < 11;
        case 'lunch': return hour >= 12 && hour < 16;
        case 'dinner': return hour >= 19 && hour < 23;
        default: return true;
      }
    });
  };

  const handleDragStart = (e, reservation) => {
    setDraggedReservation(reservation);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e) => {
    e?.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e, targetTable) => {
    e?.preventDefault();
    if (draggedReservation && onReassignTable) {
      onReassignTable(draggedReservation?.id, targetTable);
    }
    setDraggedReservation(null);
  };

  const formatTime = (time) => {
    return new Date(time)?.toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const filteredReservations = getTimeSlotReservations();

  return (
    <div className="bg-card border border-border rounded-lg shadow-soft">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Reservas de Hoy</h3>
          <Button variant="outline" size="sm" iconName="Plus" iconPosition="left">
            Nueva Reserva
          </Button>
        </div>
        
        {/* Time Slot Filter */}
        <div className="flex items-center space-x-2 overflow-x-auto">
          {timeSlots?.map((slot) => (
            <button
              key={slot?.value}
              onClick={() => setSelectedTimeSlot(slot?.value)}
              className={`px-3 py-1 text-sm font-medium rounded-full whitespace-nowrap transition-smooth ${
                selectedTimeSlot === slot?.value
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              {slot?.label}
            </button>
          ))}
        </div>
      </div>
      <div className="p-6">
        {filteredReservations?.length === 0 ? (
          <div className="text-center py-8">
            <Icon name="Calendar" size={48} className="text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No hay reservas para este período</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredReservations?.map((reservation) => (
              <div
                key={reservation?.id}
                draggable
                onDragStart={(e) => handleDragStart(e, reservation)}
                className={`border border-border rounded-lg p-4 transition-smooth hover:shadow-soft cursor-move ${
                  draggedReservation?.id === reservation?.id ? 'opacity-50' : ''
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="text-center">
                      <div className="text-lg font-bold text-foreground">
                        {formatTime(reservation?.time)}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Mesa {reservation?.tableNumber}
                      </div>
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className="font-medium text-foreground">{reservation?.customerName}</h4>
                        <span className="text-sm text-muted-foreground">
                          {reservation?.partySize} personas
                        </span>
                      </div>
                      
                      {reservation?.specialRequests && (
                        <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                          <Icon name="MessageSquare" size={14} />
                          <span>{reservation?.specialRequests}</span>
                        </div>
                      )}
                      
                      <div className="flex items-center space-x-2 mt-2">
                        <Icon name="Phone" size={14} className="text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">{reservation?.phone}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <ReservationStatusIndicator 
                      status={reservation?.status}
                      showDetails={false}
                      size="sm"
                      reservationTime={reservation?.time}
                      tableNumber={reservation?.tableNumber}
                      partySize={reservation?.partySize}
                    />
                    
                    <div className="flex items-center space-x-1">
                      {reservation?.status === 'pending' && (
                        <>
                          <Button
                            variant="ghost"
                            size="sm"
                            iconName="Check"
                            onClick={() => onUpdateReservation(reservation?.id, 'confirmed')}
                            className="text-success hover:bg-success/10"
                          />
                          <Button
                            variant="ghost"
                            size="sm"
                            iconName="X"
                            onClick={() => onUpdateReservation(reservation?.id, 'cancelled')}
                            className="text-error hover:bg-error/10"
                          />
                        </>
                      )}
                      
                      <Button
                        variant="ghost"
                        size="sm"
                        iconName="MoreVertical"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ReservationTimeline;