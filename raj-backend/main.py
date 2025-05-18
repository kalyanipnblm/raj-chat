from dotenv import load_dotenv
load_dotenv()           

import os
print("Loaded OPENAI_API_KEY:", os.getenv("OPENAI_API_KEY"))

from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from openai import OpenAI

openai_client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:4200"],
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

    try:
        completion = openai_client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=messages
        )
        reply = completion.choices[0].message.content
    except Exception as e:
        print("❌ OpenAI call failed:", e)
        reply = (
            "⚠️ Demo fallback: “With brand awareness at 45%, "
            "consider boosting digital campaigns aimed at urban millennials.”"
        )

    return {"reply": reply}



