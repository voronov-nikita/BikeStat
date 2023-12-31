import React from 'react';
import { StyleSheet, View } from 'react-native';
import MapView from 'react-native-yandex-maps';

const App = () => {
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={{
          latitude: 55.751244,
          longitude: 37.618423,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        showMyLocationButton
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    flex: 1,
    width: '100%',
  },
});

export default App;
