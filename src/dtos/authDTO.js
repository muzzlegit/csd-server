class AuthDTO {
  static toLoginDTO(model) {
    return {
      id: model?._id ?? "",
      name: model?.name ?? "",
    };
  }
}

module.exports = AuthDTO;
