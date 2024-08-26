import React, { useEffect } from "react";
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  Easing,
} from "react-native-reanimated";
import { View, Button, Text, StyleSheet } from "react-native";

export default function AnimatedStyleUpdateExample(props: any) {
  // Variables de animación
  const randomWidth = useSharedValue<number>(10);
  const translateY = useSharedValue<number>(-250);
  const backgroundColor = useSharedValue<string>('#e7fefa');
  const titleOpacity = useSharedValue<number>(1);

  // Configuración de la animación
  const config = {
    duration: 1000,
    easing: Easing.bezier(0.5, 0.01, 0, 1),
  };

  // Estilos animados
  const textStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: withTiming(translateY.value, config) }],
      opacity: withTiming(titleOpacity.value, config),
    };
  });

  const backgroundStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: withTiming(backgroundColor.value, config),
    };
  });

  // Inicia la animación al cargar la página o al hacer refresh
  const startAnimation = () => {
    translateY.value = -250;
    titleOpacity.value = 1;

    // se inicia la animación de movimiento después de un momento
    setTimeout(() => {
      translateY.value = 0;
    }, 100);
  };

  useEffect(() => {
    startAnimation();
  }, []);

  // Función para refrescar la animación
  const handleRefresh = () => {
    // Restablece los valores a su estado inicial
    backgroundColor.value = '#e7fefa';
    startAnimation();
  };

  return (
    <Animated.View style={[styles.background, backgroundStyle]}>
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <View style={styles.container}>
          <Animated.Text style={[styles.title, textStyle]}>
            Mi Título Centrado
          </Animated.Text>
        </View>

        <Button
          title="Iniciar"
          onPress={() => {
            randomWidth.value = Math.random() * 350;
            backgroundColor.value = '#D34'; 
            titleOpacity.value = 0; 
          }}
        />

        <Button
          title="Refresh"
          onPress={handleRefresh}
          color="#841584"
        />
      </View>
    </Animated.View>
  );
}

// Estilos
const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});