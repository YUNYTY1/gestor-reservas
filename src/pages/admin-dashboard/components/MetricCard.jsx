import Icon from '../../../components/AppIcon';

const MetricCard = ({ title, value, subtitle, icon, iconColor, trend, trendValue }) => {
  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-warm hover:shadow-warm-md transition-smooth">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <p className="text-sm font-medium text-muted-foreground mb-1">{title}</p>
          <h3 className="text-3xl font-heading font-bold text-foreground">{value}</h3>
          {subtitle && (
            <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>
          )}
        </div>
        <div className={`flex items-center justify-center w-12 h-12 rounded-lg ${iconColor || 'bg-primary/10'}`}>
          <Icon name={icon} size={24} color={iconColor ? 'currentColor' : 'var(--color-primary)'} />
        </div>
      </div>
      {trend && (
        <div className="flex items-center gap-2">
          <Icon 
            name={trend === 'up' ? 'TrendingUp' : 'TrendingDown'} 
            size={16} 
            color={trend === 'up' ? 'var(--color-success)' : 'var(--color-error)'} 
          />
          <span className={`text-sm font-medium ${trend === 'up' ? 'text-success' : 'text-error'}`}>
            {trendValue}
          </span>
          <span className="text-sm text-muted-foreground">vs último mes</span>
        </div>
      )}
    </div>
  );
};

export default MetricCard;