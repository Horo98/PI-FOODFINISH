const { Router } = require("express");
const { Diet } = require("../db");
const { types } = require("../controllers/diet")
const router = Router();


router.get('/', async(req, res, next) => {
    try { 
        types.forEach(async n => {            // Aca llenamos la base de datos con los types precargados
           await Diet.findOrCreate({          // que esta en controllers, 
                where: {                      // una vez cargados este codigo no se utiliza mas 
                    name: n                   // 
                }                             //
            })                                //
        });                                   //
        const diets = await Diet.findAll();
        res.send(diets);
    } catch (err) {
        next(err);
    }
})


module.exports = router;