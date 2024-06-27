const apiKey = process.env.REACT_APP_API_KEY;

const fetchMeals = async(offset, selectPreferences, dislikes, allergies) => {
    try {
        const request = await fetch(
            `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&number=3&offset=${offset}`
        );

        const data = await request.json();

        if (data && data.status === 'failure') {
            return { error: data.message };
        }

        // Filter meals based on selectPreferences, dislikes, and allergies
        const filteredMeals = data.results.filter(meal => {
            const ingredients = meal.missedIngredients.map(ingredient => ingredient.name.toLowerCase());

            const isPreferred = selectPreferences.every(pref =>
                ingredients.some(ingredient => ingredient.includes(pref.item.toLowerCase()))
            );
            const isDisliked = dislikes.some(dislike =>
                ingredients.includes(dislike.toLowerCase())
            );
            const isAllergic = allergies.some(allergy =>
                ingredients.includes(allergy.toLowerCase())
            );

            return isPreferred && !isDisliked && !isAllergic;
        });

        return filteredMeals;
    } catch (error) {
        console.error("Error fetching meals:", error);
        return { error: "An error occurred while fetching meals." };
    }
};

export default fetchMeals;