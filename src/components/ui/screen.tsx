import React from 'react';
import { StatusBar, View, ViewProps } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export interface ScreenProps extends ViewProps {
  children?: React.ReactNode;
  className?: string;
}

export const Screen: React.FC<ScreenProps> = ({ children, className = '', ...props }) => {
  return (
    <SafeAreaView className="flex-1 bg-background-primary">
      <StatusBar barStyle="light-content" backgroundColor="#0a0a0a" />
      <View className={`flex-1 px-4 ${className}`} {...props}>
        {children}
      </View>
    </SafeAreaView>
  );
};
