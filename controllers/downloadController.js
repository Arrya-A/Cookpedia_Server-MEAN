const downloads = require('../models/downloadModel')

//add 
exports.addRecipetoDownloadController = async (req,res)=>{
    console.log("Inside addRecipetoDownloadController");
    const {recipeId} = req.params
    const {name,cuisine} = req.body
    try{
        const existingRecipe = await downloads.findOne({recipeId})
        if(existingRecipe){
            existingRecipe.count +=1
            await existingRecipe.save()
            res.status(200).json(existingRecipe)
        }else{
           const newDownloadRecipe = new downloads({
            recipeId,recipeName:name,recipeCuisine:cuisine,count:1
           })
           await newDownloadRecipe.save()
           res.status(200).json(newDownloadRecipe)
        }
    }catch(err){
        res.status(401).json(err)
    }
}