from fastapi import APIRouter
from pydantic import BaseModel
from conexao import conectar

router = APIRouter()

class Login(BaseModel):
    id: int
    senha: str

class Cadastro(BaseModel):
    id: int
    email: str
    senha: str
    role: str


@router.post("/login")
def auth(dados: Login):
    conexao = conectar()
    cursor = conexao.cursor(dictionary=True)

    query = "SELECT * FROM registros WHERE id = %s AND senha = %s"
    cursor.execute(query, (dados.id, dados.senha))
    usuario = cursor.fetchone()

    cursor.close()
    conexao.close()

    if usuario:
        return {
            "status": "sucesso",
            "mensagem": "Login realizado!",
            "role": usuario["tipo"]
        }

    return {"status": "erro", "mensagem": "Usuário ou senha incorretos"}


@router.post("/cadastro")
def cad(dados: Cadastro):
    conexao = conectar()
    cursor = conexao.cursor(dictionary=True)

    # Verifica se ID já existe
    cursor.execute("SELECT * FROM registros WHERE id = %s", (dados.id,))
    if cursor.fetchone():
        return {"status": "erro", "mensagem": "ID já cadastrado"}

    # Verifica se email já existe
    cursor.execute("SELECT * FROM registros WHERE email = %s", (dados.email,))
    if cursor.fetchone():
        return {"status": "erro", "mensagem": "Email já cadastrado"}

    # Insere usuário
    query = "INSERT INTO registros (id, email, senha, role) VALUES (%s, %s, %s, %s)"
    cursor.execute(query, (dados.id, dados.email, dados.senha, dados.role))
    conexao.commit()

    cursor.close()
    conexao.close()

    return {"status": "sucesso", "mensagem": "Cadastro realizado!"}