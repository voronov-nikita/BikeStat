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

n = 0
def testing(func, p, targetAnswer):
    global n
    n+=1
    print(n, end=" ")
    try:
        if (func(*p) == targetAnswer):
            print(Fore.GREEN + 'THE TEST IS PASSED!')
        else:
            print(Fore.RED + 'THE TEST IS FAILED')
    except:
        print(Fore.RED + 'THE TEST IS FAILED')
        

testing(addRoute, ["login", "name", 1, "2024-01-01", "53.1214214121; 24.242312424", "53.1214214121; 24.242312424", 78234.0, 1002123], None)
testing(addRoute, ["login", "use", 1, "2024-01-01", "53.1214214121; 24.242312424", "53.1214214121; 24.242312424", 78234.0, 1002123], None)
testing(addRoute, ["lot", "user2", 2, "2024-01-02", "53.0; 24.242312424", "53.1214214121; 24.242312424", 60000.5, 987654], None)
testing(addRoute, ["login", "user3", 3, "2024-01-03", "53.1214214121; 24.242312424", "53.1214214121; 24.242312424", 120000.75, 345678], None)
testing(addRoute, ["lout", "usr4", 4, "2024-01-04", "53.14121; 24.242312424", "53.1214214121; 24.242312424", 45000.25, 789012], None)
testing(addRoute, ["login", "user5", 5, "2024-01-05", "53.1214214121; 24.242312424", "53.1214214121; 24.242312424", 89000.9, 123456], None)
testing(addRoute, ["lon", "user7", 7, "2024-01-07", "53.1214214121; 24.242312424", "53.1214214121; 24.242312424", 76000.6, 234567], None)
testing(addRoute, ["in", "user9", 9, "2024-01-09", "53.1214; 2ю24", "53.14121; 24.242312424", 9800.2, 567890], None)

testing(addUsers, ("john_doe", "P@ssw0rd1"), "Success")
testing(addUsers, ("alice_smith", "SecurePwd123"), "Success")
testing(addUsers, ("bob_jenkins", "Pass123word"), "Success")
testing(addUsers, ("emma_brown", "StrongP@ss"), "Success")
testing(addUsers, ("charlie_white", "Password!123"), "Success")
testing(addUsers, ("olivia_jones", "SecretP@ssword"), "Success")
testing(addUsers, ("jack_wilson", "Pa$$w0rd"), "Success")
testing(addUsers, ("lily_thompson", "SecurePwd789"), "Success")
testing(addUsers, ("michael_davis", "P@ssword!567"), "Success")
testing(addUsers, ("sophia_miller", "StrongPwd890"), "Success")
testing(addUsers, ("ethan_martin", "Pa$$word987"), "Success")
testing(addUsers, ("ava_jackson", "Secure123Pwd"), "Success")
testing(addUsers, ("noah_clark", "P@ssw0rd!345"), "Success")
testing(addUsers, ("amelia_hall", "StrongPwd456"), "Success")
testing(addUsers, ("owen_baker", "Pa$$789word"), "Success")
testing(addUsers, ("mia_walker", "Secure!123Pwd"), "Success")
testing(addUsers, ("james_wright", "P@ssword890"), "Success")
testing(addUsers, ("grace_adams", "StrongP@ssword"), "Success")
testing(addUsers, ("logan_evans", "Pa$$word123"), "Success")
testing(addUsers, ("chloe_fisher", "SecurePwd456"), "Success")


testing(getUserPassword, ("john_doe", ), "P@ssw0rd1")
testing(getUserPassword, ("alice_smith", ), "SecurePwd123")
testing(getUserPassword, ("bob_jenkins", ), "Pass123word")
testing(getUserPassword, ("emma_brown", ), "StrongP@ss")
testing(getUserPassword, ("charlie_white", ), "Password!123")
testing(getUserPassword, ("olivia_jones", ), "SecretP@ssword")
testing(getUserPassword, ("jack_wilson", ), "Pa$$w0rd")
testing(getUserPassword, ("lily_thompson", ), "SecurePwd789")
testing(getUserPassword, ("michael_davis", ), "P@ssword!567")
testing(getUserPassword, ("sophia_miller", ), "StrongPwd890")
testing(getUserPassword, ("ethan_martin", ), "Pa$$word987")
testing(getUserPassword, ("ava_jackson", ), "Secure123Pwd")
testing(getUserPassword, ("noah_clark", ), "P@ssw0rd!345")
testing(getUserPassword, ("amelia_hall", ), "StrongPwd456")
testing(getUserPassword, ("owen_baker", ), "Pa$$789word")
testing(getUserPassword, ("mia_walker", ), "Secure!123Pwd")
testing(getUserPassword, ("james_wright", ), "P@ssword890")
testing(getUserPassword, ("grace_adams", ), "StrongP@ssword")
testing(getUserPassword, ("logan_evans", ), "Pa$$word123")
testing(getUserPassword, ("chloe_fisher", ), "SecurePwd456")


t =["login", "john_doe","alice_smith","bob_jenkins","emma_brown","charlie_white","olivia_jones","jack_wilson","lily_thompson","michael_davis","sophia_miller","ethan_martin","ava_jackson","noah_clark","amelia_hall","owen_baker","mia_walker","james_wright","grace_adams","logan_evans","chloe_fisher",]
testing(getUsers, [], t)