import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const StaffOverview = ({ staff, onManageStaff }) => {
  const getStatusColor = (status) => {
    switch(status) {
      case 'active': return 'bg-success/10 text-success border-success/20';
      case 'break': return 'bg-warning/10 text-warning border-warning/20';
      case 'offline': return 'bg-muted text-muted-foreground border-border';
      default: return 'bg-muted text-muted-foreground border-border';
    }
  };

  const getStatusLabel = (status) => {
    switch(status) {
      case 'active': return 'Activo';
      case 'break': return 'En Descanso';
      case 'offline': return 'Fuera de Línea';
      default: return status;
    }
  };

  const getRoleLabel = (role) => {
    switch(role) {
      case 'waiter': return 'Mesero';
      case 'chef': return 'Chef';
      case 'manager': return 'Gerente';
      default: return role;
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border shadow-warm">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-heading font-semibold text-foreground">
            Personal del Restaurante
          </h3>
          <Button
            variant="outline"
            size="sm"
            iconName="UserPlus"
            iconPosition="left"
            onClick={onManageStaff}
          >
            Gestionar Personal
          </Button>
        </div>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {staff?.map((member) => (
            <div 
              key={member?.id}
              className="bg-background rounded-lg border border-border p-4 hover:shadow-warm transition-smooth"
            >
              <div className="flex items-start gap-3 mb-4">
                <div className="relative">
                  <Image
                    src={member?.avatar}
                    alt={member?.avatarAlt}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-background ${
                    member?.status === 'active' ? 'bg-success' :
                    member?.status === 'break'? 'bg-warning' : 'bg-muted'
                  }`} />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-foreground truncate">{member?.name}</h4>
                  <p className="text-sm text-muted-foreground">{getRoleLabel(member?.role)}</p>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Estado:</span>
                  <span className={`px-2 py-1 rounded-md text-xs font-medium border ${getStatusColor(member?.status)}`}>
                    {getStatusLabel(member?.status)}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Pedidos Hoy:</span>
                  <span className="font-semibold text-foreground">{member?.ordersToday}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Turno:</span>
                  <span className="font-medium text-foreground">{member?.shift}</span>
                </div>
              </div>

              <div className="pt-4 border-t border-border">
                <div className="flex items-center gap-2">
                  <Icon name="Star" size={14} color="var(--color-accent)" />
                  <span className="text-sm font-medium text-foreground">{member?.rating}</span>
                  <span className="text-sm text-muted-foreground">({member?.reviews} reseñas)</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StaffOverview;