import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const ReservationSummary = ({ selectedDate, selectedTime, partySize }) => {
  const formatDate = (date) => {
    if (!date) return 'No seleccionada';
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return date?.toLocaleDateString('es-PE', options);
  };

  const hasSelection = selectedDate || selectedTime || partySize;

  return (
    <div className="bg-card rounded-lg border border-border shadow-warm overflow-hidden">
      <div className="bg-primary/10 p-4 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
            <Icon name="ClipboardList" size={20} color="white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Resumen de Reserva</h3>
            <p className="text-sm text-muted-foreground">Detalles de su selección</p>
          </div>
        </div>
      </div>
      <div className="p-6 space-y-4">
        {!hasSelection ?
        <div className="text-center py-8">
            <Icon name="CalendarX" size={48} color="var(--color-muted-foreground)" className="mx-auto mb-4" />
            <p className="text-muted-foreground">
              Seleccione fecha y hora para ver el resumen
            </p>
          </div> :

        <>
            <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
              <Icon name="Calendar" size={20} color="var(--color-primary)" className="mt-0.5" />
              <div className="flex-1">
                <p className="text-xs font-medium text-muted-foreground mb-1">Fecha</p>
                <p className="text-sm font-semibold text-foreground capitalize">
                  {formatDate(selectedDate)}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
              <Icon name="Clock" size={20} color="var(--color-primary)" className="mt-0.5" />
              <div className="flex-1">
                <p className="text-xs font-medium text-muted-foreground mb-1">Horario</p>
                <p className="text-sm font-semibold text-foreground">
                  {selectedTime || 'No seleccionado'}
                </p>
              </div>
            </div>

            {partySize &&
          <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                <Icon name="Users" size={20} color="var(--color-primary)" className="mt-0.5" />
                <div className="flex-1">
                  <p className="text-xs font-medium text-muted-foreground mb-1">Personas</p>
                  <p className="text-sm font-semibold text-foreground">
                    {partySize} {parseInt(partySize) === 1 ? 'persona' : 'personas'}
                  </p>
                </div>
              </div>
          }
          </>
        }
      </div>
      <div className="bg-muted/30 p-4 border-t border-border">
        <div className="flex items-start gap-3">
          <Icon name="Info" size={18} color="var(--color-primary)" className="mt-0.5" />
          <div className="flex-1">
            <p className="text-xs font-medium text-foreground mb-1">Información importante</p>
            <ul className="text-xs text-muted-foreground space-y-1">
              <li>• Llegue 10 minutos antes de su reserva</li>
              <li>• Reservas válidas por 15 minutos</li>
              <li>• Confirmación enviada por correo</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="p-4 bg-primary/5 border-t border-border">
        <div className="flex items-center gap-3">
          <Image
            src="https://images.unsplash.com/photo-1610894803089-0c3283d8d059"
            alt="Elegant Peruvian restaurant interior with warm lighting, wooden tables, traditional decorative elements, and welcoming atmosphere"
            className="w-16 h-16 rounded-lg object-cover" />

          <div className="flex-1">
            <p className="text-sm font-semibold text-foreground">Vikingo Grill</p>
            <p className="text-xs text-muted-foreground">Cocina peruana auténtica</p>
            <div className="flex items-center gap-1 mt-1">
              {[1, 2, 3, 4, 5]?.map((star) =>
              <Icon key={star} name="Star" size={12} color="var(--color-accent)" />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>);

};

export default ReservationSummary;