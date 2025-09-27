import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Select from '../../components/ui/Select';
import OrderCard from './components/OrderCard';
import OrderProgressIndicator from './components/OrderProgressIndicator';
import OrderTimeline from './components/OrderTimeline';
import OrderSummary from './components/OrderSummary';
import ContactInfo from './components/ContactInfo';
import NotificationSettings from './components/NotificationSettings';

const OrderTracking = () => {
  const navigate = useNavigate();
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [showNotificationSettings, setShowNotificationSettings] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Mock data for orders
  const mockOrders = [
    {
      id: 'ORD-2025-001',
      status: 'preparing',
      currentStep: 1,
      orderType: 'pickup',
      createdAt: new Date('2025-01-26T10:30:00'),
      estimatedTime: 25,
      total: 34.50,
      subtotal: 28.50,
      tax: 5.99,
      discount: 0,
      deliveryFee: 0,
      paymentMethod: 'card',
      items: [
        {
          name: 'Paella Valenciana',
          quantity: 2,
          price: 12.50,
          image: 'https://images.unsplash.com/photo-1534080564583-6be75777b70a?w=400',
          modifications: ['Sin mariscos', 'Extra pollo'],
          specialInstructions: 'Bien cocida por favor'
        },
        {
          name: 'Sangría Tinto',
          quantity: 1,
          price: 8.50,
          image: 'https://images.unsplash.com/photo-1571613316887-6f8d5cbf7ef7?w=400',
          modifications: []
        }
      ]
    },
    {
      id: 'ORD-2025-002',
      status: 'ready',
      currentStep: 2,
      orderType: 'delivery',
      createdAt: new Date('2025-01-26T09:15:00'),
      estimatedTime: 10,
      total: 28.75,
      subtotal: 22.50,
      tax: 4.25,
      discount: 2.00,
      deliveryFee: 4.00,
      paymentMethod: 'paypal',
      items: [
        {
          name: 'Tapas Variadas',
          quantity: 1,
          price: 18.50,
          image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=400',
          modifications: ['Sin aceitunas'],
          specialInstructions: ''
        },
        {
          name: 'Gazpacho Andaluz',
          quantity: 2,
          price: 6.00,
          image: 'https://images.unsplash.com/photo-1571197119282-7c4e2b4b7e4b?w=400',
          modifications: []
        }
      ]
    },
    {
      id: 'ORD-2025-003',
      status: 'delivered',
      currentStep: 3,
      orderType: 'delivery',
      createdAt: new Date('2025-01-25T19:45:00'),
      estimatedTime: 0,
      total: 45.20,
      subtotal: 38.50,
      tax: 6.70,
      discount: 0,
      deliveryFee: 0,
      paymentMethod: 'cash',
      items: [
        {
          name: 'Cochinillo Asado',
          quantity: 1,
          price: 24.50,
          image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=400',
          modifications: [],
          specialInstructions: 'Punto medio'
        },
        {
          name: 'Crema Catalana',
          quantity: 2,
          price: 7.00,
          image: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400',
          modifications: []
        }
      ]
    }
  ];

  // Mock timeline updates
  const mockTimelineUpdates = [
    {
      type: 'created',
      title: 'Pedido Creado',
      description: 'Tu pedido ha sido recibido y confirmado.',
      timestamp: new Date('2025-01-26T10:30:00'),
      staffNote: null,
      estimatedTime: 30
    },
    {
      type: 'confirmed',
      title: 'Pedido Confirmado',
      description: 'El restaurante ha confirmado tu pedido y comenzará la preparación.',
      timestamp: new Date('2025-01-26T10:32:00'),
      staffNote: 'Pedido asignado al chef principal',
      estimatedTime: 25
    },
    {
      type: 'preparing',
      title: 'En Preparación',
      description: 'Tu pedido está siendo preparado en la cocina.',
      timestamp: new Date('2025-01-26T10:35:00'),
      staffNote: 'Paella en proceso, sangría lista',
      estimatedTime: 20
    }
  ];

  // Mock restaurant info
  const restaurantInfo = {
    name: 'Restaurante La Española',
    type: 'Cocina Tradicional Española',
    phone: '+34 91 123 4567',
    email: 'info@laespanola.es',
    whatsapp: '34911234567',
    address: 'Calle Mayor 123, 28013 Madrid, España',
    hours: 'Lun-Dom: 12:00 - 23:00'
  };

  // Mock notification settings
  const [notificationSettings, setNotificationSettings] = useState({
    smsNotifications: false,
    emailNotifications: true,
    pushNotifications: true,
    statusUpdates: true,
    promotionalOffers: false,
    orderReminders: true
  });

  const statusOptions = [
    { value: 'all', label: 'Todos los Pedidos' },
    { value: 'received', label: 'Recibidos' },
    { value: 'preparing', label: 'En Preparación' },
    { value: 'ready', label: 'Listos' },
    { value: 'delivered', label: 'Entregados' },
    { value: 'cancelled', label: 'Cancelados' }
  ];

  const filteredOrders = mockOrders?.filter(order => {
    if (filterStatus === 'all') return true;
    return order?.status === filterStatus;
  });

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Auto-select first order if none selected
  useEffect(() => {
    if (!selectedOrder && filteredOrders?.length > 0) {
      setSelectedOrder(filteredOrders?.[0]);
    }
  }, [filteredOrders, selectedOrder]);

  const handleViewDetails = (order) => {
    setSelectedOrder(order);
  };

  const handleContactRestaurant = (order) => {
    // This would typically open a contact modal or navigate to contact page
    console.log('Contacting restaurant about order:', order?.id);
  };

  const handleReorder = (order) => {
    navigate('/menu-and-ordering', { 
      state: { reorderItems: order?.items } 
    });
  };

  const handleNotificationSave = (settings) => {
    setNotificationSettings(settings);
    setShowNotificationSettings(false);
    // Here you would typically save to backend
    console.log('Notification settings saved:', settings);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
              <p className="text-muted-foreground">Cargando tus pedidos...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                Seguimiento de Pedidos
              </h1>
              <p className="text-muted-foreground mt-2">
                Rastrea el estado de tus pedidos en tiempo real
              </p>
            </div>
            
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                size="sm"
                iconName="Settings"
                iconPosition="left"
                onClick={() => setShowNotificationSettings(!showNotificationSettings)}
              >
                Notificaciones
              </Button>
              
              <Button
                variant="default"
                size="sm"
                iconName="Plus"
                iconPosition="left"
                onClick={() => navigate('/menu-and-ordering')}
              >
                Nuevo Pedido
              </Button>
            </div>
          </div>

          {/* Filter */}
          <div className="flex items-center space-x-4">
            <Select
              options={statusOptions}
              value={filterStatus}
              onChange={setFilterStatus}
              placeholder="Filtrar por estado"
              className="w-48"
            />
            
            <div className="text-sm text-muted-foreground">
              {filteredOrders?.length} pedido{filteredOrders?.length !== 1 ? 's' : ''} encontrado{filteredOrders?.length !== 1 ? 's' : ''}
            </div>
          </div>
        </div>

        {/* Notification Settings */}
        {showNotificationSettings && (
          <div className="mb-8">
            <NotificationSettings
              currentSettings={notificationSettings}
              onSave={handleNotificationSave}
            />
          </div>
        )}

        {filteredOrders?.length === 0 ? (
          <div className="text-center py-12">
            <Icon name="Package" size={48} className="text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">
              No hay pedidos
            </h3>
            <p className="text-muted-foreground mb-6">
              {filterStatus === 'all' ?'Aún no has realizado ningún pedido.'
                : `No tienes pedidos con estado "${statusOptions?.find(opt => opt?.value === filterStatus)?.label}".`
              }
            </p>
            <Button
              variant="default"
              iconName="Plus"
              iconPosition="left"
              onClick={() => navigate('/menu-and-ordering')}
            >
              Hacer Primer Pedido
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Orders List */}
            <div className="lg:col-span-1 space-y-4">
              <h2 className="text-xl font-semibold text-foreground mb-4">
                Tus Pedidos
              </h2>
              
              {filteredOrders?.map((order) => (
                <OrderCard
                  key={order?.id}
                  order={order}
                  onViewDetails={handleViewDetails}
                  onContactRestaurant={handleContactRestaurant}
                  onReorder={handleReorder}
                />
              ))}
            </div>

            {/* Order Details */}
            <div className="lg:col-span-2 space-y-6">
              {selectedOrder ? (
                <>
                  {/* Progress Indicator */}
                  <div className="bg-card border border-border rounded-lg p-6 shadow-soft">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-xl font-semibold text-foreground">
                        Pedido #{selectedOrder?.id}
                      </h2>
                      {selectedOrder?.estimatedTime > 0 && (
                        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                          <Icon name="Clock" size={16} />
                          <span>Tiempo estimado: {selectedOrder?.estimatedTime} min</span>
                        </div>
                      )}
                    </div>
                    
                    <OrderProgressIndicator
                      currentStep={selectedOrder?.currentStep}
                      orderType={selectedOrder?.orderType}
                      layout="horizontal"
                    />
                  </div>

                  {/* Mobile Progress - Vertical */}
                  <div className="lg:hidden bg-card border border-border rounded-lg p-6 shadow-soft">
                    <h3 className="text-lg font-semibold text-foreground mb-4">
                      Estado Detallado
                    </h3>
                    <OrderProgressIndicator
                      currentStep={selectedOrder?.currentStep}
                      orderType={selectedOrder?.orderType}
                      layout="vertical"
                    />
                  </div>

                  <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                    {/* Order Summary */}
                    <OrderSummary order={selectedOrder} />
                    
                    {/* Contact Info */}
                    <ContactInfo 
                      restaurantInfo={restaurantInfo}
                      onCall={() => window.open(`tel:${restaurantInfo?.phone}`, '_self')}
                      onMessage={() => {
                        const message = encodeURIComponent('Hola, tengo una consulta.');
                        window.open(`https://wa.me/${restaurantInfo?.whatsapp}?text=${message}`, '_blank');
                      }}
                    />
                  </div>

                  {/* Timeline */}
                  <div className="bg-card border border-border rounded-lg p-6 shadow-soft">
                    <OrderTimeline updates={mockTimelineUpdates} />
                  </div>
                </>
              ) : (
                <div className="bg-card border border-border rounded-lg p-12 text-center shadow-soft">
                  <Icon name="Package" size={48} className="text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    Selecciona un Pedido
                  </h3>
                  <p className="text-muted-foreground">
                    Elige un pedido de la lista para ver los detalles y seguimiento.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div className="mt-12 bg-muted/30 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">
            Acciones Rápidas
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button
              variant="outline"
              size="sm"
              iconName="Calendar"
              iconPosition="left"
              onClick={() => navigate('/table-reservation')}
              fullWidth
            >
              Reservar Mesa
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              iconName="UtensilsCrossed"
              iconPosition="left"
              onClick={() => navigate('/menu-and-ordering')}
              fullWidth
            >
              Ver Menú
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              iconName="Phone"
              iconPosition="left"
              onClick={() => window.open(`tel:${restaurantInfo?.phone}`, '_self')}
              fullWidth
            >
              Llamar Restaurante
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              iconName="MessageCircle"
              iconPosition="left"
              onClick={() => {
                const message = encodeURIComponent('Hola, tengo una consulta.');
                window.open(`https://wa.me/${restaurantInfo?.whatsapp}?text=${message}`, '_blank');
              }}
              fullWidth
            >
              WhatsApp
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderTracking;