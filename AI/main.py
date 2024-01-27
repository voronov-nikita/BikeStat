import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler, LabelEncoder
from keras.models import Sequential
from keras.layers import Dense

# Шаг 1: Загрузка данных из CSV файла
data = pd.read_csv('data.csv', delimiter=';')

# Шаг 2: Разделение данных на входные и выходные переменные
X = data.iloc[:, :-1].values
y = data.iloc[:, -1].values

# Шаг 3: Преобразование меток классов
label_encoder = LabelEncoder()
y = label_encoder.fit_transform(y)

# Шаг 4: Разделение данных на тренировочный и тестовый наборы
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Шаг 5: Нормализация данных
scaler = StandardScaler()
X_train = scaler.fit_transform(X_train)
X_test = scaler.transform(X_test)

# Шаг 6: Построение модели Keras
model = Sequential()
model.add(Dense(units=64, activation='relu', input_dim=X_train.shape[1]))
model.add(Dense(units=32, activation="relu"))
model.add(Dense(units=3, activation='softmax'))

# Шаг 7: Компиляция и обучение модели
model.compile(optimizer='adam', loss='sparse_categorical_crossentropy', metrics=['accuracy'])
model.fit(X_train, y_train, epochs=50, batch_size=32, validation_data=(X_test, y_test))

# Шаг 8: Оценка модели
loss, accuracy = model.evaluate(X_test, y_test)
print(f'Test Loss: {loss}, Test Accuracy: {accuracy}')

# Шаг 9: Предсказание новых данных
new_data = np.array([[39.1, 10.9, 67.4, 101.4, 8.3], [143.5,24.7,145.4,42.0,2.9],
                    [53.9,16.9,128.2,90.1,4.3], [47.6,10.3,91.3,136.7, 7.2],
                    [67.7, 15.2, 124.3, 144.7, 8.7]])
new_data = scaler.transform(new_data)
predictions = model.predict(new_data)

# Преобразование предсказаний обратно в оригинальные метки
predicted_labels = label_encoder.inverse_transform(predictions.argmax(axis=1))

# Вывод предсказанных меток
print(predicted_labels)
