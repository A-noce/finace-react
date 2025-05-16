import { z } from "zod";
import { FieldError } from "react-hook-form";

const zodMessage = {
  too_small: "Deve ter o mínimo de % caracter(es).",
  too_big: "Deve ter o até % caracter(es).",
  minNumber: "Deve ser maior que %.",
  required: "O campo é necessário.",
  oneOf: "Deve ser: %.",
  notOneOf: "Não deve ser: %.",
  invalid_type: "Campo inválido.",
} as const;

const zodMessageParse = (error: FieldError) => {
  return error.message;
};

const convertMessage = (message: keyof typeof zodMessage, values: string[]) => {
  let msg: string = zodMessage[message];
  values.forEach((v) => {
    msg = msg.replace("%", v);
  });
  return msg;
};

z.setErrorMap((error, _ctx) => {
  switch (error.code) {
    case "invalid_type": {
      return {
        message: "Campo inválido",
      };
    }

    case "too_small": {
      return {
        message: convertMessage("too_small", [error.minimum.toString()]),
      };
    }

    case "too_big": {
      return {
        message: convertMessage("too_big", [error.maximum.toString()]),
      };
    }

    case "invalid_date": {
      return {
        message: "Data inválida",
      };
    }

    default: {
      return {
        message: _ctx.defaultError,
      };
    }
  }
});

export { zodMessageParse, convertMessage, z };
