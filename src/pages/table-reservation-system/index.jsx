import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import RoleBasedNavigation from '../../components/navigation/RoleBasedNavigation';
import CustomerFlowNavigation from '../../components/navigation/CustomerFlowNavigation';
import CalendarPicker from './components/CalendarPicker';
import TimeSlotSelector from './components/TimeSlotSelector';
import ReservationForm from './components/ReservationForm';
import ReservationSummary from './components/ReservationSummary';
import ConfirmationModal from './components/ConfirmationModal';
import Icon from '../../components/AppIcon';
import Image from '../../components/AppImage';

const TableReservationSystem = () => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [partySize, setPartySize] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [reservationData, setReservationData] = useState(null);

  const customerData = {
    name: 'Carlos Mendoza',
    email: 'carlos.mendoza@email.com',
    phone: '+51 987 654 321'
  };

  const availableDates = [
  '2025-11-28',
  '2025-11-29',
  '2025-11-30',
  '2025-12-01',
  '2025-12-02',
  '2025-12-03',
  '2025-12-04',
  '2025-12-05',
  '2025-12-06',
  '2025-12-07',
  '2025-12-08',
  '2025-12-09',
  '2025-12-10',
  '2025-12-11',
  '2025-12-12',
  '2025-12-13',
  '2025-12-14',
  '2025-12-15'];


  const getAvailableSlots = (date) => {
    if (!date) return [];

    return [
    { time: '12:00', available: true, capacity: 8 },
    { time: '12:30', available: true, capacity: 6 },
    { time: '13:00', available: true, capacity: 10 },
    { time: '13:30', available: false, capacity: 0 },
    { time: '14:00', available: true, capacity: 8 },
    { time: '14:30', available: true, capacity: 5 },
    { time: '19:00', available: true, capacity: 12 },
    { time: '19:30', available: true, capacity: 10 },
    { time: '20:00', available: false, capacity: 0 },
    { time: '20:30', available: true, capacity: 6 },
    { time: '21:00', available: true, capacity: 10 },
    { time: '21:30', available: true, capacity: 8 }];

  };

  const [availableSlots, setAvailableSlots] = useState([]);

  useEffect(() => {
    if (selectedDate) {
      setAvailableSlots(getAvailableSlots(selectedDate));
      setSelectedTime(null);
    }
  }, [selectedDate]);

  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
  };

  const handleReservationSubmit = (formData) => {
    setIsSubmitting(true);
    setPartySize(formData?.partySize);

    setTimeout(() => {
      setReservationData(formData);
      setIsSubmitting(false);
      setShowConfirmation(true);
    }, 2000);
  };

  const handleLogout = () => {
    navigate('/customer-registration');
  };

  const handleCloseConfirmation = () => {
    setShowConfirmation(false);
    setSelectedDate(null);
    setSelectedTime(null);
    setPartySize('');
  };

  return (
    <div className="min-h-screen bg-background">
      <RoleBasedNavigation userRole="customer" onLogout={handleLogout} />
      
      <div className="pt-16">
        <CustomerFlowNavigation currentStep={3} totalSteps={4} />
      </div>

      <div className="relative">
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1687648451534-d9155e6258e4"
            alt="Elegant restaurant dining room with warm ambient lighting, wooden furniture, white tablecloths, and sophisticated interior design creating welcoming atmosphere"
            className="w-full h-64 object-cover opacity-20" />

          <div className="absolute inset-0 bg-gradient-to-b from-background/50 to-background" />
        </div>

        <div className="relative px-4 py-12 lg:px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                <Icon name="Calendar" size={32} color="var(--color-primary)" />
              </div>
              <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-3">
                Sistema de Reservas
              </h1>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Reserve su mesa en Vikingo Grill y disfrute de la auténtica cocina peruana. 
                Seleccione fecha, horario y complete sus datos para confirmar.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 py-8 lg:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                    1
                  </div>
                  <h2 className="text-xl font-semibold text-foreground">Seleccione la Fecha</h2>
                </div>
                <CalendarPicker
                  selectedDate={selectedDate}
                  onDateSelect={handleDateSelect}
                  availableDates={availableDates} />

              </div>

              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                    2
                  </div>
                  <h2 className="text-xl font-semibold text-foreground">Seleccione el Horario</h2>
                </div>
                <TimeSlotSelector
                  selectedTime={selectedTime}
                  onTimeSelect={handleTimeSelect}
                  availableSlots={availableSlots}
                  selectedDate={selectedDate} />

              </div>

              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                    3
                  </div>
                  <h2 className="text-xl font-semibold text-foreground">Complete sus Datos</h2>
                </div>
                <ReservationForm
                  customerData={customerData}
                  selectedDate={selectedDate}
                  selectedTime={selectedTime}
                  onSubmit={handleReservationSubmit}
                  isSubmitting={isSubmitting} />

              </div>
            </div>

            <div className="lg:sticky lg:top-24 lg:self-start">
              <ReservationSummary
                selectedDate={selectedDate}
                selectedTime={selectedTime}
                partySize={partySize} />

            </div>
          </div>
        </div>
      </div>

      <div className="bg-muted/30 border-t border-border py-8 px-4 lg:px-6 mt-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Icon name="Clock" size={20} color="var(--color-primary)" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">Confirmación Instantánea</h3>
                <p className="text-sm text-muted-foreground">
                  Reciba confirmación inmediata por correo electrónico
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Icon name="Shield" size={20} color="var(--color-primary)" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">Reserva Segura</h3>
                <p className="text-sm text-muted-foreground">
                  Sistema protegido con encriptación de datos
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Icon name="Headphones" size={20} color="var(--color-primary)" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">Soporte 24/7</h3>
                <p className="text-sm text-muted-foreground">
                  Asistencia disponible para cualquier consulta
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ConfirmationModal
        isOpen={showConfirmation}
        onClose={handleCloseConfirmation}
        reservationData={reservationData} />

    </div>);

};

export default TableReservationSystem;