import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Image from '../../components/AppImage';
import Button from '../../components/ui/Button';
import RegistrationForm from './components/RegistrationForm';
import SuccessModal from './components/SuccessModal';
import PeruvianFeatures from './components/PeruvianFeatures';

const CustomerRegistration = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [registeredEmail, setRegisteredEmail] = useState('');

  const handleRegistration = async (formData) => {
    setIsLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 2000));

    const userData = {
      id: Date.now(),
      firstName: formData?.firstName,
      lastName: formData?.lastName,
      email: formData?.email,
      phone: formData?.phone,
      role: 'customer',
      notifications: formData?.notifications,
      registeredAt: new Date()?.toISOString(),
      verified: false
    };

    localStorage.setItem('restaurantUser', JSON.stringify(userData));
    setRegisteredEmail(formData?.email);
    setIsLoading(false);
    setShowSuccessModal(true);
  };

  const handleSuccessClose = () => {
    setShowSuccessModal(false);
    navigate('/admin-dashboard');
  };

  const handleLoginRedirect = () => {
    navigate('/admin-dashboard');
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="fixed top-0 left-0 right-0 z-40 bg-card border-b border-border shadow-warm">
        <div className="flex items-center justify-between h-16 px-4 lg:px-6 max-w-7xl mx-auto">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg">
              <img
                src="/logo.jpg"
                alt="Icono"
                className="w-6 h-6 object-contain"
              />
            </div>
            <span className="text-xl font-heading font-semibold text-foreground">
              Vikingo Grill
            </span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            iconName="LogIn"
            iconPosition="left"
            onClick={handleLoginRedirect}>

            Iniciar Sesión
          </Button>
        </div>
      </div>
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 py-8 lg:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary/10 rounded-full">
                  <Icon name="Sparkles" size={16} color="var(--color-primary)" />
                  <span className="text-sm font-semibold text-primary">
                    Nuevo Cliente
                  </span>
                </div>
                <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground">
                  Crea tu Cuenta en Vikingo Grill
                </h1>
                <p className="text-lg text-muted-foreground">
                  Regístrate para disfrutar de auténtica cocina peruana con reservas y pedidos en línea
                </p>
              </div>

              <div className="hidden lg:block">
                <PeruvianFeatures />
              </div>

              <div className="hidden lg:block">
                <div className="relative h-64 rounded-2xl overflow-hidden shadow-warm-lg">
                  <Image
                    src="https://images.unsplash.com/photo-1584747295311-5d129b60411e"
                    alt="Traditional Peruvian ceviche dish with fresh fish, red onions, and lime garnish served on white plate with colorful presentation"
                    className="w-full h-full object-cover" />

                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="text-white font-semibold text-lg">
                      Sabores Auténticos del Perú
                    </p>
                    <p className="text-white/90 text-sm">
                      Desde ceviche hasta lomo saltado
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-card border border-border rounded-2xl shadow-warm-lg p-6 md:p-8">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <h2 className="text-2xl font-heading font-bold text-foreground">
                      Información Personal
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      Completa el formulario para crear tu cuenta
                    </p>
                  </div>

                  <RegistrationForm
                    onSubmit={handleRegistration}
                    isLoading={isLoading} />


                  <div className="pt-4 border-t border-border">
                    <p className="text-sm text-center text-muted-foreground">
                      ¿Ya tienes una cuenta?{' '}
                      <button
                        onClick={handleLoginRedirect}
                        className="text-primary font-semibold hover:underline transition-quick">

                        Inicia sesión aquí
                      </button>
                    </p>
                  </div>
                </div>
              </div>

              <div className="lg:hidden">
                <PeruvianFeatures />
              </div>

              <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
                <button className="hover:text-foreground transition-quick">
                  Términos de Servicio
                </button>
                <span>•</span>
                <button className="hover:text-foreground transition-quick">
                  Política de Privacidad
                </button>
                <span>•</span>
                <button className="hover:text-foreground transition-quick">
                  Ayuda
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <SuccessModal
        isOpen={showSuccessModal}
        email={registeredEmail}
        onClose={handleSuccessClose} />

      <footer className="bg-card border-t border-border mt-12">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Icon name="MapPin" size={16} color="var(--color-muted-foreground)" />
              <span className="text-sm text-muted-foreground">
                Lima, Perú
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              © {new Date()?.getFullYear()} Vikingo Grill. Todos los derechos reservados.
            </p>
            <div className="flex items-center gap-4">
              <button className="text-muted-foreground hover:text-foreground transition-quick">
                <Icon name="Facebook" size={20} />
              </button>
              <button className="text-muted-foreground hover:text-foreground transition-quick">
                <Icon name="Instagram" size={20} />
              </button>
              <button className="text-muted-foreground hover:text-foreground transition-quick">
                <Icon name="Mail" size={20} />
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>);

};

export default CustomerRegistration;