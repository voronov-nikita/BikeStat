from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense

# Создайте модель
model = Sequential()
model.add(Dense(10, input_dim=1, activation='relu'))
model.add(Dense(1, activation='sigmoid'))

# Скомпилируйте модель
model.compile(optimizer='adam', loss='binary_crossentropy', metrics=['accuracy'])

# Обучите модель
model.fit(X_train, y_train, epochs=50, batch_size=2, validation_data=(X_test, y_test))
