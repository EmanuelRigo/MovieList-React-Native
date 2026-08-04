import React from 'react';
import { Pressable, Text, ActivityIndicator, PressableProps } from 'react-native';

export interface AppButtonProps extends PressableProps {
  title: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'danger';
  isLoading?: boolean;
  className?: string;
}

export const AppButton: React.FC<AppButtonProps> = ({
  title,
  variant = 'primary',
  isLoading = false,
  className = '',
  disabled,
  ...props
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'secondary':
        return 'bg-secondary border-secondary';
      case 'outline':
        return 'bg-transparent border-main border-2';
      case 'danger':
        return 'bg-red-600 border-red-600';
      case 'primary':
      default:
        return 'bg-main border-main';
    }
  };

  const getTextStyles = () => {
    if (variant === 'outline') return 'text-main font-bold';
    return 'text-white font-bold';
  };

  return (
    <Pressable
      disabled={!!disabled || isLoading}
      className={`rounded-xl px-4 py-3 items-center justify-center border ${getVariantStyles()} ${
        disabled || isLoading ? 'opacity-50' : 'active:opacity-80'
      } ${className}`}
      {...props}
    >
      {isLoading ? (
        <ActivityIndicator color="#ffffff" />
      ) : (
        <Text className={`text-base ${getTextStyles()}`}>{title}</Text>
      )}
    </Pressable>
  );
};
