import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Lock, UserCog, Users, Mail } from 'lucide-react';
import Button from 'components/ui/Button';
import Input from 'components/ui/Input';

const LoginScreen = () => {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const roles = [
    {
      id: 'admin',
      name: 'Administrador',
      icon: UserCog,
      description: 'Gestión completa del sistema',
      color: 'bg-red-600',
      hoverColor: 'hover:bg-red-700',
      route: '/admin-dashboard'
    },
    {
      id: 'waiter',
      name: 'Mesero',

      // Ícono original intacto
      icon: User,

      description: 'Gestión de mesas y pedidos',
      color: 'bg-orange-600',
      hoverColor: 'hover:bg-orange-700',
      route: '/waiter-dashboard'
    },
    {
      id: 'customer',
      name: 'Cliente',
      icon: Users,
      description: 'Reservas y pedidos en línea',
      color: 'bg-green-600',
      hoverColor: 'hover:bg-green-700',
      route: '/menu-and-food-ordering'
    }
  ];

  const validateForm = () => {
    const newErrors = {};

    if (!selectedRole) {
      newErrors.role = 'Por favor selecciona un rol';
    }

    if (!email?.trim()) {
      newErrors.email = 'El correo electrónico es requerido';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Correo electrónico inválido';
    }

    if (!password?.trim()) {
      newErrors.password = 'La contraseña es requerida';
    } else if (password?.length < 8) {
      newErrors.password = 'La contraseña debe tener al menos 8 caracteres';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleLogin = (e) => {
    e?.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    setTimeout(() => {
      const selectedRoleData = roles?.find(role => role?.id === selectedRole);

      sessionStorage.setItem('userRole', selectedRole);
      sessionStorage.setItem('userEmail', email);

      setIsLoading(false);
      navigate(selectedRoleData?.route);
    }, 1500);
  };

  const handleRoleSelect = (roleId) => {
    setSelectedRole(roleId);
    setErrors(prev => ({ ...prev, role: '' }));
  };

  return (
    <>
      {/* Fondo con imagen + overlay */}
      <div
        className="min-h-screen flex items-center justify-center p-4 relative"
        style={{
          backgroundImage: "url('/fondo-login.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Sombra para hacer el fondo más elegante */}
        <div className="absolute inset-0 bg-black/40"></div>

        <div className="w-full max-w-6xl relative z-10">

          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <img 
                src="/logo.jpg"
                alt="Logo"
                className="w-16 h-16 object-cover rounded-full"
              />
            </div>
            <h1 className="text-4xl font-bold text-white drop-shadow">
              Vikingo Grill
            </h1>
          </div>

          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
            <div className="grid md:grid-cols-2 gap-0">

              {/* Role Selection */}
              <div className="bg-gradient-to-br from-red-600 to-orange-600 p-8 md:p-12">
                <h2 className="text-3xl font-bold text-white mb-6">Selecciona tu Rol</h2>
                <p className="text-red-100 mb-8">Elige el tipo de acceso que necesitas para continuar</p>

                <div className="space-y-4">
                  {roles?.map((role) => {
                    const Icon = role?.icon;
                    const isSelected = selectedRole === role?.id;

                    return (
                      <button
                        key={role?.id}
                        onClick={() => handleRoleSelect(role?.id)}
                        className={`w-full p-6 rounded-xl transition-all duration-300 transform hover:scale-105 ${
                          isSelected
                            ? 'bg-white text-gray-800 shadow-2xl scale-105'
                            : 'bg-white/10 text-white hover:bg-white/20'
                        }`}
                      >
                        <div className="flex items-center space-x-4">
                          <div className={`p-3 rounded-lg ${isSelected ? role?.color : 'bg-white/20'}`}>
                            <Icon className="w-8 h-8" />
                          </div>

                          <div className="flex-1 text-left">
                            <h3 className="text-xl font-bold mb-1">{role?.name}</h3>
                            <p className={`text-sm ${isSelected ? 'text-gray-600' : 'text-red-100'}`}>
                              {role?.description}
                            </p>
                          </div>

                          {isSelected && (
                            <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            </div>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>

                {errors?.role && (
                  <p className="mt-4 text-yellow-200 text-sm flex items-center">
                    <span className="mr-2">⚠️</span> {errors?.role}
                  </p>
                )}
              </div>

              {/* Login Form */}
              <div className="p-8 md:p-12">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">Iniciar Sesión</h2>
                <p className="text-gray-600 mb-8">Ingresa tus credenciales para acceder</p>

                <form onSubmit={handleLogin} className="space-y-6">

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Correo Electrónico</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail className="h-5 w-5 text-gray-400" />
                      </div>
                      <Input
                        type="email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          setErrors(prev => ({ ...prev, email: '' }));
                        }}
                        className={`pl-10 ${errors?.email ? 'border-red-500' : ''}`}
                        placeholder="tu@email.com"
                      />
                    </div>
                    {errors?.email && (
                      <p className="mt-1 text-sm text-red-600">{errors?.email}</p>
                    )}
                  </div>

                  {/* Password */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Contraseña</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock className="h-5 w-5 text-gray-400" />
                      </div>
                      <Input
                        type="password"
                        value={password}
                        onChange={(e) => {
                          setPassword(e.target.value);
                          setErrors(prev => ({ ...prev, password: '' }));
                        }}
                        className={`pl-10 ${errors?.password ? 'border-red-500' : ''}`}
                        placeholder="••••••••"
                      />
                    </div>
                    {errors?.password && (
                      <p className="mt-1 text-sm text-red-600">{errors?.password}</p>
                    )}
                  </div>

                  {/* Remember & Forgot */}
                  <div className="flex items-center justify-between">
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded border-gray-300 text-red-600 focus:ring-red-500" />
                      <span className="ml-2 text-sm text-gray-600">Recordarme</span>
                    </label>
                    <button type="button" className="text-sm text-red-600 hover:text-red-700 font-medium">
                      ¿Olvidaste tu contraseña?
                    </button>
                  </div>

                  {/* Login Button */}
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className={`w-full py-3 text-lg font-semibold ${
                      selectedRole
                        ? roles?.find(r => r.id === selectedRole)?.color
                        : 'bg-gray-400'
                    } text-white rounded-lg hover:opacity-90 transition-all duration-300 flex items-center justify-center`}
                  >
                    {isLoading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Iniciando sesión...
                      </>
                    ) : (
                      <>
                        <User className="mr-2 h-5 w-5" />
                        Iniciar Sesión
                        {selectedRole && ` como ${roles?.find(r => r.id === selectedRole)?.name}`}
                      </>
                    )}
                  </Button>

                  {/* Register */}
                  <div className="text-center pt-4 border-t border-gray-200">
                    <p className="text-sm text-gray-600">
                      ¿No tienes una cuenta?{' '}
                      <button
                        type="button"
                        onClick={() => navigate('/customer-registration')}
                        className="text-red-600 hover:text-red-700 font-semibold"
                      >
                        Regístrate aquí
                      </button>
                    </p>
                  </div>
                </form>
              </div>

            </div>
          </div>

          {/* Footer */}
          <div className="text-center mt-8 text-gray-300">
            <p className="text-sm">© 2025 Vikingo Grill</p>
          </div>

        </div>
      </div>
    </>
  );
};

export default LoginScreen;
