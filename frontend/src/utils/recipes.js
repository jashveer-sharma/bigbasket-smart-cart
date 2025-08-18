export const RECIPES = {
  "paneer butter masala": [
    "Paneer Fresh 200g","Tomato Hybrid","Onion Red","Butter 100g","Fresh Cream 200ml",
    "Ginger","Garlic","Green Chilli","Cumin Seeds 100g","Coriander Powder 200g",
    "Turmeric Powder 200g","Red Chilli Powder 200g","Garam Masala 100g","Kasuri Methi",
    "Sugar","Salt","Oil 1L","Bay Leaf","Cardamom","Cinnamon"
  ],
  "masala dosa": [
    "Rice 1kg","Urad Dal 1kg","Poha 1kg","Potato New","Onion Red","Green Chilli",
    "Curry Leaves","Mustard Oil 1L","Turmeric Powder 200g","Coriander Powder 200g",
    "Ghee 500ml","Salt"
  ],
  "veg biryani": [
    "Basmati Rice 5kg","Carrot Ooty","Green Peas","Beans French","Cauliflower",
    "Onion Red","Tomato Hybrid","Curd 500g","Ghee 500ml","Cumin Seeds 100g",
    "Coriander Powder 200g","Turmeric Powder 200g","Red Chilli Powder 200g","Garam Masala 100g",
    "Bay Leaf","Cinnamon","Cardamom","Cloves","Mint Leaves","Coriander"
  ]
}

export function ingredientsFor(name){
  if(!name) return []
  const key = name.toLowerCase().trim()
  return RECIPES[key] || []
}