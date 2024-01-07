# 
# The file describes separate testing of database functions. 
# 
# For testing, individual examples of 
# the interaction of the user's request 
# on the database response in accordance with the expected response were taken
# 


# прописываем добавленные пути, 
# чтобы разрешить импорты из дргуих подмодулей
import sys
sys.path.append('../')

# импортируем цветовые фильтры 
# для разделения результатов тестов
from colorama import init, Fore
init(autoreset=True)


from server.database import *


print(Fore.GREEN + "OK")
print(Fore.RED + "NOT")