import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickActions = ({ onAction }) => {
  const [showQuickReservation, setShowQuickReservation] = useState(false);

  const quickActions = [
    {
      id: 'new-reservation',
      label: 'Nueva Reserva',
      icon: 'Plus',
      color: 'primary',
      description: 'Crear reserva manual'
    },
    {
      id: 'table-status',
      label: 'Estado Mesas',
      icon: 'Grid3x3',
      color: 'secondary',
      description: 'Ver disponibilidad'
    },
    {
      id: 'waitlist',
      label: 'Lista de Espera',
      icon: 'Clock',
      color: 'warning',
      description: 'Gestionar esperas'
    },
    {
      id: 'reports',
      label: 'Reportes',
      icon: 'BarChart3',
      color: 'accent',
      description: 'Ver estadísticas'
    }
  ];

  const emergencyActions = [
    {
      id: 'cancel-all',
      label: 'Cancelar Reservas',
      icon: 'XCircle',
      color: 'error',
      description: 'Emergencia'
    },
    {
      id: 'close-kitchen',
      label: 'Cerrar Cocina',
      icon: 'ChefHat',
      color: 'error',
      description: 'Parar pedidos'
    }
  ];

  const getColorClasses = (color) => {
    const colorMap = {
      primary: 'bg-primary text-primary-foreground hover:bg-primary/90',
      secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/90',
      warning: 'bg-warning text-warning-foreground hover:bg-warning/90',
      accent: 'bg-accent text-accent-foreground hover:bg-accent/90',
      error: 'bg-error text-error-foreground hover:bg-error/90'
    };
    return colorMap?.[color] || colorMap?.primary;
  };

  const handleActionClick = (actionId) => {
    if (actionId === 'new-reservation') {
      setShowQuickReservation(true);
    } else if (onAction) {
      onAction(actionId);
    }
  };

  return (
    <div className="space-y-6">
      {/* Quick Actions */}
      <div className="bg-card border border-border rounded-lg p-6 shadow-soft">
        <h3 className="text-lg font-semibold text-foreground mb-4">Acciones Rápidas</h3>
        
        <div className="grid grid-cols-2 gap-3">
          {quickActions?.map((action) => (
            <button
              key={action?.id}
              onClick={() => handleActionClick(action?.id)}
              className={`p-4 rounded-lg transition-smooth text-left ${getColorClasses(action?.color)}`}
            >
              <div className="flex items-center space-x-3">
                <Icon name={action?.icon} size={20} />
                <div>
                  <div className="font-medium">{action?.label}</div>
                  <div className="text-xs opacity-80">{action?.description}</div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
      {/* Emergency Actions */}
      <div className="bg-card border border-border rounded-lg p-6 shadow-soft">
        <h3 className="text-lg font-semibold text-foreground mb-4">Acciones de Emergencia</h3>
        
        <div className="space-y-2">
          {emergencyActions?.map((action) => (
            <button
              key={action?.id}
              onClick={() => handleActionClick(action?.id)}
              className={`w-full p-3 rounded-lg transition-smooth text-left ${getColorClasses(action?.color)}`}
            >
              <div className="flex items-center space-x-3">
                <Icon name={action?.icon} size={18} />
                <div>
                  <div className="font-medium">{action?.label}</div>
                  <div className="text-xs opacity-80">{action?.description}</div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
      {/* Quick Reservation Form */}
      {showQuickReservation && (
        <div className="fixed inset-0 z-modal bg-black/50 flex items-center justify-center p-4">
          <div className="bg-card border border-border rounded-lg p-6 w-full max-w-md shadow-elevated">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-foreground">Reserva Rápida</h3>
              <Button
                variant="ghost"
                size="sm"
                iconName="X"
                onClick={() => setShowQuickReservation(false)}
              />
            </div>
            
            <form className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">
                    Nombre
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-border rounded-lg bg-input text-foreground focus:ring-2 focus:ring-ring focus:border-transparent"
                    placeholder="Nombre del cliente"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">
                    Teléfono
                  </label>
                  <input
                    type="tel"
                    className="w-full px-3 py-2 border border-border rounded-lg bg-input text-foreground focus:ring-2 focus:ring-ring focus:border-transparent"
                    placeholder="+34 600 000 000"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">
                    Fecha
                  </label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-border rounded-lg bg-input text-foreground focus:ring-2 focus:ring-ring focus:border-transparent"
                    defaultValue={new Date()?.toISOString()?.split('T')?.[0]}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">
                    Hora
                  </label>
                  <input
                    type="time"
                    className="w-full px-3 py-2 border border-border rounded-lg bg-input text-foreground focus:ring-2 focus:ring-ring focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">
                    Personas
                  </label>
                  <select className="w-full px-3 py-2 border border-border rounded-lg bg-input text-foreground focus:ring-2 focus:ring-ring focus:border-transparent">
                    {[1,2,3,4,5,6,7,8]?.map(num => (
                      <option key={num} value={num}>{num}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  Mesa
                </label>
                <select className="w-full px-3 py-2 border border-border rounded-lg bg-input text-foreground focus:ring-2 focus:ring-ring focus:border-transparent">
                  <option value="">Asignar automáticamente</option>
                  {[1,2,3,4,5,6,7,8,9,10]?.map(num => (
                    <option key={num} value={num}>Mesa {num}</option>
                  ))}
                </select>
              </div>
              
              <div className="flex space-x-3 pt-4">
                <Button
                  variant="outline"
                  fullWidth
                  onClick={() => setShowQuickReservation(false)}
                >
                  Cancelar
                </Button>
                <Button
                  variant="default"
                  fullWidth
                  iconName="Check"
                  iconPosition="left"
                >
                  Crear Reserva
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuickActions;