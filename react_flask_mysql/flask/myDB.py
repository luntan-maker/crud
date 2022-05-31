from sqlite3 import connect
import mysql.connector
import mysql
import os
from dotenv import load_dotenv

load_dotenv()

user = os.getenv("User")
password = os.getenv("Password")
host = os.getenv("Host")
database = os.getenv("Database")

def connectToDB():
    cnx = mysql.connector.connect(user=user, password=password,
                              host=host,
                              )
    return cnx
def checkDatabase(cnx):
    mycursor = cnx.cursor()
    mycursor.execute("CREATE DATABASE IF NOT EXISTS mydatabase")
    return mysql.connector.connect(
            host=host,
            user=user,
            password=password,
            database=database
        )       
def checkTable(cnx):
    mycursor = cnx.cursor(buffered=True)
    # mycursor.execute("SHOW TABLES")
    try:
        mycursor.execute("SELECT 1 FROM mytable LIMIT 1")
    except:

        mycursor.execute("CREATE TABLE mytable (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255))")
def closeDB(cnx):
    cnx.close()
def onLoad():
    cnx = connectToDB()
    db = checkDatabase(cnx)
    checkTable(db)
    return db
#Create
def submitData(data):
    db = onLoad()
    mycursor = db.cursor()
    sql = "INSERT INTO mytable (name) VALUES (%s)"
    values = (data,)
    mycursor.execute(sql, values)
    db.commit()
    return True
#Read
def getAll():
    db = onLoad()
    mycursor = db.cursor()
    mycursor.execute("SELECT * FROM mytable")
    return mycursor.fetchall()
# Update
def changeOne(id, data):
    db = onLoad()
    mycursor = db.cursor()
    sql = "UPDATE mytable SET name = %s WHERE name = %s"
    val = (data, id)
    mycursor.execute(sql, val)
    db.commit()
    return True
# Delete
def deleteOne(id):
    db = onLoad()
    mycursor = db.cursor()
    sql = "DELETE FROM mytable WHERE id = %s"
    data = (id,)
    mycursor.execute(sql, data)
    db.commit()
    return True