# 
# The file contains the code for the basic logic of the database
# 
# The database is used to process user requests, 
# save personal results, open and close access, etc.
# 


import datetime
import sqlite3


# <-------------- USERS -------------->

def createDataBaseUsers() -> None:
    '''
    
    Creates a user database with authorization data. 
    Login, password and unique user ID.
    
    '''
    
    db = sqlite3.connect("users.db")
    cursor = db.cursor()
    
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            login TEXT NOT NULL,
            password TEXT NOT NULL
        )
    """)
    
    db.commit()
    db.close()


def addDataBaseUsers(login:str, password:str) -> str:
    '''
    
    Adds data to the user database. 
    It is used when registering users on the platform.
    
    Accepts the username and password for the user.
    
    '''
    
    # If the user has lists of users, then output an error
    if login in getUsers():
        return "Failed"
    
    db = sqlite3.connect("users.db")
    cursor = db.cursor()
    
    cursor.execute(f"""
        INSERT INTO users(login, password) VALUES('{login}', '{password}')
    """)
    
    db.commit()
    db.close()
    
    return "Success"


def getUserPassword(login:str) -> str:
    '''
    
    Get the user's password using his username. 
    It is necessary to verify the user's authorization on the platform.
    
    '''
    
    db = sqlite3.connect("users.db")
    cursor = db.cursor()
    
    data = cursor.execute(f"""
        SELECT password FROM users WHERE login='{login}'
    """)
    
    db.close()
    
    return data.fetchone()


def getUsers() -> list:
    '''
    
    Get a list of users who are registered on the platform.
    
    '''
    
    db = sqlite3.connect("users.db")
    cursor = db.cursor()
    
    data = cursor.execute(f"""
        SELECT * FROM users
    """)
    
    db.close()
    
    return data.fetchall()


def deleteUser(login:str) -> None:
    '''
    
    '''
    
    db = sqlite3.connect("users.db")
    cursor = db.cursor()
    
    cursor.execute(f"""
        DELETE FROM users WHERE login='{login}'
    """)
    
    db.commit()
    db.close()


# <-------------------- HISTORY ------------------>
def createDataBaseHistory() -> None:
    '''
    
    Creates a database with the user's history.
    
    The user's username will be used as the key. 
    The login must be unique, which means that we have all the necessary parameters 
    for positioning the user in other tables.
    
    '''
    
    db = sqlite3.connect("users.db")
    cursor = db.cursor()
    
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS history (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            login TEXT NOT NULL,
            name TEXT NOT NULL,
            date TEXT NOT NULL,
            level INTEGER NOT NULL,
            startPoint TEXT NOT NULL,
            endPoint TEXT NOT NULL
        )
    """)
    
    db.commit()
    db.close()


def addHistory(login:str, name:str, level:int, startPoint:str, endPoint:str) -> None:
    '''
    Add new user activity data to the history table. 
    
    - These are already completed routes! 
    
    - The time is calculated automatically at the time of receipt of the request.
    
    - The difficulty level is estimated automatically using a neural network.
    
    '''
    
    db = sqlite3.connect("users.db")
    cursor = db.cursor()
    
    # subtract the current date and time
    currentTime = datetime.datetime.now()
    date = f"{currentTime.day}.{currentTime.month}.{currentTime.year}"
    
    cursor.execute(f"""
        INSERT INTO history (login, name, date, level, startPoint, endPoint) \
            VALUES('{login}', '{name}', '{date}', {level}, '{startPoint}', '{endPoint}')
    """)
    
    db.commit()
    db.close()


def getHistory(login:str) -> tuple:
    '''
    
    Get the full history of the user that was passed as a parameter. 
    The data will be output as a tuple.
    
    '''
    
    db = sqlite3.connect("users.db")
    cursor = db.cursor()
    
    data = cursor.execute(f"""
        SELECT * FROM history WHERE login='{login}'
    """)
    
    db.close()
    return data.fetchone()


# <-------------- ROUTES -------------->
def createDataBaseRoute() -> None:
    '''

    '''
    
    db = sqlite3.connect("users.db")
    cursor = db.cursor()
    
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS routes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            login TEXT NOT NULL,
            name TEXT NOT NULL,
            date TEXT NOT NULL,
            level INTEGER NOT NULL,
            startPoint TEXT NOT NULL,
            endPoint TEXT NOT NULL
        )
    """)
    
    db.commit()
    db.close()


def addRoute(login:str, name:str, level:int, startPoint:str, endPoint:str) -> None:
    '''
    
    '''
    
    db = sqlite3.connect("users.db")
    cursor = db.cursor()
    
    # subtract the current date and time
    currentTime = datetime.datetime.now()
    date = f"{currentTime.day}.{currentTime.month}.{currentTime.year}"
    
    cursor.execute(f"""
        INSERT INTO routes (login, name, date, level, startPoint, endPoint) \
            VALUES('{login}', '{name}', '{date}', {level}, '{startPoint}', '{endPoint}')
    """)
    
    db.commit()
    db.close()


def deleteRoute(id:int) -> bool:
    '''
    
    '''
    
    db = sqlite3.connect("users.db")
    cursor = db.cursor()
    
    cursor.execute(f"""
        DELETE FROM routes WHERE id={id}
    """)
    
    db.commit()
    db.close()

    return True


def getRoutes(login:str) -> list:
    '''
    
    '''
    
    db = sqlite3.connect("users.db")
    cursor = db.cursor()
    
    data = cursor.execute(f"""
        SELECT * FROM routes WHERE login='{login}'
    """)
    
    db.close()

    return data.fetchall()




