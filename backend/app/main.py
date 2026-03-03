from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from auth import router as auth_router
from areaaluno import router as aluno_router
from areaprofessor import router as prof_router

app = FastAPI()

# CORS para permitir o Angular acessar
origins = [
    "http://localhost:4200",
    "http://127.0.0.1:4200"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Inclui os routers com prefixos
app.include_router(auth_router, prefix="/auth", tags=["Auth"])
app.include_router(aluno_router, prefix="/aluno", tags=["Aluno"])
app.include_router(prof_router, prefix="/prof", tags=["Professor"])
