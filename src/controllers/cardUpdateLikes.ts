import { NextFunction, Request, Response } from "express";
import Card from "../models/card";
import { NotFoundError } from "../errors/customErrors";
import { IRequest } from "../constants/types";

export const addLikeById = async (
  req: IRequest,
  res: Response,
  next: NextFunction
) => {
  updateCard(req, res, next, { $addToSet: { likes: req.user?._id } });
};

export const deleteLikeById = async (
  req: IRequest,
  res: Response,
  next: NextFunction
) => {
  updateCard(req, res, next, { $pull: { likes: req.user?._id } });
};

const updateCard = async (
  req: IRequest,
  res: Response,
  next: NextFunction,
  update: object
) => {
  try {
    const card = await Card.findByIdAndUpdate(req.params.cardId, update, {
      new: true,
    });
    if (!card) {
      throw new NotFoundError("Карточка не найдена");
    }

    res.send({ data: card });
  } catch (error) {
    next(error);
  }
};
