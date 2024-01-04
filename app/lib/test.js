// import React, { useState } from 'react';
// import { View, StyleSheet } from 'react-native';
// import { Calendar } from 'react-native-calendars';

// const MyCalendar = () => {
//   const [selectedDate, setSelectedDate] = useState('');

//   const onDayPress = (day) => {
//     setSelectedDate(day.dateString);
//     console.log("Выбранная дата:", day.dateString);
//   };

//   return (
//     <View style={styles.container}>
//       <Calendar
//         onDayPress={onDayPress}
//         markedDates={{ [selectedDate]: { selected: true, marked: true, selectedColor: 'blue' } }}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: '#ffffff',
//   },
// });

// export default MyCalendar;
