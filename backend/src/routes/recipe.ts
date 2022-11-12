import { RecipeModel } from "../models"
import { Request, Response, NextFunction } from "express"

export const recipeMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id = req.params.id
    if (!id) {
      res.status(400).send({
        error: 'Invalid ID'
      })
      return
    }
    const recipe = await RecipeModel.findById(id).exec()
    if (!recipe) {
      res.status(404).send({ error: 'recipe not found' })
      return
    }
    res.send(recipe)
  } catch (err) {
    // could validate this beforehand
    if (err.message.includes('Cast to ObjectId failed')) {
      res.status(400).send({
        error: 'Invalid ID'
      })
      return
    }
    res.status(500).send({ error: err.message })
  }
}
