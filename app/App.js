import AppNavigator from './lib/Navigation';
import React from 'react';

// загрузка основного приложения
// первоначально загружается обьект навигатора с начальным экраном - авторизация
const App = () => {
  return (
    <AppNavigator />
  );
};

export default App;
