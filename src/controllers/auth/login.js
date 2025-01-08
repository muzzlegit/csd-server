const { ctrlWrapper } = require("../../helpers");
const { AuthService } = require("../../services");

const login = async (req, res) => {
  const { name, password } = req.body;

  const { user, token } = await AuthService.loginUser(name, password);

  res.status(200).json({
    user,
    token,
    success: true,
    message: "Авторизація успішна",
  });
};

module.exports = {
  login: ctrlWrapper(login),
};
