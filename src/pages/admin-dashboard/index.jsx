import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RoleBasedNavigation from '../../components/navigation/RoleBasedNavigation';
import DashboardNavigation from '../../components/navigation/DashboardNavigation';
import MetricCard from './components/MetricCard';
import ReservationCalendar from './components/ReservationCalendar';
import OrderManagementPanel from './components/OrderManagementPanel';
import MenuAdministration from './components/MenuAdministration';
import StaffOverview from './components/StaffOverview';


const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  const mockReservations = [
  {
    id: 1,
    customerName: "Carlos Mendoza",
    date: "2025-11-27",
    time: "19:00",
    guests: 4,
    tableNumber: 5,
    status: "pending",
    specialRequests: "Mesa cerca de la ventana, celebración de aniversario"
  },
  {
    id: 2,
    customerName: "María González",
    date: "2025-11-27",
    time: "20:30",
    guests: 2,
    tableNumber: 8,
    status: "confirmed",
    specialRequests: null
  },
  {
    id: 3,
    customerName: "José Rodríguez",
    date: "2025-11-27",
    time: "18:00",
    guests: 6,
    tableNumber: 12,
    status: "pending",
    specialRequests: "Silla alta para bebé necesaria"
  },
  {
    id: 4,
    customerName: "Ana Pérez",
    date: "2025-11-27",
    time: "21:00",
    guests: 3,
    tableNumber: 3,
    status: "confirmed",
    specialRequests: null
  }];


  const mockOrders = [
  {
    id: 1,
    orderNumber: "ORD-2025-001",
    customerName: "Luis Fernández",
    tableNumber: 7,
    timestamp: new Date("2025-11-27T19:15:00"),
    status: "pending",
    total: 145.50,
    items: [
    { name: "Ceviche Clásico", quantity: 2, price: 35.00 },
    { name: "Lomo Saltado", quantity: 1, price: 42.00 },
    { name: "Inca Kola", quantity: 2, price: 8.00 }],

    notes: "Sin cebolla en el ceviche"
  },
  {
    id: 2,
    orderNumber: "ORD-2025-002",
    customerName: "Patricia Silva",
    tableNumber: 4,
    timestamp: new Date("2025-11-27T19:30:00"),
    status: "confirmed",
    total: 98.00,
    items: [
    { name: "Anticuchos", quantity: 1, price: 28.00 },
    { name: "Ají de Gallina", quantity: 1, price: 38.00 },
    { name: "Chicha Morada", quantity: 2, price: 7.00 }],

    notes: null
  },
  {
    id: 3,
    orderNumber: "ORD-2025-003",
    customerName: "Roberto Vargas",
    tableNumber: 10,
    timestamp: new Date("2025-11-27T19:45:00"),
    status: "preparing",
    total: 215.00,
    items: [
    { name: "Causa Limeña", quantity: 2, price: 25.00 },
    { name: "Arroz con Mariscos", quantity: 2, price: 55.00 },
    { name: "Suspiro Limeño", quantity: 2, price: 18.00 }],

    notes: "Mesa celebrando cumpleaños"
  },
  {
    id: 4,
    orderNumber: "ORD-2025-004",
    customerName: "Carmen Torres",
    tableNumber: 2,
    timestamp: new Date("2025-11-27T20:00:00"),
    status: "ready",
    total: 87.50,
    items: [
    { name: "Papa a la Huancaína", quantity: 1, price: 22.00 },
    { name: "Pollo a la Brasa", quantity: 1, price: 45.00 },
    { name: "Pisco Sour", quantity: 2, price: 15.00 }],

    notes: null
  }];


  const mockMenuItems = [
  {
    id: 1,
    name: "Ceviche Clásico",
    description: "Pescado fresco marinado en limón con cebolla morada, ají limo y camote",
    category: "entradas",
    price: 35.00,
    image: "https://images.unsplash.com/photo-1535399831218-d5bd36d1a6b3",
    imageAlt: "Fresh Peruvian ceviche with white fish chunks marinated in lime juice served with red onions sweet potato and corn on white ceramic plate",
    available: true
  },
  {
    id: 2,
    name: "Lomo Saltado",
    description: "Tiras de lomo salteadas con cebolla, tomate y papas fritas servido con arroz",
    category: "principales",
    price: 42.00,
    image: "https://images.unsplash.com/photo-1552988151-a64dd7b01fa4",
    imageAlt: "Traditional Peruvian lomo saltado dish with sauteed beef strips onions tomatoes and french fries served with white rice on dark plate",
    available: true
  },
  {
    id: 3,
    name: "Ají de Gallina",
    description: "Pollo deshilachado en salsa cremosa de ají amarillo con nueces y queso",
    category: "principales",
    price: 38.00,
    image: "https://images.unsplash.com/photo-1679735386144-7c7a14f7e4a4",
    imageAlt: "Creamy Peruvian aji de gallina with shredded chicken in yellow pepper sauce topped with black olives and boiled egg served with rice",
    available: true
  },
  {
    id: 4,
    name: "Anticuchos",
    description: "Brochetas de corazón de res marinadas en especias peruanas",
    category: "entradas",
    price: 28.00,
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1720b73b8-1764279863536.png",
    imageAlt: "Grilled Peruvian anticuchos beef heart skewers with charred marks served with boiled potato and corn on rustic wooden board",
    available: true
  },
  {
    id: 5,
    name: "Causa Limeña",
    description: "Capas de papa amarilla con relleno de pollo o atún y aguacate",
    category: "entradas",
    price: 25.00,
    image: "https://images.unsplash.com/photo-1640647316836-729fa9eeda4a",
    imageAlt: "Layered Peruvian causa limena with yellow potato chicken filling avocado and hard boiled egg garnished with black olives on white plate",
    available: true
  },
  {
    id: 6,
    name: "Suspiro Limeño",
    description: "Postre tradicional de manjar blanco cubierto con merengue de oporto",
    category: "postres",
    price: 18.00,
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1992baeb0-1764279863503.png",
    imageAlt: "Traditional Peruvian suspiro limeno dessert with caramel dulce de leche base topped with fluffy port wine meringue in glass cup",
    available: true
  },
  {
    id: 7,
    name: "Arroz con Mariscos",
    description: "Arroz cremoso con variedad de mariscos frescos y ají amarillo",
    category: "principales",
    price: 55.00,
    image: "https://images.unsplash.com/photo-1535400459727-5d1544cb0939",
    imageAlt: "Peruvian arroz con mariscos seafood rice dish with shrimp mussels squid in yellow creamy sauce garnished with cilantro on ceramic plate",
    available: false
  },
  {
    id: 8,
    name: "Pisco Sour",
    description: "Cóctel nacional del Perú con pisco, limón, jarabe y clara de huevo",
    category: "bebidas",
    price: 15.00,
    image: "https://images.unsplash.com/photo-1711554524516-958b86b3efc4",
    imageAlt: "Classic Peruvian pisco sour cocktail in coupe glass with white foam top garnished with angostura bitters drops on dark bar counter",
    available: true
  }];


  const mockStaff = [
  {
    id: 1,
    name: "Diego Ramírez",
    role: "waiter",
    status: "active",
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1ce7e2d88-1763293689637.png",
    avatarAlt: "Professional headshot of Hispanic male waiter with short black hair wearing white dress shirt and black vest smiling warmly",
    ordersToday: 15,
    shift: "19:00 - 23:00",
    rating: 4.8,
    reviews: 124
  },
  {
    id: 2,
    name: "Sofía Castillo",
    role: "waiter",
    status: "active",
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_109b0b849-1763301846977.png",
    avatarAlt: "Professional headshot of Hispanic female waitress with long brown hair in ponytail wearing white blouse and black apron smiling",
    ordersToday: 12,
    shift: "18:00 - 22:00",
    rating: 4.9,
    reviews: 98
  },
  {
    id: 3,
    name: "Miguel Flores",
    role: "chef",
    status: "active",
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1e2e21bd4-1763300441970.png",
    avatarAlt: "Professional headshot of Hispanic male chef with short dark hair wearing white chef coat and traditional chef hat in kitchen",
    ordersToday: 28,
    shift: "17:00 - 01:00",
    rating: 5.0,
    reviews: 156
  },
  {
    id: 4,
    name: "Isabella Morales",
    role: "waiter",
    status: "break",
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1dd8b6197-1763299472268.png",
    avatarAlt: "Professional headshot of Hispanic female waitress with shoulder length black hair wearing white shirt and black vest with friendly smile",
    ordersToday: 8,
    shift: "18:00 - 22:00",
    rating: 4.7,
    reviews: 87
  },
  {
    id: 5,
    name: "Alejandro Vega",
    role: "manager",
    status: "active",
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1bf030ff5-1763296656055.png",
    avatarAlt: "Professional headshot of Hispanic male restaurant manager with neat short hair wearing dark suit and tie with confident expression",
    ordersToday: 0,
    shift: "17:00 - 23:00",
    rating: 4.9,
    reviews: 203
  },
  {
    id: 6,
    name: "Valentina Cruz",
    role: "waiter",
    status: "offline",
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1c0dd4728-1763298885240.png",
    avatarAlt: "Professional headshot of Hispanic female waitress with curly brown hair wearing white blouse and black apron with warm smile",
    ordersToday: 0,
    shift: "12:00 - 16:00",
    rating: 4.6,
    reviews: 72
  }];


  const [reservations, setReservations] = useState(mockReservations);
  const [orders, setOrders] = useState(mockOrders);
  const [menuItems, setMenuItems] = useState(mockMenuItems);
  const [staff] = useState(mockStaff);

  const handleApproveReservation = (id) => {
    setReservations((prev) => prev?.map((res) =>
    res?.id === id ? { ...res, status: 'confirmed' } : res
    ));
  };

  const handleRejectReservation = (id) => {
    setReservations((prev) => prev?.map((res) =>
    res?.id === id ? { ...res, status: 'cancelled' } : res
    ));
  };

  const handleConfirmOrder = (id) => {
    setOrders((prev) => prev?.map((order) =>
    order?.id === id ? { ...order, status: 'confirmed' } : order
    ));
  };

  const handleCompleteOrder = (id) => {
    setOrders((prev) => prev?.map((order) => {
      if (order?.id === id) {
        if (order?.status === 'confirmed' || order?.status === 'preparing') {
          return { ...order, status: 'ready' };
        } else if (order?.status === 'ready') {
          return { ...order, status: 'completed' };
        }
      }
      return order;
    }));
  };

  const handleCancelOrder = (id) => {
    setOrders((prev) => prev?.map((order) =>
    order?.id === id ? { ...order, status: 'cancelled' } : order
    ));
  };

  const handleEditMenuItem = (item) => {
    console.log('Edit menu item:', item);
  };

  const handleToggleAvailability = (id) => {
    setMenuItems((prev) => prev?.map((item) =>
    item?.id === id ? { ...item, available: !item?.available } : item
    ));
  };

  const handleDeleteMenuItem = (id) => {
    setMenuItems((prev) => prev?.filter((item) => item?.id !== id));
  };

  const handleManageStaff = () => {
    console.log('Manage staff');
  };

  const handleLogout = () => {
    navigate('/customer-registration');
  };

  const totalRevenue = orders?.filter((order) => order?.status === 'completed')?.reduce((sum, order) => sum + order?.total, 0);

  const activeOrders = orders?.filter((order) =>
  ['pending', 'confirmed', 'preparing', 'ready']?.includes(order?.status)
  )?.length;

  const todayReservations = reservations?.filter((res) =>
  res?.date === "2025-11-27"
  )?.length;

  const activeStaff = staff?.filter((member) => member?.status === 'active')?.length;

  return (
    <div className="min-h-screen bg-background">
      <RoleBasedNavigation userRole="admin" onLogout={handleLogout} />
      <div className="pt-16">
        <DashboardNavigation userRole="admin" />
        
        <main className="p-4 lg:p-6 max-w-[1600px] mx-auto">
          <div className="mb-6">
            <h1 className="text-3xl font-heading font-bold text-foreground mb-2">
              Panel de Administración
            </h1>
            <p className="text-muted-foreground">
              Gestión completa del restaurante Vikingo Grill
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <MetricCard
              title="Reservas de Hoy"
              value={todayReservations}
              subtitle={`${reservations?.filter((r) => r?.status === 'pending')?.length} pendientes`}
              icon="Calendar"
              iconColor="var(--color-primary)"
              trend="up"
              trendValue="+12%" />

            <MetricCard
              title="Pedidos Activos"
              value={activeOrders}
              subtitle="En proceso"
              icon="ShoppingBag"
              iconColor="var(--color-accent)"
              trend="up"
              trendValue="+8%" />

            <MetricCard
              title="Ingresos del Día"
              value={`S/ ${totalRevenue?.toFixed(2)}`}
              subtitle="Pedidos completados"
              icon="DollarSign"
              iconColor="var(--color-success)"
              trend="up"
              trendValue="+15%" />

            <MetricCard
              title="Personal Activo"
              value={activeStaff}
              subtitle={`${staff?.length} total`}
              icon="Users"
              iconColor="var(--color-secondary)"
              trend="stable"
              trendValue="0%" />

          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ReservationCalendar
                reservations={reservations}
                onApprove={handleApproveReservation}
                onReject={handleRejectReservation} />

              <OrderManagementPanel
                orders={orders}
                onConfirm={handleConfirmOrder}
                onComplete={handleCompleteOrder}
                onCancel={handleCancelOrder} />

            </div>

            <MenuAdministration
              menuItems={menuItems}
              onEdit={handleEditMenuItem}
              onToggleAvailability={handleToggleAvailability}
              onDelete={handleDeleteMenuItem} />


            <StaffOverview
              staff={staff}
              onManageStaff={handleManageStaff} />

          </div>
        </main>
      </div>
    </div>);

};

export default AdminDashboard;