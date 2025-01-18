import { Request, Response } from "express"
import { Tag } from "../models/tagModel"
import catchAsync from "../utils/catchAsync"

// Get all tags
export const getTags = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const tags = await Tag.findAll()
    res.status(200).json({
      status: "success",
      length: tags.length,
      tags
    })
  }
)

// Create a new tag
export const createTag = catchAsync(
  async (req: Request, res: Response, next) => {
    const { title } = req.body
    const newTag = await Tag.create({ title })
    res.status(201).json({
      status: "success",
      newTag
    })
  }
)
