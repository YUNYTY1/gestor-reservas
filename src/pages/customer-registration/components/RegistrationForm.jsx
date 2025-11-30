import { useState } from 'react';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const RegistrationForm = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    notifications: false,
    termsAccepted: false
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.firstName?.trim()) {
      newErrors.firstName = 'El nombre es obligatorio';
    }

    if (!formData?.lastName?.trim()) {
      newErrors.lastName = 'El apellido es obligatorio';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData?.email?.trim()) {
      newErrors.email = 'El correo electrónico es obligatorio';
    } else if (!emailRegex?.test(formData?.email)) {
      newErrors.email = 'Formato de correo electrónico inválido';
    }

    const phoneRegex = /^[0-9]{9}$/;
    if (!formData?.phone?.trim()) {
      newErrors.phone = 'El teléfono es obligatorio';
    } else if (!phoneRegex?.test(formData?.phone?.replace(/\s/g, ''))) {
      newErrors.phone = 'El teléfono debe tener 9 dígitos';
    }

    if (!formData?.password) {
      newErrors.password = 'La contraseña es obligatoria';
    } else if (formData?.password?.length < 8) {
      newErrors.password = 'La contraseña debe tener al menos 8 caracteres';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/?.test(formData?.password)) {
      newErrors.password = 'Debe incluir mayúsculas, minúsculas y números';
    }

    if (!formData?.confirmPassword) {
      newErrors.confirmPassword = 'Confirme su contraseña';
    } else if (formData?.password !== formData?.confirmPassword) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden';
    }

    if (!formData?.termsAccepted) {
      newErrors.termsAccepted = 'Debe aceptar los términos y condiciones';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e?.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    if (errors?.[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Nombre"
          type="text"
          name="firstName"
          placeholder="Ingrese su nombre"
          value={formData?.firstName}
          onChange={handleChange}
          error={errors?.firstName}
          required
          disabled={isLoading}
        />
        <Input
          label="Apellido"
          type="text"
          name="lastName"
          placeholder="Ingrese su apellido"
          value={formData?.lastName}
          onChange={handleChange}
          error={errors?.lastName}
          required
          disabled={isLoading}
        />
      </div>
      <Input
        label="Correo Electrónico"
        type="email"
        name="email"
        placeholder="ejemplo@correo.com"
        value={formData?.email}
        onChange={handleChange}
        error={errors?.email}
        description="Usaremos este correo para confirmaciones de reservas"
        required
        disabled={isLoading}
      />
      <Input
        label="Teléfono"
        type="tel"
        name="phone"
        placeholder="999 999 999"
        value={formData?.phone}
        onChange={handleChange}
        error={errors?.phone}
        description="Formato: 9 dígitos sin espacios"
        required
        disabled={isLoading}
      />
      <div className="relative">
        <Input
          label="Contraseña"
          type={showPassword ? 'text' : 'password'}
          name="password"
          placeholder="Mínimo 8 caracteres"
          value={formData?.password}
          onChange={handleChange}
          error={errors?.password}
          description="Debe incluir mayúsculas, minúsculas y números"
          required
          disabled={isLoading}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-9 text-muted-foreground hover:text-foreground transition-quick"
          aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
        >
          <Icon name={showPassword ? 'EyeOff' : 'Eye'} size={20} />
        </button>
      </div>
      <div className="relative">
        <Input
          label="Confirmar Contraseña"
          type={showConfirmPassword ? 'text' : 'password'}
          name="confirmPassword"
          placeholder="Repita su contraseña"
          value={formData?.confirmPassword}
          onChange={handleChange}
          error={errors?.confirmPassword}
          required
          disabled={isLoading}
        />
        <button
          type="button"
          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          className="absolute right-3 top-9 text-muted-foreground hover:text-foreground transition-quick"
          aria-label={showConfirmPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
        >
          <Icon name={showConfirmPassword ? 'EyeOff' : 'Eye'} size={20} />
        </button>
      </div>
      <div className="space-y-4 pt-2">
        <Checkbox
          label="Deseo recibir notificaciones sobre promociones de cocina peruana"
          name="notifications"
          checked={formData?.notifications}
          onChange={handleChange}
          disabled={isLoading}
        />

        <Checkbox
          label="Acepto los términos y condiciones y la política de privacidad"
          name="termsAccepted"
          checked={formData?.termsAccepted}
          onChange={handleChange}
          error={errors?.termsAccepted}
          required
          disabled={isLoading}
        />
      </div>
      <Button
        type="submit"
        variant="default"
        size="lg"
        fullWidth
        loading={isLoading}
        iconName="UserPlus"
        iconPosition="left"
      >
        Crear Cuenta
      </Button>
    </form>
  );
};

export default RegistrationForm;