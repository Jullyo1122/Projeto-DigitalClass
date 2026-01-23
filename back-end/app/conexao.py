import mysql.connector
from mysql.connector import Error

def conectar():
    """Estabelece conexao com o banco de dados"""
    try:
        conexao = mysql.connector.connect(host="localhost", user="root", password="Jullyocris123#", database="usuarios")
        if conexao.is_connected():
            print("Concexao realizada com sucesso!")
            return conexao
    except Error as e:
        print("Erro ao conectar com o banco de dados", e)
        return None

conexao = conectar()
