#uvicorn main:app --reload

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from conexao import conectar
from security import create_acess_token, verify_password, get_password_hash

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

    query = "SELECT * FROM registros WHERE id = %s"
    cursor.execute(query, (dados.id,))
    usuario = cursor.fetchone()
    

    cursor.close()
    conexao.close()

    if not usuario or not verify_password(dados.senha, usuario["senha"]):
        raise HTTPException(status_code=401, detail="Credenciais inválidas")

    
    token = create_acess_token({
            "user_id": usuario["id"]
    })

    return {
            "status": "sucesso",
            "role": usuario["role"],
            "acess_token": token,
            "token_type": "bearer",
            "mensagem": "Login realizado!",
     }




@router.post("/cadastro")
def cad(dados: Cadastro):
    conexao = conectar()
    cursor = conexao.cursor(dictionary=True)

    # Verifica se ID já existe
    cursor.execute("SELECT * FROM registros WHERE id = %s", (dados.id,))
    if cursor.fetchone():
        raise HTTPException(status_code=400, detail="ID já cadastrado")

    # Verifica se email já existe
    cursor.execute("SELECT * FROM registros WHERE email = %s", (dados.email,))
    if cursor.fetchone():
        raise HTTPException(status_code=400, detail="email já cadastrado")
    

    # Insere usuário
    senha_hash = get_password_hash(dados.senha)
    query = "INSERT INTO registros (id, email, senha, role) VALUES (%s, %s, %s, %s)"
    cursor.execute(query, (dados.id, dados.email, senha_hash, dados.role))
    conexao.commit()

    cursor.close()
    conexao.close()

    return {"status": "sucesso", "mensagem": "Cadastro realizado!"}