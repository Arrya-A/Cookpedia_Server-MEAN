const recipes = require('../models/recipeModel')

//getAllRecipes
exports.getAllRecipesController = async (req,res)=>{
    console.log("inside getAllRecipesController");
    
    try{
        const allRecipes = await recipes.find()
        res.status(200).json(allRecipes)
    }catch(err){
        res.status(401).json(err)
    }
}

//getARecipes
exports.getARecipeController = async (req,res)=>{
    console.log("inside getARecipeController");
    const {id} = req.params
    try{
        const viewRecipe = await recipes.findOne({_id:id})
        res.status(200).json(viewRecipe)
    }catch(err){
        res.status(401).json(err)
    }
}

//get related recipe
exports.getRelatedRecipeController = async(req,res)=>{
    console.log("Inside getRelatedRecipeController");
    const searchCuisine = req.query.cuisine
    const query= {
        cuisine :{
            $regex:searchCuisine,$options:"i"
        }
    }
    try{
        const allRelatedRecipes = await recipes.find(query)
        res.status(200).json(allRelatedRecipes)
    }catch(err){
        res.status(401).json(err)
    }
}