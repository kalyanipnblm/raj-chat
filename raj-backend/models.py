from datetime import datetime
from sqlmodel import SQLModel, Field

class ChatTurn(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    role: str
    text: str
    created_at: datetime = Field(default_factory=datetime.utcnow)
