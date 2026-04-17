import os
import urllib.parse
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from sqlalchemy import create_engine, Column, String, Text, Integer, DateTime
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import datetime

# ai_logic.py가 같은 폴더에 있어야 합니다.
from ai_logic import job_ai

app = FastAPI()

# CORS 설정: 프론트엔드 통신 허용
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# DB 설정
password = urllib.parse.quote_plus("k27943707!")
DB_URL = f"mysql+mysqlconnector://root:{password}@localhost/job_platform"
engine = create_engine(DB_URL)
SessionLocal = sessionmaker(bind=engine)
Base = declarative_base()

class LoginRequest(BaseModel):
    email: str
    password: str

class ChatRequest(BaseModel):
    message: str
    major: str

@app.get("/")
async def root():
    return {"status": "success", "message": "JobAI Backend is Running"}

@app.post("/login")
async def login(request: LoginRequest):
    print(f"로그인 시도: {request.email}")
    return {"status": "success", "message": "로그인 성공", "user": {"email": request.email}}

@app.post("/chat")
async def chat(request: ChatRequest):
    try:
        job_ai.crawl_and_save(request.major)
        answer = job_ai.get_answer(request.message, request.major)
        return {"answer": answer}
    except Exception as e:
        return {"answer": f"에러 발생: {str(e)}"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)