import React from 'react';
import Icon from "../AppIcon";

const OrderProgressTracker = ({ 
  currentStep = 0, 
  orderId, 
  estimatedTime,
  orderItems = [],
  layout = 'horizontal',
  showDetails = true 
}) => {
  const steps = [
    {
      id: 'received',
      label: 'Recibido',
      description: 'Pedido confirmado',
      icon: 'CheckCircle',
      color: 'success'
    },
    {
      id: 'preparing',
      label: 'Preparando',
      description: 'En cocina',
      icon: 'ChefHat',
      color: 'warning'
    },
    {
      id: 'ready',
      label: 'Listo',
      description: 'Para recoger/entregar',
      icon: 'Package',
      color: 'primary'
    },
    {
      id: 'delivered',
      label: 'Entregado',
      description: 'Pedido completado',
      icon: 'Truck',
      color: 'success'
    }
  ];

  const getStepStatus = (stepIndex) => {
    if (stepIndex < currentStep) return 'completed';
    if (stepIndex === currentStep) return 'active';
    return 'pending';
  };

  const getStepClasses = (status, color) => {
    const baseClasses = 'transition-smooth';
    
    switch (status) {
      case 'completed':
        return `${baseClasses} text-success bg-success/10 border-success/20`;
      case 'active':
        return `${baseClasses} text-${color} bg-${color}/10 border-${color}/20 animate-pulse`;
      case 'pending':
        return `${baseClasses} text-muted-foreground bg-muted border-border`;
      default:
        return baseClasses;
    }
  };

  const formatEstimatedTime = (minutes) => {
    if (!minutes) return '';
    if (minutes < 60) return `${minutes} min`;
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}min`;
  };

  if (layout === 'vertical') {
    return (
      <div className="space-y-4">
        {showDetails && (
          <div className="bg-card border border-border rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-foreground">
                Pedido #{orderId}
              </h3>
              {estimatedTime && (
                <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                  <Icon name="Clock" size={14} />
                  <span>{formatEstimatedTime(estimatedTime)}</span>
                </div>
              )}
            </div>
            {orderItems?.length > 0 && (
              <div className="text-sm text-muted-foreground">
                {orderItems?.slice(0, 2)?.map((item, index) => (
                  <div key={index}>{item?.quantity}x {item?.name}</div>
                ))}
                {orderItems?.length > 2 && (
                  <div>+{orderItems?.length - 2} más...</div>
                )}
              </div>
            )}
          </div>
        )}
        <div className="space-y-3">
          {steps?.map((step, index) => {
            const status = getStepStatus(index);
            return (
              <div key={step?.id} className="flex items-start space-x-3">
                <div className={`flex-shrink-0 w-8 h-8 rounded-full border-2 flex items-center justify-center ${getStepClasses(status, step?.color)}`}>
                  <Icon 
                    name={status === 'completed' ? 'Check' : step?.icon} 
                    size={16} 
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2">
                    <span className={`font-medium ${
                      status === 'active' ? `text-${step?.color}` : 
                      status === 'completed' ? 'text-success' : 'text-muted-foreground'
                    }`}>
                      {step?.label}
                    </span>
                    {status === 'active' && (
                      <span className="text-xs bg-accent text-accent-foreground px-2 py-1 rounded-full">
                        En progreso
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    {step?.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // Horizontal layout
  return (
    <div className="space-y-4">
      {showDetails && (
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-foreground">
              Pedido #{orderId}
            </h3>
            {orderItems?.length > 0 && (
              <p className="text-sm text-muted-foreground">
                {orderItems?.length} artículo{orderItems?.length !== 1 ? 's' : ''}
              </p>
            )}
          </div>
          {estimatedTime && (
            <div className="flex items-center space-x-1 text-sm text-muted-foreground">
              <Icon name="Clock" size={14} />
              <span>Tiempo estimado: {formatEstimatedTime(estimatedTime)}</span>
            </div>
          )}
        </div>
      )}
      <div className="relative">
        {/* Progress line */}
        <div className="absolute top-4 left-4 right-4 h-0.5 bg-border">
          <div 
            className="h-full bg-success transition-smooth duration-1000"
            style={{ width: `${(currentStep / (steps?.length - 1)) * 100}%` }}
          ></div>
        </div>
        
        {/* Steps */}
        <div className="relative flex justify-between">
          {steps?.map((step, index) => {
            const status = getStepStatus(index);
            return (
              <div key={step?.id} className="flex flex-col items-center space-y-2">
                <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center bg-background ${getStepClasses(status, step?.color)}`}>
                  <Icon 
                    name={status === 'completed' ? 'Check' : step?.icon} 
                    size={16} 
                  />
                </div>
                <div className="text-center">
                  <div className={`text-sm font-medium ${
                    status === 'active' ? `text-${step?.color}` : 
                    status === 'completed' ? 'text-success' : 'text-muted-foreground'
                  }`}>
                    {step?.label}
                  </div>
                  <div className="text-xs text-muted-foreground hidden sm:block">
                    {step?.description}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {/* Current step details */}
      {currentStep < steps?.length && (
        <div className="bg-muted/50 rounded-lg p-3">
          <div className="flex items-center space-x-2">
            <Icon 
              name={steps?.[currentStep]?.icon} 
              size={16} 
              className={`text-${steps?.[currentStep]?.color}`} 
            />
            <span className="text-sm font-medium">
              {steps?.[currentStep]?.label}: {steps?.[currentStep]?.description}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderProgressTracker;