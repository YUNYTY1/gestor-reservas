import { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

const FilterBar = ({ onFilterChange, activeFilters }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const statusOptions = [
    { value: 'all', label: 'Todos los estados' },
    { value: 'received', label: 'Recibido' },
    { value: 'preparing', label: 'Preparando' },
    { value: 'ready', label: 'Listo' },
    { value: 'served', label: 'Servido' }
  ];

  const timeRangeOptions = [
    { value: 'all', label: 'Todo el tiempo' },
    { value: 'last15', label: 'Últimos 15 min' },
    { value: 'last30', label: 'Últimos 30 min' },
    { value: 'last60', label: 'Última hora' },
    { value: 'today', label: 'Hoy' }
  ];

  const priorityOptions = [
    { value: 'all', label: 'Todas las prioridades' },
    { value: 'high', label: 'Alta' },
    { value: 'medium', label: 'Media' },
    { value: 'low', label: 'Baja' }
  ];

  const handleStatusChange = (value) => {
    onFilterChange({ ...activeFilters, status: value });
  };

  const handleTimeRangeChange = (value) => {
    onFilterChange({ ...activeFilters, timeRange: value });
  };

  const handlePriorityChange = (value) => {
    onFilterChange({ ...activeFilters, priority: value });
  };

  const handleTableSearch = (e) => {
    onFilterChange({ ...activeFilters, tableNumber: e?.target?.value });
  };

  const handleReset = () => {
    onFilterChange({
      status: 'all',
      timeRange: 'all',
      priority: 'all',
      tableNumber: ''
    });
  };

  const hasActiveFilters = 
    activeFilters?.status !== 'all' || 
    activeFilters?.timeRange !== 'all' || 
    activeFilters?.priority !== 'all' || 
    activeFilters?.tableNumber !== '';

  return (
    <div className="bg-card border border-border rounded-lg shadow-warm p-4 lg:p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Icon name="Filter" size={20} color="var(--color-primary)" />
          <h3 className="text-lg font-heading font-semibold text-foreground">Filtros</h3>
        </div>
        <div className="flex items-center gap-2">
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              iconName="X"
              iconPosition="left"
              onClick={handleReset}
            >
              Limpiar
            </Button>
          )}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="lg:hidden p-2 rounded-lg hover:bg-muted transition-quick"
          >
            <Icon name={isExpanded ? 'ChevronUp' : 'ChevronDown'} size={20} />
          </button>
        </div>
      </div>
      <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 ${isExpanded ? 'block' : 'hidden lg:grid'}`}>
        <Select
          label="Estado del Pedido"
          options={statusOptions}
          value={activeFilters?.status}
          onChange={handleStatusChange}
        />

        <Select
          label="Rango de Tiempo"
          options={timeRangeOptions}
          value={activeFilters?.timeRange}
          onChange={handleTimeRangeChange}
        />

        <Select
          label="Prioridad"
          options={priorityOptions}
          value={activeFilters?.priority}
          onChange={handlePriorityChange}
        />

        <Input
          label="Número de Mesa"
          type="text"
          placeholder="Buscar por mesa..."
          value={activeFilters?.tableNumber}
          onChange={handleTableSearch}
        />
      </div>
      {hasActiveFilters && (
        <div className={`flex flex-wrap gap-2 mt-4 pt-4 border-t border-border ${isExpanded ? 'block' : 'hidden lg:flex'}`}>
          <span className="text-sm text-muted-foreground">Filtros activos:</span>
          {activeFilters?.status !== 'all' && (
            <span className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">
              Estado: {statusOptions?.find(o => o?.value === activeFilters?.status)?.label}
            </span>
          )}
          {activeFilters?.timeRange !== 'all' && (
            <span className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">
              Tiempo: {timeRangeOptions?.find(o => o?.value === activeFilters?.timeRange)?.label}
            </span>
          )}
          {activeFilters?.priority !== 'all' && (
            <span className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">
              Prioridad: {priorityOptions?.find(o => o?.value === activeFilters?.priority)?.label}
            </span>
          )}
          {activeFilters?.tableNumber && (
            <span className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">
              Mesa: {activeFilters?.tableNumber}
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default FilterBar;