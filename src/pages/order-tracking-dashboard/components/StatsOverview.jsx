import Icon from '../../../components/AppIcon';

const StatsOverview = ({ stats }) => {
  const statCards = [
    {
      label: 'Pedidos Activos',
      value: stats?.activeOrders,
      icon: 'ShoppingBag',
      color: 'bg-primary/10 text-primary',
      iconColor: 'var(--color-primary)'
    },
    {
      label: 'En Preparación',
      value: stats?.preparing,
      icon: 'ChefHat',
      color: 'bg-warning/10 text-warning',
      iconColor: 'var(--color-warning)'
    },
    {
      label: 'Listos para Servir',
      value: stats?.ready,
      icon: 'CheckCircle2',
      color: 'bg-success/10 text-success',
      iconColor: 'var(--color-success)'
    },
    {
      label: 'Tiempo Promedio',
      value: `${stats?.avgTime} min`,
      icon: 'Clock',
      color: 'bg-accent/10 text-accent',
      iconColor: 'var(--color-accent)'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {statCards?.map((stat, index) => (
        <div
          key={index}
          className="bg-card border border-border rounded-lg shadow-warm p-4 lg:p-6 hover:shadow-warm-md transition-smooth"
        >
          <div className="flex items-start justify-between mb-3">
            <div className={`flex items-center justify-center w-12 h-12 rounded-lg ${stat?.color}`}>
              <Icon name={stat?.icon} size={24} color={stat?.iconColor} />
            </div>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-1">{stat?.label}</p>
            <p className="text-2xl font-heading font-bold text-foreground">{stat?.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsOverview;