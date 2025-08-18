import os, json
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
import openai
from huggingface_hub import InferenceClient

# Load API keys
load_dotenv()
openai.api_key = os.getenv("OPENAI_API_KEY")
HF_API_KEY = os.getenv("HF_API_KEY")

# HuggingFace client (optional NLP models)
hf_client = InferenceClient(token=HF_API_KEY)

# FastAPI app
app = FastAPI(title="BigBasket Smart Cart API")

# Allow frontend CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # for dev
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load products dataset
with open("data/products.json") as f:
    PRODUCTS = json.load(f)

# -------------------------
# MODELS
# -------------------------
class CartRequest(BaseModel):
    items: list[str]

class RecipeRequest(BaseModel):
    recipe: str

class ChatRequest(BaseModel):
    prompt: str

# -------------------------
# ENDPOINTS
# -------------------------

@app.get("/products")
def list_products():
    return {"products": PRODUCTS}

@app.get("/products/search")
def search_products(q: str):
    q_lower = q.lower()
    results = [p for p in PRODUCTS if q_lower in p["name"].lower()]
    return {"results": results}

@app.post("/autocart")
def autocart(req: CartRequest):
    added, missing = [], []
    for item in req.items:
        match = next((p for p in PRODUCTS if item.lower() in p["name"].lower()), None)
        if match:
            added.append(match)
        else:
            missing.append(item)
    return {"added": added, "missing": missing}

@app.post("/recipes")
def recipe_to_cart(req: RecipeRequest):
    # AI expand recipe into ingredients
    prompt = f"List ingredients for {req.recipe}, include spices and condiments:"
    try:
        resp = openai.chat.completions.create(
            model="gpt-4o-mini",
            messages=[{"role":"user","content":prompt}],
            max_tokens=200
        )
        ingredients_text = resp.choices[0].message.content.strip()
        ingredients = [i.strip("-• \n") for i in ingredients_text.split("\n") if i.strip()]
    except Exception as e:
        raise HTTPException(500, f"OpenAI error: {e}")

    # Match ingredients to products
    available, missing = [], []
    for ing in ingredients:
        match = next((p for p in PRODUCTS if ing.lower() in p["name"].lower()), None)
        if match:
            available.append(match)
        else:
            missing.append(ing)

    return {"recipe": req.recipe, "available": available, "missing": missing}

@app.post("/chat")
def chat(req: ChatRequest):
    """General AI chat (demo)"""
    try:
        resp = openai.chat.completions.create(
            model="gpt-4o-mini",
            messages=[{"role":"user","content":req.prompt}],
            max_tokens=150
        )
        return {"reply": resp.choices[0].message.content.strip()}
    except Exception as e:
        raise HTTPException(500, f"Chat error: {e}")

@app.get("/refund-demo")
def refund_demo():
    return {
        "message": "Refunds are verified by joint count system — ensuring products returned match what was dispensed."
    }
