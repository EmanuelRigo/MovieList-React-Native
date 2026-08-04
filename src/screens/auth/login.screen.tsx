import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Alert, Text, View } from "react-native";

import { AppButton } from "@/components/ui/app-button";
import { AppInput } from "@/components/ui/app-input";
import { Screen } from "@/components/ui/screen";
import { Section } from "@/components/ui/section";
import { useLoginMutation } from "../../queries/use-auth";
import { LoginFormData, loginSchema } from "../../schemas/auth.schema";

export const LoginScreen: React.FC = () => {
  const router = useRouter();
  const loginMutation = useLoginMutation();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: LoginFormData) => {
    loginMutation.mutate(data, {
      onSuccess: () => {
        router.replace("/(app)");
      },
      onError: (error: any) => {
        const message =
          error?.response?.data?.message ||
          "Error al iniciar sesión. Inténtalo de nuevo.";
        Alert.alert("Error de autenticación", message);
      },
    });
  };

  return (
    <Screen className="justify-center">
      <Section title="Iniciar Sesión">
        <Text className="text-slate-400 text-sm mb-4">
          Ingresa tus credenciales para acceder a tu colección de películas.
        </Text>

        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, onBlur, value } }) => (
            <AppInput
              label="Correo electrónico"
              placeholder="tu@email.com"
              keyboardType="email-address"
              autoCapitalize="none"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              error={errors.email?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, onBlur, value } }) => (
            <AppInput
              label="Contraseña"
              placeholder="••••••••"
              secureTextEntry
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              error={errors.password?.message}
            />
          )}
        />

        <View className="mt-2">
          <AppButton
            title="Ingresar"
            onPress={handleSubmit(onSubmit)}
            isLoading={loginMutation.isPending}
          />
        </View>

        <View className="mt-4 items-center">
          <Text className="text-slate-400 text-sm">
            ¿No tienes cuenta?{" "}
            <Text
              className="text-main font-bold"
              onPress={() => router.push("/(auth)/register" as any)}
            >
              Regístrate aquí
            </Text>
          </Text>
        </View>
      </Section>
    </Screen>
  );
};
