from dotenv import load_dotenv
load_dotenv()           

import os

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from db     import init_db, get_session
import models
from models import ChatTurn
from pydantic import BaseModel
from openai import OpenAI
from sqlmodel import select

openai_client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

app = FastAPI()

@app.on_event("startup")
def on_startup():
    init_db()
    
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:4200",                    
        "https://raj-chat-jqtz.onrender.com"        # deployed UI
    ],
    allow_methods=["*"],
    allow_headers=["*"],
)

class ChatRequest(BaseModel):
    message: str

@app.post("/chat")
async def chat(req: ChatRequest):
    system  = "You are Raj, a senior brand strategist AI that gives short but valuable insights."
    context = (
        "Survey data: awareness 45%, engagement 32%.\n"
        "Target audience: urban Gen Z and millennials.\n"
        "Brand pillars: Creativity, Sustainability, Inclusion."
    )
    messages = [
        {"role": "system",  "content": system},
        {"role": "system",  "content": context},
        {"role": "user",    "content": req.message},
    ]

    session = get_session()
    session.add( ChatTurn(role="user", text=req.message) )
    session.commit()

    try:
        completion = openai_client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=messages
        )
        reply = completion.choices[0].message.content
    except Exception:
        reply = (
            "⚠️ Demo fallback: “With brand awareness at 45%, "
            "consider boosting digital campaigns aimed at urban millennials.”"
        )

    session.add( ChatTurn(role="bot", text=reply) )
    session.commit()
    session.close()

    return {"reply": reply}
                                               

@app.get("/history")
def history():
    session = get_session()
    turns = session.exec(
        select(ChatTurn)
        .order_by(ChatTurn.created_at.desc())
        .limit(5)
    ).all()
    session.close()
    return [{"role": t.role, "text": t.text} for t in reversed(turns)]    



