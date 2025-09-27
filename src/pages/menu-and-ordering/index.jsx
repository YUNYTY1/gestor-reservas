import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import MenuCategoryTabs from './components/MenuCategoryTabs';
import MenuFilters from './components/MenuFilters';
import MenuSection from './components/MenuSection';
import OrderSummaryPanel from './components/OrderSummaryPanel';
import Button from '../../components/ui/Button';


const MenuAndOrdering = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('entrantes');
  const [orderItems, setOrderItems] = useState([]);
  const [filters, setFilters] = useState({
    priceRange: 'all',
    sortBy: 'popularity',
    dietary: [],
    searchQuery: ''
  });
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [isOrderCollapsed, setIsOrderCollapsed] = useState(false);
  const [layout, setLayout] = useState('horizontal');

  // Mock data
  const categories = [
    { id: 'entrantes', name: 'Entrantes', itemCount: 8, description: 'Deliciosos aperitivos para comenzar' },
    { id: 'principales', name: 'Principales', itemCount: 12, description: 'Nuestros platos principales más populares' },
    { id: 'postres', name: 'Postres', itemCount: 6, description: 'Dulces tentaciones para terminar' },
    { id: 'bebidas', name: 'Bebidas', itemCount: 10, description: 'Refrescantes bebidas y cócteles' }
  ];

  const menuItems = {
    entrantes: [
      {
        id: 'e1',
        name: 'Jamón Ibérico de Bellota',
        description: 'Jamón ibérico de bellota cortado a mano, servido con pan tostado y tomate rallado',
        price: 18.50,
        image: 'https://images.unsplash.com/photo-1549888834-3ec93abae044?w=400&h=300&fit=crop',
        dietary: ['gluten-free'],
        isPopular: true,
        prepTime: 5,
        customizable: false
      },
      {
        id: 'e2',
        name: 'Croquetas de Jamón Caseras',
        description: 'Croquetas cremosas de jamón ibérico, elaboradas con bechamel casera y empanadas al momento',
        price: 12.00,
        image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop',
        dietary: [],
        isPopular: true,
        prepTime: 8,
        customizable: true,
        customizationOptions: [
          {
            id: 'quantity_croquetas',
            name: 'Cantidad',
            type: 'single',
            required: true,
            options: [
              { id: '6', name: '6 unidades', price: 0 },
              { id: '12', name: '12 unidades', price: 8.00 }
            ]
          }
        ]
      },
      {
        id: 'e3',
        name: 'Ensalada de Burrata',
        description: 'Burrata fresca con tomates cherry, rúcula, albahaca y reducción de vinagre balsámico',
        price: 14.50,
        image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&h=300&fit=crop',
        dietary: ['vegetarian', 'gluten-free'],
        isPopular: false,
        prepTime: 10,
        customizable: true,
        customizationOptions: [
          {
            id: 'extras',
            name: 'Extras',
            type: 'multiple',
            required: false,
            options: [
              { id: 'avocado', name: 'Aguacate', price: 2.50 },
              { id: 'nuts', name: 'Nueces', price: 1.50 }
            ]
          }
        ]
      },
      {
        id: 'e4',
        name: 'Pulpo a la Gallega',
        description: 'Pulpo cocido con patatas, pimentón dulce, aceite de oliva virgen extra y sal gruesa',
        price: 16.00,
        image: 'https://images.unsplash.com/photo-1559847844-d721426d6edc?w=400&h=300&fit=crop',
        dietary: ['gluten-free'],
        isPopular: true,
        prepTime: 12,
        customizable: false
      }
    ],
    principales: [
      {
        id: 'p1',
        name: 'Paella Valenciana',
        description: 'Paella tradicional con pollo, conejo, judías verdes, garrofón, tomate y azafrán',
        price: 22.00,
        image: 'https://images.unsplash.com/photo-1534080564583-6be75777b70a?w=400&h=300&fit=crop',
        dietary: ['gluten-free'],
        isPopular: true,
        prepTime: 25,
        customizable: true,
        customizationOptions: [
          {
            id: 'size',
            name: 'Tamaño',
            type: 'single',
            required: true,
            options: [
              { id: '1person', name: '1 persona', price: 0 },
              { id: '2person', name: '2 personas', price: 18.00 }
            ]
          }
        ]
      },
      {
        id: 'p2',
        name: 'Solomillo de Ternera',
        description: 'Solomillo de ternera a la plancha con salsa de vino tinto, patatas confitadas y verduras',
        price: 28.50,
        image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop',
        dietary: ['gluten-free'],
        isPopular: true,
        prepTime: 20,
        customizable: true,
        customizationOptions: [
          {
            id: 'cooking',
            name: 'Punto de cocción',
            type: 'single',
            required: true,
            options: [
              { id: 'rare', name: 'Poco hecho', price: 0 },
              { id: 'medium', name: 'Al punto', price: 0 },
              { id: 'well', name: 'Muy hecho', price: 0 }
            ]
          },
          {
            id: 'sauce',
            name: 'Salsa',
            type: 'single',
            required: false,
            options: [
              { id: 'pepper', name: 'Salsa de pimienta', price: 2.00 },
              { id: 'mushroom', name: 'Salsa de setas', price: 2.50 }
            ]
          }
        ]
      },
      {
        id: 'p3',
        name: 'Lubina a la Sal',
        description: 'Lubina fresca cocinada en costra de sal con hierbas aromáticas, acompañada de verduras',
        price: 24.00,
        image: 'https://images.unsplash.com/photo-1544943910-4c1dc44aab44?w=400&h=300&fit=crop',
        dietary: ['gluten-free'],
        isPopular: false,
        prepTime: 30,
        customizable: false
      },
      {
        id: 'p4',
        name: 'Risotto de Setas',
        description: 'Risotto cremoso con mezcla de setas silvestres, parmesano y trufa negra',
        price: 19.50,
        image: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=400&h=300&fit=crop',
        dietary: ['vegetarian', 'gluten-free'],
        isPopular: false,
        prepTime: 18,
        customizable: true,
        customizationOptions: [
          {
            id: 'extras',
            name: 'Extras',
            type: 'multiple',
            required: false,
            options: [
              { id: 'truffle', name: 'Trufa extra', price: 5.00 },
              { id: 'parmesan', name: 'Parmesano extra', price: 2.00 }
            ]
          }
        ]
      }
    ],
    postres: [
      {
        id: 'd1',
        name: 'Tiramisú Casero',
        description: 'Tiramisú tradicional con mascarpone, café expreso, cacao y bizcochos de soletilla',
        price: 8.50,
        image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&h=300&fit=crop',
        dietary: ['vegetarian'],
        isPopular: true,
        prepTime: 5,
        customizable: false
      },
      {
        id: 'd2',
        name: 'Crema Catalana',
        description: 'Crema catalana tradicional con azúcar caramelizado y canela',
        price: 7.00,
        image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&h=300&fit=crop',
        dietary: ['vegetarian', 'gluten-free'],
        isPopular: true,
        prepTime: 3,
        customizable: false
      },
      {
        id: 'd3',
        name: 'Tarta de Chocolate',
        description: 'Tarta de chocolate negro con ganache y frutos rojos frescos',
        price: 9.00,
        image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop',
        dietary: ['vegetarian'],
        isPopular: false,
        prepTime: 5,
        customizable: true,
        customizationOptions: [
          {
            id: 'extras',
            name: 'Acompañamientos',
            type: 'multiple',
            required: false,
            options: [
              { id: 'ice_cream', name: 'Helado de vainilla', price: 2.00 },
              { id: 'whipped_cream', name: 'Nata montada', price: 1.50 }
            ]
          }
        ]
      }
    ],
    bebidas: [
      {
        id: 'b1',
        name: 'Sangría de la Casa',
        description: 'Sangría tradicional con vino tinto, frutas frescas y especias',
        price: 6.50,
        image: 'https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=400&h=300&fit=crop',
        dietary: ['vegan', 'gluten-free'],
        isPopular: true,
        prepTime: 3,
        customizable: true,
        customizationOptions: [
          {
            id: 'size',
            name: 'Tamaño',
            type: 'single',
            required: true,
            options: [
              { id: 'glass', name: 'Copa', price: 0 },
              { id: 'pitcher', name: 'Jarra (1L)', price: 12.00 }
            ]
          }
        ]
      },
      {
        id: 'b2',
        name: 'Agua con Gas San Pellegrino',
        description: 'Agua mineral con gas italiana, botella de 750ml',
        price: 3.50,
        image: 'https://images.unsplash.com/photo-1523362628745-0c100150b504?w=400&h=300&fit=crop',
        dietary: ['vegan', 'gluten-free'],
        isPopular: false,
        prepTime: 1,
        customizable: false
      },
      {
        id: 'b3',
        name: 'Café Cortado',
        description: 'Café expreso con un toque de leche caliente',
        price: 2.50,
        image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&h=300&fit=crop',
        dietary: ['vegetarian'],
        isPopular: true,
        prepTime: 3,
        customizable: true,
        customizationOptions: [
          {
            id: 'milk',
            name: 'Tipo de leche',
            type: 'single',
            required: false,
            options: [
              { id: 'regular', name: 'Leche normal', price: 0 },
              { id: 'oat', name: 'Leche de avena', price: 0.50 },
              { id: 'almond', name: 'Leche de almendra', price: 0.50 }
            ]
          }
        ]
      }
    ]
  };

  useEffect(() => {
    const handleResize = () => {
      setLayout(window.innerWidth >= 1024 ? 'horizontal' : 'horizontal');
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleAddToOrder = (item) => {
    setOrderItems(prev => [...prev, { ...item, id: `${item?.id}-${Date.now()}` }]);
  };

  const handleUpdateQuantity = (index, newQuantity) => {
    if (newQuantity <= 0) {
      handleRemoveItem(index);
      return;
    }
    
    setOrderItems(prev => prev?.map((item, i) => 
      i === index 
        ? { ...item, quantity: newQuantity, totalPrice: (item?.price + (item?.selectedOptions ? Object.values(item?.selectedOptions)?.reduce((sum, opt) => sum + (opt?.price || 0), 0) : 0)) * newQuantity }
        : item
    ));
  };

  const handleRemoveItem = (index) => {
    setOrderItems(prev => prev?.filter((_, i) => i !== index));
  };

  const handleApplyCoupon = (coupon) => {
    // Coupon logic handled in OrderSummaryPanel
    console.log('Coupon applied:', coupon);
  };

  const handleProceedToCheckout = () => {
    if (orderItems?.length === 0) return;
    
    // Store order in localStorage for checkout process
    localStorage.setItem('currentOrder', JSON.stringify({
      items: orderItems,
      timestamp: new Date()?.toISOString(),
      restaurantInfo: {
        name: 'RestaurantBooking',
        address: 'Calle Principal 123, Madrid'
      }
    }));
    
    navigate('/order-tracking');
  };

  const scrollToCategory = (categoryId) => {
    const element = document.getElementById(`category-${categoryId}`);
    if (element) {
      element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleCategoryChange = (categoryId) => {
    setActiveCategory(categoryId);
    scrollToCategory(categoryId);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header isAuthenticated={true} userRole="customer" />
      <div className="pt-16">
        {/* Category Navigation */}
        <MenuCategoryTabs
          categories={categories}
          activeCategory={activeCategory}
          onCategoryChange={handleCategoryChange}
          layout={layout}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Filters Sidebar */}
            <div className="lg:col-span-1">
              <MenuFilters
                filters={filters}
                onFiltersChange={setFilters}
                isOpen={isFiltersOpen}
                onToggle={() => setIsFiltersOpen(!isFiltersOpen)}
              />
            </div>

            {/* Menu Content */}
            <div className="lg:col-span-2">
              <div className="space-y-8">
                {categories?.map((category) => (
                  <MenuSection
                    key={category?.id}
                    category={category}
                    items={menuItems?.[category?.id] || []}
                    onAddToOrder={handleAddToOrder}
                    searchQuery={filters?.searchQuery}
                    filters={filters}
                  />
                ))}
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <OrderSummaryPanel
                orderItems={orderItems}
                onUpdateQuantity={handleUpdateQuantity}
                onRemoveItem={handleRemoveItem}
                onApplyCoupon={handleApplyCoupon}
                onProceedToCheckout={handleProceedToCheckout}
                isCollapsed={isOrderCollapsed}
                onToggleCollapse={() => setIsOrderCollapsed(!isOrderCollapsed)}
                estimatedTime={25}
              />
            </div>
          </div>
        </div>

        {/* Mobile Order Summary Bottom Sheet */}
        {orderItems?.length > 0 && (
          <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border shadow-elevated">
            <div className="p-4">
              <Button
                variant="default"
                onClick={handleProceedToCheckout}
                iconName="ShoppingCart"
                iconPosition="left"
                fullWidth
                className="font-semibold"
              >
                Ver Pedido ({orderItems?.length}) - €{orderItems?.reduce((sum, item) => sum + (item?.totalPrice || item?.price * item?.quantity), 0)?.toFixed(2)}
              </Button>
            </div>
          </div>
        )}

        {/* Quick Actions FAB */}
        <div className="fixed bottom-6 right-6 z-40 lg:hidden">
          <div className="flex flex-col space-y-3">
            <Button
              variant="default"
              size="icon"
              iconName="ArrowUp"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="w-12 h-12 rounded-full shadow-elevated"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuAndOrdering;