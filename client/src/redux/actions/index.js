import axios from "axios";

export function getAllRecipes(){
    return async function(dispatch){
        try {
            const response = await axios.get('http://localhost:3001/recipes')
            return dispatch({
                type: 'GET_ALL_RECIPES',
                payload: response.data,
            })
        } catch (error) {
            console.log(error)
        }
    }
}

export function getRecipeByName(name) {
    return async function(dispatch) {
        try {
            const response = await axios.get(`http://localhost:3001/recipes/?name=${name}`)
            return dispatch({
                type: "GET_RECIPE_BY_NAME",
                payload: response.data
            })
        } catch (error) {
            console.log(error)
            alert("Recipe not found.")
        }
    }
}

export function getRecipeDetails(payload) {
    return async function(dispatch) {
        try {
            const response = await axios.get(`http://localhost:3001/recipes/${payload}`);
            return dispatch({
                type: "GET_RECIPE_DETAILS",
                payload: response.data
            })
        } catch (err) {
            console.log(err);
        }
    }
}

export function clearDetail(){
    return {
        type: "CLEAR_RECIPE_DETAIL"
    }
}

export function getDiets() {
    return async function(dispatch) {
        try {
            let response = await axios.get(`http://localhost:3001/types`);
            if(response.data.length < 13) response = await axios.get(`http://localhost:3001/types`);
            return dispatch({
                type: "GET_DIETS",
                payload: response.data.map(d => d.name)
            })
        } catch (err) {
            console.log(err);
        }
    }
}

export function createRecipe(payload) {
    return async function(dispatch) {
        try {
            var response = await axios.post(`/recipe`, payload);
            return dispatch({
                type: "CREATE_RECIPE",
                payload: response,
            })
        } catch (err) {
            console.log(err);
        }
    }
} 
export function filterByTypeDiet(payload) {
    return {
        type: "FILTER_BY_TYPE_DIET",
        payload
    }
};


export function orderByAlphabet(payload) {
    return {
        type: "ORDER_BY_ALPHABET",
        payload
    }
}


export function orderByScore(payload) {
    return {
        type: "ORDER_BY_SCORE",
        payload
    }
}