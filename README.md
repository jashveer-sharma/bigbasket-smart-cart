---

# 🛒 BigBasket Smart AI Cart

A **smart grocery shopping platform** inspired by BigBasket, enhanced with **AI-powered features** like AutoCart, Recipe-to-Cart, and a virtual Vending Machine.  
Built with **React (Vite)** on the frontend and **FastAPI** on the backend, with OpenAI/HuggingFace integration for smart list + recipe handling.

---

## ✨ Features

- 🔍 **Search & Categories** – Browse 8 categories (Fruits, Dairy, Snacks, Beverages, Staples, Kitchen, Personal Care, Household).  
- 🛒 **Smart Cart System** – Add/remove items with quantity stepper and live toasts.  
- ⚡ **AutoCart** – Paste a shopping list → instantly adds matched items, shows missing ones.  
- 🧑‍🍳 **Recipe-to-Cart** – Convert recipes (Paneer Butter Masala, Masala Dosa, Tea, etc.) into full ingredient lists, including spices.  
- 🧃 **Vending Machine UI** – Fun interactive vending interface with slots + glass overlay.  
- 👤 **Login/Profile** – Demo login, shows user profile if logged in.  
- 💳 **Checkout (Demo)** – Order summary + instant refund demo explanation.  
- 🎨 **UI Theme** – BigBasket-like (white, green, light green). Responsive & mobile-friendly.  
- 🔔 **Toasts Everywhere** – Actions (add/remove/auto/recipe/login) trigger smooth popups.  

---

## 📂 Project Structure

```bash
bigbasket-smart-ai-cart/
│
├── frontend/                  # React + Vite frontend
│   ├── public/                # Static assets
│   ├── src/
│   │   ├── components/        # Reusable UI components
│   │   ├── context/           # Global state (Cart, Auth, Toast)
│   │   ├── data/              # Catalog & categories
│   │   ├── pages/             # All pages (Home, Cart, AutoCart, Recipes, Vending, etc.)
│   │   ├── utils/             # Helpers (recipes etc.)
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── package.json
│   └── vite.config.js
│
├── backend/                   # FastAPI backend
│   ├── app.py                 # Main FastAPI app
│   ├── models/                # Future DB models
│   ├── services/              # AI + business logic
│   ├── requirements.txt       # Python dependencies
│   └── ...
│
├── screenshots/               # Project screenshots
│   ├── home.png
│   ├── vending.png
│   ├── autocart.png
│   └── recipe.png
│
└── README.md


---

## 🚀 Setup & Run Locally

### 1️⃣ Clone repo
```bash
git clone https://github.com/<your-username>/bigbasket-smart-ai-cart.git
cd bigbasket-smart-ai-cart


---

2️⃣ Frontend (React + Vite)

cd frontend
npm install
npm run dev

Runs on http://localhost:5173



---

3️⃣ Backend (FastAPI)

cd backend
python -m venv venv
venv\Scripts\activate   # (Windows)
source venv/bin/activate  # (Mac/Linux)

pip install -r requirements.txt
uvicorn app:app --reload --port 8000

Runs on http://localhost:8000



---

🌐 Deployment

Frontend (Netlify)

Base directory: frontend

Build command: npm run build

Publish directory: frontend/dist

Add netlify.toml (already configured for SPA routing).


Backend (Render / Railway / Heroku)

Deploy backend/ as a FastAPI service.

Expose API at https://your-backend.onrender.com.


Environment Variables (backend/.env)

OPENAI_API_KEY=your_openai_key_here
HF_API_KEY=your_huggingface_key_here

---

🤝 Contributing

1. Fork the repo


2. Create your feature branch (git checkout -b feature-x)


3. Commit changes (git commit -m "Add feature x")


4. Push to branch (git push origin feature-x)


5. Open Pull Request




---

📜 License

MIT License. Free to use & modify.


---

⭐ If you like this project, give it a star on GitHub!

---



