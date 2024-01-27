import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';

const YourComponent = () => {
  useEffect(() => {
    

    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      {/* Ваш код карты или других компонентов */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  // Дополнительные стили, если необходимо
});

export default YourComponent;
