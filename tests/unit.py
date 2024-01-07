# 
# The file describes the code testing functions. 
# 
# The import of all functions for testing by regular unit testing 
# is agreed upon according to the terms of reference.
# 


# прописываем добавленные пути, 
# чтобы разрешить импорты из дргуих подмодулей
import sys
sys.path.append('../')

# импортируем цветовые фильтры 
# для разделения результатов тестов
from colorama import init, Fore
init(autoreset=True)


from server.datarequest import *


print(Fore.GREEN + 'THE TEST IS PASSED!')
print(Fore.RED + 'THE TEST IS FAILED')


