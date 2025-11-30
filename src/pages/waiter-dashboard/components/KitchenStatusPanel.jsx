import Icon from '../../../components/AppIcon';

const KitchenStatusPanel = ({ kitchenOrders }) => {
  const getPreparationColor = (status) => {
    const colors = {
      queued: 'bg-muted text-muted-foreground',
      preparing: 'bg-primary/10 text-primary',
      ready: 'bg-success/10 text-success'
    };
    return colors?.[status] || colors?.queued;
  };

  return (
    <div className="bg-card border border-border rounded-xl shadow-warm overflow-hidden">
      <div className="p-4 border-b border-border bg-muted/30">
        <div className="flex items-center gap-2">
          <Icon name="ChefHat" size={20} color="var(--color-primary)" />
          <h3 className="text-lg font-heading font-semibold text-foreground">
            Estado de Cocina
          </h3>
        </div>
      </div>
      <div className="p-4 space-y-3 max-h-96 overflow-y-auto">
        {kitchenOrders?.length === 0 ? (
          <div className="text-center py-8">
            <Icon name="CheckCircle2" size={48} color="var(--color-success)" className="mx-auto mb-3" />
            <p className="text-sm text-muted-foreground">
              No hay órdenes en cocina
            </p>
          </div>
        ) : (
          kitchenOrders?.map((order) => (
            <div
              key={order?.id}
              className="p-3 bg-muted/50 rounded-lg border border-border"
            >
              <div className="flex items-start justify-between gap-3 mb-2">
                <div>
                  <h4 className="font-semibold text-foreground">
                    Mesa {order?.tableNumber} - Orden #{order?.orderNumber}
                  </h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    {order?.dishName}
                  </p>
                </div>
                <div className={`px-2 py-1 rounded-lg text-xs font-semibold ${getPreparationColor(order?.preparationStatus)}`}>
                  {order?.preparationStatus === 'queued' && 'En Cola'}
                  {order?.preparationStatus === 'preparing' && 'Preparando'}
                  {order?.preparationStatus === 'ready' && 'Listo'}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Icon name="Clock" size={14} color="var(--color-muted-foreground)" />
                  <span className="text-sm text-muted-foreground">
                    {order?.estimatedTime} min restantes
                  </span>
                </div>
                {order?.preparationStatus === 'ready' && (
                  <div className="flex items-center gap-1 text-success">
                    <Icon name="Bell" size={14} />
                    <span className="text-xs font-semibold">Recoger</span>
                  </div>
                )}
              </div>

              {order?.preparationStatus === 'preparing' && (
                <div className="mt-2">
                  <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-primary h-full transition-smooth"
                      style={{ width: `${order?.progress}%` }}
                    />
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default KitchenStatusPanel;