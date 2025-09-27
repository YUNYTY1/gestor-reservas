import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import RoleBasedNavigation from '../../components/ui/RoleBasedNavigation';
import MetricsCard from './components/MetricsCard';
import ReservationTimeline from './components/ReservationTimeline';
import OrderManagementPanel from './components/OrderManagementPanel';
import QuickActions from './components/QuickActions';
import NotificationCenter from './components/NotificationCenter';
import TableStatusGrid from './components/TableStatusGrid';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [currentView, setCurrentView] = useState('overview');
  const [isAuthenticated] = useState(true);
  const [userRole] = useState('admin');

  // Mock data for dashboard metrics
  const [metrics] = useState([
    {
      title: "Reservas Hoy",
      value: "47",
      change: "+12%",
      changeType: "positive",
      icon: "Calendar",
      color: "primary"
    },
    {
      title: "Ingresos Hoy",
      value: "€2,847",
      change: "+8.2%",
      changeType: "positive",
      icon: "Euro",
      color: "success"
    },
    {
      title: "Rotación Mesa",
      value: "2.4x",
      change: "+0.3",
      changeType: "positive",
      icon: "RotateCcw",
      color: "warning"
    },
    {
      title: "Satisfacción",
      value: "4.8/5",
      change: "+0.1",
      changeType: "positive",
      icon: "Star",
      color: "accent"
    }
  ]);

  // Mock reservations data
  const [reservations, setReservations] = useState([
    {
      id: "R001",
      customerName: "María García",
      phone: "+34 600 123 456",
      time: new Date(2025, 8, 26, 13, 30),
      partySize: 4,
      tableNumber: 5,
      status: "confirmed",
      specialRequests: "Mesa junto a la ventana"
    },
    {
      id: "R002",
      customerName: "Carlos Rodríguez",
      phone: "+34 600 234 567",
      time: new Date(2025, 8, 26, 14, 0),
      partySize: 2,
      tableNumber: 8,
      status: "pending",
      specialRequests: null
    },
    {
      id: "R003",
      customerName: "Ana Martínez",
      phone: "+34 600 345 678",
      time: new Date(2025, 8, 26, 20, 30),
      partySize: 6,
      tableNumber: 12,
      status: "seated",
      specialRequests: "Cumpleaños - necesita tarta"
    },
    {
      id: "R004",
      customerName: "Luis Fernández",
      phone: "+34 600 456 789",
      time: new Date(2025, 8, 26, 21, 0),
      partySize: 3,
      tableNumber: 3,
      status: "confirmed",
      specialRequests: null
    }
  ]);

  // Mock orders data
  const [orders, setOrders] = useState([
    {
      id: "P001",
      tableNumber: 5,
      orderTime: new Date(2025, 8, 26, 13, 45),
      status: 1,
      estimatedTime: 25,
      total: 67.50,
      priority: "medium",
      assignedStaff: "Chef Antonio",
      specialRequests: "Sin gluten",
      items: [
        { name: "Paella Valenciana", quantity: 2, price: 18.50 },
        { name: "Gazpacho", quantity: 2, price: 8.00 },
        { name: "Sangría", quantity: 1, price: 14.50 }
      ]
    },
    {
      id: "P002",
      tableNumber: 8,
      orderTime: new Date(2025, 8, 26, 14, 15),
      status: 2,
      estimatedTime: 10,
      total: 45.20,
      priority: "high",
      assignedStaff: "Chef María",
      specialRequests: null,
      items: [
        { name: "Jamón Ibérico", quantity: 1, price: 24.00 },
        { name: "Pan con Tomate", quantity: 2, price: 6.00 },
        { name: "Vino Tinto", quantity: 1, price: 15.20 }
      ]
    },
    {
      id: "P003",
      tableNumber: 12,
      orderTime: new Date(2025, 8, 26, 20, 45),
      status: 0,
      estimatedTime: 35,
      total: 156.80,
      priority: "high",
      assignedStaff: "Chef Carlos",
      specialRequests: "Tarta de cumpleaños incluida",
      items: [
        { name: "Cochinillo Asado", quantity: 1, price: 45.00 },
        { name: "Pulpo a la Gallega", quantity: 1, price: 28.00 },
        { name: "Tarta Cumpleaños", quantity: 1, price: 25.00 },
        { name: "Champán", quantity: 2, price: 29.40 }
      ]
    }
  ]);

  // Mock notifications data
  const [notifications, setNotifications] = useState([
    {
      id: "N001",
      type: "reservation",
      title: "Nueva reserva pendiente",
      message: "Carlos Rodríguez solicita mesa para 2 personas a las 14:00",
      timestamp: new Date(2025, 8, 26, 11, 15),
      read: false,
      priority: "medium",
      actions: [
        { id: "approve", label: "Aprobar", icon: "Check", variant: "default" },
        { id: "reject", label: "Rechazar", icon: "X", variant: "outline" }
      ]
    },
    {
      id: "N002",
      type: "order",
      title: "Pedido listo para servir",
      message: "Mesa 8 - Pedido #P002 completado en cocina",
      timestamp: new Date(2025, 8, 26, 11, 20),
      read: false,
      priority: "high",
      actions: [
        { id: "notify_waiter", label: "Avisar Camarero", icon: "Bell", variant: "default" }
      ]
    },
    {
      id: "N003",
      type: "system",
      title: "Mesa requiere limpieza",
      message: "Mesa 15 necesita limpieza después del servicio",
      timestamp: new Date(2025, 8, 26, 11, 10),
      read: true,
      priority: "low",
      actions: [
        { id: "assign_cleaning", label: "Asignar Limpieza", icon: "Sparkles", variant: "outline" }
      ]
    },
    {
      id: "N004",
      type: "staff",
      title: "Personal necesita asistencia",
      message: "Camarero Juan solicita ayuda en mesa 7",
      timestamp: new Date(2025, 8, 26, 11, 25),
      read: false,
      priority: "high",
      actions: [
        { id: "send_help", label: "Enviar Ayuda", icon: "Users", variant: "default" }
      ]
    }
  ]);

  // Mock tables data
  const [tables] = useState([
    { id: 1, number: 1, capacity: 2, status: 'available' },
    { id: 2, number: 2, capacity: 4, status: 'occupied', currentReservation: { customerName: 'Pedro López', time: new Date(2025, 8, 26, 13, 0), partySize: 4 } },
    { id: 3, number: 3, capacity: 4, status: 'reserved', currentReservation: { customerName: 'Luis Fernández', time: new Date(2025, 8, 26, 21, 0), partySize: 3 } },
    { id: 4, number: 4, capacity: 6, status: 'cleaning' },
    { id: 5, number: 5, capacity: 4, status: 'occupied', currentReservation: { customerName: 'María García', time: new Date(2025, 8, 26, 13, 30), partySize: 4 } },
    { id: 6, number: 6, capacity: 2, status: 'available' },
    { id: 7, number: 7, capacity: 8, status: 'maintenance' },
    { id: 8, number: 8, capacity: 2, status: 'occupied', currentReservation: { customerName: 'Carlos Rodríguez', time: new Date(2025, 8, 26, 14, 0), partySize: 2 } },
    { id: 9, number: 9, capacity: 4, status: 'available' },
    { id: 10, number: 10, capacity: 6, status: 'available' },
    { id: 11, number: 11, capacity: 4, status: 'available' },
    { id: 12, number: 12, capacity: 6, status: 'occupied', currentReservation: { customerName: 'Ana Martínez', time: new Date(2025, 8, 26, 20, 30), partySize: 6 } }
  ]);

  const views = [
    { id: 'overview', label: 'Resumen', icon: 'LayoutDashboard' },
    { id: 'reservations', label: 'Reservas', icon: 'Calendar' },
    { id: 'orders', label: 'Pedidos', icon: 'Package' },
    { id: 'tables', label: 'Mesas', icon: 'Grid3x3' }
  ];

  const handleUpdateReservation = (reservationId, newStatus) => {
    setReservations(prev => prev?.map(reservation => 
      reservation?.id === reservationId 
        ? { ...reservation, status: newStatus }
        : reservation
    ));
  };

  const handleReassignTable = (reservationId, newTableNumber) => {
    setReservations(prev => prev?.map(reservation => 
      reservation?.id === reservationId 
        ? { ...reservation, tableNumber: newTableNumber }
        : reservation
    ));
  };

  const handleUpdateOrderStatus = (orderId, newStatus) => {
    setOrders(prev => prev?.map(order => 
      order?.id === orderId 
        ? { ...order, status: newStatus }
        : order
    ));
  };

  const handleAssignStaff = (orderId, staffMember) => {
    setOrders(prev => prev?.map(order => 
      order?.id === orderId 
        ? { ...order, assignedStaff: staffMember }
        : order
    ));
  };

  const handleMarkNotificationAsRead = (notificationId) => {
    setNotifications(prev => prev?.map(notification => 
      notification?.id === notificationId 
        ? { ...notification, read: true }
        : notification
    ));
  };

  const handleNotificationAction = (notificationId, actionId) => {
    console.log(`Taking action ${actionId} on notification ${notificationId}`);
    handleMarkNotificationAsRead(notificationId);
  };

  const handleQuickAction = (actionId) => {
    switch (actionId) {
      case 'table-status': setCurrentView('tables');
        break;
      case 'waitlist': navigate('/table-reservation');
        break;
      case 'reports': console.log('Opening reports...');
        break;
      default:
        console.log(`Quick action: ${actionId}`);
    }
  };

  const handleTableAction = (tableId, actionId) => {
    console.log(`Table ${tableId} action: ${actionId}`);
  };

  const handleTableDrop = (tableId) => {
    console.log(`Dropped reservation on table ${tableId}`);
  };

  const activeReservations = reservations?.filter(r => r?.status === 'confirmed' || r?.status === 'seated')?.length;
  const pendingOrders = orders?.filter(o => o?.status < 3)?.length;
  const notificationCount = notifications?.filter(n => !n?.read)?.length;

  useEffect(() => {
    document.title = 'Panel de Administración - RestaurantBooking';
  }, []);

  const renderCurrentView = () => {
    switch (currentView) {
      case 'reservations':
        return (
          <div className="space-y-6">
            <ReservationTimeline
              reservations={reservations}
              onUpdateReservation={handleUpdateReservation}
              onReassignTable={handleReassignTable}
            />
          </div>
        );
      
      case 'orders':
        return (
          <div className="space-y-6">
            <OrderManagementPanel
              orders={orders}
              onUpdateOrderStatus={handleUpdateOrderStatus}
              onAssignStaff={handleAssignStaff}
            />
          </div>
        );
      
      case 'tables':
        return (
          <div className="space-y-6">
            <TableStatusGrid
              tables={tables}
              onTableAction={handleTableAction}
              onDrop={handleTableDrop}
            />
          </div>
        );
      
      default:
        return (
          <div className="space-y-6">
            {/* Metrics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {metrics?.map((metric, index) => (
                <MetricsCard key={index} {...metric} />
              ))}
            </div>
            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column - Reservations */}
              <div className="lg:col-span-2">
                <ReservationTimeline
                  reservations={reservations?.slice(0, 4)}
                  onUpdateReservation={handleUpdateReservation}
                  onReassignTable={handleReassignTable}
                />
              </div>

              {/* Right Column - Quick Actions */}
              <div>
                <QuickActions onAction={handleQuickAction} />
              </div>
            </div>
            {/* Second Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Orders Panel */}
              <OrderManagementPanel
                orders={orders?.slice(0, 3)}
                onUpdateOrderStatus={handleUpdateOrderStatus}
                onAssignStaff={handleAssignStaff}
              />

              {/* Notifications */}
              <NotificationCenter
                notifications={notifications}
                onMarkAsRead={handleMarkNotificationAsRead}
                onTakeAction={handleNotificationAction}
              />
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header 
        isAuthenticated={isAuthenticated} 
        userRole={userRole} 
      />
      <RoleBasedNavigation
        userRole={userRole}
        isAuthenticated={isAuthenticated}
        activeReservations={activeReservations}
        pendingOrders={pendingOrders}
        notificationCount={notificationCount}
      />
      <main className="ml-16 lg:ml-64 pt-16">
        <div className="p-6">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-foreground">Panel de Administración</h1>
                <p className="text-muted-foreground mt-1">
                  Gestiona las operaciones del restaurante en tiempo real
                </p>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <div className="text-sm text-muted-foreground">Hoy</div>
                  <div className="font-semibold text-foreground">
                    {new Date()?.toLocaleDateString('es-ES', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </div>
                </div>
                
                <Button
                  variant="outline"
                  iconName="RefreshCw"
                  iconPosition="left"
                >
                  Actualizar
                </Button>
              </div>
            </div>
          </div>

          {/* View Navigation - Mobile/Tablet */}
          <div className="lg:hidden mb-6">
            <div className="flex items-center space-x-1 overflow-x-auto">
              {views?.map((view) => (
                <button
                  key={view?.id}
                  onClick={() => setCurrentView(view?.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-smooth ${
                    currentView === view?.id
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                >
                  <Icon name={view?.icon} size={16} />
                  <span>{view?.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Desktop View Navigation */}
          <div className="hidden lg:block mb-6">
            <div className="flex items-center space-x-1">
              {views?.map((view) => (
                <button
                  key={view?.id}
                  onClick={() => setCurrentView(view?.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-smooth ${
                    currentView === view?.id
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                >
                  <Icon name={view?.icon} size={16} />
                  <span>{view?.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Current View Content */}
          {renderCurrentView()}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;