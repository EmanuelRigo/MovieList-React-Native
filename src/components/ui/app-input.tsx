import React from 'react';
import { View, Text, TextInput, TextInputProps } from 'react-native';

export interface AppInputProps extends TextInputProps {
  label?: string;
  error?: string;
  containerClassName?: string;
  className?: string;
}

export const AppInput: React.FC<AppInputProps> = ({
  label,
  error,
  containerClassName = '',
  className = '',
  ...props
}) => {
  return (
    <View className={`w-full mb-4 ${containerClassName}`}>
      {label && (
        <Text className="text-white font-semibold text-sm mb-1.5">{label}</Text>
      )}
      <TextInput
        placeholderTextColor="#94A3B8"
        className={`w-full bg-surface text-white px-4 py-3 rounded-xl border ${
          error ? 'border-red-500' : 'border-main/30'
        } ${className}`}
        {...props}
      />
      {error && (
        <Text className="text-red-400 text-xs mt-1 font-medium">{error}</Text>
      )}
    </View>
  );
};
