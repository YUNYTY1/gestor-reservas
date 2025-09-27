import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import OrderProgressTracker from '../../../components/ui/OrderProgressTracker';

const OrderManagementPanel = ({ orders = [], onUpdateOrderStatus, onAssignStaff }) => {
  const [filterStatus, setFilterStatus] = useState('active');
  const [selectedOrder, setSelectedOrder] = useState(null);

  const statusFilters = [
    { value: 'active', label: 'Activos', count: orders?.filter(o => o?.status < 3)?.length },
    { value: 'ready', label: 'Listos', count: orders?.filter(o => o?.status === 2)?.length },
    { value: 'completed', label: 'Completados', count: orders?.filter(o => o?.status === 3)?.length }
  ];

  const getFilteredOrders = () => {
    switch (filterStatus) {
      case 'active':
        return orders?.filter(order => order?.status < 3);
      case 'ready':
        return orders?.filter(order => order?.status === 2);
      case 'completed':
        return orders?.filter(order => order?.status === 3);
      default:
        return orders;
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-error bg-error/10 border-error/20';
      case 'medium': return 'text-warning bg-warning/10 border-warning/20';
      case 'low': return 'text-muted-foreground bg-muted border-border';
      default: return 'text-muted-foreground bg-muted border-border';
    }
  };

  const formatOrderTime = (time) => {
    return new Date(time)?.toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const calculateEstimatedTime = (orderTime, preparationTime) => {
    const orderDate = new Date(orderTime);
    const estimatedCompletion = new Date(orderDate.getTime() + preparationTime * 60000);
    const now = new Date();
    const remainingMinutes = Math.max(0, Math.floor((estimatedCompletion - now) / 60000));
    return remainingMinutes;
  };

  const filteredOrders = getFilteredOrders();

  return (
    <div className="bg-card border border-border rounded-lg shadow-soft">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Gestión de Pedidos</h3>
          <Button variant="outline" size="sm" iconName="RefreshCw" iconPosition="left">
            Actualizar
          </Button>
        </div>
        
        {/* Status Filters */}
        <div className="flex items-center space-x-1">
          {statusFilters?.map((filter) => (
            <button
              key={filter?.value}
              onClick={() => setFilterStatus(filter?.value)}
              className={`flex items-center space-x-2 px-3 py-2 text-sm font-medium rounded-lg transition-smooth ${
                filterStatus === filter?.value
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              <span>{filter?.label}</span>
              <span className={`px-2 py-0.5 text-xs rounded-full ${
                filterStatus === filter?.value
                  ? 'bg-primary-foreground/20 text-primary-foreground'
                  : 'bg-muted text-muted-foreground'
              }`}>
                {filter?.count}
              </span>
            </button>
          ))}
        </div>
      </div>
      <div className="p-6">
        {filteredOrders?.length === 0 ? (
          <div className="text-center py-8">
            <Icon name="Package" size={48} className="text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No hay pedidos en esta categoría</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredOrders?.map((order) => (
              <div
                key={order?.id}
                className="border border-border rounded-lg p-4 transition-smooth hover:shadow-soft"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="text-center">
                      <div className="text-lg font-bold text-foreground">
                        #{order?.id}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {formatOrderTime(order?.orderTime)}
                      </div>
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className="font-medium text-foreground">
                          Mesa {order?.tableNumber}
                        </h4>
                        {order?.priority && (
                          <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getPriorityColor(order?.priority)}`}>
                            {order?.priority === 'high' ? 'Alta' : 
                             order?.priority === 'medium' ? 'Media' : 'Baja'}
                          </span>
                        )}
                      </div>
                      
                      <div className="text-sm text-muted-foreground mb-2">
                        {order?.items?.slice(0, 2)?.map((item, index) => (
                          <div key={index}>
                            {item?.quantity}x {item?.name}
                          </div>
                        ))}
                        {order?.items?.length > 2 && (
                          <div>+{order?.items?.length - 2} más...</div>
                        )}
                      </div>
                      
                      {order?.specialRequests && (
                        <div className="flex items-center space-x-1 text-sm text-warning">
                          <Icon name="AlertTriangle" size={14} />
                          <span>{order?.specialRequests}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="text-right">
                      <div className="text-sm font-medium text-foreground">
                        €{order?.total?.toFixed(2)}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {calculateEstimatedTime(order?.orderTime, order?.estimatedTime)} min restantes
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-1">
                      {order?.status < 3 && (
                        <Button
                          variant="ghost"
                          size="sm"
                          iconName="ChevronRight"
                          onClick={() => onUpdateOrderStatus(order?.id, order?.status + 1)}
                          className="text-primary hover:bg-primary/10"
                        />
                      )}
                      
                      <Button
                        variant="ghost"
                        size="sm"
                        iconName="MoreVertical"
                        onClick={() => setSelectedOrder(selectedOrder === order?.id ? null : order?.id)}
                      />
                    </div>
                  </div>
                </div>
                
                {/* Order Progress */}
                <div className="mt-4">
                  <OrderProgressTracker
                    currentStep={order?.status}
                    orderId={order?.id}
                    estimatedTime={calculateEstimatedTime(order?.orderTime, order?.estimatedTime)}
                    orderItems={order?.items}
                    layout="horizontal"
                    showDetails={false}
                  />
                </div>
                
                {/* Staff Assignment */}
                {order?.assignedStaff && (
                  <div className="flex items-center space-x-2 mt-3 pt-3 border-t border-border">
                    <Icon name="User" size={14} className="text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      Asignado a: {order?.assignedStaff}
                    </span>
                  </div>
                )}
                
                {/* Expanded Details */}
                {selectedOrder === order?.id && (
                  <div className="mt-4 pt-4 border-t border-border">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-medium text-foreground mb-2">Detalles del Pedido</h5>
                        <div className="space-y-1">
                          {order?.items?.map((item, index) => (
                            <div key={index} className="flex justify-between text-sm">
                              <span>{item?.quantity}x {item?.name}</span>
                              <span>€{(item?.price * item?.quantity)?.toFixed(2)}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h5 className="font-medium text-foreground mb-2">Acciones</h5>
                        <div className="space-y-2">
                          <Button variant="outline" size="sm" fullWidth iconName="User" iconPosition="left">
                            Reasignar Personal
                          </Button>
                          <Button variant="outline" size="sm" fullWidth iconName="Clock" iconPosition="left">
                            Ajustar Tiempo
                          </Button>
                        </div>
                      </div>
                    </div>
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

export default OrderManagementPanel;