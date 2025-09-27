import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const OrderSummary = ({ order }) => {
  const formatPrice = (price) => {
    return `€${price?.toFixed(2)}`;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-soft">
      <h3 className="text-lg font-semibold text-foreground mb-4">
        Resumen del Pedido
      </h3>
      <div className="space-y-4">
        {/* Order Items */}
        <div className="space-y-3">
          {order?.items?.map((item, index) => (
            <div key={index} className="flex items-start space-x-3 py-2">
              <div className="flex-shrink-0 w-12 h-12 rounded-lg overflow-hidden bg-muted">
                <Image
                  src={item?.image}
                  alt={item?.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-foreground">
                      {item?.name}
                    </h4>
                    {item?.modifications && item?.modifications?.length > 0 && (
                      <div className="mt-1">
                        {item?.modifications?.map((mod, modIndex) => (
                          <p key={modIndex} className="text-xs text-muted-foreground">
                            • {mod}
                          </p>
                        ))}
                      </div>
                    )}
                    {item?.specialInstructions && (
                      <p className="text-xs text-muted-foreground mt-1">
                        <Icon name="MessageSquare" size={12} className="inline mr-1" />
                        {item?.specialInstructions}
                      </p>
                    )}
                  </div>
                  
                  <div className="text-right">
                    <div className="text-sm font-medium text-foreground">
                      {formatPrice(item?.price * item?.quantity)}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {item?.quantity} × {formatPrice(item?.price)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Order Totals */}
        <div className="border-t border-border pt-4 space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Subtotal:</span>
            <span className="text-foreground">{formatPrice(order?.subtotal)}</span>
          </div>
          
          {order?.discount > 0 && (
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Descuento:</span>
              <span className="text-success">-{formatPrice(order?.discount)}</span>
            </div>
          )}
          
          {order?.deliveryFee > 0 && (
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Entrega:</span>
              <span className="text-foreground">{formatPrice(order?.deliveryFee)}</span>
            </div>
          )}
          
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">IVA (21%):</span>
            <span className="text-foreground">{formatPrice(order?.tax)}</span>
          </div>
          
          <div className="border-t border-border pt-2">
            <div className="flex items-center justify-between">
              <span className="text-base font-semibold text-foreground">Total:</span>
              <span className="text-lg font-bold text-foreground">{formatPrice(order?.total)}</span>
            </div>
          </div>
        </div>
        
        {/* Payment Method */}
        <div className="border-t border-border pt-4">
          <div className="flex items-center space-x-2">
            <Icon name="CreditCard" size={16} className="text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Método de pago:</span>
            <span className="text-sm font-medium text-foreground">
              {order?.paymentMethod === 'card' ? 'Tarjeta' : 
               order?.paymentMethod === 'cash' ? 'Efectivo' : 
               order?.paymentMethod === 'paypal' ? 'PayPal' : 'Otro'}
            </span>
          </div>
          
          {order?.orderType && (
            <div className="flex items-center space-x-2 mt-2">
              <Icon 
                name={order?.orderType === 'delivery' ? 'Truck' : 'Package'} 
                size={16} 
                className="text-muted-foreground" 
              />
              <span className="text-sm text-muted-foreground">Tipo:</span>
              <span className="text-sm font-medium text-foreground">
                {order?.orderType === 'delivery' ? 'Entrega a domicilio' : 'Recoger en tienda'}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;