import { NextFunction, Request, Response } from 'express';
import Card from '../models/card'
import IncorrectData from 'errors/incorrectData';
import DataNotFound from 'errors/dataNotFound';
import { handleErrors } from 'errors/handleErrors';



export const createCard = (req: Request, res: Response, next: NextFunction) => {
  // Вызываем функцию для проверки ошибок перед созданием карточки

    Card.create({
      name: req.body.name,
      link: req.body.link,
      owner: req.user ? req.user._id : null,
    })
      .then((card) => res.send({ data: card }))
      .catch((error) => {
        handleErrors(error, req, res, next);
      });
};

export const findAllCards = (req: Request, res: Response, next: NextFunction) => {
  return Card.find({})
    .then((card) => {

      res.send({ data: card })
    })
    .catch((error) => {
      handleErrors(error, req, res, next);
    });
}

export const deleteCardById = (req: Request, res: Response, next: NextFunction) => {
  return Card.findByIdAndDelete(req.params.cardId)
    .then((card) => {

      res.send({ data: card })
    })
    .catch((error) => {
      handleErrors(error, req, res, next);
    });
}


export const addLikeById = (req: Request, res: Response, next: NextFunction) => {
  if (req.user) {
    return Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true })
      .then((card) => {

        res.send({ data: card })
      })
      .catch((error) => {
        handleErrors(error, req, res, next);
      });
  }
}

export const deleteLikeById = (req: Request, res: Response, next: NextFunction) => {
  if (req.user) {
    return Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true })
      .then((card) => {

        res.send({ data: card })
      })
      .catch((error) => {
        handleErrors(error, req, res, next);
      });
  }
}
