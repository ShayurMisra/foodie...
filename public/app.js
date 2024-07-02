const searchMeal = async (e) => {
    e.preventDefault();

    // Select Elements
    const input = document.querySelector("#searchBar");
    const modal = document.getElementById("myModal");
    const closeBtn = document.querySelector(".close-btn");
    const title = document.querySelector(".title");
    const img = document.querySelector(".img");
    const info = document.querySelector(".info");
    const ingredientsOutput = document.querySelector(".ingredients");

    const showMealInfo = (meal) => {
        const { strMeal, strMealThumb, strInstructions } = meal;
        title.textContent = strMeal;
        img.style.backgroundImage = `url(${strMealThumb})`;
        info.textContent = strInstructions;

        const ingredients = [];

        for (let i = 1; i <= 20; i++) {
            if (meal[`strIngredient${i}`]) {
                ingredients.push(
                    `${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`
                );
            } else {
                break;
            }
        }

        const html = ingredients
            .map((ing) => `<li class="ing">${ing}</li>`)
            .join("");

        ingredientsOutput.innerHTML = html;
        modal.style.display = "block";
    };

    const showAlert = () => {
        alert("Meal not found :(");
    };

    // Fetch Data
    const fetchMealData = async (val) => {
        const res = await fetch(
            `https://www.themealdb.com/api/json/v1/1/search.php?s=${val}`
        );

        const { meals } = await res.json();
        return meals;
    };

    // Get the user value
    const val = input.value.trim();

    if (val) {
        const meals = await fetchMealData(val);

        if (!meals) {
            showAlert();
            return;
        }

        meals.forEach(showMealInfo);
    } else {
        alert("Please try searching for a meal :)");
    }

    // Close Modal
    closeBtn.onclick = function () {
        modal.style.display = "none";
    };

    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    };
};

const form = document.querySelector("form");
form.addEventListener("submit", searchMeal);