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


from colorama import init, Fore
from server.datarequest import *


# импортируем цветовые фильтры
# для разделения результатов тестов
init(autoreset=True)


def test(func, data, answer):
    if func()['code'] == answer:
        print(Fore.GREEN + 'THE TEST IS PASSED!')
    else:
        print(Fore.RED + 'THE TEST IS FAILED')


test(get_data_from_server, None, 200)
test(get_data_from_server, "None", 200)
test(get_data_from_server, True, 200)
test(get_data_from_server, False, 200)
test(get_data_from_server, 12, 200)
test(get_data_from_server, 12/2, 200)
test(get_data_from_server, 13, 200)
test(get_data_from_server, get_data_from_server, 200)
test(get_data_from_server, 111111111111, 200)
test(get_data_from_server, "wldnvnod", 200)
test(get_data_from_server, 0, 200)
test(get_data_from_server, test, 200)
test(get_data_from_server, None, 200)
