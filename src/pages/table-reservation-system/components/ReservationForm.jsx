import { useState } from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const ReservationForm = ({ 
  customerData, 
  selectedDate, 
  selectedTime, 
  onSubmit, 
  isSubmitting 
}) => {
  const [formData, setFormData] = useState({
    name: customerData?.name || '',
    email: customerData?.email || '',
    phone: customerData?.phone || '',
    partySize: '',
    specialRequests: '',
    contactPreference: 'email'
  });

  const [errors, setErrors] = useState({});

  const partySizeOptions = [
    { value: '1', label: '1 persona' },
    { value: '2', label: '2 personas' },
    { value: '3', label: '3 personas' },
    { value: '4', label: '4 personas' },
    { value: '5', label: '5 personas' },
    { value: '6', label: '6 personas' },
    { value: '7', label: '7 personas' },
    { value: '8', label: '8 personas' },
    { value: '9', label: '9+ personas (Grupo grande)' }
  ];

  const contactPreferenceOptions = [
    { value: 'email', label: 'Correo electrónico' },
    { value: 'phone', label: 'Teléfono' },
    { value: 'both', label: 'Ambos' }
  ];

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.name?.trim()) {
      newErrors.name = 'El nombre es requerido';
    }

    if (!formData?.email?.trim()) {
      newErrors.email = 'El correo electrónico es requerido';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/?.test(formData?.email)) {
      newErrors.email = 'Correo electrónico inválido';
    }

    if (!formData?.phone?.trim()) {
      newErrors.phone = 'El teléfono es requerido';
    } else if (!/^\+?[\d\s-]{9,}$/?.test(formData?.phone)) {
      newErrors.phone = 'Número de teléfono inválido';
    }

    if (!formData?.partySize) {
      newErrors.partySize = 'Seleccione el número de personas';
    }

    if (!selectedDate) {
      newErrors.date = 'Seleccione una fecha';
    }

    if (!selectedTime) {
      newErrors.time = 'Seleccione un horario';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (validateForm()) {
      onSubmit({
        ...formData,
        date: selectedDate,
        time: selectedTime
      });
    }
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors?.[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-card rounded-lg border border-border p-6 shadow-warm space-y-6">
      <div className="flex items-center gap-3 pb-4 border-b border-border">
        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
          <Icon name="User" size={20} color="var(--color-primary)" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">Información del Cliente</h3>
          <p className="text-sm text-muted-foreground">Complete los detalles de su reserva</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Nombre completo"
          type="text"
          placeholder="Ingrese su nombre"
          value={formData?.name}
          onChange={(e) => handleChange('name', e?.target?.value)}
          error={errors?.name}
          required
        />

        <Input
          label="Correo electrónico"
          type="email"
          placeholder="correo@ejemplo.com"
          value={formData?.email}
          onChange={(e) => handleChange('email', e?.target?.value)}
          error={errors?.email}
          required
        />

        <Input
          label="Teléfono"
          type="tel"
          placeholder="+51 999 999 999"
          value={formData?.phone}
          onChange={(e) => handleChange('phone', e?.target?.value)}
          error={errors?.phone}
          required
        />

        <Select
          label="Número de personas"
          placeholder="Seleccione cantidad"
          options={partySizeOptions}
          value={formData?.partySize}
          onChange={(value) => handleChange('partySize', value)}
          error={errors?.partySize}
          required
        />
      </div>
      <Select
        label="Preferencia de contacto"
        description="¿Cómo prefiere recibir la confirmación?"
        options={contactPreferenceOptions}
        value={formData?.contactPreference}
        onChange={(value) => handleChange('contactPreference', value)}
      />
      <Input
        label="Solicitudes especiales"
        type="text"
        placeholder="Alergias, celebraciones, preferencias de mesa, etc."
        value={formData?.specialRequests}
        onChange={(e) => handleChange('specialRequests', e?.target?.value)}
        description="Opcional: Comparta cualquier necesidad especial"
      />
      {(errors?.date || errors?.time) && (
        <div className="bg-error/10 border border-error/20 rounded-lg p-4 flex items-start gap-3">
          <Icon name="AlertCircle" size={20} color="var(--color-error)" />
          <div className="flex-1">
            <p className="text-sm font-medium text-error">Información incompleta</p>
            <p className="text-xs text-error/80 mt-1">
              {errors?.date || errors?.time}
            </p>
          </div>
        </div>
      )}
      <div className="pt-4 border-t border-border">
        <Button
          type="submit"
          variant="default"
          size="lg"
          fullWidth
          loading={isSubmitting}
          iconName="Calendar"
          iconPosition="left"
          disabled={!selectedDate || !selectedTime}
        >
          {isSubmitting ? 'Procesando reserva...' : 'Confirmar Reserva'}
        </Button>
      </div>
    </form>
  );
};

export default ReservationForm;