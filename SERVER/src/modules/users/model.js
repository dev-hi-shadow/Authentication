const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../../config/mysql");
const Roles = require("../roles/model");
const md5 = require("md5");

class Users extends Model {
  static associate(db) {
    Users.belongsTo(db.Roles, {
      as: "role",
      foreignKey: "role_id",
      targetKey: "id",
    });
  }
  isValidPassword = (password) => {
    return md5(password) === this.getDataValue("password");
  };
}

Users.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    display_name: {
      type: DataTypes.VIRTUAL,
      get() {
        return `${this.getDataValue("first_name") || ""} ${
          this.getDataValue("last_name") || ""
        }`;
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      set(value) {
        this.setDataValue("password", md5(value));
      },
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    role_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "roles",
        key: "id",
      },
    },
    email_verified_at: {
      type: DataTypes.DATE,
      defaultValue: null,
    },
    otp: {
      type: DataTypes.INTEGER,
      defaultValue: null,
    },
  },
  {
    sequelize,
    tableName: "users",
    modelName: "Users",
  }
);

module.exports = Users;
