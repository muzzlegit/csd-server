const TokenService = require("./tokenService.js");
const HashService = require("./hashService.js");
const IDService = require("./idService.js");
const { AuthDTO } = require("../dtos");
const { HttpError } = require("../helpers");
const { User } = require("../models");

class AuthService {
  constructor(hashService, tokenService, idService) {
    this.hashService = hashService;
    this.tokenService = tokenService;
    this.idService = idService;
  }
  // REGISTRATION
  async registration(name, password) {
    // const user = await User.findOne({ email });

    // if (user) {
    //   throw HttpError(401);
    // }

    const hashPassword = await this.hashService.hashPassword(password);

    const newUser = await User.create({
      name,
      password: hashPassword,
    });
    console.log(newUser);
    // const userDTO = AuthDTO.toRegisterDTO(newUser);
    // const tokens = this.tokenService.generateToken(userDTO);

    // await this.tokenService.saveToken(userDTO.id, tokens?.refreshToken);

    // return { user: userDTO, tokens };
  }

  // LOGIN
  async loginUser(name, password) {
    const user = await User.findOne({ name });

    if (!user) {
      throw HttpError(401, "Користувача з таким ім'ям не знайдено");
    }

    const passwordCompare = await this.hashService.comparePassword(
      password,
      user.password
    );

    if (!passwordCompare) {
      throw HttpError(401, "Невірний пароль");
    }

    const userDTO = AuthDTO.toLoginDTO(user);

    const token = this.tokenService.generateToken(userDTO);

    await User.findByIdAndUpdate(user._id, { token });

    return { user: userDTO, token };
  }

  // LOGOUT
  async logout(_id) {
    const user = await User.findByIdAndUpdate(_id, { token: "" });
    if (!user) throw HttpError(404);
    return { success: true };
  }
}

module.exports = new AuthService(HashService, TokenService, IDService);
