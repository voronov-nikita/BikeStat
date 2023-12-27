# 
# The file contains the code for the basic logic of the database
# 
# The database is used to process user requests, 
# save personal results, open and close access, etc.
# 

import sqlite3



def createDataBase() -> None:
    '''
    Сюда писать описание того, что делает функция...
    Желательно на английском
    '''
    
    db = sqlite3.connect("users.db")
    cursor = db.cursor()
    
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY,
            login TEXT NOT NULL,
            password TEXT NOT NULL
        )
    """)
    
    db.commit()
    db.close()
