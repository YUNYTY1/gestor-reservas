import React from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';
import Button from '../../../components/ui/Button';

const ContactInfoForm = ({ 
  contactInfo,
  onContactInfoChange,
  errors = {},
  onSubmit,
  isLoading = false 
}) => {
  const {
    firstName = '',
    lastName = '',
    email = '',
    phone = '',
    smsNotifications = false,
    emailNotifications = true,
    emergencyContact = ''
  } = contactInfo;

  const handleInputChange = (field, value) => {
    onContactInfoChange({
      ...contactInfo,
      [field]: value
    });
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!firstName?.trim()) {
      newErrors.firstName = 'El nombre es requerido';
    }
    
    if (!lastName?.trim()) {
      newErrors.lastName = 'El apellido es requerido';
    }
    
    if (!email?.trim()) {
      newErrors.email = 'El email es requerido';
    } else if (!/\S+@\S+\.\S+/?.test(email)) {
      newErrors.email = 'El email no es válido';
    }
    
    if (!phone?.trim()) {
      newErrors.phone = 'El teléfono es requerido';
    } else if (!/^\+?[\d\s\-\(\)]{10,}$/?.test(phone)) {
      newErrors.phone = 'El teléfono no es válido';
    }
    
    return newErrors;
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    const formErrors = validateForm();
    
    if (Object.keys(formErrors)?.length === 0) {
      onSubmit(contactInfo);
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 space-y-6">
      <div className="flex items-center space-x-2">
        <Icon name="User" size={20} className="text-primary" />
        <h3 className="text-xl font-semibold text-foreground">Información de Contacto</h3>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Nombre"
            type="text"
            placeholder="Tu nombre"
            value={firstName}
            onChange={(e) => handleInputChange('firstName', e?.target?.value)}
            error={errors?.firstName}
            required
          />
          
          <Input
            label="Apellido"
            type="text"
            placeholder="Tu apellido"
            value={lastName}
            onChange={(e) => handleInputChange('lastName', e?.target?.value)}
            error={errors?.lastName}
            required
          />
        </div>

        {/* Contact Fields */}
        <Input
          label="Email"
          type="email"
          placeholder="tu@email.com"
          value={email}
          onChange={(e) => handleInputChange('email', e?.target?.value)}
          error={errors?.email}
          description="Recibirás la confirmación de tu reserva por email"
          required
        />

        <Input
          label="Teléfono"
          type="tel"
          placeholder="+34 123 456 789"
          value={phone}
          onChange={(e) => handleInputChange('phone', e?.target?.value)}
          error={errors?.phone}
          description="Para contactarte en caso de cambios o emergencias"
          required
        />

        {/* Emergency Contact */}
        <Input
          label="Contacto de Emergencia (Opcional)"
          type="tel"
          placeholder="+34 987 654 321"
          value={emergencyContact}
          onChange={(e) => handleInputChange('emergencyContact', e?.target?.value)}
          description="Número alternativo en caso de no poder contactarte"
        />

        {/* Notification Preferences */}
        <div className="space-y-4">
          <h4 className="font-medium text-foreground">Preferencias de Notificación</h4>
          
          <div className="space-y-3">
            <Checkbox
              label="Notificaciones por Email"
              description="Recibir confirmaciones y recordatorios por email"
              checked={emailNotifications}
              onChange={(e) => handleInputChange('emailNotifications', e?.target?.checked)}
            />
            
            <Checkbox
              label="Notificaciones por SMS"
              description="Recibir recordatorios y actualizaciones por mensaje de texto"
              checked={smsNotifications}
              onChange={(e) => handleInputChange('smsNotifications', e?.target?.checked)}
            />
          </div>
        </div>

        {/* Privacy Notice */}
        <div className="p-4 bg-muted/50 border border-border rounded-lg">
          <div className="flex items-start space-x-2">
            <Icon name="Shield" size={16} className="text-primary mt-0.5" />
            <div className="text-sm">
              <p className="font-medium text-foreground">Privacidad y Datos</p>
              <p className="text-muted-foreground mt-1">
                Tu información personal será utilizada únicamente para gestionar tu reserva 
                y mejorar tu experiencia. No compartimos tus datos con terceros.
              </p>
            </div>
          </div>
        </div>

        {/* Terms and Conditions */}
        <div className="space-y-3">
          <Checkbox
            label="Acepto los términos y condiciones"
            description="He leído y acepto la política de privacidad y términos de servicio"
            required
          />
          
          <Checkbox
            label="Acepto recibir ofertas promocionales (Opcional)"
            description="Recibir información sobre promociones especiales y eventos"
          />
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <Button
            type="submit"
            variant="default"
            size="lg"
            fullWidth
            loading={isLoading}
            iconName="Send"
            iconPosition="left"
          >
            {isLoading ? 'Procesando...' : 'Confirmar Reserva'}
          </Button>
        </div>
      </form>
      {/* Help Section */}
      <div className="pt-4 border-t border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon name="HelpCircle" size={16} className="text-muted-foreground" />
            <span className="text-sm text-muted-foreground">¿Necesitas ayuda?</span>
          </div>
          <div className="flex space-x-4">
            <Button
              variant="ghost"
              size="sm"
              iconName="Phone"
              iconPosition="left"
            >
              Llamar
            </Button>
            <Button
              variant="ghost"
              size="sm"
              iconName="MessageCircle"
              iconPosition="left"
            >
              Chat
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInfoForm;