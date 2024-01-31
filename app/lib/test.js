import React, { useState } from 'react';
import { FlatList, TextInput, View, Text } from 'react-native';

const YourComponent = () => {
  const [data, setData] = useState([
    { id: 1, name: 'Item 1', level: 1 },
    { id: 2, name: 'Item 2', level: 2 },
    { id: 3, name: 'Item 3', level: 1 },
    { id: 4, name: 'Item 4', level: 1 },
    { id: 5, name: 'Item 5', level: 3 },
    { id: 6, name: 'Item 6', level: 3 },
    // Добавьте остальные элементы списка
  ]);

  const [filteredData, setFilteredData] = useState(data);
  const [labelsFilters, setLabelsFilters] = useState([]);

  const filterDataByLevels = () => {
    const newData = data.filter(item => labelsFilters.includes(item.level));
    setFilteredData(newData);
  };

  return (
    <View>
      <TextInput
        placeholder="Filter by levels (comma-separated)"
        onChangeText={text => {
          const levels = [1, 3]
          setLabelsFilters(levels);
          filterDataByLevels();
        }}
      />
      <FlatList
        data={filteredData}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View>
            <Text>{item.name}</Text>
            <Text>{`Level: ${item.level}`}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default YourComponent;
