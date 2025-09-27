import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const OrderSummaryPanel = ({ 
  orderItems = [], 
  onUpdateQuantity,
  onRemoveItem,
  onApplyCoupon,
  onProceedToCheckout,
  isCollapsed = false,
  onToggleCollapse,
  estimatedTime = 25
}) => {
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);

  const subtotal = orderItems?.reduce((sum, item) => sum + (item?.totalPrice || item?.price * item?.quantity), 0);
  const discount = appliedCoupon ? appliedCoupon?.discount : 0;
  const tax = subtotal * 0.10; // 10% IVA
  const total = subtotal - discount + tax;

  const handleApplyCoupon = () => {
    if (couponCode?.trim()) {
      // Mock coupon validation
      const mockCoupons = {
        'DESCUENTO10': { code: 'DESCUENTO10', discount: subtotal * 0.1, description: '10% de descuento' },
        'BIENVENIDO': { code: 'BIENVENIDO', discount: 5, description: '€5 de descuento' },
        'ESTUDIANTE': { code: 'ESTUDIANTE', discount: subtotal * 0.15, description: '15% descuento estudiante' }
      };
      
      const coupon = mockCoupons?.[couponCode?.toUpperCase()];
      if (coupon) {
        setAppliedCoupon(coupon);
        onApplyCoupon?.(coupon);
      }
      setCouponCode('');
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    onApplyCoupon?.(null);
  };

  if (orderItems?.length === 0) {
    return (
      <div className="bg-card border border-border rounded-lg p-6 text-center">
        <Icon name="ShoppingCart" size={48} className="text-muted-foreground mx-auto mb-4" />
        <h3 className="font-semibold text-foreground mb-2">Tu pedido está vacío</h3>
        <p className="text-muted-foreground text-sm">
          Añade algunos platos deliciosos para comenzar
        </p>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-lg shadow-soft sticky top-24">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <h3 className="font-semibold text-foreground">
          Tu Pedido ({orderItems?.length})
        </h3>
        <div className="flex items-center space-x-2">
          {estimatedTime && (
            <div className="flex items-center space-x-1 text-sm text-muted-foreground">
              <Icon name="Clock" size={14} />
              <span>{estimatedTime} min</span>
            </div>
          )}
          <Button
            variant="ghost"
            size="sm"
            iconName={isCollapsed ? 'ChevronUp' : 'ChevronDown'}
            onClick={onToggleCollapse}
            className="lg:hidden"
          />
        </div>
      </div>
      {/* Order Items */}
      <div className={`${isCollapsed ? 'hidden lg:block' : 'block'}`}>
        <div className="max-h-64 overflow-y-auto">
          {orderItems?.map((item, index) => (
            <div key={`${item?.id}-${index}`} className="p-4 border-b border-border last:border-b-0">
              <div className="flex items-start space-x-3">
                <div className="w-12 h-12 bg-muted rounded-lg overflow-hidden flex-shrink-0">
                  <img
                    src={item?.image || `https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=100&h=100&fit=crop`}
                    alt={item?.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-foreground text-sm">
                    {item?.name}
                  </h4>
                  
                  {/* Selected Options */}
                  {item?.selectedOptions && Object.keys(item?.selectedOptions)?.length > 0 && (
                    <div className="text-xs text-muted-foreground mt-1">
                      {Object.values(item?.selectedOptions)?.map((option, idx) => (
                        <span key={idx}>
                          {option?.name}
                          {idx < Object.values(item?.selectedOptions)?.length - 1 && ', '}
                        </span>
                      ))}
                    </div>
                  )}
                  
                  {/* Special Instructions */}
                  {item?.specialInstructions && (
                    <div className="text-xs text-muted-foreground mt-1">
                      Nota: {item?.specialInstructions}
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        iconName="Minus"
                        onClick={() => onUpdateQuantity(index, Math.max(1, item?.quantity - 1))}
                        disabled={item?.quantity <= 1}
                        className="w-6 h-6 p-0"
                      />
                      <span className="text-sm font-medium min-w-[1.5rem] text-center">
                        {item?.quantity}
                      </span>
                      <Button
                        variant="outline"
                        size="sm"
                        iconName="Plus"
                        onClick={() => onUpdateQuantity(index, item?.quantity + 1)}
                        className="w-6 h-6 p-0"
                      />
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <span className="font-medium text-foreground">
                        €{(item?.totalPrice || item?.price * item?.quantity)?.toFixed(2)}
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        iconName="Trash2"
                        onClick={() => onRemoveItem(index)}
                        className="w-6 h-6 p-0 text-error hover:text-error"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Coupon Section */}
        <div className="p-4 border-b border-border">
          {appliedCoupon ? (
            <div className="flex items-center justify-between bg-success/10 border border-success/20 rounded-lg p-3">
              <div className="flex items-center space-x-2">
                <Icon name="Tag" size={16} className="text-success" />
                <div>
                  <div className="text-sm font-medium text-success">
                    {appliedCoupon?.code}
                  </div>
                  <div className="text-xs text-success/80">
                    {appliedCoupon?.description}
                  </div>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                iconName="X"
                onClick={handleRemoveCoupon}
                className="text-success hover:text-success"
              />
            </div>
          ) : (
            <div className="space-y-2">
              <Input
                type="text"
                placeholder="Código de descuento"
                value={couponCode}
                onChange={(e) => setCouponCode(e?.target?.value)}
                className="text-sm"
              />
              <Button
                variant="outline"
                size="sm"
                onClick={handleApplyCoupon}
                disabled={!couponCode?.trim()}
                fullWidth
              >
                Aplicar cupón
              </Button>
            </div>
          )}
        </div>

        {/* Order Summary */}
        <div className="p-4 space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Subtotal</span>
            <span className="text-foreground">€{subtotal?.toFixed(2)}</span>
          </div>
          
          {discount > 0 && (
            <div className="flex items-center justify-between text-sm">
              <span className="text-success">Descuento</span>
              <span className="text-success">-€{discount?.toFixed(2)}</span>
            </div>
          )}
          
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">IVA (10%)</span>
            <span className="text-foreground">€{tax?.toFixed(2)}</span>
          </div>
          
          <div className="border-t border-border pt-2">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-foreground">Total</span>
              <span className="font-bold text-lg text-primary">€{total?.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Checkout Button */}
        <div className="p-4 border-t border-border">
          <Button
            variant="default"
            onClick={onProceedToCheckout}
            iconName="CreditCard"
            iconPosition="left"
            fullWidth
            className="font-semibold"
          >
            Finalizar Pedido - €{total?.toFixed(2)}
          </Button>
          
          <div className="flex items-center justify-center space-x-1 mt-2 text-xs text-muted-foreground">
            <Icon name="Clock" size={12} />
            <span>Tiempo estimado: {estimatedTime} minutos</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummaryPanel;