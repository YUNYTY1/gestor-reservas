import { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Image from '../../../components/AppImage';

const MenuAdministration = ({ menuItems, onEdit, onToggleAvailability, onDelete }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('es-PE', {
      style: 'currency',
      currency: 'PEN',
      minimumFractionDigits: 2
    })?.format(amount);
  };

  const categories = ['all', 'entradas', 'principales', 'postres', 'bebidas'];

  const getCategoryLabel = (category) => {
    switch(category) {
      case 'all': return 'Todos';
      case 'entradas': return 'Entradas';
      case 'principales': return 'Platos Principales';
      case 'postres': return 'Postres';
      case 'bebidas': return 'Bebidas';
      default: return category;
    }
  };

  const filteredItems = menuItems?.filter(item => {
    const matchesSearch = item?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
                         item?.description?.toLowerCase()?.includes(searchTerm?.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || item?.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="bg-card rounded-lg border border-border shadow-warm">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-heading font-semibold text-foreground">
            Administración de Menú
          </h3>
          <Button
            variant="default"
            size="sm"
            iconName="Plus"
            iconPosition="left"
            onClick={() => onEdit(null)}
          >
            Nuevo Plato
          </Button>
        </div>

        <div className="space-y-4">
          <Input
            type="search"
            placeholder="Buscar platos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e?.target?.value)}
          />

          <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide">
            {categories?.map((category) => (
              <button
                key={category}
                onClick={() => setCategoryFilter(category)}
                className={`px-4 py-2 rounded-lg whitespace-nowrap transition-smooth text-sm font-medium ${
                  categoryFilter === category
                    ? 'bg-primary text-primary-foreground shadow-warm'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
              >
                {getCategoryLabel(category)}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="p-6">
        {filteredItems?.length === 0 ? (
          <div className="text-center py-12">
            <Icon name="UtensilsCrossed" size={48} color="var(--color-muted-foreground)" className="mx-auto mb-4" />
            <p className="text-muted-foreground">No se encontraron platos</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredItems?.map((item) => (
              <div 
                key={item?.id}
                className="bg-background rounded-lg border border-border overflow-hidden hover:shadow-warm transition-smooth"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={item?.image}
                    alt={item?.imageAlt}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2">
                    <button
                      onClick={() => onToggleAvailability(item?.id)}
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        item?.available
                          ? 'bg-success text-success-foreground'
                          : 'bg-error text-error-foreground'
                      }`}
                    >
                      {item?.available ? 'Disponible' : 'No Disponible'}
                    </button>
                  </div>
                </div>

                <div className="p-4">
                  <div className="mb-3">
                    <h4 className="font-semibold text-foreground mb-1">{item?.name}</h4>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {item?.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-heading font-bold text-primary">
                      {formatCurrency(item?.price)}
                    </span>
                    <span className="text-xs px-2 py-1 bg-muted text-muted-foreground rounded-md capitalize">
                      {item?.category}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      iconName="Edit"
                      iconPosition="left"
                      onClick={() => onEdit(item)}
                      className="flex-1"
                    >
                      Editar
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      iconName="Trash2"
                      onClick={() => onDelete(item?.id)}
                    >
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MenuAdministration;