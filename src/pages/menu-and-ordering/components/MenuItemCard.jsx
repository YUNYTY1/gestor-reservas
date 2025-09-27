import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const MenuItemCard = ({ 
  item = {}, 
  onAddToOrder,
  onCustomize 
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [specialInstructions, setSpecialInstructions] = useState('');

  const dietaryIcons = {
    vegetarian: { icon: 'Leaf', color: 'text-green-600' },
    vegan: { icon: 'Sprout', color: 'text-green-700' },
    'gluten-free': { icon: 'Wheat', color: 'text-amber-600' },
    spicy: { icon: 'Flame', color: 'text-red-500' },
    'dairy-free': { icon: 'Milk', color: 'text-blue-600' }
  };

  const handleAddToOrder = () => {
    const orderItem = {
      ...item,
      quantity,
      selectedOptions,
      specialInstructions,
      totalPrice: calculateTotalPrice()
    };
    onAddToOrder(orderItem);
    
    // Reset form
    setQuantity(1);
    setSelectedOptions({});
    setSpecialInstructions('');
    setIsExpanded(false);
  };

  const calculateTotalPrice = () => {
    let basePrice = item?.price || 0;
    let optionsPrice = 0;
    
    Object.values(selectedOptions)?.forEach(option => {
      if (option && option?.price) {
        optionsPrice += option?.price;
      }
    });
    
    return (basePrice + optionsPrice) * quantity;
  };

  const handleOptionChange = (categoryId, option) => {
    setSelectedOptions(prev => ({
      ...prev,
      [categoryId]: option
    }));
  };

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden shadow-soft hover:shadow-elevated transition-smooth">
      {/* Item Image */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={item?.image || `https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop`}
          alt={item?.name || 'Plato del menú'}
          className="w-full h-full object-cover"
        />
        
        {/* Dietary Indicators */}
        {item?.dietary && item?.dietary?.length > 0 && (
          <div className="absolute top-2 left-2 flex space-x-1">
            {item?.dietary?.map((diet) => {
              const config = dietaryIcons?.[diet];
              if (!config) return null;
              
              return (
                <div
                  key={diet}
                  className="w-6 h-6 bg-white/90 rounded-full flex items-center justify-center"
                  title={diet}
                >
                  <Icon 
                    name={config?.icon} 
                    size={14} 
                    className={config?.color} 
                  />
                </div>
              );
            })}
          </div>
        )}

        {/* Popular Badge */}
        {item?.isPopular && (
          <div className="absolute top-2 right-2 bg-accent text-accent-foreground text-xs px-2 py-1 rounded-full font-medium">
            Popular
          </div>
        )}
      </div>
      {/* Item Details */}
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold text-foreground text-lg">
            {item?.name || 'Nombre del plato'}
          </h3>
          <span className="text-lg font-bold text-primary ml-2">
            €{(item?.price || 0)?.toFixed(2)}
          </span>
        </div>

        <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
          {item?.description || 'Descripción del plato no disponible.'}
        </p>

        {/* Preparation Time */}
        {item?.prepTime && (
          <div className="flex items-center space-x-1 text-xs text-muted-foreground mb-3">
            <Icon name="Clock" size={14} />
            <span>{item?.prepTime} min</span>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center space-x-2">
          {item?.customizable && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              iconName={isExpanded ? 'ChevronUp' : 'Settings'}
              iconPosition="left"
              className="flex-1"
            >
              {isExpanded ? 'Cerrar' : 'Personalizar'}
            </Button>
          )}
          
          <Button
            variant="default"
            size="sm"
            onClick={item?.customizable && !isExpanded ? () => setIsExpanded(true) : handleAddToOrder}
            iconName="Plus"
            iconPosition="left"
            className={item?.customizable && !isExpanded ? 'flex-1' : 'flex-1'}
          >
            Añadir €{calculateTotalPrice()?.toFixed(2)}
          </Button>
        </div>
      </div>
      {/* Customization Panel */}
      {isExpanded && item?.customizable && (
        <div className="border-t border-border p-4 bg-muted/30">
          <h4 className="font-medium text-foreground mb-4">Personalizar pedido</h4>
          
          {/* Quantity Selector */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-foreground mb-2">
              Cantidad
            </label>
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                size="sm"
                iconName="Minus"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                disabled={quantity <= 1}
                className="w-8 h-8 p-0"
              />
              <span className="font-medium text-foreground min-w-[2rem] text-center">
                {quantity}
              </span>
              <Button
                variant="outline"
                size="sm"
                iconName="Plus"
                onClick={() => setQuantity(quantity + 1)}
                className="w-8 h-8 p-0"
              />
            </div>
          </div>

          {/* Customization Options */}
          {item?.customizationOptions && item?.customizationOptions?.map((category) => (
            <div key={category?.id} className="mb-4">
              <label className="block text-sm font-medium text-foreground mb-2">
                {category?.name}
                {category?.required && <span className="text-error ml-1">*</span>}
              </label>
              <div className="space-y-2">
                {category?.options?.map((option) => (
                  <label
                    key={option?.id}
                    className="flex items-center space-x-2 cursor-pointer"
                  >
                    <input
                      type={category?.type === 'single' ? 'radio' : 'checkbox'}
                      name={category?.id}
                      value={option?.id}
                      checked={
                        category?.type === 'single'
                          ? selectedOptions?.[category?.id]?.id === option?.id
                          : selectedOptions?.[category?.id]?.includes?.(option?.id)
                      }
                      onChange={() => handleOptionChange(category?.id, option)}
                      className="w-4 h-4 text-primary border-border focus:ring-ring"
                    />
                    <span className="text-sm text-foreground flex-1">
                      {option?.name}
                    </span>
                    {option?.price > 0 && (
                      <span className="text-sm text-muted-foreground">
                        +€{option?.price?.toFixed(2)}
                      </span>
                    )}
                  </label>
                ))}
              </div>
            </div>
          ))}

          {/* Special Instructions */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-foreground mb-2">
              Instrucciones especiales
            </label>
            <textarea
              value={specialInstructions}
              onChange={(e) => setSpecialInstructions(e?.target?.value)}
              placeholder="Ej: Sin cebolla, poco picante..."
              rows={3}
              className="w-full px-3 py-2 border border-border rounded-lg bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
            />
          </div>

          {/* Add to Order Button */}
          <Button
            variant="default"
            onClick={handleAddToOrder}
            iconName="Plus"
            iconPosition="left"
            fullWidth
          >
            Añadir al pedido - €{calculateTotalPrice()?.toFixed(2)}
          </Button>
        </div>
      )}
    </div>
  );
};

export default MenuItemCard;