import React from 'react';
import { View, Text, Modal, TouchableOpacity } from 'react-native';


const InfoComponent = ({modalVisible, closeModal, data }) => {


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

              <Text> Название поездки: {data.title} </Text>
              <Text> Дата поездки: {data.date} </Text>
              <Text> Длина пройденного пути: {data.len} км</Text>
              <Text> Затраченное время поездки: {data.time} </Text>
              <Text> Сложность поездки: {data.date} </Text>
              <Text> Начальная точка: ( {data.startPoint} )</Text>
              <Text> Конечная точка: ( {data.endPoint} ) </Text>

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
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    color: 'white',
  },
};

export default InfoComponent;
