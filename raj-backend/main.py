from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

# Allow frontend to communicate with backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_methods=["*"],
    allow_headers=["*"],
)

class ChatRequest(BaseModel):
    text: str

@app.post("/chat")
async def chat(request: ChatRequest):
    user_message = request.text.lower()

    if "survey" in user_message:
        reply = "Here are the top 3 insights from the survey..."
    elif "campaign" in user_message:
        reply = "Try a campaign around 'Design for Good'."
    else:
        reply = "Thanks! Let me think about that and get back to you."

    return { "reply": reply }
