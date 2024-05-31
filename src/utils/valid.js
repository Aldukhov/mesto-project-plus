import { body, param } from "express-validator";

export const validateCreateUser = [
  body("email").isEmail().withMessage("Некорректный email"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Пароль должен быть минимум 6 символов"),
  body("name").notEmpty().withMessage("Имя обязательно"),
  body("about")
    .optional()
    .isString()
    .withMessage("Описание должно быть строкой"),
  body("avatar").optional().isURL().withMessage("Некорректный URL для аватара"),
];

export const validateLogin = [
  body("email").isEmail().withMessage("Некорректный email"),
  body("password").notEmpty().withMessage("Пароль обязателен"),
];

export const validateUserId = [
  param("userId")
    .isMongoId()
    .withMessage("Некорректный идентификатор пользователя"),
];

export const validateUpdateUserInfo = [
  body("name").notEmpty().withMessage("Имя обязательно"),
  body("about").notEmpty().withMessage("Описание обязательно"),
];

// Валидатор для обновления аватара пользователя
export const validateUpdateUserAvatar = [
  body("avatar").isURL().withMessage("Некорректный URL для аватара"),
];

export const validateCreateCard = [
  body("name").notEmpty().withMessage("Имя обязательно"),
  body("link").isURL().withMessage("Некорректный URL"),
];

export const validateUpdateCard = [
  body("name").optional().notEmpty().withMessage("Имя обязательно"),
  body("link").optional().isURL().withMessage("Некорректный URL"),
];

export const validateCardId = [
  param("cardId")
    .isMongoId()
    .withMessage("Некорректный идентификатор карточки"),
];
