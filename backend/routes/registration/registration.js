import express from "express";
import {
  validateCnpj,
  validateCpf,
  validateEmail,
  validateEmpty,
  validateFullName,
  validateLength,
  validatePhone,
} from "./../../providers/utils/useValidations.js";

const router = express.Router();

router.post("/", (req, res) => {
  const { type, date, doc, email, name, password, phone } = req.body;

  if (!validateEmpty(type)) {
    return res.status(412).send({ error: "Type is required" });
  }

  const isPerson = type.toLowerCase() === "person";

  if (!validateEmpty(email)) {
    return res.status(412).send({ error: "Email is required" });
  } else if (!validateEmail(email)) {
    return res.status(412).send({ error: "Invalid Email" });
  }

  if (!validateEmpty(name)) {
    return res.status(412).send({ error: "Name is required" });
  } else if (!validateFullName(name)) {
    return res.status(412).send({ error: "Name needs to be complete" });
  }

  if (!validateEmpty(doc)) {
    return res
      .status(412)
      .send({ error: `${isPerson ? "CPF" : "CNPJ"} is required` });
  } else if (isPerson && !validateCpf(doc)) {
    return res.status(412).send({ error: "CPF is invalid" });
  } else if (!isPerson && !validateCnpj(doc)) {
    return res.status(412).send({ error: "CNPJ is invalid" });
  }

  if (!validateEmpty(date)) {
    return res.status(412).send({ error: "Date is required" });
  }

  if (!validateEmpty(phone)) {
    return res.status(412).send({ error: "Phone number is required" });
  } else if (!validatePhone(phone)) {
    return res.status(412).send({ error: "Phone number is invalid" });
  }

  if (!validateEmpty(password)) {
    return res.status(412).send({ error: "Password is required" });
  } else if (!validateLength(password, 8)) {
    return res
      .status(412)
      .send({ error: "Password must have 8 characters or more" });
  }

  return res.status(200).json({ message: "Registration completed" })
});

export default router;
