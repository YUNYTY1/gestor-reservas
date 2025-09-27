import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Image from '../../components/AppImage';
import LoginForm from './components/LoginForm';
import SocialLogin from './components/SocialLogin';
import TrustSignals from './components/TrustSignals';
import RegistrationPrompt from './components/RegistrationPrompt';

const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (formData, user) => {
    setIsLoading(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Store user data in localStorage (in real app, use proper auth state management)
      localStorage.setItem('user', JSON.stringify({
        email: user?.email,
        role: user?.role,
        isAuthenticated: true,
        loginTime: new Date()?.toISOString()
      }));
      
      // Redirect based on user role
      if (user?.role === 'admin') {
        navigate('/admin-dashboard');
      } else {
        navigate('/table-reservation');
      }
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = async (provider) => {
    setIsLoading(true);
    
    try {
      // Simulate social login
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock successful social login
      const mockSocialUser = {
        email: `usuario.${provider}@restaurante.com`,
        role: 'customer',
        provider: provider
      };
      
      localStorage.setItem('user', JSON.stringify({
        email: mockSocialUser?.email,
        role: mockSocialUser?.role,
        provider: provider,
        isAuthenticated: true,
        loginTime: new Date()?.toISOString()
      }));
      
      navigate('/table-reservation');
    } catch (error) {
      console.error('Social login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Iniciar Sesión - RestaurantBooking</title>
        <meta name="description" content="Accede a tu cuenta de RestaurantBooking para gestionar reservas y pedidos de forma rápida y segura." />
        <meta name="keywords" content="login, iniciar sesión, restaurante, reservas, pedidos" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '60px 60px'
          }}></div>
        </div>

        <div className="relative z-10 flex min-h-screen">
          {/* Left Side - Hero Image & Branding */}
          <div className="hidden lg:flex lg:w-1/2 xl:w-3/5 relative overflow-hidden">
            <div className="absolute inset-0">
              <Image
                src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=1200&fit=crop"
                alt="Ambiente acogedor del restaurante con mesas elegantes"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent"></div>
            </div>
            
            <div className="relative z-10 flex flex-col justify-center px-12 xl:px-16 text-white">
              <div className="max-w-md">
                <h1 className="text-4xl xl:text-5xl font-bold mb-6 leading-tight">
                  Bienvenido a RestaurantBooking
                </h1>
                <p className="text-lg xl:text-xl mb-8 text-white/90 leading-relaxed">
                  La forma más fácil de reservar tu mesa favorita y disfrutar de una experiencia gastronómica excepcional.
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-bold">✓</span>
                    </div>
                    <span className="text-white/90">Reservas instantáneas 24/7</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-bold">✓</span>
                    </div>
                    <span className="text-white/90">Pedidos online con seguimiento</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-bold">✓</span>
                    </div>
                    <span className="text-white/90">Ofertas exclusivas para miembros</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Login Form */}
          <div className="flex-1 lg:w-1/2 xl:w-2/5 flex items-center justify-center p-6 lg:p-12">
            <div className="w-full max-w-md space-y-8">
              {/* Logo & Header */}
              <div className="text-center">
                <div className="inline-flex items-center space-x-2 mb-6">
                  <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-lg">R</span>
                  </div>
                  <span className="text-2xl font-bold text-foreground">RestaurantBooking</span>
                </div>
                <h2 className="text-3xl font-bold text-foreground mb-2">
                  Iniciar Sesión
                </h2>
                <p className="text-muted-foreground">
                  Accede a tu cuenta para gestionar reservas y pedidos
                </p>
              </div>

              {/* Login Form */}
              <div className="bg-card border border-border rounded-xl shadow-soft p-6 lg:p-8">
                <LoginForm onSubmit={handleLogin} isLoading={isLoading} />
                
                <div className="mt-6">
                  <SocialLogin onSocialLogin={handleSocialLogin} isLoading={isLoading} />
                </div>
              </div>

              {/* Registration Prompt */}
              <div className="bg-card border border-border rounded-xl shadow-soft p-6">
                <RegistrationPrompt />
              </div>

              {/* Mobile Trust Signals */}
              <div className="lg:hidden bg-card border border-border rounded-xl shadow-soft p-6">
                <TrustSignals />
              </div>
            </div>
          </div>
        </div>

        {/* Desktop Trust Signals - Fixed Position */}
        <div className="hidden lg:block fixed bottom-6 left-6 w-80 bg-card border border-border rounded-xl shadow-elevated p-6 z-20">
          <TrustSignals />
        </div>
      </div>
    </>
  );
};

export default LoginPage;