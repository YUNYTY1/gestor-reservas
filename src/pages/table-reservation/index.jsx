import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import CalendarWidget from './components/CalendarWidget';
import TimeSlotSelector from './components/TimeSlotSelector';
import GuestCountSelector from './components/GuestCountSelector';
import SpecialRequestsForm from './components/SpecialRequestsForm';
import TablePreferenceSelector from './components/TablePreferenceSelector';
import BookingSummary from './components/BookingSummary';
import ContactInfoForm from './components/ContactInfoForm';

const TableReservation = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // Reservation state
  const [reservationData, setReservationData] = useState({
    selectedDate: null,
    selectedTime: '',
    partySize: 2,
    specialAccommodations: [],
    dietaryRestrictions: [],
    celebrationDetails: { type: '', details: '' },
    specialRequests: '',
    tablePreference: '',
    contactInfo: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      smsNotifications: false,
      emailNotifications: true,
      emergencyContact: ''
    }
  });

  // Mock data for availability
  const [availabilityData] = useState({
    '2025-01-27': 'available',
    '2025-01-28': 'limited',
    '2025-01-29': 'available',
    '2025-01-30': 'full',
    '2025-01-31': 'available',
    '2025-02-01': 'limited',
    '2025-02-02': 'available'
  });

  const [availableSlots] = useState([
    { time: '12:00', availableTables: 5 },
    { time: '12:30', availableTables: 3 },
    { time: '13:00', availableTables: 4 },
    { time: '13:30', availableTables: 2 },
    { time: '14:00', availableTables: 6 },
    { time: '14:30', availableTables: 1 },
    { time: '15:00', availableTables: 3 },
    { time: '19:00', availableTables: 4 },
    { time: '19:30', availableTables: 2 },
    { time: '20:00', availableTables: 5 },
    { time: '20:30', availableTables: 1 },
    { time: '21:00', availableTables: 3 },
    { time: '21:30', availableTables: 2 },
    { time: '22:00', availableTables: 4 }
  ]);

  const [availablePreferences] = useState({
    interior: 'available',
    exterior: 'limited',
    window: 'available',
    bar: 'available',
    private: 'limited',
    family: 'available'
  });

  const steps = [
    { id: 1, title: 'Fecha y Hora', icon: 'Calendar' },
    { id: 2, title: 'Detalles', icon: 'Users' },
    { id: 3, title: 'Preferencias', icon: 'Settings' },
    { id: 4, title: 'Resumen', icon: 'FileText' },
    { id: 5, title: 'Contacto', icon: 'User' }
  ];

  // Update reservation data
  const updateReservationData = (field, value) => {
    setReservationData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Step validation
  const validateStep = (step) => {
    const newErrors = {};
    
    switch (step) {
      case 1:
        if (!reservationData?.selectedDate) {
          newErrors.date = 'Selecciona una fecha';
        }
        if (!reservationData?.selectedTime) {
          newErrors.time = 'Selecciona un horario';
        }
        break;
      case 2:
        if (reservationData?.partySize < 1) {
          newErrors.partySize = 'Selecciona el número de comensales';
        }
        break;
      case 5:
        if (!reservationData?.contactInfo?.firstName) {
          newErrors.firstName = 'El nombre es requerido';
        }
        if (!reservationData?.contactInfo?.email) {
          newErrors.email = 'El email es requerido';
        }
        if (!reservationData?.contactInfo?.phone) {
          newErrors.phone = 'El teléfono es requerido';
        }
        break;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  // Navigation functions
  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 5));
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const goToStep = (step) => {
    if (step <= currentStep || validateStep(currentStep)) {
      setCurrentStep(step);
    }
  };

  // Final submission
  const handleConfirmReservation = async () => {
    if (!validateStep(5)) return;
    
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock successful reservation
      const reservationId = 'RES-' + Math.random()?.toString(36)?.substr(2, 9)?.toUpperCase();
      
      // Navigate to confirmation page (would be implemented)
      alert(`¡Reserva confirmada! ID: ${reservationId}\n\nDetalles:\n• Fecha: ${reservationData?.selectedDate?.toLocaleDateString('es-ES')}\n• Hora: ${reservationData?.selectedTime}\n• Personas: ${reservationData?.partySize}\n• Contacto: ${reservationData?.contactInfo?.email}`);
      
      // Reset form and navigate
      setReservationData({
        selectedDate: null,
        selectedTime: '',
        partySize: 2,
        specialAccommodations: [],
        dietaryRestrictions: [],
        celebrationDetails: { type: '', details: '' },
        specialRequests: '',
        tablePreference: '',
        contactInfo: {
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          smsNotifications: false,
          emailNotifications: true,
          emergencyContact: ''
        }
      });
      
      navigate('/order-tracking');
      
    } catch (error) {
      console.error('Error confirming reservation:', error);
      alert('Error al confirmar la reserva. Por favor, inténtalo de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };

  // Auto-save to localStorage
  useEffect(() => {
    const savedData = localStorage.getItem('reservationData');
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        if (parsed?.selectedDate) {
          parsed.selectedDate = new Date(parsed.selectedDate);
        }
        setReservationData(parsed);
      } catch (error) {
        console.error('Error loading saved reservation data:', error);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('reservationData', JSON.stringify(reservationData));
  }, [reservationData]);

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <CalendarWidget
              selectedDate={reservationData?.selectedDate}
              onDateSelect={(date) => updateReservationData('selectedDate', date)}
              availabilityData={availabilityData}
            />
            {reservationData?.selectedDate && (
              <TimeSlotSelector
                selectedTime={reservationData?.selectedTime}
                onTimeSelect={(time) => updateReservationData('selectedTime', time)}
                availableSlots={availableSlots}
                partySize={reservationData?.partySize}
              />
            )}
          </div>
        );
        
      case 2:
        return (
          <GuestCountSelector
            partySize={reservationData?.partySize}
            onPartySizeChange={(size) => updateReservationData('partySize', size)}
            specialAccommodations={reservationData?.specialAccommodations}
            onAccommodationsChange={(accommodations) => updateReservationData('specialAccommodations', accommodations)}
          />
        );
        
      case 3:
        return (
          <div className="space-y-6">
            <TablePreferenceSelector
              selectedPreference={reservationData?.tablePreference}
              onPreferenceSelect={(preference) => updateReservationData('tablePreference', preference)}
              availablePreferences={availablePreferences}
            />
            <SpecialRequestsForm
              specialRequests={reservationData?.specialRequests}
              onSpecialRequestsChange={(requests) => updateReservationData('specialRequests', requests)}
              dietaryRestrictions={reservationData?.dietaryRestrictions}
              onDietaryRestrictionsChange={(restrictions) => updateReservationData('dietaryRestrictions', restrictions)}
              celebrationDetails={reservationData?.celebrationDetails}
              onCelebrationDetailsChange={(details) => updateReservationData('celebrationDetails', details)}
            />
          </div>
        );
        
      case 4:
        return (
          <BookingSummary
            reservationDetails={reservationData}
            onConfirm={nextStep}
            onEdit={() => setCurrentStep(1)}
            isLoading={isLoading}
          />
        );
        
      case 5:
        return (
          <ContactInfoForm
            contactInfo={reservationData?.contactInfo}
            onContactInfoChange={(info) => updateReservationData('contactInfo', info)}
            errors={errors}
            onSubmit={handleConfirmReservation}
            isLoading={isLoading}
          />
        );
        
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header isAuthenticated={true} userRole="customer" />
      <div className="pt-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-2">
              <button onClick={() => navigate('/')} className="hover:text-foreground transition-smooth">
                Inicio
              </button>
              <Icon name="ChevronRight" size={16} />
              <span>Reservar Mesa</span>
            </div>
            
            <h1 className="text-3xl font-bold text-foreground mb-2">Reservar Mesa</h1>
            <p className="text-muted-foreground">
              Reserva tu mesa en unos simples pasos y disfruta de una experiencia gastronómica excepcional.
            </p>
          </div>

          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-between relative">
              {/* Progress Line */}
              <div className="absolute top-4 left-4 right-4 h-0.5 bg-border">
                <div 
                  className="h-full bg-primary transition-smooth duration-500"
                  style={{ width: `${((currentStep - 1) / (steps?.length - 1)) * 100}%` }}
                ></div>
              </div>
              
              {/* Steps */}
              {steps?.map((step, index) => (
                <button
                  key={step?.id}
                  onClick={() => goToStep(step?.id)}
                  className={`relative z-10 flex flex-col items-center space-y-2 ${
                    step?.id <= currentStep ? 'cursor-pointer' : 'cursor-not-allowed'
                  }`}
                  disabled={step?.id > currentStep}
                >
                  <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center bg-background transition-smooth ${
                    step?.id < currentStep 
                      ? 'border-success bg-success text-success-foreground' 
                      : step?.id === currentStep 
                        ? 'border-primary bg-primary text-primary-foreground animate-pulse' 
                        : 'border-border text-muted-foreground'
                  }`}>
                    <Icon 
                      name={step?.id < currentStep ? 'Check' : step?.icon} 
                      size={16} 
                    />
                  </div>
                  <span className={`text-xs font-medium hidden sm:block ${
                    step?.id <= currentStep ? 'text-foreground' : 'text-muted-foreground'
                  }`}>
                    {step?.title}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Form Content */}
            <div className="lg:col-span-2">
              <div className="bg-card border border-border rounded-lg p-6">
                <div className="mb-6">
                  <h2 className="text-xl font-semibold text-foreground mb-2">
                    Paso {currentStep}: {steps?.[currentStep - 1]?.title}
                  </h2>
                  <div className="w-full bg-border rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full transition-smooth duration-300"
                      style={{ width: `${(currentStep / steps?.length) * 100}%` }}
                    ></div>
                  </div>
                </div>

                {renderStepContent()}

                {/* Navigation Buttons */}
                {currentStep !== 4 && currentStep !== 5 && (
                  <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
                    <Button
                      variant="outline"
                      onClick={prevStep}
                      disabled={currentStep === 1}
                      iconName="ChevronLeft"
                      iconPosition="left"
                    >
                      Anterior
                    </Button>
                    
                    <Button
                      variant="default"
                      onClick={nextStep}
                      iconName="ChevronRight"
                      iconPosition="right"
                    >
                      {currentStep === steps?.length ? 'Finalizar' : 'Siguiente'}
                    </Button>
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Summary */}
              <div className="bg-card border border-border rounded-lg p-4">
                <h3 className="font-semibold text-foreground mb-4">Resumen Rápido</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Fecha:</span>
                    <span className="font-medium text-foreground">
                      {reservationData?.selectedDate 
                        ? reservationData?.selectedDate?.toLocaleDateString('es-ES', { 
                            day: 'numeric', 
                            month: 'short' 
                          })
                        : 'No seleccionada'
                      }
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Hora:</span>
                    <span className="font-medium text-foreground">
                      {reservationData?.selectedTime || 'No seleccionada'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Personas:</span>
                    <span className="font-medium text-foreground">
                      {reservationData?.partySize}
                    </span>
                  </div>
                </div>
              </div>

              {/* Help & Support */}
              <div className="bg-card border border-border rounded-lg p-4">
                <h3 className="font-semibold text-foreground mb-3">¿Necesitas Ayuda?</h3>
                <div className="space-y-3">
                  <Button
                    variant="outline"
                    size="sm"
                    fullWidth
                    iconName="Phone"
                    iconPosition="left"
                  >
                    Llamar: (555) 123-4567
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    fullWidth
                    iconName="MessageCircle"
                    iconPosition="left"
                  >
                    Chat en Vivo
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    fullWidth
                    iconName="Mail"
                    iconPosition="left"
                  >
                    Email: reservas@restaurante.com
                  </Button>
                </div>
              </div>

              {/* Restaurant Info */}
              <div className="bg-card border border-border rounded-lg p-4">
                <h3 className="font-semibold text-foreground mb-3">Información del Restaurante</h3>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>📍 Calle Principal 123, Madrid</p>
                  <p>🕒 Lun-Dom: 12:00 - 23:00</p>
                  <p>⭐ 4.8/5 (2,847 reseñas)</p>
                  <p>🍽️ Cocina Mediterránea</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableReservation;