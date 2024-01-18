import React from 'react';
import { View, Text } from 'react-native';
import Graf from './ElemGraphics'; // Подключите библиотеку для графиков

const RoundedBox = ({ children }) => (
  <View
    style={{
      backgroundColor: '#fafcfa',
      padding: 10,
      borderRadius: 10,
      marginBottom: 10,
    }}>
    {children}
  </View>
);

// Генерация случайных данных для графиков
const generateRandomData = () => {
  const data = [];
  for (let i = 0; i < 10; i++) {
    data.push({ name: i, value: Math.floor(Math.random() * 100) });
  }
  return data;
};

const App = () => {
  // Генерация случайных данных для каждого графика
  const dataForChart1 = generateRandomData();
  const dataForChart2 = generateRandomData();
  const dataForChart3 = generateRandomData();
  const dataForChart4 = generateRandomData();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {/* Верхний уровень */}
      <View style={{ flexDirection: 'row' }}>
        <View style={{ flex: 1, marginRight: 10 }}>
          <RoundedBox>
            <Graf dataArray={dataForChart1} />
            <Text>Первый график</Text>
          </RoundedBox>
        </View>
        <View style={{ flex: 1 }}>
          <RoundedBox>
            <Graf dataArray={dataForChart2} />
            <Text>Второй график</Text>
          </RoundedBox>
        </View>
      </View>

      {/* Нижний уровень */}
      <View style={{ flexDirection: 'row', marginTop: 20 }}>
        <View style={{ flex: 1, marginRight: 10 }}>
          <RoundedBox>
            <Graf dataArray={dataForChart3} />
            <Text>Третий график</Text>
          </RoundedBox>
        </View>
        <View style={{ flex: 1 }}>
          <RoundedBox>
            <Graf dataArray={dataForChart4} />
            <Text>Четвертый график</Text>
          </RoundedBox>
        </View>
      </View>
    </View>
  );
};

export default App;
