import { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ReservationCalendar = ({ reservations, onApprove, onReject }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [viewMode, setViewMode] = useState('day');

  const formatDate = (date) => {
    return new Intl.DateTimeFormat('es-PE', { 
      day: '2-digit', 
      month: 'long', 
      year: 'numeric' 
    })?.format(date);
  };

  const formatTime = (time) => {
    return new Intl.DateTimeFormat('es-PE', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    })?.format(new Date(`2000-01-01T${time}`));
  };

  const filteredReservations = reservations?.filter(res => {
    const resDate = new Date(res.date);
    return resDate?.toDateString() === selectedDate?.toDateString();
  });

  const changeDate = (days) => {
    const newDate = new Date(selectedDate);
    newDate?.setDate(newDate?.getDate() + days);
    setSelectedDate(newDate);
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'confirmed': return 'bg-success/10 text-success border-success/20';
      case 'pending': return 'bg-warning/10 text-warning border-warning/20';
      case 'cancelled': return 'bg-error/10 text-error border-error/20';
      default: return 'bg-muted text-muted-foreground border-border';
    }
  };

  const getStatusLabel = (status) => {
    switch(status) {
      case 'confirmed': return 'Confirmada';
      case 'pending': return 'Pendiente';
      case 'cancelled': return 'Cancelada';
      default: return status;
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border shadow-warm">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-heading font-semibold text-foreground">
            Calendario de Reservas
          </h3>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              iconName="ChevronLeft"
              onClick={() => changeDate(-1)}
            />
            <Button
              variant="outline"
              size="sm"
              iconName="ChevronRight"
              onClick={() => changeDate(1)}
            />
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Icon name="Calendar" size={20} color="var(--color-primary)" />
          <span className="text-lg font-medium text-foreground">
            {formatDate(selectedDate)}
          </span>
        </div>
      </div>
      <div className="p-6">
        {filteredReservations?.length === 0 ? (
          <div className="text-center py-12">
            <Icon name="CalendarX" size={48} color="var(--color-muted-foreground)" className="mx-auto mb-4" />
            <p className="text-muted-foreground">No hay reservas para esta fecha</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredReservations?.map((reservation) => (
              <div 
                key={reservation?.id}
                className="bg-background rounded-lg border border-border p-4 hover:shadow-warm transition-smooth"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-semibold text-foreground">{reservation?.customerName}</h4>
                      <span className={`px-2 py-1 rounded-md text-xs font-medium border ${getStatusColor(reservation?.status)}`}>
                        {getStatusLabel(reservation?.status)}
                      </span>
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Icon name="Clock" size={14} />
                        <span>{formatTime(reservation?.time)}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Icon name="Users" size={14} />
                        <span>{reservation?.guests} personas</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Icon name="MapPin" size={14} />
                        <span>Mesa {reservation?.tableNumber}</span>
                      </div>
                      {reservation?.specialRequests && (
                        <div className="flex items-start gap-2 text-sm text-muted-foreground mt-2">
                          <Icon name="MessageSquare" size={14} className="mt-0.5" />
                          <span className="flex-1">{reservation?.specialRequests}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {reservation?.status === 'pending' && (
                  <div className="flex items-center gap-2 mt-4 pt-4 border-t border-border">
                    <Button
                      variant="default"
                      size="sm"
                      iconName="Check"
                      iconPosition="left"
                      onClick={() => onApprove(reservation?.id)}
                      className="flex-1"
                    >
                      Aprobar
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      iconName="X"
                      iconPosition="left"
                      onClick={() => onReject(reservation?.id)}
                      className="flex-1"
                    >
                      Rechazar
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ReservationCalendar;