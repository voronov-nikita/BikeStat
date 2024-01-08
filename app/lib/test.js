import React, { useState, useEffect, useRef } from 'react';
import { Modal, TouchableOpacity, View, Text, StyleSheet } from 'react-native';

const App = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const startTimeRef = useRef(null);
  const elapsedSecondsRef = useRef(0);
  const [maxPulse, setMaxPulse] = useState(0);
  const [minPulse, setMinPulse] = useState(0);

  useEffect(() => {
    let timerId;

    if (isRunning) {
      setMaxPulse(0);
      setMinPulse(Number.MAX_SAFE_INTEGER);

      // Start or resume timer
      startTimeRef.current = new Date().getTime() - elapsedSecondsRef.current * 1000;

      timerId = setInterval(() => {
        const currentTime = new Date().getTime();
        elapsedSecondsRef.current = (currentTime - startTimeRef.current) / 1000; // Update elapsed seconds

        setMaxPulse((prev) => Math.max(prev, simulatePulse()));
        setMinPulse((prev) => Math.min(prev, simulatePulse()));
      }, 100); // Уменьшил интервал до 100 миллисекунд для ускоренного таймера
    } else {
      // Clear timer when stopped
      clearInterval(timerId);
    }

    // Cleanup on unmount
    return () => clearInterval(timerId);
  }, [isRunning]);

  const simulatePulse = () => Math.floor(Math.random() * (150 - 60 + 1)) + 60;

  const handleStartStop = () => {
    setIsRunning((prev) => !prev);
  };

  const handleModalToggle = () => {
    if (!isRunning) {
      // Reset timer when modal is opened
      elapsedSecondsRef.current = 0;
      setMaxPulse(0);
      setMinPulse(Number.MAX_SAFE_INTEGER);
    }
    setModalVisible(!modalVisible);
    setIsRunning(false); // Stop timer when modal is closed
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleModalToggle} style={styles.button}>
        <Text style={styles.buttonText}>Open Modal</Text>
      </TouchableOpacity>

      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.modalContainer}>
          <TouchableOpacity onPress={handleModalToggle} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Close Modal</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleStartStop} style={styles.startButton}>
            <Text style={styles.startButtonText}>{isRunning ? 'Stop' : 'Start'}</Text>
          </TouchableOpacity>

          <Text style={styles.timerText}>Time: {elapsedSecondsRef.current.toFixed(2)}s</Text>
          <Text style={styles.pulseText}>
            Max Pulse: {maxPulse}, Min Pulse: {minPulse}
          </Text>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
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
  },
  closeButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    position: 'absolute',
    top: 20,
    right: 20,
  },
  closeButtonText: {
    color: 'white',
  },
  startButton: {
    backgroundColor: 'green',
    padding: 15,
    borderRadius: 50,
    marginVertical: 20,
  },
  startButtonText: {
    color: 'white',
  },
  timerText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  pulseText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default App;
