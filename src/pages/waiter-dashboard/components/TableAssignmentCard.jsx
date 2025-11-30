import Icon from '../../../components/AppIcon';

const TableAssignmentCard = ({ assignment }) => {
  const getStatusColor = (status) => {
    const colors = {
      available: 'bg-success/10 text-success',
      occupied: 'bg-primary/10 text-primary',
      reserved: 'bg-warning/10 text-warning',
      cleaning: 'bg-muted text-muted-foreground'
    };
    return colors?.[status] || colors?.available;
  };

  const getStatusIcon = (status) => {
    const icons = {
      available: 'CheckCircle2',
      occupied: 'Users',
      reserved: 'Clock',
      cleaning: 'Sparkles'
    };
    return icons?.[status] || 'Circle';
  };

  return (
    <div className="bg-card border border-border rounded-xl p-4 shadow-warm transition-smooth hover:shadow-warm-md">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg">
            <span className="text-xl font-heading font-bold text-primary">
              {assignment?.tableNumber}
            </span>
          </div>
          <div>
            <h4 className="font-semibold text-foreground">Mesa {assignment?.tableNumber}</h4>
            <p className="text-sm text-muted-foreground">
              {assignment?.capacity} personas
            </p>
          </div>
        </div>
        <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg ${getStatusColor(assignment?.status)}`}>
          <Icon name={getStatusIcon(assignment?.status)} size={14} />
          <span className="text-xs font-semibold">
            {assignment?.status === 'available' && 'Disponible'}
            {assignment?.status === 'occupied' && 'Ocupada'}
            {assignment?.status === 'reserved' && 'Reservada'}
            {assignment?.status === 'cleaning' && 'Limpieza'}
          </span>
        </div>
      </div>
      {assignment?.status === 'occupied' && assignment?.currentGuests && (
        <div className="space-y-2 p-3 bg-muted/50 rounded-lg">
          <div className="flex items-center gap-2">
            <Icon name="User" size={16} color="var(--color-muted-foreground)" />
            <span className="text-sm font-medium text-foreground">
              {assignment?.currentGuests?.name}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Icon name="Clock" size={16} color="var(--color-muted-foreground)" />
            <span className="text-sm text-muted-foreground">
              Llegada: {assignment?.currentGuests?.arrivalTime}
            </span>
          </div>
          {assignment?.currentGuests?.estimatedDuration && (
            <div className="flex items-center gap-2">
              <Icon name="Timer" size={16} color="var(--color-muted-foreground)" />
              <span className="text-sm text-muted-foreground">
                Duración estimada: {assignment?.currentGuests?.estimatedDuration} min
              </span>
            </div>
          )}
        </div>
      )}
      {assignment?.status === 'reserved' && assignment?.reservation && (
        <div className="space-y-2 p-3 bg-warning/5 rounded-lg border border-warning/20">
          <div className="flex items-center gap-2">
            <Icon name="Calendar" size={16} color="var(--color-warning)" />
            <span className="text-sm font-medium text-foreground">
              {assignment?.reservation?.customerName}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Icon name="Clock" size={16} color="var(--color-warning)" />
            <span className="text-sm text-warning">
              Reserva: {assignment?.reservation?.time}
            </span>
          </div>
        </div>
      )}
      {assignment?.status === 'available' && (
        <div className="p-3 bg-success/5 rounded-lg border border-success/20">
          <p className="text-sm text-success text-center font-medium">
            Lista para nuevos clientes
          </p>
        </div>
      )}
    </div>
  );
};

export default TableAssignmentCard;