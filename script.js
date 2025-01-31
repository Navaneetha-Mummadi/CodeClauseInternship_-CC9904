let recipes = [];
let currentRecipeIndex = -1;

function saveRecipe() {
    const name = document.getElementById('recipe-name').value;
    const ingredients = document.getElementById('recipe-ingredients').value;
    const instructions = document.getElementById('recipe-instructions').value;
    const image = document.getElementById('recipe-image').files[0];

    if (currentRecipeIndex === -1) { 
        const reader = new FileReader();
        reader.onload = function(e) {
            const newRecipe = {
                name: name,
                ingredients: ingredients,
                instructions: instructions,
                image: e.target.result
            };
            recipes.push(newRecipe);
            displayRecipes();
            clearForm();
        };
        if (image) {
            reader.readAsDataURL(image); 
        } else {
            
            const newRecipe = {
                name: name,
                ingredients: ingredients,
                instructions: instructions,
                image: null 
            };
            recipes.push(newRecipe);
            displayRecipes();
            clearForm();
        }
    } else {
        recipes[currentRecipeIndex].name = name;
        recipes[currentRecipeIndex].ingredients = ingredients;
        recipes[currentRecipeIndex].instructions = instructions;
        
        if (image) { 
            const reader = new FileReader();
            reader.onload = function(e) {
                recipes[currentRecipeIndex].image = e.target.result;
                displayRecipes();
                clearForm();
                currentRecipeIndex = -1; 
            };
            reader.readAsDataURL(image);
        } else {
        
            displayRecipes();
            clearForm();
            currentRecipeIndex = -1; 
        }
    }
}

function editRecipe(index) {
    currentRecipeIndex = index;
    const recipe = recipes[index];
    document.getElementById('recipe-name').value = recipe.name;
    document.getElementById('recipe-ingredients').value = recipe.ingredients;
    document.getElementById('recipe-instructions').value = recipe.instructions;
   
}

function deleteRecipe(index) {
    recipes.splice(index, 1);
    displayRecipes();
}

function cancelEdit() {
    clearForm();
    currentRecipeIndex = -1;
}

function clearForm() {
    document.getElementById('recipe-name').value = '';
    document.getElementById('recipe-ingredients').value = '';
    document.getElementById('recipe-instructions').value = '';
    document.getElementById('recipe-image').value = '';
}

function displayRecipes() {
    const recipeList = document.getElementById('recipe-display');
    recipeList.innerHTML = '';

    recipes.forEach((recipe, index) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <img src="${recipe.image ? recipe.image : 'placeholder.jpg'}" alt="Recipe Image"> 
            <h3>${recipe.name}</h3>
            <p>Ingredients: ${recipe.ingredients}</p>
            <p>Instructions: ${recipe.instructions}</p>
            <button onclick="editRecipe(${index})">Edit</button>
            <button onclick="deleteRecipe(${index})">Delete</button>
        `;
        recipeList.appendChild(listItem);
    });
}


displayRecipes();