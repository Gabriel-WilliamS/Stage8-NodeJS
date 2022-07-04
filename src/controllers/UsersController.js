const { hash, compare } = require("bcrypt");
const knex = require("../database/knex");
const AppError = require("../utils/AppError");

class UsersController {
  async create(request, response) {
    const { name, email, password } = request.body;

    if (!name || !email || !password) {
      throw new AppError("Os todos campos devem ser preenchidos!");
    }

    const userEmailExists = await knex("users").where({ email }).first();

    if (userEmailExists) {
      throw new AppError("Email de usuário já cadastrado!");
    }

    const passwordHashed = await hash(password, 8);

    const newUser = { name, email, password: passwordHashed };

    await knex("users").insert(newUser);

    return response.json({ message: "Usuario criado com sucesso", newUser });
  }

  async update(request, response) {
    const { name, email, password } = request.body;
    let { new_password } = request.body;
    const { id } = request.params;

    const userExists = await knex("users").where({ id }).first();

    if (!userExists) {
      throw new AppError("ID de usuário não existente");
    }
    if (!password) {
      throw new AppError(
        "Você precisa informar a senha antiga para modificar os dados"
      );
    }
    if (email) {
      const EmailAlreadyExist = await knex("users").where({ email }).first();

      if (EmailAlreadyExist && EmailAlreadyExist.id != id) {
        throw new AppError("E-mail de usuário já cadastrado");
      }
    }

    const user = userExists;

    const checkOldPassword = await compare(password, user.password);

    if (!checkOldPassword) {
      throw new AppError("A senha antiga não confere!");
    }

    if (new_password) {
      new_password = await hash(new_password, 8);
    }

    user.name = name ?? user.name;
    user.email = email ?? user.email;
    user.password = new_password ?? user.password;

    await knex("users").where({ id }).update(user);

    response.json({ message: "Usuário modificado com sucesso" });
  }
}

module.exports = UsersController;
