# db.py
from sqlmodel import SQLModel, Session, create_engine

SQLITE_URL = "sqlite:///database.db"
engine     = create_engine(SQLITE_URL, echo=True)

def init_db():
    # By the time init_db runs, main.py already imported `models.ChatTurn`,
    # so SQLModel.metadata knows about that table.
    SQLModel.metadata.create_all(engine)

def get_session() -> Session:
    return Session(engine)
