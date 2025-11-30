import { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';

const MenuFilters = ({ onFilterChange, activeFilters }) => {
  const [isOpen, setIsOpen] = useState(false);

  const dietaryOptions = [
    { id: 'vegetarian', label: 'Vegetariano', icon: 'Leaf' },
    { id: 'vegan', label: 'Vegano', icon: 'Sprout' },
    { id: 'gluten-free', label: 'Sin Gluten', icon: 'WheatOff' },
    { id: 'spicy', label: 'Picante', icon: 'Flame' },
  ];

  const priceRanges = [
    { id: 'budget', label: 'Económico (S/ 10-30)', min: 10, max: 30 },
    { id: 'moderate', label: 'Moderado (S/ 31-60)', min: 31, max: 60 },
    { id: 'premium', label: 'Premium (S/ 61+)', min: 61, max: 999 },
  ];

  const handleDietaryToggle = (id) => {
    const newDietary = activeFilters?.dietary?.includes(id)
      ? activeFilters?.dietary?.filter(d => d !== id)
      : [...activeFilters?.dietary, id];
    onFilterChange({ ...activeFilters, dietary: newDietary });
  };

  const handlePriceToggle = (id) => {
    onFilterChange({ 
      ...activeFilters, 
      priceRange: activeFilters?.priceRange === id ? null : id 
    });
  };

  const clearFilters = () => {
    onFilterChange({ dietary: [], priceRange: null });
  };

  const activeCount = activeFilters?.dietary?.length + (activeFilters?.priceRange ? 1 : 0);

  return (
    <div className="relative">
      <Button
        variant="outline"
        size="sm"
        iconName="Filter"
        iconPosition="left"
        onClick={() => setIsOpen(!isOpen)}
      >
        Filtros {activeCount > 0 && `(${activeCount})`}
      </Button>
      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 top-full mt-2 w-80 bg-card border border-border rounded-lg shadow-warm-lg z-50 p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-heading font-semibold text-foreground">Filtros</h3>
              {activeCount > 0 && (
                <button
                  onClick={clearFilters}
                  className="text-xs text-primary hover:text-primary/80 font-medium"
                >
                  Limpiar todo
                </button>
              )}
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-semibold text-foreground mb-3">Opciones Dietéticas</h4>
                <div className="space-y-2">
                  {dietaryOptions?.map((option) => (
                    <Checkbox
                      key={option?.id}
                      label={
                        <div className="flex items-center gap-2">
                          <Icon name={option?.icon} size={16} />
                          <span>{option?.label}</span>
                        </div>
                      }
                      checked={activeFilters?.dietary?.includes(option?.id)}
                      onChange={() => handleDietaryToggle(option?.id)}
                    />
                  ))}
                </div>
              </div>

              <div className="border-t border-border pt-4">
                <h4 className="text-sm font-semibold text-foreground mb-3">Rango de Precio</h4>
                <div className="space-y-2">
                  {priceRanges?.map((range) => (
                    <Checkbox
                      key={range?.id}
                      label={range?.label}
                      checked={activeFilters?.priceRange === range?.id}
                      onChange={() => handlePriceToggle(range?.id)}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-border">
              <Button
                variant="default"
                size="sm"
                fullWidth
                onClick={() => setIsOpen(false)}
              >
                Aplicar Filtros
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default MenuFilters;