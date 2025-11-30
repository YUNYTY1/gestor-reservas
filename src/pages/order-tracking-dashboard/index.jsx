import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import RoleBasedNavigation from '../../components/navigation/RoleBasedNavigation';
import DashboardNavigation from '../../components/navigation/DashboardNavigation';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import OrderCard from './components/OrderCard';
import FilterBar from './components/FilterBar';
import StatsOverview from './components/StatsOverview';
import KitchenCommunication from './components/KitchenCommunication';

const OrderTrackingDashboard = () => {
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState('admin');
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [filters, setFilters] = useState({
    status: 'all',
    timeRange: 'all',
    priority: 'all',
    tableNumber: ''
  });

  const mockOrders = [
  {
    id: 1,
    orderNumber: '1234',
    customerName: 'María González',
    tableNumber: 5,
    orderTime: new Date(Date.now() - 900000),
    status: 'preparing',
    priority: 'high',
    estimatedTime: 15,
    totalAmount: 125.50,
    specialInstructions: 'Sin cebolla en el ceviche, por favor. Cliente alérgico.',
    items: [
    {
      name: 'Ceviche Clásico',
      quantity: 2,
      price: 45.00,
      notes: 'Sin cebolla',
      image: "https://images.unsplash.com/photo-1595531507616-1f5347ee003b",
      imageAlt: 'Fresh Peruvian ceviche with white fish chunks, red onions, cilantro and lime in white ceramic bowl'
    },
    {
      name: 'Lomo Saltado',
      quantity: 1,
      price: 52.00,
      notes: '',
      image: "https://images.unsplash.com/photo-1552988151-a64dd7b01fa4",
      imageAlt: 'Traditional Peruvian lomo saltado with beef strips, tomatoes, onions and french fries on white plate'
    },
    {
      name: 'Chicha Morada',
      quantity: 3,
      price: 8.50,
      notes: '',
      image: "https://images.unsplash.com/photo-1636964758340-d3d23090c6ae",
      imageAlt: 'Purple chicha morada drink in tall glass with ice cubes and lime garnish on wooden table'
    }]

  },
  {
    id: 2,
    orderNumber: '1235',
    customerName: 'Carlos Rodríguez',
    tableNumber: 12,
    orderTime: new Date(Date.now() - 600000),
    status: 'ready',
    priority: 'medium',
    estimatedTime: 5,
    totalAmount: 89.00,
    specialInstructions: '',
    items: [
    {
      name: 'Ají de Gallina',
      quantity: 2,
      price: 38.00,
      notes: '',
      image: "https://images.unsplash.com/photo-1662114807772-e108b0c526fb",
      imageAlt: 'Creamy yellow aji de gallina chicken stew with rice, boiled egg and black olives on ceramic plate'
    },
    {
      name: 'Papa a la Huancaína',
      quantity: 1,
      price: 22.00,
      notes: '',
      image: "https://images.unsplash.com/photo-1597691088909-852f9dc7b8aa",
      imageAlt: 'Sliced boiled potatoes covered in yellow huancaina sauce with black olives and lettuce on white plate'
    },
    {
      name: 'Inca Kola',
      quantity: 2,
      price: 6.50,
      notes: '',
      image: "https://images.unsplash.com/photo-1728776448558-fe55e6fb3f3d",
      imageAlt: 'Golden yellow Inca Kola soda in glass bottle with condensation on dark wooden surface'
    }]

  },
  {
    id: 3,
    orderNumber: '1236',
    customerName: 'Ana Martínez',
    tableNumber: 8,
    orderTime: new Date(Date.now() - 1200000),
    status: 'received',
    priority: 'low',
    estimatedTime: 25,
    totalAmount: 156.00,
    specialInstructions: 'Celebración de cumpleaños. Por favor incluir vela.',
    items: [
    {
      name: 'Anticuchos de Corazón',
      quantity: 3,
      price: 35.00,
      notes: '',
      image: "https://img.rocket.new/generatedImages/rocket_gen_img_171b03a23-1764279863358.png",
      imageAlt: 'Grilled beef heart anticuchos skewers with golden potatoes and corn on rustic wooden board'
    },
    {
      name: 'Causa Limeña',
      quantity: 2,
      price: 28.00,
      notes: '',
      image: "https://images.unsplash.com/photo-1539563847947-ae57f0bc7a63",
      imageAlt: 'Layered yellow potato causa with tuna filling, avocado and hard boiled egg on white rectangular plate'
    },
    {
      name: 'Suspiro Limeño',
      quantity: 2,
      price: 18.00,
      notes: 'Con vela de cumpleaños',
      image: "https://img.rocket.new/generatedImages/rocket_gen_img_1de30baba-1764279861201.png",
      imageAlt: 'Traditional Peruvian suspiro limeno dessert with caramel base and white meringue topping in glass cup'
    }]

  },
  {
    id: 4,
    orderNumber: '1237',
    customerName: 'Luis Fernández',
    tableNumber: 3,
    orderTime: new Date(Date.now() - 300000),
    status: 'preparing',
    priority: 'high',
    estimatedTime: 10,
    totalAmount: 98.50,
    specialInstructions: '',
    items: [
    {
      name: 'Arroz con Mariscos',
      quantity: 1,
      price: 58.00,
      notes: '',
      image: "https://images.unsplash.com/photo-1664334996269-54ca4fb9a168",
      imageAlt: 'Peruvian seafood rice with shrimp, mussels, squid and vegetables in yellow saffron rice on white plate'
    },
    {
      name: 'Pisco Sour',
      quantity: 2,
      price: 18.00,
      notes: '',
      image: "https://images.unsplash.com/photo-1688912739138-db1b24d71fd3",
      imageAlt: 'Classic Pisco Sour cocktail in coupe glass with white foam top and angostura bitters drops'
    }]

  },
  {
    id: 5,
    orderNumber: '1238',
    customerName: 'Patricia Silva',
    tableNumber: 15,
    orderTime: new Date(Date.now() - 1800000),
    status: 'served',
    priority: 'medium',
    estimatedTime: 0,
    totalAmount: 142.00,
    specialInstructions: '',
    items: [
    {
      name: 'Tacu Tacu con Bistec',
      quantity: 2,
      price: 48.00,
      notes: '',
      image: "https://images.unsplash.com/photo-1634429677040-28eac5451468",
      imageAlt: 'Peruvian tacu tacu rice and beans patty with grilled beef steak, fried egg and salsa criolla on plate'
    },
    {
      name: 'Rocoto Relleno',
      quantity: 1,
      price: 42.00,
      notes: '',
      image: "https://images.unsplash.com/photo-1619568775230-c7d275a35dc4",
      imageAlt: 'Stuffed red rocoto pepper with beef filling topped with melted cheese on white ceramic plate'
    }]

  }];


  const [orders, setOrders] = useState(mockOrders);

  const stats = {
    activeOrders: orders?.filter((o) => o?.status !== 'served')?.length,
    preparing: orders?.filter((o) => o?.status === 'preparing')?.length,
    ready: orders?.filter((o) => o?.status === 'ready')?.length,
    avgTime: Math.round(
      orders?.filter((o) => o?.status !== 'served')?.reduce((acc, o) => acc + o?.estimatedTime, 0) /
      orders?.filter((o) => o?.status !== 'served')?.length || 0
    )
  };

  const filteredOrders = orders?.filter((order) => {
    if (filters?.status !== 'all' && order?.status !== filters?.status) return false;
    if (filters?.priority !== 'all' && order?.priority !== filters?.priority) return false;
    if (filters?.tableNumber && !order?.tableNumber?.toString()?.includes(filters?.tableNumber)) return false;

    if (filters?.timeRange !== 'all') {
      const now = Date.now();
      const orderTime = new Date(order.orderTime)?.getTime();
      const diff = now - orderTime;

      switch (filters?.timeRange) {
        case 'last15':
          if (diff > 900000) return false;
          break;
        case 'last30':
          if (diff > 1800000) return false;
          break;
        case 'last60':
          if (diff > 3600000) return false;
          break;
        case 'today':
          const today = new Date()?.setHours(0, 0, 0, 0);
          if (orderTime < today) return false;
          break;
      }
    }

    return true;
  });

  const handleStatusUpdate = (orderId, newStatus) => {
    setOrders(orders?.map((order) =>
    order?.id === orderId ? { ...order, status: newStatus } : order
    ));
  };

  const handleNotifyCustomer = (orderId) => {
    const order = orders?.find((o) => o?.id === orderId);
    alert(`Notificación enviada a ${order?.customerName} sobre el pedido #${order?.orderNumber}`);
  };

  const handleSendMessage = (message) => {
    console.log('Kitchen message sent:', message);
    // Handle message sending logic here
  };

  const handleLogout = () => {
    navigate('/customer-registration');
  };

  const toggleAutoRefresh = () => {
    setAutoRefresh(!autoRefresh);
  };

  useEffect(() => {
    if (autoRefresh) {
      const interval = setInterval(() => {
        setLastUpdate(new Date());
      }, 30000);
      return () => clearInterval(interval);
    }
  }, [autoRefresh]);

  const formatLastUpdate = () => {
    return lastUpdate?.toLocaleTimeString('es-PE', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  return (
    <>
      <Helmet>
        <title>Seguimiento de Pedidos - Vikingo Grill</title>
        <meta name="description" content="Panel de seguimiento de pedidos en tiempo real para coordinación eficiente entre cocina y servicio" />
      </Helmet>
      <div className="min-h-screen bg-background">
        <RoleBasedNavigation userRole={userRole} onLogout={handleLogout} />
        
        <div className="pt-16">
          <DashboardNavigation userRole={userRole} />
          
          <main className="px-4 py-6 lg:px-6 lg:py-8 max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
              <div>
                <h1 className="text-3xl font-heading font-bold text-foreground mb-2">
                  Seguimiento de Pedidos
                </h1>
                <p className="text-muted-foreground">
                  Monitoreo en tiempo real de todos los pedidos activos
                </p>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-lg">
                  <Icon
                    name={autoRefresh ? 'RefreshCw' : 'RefreshCcw'}
                    size={16}
                    color="var(--color-muted-foreground)"
                    className={autoRefresh ? 'animate-spin' : ''} />

                  <span className="text-sm text-muted-foreground">
                    Última actualización: {formatLastUpdate()}
                  </span>
                </div>
                <Button
                  variant={autoRefresh ? 'default' : 'outline'}
                  size="sm"
                  iconName={autoRefresh ? 'Pause' : 'Play'}
                  iconPosition="left"
                  onClick={toggleAutoRefresh}>

                  {autoRefresh ? 'Pausar' : 'Reanudar'}
                </Button>
              </div>
            </div>

            <div className="mb-6">
              <StatsOverview stats={stats} />
            </div>

            <div className="mb-6">
              <FilterBar onFilterChange={setFilters} activeFilters={filters} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-4">
                {filteredOrders?.length > 0 ?
                filteredOrders?.map((order) =>
                <OrderCard
                  key={order?.id}
                  order={order}
                  onStatusUpdate={handleStatusUpdate}
                  onNotifyCustomer={handleNotifyCustomer} />

                ) :

                <div className="bg-card border border-border rounded-lg shadow-warm p-12 text-center">
                    <Icon name="Search" size={48} color="var(--color-muted-foreground)" className="mx-auto mb-4" />
                    <h3 className="text-lg font-heading font-semibold text-foreground mb-2">
                      No se encontraron pedidos
                    </h3>
                    <p className="text-muted-foreground">
                      Intenta ajustar los filtros para ver más resultados
                    </p>
                  </div>
                }
              </div>

              <div className="lg:col-span-1">
                <KitchenCommunication onSendMessage={handleSendMessage} />
              </div>
            </div>
          </main>
        </div>
      </div>
    </>);

};

export default OrderTrackingDashboard;