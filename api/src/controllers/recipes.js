const axios = require("axios");
const { Diet, Recipe } = require("../db");
const { API_KEY, URL_SPOONACULAR } = process.env;

const getAll = async () => {
    let apiInfo = await axios.get(`${URL_SPOONACULAR}/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`)
    let resultApi = apiInfo.data.results
    const infoFull = await resultApi?.map((r) => {
        return {
            id: r.id,
            name: r.title,
            summary: r.summary,
            ready: r.readyInMinutes,
            healthScore: r.healthScore,
            image: r.image,
            steps: r.analyzedInstructions[0]?.steps.map(s => {
                return {
                    number: s.number,
                    step: s.step,
                }
            }),
            diets: r.diets,
            dish: r.dishTypes,
        }
    })
    return infoFull;

}

const getById = async (id) => {
    const apiID = await axios.get(`${URL_SPOONACULAR}/recipes/${id}/information?apiKey=${API_KEY}`)

    const  detail  = apiID.data;

    let recipeDetail = {
        id,
        name: detail.title,
        summary: detail.summary,
        ready: detail.readyInMinutes,
        healthScore: detail.healthScore,
        image: detail.image,
        steps: detail.analyzedInstructions[0]?.steps.map(s => {
            return {
                number: s.number,
                step: s.step,
            }
        }),
        dish: detail.dishTypes,
        diets: detail.diets,
    }
    
    return recipeDetail;

}
const get_DataBaseID = async (id) => {
    return await Recipe.findByPk(id, {
        include: {
            model: Diet,
            attributes: ['name'],
            through: {
                attributes: [],
            }
        }
    })
}
const get_DataBase = async () => {
    return await Recipe.findAll({
        include: {
            model: Diet,
            attributes: ['name'],
            through: {
                attributes: [],
            }

        }
    });
}
const get_AllRecipes = async () => {
    const getApi = await getAll();
    const getDataBase = await get_DataBase();
    const all = getApi.concat(getDataBase);
    // const all = [...getApi, ...getDataBase]
    return all;
}

module.exports = {
    getAll,
    getById,
    get_AllRecipes,
    get_DataBase,
    get_DataBaseID
}