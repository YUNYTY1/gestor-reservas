import Icon from '../../../components/AppIcon';

const QuickStatsBar = ({ stats }) => {
  const statItems = [
    {
      icon: 'ClipboardList',
      label: 'Órdenes Activas',
      value: stats?.activeOrders,
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    },
    {
      icon: 'Clock',
      label: 'Pendientes',
      value: stats?.pendingOrders,
      color: 'text-warning',
      bgColor: 'bg-warning/10'
    },
    {
      icon: 'CheckCircle2',
      label: 'Completadas Hoy',
      value: stats?.completedToday,
      color: 'text-success',
      bgColor: 'bg-success/10'
    },
    {
      icon: 'Users',
      label: 'Mesas Asignadas',
      value: stats?.assignedTables,
      color: 'text-accent',
      bgColor: 'bg-accent/10'
    }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {statItems?.map((item, index) => (
        <div
          key={index}
          className="bg-card border border-border rounded-xl p-4 shadow-warm transition-smooth hover:shadow-warm-md"
        >
          <div className="flex items-center gap-3">
            <div className={`flex items-center justify-center w-12 h-12 rounded-lg ${item?.bgColor}`}>
              <Icon name={item?.icon} size={24} color={`var(--color-${item?.color?.replace('text-', '')})`} />
            </div>
            <div>
              <p className="text-2xl font-heading font-bold text-foreground">
                {item?.value}
              </p>
              <p className="text-sm text-muted-foreground">{item?.label}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default QuickStatsBar;