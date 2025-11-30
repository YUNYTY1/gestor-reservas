import { useState } from 'react';
import Icon from '../../../components/AppIcon';

const MenuCategoryTabs = ({ categories, activeCategory, onCategoryChange }) => {
  const [showAll, setShowAll] = useState(false);

  const visibleCategories = showAll ? categories : categories?.slice(0, 4);
  const hasMore = categories?.length > 4;

  return (
    <div className="bg-card border-b border-border shadow-warm">
      <div className="px-4 py-4 lg:px-6">
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide">
          {visibleCategories?.map((category) => (
            <button
              key={category?.id}
              onClick={() => onCategoryChange(category?.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg whitespace-nowrap transition-quick ${
                activeCategory === category?.id
                  ? 'bg-primary text-primary-foreground shadow-warm'
                  : 'bg-muted text-foreground hover:bg-muted/80'
              }`}
            >
              <Icon name={category?.icon} size={18} />
              <span className="font-semibold text-sm">{category?.name}</span>
              <span className="text-xs opacity-75">({category?.count})</span>
            </button>
          ))}
          {hasMore && (
            <button
              onClick={() => setShowAll(!showAll)}
              className="flex items-center gap-1 px-3 py-2.5 rounded-lg bg-muted text-foreground hover:bg-muted/80 transition-quick"
            >
              <Icon name={showAll ? 'ChevronUp' : 'ChevronDown'} size={16} />
              <span className="text-xs font-medium">{showAll ? 'Menos' : 'Más'}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MenuCategoryTabs;