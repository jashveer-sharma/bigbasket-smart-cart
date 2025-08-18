const API_URL = "http://localhost:8000"; // backend base

// -------------------
// Products
// -------------------
export async function fetchProducts() {
  const res = await fetch(`${API_URL}/products`);
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
}

export async function searchProducts(query) {
  const res = await fetch(`${API_URL}/products/search?q=${encodeURIComponent(query)}`);
  if (!res.ok) throw new Error("Search failed");
  return res.json();
}

// -------------------
// AutoCart
// -------------------
export async function autoCart(items) {
  const res = await fetch(`${API_URL}/autocart`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ items })
  });
  if (!res.ok) throw new Error("AutoCart failed");
  return res.json();
}

// -------------------
// Recipes → Cart
// -------------------
export async function recipeToCart(recipe) {
  const res = await fetch(`${API_URL}/recipes`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ recipe })
  });
  if (!res.ok) throw new Error("Recipe API failed");
  return res.json();
}

// -------------------
// AI Chat (optional)
// -------------------
export async function chatWithAI(prompt) {
  const res = await fetch(`${API_URL}/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt })
  });
  if (!res.ok) throw new Error("Chat failed");
  return res.json();
}

// -------------------
// Refund demo
// -------------------
export async function refundInfo() {
  const res = await fetch(`${API_URL}/refund-demo`);
  if (!res.ok) throw new Error("Refund demo failed");
  return res.json();
}
