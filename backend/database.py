from sqlalchemy import create_engine, Column, String, Text, Integer, DateTime
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import datetime
import urllib.parse

password = urllib.parse.quote_plus("k27943707!")
DB_URL = f"mysql+mysqlconnector://root:{password}@localhost/job_platform"

engine = create_engine(DB_URL)
SessionLocal = sessionmaker(bind=engine)
Base = declarative_base()

class User(Base):
    __tablename__ = "users"
    user_id = Column(String(50), primary_key=True)
    password = Column(String(50))
    major = Column(String(100))
    skills = Column(Text)

class ChatHistory(Base):
    __tablename__ = "chat_history"
    id = Column(Integer, primary_key=True)
    user_id = Column(String(50))
    message = Column(Text)
    role = Column(String(10))
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

Base.metadata.create_all(bind=engine)