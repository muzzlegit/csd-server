const { ctrlWrapper, HttpError } = require("../../helpers");
const { AuthService } = require("../../services");

const logout = async (req, res) => {
  const { id } = req.user;

  const result = await AuthService.logout(id);
  if (!result?.success) throw HttpError(403);

  res.status(200).json({ success: true });
};

module.exports = {
  logout: ctrlWrapper(logout),
};
