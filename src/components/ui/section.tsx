import React from 'react';
import { View, Text, ViewProps } from 'react-native';

export interface SectionProps extends ViewProps {
  title?: string;
  children?: React.ReactNode;
  className?: string;
}

export const Section: React.FC<SectionProps> = ({ title, children, className = '', ...props }) => {
  return (
    <View className={`my-3 bg-surface p-4 rounded-2xl ${className}`} {...props}>
      {title && (
        <Text className="text-lg font-bold text-white mb-3">{title}</Text>
      )}
      {children}
    </View>
  );
};
