# 
# The file contains the code for the basic logic of the database
# 
# The database is used to process user requests, 
# save personal results, open and close access, etc.
# 


import sqlite3


# <----------------------- USERS --------------------->

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


def addUsers(login:str, password:str) -> str:
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
    
    
    return data.fetchone()[0]


def getUsers() -> list:
    '''
    
    Get a list of users who are registered on the platform.
    
    '''
    
    db = sqlite3.connect("users.db")
    cursor = db.cursor()
    
    data = cursor.execute(f"""
        SELECT login FROM users
    """)

    
    return [i[0] for i in data.fetchall()]


def deleteUser(login:str) -> None:
    '''
    
    Deletes the user from the database. 
    This is necessary to clear user accounts if they wish.
    
    '''
    
    db = sqlite3.connect("users.db")
    cursor = db.cursor()
    
    cursor.execute(f"""
        DELETE FROM users WHERE login='{login}'
    """)
    
    db.commit()
    db.close()


# <---------------------------- HISTORY ------------------------------->
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
            endPoint TEXT NOT NULL,
            maxPulse FLOAT NOT NULL,
            minPulse FLOAT NOT NULL,
            averagePulse FLOAT NOT NULL,
            lengthWay FLOAT NOT NULL,
            time INTEGER NOT NULL
        )
    """)
    
    db.commit()
    db.close()


def addHistory(login:str, name:str, level:int, date:str, startPoint:str, endPoint:str, maxPulse:float, minPulse:float, averagePulse:float, lengthWay:float, time:int) -> None:
    '''
    Add new user activity data to the history table. 
    
    - These are already completed routes! 
    
    - The time is calculated automatically at the time of receipt of the request.
    
    - The difficulty level is estimated automatically using a neural network.
    
    '''
    
    db = sqlite3.connect("users.db")
    cursor = db.cursor()
    
    cursor.execute(f"""
        INSERT INTO history (login, name, date, level, startPoint, endPoint, maxPulse, minPulse, averagePulse, lengthWay, time) \
            VALUES('{login}', '{name}', '{date}', {level}, '{startPoint}', '{endPoint}', {maxPulse}, {minPulse}, {averagePulse}, {lengthWay}, {time})
    """)
    
    db.commit()
    db.close()


def getHistory(login:str) -> list:
    '''
    
    Get the full history of the user that was passed as a parameter. 
    The data will be output as a tuple.
    
    '''
    
    db = sqlite3.connect("users.db")
    cursor = db.cursor()
    
    data = cursor.execute(f"""
        SELECT * FROM history WHERE login='{login}'
    """)
    
    return data.fetchall()


# <-------------- ROUTES -------------->
def createDataBaseRoute() -> None:
    '''
    Creates a table with routes to track their status in the current position.
    The data is sorted in the following order:
    - unique identifier
    - user login
    - path name (entered by the user)
    - departure date (generated automatically)
    - estimated difficulty level (neural network)
    - starting and ending points of the route
    
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
            endPoint TEXT NOT NULL,
            lengthWay FLOAT NOT NULL,
            time INTEGER NOT NULL
        )
    """)
    
    db.commit()
    db.close()


def addRoute(login:str, name:str, level:int, date:str, startPoint:str, endPoint:str, length:float, time:int) -> None:
    '''
    Adds a new route to the route table. 
    Used when planning a route for some future.
    
    It includes the login parameter of the current user, 
    the name of the route, 
    the estimated difficulty, 
    the starting and ending points of the route
    
    '''
    
    db = sqlite3.connect("users.db")
    cursor = db.cursor()
    
    cursor.execute(f"""
        INSERT INTO routes (login, name, date, level, startPoint, endPoint, lengthWay, time) \
            VALUES('{login}', '{name}', '{date}', {level}, '{startPoint}', '{endPoint}', {length}, {time})
    """)
    
    db.commit()
    db.close()


def deleteRoute(login:str, name:str) -> bool:
    '''
    Deletes a route from the current one. 
    It is used in cases when the route has already been completed and 
    it needs to be moved to the history table.
    
    It takes into account the NAME of our route.
    '''
    
    db = sqlite3.connect("users.db")
    cursor = db.cursor()
    
    cursor.execute(f"""
        DELETE FROM routes WHERE name='{name}' AND login='{login}'
    """)
    
    db.commit()
    db.close()

    return True


def getRoutes(login:str) -> list:
    '''
    
    Get all current routes for a given user by their unique username. 
    It is used where it is necessary to display all the planned routes of the user.
    
    '''
    
    db = sqlite3.connect("users.db")
    cursor = db.cursor()
    
    data = cursor.execute(f"""
        SELECT * FROM routes WHERE login='{login}'
    """)

    return data.fetchall()


