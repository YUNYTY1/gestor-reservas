import { useState } from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const MenuItemCard = ({ item, onAddToOrder }) => {
  const [quantity, setQuantity] = useState(1);
  const [showDetails, setShowDetails] = useState(false);

  const spiceLevels = {
    none: { icon: 'Circle', color: 'text-muted-foreground', label: 'No Picante' },
    mild: { icon: 'Flame', color: 'text-warning', label: 'Suave' },
    medium: { icon: 'Flame', color: 'text-warning', label: 'Medio' },
    hot: { icon: 'Flame', color: 'text-error', label: 'Picante' },
  };

  const spiceLevel = spiceLevels?.[item?.spiceLevel] || spiceLevels?.none;

  const handleQuantityChange = (delta) => {
    const newQuantity = Math.max(1, Math.min(10, quantity + delta));
    setQuantity(newQuantity);
  };

  const handleAddToOrder = () => {
    onAddToOrder({ ...item, quantity });
    setQuantity(1);
  };

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden shadow-warm hover:shadow-warm-md transition-smooth">
      <div className="relative h-48 overflow-hidden">
        <Image
          src={item?.image}
          alt={item?.imageAlt}
          className="w-full h-full object-cover"
        />
        {item?.isNew && (
          <div className="absolute top-3 left-3 bg-accent text-accent-foreground px-3 py-1 rounded-full text-xs font-semibold">
            Nuevo
          </div>
        )}
        {item?.isPopular && (
          <div className="absolute top-3 right-3 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
            <Icon name="TrendingUp" size={12} />
            Popular
          </div>
        )}
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-heading font-semibold text-foreground text-lg">{item?.name}</h3>
          <div className="flex items-center gap-1">
            {item?.dietary?.map((diet) => (
              <div
                key={diet}
                className="w-6 h-6 rounded-full bg-success/10 flex items-center justify-center"
                title={diet}
              >
                <Icon
                  name={diet === 'vegetarian' ? 'Leaf' : diet === 'vegan' ? 'Sprout' : 'WheatOff'}
                  size={14}
                  color="var(--color-success)"
                />
              </div>
            ))}
          </div>
        </div>

        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{item?.description}</p>

        <div className="flex items-center gap-3 mb-3">
          <div className="flex items-center gap-1">
            <Icon name={spiceLevel?.icon} size={16} className={spiceLevel?.color} />
            <span className="text-xs text-muted-foreground">{spiceLevel?.label}</span>
          </div>
          <div className="flex items-center gap-1">
            <Icon name="Clock" size={16} color="var(--color-muted-foreground)" />
            <span className="text-xs text-muted-foreground">{item?.prepTime} min</span>
          </div>
        </div>

        <button
          onClick={() => setShowDetails(!showDetails)}
          className="text-xs text-primary hover:text-primary/80 font-medium mb-3 flex items-center gap-1"
        >
          {showDetails ? 'Ocultar' : 'Ver'} ingredientes
          <Icon name={showDetails ? 'ChevronUp' : 'ChevronDown'} size={14} />
        </button>

        {showDetails && (
          <div className="mb-3 p-3 bg-muted rounded-lg">
            <p className="text-xs text-muted-foreground">{item?.ingredients}</p>
          </div>
        )}

        <div className="flex items-center justify-between pt-3 border-t border-border">
          <div>
            <div className="text-2xl font-heading font-bold text-primary">
              S/ {item?.price?.toFixed(2)}
            </div>
            {item?.originalPrice && (
              <div className="text-xs text-muted-foreground line-through">
                S/ {item?.originalPrice?.toFixed(2)}
              </div>
            )}
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 bg-muted rounded-lg">
              <button
                onClick={() => handleQuantityChange(-1)}
                className="w-8 h-8 flex items-center justify-center hover:bg-muted/80 rounded-l-lg transition-quick"
                disabled={quantity <= 1}
              >
                <Icon name="Minus" size={16} />
              </button>
              <span className="w-8 text-center font-semibold text-sm">{quantity}</span>
              <button
                onClick={() => handleQuantityChange(1)}
                className="w-8 h-8 flex items-center justify-center hover:bg-muted/80 rounded-r-lg transition-quick"
                disabled={quantity >= 10}
              >
                <Icon name="Plus" size={16} />
              </button>
            </div>

            <Button
              variant="default"
              size="sm"
              iconName="ShoppingCart"
              iconPosition="left"
              onClick={handleAddToOrder}
            >
              Agregar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuItemCard;