function getFoodRecipe(){
     document.getElementById('data_container').innerHTML='';
    var food_name = document.getElementById('food_name').value;
    var recipeUrl = 'https://api.edamam.com/search?&app_id=87274108&app_key=e72041001b97fcb9fae645f387321f36&q='+food_name;
    apiData(recipeUrl);
    document.querySelector('form').reset();
}



async function apiData(url){
    try{
        let Resp = await fetch(url);
        let data = await Resp.json();
        let recieHits = data.hits;
        recieHits.forEach(recieHitsData => {
            createCard(recieHitsData.recipe);
        });
    }catch(error){
        console.log(error);
    }
}

function CreateElementfun(element,elemClass='',elemId=''){
    var element = document.createElement(element);
    element.setAttribute('class',elemClass);
    element.setAttribute('id',elemId);
    return element;
}

function createCard(params){
    cardData = params;
    var data_container = document.querySelector('#data_container');
    var card = CreateElementfun('div','card_box card mb-4');
    var card_row = CreateElementfun('div','row no-gutters');
    var col1 = CreateElementfun('div','col-lg-8');
    var card_body = CreateElementfun('div','card-body');
    var card_title = CreateElementfun('h3','card-title text-uppercase');
    card_title.innerHTML = cardData.label;
    var card_diet = CreateElementfun('h5','card-title');
    if(cardData.dietLabels==''){
        cardData.dietLabels = "..."
    }
    card_diet.innerHTML = "Diet: "+cardData.dietLabels;
    var card_meal = CreateElementfun('h5','card-text');
    if(cardData.mealType==undefined){
        cardData.mealType = "Lunch/Dinner"
    }
    card_meal.innerHTML = "MealType: "+cardData.mealType;
    var card_calories = CreateElementfun('h5','card-text');
    card_calories.innerHTML = 'Calories: '+Math.ceil(cardData.calories);
    var card_healthLabels = CreateElementfun('p','card-text');
    card_healthLabels.innerHTML = `<b>Health: </b>`+[cardData.healthLabels[0],cardData.healthLabels[1],cardData.healthLabels[2],cardData.healthLabels[3],cardData.healthLabels[4],cardData.healthLabels[5]];
     var card_link = CreateElementfun('a','nav-link');
    card_link.innerHTML = "Get Recipe";
    card_link.setAttribute('href',cardData.url);
    card_body.append(card_title,card_diet,card_meal,card_calories,card_healthLabels,card_link);
    col1.appendChild(card_body);

    var col2 = CreateElementfun('div','col-lg-4');
    var card_img = CreateElementfun('img','card-img Thumbnail');
    card_img.setAttribute('alt',"Thumbnail");
    card_img.setAttribute('src',cardData.image);
    col2.appendChild(card_img);

    card_row.append(col1,col2);
    card.appendChild(card_row);
    card.style.boxShadow = "3px 4px 4px gray";
   
    data_container.appendChild(card);
}

function getRecipe(params){
    var recipeData = params;
    console.log(recipeData);
}

