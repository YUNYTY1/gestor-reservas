import { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const KitchenCommunication = ({ onSendMessage }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'Chef Principal',
      message: 'Necesitamos más tiempo para el pedido #1234. Ingrediente especial agotado.',
      timestamp: new Date(Date.now() - 300000),
      type: 'kitchen'
    },
    {
      id: 2,
      sender: 'Mesero Juan',
      message: 'Mesa 5 pregunta por su pedido. ¿Cuánto falta?',
      timestamp: new Date(Date.now() - 180000),
      type: 'waiter'
    },
    {
      id: 3,
      sender: 'Chef Principal',
      message: 'Pedido #1234 listo en 5 minutos.',
      timestamp: new Date(Date.now() - 60000),
      type: 'kitchen'
    }
  ]);

  const handleSendMessage = () => {
    if (message?.trim()) {
      const newMessage = {
        id: messages?.length + 1,
        sender: 'Tú',
        message: message?.trim(),
        timestamp: new Date(),
        type: 'user'
      };
      setMessages([...messages, newMessage]);
      setMessage('');
      if (onSendMessage) {
        onSendMessage(newMessage);
      }
    }
  };

  const formatTime = (date) => {
    return new Date(date)?.toLocaleTimeString('es-PE', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-warm overflow-hidden">
      <div className="p-4 lg:p-6 border-b border-border">
        <div className="flex items-center gap-2">
          <Icon name="MessageSquare" size={20} color="var(--color-primary)" />
          <h3 className="text-lg font-heading font-semibold text-foreground">
            Comunicación con Cocina
          </h3>
        </div>
      </div>
      <div className="h-80 overflow-y-auto p-4 lg:p-6 space-y-3">
        {messages?.map((msg) => (
          <div
            key={msg?.id}
            className={`flex gap-3 ${msg?.type === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
          >
            <div className={`flex items-center justify-center w-10 h-10 rounded-full flex-shrink-0 ${
              msg?.type === 'kitchen' ? 'bg-warning/10' : 
              msg?.type === 'waiter'? 'bg-primary/10' : 'bg-accent/10'
            }`}>
              <Icon 
                name={msg?.type === 'kitchen' ? 'ChefHat' : msg?.type === 'waiter' ? 'User' : 'UserCircle'} 
                size={20} 
                color={
                  msg?.type === 'kitchen' ? 'var(--color-warning)' : 
                  msg?.type === 'waiter' ? 'var(--color-primary)' : 
                  'var(--color-accent)'
                }
              />
            </div>
            <div className={`flex-1 ${msg?.type === 'user' ? 'text-right' : 'text-left'}`}>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm font-semibold text-foreground">{msg?.sender}</span>
                <span className="text-xs text-muted-foreground">{formatTime(msg?.timestamp)}</span>
              </div>
              <div className={`inline-block p-3 rounded-lg ${
                msg?.type === 'user' ?'bg-primary text-primary-foreground' :'bg-muted text-foreground'
              }`}>
                <p className="text-sm">{msg?.message}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="p-4 lg:p-6 border-t border-border">
        <div className="flex gap-3">
          <Input
            type="text"
            placeholder="Escribe un mensaje..."
            value={message}
            onChange={(e) => setMessage(e?.target?.value)}
            onKeyPress={(e) => e?.key === 'Enter' && handleSendMessage()}
            className="flex-1"
          />
          <Button
            variant="default"
            iconName="Send"
            onClick={handleSendMessage}
            disabled={!message?.trim()}
          >
            Enviar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default KitchenCommunication;