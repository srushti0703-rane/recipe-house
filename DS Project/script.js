// ✅ Load existing recipes from localStorage, or fallback to defaults
const defaultRecipes = [
  {
    name: "Chicken Curry",
    category: "non-veg",
    rating: 4,
    ingredients: ["chicken", "onion", "tomato", "spices"],
    instructions: `1. Marinate chicken with spices.
2. Fry onions until golden.
3. Add tomatoes and cook till soft.
4. Add chicken and simmer.
5. Serve hot with rice.`,
    image: "img/spicy-chicken-curry.jpg"
  },
  {
    name: "Grilled Fish",
    category: "non-veg",
    rating: 4,
    ingredients: ["fish", "lemon", "garlic", "spices"],
    instructions: `1. Marinate fish with lemon and garlic.
2. Grill until golden.
3. Serve with chutney or salad.`,
    image: "img/Grilled-Whole-Fish-tight.jpg"
  },
  {
    name: "Paneer Butter Masala",
    category: "veg",
    rating: 4,
    ingredients: ["paneer", "butter", "cream", "tomato", "spices"],
    instructions: `1. Fry paneer cubes.
2. Make tomato gravy.
3. Add butter, cream, and simmer with paneer.`,
    image: "img/Paneer Butter Masala.jpg"
  },
  {
        name: "Veg Biryani",
        category: "veg",
        ingredients: ["rice", "vegetables", "yogurt", "spices"],
        instructions: "1. Cook vegetables with spices.\n2. Layer with rice.\n3. Steam and serve hot.",
        image: "img/Veg Biryani.jpg"
    },
    {
        name: "Egg Curry",
        category: "non-veg",
        ingredients: ["eggs", "onion", "tomato", "spices"],
        instructions: "1. Boil eggs.\n2. Fry onions and tomatoes.\n3. Add spices and eggs.\n4. Simmer for 10 minutes.",
        image: "img/Egg Curry.jpg"
    },
    {
        name: "Aloo Paratha",
        category: "veg",
        ingredients: ["potato", "flour", "spices", "ghee"],
        instructions: "1. Make aloo stuffing.\n2. Fill in dough.\n3. Roast with ghee.",
        image: "img/Aloo Paratha.jpg"
    },
    {
        name: "Palak Paneer",
        category: "veg",
        ingredients: ["spinach", "paneer", "cream", "spices"],
        instructions: "1. Blanch spinach.\n2. Make puree and cook with paneer and spices.",
        image: "img/Palak Paneer.jpg"
    },
    {
        name: "Butter Chicken",
        category: "non-veg",
        ingredients: ["chicken", "butter", "cream", "tomato", "spices"],
        instructions: "1. Grill marinated chicken.\n2. Cook in buttery tomato gravy.\n3. Add cream and simmer.",
        image: "img/Butter Chicken.jpg"
    },
    {
        name: "Chole Bhature",
        category: "veg",
        ingredients: ["chickpeas", "flour", "onion", "spices"],
        instructions: "1. Cook chole masala.\n2. Fry bhature.\n3. Serve hot.",
        image: "img/chole bhature.jpg"
    },
    {
        name: "Mutton Rogan Josh",
        category: "non-veg",
        ingredients: ["mutton", "yogurt", "onion", "spices"],
        instructions: "1. Cook mutton with spices.\n2. Add yogurt gravy.\n3. Simmer till tender.",
        image: "img/Mutton Rogan Josh.jpg"
    },
    {
        name: "Masala Dosa",
        category: "veg",
        ingredients: ["rice", "dal", "potato", "spices"],
        instructions: "1. Make dosa batter.\n2. Prepare aloo filling.\n3. Cook and stuff dosas.",
        image: "img/Masala Dosa.jpg"
    },
    {
        name: "Fish Fry",
        category: "non-veg",
        ingredients: ["fish", "spices", "rice flour"],
        instructions: "1. Marinate fish.\n2. Coat with flour.\n3. Deep fry till golden.",
        image: "img/paplet Fish Fryjpg.jpg"
    },
    {
        name: "Mix Veg Curry",
        category: "veg",
        ingredients: ["mixed vegetables", "onion", "tomato", "spices"],
        instructions: "1. Sauté veggies.\n2. Cook gravy and combine.\n3. Serve with rice or roti.",
        image: "img/Mix Veg Curry.jpg"
    },
    {
        name: "Tandoori Chicken",
        category: "non-veg",
        ingredients: ["chicken", "yogurt", "spices"],
        instructions: "1. Marinate chicken in yogurt mix.\n2. Bake or grill.\n3. Serve with onions.",
        image: "img/Tandoori Chicken.jpg"
    },
    {
        name: "Dal Tadka",
        category: "veg",
        ingredients: ["dal", "onion", "tomato", "ghee", "spices"],
        instructions: "1. Boil dal.\n2. Make tadka.\n3. Combine and serve hot.",
        image: "img/Dal Tadka.jpg"
    }
];

let recipes = JSON.parse(localStorage.getItem("recipes")) || defaultRecipes;

function saveRecipesToLocalStorage() {
  localStorage.setItem("recipes", JSON.stringify(recipes));
}

