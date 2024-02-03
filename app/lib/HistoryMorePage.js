import React, {useEffect, useState} from 'react';
import { View, Text, Modal, TouchableOpacity } from 'react-native';

const InfoComponent = ({modalVisible, closeModal, data }) => {

  const [startName, changeStart] = useState('');
  const [endName, changeEnd] = useState('');
  

  const transformCoordinate = async () => {
    const start = data.startPoint.split("; ");
    const end = data.endPoint.split("; ");

    const apiUrlStart = `https://nominatim.openstreetmap.org/reverse?lat=${start[0]}&lon=${start[1]}&format=json`;
    const apiUrlEnd = `https://nominatim.openstreetmap.org/reverse?lat=${end[0]}&lon=${end[1]}&format=json`;

    try {
      const response1 = await fetch(apiUrlStart);
      const response2 = await fetch(apiUrlEnd);

      const data1 = await response1.json();
      const data2 = await response2.json();

      const placeName1 = data1.address.road + ", " + data1.address.suburb;
      const placeName2 = data2.address.road + ", " + data2.address.suburb;

      changeStart(placeName1);
      changeEnd(placeName2);

    } catch (error) {
      console.warn('Ошибка при выполнении запроса:', error);
    }
  };


  useEffect(() => {

    transformCoordinate();
  }, []);

    return (
      <View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={closeModal}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
                <View style={{flexDirection:"row"}}>
                  <Text style={{fontWeight: 'bold'}}> 
                    Название поездки: 
                  </Text>
                  <Text> {data.title}</Text>
                </View>
                <View style={{flexDirection:"row"}}>
                  <Text style={{fontWeight: 'bold'}}> 
                    Дата поездки: 
                  </Text>
                  <Text> {data.date}</Text>
                </View>
                <View style={{flexDirection:"row"}}>
                  <Text style={{fontWeight: 'bold'}}> 
                    Длина пройденного пути: 
                  </Text>
                  <Text> {data.len} км</Text>
                </View>
                <View style={{flexDirection:"row"}}>
                  <Text style={{fontWeight: 'bold'}}> 
                    Затраченное время поездки: 
                  </Text>
                  <Text> {data.time} ч</Text>
                </View>
                <View style={{flexDirection:"row"}}>
                  <Text style={{fontWeight: 'bold'}}> 
                    Средняя скорость: 
                  </Text>
                  <Text> {(data.len / (data.time)).toFixed(1)} км/ч</Text>
                </View>
                <View style={{flexDirection:"row"}}>
                  <Text style={{fontWeight: 'bold'}}>
                    Максимальный пульс в пути:
                </Text>
                </View>
                <View style={{flexDirection:"row"}}>
                <Text style={{fontWeight: 'bold'}}>
                    Минимальный пульс в пути:
                </Text>
                </View>
              
                
                <View style={{flexDirection:"row"}}>
                  <Text style={{fontWeight: 'bold'}}> 
                    Сложность поездки(расчетная): 
                  </Text>
                  <Text> {data.level}</Text>
                </View>
                <View style={{flexDirection:"row"}}>
                  <Text style={{fontWeight: 'bold'}}> 
                    Сложность поездки(реальная): 
                  </Text>
                  <Text> {data.level}</Text>
                </View>
                <View style={{flexDirection:"row"}}>
                  <Text style={{fontWeight: 'bold'}}> 
                    Начальная точка: 
                  </Text>
                  <Text> {startName}</Text>
                </View>
                <View style={{flexDirection:"row"}}>
                  <Text style={{fontWeight: 'bold'}}> 
                    Конечная точка: 
                  </Text>
                  <Text> {endName}</Text>
                </View>
                
              <TouchableOpacity 
                onPress={closeModal} 
                style={styles.closeButton}>
                <Text style={styles.closeButtonText}>Закрыть</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    );
};

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  closeButton: {
    marginTop: 10,
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    color: 'white',
  },
};

export default InfoComponent;
