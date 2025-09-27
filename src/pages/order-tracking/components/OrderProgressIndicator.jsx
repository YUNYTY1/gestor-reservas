import React from 'react';
import Icon from '../../../components/AppIcon';

const OrderProgressIndicator = ({ currentStep, orderType = 'pickup', layout = 'horizontal' }) => {
  const pickupSteps = [
    {
      id: 'received',
      label: 'Recibido',
      description: 'Pedido confirmado',
      icon: 'CheckCircle'
    },
    {
      id: 'preparing',
      label: 'Preparando',
      description: 'En cocina',
      icon: 'ChefHat'
    },
    {
      id: 'ready',
      label: 'Listo',
      description: 'Para recoger',
      icon: 'Package'
    }
  ];

  const deliverySteps = [
    {
      id: 'received',
      label: 'Recibido',
      description: 'Pedido confirmado',
      icon: 'CheckCircle'
    },
    {
      id: 'preparing',
      label: 'Preparando',
      description: 'En cocina',
      icon: 'ChefHat'
    },
    {
      id: 'ready',
      label: 'Listo',
      description: 'Para entregar',
      icon: 'Package'
    },
    {
      id: 'delivered',
      label: 'En Camino',
      description: 'Siendo entregado',
      icon: 'Truck'
    }
  ];

  const steps = orderType === 'delivery' ? deliverySteps : pickupSteps;

  const getStepStatus = (stepIndex) => {
    if (stepIndex < currentStep) return 'completed';
    if (stepIndex === currentStep) return 'active';
    return 'pending';
  };

  const getStepClasses = (status) => {
    switch (status) {
      case 'completed':
        return 'text-success bg-success border-success';
      case 'active':
        return 'text-primary bg-primary border-primary animate-pulse';
      case 'pending':
        return 'text-muted-foreground bg-background border-border';
      default:
        return 'text-muted-foreground bg-background border-border';
    }
  };

  if (layout === 'vertical') {
    return (
      <div className="space-y-4">
        {steps?.map((step, index) => {
          const status = getStepStatus(index);
          return (
            <div key={step?.id} className="flex items-start space-x-4">
              <div className={`flex-shrink-0 w-10 h-10 rounded-full border-2 flex items-center justify-center transition-smooth ${getStepClasses(status)}`}>
                <Icon 
                  name={status === 'completed' ? 'Check' : step?.icon} 
                  size={20}
                  color={status === 'completed' ? 'white' : status === 'active' ? 'white' : 'currentColor'}
                />
              </div>
              <div className="flex-1 min-w-0 pb-4">
                <div className="flex items-center space-x-2 mb-1">
                  <span className={`font-semibold ${
                    status === 'active' ? 'text-primary' : 
                    status === 'completed' ? 'text-success' : 'text-muted-foreground'
                  }`}>
                    {step?.label}
                  </span>
                  {status === 'active' && (
                    <span className="text-xs bg-primary text-primary-foreground px-2 py-1 rounded-full">
                      En progreso
                    </span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">
                  {step?.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Progress line */}
      <div className="absolute top-5 left-5 right-5 h-0.5 bg-border">
        <div 
          className="h-full bg-success transition-all duration-1000"
          style={{ width: `${(currentStep / (steps?.length - 1)) * 100}%` }}
        />
      </div>
      {/* Steps */}
      <div className="relative flex justify-between">
        {steps?.map((step, index) => {
          const status = getStepStatus(index);
          return (
            <div key={step?.id} className="flex flex-col items-center space-y-2">
              <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center bg-background transition-smooth ${getStepClasses(status)}`}>
                <Icon 
                  name={status === 'completed' ? 'Check' : step?.icon} 
                  size={20}
                  color={status === 'completed' ? 'white' : status === 'active' ? 'white' : 'currentColor'}
                />
              </div>
              <div className="text-center max-w-20">
                <div className={`text-sm font-medium ${
                  status === 'active' ? 'text-primary' : 
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
  );
};

export default OrderProgressIndicator;