const { Schema, model } = require("mongoose");
const Joi = require("joi");

const { handleMongooseError } = require("../helpers");

const userSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
    },
    password: {
      type: String,
      require: true,
      minlength: 6,
    },
    token: {
      type: String,
      require: true,
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post("save", handleMongooseError);

const User = model("user", userSchema);

// -------------JOI--------------------- //

const registerSchema = Joi.object({
  name: Joi.string().required(),
  password: Joi.string().min(6).required(),
});

const loginSchema = Joi.object({
  name: Joi.string().required(),
  password: Joi.string().min(6).required(),
});

const userSchemas = {
  registerSchema,
  loginSchema,
};

module.exports = {
  User,
  userSchemas,
};
