import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';
import Select from '../../../components/ui/Select';
import Icon from '../../../components/AppIcon';

const RegistrationForm = ({ onSubmit, isLoading = false }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombre: '',
    apellidos: '',
    email: '',
    telefono: '',
    contraseña: '',
    confirmarContraseña: '',
    preferenciasDieteticas: '',
    tipoComidaFavorita: '',
    aceptarTerminos: false,
    recibirNotificaciones: true
  });

  const [errors, setErrors] = useState({});
  const [passwordStrength, setPasswordStrength] = useState(0);

  const dietaryOptions = [
    { value: '', label: 'Seleccionar preferencia' },
    { value: 'ninguna', label: 'Sin restricciones' },
    { value: 'vegetariano', label: 'Vegetariano' },
    { value: 'vegano', label: 'Vegano' },
    { value: 'sin_gluten', label: 'Sin gluten' },
    { value: 'sin_lactosa', label: 'Sin lactosa' },
    { value: 'kosher', label: 'Kosher' },
    { value: 'halal', label: 'Halal' }
  ];

  const cuisineOptions = [
    { value: '', label: 'Seleccionar tipo de comida' },
    { value: 'mediterranea', label: 'Mediterránea' },
    { value: 'italiana', label: 'Italiana' },
    { value: 'asiatica', label: 'Asiática' },
    { value: 'mexicana', label: 'Mexicana' },
    { value: 'francesa', label: 'Francesa' },
    { value: 'americana', label: 'Americana' },
    { value: 'fusion', label: 'Fusión' }
  ];

  const validatePassword = (password) => {
    let strength = 0;
    if (password?.length >= 8) strength++;
    if (/[A-Z]/?.test(password)) strength++;
    if (/[a-z]/?.test(password)) strength++;
    if (/[0-9]/?.test(password)) strength++;
    if (/[^A-Za-z0-9]/?.test(password)) strength++;
    return strength;
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex?.test(email);
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^[+]?[\d\s\-\(\)]{9,15}$/;
    return phoneRegex?.test(phone);
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (errors?.[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }

    // Real-time password strength validation
    if (field === 'contraseña') {
      setPasswordStrength(validatePassword(value));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.nombre?.trim()) {
      newErrors.nombre = 'El nombre es obligatorio';
    }

    if (!formData?.apellidos?.trim()) {
      newErrors.apellidos = 'Los apellidos son obligatorios';
    }

    if (!formData?.email?.trim()) {
      newErrors.email = 'El email es obligatorio';
    } else if (!validateEmail(formData?.email)) {
      newErrors.email = 'Por favor, introduce un email válido';
    }

    if (!formData?.telefono?.trim()) {
      newErrors.telefono = 'El teléfono es obligatorio';
    } else if (!validatePhone(formData?.telefono)) {
      newErrors.telefono = 'Por favor, introduce un teléfono válido';
    }

    if (!formData?.contraseña) {
      newErrors.contraseña = 'La contraseña es obligatoria';
    } else if (formData?.contraseña?.length < 8) {
      newErrors.contraseña = 'La contraseña debe tener al menos 8 caracteres';
    }

    if (!formData?.confirmarContraseña) {
      newErrors.confirmarContraseña = 'Confirma tu contraseña';
    } else if (formData?.contraseña !== formData?.confirmarContraseña) {
      newErrors.confirmarContraseña = 'Las contraseñas no coinciden';
    }

    if (!formData?.aceptarTerminos) {
      newErrors.aceptarTerminos = 'Debes aceptar los términos y condiciones';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const getPasswordStrengthText = () => {
    switch (passwordStrength) {
      case 0:
      case 1:
        return 'Muy débil';
      case 2:
        return 'Débil';
      case 3:
        return 'Media';
      case 4:
        return 'Fuerte';
      case 5:
        return 'Muy fuerte';
      default:
        return '';
    }
  };

  const getPasswordStrengthColor = () => {
    switch (passwordStrength) {
      case 0:
      case 1:
        return 'bg-error';
      case 2:
        return 'bg-warning';
      case 3:
        return 'bg-accent';
      case 4:
      case 5:
        return 'bg-success';
      default:
        return 'bg-muted';
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Información Personal */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground flex items-center space-x-2">
          <Icon name="User" size={20} />
          <span>Información Personal</span>
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Nombre"
            type="text"
            placeholder="Tu nombre"
            value={formData?.nombre}
            onChange={(e) => handleInputChange('nombre', e?.target?.value)}
            error={errors?.nombre}
            required
          />
          
          <Input
            label="Apellidos"
            type="text"
            placeholder="Tus apellidos"
            value={formData?.apellidos}
            onChange={(e) => handleInputChange('apellidos', e?.target?.value)}
            error={errors?.apellidos}
            required
          />
        </div>

        <Input
          label="Email"
          type="email"
          placeholder="tu@email.com"
          value={formData?.email}
          onChange={(e) => handleInputChange('email', e?.target?.value)}
          error={errors?.email}
          required
        />

        <Input
          label="Teléfono"
          type="tel"
          placeholder="+34 600 000 000"
          value={formData?.telefono}
          onChange={(e) => handleInputChange('telefono', e?.target?.value)}
          error={errors?.telefono}
          required
        />
      </div>
      {/* Contraseña */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground flex items-center space-x-2">
          <Icon name="Lock" size={20} />
          <span>Seguridad</span>
        </h3>

        <div className="space-y-2">
          <Input
            label="Contraseña"
            type="password"
            placeholder="Mínimo 8 caracteres"
            value={formData?.contraseña}
            onChange={(e) => handleInputChange('contraseña', e?.target?.value)}
            error={errors?.contraseña}
            required
          />
          
          {formData?.contraseña && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Fortaleza:</span>
                <span className={`font-medium ${
                  passwordStrength <= 2 ? 'text-error' : 
                  passwordStrength === 3 ? 'text-warning' : 'text-success'
                }`}>
                  {getPasswordStrengthText()}
                </span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-smooth ${getPasswordStrengthColor()}`}
                  style={{ width: `${(passwordStrength / 5) * 100}%` }}
                ></div>
              </div>
            </div>
          )}
        </div>

        <Input
          label="Confirmar Contraseña"
          type="password"
          placeholder="Repite tu contraseña"
          value={formData?.confirmarContraseña}
          onChange={(e) => handleInputChange('confirmarContraseña', e?.target?.value)}
          error={errors?.confirmarContraseña}
          required
        />
      </div>
      {/* Preferencias Opcionales */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground flex items-center space-x-2">
          <Icon name="UtensilsCrossed" size={20} />
          <span>Preferencias Culinarias (Opcional)</span>
        </h3>

        <Select
          label="Preferencias Dietéticas"
          description="Nos ayuda a recomendarte platos adecuados"
          options={dietaryOptions}
          value={formData?.preferenciasDieteticas}
          onChange={(value) => handleInputChange('preferenciasDieteticas', value)}
        />

        <Select
          label="Tipo de Comida Favorita"
          description="Para personalizar nuestras recomendaciones"
          options={cuisineOptions}
          value={formData?.tipoComidaFavorita}
          onChange={(value) => handleInputChange('tipoComidaFavorita', value)}
        />
      </div>
      {/* Términos y Notificaciones */}
      <div className="space-y-4">
        <div className="space-y-3">
          <Checkbox
            label="Acepto los términos y condiciones y la política de privacidad"
            checked={formData?.aceptarTerminos}
            onChange={(e) => handleInputChange('aceptarTerminos', e?.target?.checked)}
            error={errors?.aceptarTerminos}
            required
          />

          <Checkbox
            label="Quiero recibir notificaciones sobre ofertas especiales y eventos"
            description="Puedes cambiar esta preferencia en cualquier momento"
            checked={formData?.recibirNotificaciones}
            onChange={(e) => handleInputChange('recibirNotificaciones', e?.target?.checked)}
          />
        </div>
      </div>
      {/* Botones de Acción */}
      <div className="space-y-4">
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

        <div className="text-center">
          <span className="text-sm text-muted-foreground">
            ¿Ya tienes cuenta?{' '}
          </span>
          <Button
            variant="link"
            onClick={() => navigate('/login')}
            className="text-sm p-0 h-auto"
          >
            Iniciar Sesión
          </Button>
        </div>
      </div>
    </form>
  );
};

export default RegistrationForm;