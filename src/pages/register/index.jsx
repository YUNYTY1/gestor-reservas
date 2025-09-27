import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import RegistrationForm from './components/RegistrationForm';
import TrustSignals from './components/TrustSignals';
import EmailVerificationModal from './components/EmailVerificationModal';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const Register = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [registeredEmail, setRegisteredEmail] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResending, setIsResending] = useState(false);

  const handleRegistration = async (formData) => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock registration success
      console.log('Registration data:', formData);
      setRegisteredEmail(formData?.email);
      setShowVerificationModal(true);
      
    } catch (error) {
      console.error('Registration error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailVerification = async (verificationCode) => {
    setIsVerifying(true);
    
    try {
      // Simulate verification API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock verification success
      if (verificationCode === '123456') {
        setShowVerificationModal(false);
        // Auto-login and redirect to dashboard
        navigate('/table-reservation');
      } else {
        throw new Error('Código incorrecto');
      }
      
    } catch (error) {
      console.error('Verification error:', error);
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResendCode = async () => {
    setIsResending(true);
    
    try {
      // Simulate resend API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Code resent to:', registeredEmail);
      
    } catch (error) {
      console.error('Resend error:', error);
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header isAuthenticated={false} />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Left Column - Registration Form */}
            <div className="order-2 lg:order-1">
              <div className="max-w-md mx-auto lg:mx-0">
                {/* Header */}
                <div className="text-center lg:text-left mb-8">
                  <div className="flex items-center justify-center lg:justify-start space-x-3 mb-4">
                    <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
                      <Icon name="UserPlus" size={24} color="white" />
                    </div>
                    <div>
                      <h1 className="text-2xl font-bold text-foreground">
                        Crear Cuenta
                      </h1>
                      <p className="text-sm text-muted-foreground">
                        Únete a RestaurantBooking
                      </p>
                    </div>
                  </div>
                  
                  <p className="text-muted-foreground">
                    Crea tu cuenta para disfrutar de una experiencia gastronómica personalizada 
                    con reservas fáciles y recomendaciones adaptadas a tus gustos.
                  </p>
                </div>

                {/* Registration Form */}
                <RegistrationForm 
                  onSubmit={handleRegistration}
                  isLoading={isLoading}
                />

                {/* Legal Links */}
                <div className="mt-8 pt-6 border-t border-border">
                  <div className="flex flex-wrap items-center justify-center lg:justify-start space-x-4 text-xs text-muted-foreground">
                    <Button variant="link" className="text-xs p-0 h-auto">
                      Términos de Servicio
                    </Button>
                    <span>•</span>
                    <Button variant="link" className="text-xs p-0 h-auto">
                      Política de Privacidad
                    </Button>
                    <span>•</span>
                    <Button variant="link" className="text-xs p-0 h-auto">
                      Política de Cookies
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Trust Signals */}
            <div className="order-1 lg:order-2">
              <div className="sticky top-24">
                <TrustSignals />
              </div>
            </div>
          </div>
        </div>

        {/* Benefits Section */}
        <section className="bg-muted/30 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                ¿Por qué Registrarte?
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Descubre todas las ventajas de tener una cuenta en RestaurantBooking
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: 'Calendar',
                  title: 'Reservas Rápidas',
                  description: 'Reserva mesa en segundos con tu información guardada y historial de preferencias.'
                },
                {
                  icon: 'Heart',
                  title: 'Recomendaciones Personalizadas',
                  description: 'Recibe sugerencias de platos y restaurantes basadas en tus gustos y restricciones dietéticas.'
                },
                {
                  icon: 'Clock',
                  title: 'Historial Completo',
                  description: 'Accede a tu historial de reservas y pedidos para repetir tus experiencias favoritas.'
                },
                {
                  icon: 'Bell',
                  title: 'Notificaciones Inteligentes',
                  description: 'Recibe recordatorios de reservas y ofertas especiales adaptadas a ti.'
                },
                {
                  icon: 'Gift',
                  title: 'Ofertas Exclusivas',
                  description: 'Accede a promociones especiales y descuentos solo para miembros registrados.'
                },
                {
                  icon: 'Users',
                  title: 'Gestión de Grupos',
                  description: 'Organiza cenas con amigos y familiares de forma sencilla y coordinada.'
                }
              ]?.map((benefit, index) => (
                <div key={index} className="bg-card border border-border rounded-lg p-6 text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon name={benefit?.icon} size={24} className="text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {benefit?.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {benefit?.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      {/* Email Verification Modal */}
      <EmailVerificationModal
        isOpen={showVerificationModal}
        email={registeredEmail}
        onVerify={handleEmailVerification}
        onResend={handleResendCode}
        onClose={() => setShowVerificationModal(false)}
        isVerifying={isVerifying}
        isResending={isResending}
      />
    </div>
  );
};

export default Register;