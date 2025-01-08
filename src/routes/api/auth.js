const express = require("express");

const router = express.Router();

const { login, logout } = require("../../controllers/auth");

const { validateBody, authenticate } = require("../../middlewares");

const { userSchemas } = require("../../models");

router.post("/login", validateBody(userSchemas.loginSchema), login);

router.post("/logout", authenticate, logout);

module.exports = router;
