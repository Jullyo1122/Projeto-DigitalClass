import mysql.connector
from mysql.connector import Error

def conectar():
    try:
        conexao = mysql.connector.connect(
            host="localhost",
            user="root",
            password="Jullyocris123#",
            database="usuarios"
        )
        return conexao
    except Error as e:
        print("Erro ao conectar:", e)
        return None