const { Router } = require('express');
const { get_DataBaseID, getById, get_AllRecipes } = require('../controllers/recipes');
const router = Router();



router.get('/', async function (req,res){
    let { name } = req.query

    try {
        let info = await get_AllRecipes()
        if (name) {
            let recipeByName = await info.filter(r => r.name.toLowerCase().includes(name.toString().toLowerCase())); // Utilizo LowerCase para evitar problemas con la comparación.
            if(recipeByName.length) {
                let recipes = recipeByName.map(r => {
                    return { 
                        id: r.id,
                        name: r.name,
                        summary: r.summary,
                        ready: r.ready,
                        healthScore: r.healthScore,
                        image: r.image,
                        steps: r.steps,
                        diets: r.diets ? r.diets : r.diets.map(r => r.name)
                    }
                })
                return res.status(200).send(recipes);
            }
            return res.status(400).send('Recipe not found.');
        }
        else{
            res.send(info)
        }
    } catch (error) {
        res.send(error)
    }

})

router.get('/:id', async function(req,res){
    const { id } = req.params
    let validate = id.includes("-")
    
    try {
        if(validate){
            let recipeDB = await get_DataBaseID(id)
            return res.send(recipeDB)
        }else{
            let findApi = await getById(id)
            return res.send(findApi)
        }
    } catch (error) {
        res.send(error)
    }
})

module.exports = router;