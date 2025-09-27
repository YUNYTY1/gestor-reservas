import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const EmailVerificationModal = ({ 
  isOpen = false, 
  email = '', 
  onVerify, 
  onResend, 
  onClose,
  isVerifying = false,
  isResending = false 
}) => {
  const [verificationCode, setVerificationCode] = useState('');
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isOpen) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds?.toString()?.padStart(2, '0')}`;
  };

  const handleVerify = () => {
    if (!verificationCode?.trim()) {
      setError('Por favor, introduce el código de verificación');
      return;
    }
    
    if (verificationCode?.length !== 6) {
      setError('El código debe tener 6 dígitos');
      return;
    }

    setError('');
    onVerify(verificationCode);
  };

  const handleResend = () => {
    setTimeLeft(300);
    setError('');
    onResend();
  };

  const handleCodeChange = (value) => {
    // Only allow numbers and limit to 6 digits
    const numericValue = value?.replace(/\D/g, '')?.slice(0, 6);
    setVerificationCode(numericValue);
    
    if (error) {
      setError('');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-modal bg-black/50 flex items-center justify-center p-4">
      <div className="bg-card border border-border rounded-lg shadow-elevated max-w-md w-full">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
              <Icon name="Mail" size={20} className="text-primary" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-foreground">
                Verificar Email
              </h2>
              <p className="text-sm text-muted-foreground">
                Confirma tu dirección de correo
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            iconName="X"
            onClick={onClose}
          />
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          <div className="text-center space-y-2">
            <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto">
              <Icon name="MailCheck" size={32} className="text-success" />
            </div>
            <h3 className="text-lg font-semibold text-foreground">
              Revisa tu Email
            </h3>
            <p className="text-sm text-muted-foreground">
              Hemos enviado un código de verificación de 6 dígitos a:
            </p>
            <p className="text-sm font-medium text-foreground bg-muted px-3 py-1 rounded-lg inline-block">
              {email}
            </p>
          </div>

          <div className="space-y-4">
            <Input
              label="Código de Verificación"
              type="text"
              placeholder="000000"
              value={verificationCode}
              onChange={(e) => handleCodeChange(e?.target?.value)}
              error={error}
              maxLength={6}
              className="text-center text-lg tracking-widest"
            />

            <div className="text-center space-y-2">
              {timeLeft > 0 ? (
                <p className="text-sm text-muted-foreground">
                  El código expira en{' '}
                  <span className="font-medium text-warning">
                    {formatTime(timeLeft)}
                  </span>
                </p>
              ) : (
                <p className="text-sm text-error">
                  El código ha expirado
                </p>
              )}
            </div>
          </div>

          <div className="space-y-3">
            <Button
              variant="default"
              size="lg"
              fullWidth
              onClick={handleVerify}
              loading={isVerifying}
              disabled={!verificationCode || verificationCode?.length !== 6}
              iconName="Check"
              iconPosition="left"
            >
              Verificar Código
            </Button>

            <div className="text-center">
              <span className="text-sm text-muted-foreground">
                ¿No has recibido el código?{' '}
              </span>
              <Button
                variant="link"
                size="sm"
                onClick={handleResend}
                loading={isResending}
                disabled={timeLeft > 0}
                className="text-sm p-0 h-auto"
              >
                Reenviar código
              </Button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-muted/30 rounded-b-lg border-t border-border">
          <div className="flex items-start space-x-2">
            <Icon name="Info" size={16} className="text-muted-foreground mt-0.5" />
            <div className="text-xs text-muted-foreground">
              <p>
                Si no encuentras el email, revisa tu carpeta de spam o correo no deseado.
                El código es válido durante 5 minutos.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailVerificationModal;