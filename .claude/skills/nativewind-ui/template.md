### `tailwind.config.js`

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#4F7942",
        secondary: "#E19D38",
        background: "#FBF6D8",
        surface: "#FEFEFE",
        main: "#333333",
      },
    },
  },
  plugins: [],
};
```

### `babel.config.js`

```javascript
module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ["babel-preset-expo", { jsxImportSource: "nativewind" }],
      "nativewind/babel",
    ],
  };
};
```

### `metro.config.js`

```javascript
const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const config = getDefaultConfig(__dirname);

module.exports = withNativeWind(config, { input: "./global.css" });
```

### `global.css`

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### `src/components/ui/app-button.tsx`

```tsx
import React from 'react';
import { Pressable, Text, ActivityIndicator } from 'react-native';

interface AppButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  disabled?: boolean;
  isLoading?: boolean;
  className?: string;
}

export const AppButton: React.FC<AppButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  disabled = false,
  isLoading = false,
  className = '',
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'secondary':
        return 'bg-secondary border-secondary';
      case 'outline':
        return 'bg-transparent border-primary border-2';
      case 'primary':
      default:
        return 'bg-primary border-primary';
    }
  };

  const getTextStyles = () => {
    if (variant === 'outline') {
      return 'text-primary font-bold';
    }
    return 'text-surface font-bold';
  };

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || isLoading}
      className={`rounded-xl px-4 py-3 items-center justify-center border ${getVariantStyles()} ${
        disabled ? 'opacity-50' : 'active:opacity-80'
      } ${className}`}
    >
      {isLoading ? (
        <ActivityIndicator color={variant === 'outline' ? '#4F7942' : '#FEFEFE'} />
      ) : (
        <Text className={`text-base ${getTextStyles()}`}>{title}</Text>
      )}
    </Pressable>
  );
};
```

### `src/components/ui/app-input.tsx`

```tsx
import React from 'react';
import { View, Text, TextInput, TextInputProps } from 'react-native';

interface AppInputProps extends TextInputProps {
  label?: string;
  error?: string;
  containerClassName?: string;
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
        <Text className="text-main font-semibold text-sm mb-1.5">{label}</Text>
      )}
      <TextInput
        placeholderTextColor="#33333380"
        className={`w-full bg-surface text-main px-4 py-3 rounded-xl border ${
          error ? 'border-red-500' : 'border-primary/30 focus:border-primary'
        } ${className}`}
        {...props}
      />
      {error && (
        <Text className="text-red-500 text-xs mt-1 font-medium">{error}</Text>
      )}
    </View>
  );
};
```

### `src/components/ui/screen.tsx`

```tsx
import React from 'react';
import { View, ViewProps } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface ScreenProps extends ViewProps {
  children: React.ReactNode;
  className?: string;
}

export const Screen: React.FC<ScreenProps> = ({ children, className = '', ...props }) => {
  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className={`flex-1 px-4 ${className}`} {...props}>
        {children}
      </View>
    </SafeAreaView>
  );
};
```

### `src/components/ui/section.tsx`

```tsx
import React from 'react';
import { View, Text, ViewProps } from 'react-native';

interface SectionProps extends ViewProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export const Section: React.FC<SectionProps> = ({ title, children, className = '', ...props }) => {
  return (
    <View className={`my-3 bg-surface p-4 rounded-2xl ${className}`} {...props}>
      {title && (
        <Text className="text-lg font-bold text-main mb-3">{title}</Text>
      )}
      {children}
    </View>
  );
};
```
