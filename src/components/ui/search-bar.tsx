import React from 'react';
import { Platform, Text, TextInput, TextInputProps, View } from 'react-native';
import { SymbolView } from 'expo-symbols';

export interface SearchBarProps extends Omit<TextInputProps, 'className'> {
  /** Clases extra para el contenedor (ancho, márgenes…). */
  containerClassName?: string;
  /** Clases extra para el <TextInput>. */
  className?: string;
  /** Placeholder por defecto si no se pasa uno. */
  placeholder?: string;
}

/**
 * SearchBar — solo maquetado, sin lógica.
 * Icono de lupa (SF Symbol `magnifyingglass` en iOS, glifo Unicode en el resto)
 * + input de texto estilado con los tokens del design system.
 */
export const SearchBar: React.FC<SearchBarProps> = ({
  containerClassName = '',
  className = '',
  placeholder = 'Buscar…',
  ...props
}) => {
  return (
    <View
      className={`flex-row items-center bg-surface-primary border border-border-subtle rounded-xl px-4 h-12 ${containerClassName}`}
    >
      {Platform.OS === 'ios' ? (
        <SymbolView
          name="magnifyingglass"
          tintColor="#a1a1aa"
          size={18}
          style={{ marginRight: 8 }}
        />
      ) : (
        <View style={{ marginRight: 8 }}>
          <SearchFallbackIcon />
        </View>
      )}

      <TextInput
        placeholder={placeholder}
        placeholderTextColor="#6b7280"
        className={`flex-1 text-text-primary text-base ${className}`}
        {...props}
      />
    </View>
  );
};

/** Fallback para Android / Web: lupa en texto cuando no hay SF Symbols. */
const SearchFallbackIcon: React.FC = () => {
  return <Text style={{ color: '#a1a1aa', fontSize: 16 }}>🔍</Text>;
};