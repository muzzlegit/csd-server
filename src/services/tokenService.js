const jwt = require("jsonwebtoken");

class TokenService {
  static generateToken(payload) {
    const token = jwt.sign(payload, process.env.JWT_SECRET_ACCESS, {
      expiresIn: "7d",
    });
    return token;
  }

  static async validateToken(token) {
    try {
      const userData = jwt.verify(token, process.env.JWT_SECRET_ACCESS);
      return { valid: Boolean(userData), user: userData };
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        return { valid: false, error: "Token has expired" };
      } else if (error instanceof jwt.JsonWebTokenError) {
        return { valid: false, error: "Invalid token" };
      } else {
        return { valid: false, error: "Token verification failed" };
      }
    }
  }
}

module.exports = TokenService;
