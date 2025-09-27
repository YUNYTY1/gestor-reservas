import React from 'react';
import Icon from '../../../components/AppIcon';

const MenuCategoryTabs = ({ 
  categories = [], 
  activeCategory, 
  onCategoryChange,
  layout = 'horizontal' 
}) => {
  const categoryIcons = {
    'entrantes': 'Utensils',
    'principales': 'ChefHat',
    'postres': 'Cake',
    'bebidas': 'Coffee'
  };

  if (layout === 'vertical') {
    return (
      <div className="w-64 bg-card border-r border-border h-full overflow-y-auto">
        <div className="p-4 border-b border-border">
          <h2 className="font-semibold text-foreground">Categorías</h2>
        </div>
        <nav className="p-2 space-y-1">
          {categories?.map((category) => (
            <button
              key={category?.id}
              onClick={() => onCategoryChange(category?.id)}
              className={`w-full flex items-center space-x-3 px-3 py-3 rounded-lg text-left transition-smooth ${
                activeCategory === category?.id
                  ? 'bg-primary text-primary-foreground shadow-soft'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              <Icon 
                name={categoryIcons?.[category?.id] || 'Utensils'} 
                size={20} 
                className="flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <div className="font-medium">{category?.name}</div>
                <div className="text-xs opacity-75">
                  {category?.itemCount} platos
                </div>
              </div>
            </button>
          ))}
        </nav>
      </div>
    );
  }

  return (
    <div className="bg-card border-b border-border sticky top-16 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-1 overflow-x-auto scrollbar-hide py-4">
          {categories?.map((category) => (
            <button
              key={category?.id}
              onClick={() => onCategoryChange(category?.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-smooth ${
                activeCategory === category?.id
                  ? 'bg-primary text-primary-foreground shadow-soft'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              <Icon 
                name={categoryIcons?.[category?.id] || 'Utensils'} 
                size={16} 
              />
              <span>{category?.name}</span>
              <span className="text-xs opacity-75">
                ({category?.itemCount})
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MenuCategoryTabs;