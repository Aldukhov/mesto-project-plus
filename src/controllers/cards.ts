import { NextFunction, Request, Response } from "express";
import Card from "../models/card";
import { ForbiddenError, NotFoundError } from "../errors/customErrors";
import { IRequest } from "../constants/types";
import { deleteLikeById, addLikeById } from "./cardUpdateLikes";

const createCard = (req: IRequest, res: Response, next: NextFunction) => {
  Card.create({
    name: req.body.name,
    link: req.body.link,
    owner: req.user ? req.user._id : null,
  })
    .then((card) => res.send({ data: card }))
    .catch((error) => {
      next(error);
    });
};

const findAllCards = (req: Request, res: Response, next: NextFunction) => {
  return Card.find({})
    .then((card) => {
      res.send({ data: card });
    })
    .catch((error) => {
      next(error);
    });
};

const deleteCardById = async (
  req: IRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const card = await Card.findOne({ _id: req.params.cardId });
    if (!card) {
      throw new NotFoundError("Карточка не найдена");
    }

    if (card.owner?.valueOf() !== req.user?._id) {
      throw new ForbiddenError("Вы не можете удалить чужую карточку");
    }
    const deleteCard = await Card.findByIdAndDelete(req.params.cardId);

    res.send({ message: "Карточка удалена успешно", data: deleteCard });
  } catch (error) {
    next(error);
  }
};

export {
  deleteLikeById,
  addLikeById,
  deleteCardById,
  findAllCards,
  createCard,
};
