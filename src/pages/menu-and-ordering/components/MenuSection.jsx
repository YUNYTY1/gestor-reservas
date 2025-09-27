import React from 'react';
import MenuItemCard from './MenuItemCard';

const MenuSection = ({ 
  category = {}, 
  items = [], 
  onAddToOrder,
  searchQuery = '',
  filters = {}
}) => {
  const filterItems = (items) => {
    return items?.filter(item => {
      // Search filter
      if (searchQuery && !item?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase())) {
        return false;
      }
      
      // Price range filter
      if (filters?.priceRange && filters?.priceRange !== 'all') {
        const [min, max] = filters?.priceRange?.split('-')?.map(p => p?.replace('+', ''));
        const price = item?.price || 0;
        
        if (max) {
          if (price < parseInt(min) || price > parseInt(max)) return false;
        } else {
          if (price < parseInt(min)) return false;
        }
      }
      
      // Dietary filters
      if (filters?.dietary && filters?.dietary?.length > 0) {
        const hasMatchingDietary = filters?.dietary?.some(diet => 
          item?.dietary && item?.dietary?.includes(diet)
        );
        if (!hasMatchingDietary) return false;
      }
      
      return true;
    });
  };

  const sortItems = (items) => {
    const sortBy = filters?.sortBy || 'popularity';
    
    return [...items]?.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return (a?.price || 0) - (b?.price || 0);
        case 'price-high':
          return (b?.price || 0) - (a?.price || 0);
        case 'name':
          return a?.name?.localeCompare(b?.name);
        case 'popularity':
        default:
          // Popular items first, then by name
          if (a?.isPopular && !b?.isPopular) return -1;
          if (!a?.isPopular && b?.isPopular) return 1;
          return a?.name?.localeCompare(b?.name);
      }
    });
  };

  const filteredAndSortedItems = sortItems(filterItems(items));

  if (filteredAndSortedItems?.length === 0) {
    return null;
  }

  return (
    <section id={`category-${category?.id}`} className="mb-12">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-foreground mb-2">
          {category?.name}
        </h2>
        {category?.description && (
          <p className="text-muted-foreground">
            {category?.description}
          </p>
        )}
        <div className="text-sm text-muted-foreground mt-1">
          {filteredAndSortedItems?.length} plato{filteredAndSortedItems?.length !== 1 ? 's' : ''} disponible{filteredAndSortedItems?.length !== 1 ? 's' : ''}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredAndSortedItems?.map((item) => (
          <MenuItemCard
            key={item?.id}
            item={item}
            onAddToOrder={onAddToOrder}
          />
        ))}
      </div>
    </section>
  );
};

export default MenuSection;