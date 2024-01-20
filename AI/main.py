import numpy as np
import tensorflow as tf
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Embedding, LSTM, Dense

# Загрузка и предобработка данных
# Здесь используется простой текст для примера. В реальных проектах используйте свои данные.
text = "Пример простого текста для обучения рекуррентной нейронной сети."

# Создание словаря символов
chars = sorted(list(set(text)))
char_to_index = {char: idx for idx, char in enumerate(chars)}
index_to_char = {idx: char for idx, char in enumerate(chars)}

# Преобразование текста в числовой формат
max_len = len(text)
x_data = [char_to_index[char] for char in text]
y_data = np.roll(x_data, shift=-1)
y_data[-1] = x_data[0]

# Преобразование входных данных в формат one-hot
x_data = tf.keras.utils.to_categorical(x_data, num_classes=len(chars))
y_data = tf.keras.utils.to_categorical(y_data, num_classes=len(chars))

# Создание модели RNN
model = Sequential()
model.add(Embedding(input_dim=len(chars), output_dim=50, input_length=max_len))
model.add(LSTM(100))
model.add(Dense(len(chars), activation='softmax'))

# Компиляция модели
model.compile(optimizer='adam', loss='categorical_crossentropy', metrics=['accuracy'])

# Обучение модели
model.fit(x_data, y_data, epochs=100, batch_size=1)

# Генерация текста с использованием обученной модели
seed_text = "Пример"
for _ in range(50):
    x_pred = np.array([[char_to_index[char] for char in seed_text]])
    x_pred = tf.keras.utils.to_categorical(x_pred, num_classes=len(chars))
    prediction = model.predict(x_pred, verbose=0)
    next_index = np.argmax(prediction)
    next_char = index_to_char[next_index]
    seed_text += next_char

print(seed_text)
