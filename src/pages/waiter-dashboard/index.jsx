import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import RoleBasedNavigation from '../../components/navigation/RoleBasedNavigation';
import DashboardNavigation from '../../components/navigation/DashboardNavigation';
import Icon from '../../components/AppIcon';

import OrderCard from './components/OrderCard';
import TableAssignmentCard from './components/TableAssignmentCard';
import QuickStatsBar from './components/QuickStatsBar';
import KitchenStatusPanel from './components/KitchenStatusPanel';

const WaiterDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('orders');
  const [orders, setOrders] = useState([]);
  const [tableAssignments, setTableAssignments] = useState([]);
  const [kitchenOrders, setKitchenOrders] = useState([]);
  const [stats, setStats] = useState({
    activeOrders: 0,
    pendingOrders: 0,
    completedToday: 0,
    assignedTables: 0
  });

  useEffect(() => {
    const mockOrders = [
    {
      id: 1,
      orderNumber: '2025-001',
      tableNumber: 5,
      customerName: 'Carlos Mendoza',
      customerPhone: '+51 987 654 321',
      customerImage: "https://img.rocket.new/generatedImages/rocket_gen_img_1f762fb56-1763293427979.png",
      customerImageAlt: 'Professional headshot of Hispanic man with short black hair wearing casual blue shirt',
      status: 'pending',
      isUrgent: true,
      estimatedTime: 25,
      total: 89.50,
      items: [
      {
        name: 'Ceviche Clásico',
        quantity: 2,
        price: 32.00,
        image: "https://images.unsplash.com/photo-1565837582697-dc98278483d5",
        imageAlt: 'Fresh Peruvian ceviche with white fish chunks marinated in lime juice served in white bowl with red onions and cilantro',
        specialRequest: 'Sin ají, por favor'
      },
      {
        name: 'Lomo Saltado',
        quantity: 1,
        price: 45.00,
        image: "https://images.unsplash.com/photo-1552988151-a64dd7b01fa4",
        imageAlt: 'Traditional Peruvian lomo saltado with beef strips, tomatoes, onions and french fries on white plate',
        specialRequest: null
      },
      {
        name: 'Chicha Morada',
        quantity: 2,
        price: 6.25,
        image: "https://images.unsplash.com/photo-1676566352352-40a5e9ae5e9b",
        imageAlt: 'Purple chicha morada drink in tall glass with ice cubes and lime garnish',
        specialRequest: null
      }]

    },
    {
      id: 2,
      orderNumber: '2025-002',
      tableNumber: 12,
      customerName: 'María Fernández',
      customerPhone: '+51 998 765 432',
      customerImage: "https://img.rocket.new/generatedImages/rocket_gen_img_167b12439-1763294803616.png",
      customerImageAlt: 'Professional headshot of Hispanic woman with long dark hair wearing elegant black blouse',
      status: 'confirmed',
      isUrgent: false,
      estimatedTime: 20,
      total: 125.00,
      items: [
      {
        name: 'Anticuchos de Corazón',
        quantity: 3,
        price: 28.00,
        image: "https://img.rocket.new/generatedImages/rocket_gen_img_1c4c9e4bb-1764279863449.png",
        imageAlt: 'Grilled Peruvian anticuchos beef heart skewers with golden char marks on wooden serving board',
        specialRequest: 'Bien cocidos'
      },
      {
        name: 'Ají de Gallina',
        quantity: 2,
        price: 38.00,
        image: "https://images.unsplash.com/photo-1681546898018-961e2a05c6fa",
        imageAlt: 'Creamy yellow ají de gallina chicken stew served over white rice with black olives and boiled egg',
        specialRequest: null
      },
      {
        name: 'Pisco Sour',
        quantity: 2,
        price: 18.00,
        image: "https://images.unsplash.com/photo-1688912739138-db1b24d71fd3",
        imageAlt: 'Classic Peruvian pisco sour cocktail in coupe glass with white foam top and angostura bitters design',
        specialRequest: null
      }]

    },
    {
      id: 3,
      orderNumber: '2025-003',
      tableNumber: 8,
      customerName: 'Roberto Silva',
      customerPhone: '+51 976 543 210',
      customerImage: "https://img.rocket.new/generatedImages/rocket_gen_img_198b2dbd0-1763294059481.png",
      customerImageAlt: 'Professional headshot of middle-aged Hispanic man with gray hair wearing formal white shirt',
      status: 'preparing',
      isUrgent: false,
      estimatedTime: 15,
      total: 67.50,
      items: [
      {
        name: 'Causa Limeña',
        quantity: 2,
        price: 24.00,
        image: "https://images.unsplash.com/photo-1640647316836-729fa9eeda4a",
        imageAlt: 'Layered Peruvian causa limeña with yellow potato, avocado and chicken salad garnished with black olives',
        specialRequest: null
      },
      {
        name: 'Arroz con Mariscos',
        quantity: 1,
        price: 52.00,
        image: "https://images.unsplash.com/photo-1618820232053-2775da47c169",
        imageAlt: 'Peruvian seafood rice dish with shrimp, mussels and squid in yellow rice with cilantro garnish',
        specialRequest: 'Extra mariscos'
      }]

    }];


    const mockTableAssignments = [
    {
      tableNumber: 5,
      capacity: 4,
      status: 'occupied',
      currentGuests: {
        name: 'Carlos Mendoza',
        arrivalTime: '19:30',
        estimatedDuration: 60
      }
    },
    {
      tableNumber: 8,
      capacity: 2,
      status: 'occupied',
      currentGuests: {
        name: 'Roberto Silva',
        arrivalTime: '20:15',
        estimatedDuration: 45
      }
    },
    {
      tableNumber: 12,
      capacity: 6,
      status: 'occupied',
      currentGuests: {
        name: 'María Fernández',
        arrivalTime: '19:45',
        estimatedDuration: 90
      }
    },
    {
      tableNumber: 3,
      capacity: 4,
      status: 'reserved',
      reservation: {
        customerName: 'Ana Torres',
        time: '21:00'
      }
    },
    {
      tableNumber: 7,
      capacity: 2,
      status: 'available'
    },
    {
      tableNumber: 15,
      capacity: 8,
      status: 'cleaning'
    }];


    const mockKitchenOrders = [
    {
      id: 1,
      tableNumber: 5,
      orderNumber: '2025-001',
      dishName: 'Ceviche Clásico x2',
      preparationStatus: 'preparing',
      estimatedTime: 8,
      progress: 65
    },
    {
      id: 2,
      tableNumber: 5,
      orderNumber: '2025-001',
      dishName: 'Lomo Saltado',
      preparationStatus: 'queued',
      estimatedTime: 15,
      progress: 0
    },
    {
      id: 3,
      tableNumber: 12,
      orderNumber: '2025-002',
      dishName: 'Anticuchos de Corazón x3',
      preparationStatus: 'ready',
      estimatedTime: 0,
      progress: 100
    },
    {
      id: 4,
      tableNumber: 8,
      orderNumber: '2025-003',
      dishName: 'Arroz con Mariscos',
      preparationStatus: 'preparing',
      estimatedTime: 12,
      progress: 45
    }];


    setOrders(mockOrders);
    setTableAssignments(mockTableAssignments);
    setKitchenOrders(mockKitchenOrders);
    setStats({
      activeOrders: mockOrders?.length,
      pendingOrders: mockOrders?.filter((o) => o?.status === 'pending')?.length,
      completedToday: 18,
      assignedTables: mockTableAssignments?.filter((t) => t?.status === 'occupied')?.length
    });
  }, []);

  const handleConfirmOrder = (orderId) => {
    setOrders((prevOrders) =>
    prevOrders?.map((order) =>
    order?.id === orderId ?
    { ...order, status: 'confirmed' } :
    order
    )
    );
    setStats((prev) => ({
      ...prev,
      pendingOrders: prev?.pendingOrders - 1
    }));
  };

  const handleModifyOrder = (orderId) => {
    console.log('Modificar orden:', orderId);
  };

  const handleAddNote = (orderId, note) => {
    console.log('Nota agregada para orden', orderId, ':', note);
  };

  const handleLogout = () => {
    navigate('/customer-registration');
  };

  return (
    <div className="min-h-screen bg-background">
      <RoleBasedNavigation userRole="waiter" onLogout={handleLogout} />
      <div className="pt-16">
        <DashboardNavigation userRole="waiter" />
      </div>
      <main className="px-4 lg:px-6 py-6 max-w-7xl mx-auto">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-3xl font-heading font-bold text-foreground">
              Panel de Mesero
            </h1>
            <div className="flex items-center gap-2 px-3 py-2 bg-success/10 rounded-lg">
              <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
              <span className="text-sm font-semibold text-success">En Servicio</span>
            </div>
          </div>
          <p className="text-muted-foreground">
            Gestiona tus órdenes y mesas asignadas
          </p>
        </div>

        <QuickStatsBar stats={stats} />

        <div className="mt-6 flex gap-3 overflow-x-auto pb-2">
          <button
            onClick={() => setActiveTab('orders')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap transition-quick ${
            activeTab === 'orders' ? 'bg-primary text-primary-foreground shadow-warm' : 'bg-card text-foreground border border-border hover:bg-muted'}`
            }>

            <Icon name="ClipboardList" size={18} />
            <span className="font-semibold">Órdenes Activas</span>
            {stats?.pendingOrders > 0 &&
            <span className="px-2 py-0.5 bg-error text-error-foreground text-xs font-bold rounded-full">
                {stats?.pendingOrders}
              </span>
            }
          </button>
          <button
            onClick={() => setActiveTab('tables')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap transition-quick ${
            activeTab === 'tables' ? 'bg-primary text-primary-foreground shadow-warm' : 'bg-card text-foreground border border-border hover:bg-muted'}`
            }>

            <Icon name="LayoutGrid" size={18} />
            <span className="font-semibold">Mesas Asignadas</span>
          </button>
          <button
            onClick={() => setActiveTab('kitchen')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap transition-quick ${
            activeTab === 'kitchen' ? 'bg-primary text-primary-foreground shadow-warm' : 'bg-card text-foreground border border-border hover:bg-muted'}`
            }>

            <Icon name="ChefHat" size={18} />
            <span className="font-semibold">Estado Cocina</span>
          </button>
        </div>

        <div className="mt-6">
          {activeTab === 'orders' &&
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {orders?.length === 0 ?
            <div className="col-span-full text-center py-12">
                  <Icon name="CheckCircle2" size={64} color="var(--color-success)" className="mx-auto mb-4" />
                  <h3 className="text-xl font-heading font-semibold text-foreground mb-2">
                    No hay órdenes activas
                  </h3>
                  <p className="text-muted-foreground">
                    Las nuevas órdenes aparecerán aquí
                  </p>
                </div> :

            orders?.map((order) =>
            <OrderCard
              key={order?.id}
              order={order}
              onConfirm={handleConfirmOrder}
              onModify={handleModifyOrder}
              onNote={handleAddNote} />

            )
            }
            </div>
          }

          {activeTab === 'tables' &&
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {tableAssignments?.map((assignment) =>
            <TableAssignmentCard
              key={assignment?.tableNumber}
              assignment={assignment} />

            )}
            </div>
          }

          {activeTab === 'kitchen' &&
          <div className="max-w-2xl mx-auto">
              <KitchenStatusPanel kitchenOrders={kitchenOrders} />
            </div>
          }
        </div>
      </main>
    </div>);

};

export default WaiterDashboard;