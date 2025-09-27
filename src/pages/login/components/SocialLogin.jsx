import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const SocialLogin = ({ onSocialLogin, isLoading = false }) => {
  const socialProviders = [
    {
      name: 'Google',
      icon: 'Chrome',
      color: 'bg-red-500 hover:bg-red-600 text-white',
      provider: 'google'
    },
    {
      name: 'Facebook',
      icon: 'Facebook',
      color: 'bg-blue-600 hover:bg-blue-700 text-white',
      provider: 'facebook'
    }
  ];

  const handleSocialLogin = async (provider) => {
    if (onSocialLogin) {
      await onSocialLogin(provider);
    }
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-background text-muted-foreground">
            O continúa con
          </span>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {socialProviders?.map((provider) => (
          <Button
            key={provider?.provider}
            variant="outline"
            onClick={() => handleSocialLogin(provider?.provider)}
            disabled={isLoading}
            className="flex items-center justify-center space-x-2 py-3"
          >
            <Icon name={provider?.icon} size={18} />
            <span className="hidden sm:inline">{provider?.name}</span>
            <span className="sm:hidden">Continuar</span>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default SocialLogin;