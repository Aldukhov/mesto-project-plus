import { NextFunction, Request, Response } from 'express';
import Card from '../models/card'
import IncorrectData from 'errors/incorrectData';
import DataNotFound from 'errors/dataNotFound';

const checkErrors = (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.body.name || !req.body.link) {
      throw new IncorrectData('Имя и ссылка карточки обязательны для создания');
    }


    const urlPattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
    if (!urlPattern.test(req.body.link)) {
      throw new IncorrectData('Некорректный формат ссылки');
    }


    const maxNameLength = 30;
    if (req.body.name.length > maxNameLength) {
      throw new IncorrectData('Слишком длинное имя карточки');
    }


    next();
  } catch (error) {

    next(error);
  }
};

export const createCard = (req: Request, res: Response, next: NextFunction) => {
  // Вызываем функцию для проверки ошибок перед созданием карточки
  checkErrors(req, res, () => {
    Card.create({
      name: req.body.name,
      link: req.body.link,
      owner: req.user ? req.user._id : null,
      likes: req.body.likes,
      createdAt: req.body.createdAt
    })
      .then((card) => res.send({ data: card }))
      .catch(next);
  });
};

export const findAllCards = (req: Request, res: Response, next: NextFunction) => {
  return Card.find({})
    .then((card) => {
      if (!card) {
        throw new DataNotFound('Нет карточки с таким id')
      }
      res.send({ data: card })
    })
    .catch(next);
}

export const deleteCardById = (req: Request, res: Response, next: NextFunction) => {
  return Card.findByIdAndDelete(req.params.cardId)
    .then((card) => {
      if (!card) {
        throw new DataNotFound('Нет карточки с таким id')
      }
      res.send({ data: card })
    })
    .catch(next);
}


export const addLikeById = (req: Request, res: Response, next: NextFunction) => {
  if (req.user) {
    return Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true })
      .then((card) => {
        if (!card) {
          throw new DataNotFound('Нет карточки с таким id')
        }
        res.send({ data: card })
      })
      .catch(next);
  }
}

export const deleteLikeById = (req: Request, res: Response, next: NextFunction) => {
  if (req.user) {
    return Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true })
      .then((card) => {
        if (!card) {
          throw new DataNotFound('Нет карточки с таким id')
        }
        res.send({ data: card })
      })
      .catch(next);
  }
}
