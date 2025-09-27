import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TableStatusGrid = ({ tables = [], onTableAction, onDrop }) => {
  const [selectedTable, setSelectedTable] = useState(null);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'

  const tableStatuses = {
    available: {
      color: 'bg-success text-success-foreground',
      icon: 'Check',
      label: 'Disponible'
    },
    occupied: {
      color: 'bg-error text-error-foreground',
      icon: 'Users',
      label: 'Ocupada'
    },
    reserved: {
      color: 'bg-warning text-warning-foreground',
      icon: 'Clock',
      label: 'Reservada'
    },
    cleaning: {
      color: 'bg-muted text-muted-foreground',
      icon: 'Sparkles',
      label: 'Limpieza'
    },
    maintenance: {
      color: 'bg-secondary text-secondary-foreground',
      icon: 'Wrench',
      label: 'Mantenimiento'
    }
  };

  const handleDragOver = (e) => {
    e?.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e, tableId) => {
    e?.preventDefault();
    if (onDrop) {
      onDrop(tableId);
    }
  };

  const handleTableClick = (table) => {
    setSelectedTable(selectedTable === table?.id ? null : table?.id);
  };

  const getTableActions = (table) => {
    const actions = [];
    
    switch (table?.status) {
      case 'available':
        actions?.push(
          { id: 'reserve', label: 'Reservar', icon: 'Calendar', variant: 'default' },
          { id: 'occupy', label: 'Ocupar', icon: 'Users', variant: 'outline' }
        );
        break;
      case 'occupied':
        actions?.push(
          { id: 'bill', label: 'Cuenta', icon: 'Receipt', variant: 'default' },
          { id: 'free', label: 'Liberar', icon: 'Check', variant: 'outline' }
        );
        break;
      case 'reserved':
        actions?.push(
          { id: 'seat', label: 'Sentar', icon: 'Users', variant: 'default' },
          { id: 'cancel', label: 'Cancelar', icon: 'X', variant: 'outline' }
        );
        break;
      case 'cleaning':
        actions?.push(
          { id: 'complete', label: 'Completar', icon: 'Check', variant: 'default' }
        );
        break;
      case 'maintenance':
        actions?.push(
          { id: 'complete', label: 'Completar', icon: 'Check', variant: 'default' }
        );
        break;
    }
    
    actions?.push({ id: 'clean', label: 'Limpiar', icon: 'Sparkles', variant: 'ghost' });
    
    return actions;
  };

  const formatTime = (time) => {
    if (!time) return '';
    return new Date(time)?.toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (viewMode === 'list') {
    return (
      <div className="bg-card border border-border rounded-lg shadow-soft">
        <div className="p-6 border-b border-border">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-foreground">Estado de Mesas</h3>
            <div className="flex items-center space-x-2">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="sm"
                iconName="Grid3x3"
                onClick={() => setViewMode('grid')}
              />
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="sm"
                iconName="List"
                onClick={() => setViewMode('list')}
              />
            </div>
          </div>
        </div>
        <div className="p-6">
          <div className="space-y-3">
            {tables?.map((table) => {
              const statusConfig = tableStatuses?.[table?.status];
              return (
                <div
                  key={table?.id}
                  className="flex items-center justify-between p-4 border border-border rounded-lg hover:shadow-soft transition-smooth"
                >
                  <div className="flex items-center space-x-4">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${statusConfig?.color}`}>
                      <Icon name={statusConfig?.icon} size={20} />
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-foreground">Mesa {table?.number}</h4>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <span>{table?.capacity} personas</span>
                        <span>{statusConfig?.label}</span>
                        {table?.currentReservation && (
                          <span>{formatTime(table?.currentReservation?.time)}</span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {getTableActions(table)?.slice(0, 2)?.map((action) => (
                      <Button
                        key={action?.id}
                        variant={action?.variant}
                        size="sm"
                        iconName={action?.icon}
                        onClick={() => onTableAction(table?.id, action?.id)}
                      >
                        {action?.label}
                      </Button>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-lg shadow-soft">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Estado de Mesas</h3>
          <div className="flex items-center space-x-2">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'outline'}
              size="sm"
              iconName="Grid3x3"
              onClick={() => setViewMode('grid')}
            />
            <Button
              variant={viewMode === 'list' ? 'default' : 'outline'}
              size="sm"
              iconName="List"
              onClick={() => setViewMode('list')}
            />
          </div>
        </div>
        
        {/* Status Legend */}
        <div className="flex items-center space-x-4 text-sm">
          {Object.entries(tableStatuses)?.map(([status, config]) => (
            <div key={status} className="flex items-center space-x-1">
              <div className={`w-3 h-3 rounded-full ${config?.color}`}></div>
              <span className="text-muted-foreground">{config?.label}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {tables?.map((table) => {
            const statusConfig = tableStatuses?.[table?.status];
            const isSelected = selectedTable === table?.id;
            
            return (
              <div key={table?.id} className="relative">
                <button
                  onClick={() => handleTableClick(table)}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, table?.id)}
                  className={`w-full aspect-square rounded-lg border-2 transition-smooth hover:shadow-soft ${
                    isSelected ? 'border-primary shadow-soft' : 'border-border'
                  }`}
                >
                  <div className={`w-full h-full rounded-lg flex flex-col items-center justify-center space-y-2 ${statusConfig?.color}`}>
                    <Icon name={statusConfig?.icon} size={24} />
                    <div className="text-center">
                      <div className="font-bold text-lg">{table?.number}</div>
                      <div className="text-xs opacity-80">{table?.capacity}p</div>
                    </div>
                  </div>
                </button>
                {/* Table Details Overlay */}
                {isSelected && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-popover border border-border rounded-lg shadow-elevated p-4 z-dropdown">
                    <div className="space-y-3">
                      <div>
                        <h4 className="font-medium text-foreground">Mesa {table?.number}</h4>
                        <p className="text-sm text-muted-foreground">
                          Capacidad: {table?.capacity} personas
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Estado: {statusConfig?.label}
                        </p>
                      </div>
                      
                      {table?.currentReservation && (
                        <div className="text-sm">
                          <p className="font-medium text-foreground">
                            {table?.currentReservation?.customerName}
                          </p>
                          <p className="text-muted-foreground">
                            {formatTime(table?.currentReservation?.time)} - {table?.currentReservation?.partySize} personas
                          </p>
                        </div>
                      )}
                      
                      <div className="flex flex-wrap gap-2">
                        {getTableActions(table)?.map((action) => (
                          <Button
                            key={action?.id}
                            variant={action?.variant}
                            size="sm"
                            iconName={action?.icon}
                            onClick={() => {
                              onTableAction(table?.id, action?.id);
                              setSelectedTable(null);
                            }}
                          >
                            {action?.label}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TableStatusGrid;