const recipeList = document.getElementById("recipe-list");
const popup = document.getElementById("popup");
const closePopup = document.getElementById("close-popup");

closePopup.onclick = () => popup.classList.remove("active");

function displayRecipes(list) {
  recipeList.innerHTML = "";
  list.forEach((r, index) => {
    const card = document.createElement("div");
    card.className = "recipe-card";
    card.innerHTML = `
      <img src="${r.image}" alt="${r.name}">
      <div class="card-body">
        <h3>${r.name}
        <span style="font-size: 0.9rem; font-weight: bold; padding: 2px 8px; border-radius: 6px; background-color: ${
          r.rating <= 2 ? "#ff4d4f" : r.rating === 3 ? "#facc15" : "#22c55e"
        }; color: white; text-shadow: 0 0 4px #000;">${r.rating || 4} ★</span></h3>
        <p>${r.category}</p>
        <button onclick="editRecipe(${index})">✏️ Edit</button>
        <button onclick="deleteRecipe(${index})">🗑️ Delete</button>
      </div>
    `;
    card.addEventListener("click", (e) => {
      if (!e.target.matches("button")) showPopup(r);
    });
    recipeList.appendChild(card);
  });
}

function showPopup(recipe) {
  document.getElementById("popup-img").src = recipe.image;
  document.getElementById("popup-title").innerText = recipe.name;
  document.getElementById("popup-category").innerHTML = `${recipe.category} | <span style="background: linear-gradient(90deg, #facc15, #f59e0b); padding: 4px 10px; border-radius: 8px; color: #000; font-weight: bold;">${recipe.rating || 4} ★</span>`;

  const ingredientsList = document.getElementById("popup-ingredients");
  ingredientsList.innerHTML = "";
  recipe.ingredients.forEach((ing) => {
    const li = document.createElement("li");
    li.innerText = ing;
    ingredientsList.appendChild(li);
  });

  const instructionList = document.getElementById("popup-instructions");
  instructionList.innerHTML = "";
  recipe.instructions
    .split(/\n/)
    .filter(Boolean)
    .forEach((step) => {
      const li = document.createElement("li");
      li.innerText = step.trim();
      instructionList.appendChild(li);
    });

  popup.classList.add("active");
}

function filterRecipes(type) {
  if (type === "all") displayRecipes(recipes);
  else {
    const filtered = recipes.filter((r) => r.category === type);
    displayRecipes(filtered);
  }
}

function editRecipe(index) {
  const r = recipes[index];
  document.getElementById("new-name").value = r.name;
  document.getElementById("new-category").value = r.category;
  document.getElementById("new-ingredients").value = r.ingredients.join(", ");
  document.getElementById("new-instructions").value = r.instructions;
  document.getElementById("new-img").value = r.image;
  recipes.splice(index, 1);
  saveRecipesToLocalStorage();
  scrollToForm();
}

function deleteRecipe(index) {
  if (confirm("Are you sure you want to delete this recipe?")) {
    recipes.splice(index, 1);
    saveRecipesToLocalStorage();
    displayRecipes(recipes);
  }
}

document.getElementById("recipe-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("new-name").value.trim();
  const category = document.getElementById("new-category").value.trim();
  const ingredients = document.getElementById("new-ingredients").value
    .split(",")
    .map((i) => i.trim());
  const instructions = document.getElementById("new-instructions").value.trim();
  const imageFile = document.getElementById("new-image")?.files[0];
  const imageUrl = document.getElementById("new-img").value.trim();

  const newRecipe = {
    name,
    category,
    rating: 4,
    ingredients,
    instructions,
    image: "",
  };

  if (imageFile) {
    const reader = new FileReader();
    reader.onload = function (e) {
      newRecipe.image = e.target.result;
      recipes.push(newRecipe);
      saveRecipesToLocalStorage();
      displayRecipes(recipes);
    };
    reader.readAsDataURL(imageFile);
  } else {
    newRecipe.image = imageUrl || "img/default.jpg";
    recipes.push(newRecipe);
    saveRecipesToLocalStorage();
    displayRecipes(recipes);
  }

  this.reset();
});

function scrollToForm() {
  document.querySelector(".add-recipe").scrollIntoView({ behavior: "smooth" });
}

document.getElementById("search").addEventListener("input", function () {
  const query = this.value.toLowerCase();
  const filtered = recipes.filter(
    (r) =>
      r.name.toLowerCase().includes(query) ||
      r.ingredients.some((i) => i.toLowerCase().includes(query))
  );
  displayRecipes(filtered);
});

document.getElementById("theme-toggle").addEventListener("click", function () {
  document.body.classList.toggle("dark");
  this.textContent = document.body.classList.contains("dark")
    ? "☀️ Bright Mode"
    : "🌙 Dark Mode";
});

function rate(stars) {
  document.querySelectorAll(".star").forEach((s, i) => {
    s.classList.toggle("active", i < stars);
  });

  const title = document.getElementById("popup-title").innerText;
  const recipe = recipes.find((r) => r.name === title);
  if (recipe) {
    recipe.rating = stars;
    saveRecipesToLocalStorage();
    displayRecipes(recipes);
  }
}

// 🔁 Initial render from localStorage
displayRecipes(recipes);
