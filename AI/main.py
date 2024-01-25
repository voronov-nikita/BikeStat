import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler, LabelEncoder

# Загрузите данные из CSV-файла
data = pd.read_csv('ваш_файл.csv')

# Разделите данные на признаки (X) и метки (y)
X = data['Distance'].values.reshape(-1, 1)
y = data['Recommendation'].values

# Преобразуйте текстовые метки в числовой формат
label_encoder = LabelEncoder()
y = label_encoder.fit_transform(y)

# Разделите данные на обучающий и тестовый наборы
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Масштабирование данных
scaler = StandardScaler()
X_train = scaler.fit_transform(X_train)
X_test = scaler.transform(X_test)
