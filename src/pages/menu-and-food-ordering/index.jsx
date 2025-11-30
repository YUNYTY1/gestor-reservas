import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import RoleBasedNavigation from '../../components/navigation/RoleBasedNavigation';
import MenuCategoryTabs from './components/MenuCategoryTabs';
import SearchBar from './components/SearchBar';
import MenuFilters from './components/MenuFilters';
import MenuItemCard from './components/MenuItemCard';
import OrderSummaryPanel from './components/OrderSummaryPanel';
import OrderConfirmationModal from './components/OrderConfirmationModal';
import Icon from '../../components/AppIcon';

const MenuAndFoodOrdering = () => {
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState('customer');
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({ dietary: [], priceRange: null });
  const [orderItems, setOrderItems] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('restaurantUser');
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        setUserRole(userData?.role || 'customer');
      } catch (error) {
        console.error('Error parsing user data:', error);
      }
    }
  }, []);

  const categories = [
  { id: 'all', name: 'Todo', icon: 'LayoutGrid', count: 24 },
  { id: 'appetizers', name: 'Entradas', icon: 'Soup', count: 6 },
  { id: 'main', name: 'Platos Principales', icon: 'UtensilsCrossed', count: 10 },
  { id: 'desserts', name: 'Postres', icon: 'IceCream', count: 5 },
  { id: 'beverages', name: 'Bebidas', icon: 'Coffee', count: 3 }];


  const menuItems = [
  {
    id: 1,
    name: 'Ceviche Clásico',
    description: 'Pescado fresco marinado en limón con cebolla morada, ají limo, camote y choclo. Plato emblemático de la costa peruana.',
    price: 45.00,
    originalPrice: null,
    image: "https://images.unsplash.com/photo-1535399831218-d5bd36d1a6b3",
    imageAlt: 'Fresh Peruvian ceviche with white fish chunks marinated in lime juice served with red onions sweet potato and corn on white ceramic plate',
    category: 'appetizers',
    spiceLevel: 'medium',
    prepTime: 15,
    dietary: ['gluten-free'],
    ingredients: 'Pescado blanco, limón, cebolla morada, ají limo, cilantro, camote, choclo',
    isNew: false,
    isPopular: true
  },
  {
    id: 2,
    name: 'Lomo Saltado',
    description: 'Tiras de lomo fino salteadas con cebolla, tomate y ají amarillo, servido con papas fritas y arroz blanco.',
    price: 52.00,
    originalPrice: null,
    image: "https://images.unsplash.com/photo-1657940743533-9d7e78065042",
    imageAlt: 'Traditional Peruvian lomo saltado with tender beef strips stir-fried with onions tomatoes and yellow peppers served with french fries and white rice',
    category: 'main',
    spiceLevel: 'mild',
    prepTime: 25,
    dietary: [],
    ingredients: 'Lomo de res, cebolla, tomate, ají amarillo, papas, arroz, sillao, vinagre',
    isNew: false,
    isPopular: true
  },
  {
    id: 3,
    name: 'Ají de Gallina',
    description: 'Pollo deshilachado en cremosa salsa de ají amarillo con nueces, servido con papas y arroz.',
    price: 38.00,
    originalPrice: null,
    image: "https://images.unsplash.com/photo-1679735386144-7c7a14f7e4a4",
    imageAlt: 'Creamy Peruvian aji de gallina with shredded chicken in yellow pepper sauce garnished with black olives and hard-boiled eggs served with potatoes',
    category: 'main',
    spiceLevel: 'mild',
    prepTime: 30,
    dietary: ['gluten-free'],
    ingredients: 'Pechuga de pollo, ají amarillo, pan, leche, nueces, queso parmesano, papas',
    isNew: false,
    isPopular: false
  },
  {
    id: 4,
    name: 'Anticuchos de Corazón',
    description: 'Brochetas de corazón de res marinadas en especias peruanas, asadas a la parrilla con papas doradas.',
    price: 35.00,
    originalPrice: null,
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1a47b2c58-1764279863517.png",
    imageAlt: 'Grilled Peruvian anticuchos beef heart skewers marinated in spices and vinegar served with golden potatoes and corn on rustic wooden board',
    category: 'appetizers',
    spiceLevel: 'medium',
    prepTime: 20,
    dietary: ['gluten-free'],
    ingredients: 'Corazón de res, ají panca, vinagre, comino, ajo, papas',
    isNew: false,
    isPopular: true
  },
  {
    id: 5,
    name: 'Causa Limeña',
    description: 'Capas de puré de papa amarilla sazonado con limón y ají, relleno de pollo, palta y mayonesa.',
    price: 28.00,
    originalPrice: null,
    image: "https://images.unsplash.com/photo-1640647316836-729fa9eeda4a",
    imageAlt: 'Layered Peruvian causa limena with yellow potato mash seasoned with lime and yellow pepper filled with chicken avocado and mayonnaise garnished with olives',
    category: 'appetizers',
    spiceLevel: 'none',
    prepTime: 15,
    dietary: ['gluten-free'],
    ingredients: 'Papa amarilla, limón, ají amarillo, pollo, palta, mayonesa, aceitunas',
    isNew: false,
    isPopular: false
  },
  {
    id: 6,
    name: 'Arroz con Mariscos',
    description: 'Arroz cremoso cocinado con mariscos frescos, ají amarillo, culantro y especias peruanas.',
    price: 58.00,
    originalPrice: null,
    image: "https://images.unsplash.com/photo-1618820414072-82ac95c6a821",
    imageAlt: 'Peruvian arroz con mariscos creamy rice dish cooked with fresh seafood including shrimp mussels and squid in yellow pepper sauce with cilantro',
    category: 'main',
    spiceLevel: 'mild',
    prepTime: 35,
    dietary: ['gluten-free'],
    ingredients: 'Arroz, camarones, calamares, mejillones, ají amarillo, culantro, vino blanco',
    isNew: true,
    isPopular: false
  },
  {
    id: 7,
    name: 'Rocoto Relleno',
    description: 'Pimiento rocoto relleno de carne molida, pasas y aceitunas, gratinado con queso.',
    price: 42.00,
    originalPrice: null,
    image: "https://images.unsplash.com/photo-1634141613544-001d33883517",
    imageAlt: 'Stuffed Peruvian rocoto pepper filled with seasoned ground beef raisins and olives topped with melted cheese served with potatoes',
    category: 'main',
    spiceLevel: 'hot',
    prepTime: 40,
    dietary: ['gluten-free'],
    ingredients: 'Rocoto, carne molida, cebolla, pasas, aceitunas, queso, huevos',
    isNew: false,
    isPopular: false
  },
  {
    id: 8,
    name: 'Tacu Tacu con Bistec',
    description: 'Mezcla frita de arroz y frijoles servida con bistec jugoso y salsa criolla.',
    price: 48.00,
    originalPrice: null,
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1ee111a05-1764279863540.png",
    imageAlt: 'Traditional Peruvian tacu tacu fried rice and bean cake served with grilled beef steak topped with criolla sauce and fried egg',
    category: 'main',
    spiceLevel: 'none',
    prepTime: 25,
    dietary: ['gluten-free'],
    ingredients: 'Arroz, frijoles, bistec, cebolla, tomate, ají, huevo',
    isNew: false,
    isPopular: false
  },
  {
    id: 9,
    name: 'Papa a la Huancaína',
    description: 'Papas amarillas bañadas en cremosa salsa de ají amarillo con queso fresco.',
    price: 22.00,
    originalPrice: null,
    image: "https://images.unsplash.com/photo-1640647316836-729fa9eeda4a",
    imageAlt: 'Peruvian papa a la huancaina boiled yellow potatoes covered in creamy yellow pepper cheese sauce garnished with black olives and hard-boiled eggs',
    category: 'appetizers',
    spiceLevel: 'mild',
    prepTime: 15,
    dietary: ['vegetarian', 'gluten-free'],
    ingredients: 'Papas amarillas, ají amarillo, queso fresco, leche, galletas, aceitunas, huevos',
    isNew: false,
    isPopular: true
  },
  {
    id: 10,
    name: 'Seco de Cordero',
    description: 'Cordero tierno guisado en salsa de cilantro con cerveza negra, servido con frijoles y arroz.',
    price: 62.00,
    originalPrice: null,
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_13c33acf7-1764279860661.png",
    imageAlt: 'Tender Peruvian seco de cordero lamb stew braised in cilantro sauce with dark beer served with white rice and beans',
    category: 'main',
    spiceLevel: 'none',
    prepTime: 45,
    dietary: ['gluten-free'],
    ingredients: 'Cordero, cilantro, cerveza negra, ají amarillo, frijoles, arroz',
    isNew: false,
    isPopular: false
  },
  {
    id: 11,
    name: 'Suspiro Limeño',
    description: 'Postre tradicional de manjar blanco cubierto con merengue de vino oporto.',
    price: 18.00,
    originalPrice: null,
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_166f78a57-1764279863509.png",
    imageAlt: 'Classic Peruvian suspiro limeno dessert with creamy dulce de leche base topped with port wine meringue and cinnamon powder in glass cup',
    category: 'desserts',
    spiceLevel: 'none',
    prepTime: 10,
    dietary: ['vegetarian', 'gluten-free'],
    ingredients: 'Leche condensada, leche evaporada, yemas, vino oporto, claras, azúcar',
    isNew: false,
    isPopular: true
  },
  {
    id: 12,
    name: 'Mazamorra Morada',
    description: 'Postre de maíz morado con frutas, especias y harina de camote, servido frío.',
    price: 15.00,
    originalPrice: null,
    image: "https://images.unsplash.com/photo-1681569536861-583590cb05d8",
    imageAlt: 'Traditional Peruvian mazamorra morada purple corn pudding with dried fruits pineapple and sweet potato starch served in white bowl',
    category: 'desserts',
    spiceLevel: 'none',
    prepTime: 10,
    dietary: ['vegan', 'gluten-free'],
    ingredients: 'Maíz morado, piña, membrillo, manzana, canela, clavo, harina de camote',
    isNew: false,
    isPopular: false
  },
  {
    id: 13,
    name: 'Picarones',
    description: 'Buñuelos de zapallo y camote fritos, bañados en miel de chancaca.',
    price: 16.00,
    originalPrice: null,
    image: "https://images.unsplash.com/photo-1532213798570-fc0c4f27846b",
    imageAlt: 'Golden fried Peruvian picarones pumpkin and sweet potato donuts drizzled with dark chancaca molasses syrup on white plate',
    category: 'desserts',
    spiceLevel: 'none',
    prepTime: 20,
    dietary: ['vegetarian'],
    ingredients: 'Zapallo, camote, harina, levadura, anís, chancaca, canela',
    isNew: false,
    isPopular: true
  },
  {
    id: 14,
    name: 'Chicha Morada',
    description: 'Bebida refrescante de maíz morado con piña, canela y limón.',
    price: 8.00,
    originalPrice: null,
    image: "https://images.unsplash.com/photo-1650123098203-ec1ba6940d07",
    imageAlt: 'Refreshing Peruvian chicha morada purple corn drink with pineapple cinnamon and lime served in tall glass with ice and fruit garnish',
    category: 'beverages',
    spiceLevel: 'none',
    prepTime: 5,
    dietary: ['vegan', 'gluten-free'],
    ingredients: 'Maíz morado, piña, canela, clavo, limón, azúcar',
    isNew: false,
    isPopular: true
  },
  {
    id: 15,
    name: 'Pisco Sour',
    description: 'Cóctel nacional peruano con pisco, limón, jarabe, clara de huevo y amargo de angostura.',
    price: 25.00,
    originalPrice: null,
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1e43e9680-1764279862669.png",
    imageAlt: 'Classic Peruvian pisco sour cocktail with pisco brandy lime juice simple syrup egg white foam and angostura bitters in coupe glass',
    category: 'beverages',
    spiceLevel: 'none',
    prepTime: 5,
    dietary: ['gluten-free'],
    ingredients: 'Pisco, limón, jarabe de goma, clara de huevo, amargo de angostura, hielo',
    isNew: false,
    isPopular: true
  },
  {
    id: 16,
    name: 'Inca Kola',
    description: 'Gaseosa dorada de sabor único, bebida nacional del Perú.',
    price: 6.00,
    originalPrice: null,
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_169b3b206-1764279863453.png",
    imageAlt: 'Golden Inca Kola soda Perus national soft drink with unique sweet flavor served in glass bottle with condensation',
    category: 'beverages',
    spiceLevel: 'none',
    prepTime: 2,
    dietary: ['vegan', 'gluten-free'],
    ingredients: 'Agua carbonatada, azúcar, saborizantes naturales',
    isNew: false,
    isPopular: false
  },
  {
    id: 17,
    name: 'Arroz con Leche',
    description: 'Postre cremoso de arroz cocido en leche con canela y pasas.',
    price: 14.00,
    originalPrice: null,
    image: "https://images.unsplash.com/photo-1558521700-4e77959a5275",
    imageAlt: 'Creamy Peruvian arroz con leche rice pudding cooked in milk with cinnamon sticks raisins and condensed milk served in ceramic bowl',
    category: 'desserts',
    spiceLevel: 'none',
    prepTime: 10,
    dietary: ['vegetarian', 'gluten-free'],
    ingredients: 'Arroz, leche, leche condensada, canela, pasas, vainilla',
    isNew: false,
    isPopular: false
  },
  {
    id: 18,
    name: 'Turrón de Doña Pepa',
    description: 'Postre tradicional de octubre con capas de masa anisada y miel de frutas.',
    price: 20.00,
    originalPrice: null,
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_13ce05e86-1764279861822.png",
    imageAlt: 'Traditional Peruvian turron de dona pepa October dessert with layers of anise-flavored dough covered in fruit molasses syrup and colorful sprinkles',
    category: 'desserts',
    spiceLevel: 'none',
    prepTime: 10,
    dietary: ['vegetarian'],
    ingredients: 'Harina, manteca, anís, chancaca, frutas secas, grageas',
    isNew: false,
    isPopular: false
  },
  {
    id: 19,
    name: 'Tiradito de Pescado',
    description: 'Finas láminas de pescado fresco con salsa de ají amarillo y limón.',
    price: 48.00,
    originalPrice: null,
    image: "https://images.unsplash.com/photo-1526333319455-e4766d5169fb",
    imageAlt: 'Elegant Peruvian tiradito thin slices of fresh white fish in yellow pepper lime sauce garnished with microgreens on white rectangular plate',
    category: 'appetizers',
    spiceLevel: 'medium',
    prepTime: 15,
    dietary: ['gluten-free'],
    ingredients: 'Pescado blanco, ají amarillo, limón, ajo, jengibre, aceite de oliva',
    isNew: true,
    isPopular: false
  },
  {
    id: 20,
    name: 'Chupe de Camarones',
    description: 'Sopa cremosa de camarones con papas, huevo, queso y leche.',
    price: 55.00,
    originalPrice: null,
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1fbb99c35-1764279863533.png",
    imageAlt: 'Rich Peruvian chupe de camarones shrimp chowder with potatoes poached egg melted cheese and evaporated milk in ceramic bowl',
    category: 'main',
    spiceLevel: 'mild',
    prepTime: 35,
    dietary: ['gluten-free'],
    ingredients: 'Camarones, papas, huevos, queso, leche evaporada, ají panca, arroz',
    isNew: false,
    isPopular: false
  },
  {
    id: 21,
    name: 'Pollo a la Brasa',
    description: 'Pollo entero marinado en especias peruanas, asado a la leña con papas fritas.',
    price: 65.00,
    originalPrice: 75.00,
    image: "https://images.unsplash.com/photo-1613140413850-60b0edad1d3b",
    imageAlt: 'Golden rotisserie Peruvian pollo a la brasa whole chicken marinated in Peruvian spices roasted over charcoal served with french fries and green sauce',
    category: 'main',
    spiceLevel: 'mild',
    prepTime: 40,
    dietary: ['gluten-free'],
    ingredients: 'Pollo entero, ají panca, comino, ajo, cerveza, papas, ensalada',
    isNew: false,
    isPopular: true
  },
  {
    id: 22,
    name: 'Carapulcra con Sopa Seca',
    description: 'Papa seca guisada con cerdo y maní, acompañada de fideos con albahaca.',
    price: 46.00,
    originalPrice: null,
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_16942c7ae-1764279865053.png",
    imageAlt: 'Traditional Peruvian carapulcra dried potato stew with pork and peanuts served alongside sopa seca pasta with basil sauce',
    category: 'main',
    spiceLevel: 'mild',
    prepTime: 45,
    dietary: [],
    ingredients: 'Papa seca, cerdo, maní, ají panca, fideos, albahaca, tomate',
    isNew: false,
    isPopular: false
  },
  {
    id: 23,
    name: 'Solterito Arequipeño',
    description: 'Ensalada fresca de habas, choclo, tomate, cebolla y queso fresco.',
    price: 24.00,
    originalPrice: null,
    image: "https://images.unsplash.com/photo-1535923633864-cbf229ad891c",
    imageAlt: 'Fresh Peruvian solterito arequipeno salad with fava beans corn tomatoes red onions and white cheese dressed in lime vinaigrette',
    category: 'appetizers',
    spiceLevel: 'none',
    prepTime: 10,
    dietary: ['vegetarian', 'gluten-free'],
    ingredients: 'Habas, choclo, tomate, cebolla, queso fresco, aceitunas, rocoto',
    isNew: false,
    isPopular: false
  },
  {
    id: 24,
    name: 'Juane',
    description: 'Arroz con pollo envuelto en hojas de bijao, especialidad de la selva peruana.',
    price: 38.00,
    originalPrice: null,
    image: "https://images.unsplash.com/photo-1713860712418-3b1848986653",
    imageAlt: 'Traditional Peruvian juane rice with chicken wrapped in bijao leaves specialty from Amazon rainforest served unwrapped on banana leaf',
    category: 'main',
    spiceLevel: 'mild',
    prepTime: 30,
    dietary: ['gluten-free'],
    ingredients: 'Arroz, pollo, huevo, aceitunas, hojas de bijao, comino, ajo',
    isNew: true,
    isPopular: false
  }];


  const filteredItems = menuItems?.filter((item) => {
    const matchesCategory = activeCategory === 'all' || item?.category === activeCategory;
    const matchesSearch = item?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
    item?.description?.toLowerCase()?.includes(searchTerm?.toLowerCase());

    const matchesDietary = filters?.dietary?.length === 0 ||
    filters?.dietary?.every((diet) => item?.dietary?.includes(diet));

    let matchesPrice = true;
    if (filters?.priceRange) {
      const ranges = {
        budget: { min: 10, max: 30 },
        moderate: { min: 31, max: 60 },
        premium: { min: 61, max: 999 }
      };
      const range = ranges?.[filters?.priceRange];
      matchesPrice = item?.price >= range?.min && item?.price <= range?.max;
    }

    return matchesCategory && matchesSearch && matchesDietary && matchesPrice;
  });

  const handleAddToOrder = (item) => {
    const existingItem = orderItems?.find((orderItem) => orderItem?.id === item?.id);
    if (existingItem) {
      setOrderItems(orderItems?.map((orderItem) =>
      orderItem?.id === item?.id ?
      { ...orderItem, quantity: orderItem?.quantity + item?.quantity } :
      orderItem
      ));
    } else {
      setOrderItems([...orderItems, item]);
    }
  };

  const handleUpdateQuantity = (itemId, newQuantity) => {
    if (newQuantity <= 0) {
      handleRemoveItem(itemId);
    } else {
      setOrderItems(orderItems?.map((item) =>
      item?.id === itemId ? { ...item, quantity: newQuantity } : item
      ));
    }
  };

  const handleRemoveItem = (itemId) => {
    setOrderItems(orderItems?.filter((item) => item?.id !== itemId));
  };

  const handleCheckout = (specialInstructions) => {
    const subtotal = orderItems?.reduce((sum, item) => sum + item?.price * item?.quantity, 0);
    const tax = subtotal * 0.18;
    const total = subtotal + tax;
    const estimatedTime = Math.max(...orderItems?.map((item) => item?.prepTime), 0);

    const storedUser = localStorage.getItem('restaurantUser');
    let userEmail = 'cliente@VikingoGrill.com';
    let tableNumber = null;

    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        userEmail = userData?.email;
        tableNumber = userData?.tableNumber || null;
      } catch (error) {
        console.error('Error parsing user data:', error);
      }
    }

    const orderNumber = `ORD${Date.now()?.toString()?.slice(-8)}`;

    setOrderDetails({
      orderNumber,
      total,
      estimatedTime,
      email: userEmail,
      tableNumber,
      items: orderItems,
      specialInstructions
    });

    setShowConfirmation(true);
    setOrderItems([]);
  };

  const handleLogout = () => {
    localStorage.removeItem('restaurantUser');
    navigate('/customer-registration');
  };

  return (
    <div className="min-h-screen bg-background">
      <RoleBasedNavigation userRole={userRole} onLogout={handleLogout} />
      <main className="pt-16">
        <div className="bg-gradient-to-r from-primary/10 to-accent/10 border-b border-border">
          <div className="max-w-7xl mx-auto px-4 py-8 lg:px-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <Icon name="UtensilsCrossed" size={24} color="var(--color-primary)" />
              </div>
              <div>
                <h1 className="text-3xl font-heading font-bold text-foreground">
                  Menú 
                </h1>
                <p className="text-sm text-muted-foreground">
                  Descubre los auténticos sabores del Perú
                </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-3">
              <div className="flex-1">
                <SearchBar
                  onSearch={setSearchTerm}
                  placeholder="Buscar platillos, ingredientes..." />

              </div>
              <MenuFilters
                onFilterChange={setFilters}
                activeFilters={filters} />

            </div>
          </div>
        </div>

        <MenuCategoryTabs
          categories={categories}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory} />


        <div className="max-w-7xl mx-auto px-4 py-6 lg:px-6">
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="flex-1">
              {filteredItems?.length === 0 ?
              <div className="flex flex-col items-center justify-center py-16 text-center">
                  <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
                    <Icon name="Search" size={32} color="var(--color-muted-foreground)" />
                  </div>
                  <h3 className="text-xl font-heading font-semibold text-foreground mb-2">
                    No se encontraron platillos
                  </h3>
                  <p className="text-sm text-muted-foreground max-w-md">
                    Intenta ajustar tus filtros o buscar con otros términos
                  </p>
                </div> :

              <>
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-sm text-muted-foreground">
                      {filteredItems?.length} platillo{filteredItems?.length !== 1 ? 's' : ''} encontrado{filteredItems?.length !== 1 ? 's' : ''}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {filteredItems?.map((item) =>
                  <MenuItemCard
                    key={item?.id}
                    item={item}
                    onAddToOrder={handleAddToOrder} />

                  )}
                  </div>
                </>
              }
            </div>

            <div className="lg:w-96">
              <OrderSummaryPanel
                orderItems={orderItems}
                onUpdateQuantity={handleUpdateQuantity}
                onRemoveItem={handleRemoveItem}
                onCheckout={handleCheckout} />

            </div>
          </div>
        </div>
      </main>
      <OrderConfirmationModal
        isOpen={showConfirmation}
        onClose={() => setShowConfirmation(false)}
        orderDetails={orderDetails} />

    </div>);

};

export default MenuAndFoodOrdering;