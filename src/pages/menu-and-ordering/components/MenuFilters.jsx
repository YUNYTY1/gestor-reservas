import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const MenuFilters = ({ 
  filters = {}, 
  onFiltersChange,
  isOpen = false,
  onToggle 
}) => {
  const [localFilters, setLocalFilters] = useState(filters);

  const priceRangeOptions = [
    { value: 'all', label: 'Todos los precios' },
    { value: '0-15', label: '€0 - €15' },
    { value: '15-25', label: '€15 - €25' },
    { value: '25-35', label: '€25 - €35' },
    { value: '35+', label: '€35+' }
  ];

  const sortOptions = [
    { value: 'popularity', label: 'Más populares' },
    { value: 'price-low', label: 'Precio: menor a mayor' },
    { value: 'price-high', label: 'Precio: mayor a menor' },
    { value: 'name', label: 'Nombre A-Z' }
  ];

  const dietaryOptions = [
    { id: 'vegetarian', label: 'Vegetariano', icon: 'Leaf' },
    { id: 'vegan', label: 'Vegano', icon: 'Sprout' },
    { id: 'gluten-free', label: 'Sin gluten', icon: 'Wheat' },
    { id: 'spicy', label: 'Picante', icon: 'Flame' },
    { id: 'dairy-free', label: 'Sin lácteos', icon: 'Milk' }
  ];

  const handleFilterChange = (key, value) => {
    const newFilters = { ...localFilters, [key]: value };
    setLocalFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const handleDietaryChange = (dietaryId, checked) => {
    const currentDietary = localFilters?.dietary || [];
    const newDietary = checked
      ? [...currentDietary, dietaryId]
      : currentDietary?.filter(id => id !== dietaryId);
    
    handleFilterChange('dietary', newDietary);
  };

  const clearAllFilters = () => {
    const clearedFilters = {
      priceRange: 'all',
      sortBy: 'popularity',
      dietary: [],
      searchQuery: ''
    };
    setLocalFilters(clearedFilters);
    onFiltersChange(clearedFilters);
  };

  const activeFilterCount = Object.values(localFilters)?.filter(value => {
    if (Array.isArray(value)) return value?.length > 0;
    if (typeof value === 'string') return value !== 'all' && value !== 'popularity' && value !== '';
    return false;
  })?.length;

  return (
    <>
      {/* Mobile Filter Toggle */}
      <div className="lg:hidden mb-4">
        <Button
          variant="outline"
          onClick={onToggle}
          iconName="Filter"
          iconPosition="left"
          className="w-full justify-center"
        >
          Filtros
          {activeFilterCount > 0 && (
            <span className="ml-2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
              {activeFilterCount}
            </span>
          )}
        </Button>
      </div>
      {/* Filter Panel */}
      <div className={`bg-card border border-border rounded-lg transition-smooth ${
        isOpen ? 'block' : 'hidden lg:block'
      }`}>
        <div className="p-4 border-b border-border">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-foreground">Filtros</h3>
            {activeFilterCount > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearAllFilters}
                className="text-xs"
              >
                Limpiar todo
              </Button>
            )}
          </div>
        </div>

        <div className="p-4 space-y-6">
          {/* Search */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Buscar platos
            </label>
            <div className="relative">
              <Icon 
                name="Search" 
                size={16} 
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
              />
              <input
                type="text"
                placeholder="Buscar por nombre..."
                value={localFilters?.searchQuery || ''}
                onChange={(e) => handleFilterChange('searchQuery', e?.target?.value)}
                className="w-full pl-10 pr-4 py-2 border border-border rounded-lg bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
          </div>

          {/* Price Range */}
          <div>
            <Select
              label="Rango de precios"
              options={priceRangeOptions}
              value={localFilters?.priceRange || 'all'}
              onChange={(value) => handleFilterChange('priceRange', value)}
            />
          </div>

          {/* Sort By */}
          <div>
            <Select
              label="Ordenar por"
              options={sortOptions}
              value={localFilters?.sortBy || 'popularity'}
              onChange={(value) => handleFilterChange('sortBy', value)}
            />
          </div>

          {/* Dietary Restrictions */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-3">
              Restricciones dietéticas
            </label>
            <div className="space-y-3">
              {dietaryOptions?.map((option) => (
                <Checkbox
                  key={option?.id}
                  label={
                    <div className="flex items-center space-x-2">
                      <Icon name={option?.icon} size={16} />
                      <span>{option?.label}</span>
                    </div>
                  }
                  checked={(localFilters?.dietary || [])?.includes(option?.id)}
                  onChange={(e) => handleDietaryChange(option?.id, e?.target?.checked)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MenuFilters;