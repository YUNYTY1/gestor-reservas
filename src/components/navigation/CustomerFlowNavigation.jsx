import { useNavigate, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from '../ui/Button';

const CustomerFlowNavigation = ({ currentStep = 1, totalSteps = 4 }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const customerSteps = [
    { step: 1, path: '/customer-registration', label: 'Registration', icon: 'UserPlus' },
    { step: 2, path: '/admin-dashboard', label: 'Dashboard', icon: 'LayoutDashboard' },
    { step: 3, path: '/table-reservation-system', label: 'Reserve Table', icon: 'Calendar' },
    { step: 4, path: '/menu-and-food-ordering', label: 'Order Food', icon: 'UtensilsCrossed' },
  ];

  const currentStepIndex = customerSteps?.findIndex(s => s?.path === location?.pathname);
  const activeStep = currentStepIndex >= 0 ? currentStepIndex + 1 : currentStep;

  const handleNext = () => {
    const nextIndex = currentStepIndex + 1;
    if (nextIndex < customerSteps?.length) {
      navigate(customerSteps?.[nextIndex]?.path);
    }
  };

  const handleBack = () => {
    const prevIndex = currentStepIndex - 1;
    if (prevIndex >= 0) {
      navigate(customerSteps?.[prevIndex]?.path);
    }
  };

  const canGoBack = currentStepIndex > 0;
  const canGoNext = currentStepIndex < customerSteps?.length - 1;

  return (
    <div className="bg-card border-b border-border shadow-warm">
      <div className="px-4 py-4 lg:px-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Icon 
              name={customerSteps?.[currentStepIndex]?.icon || 'Circle'} 
              size={20} 
              color="var(--color-primary)" 
            />
            <span className="text-sm font-semibold text-foreground">
              Step {activeStep} of {totalSteps}
            </span>
          </div>
          <span className="text-sm font-medium text-muted-foreground hidden sm:block">
            {customerSteps?.[currentStepIndex]?.label || 'Progress'}
          </span>
        </div>

        <div className="flex items-center gap-2 mb-4">
          {customerSteps?.map((step, index) => (
            <div key={step?.step} className="flex items-center flex-1">
              <div
                className={`h-2 rounded-full transition-smooth flex-1 ${
                  index < activeStep
                    ? 'bg-primary'
                    : index === activeStep - 1
                    ? 'bg-primary/50' :'bg-muted'
                }`}
              />
              {index < customerSteps?.length - 1 && (
                <div className="w-2" />
              )}
            </div>
          ))}
        </div>

        <div className="hidden md:flex items-center justify-center gap-2">
          {customerSteps?.map((step, index) => (
            <div
              key={step?.step}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-quick ${
                index === currentStepIndex
                  ? 'bg-primary/10 text-primary'
                  : index < currentStepIndex
                  ? 'text-success' :'text-muted-foreground'
              }`}
            >
              <Icon
                name={index < currentStepIndex ? 'CheckCircle2' : step?.icon}
                size={16}
              />
              <span className="text-xs font-medium">{step?.label}</span>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between gap-3 mt-4 md:hidden">
          <Button
            variant="outline"
            size="sm"
            iconName="ChevronLeft"
            iconPosition="left"
            onClick={handleBack}
            disabled={!canGoBack}
          >
            Back
          </Button>
          <Button
            variant="default"
            size="sm"
            iconName="ChevronRight"
            iconPosition="right"
            onClick={handleNext}
            disabled={!canGoNext}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CustomerFlowNavigation;