const searchBox=document.querySelector('.searchBox');
const searchBtn=document.querySelector('.searchBtn');
const recipeContainer =document.querySelector('.recipe-container');
const recipeDetailsContent =document.querySelector('.recipe-details-content');
const recipeCloseBtn =document.querySelector('.recipe-close-btn');


const fetchRecipes = async (query) =>{
    recipeContainer.innerHTML="Fetching for your fav fav recipes..."
    const data= await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
 const response= await data.json();
 recipeContainer.innerHTML="";

 response.meals.forEach(meal => {
    // console.log(meal);
const recipeDiv=document.createElement('div');
recipeDiv.classList.add('recipe');
recipeDiv.innerHTML=`
<img src="${meal.strMealThumb}">
<h3>${meal.strMeal}</h3>
<p>${meal.strArea}</p>
<p>${meal.strCategory}</p>

`
const button=document.createElement('button');
button.textContent="View Recipe";   
recipeDiv.appendChild(button);
button.addEventListener('click',()=>{
    openRecipePopup(meal);
});
recipeContainer.appendChild(recipeDiv);
 });
//  console.log(response);
}
const fetchIngridients=(meal)=>{
let ingridientsList="";
for (let i=1;i<=20;i++)
{
    const ingridient=meal[`strIngridrients${i}`];
    if(ingridient){
        const measure=meal[`strMeasure${i}`];
        ingridientsList +=`<li>${measure} ${ingridient} </li>`
    }
    else{
        break;

    }
}
return ingridientsList;
}
const openRecipePopup=(meal)=>{
    recipeDetailsContent.innerHTML=`
    <h2 class="recipeName">${meal.strMeal}</h2> 
    // <h3>Ingridients</h3> 
    <ul>${fetchIngridients(meal)}</ul>
    
    <div>
        <h3>Instructions: </h3>
        <p class="recipeInstructions"> ${meal.strInstructions}</p>
        </div>
    `
    console.log(openRecipePopup);
    recipeDetailsContent.parentElement.style.display= "block";
   
}
recipeCloseBtn.addEventListener=('click',  () => {
    recipeDetailsContent.parentElement.style.display= "none";
});
searchBtn.addEventListener('click',(e) =>{
    e.preventDefault();
    const searchInput=searchBox.value.trim();
    fetchRecipes(searchInput);
    // console.log("Button clicked");
});