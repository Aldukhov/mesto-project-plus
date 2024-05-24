import { NextFunction, Request, Response } from "express";
import Card from "../models/card";
import { body, param } from "express-validator";
import { ForbiddenError, NotFoundError } from "../errors/customErrors";
import { IRequest } from "../constants/types";

export const createCard = [
  body("name").notEmpty().withMessage("Имя обязательно"),
  body("link").isURL().withMessage("Некорректный URL"),
  (req: IRequest, res: Response, next: NextFunction) => {
    Card.create({
      name: req.body.name,
      link: req.body.link,
      owner: req.user ? req.user._id : null,
    })
      .then((card) => res.send({ data: card }))
      .catch((error) => {
        next(error);
      });
  },
];

export const findAllCards = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  return Card.find({})
    .then((card) => {
      res.send({ data: card });
    })
    .catch((error) => {
      next(error);
    });
};

export const deleteCardById = [
  param("cardId")
    .isMongoId()
    .withMessage("Некорректный идентификатор карточки"),
  async (req: IRequest, res: Response, next: NextFunction) => {
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
  },
];

export const addLikeById = [
  param("cardId")
    .isMongoId()
    .withMessage("Некорректный идентификатор карточки"),
  async (req: IRequest, res: Response, next: NextFunction) => {
    if (req.user) {
      try {
        const card = await Card.findByIdAndUpdate(
          req.params.cardId,
          { $addToSet: { likes: req.user._id } },
          { new: true }
        );

        if (!card) {
          throw new NotFoundError("Карточка не найдена");
        }

        res.send({ data: card });
      } catch (error) {
        next(error);
      }
    }
  },
];

export const deleteLikeById = [
  param("cardId")
    .isMongoId()
    .withMessage("Некорректный идентификатор карточки"),
  async (req: IRequest, res: Response, next: NextFunction) => {
    if (req.user) {
      try {
        const card = await Card.findByIdAndUpdate(
          req.params.cardId,
          { $pull: { likes: req.user._id } },
          { new: true }
        );
        if (!card) {
          throw new NotFoundError("Карточка не найдена");
        }

        res.send({ data: card });
      } catch (error) {
        next(error);
      }
    }
  },
];
