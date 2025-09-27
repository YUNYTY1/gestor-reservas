import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import { Checkbox } from '../../../components/ui/Checkbox';
import Button from '../../../components/ui/Button';

const NotificationSettings = ({ currentSettings, onSave }) => {
  const [settings, setSettings] = useState({
    smsNotifications: currentSettings?.smsNotifications || false,
    emailNotifications: currentSettings?.emailNotifications || false,
    pushNotifications: currentSettings?.pushNotifications || false,
    statusUpdates: currentSettings?.statusUpdates || true,
    promotionalOffers: currentSettings?.promotionalOffers || false,
    orderReminders: currentSettings?.orderReminders || true,
    ...currentSettings
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleSettingChange = (key, value) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      if (onSave) {
        onSave(settings);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const notificationOptions = [
    {
      key: 'statusUpdates',
      label: 'Actualizaciones de Estado',
      description: 'Recibe notificaciones cuando cambie el estado de tu pedido',
      icon: 'Bell',
      recommended: true
    },
    {
      key: 'orderReminders',
      label: 'Recordatorios de Pedido',
      description: 'Te recordaremos cuando tu pedido esté listo para recoger',
      icon: 'Clock',
      recommended: true
    },
    {
      key: 'smsNotifications',
      label: 'Notificaciones SMS',
      description: 'Recibe actualizaciones por mensaje de texto',
      icon: 'MessageSquare',
      recommended: false
    },
    {
      key: 'emailNotifications',
      label: 'Notificaciones por Email',
      description: 'Recibe confirmaciones y actualizaciones por correo',
      icon: 'Mail',
      recommended: false
    },
    {
      key: 'pushNotifications',
      label: 'Notificaciones Push',
      description: 'Recibe notificaciones directamente en tu navegador',
      icon: 'Smartphone',
      recommended: true
    },
    {
      key: 'promotionalOffers',
      label: 'Ofertas Promocionales',
      description: 'Recibe información sobre descuentos y ofertas especiales',
      icon: 'Tag',
      recommended: false
    }
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-soft">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">
          Preferencias de Notificación
        </h3>
        <Icon name="Settings" size={20} className="text-muted-foreground" />
      </div>
      <p className="text-sm text-muted-foreground mb-6">
        Personaliza cómo quieres recibir actualizaciones sobre tus pedidos.
      </p>
      <div className="space-y-4">
        {notificationOptions?.map((option) => (
          <div key={option?.key} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-smooth">
            <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center mt-1">
              <Icon name={option?.icon} size={16} className="text-primary" />
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2 mb-1">
                <Checkbox
                  checked={settings?.[option?.key]}
                  onChange={(e) => handleSettingChange(option?.key, e?.target?.checked)}
                  label={option?.label}
                />
                {option?.recommended && (
                  <span className="text-xs bg-accent text-accent-foreground px-2 py-1 rounded-full">
                    Recomendado
                  </span>
                )}
              </div>
              <p className="text-sm text-muted-foreground">
                {option?.description}
              </p>
            </div>
          </div>
        ))}
      </div>
      {/* Push Notification Permission */}
      {settings?.pushNotifications && (
        <div className="mt-4 p-3 bg-primary/10 border border-primary/20 rounded-lg">
          <div className="flex items-start space-x-2">
            <Icon name="Info" size={16} className="text-primary mt-0.5" />
            <div>
              <p className="text-sm font-medium text-primary">
                Permisos de Notificación
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Para recibir notificaciones push, necesitarás permitir las notificaciones en tu navegador.
              </p>
              <Button
                variant="ghost"
                size="sm"
                className="mt-2 text-primary hover:bg-primary/10"
                onClick={() => {
                  if ('Notification' in window) {
                    Notification.requestPermission();
                  }
                }}
              >
                Activar Permisos
              </Button>
            </div>
          </div>
        </div>
      )}
      {/* Save Button */}
      <div className="border-t border-border pt-4 mt-6">
        <div className="flex items-center justify-between">
          <p className="text-xs text-muted-foreground">
            Los cambios se aplicarán a futuros pedidos
          </p>
          <Button
            variant="default"
            size="sm"
            loading={isLoading}
            onClick={handleSave}
            iconName="Save"
            iconPosition="left"
          >
            Guardar Preferencias
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotificationSettings;