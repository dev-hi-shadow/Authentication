const md5 = require("md5");
const { sequelize } = require("../../config/mysql");
const { isAdminPath } = require("../../constants");
const { generateJWTToken } = require("../../helpers");
const { Users, Roles } = require("../../models");
const { sendEmail } = require("../../services/nodemailer");
const moment = require("moment");

exports.registration = async (req, res, next) => {
  let transaction;
  try {
    transaction = await sequelize.transaction();
    let role = await Roles.findOne({
      where: {
        name: isAdminPath.test(req.originalUrl) ? "ADMIN" : "USER",
      },
      attributes: ["id"],
      transaction,
    });

    role = role.toJSON();

    console.log("🚀  role:", role);
    const otp = Math.floor(100000 + Math.random() * 900000);
    const user = await Users.create(
      { ...req.body, otp, role_id: role.id },
      { transaction }
    );

    await sendEmail(
      "send_otp_to_user.ejs",
      { user_data: user, otp },
      "Email Verification"
    );

    const token = generateJWTToken({ id: user.id });
    await transaction.commit();

    res.status(201).json({
      success: true,
      data: {
        user,
        token,
      },
    });
  } catch (error) {
    await transaction.rollback();
    console.log("🚀  error:", error);
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    let user = await Users.findOne({
      where: { email },
      include: [{ model: Roles, as: "role", attributes: ["name"] }],
    });
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }

    const isMatch = md5(password) === user.getDataValue("password");
    if (!isMatch) {
      return res.status(400).json({
        status: false,
        message: "Invalid credentials",
      });
    }

    // Here User can not login via admin route but admin can login via both routes

    if (isAdminPath.test(req.originalUrl) && user.role.name === "USER") {
      return res.status(401).json({
        success: false,
        message: "You are not allowed to login from here",
      });
    }
    user = user.toJSON();
    let token = generateJWTToken({ id: user.id });

    if (!user.email_verified_at) {
      const otp = Math.floor(100000 + Math.random() * 900000);

      await sendEmail(
        "send_otp_to_user.ejs",
        { user_data: user, otp },
        "Email Verification"
      );

      await Users.update(
        { otp },
        {
          where: {
            id: user.id,
          },
        }
      );
    }
    res.status(200).json({
      success: true,
      message: !user.email_verified_at
        ? "OTP sended Successfully"
        : "Login successful",
      status: 200,
      data: { user, token },
    });
  } catch (error) {
    console.log("🚀  error:", error);
    next(error);
  }
};

exports.getProfile = async (req, res, next) => {
  try {
    const user = await Users.findByPk(req.user_id);
    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

exports.verifyEmail = async (req, res, next) => {
  try {
    let { otp } = req.body;
    let user = await Users.findByPk(req.user_id);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    user = user.toJSON();
    console.log("user.otp", user.otp);
    console.log("otp", otp);
    console.log("String(otp)", String(otp));
    console.log(" String(user.otp)", String(user.otp));
    console.log(" String(user.otp) === ", String(user.otp) === String(otp));

    if (String(otp) !== String(user.otp)) {
      console.log("hello");
      return res.status(400).json({ success: false, message: "Invalid OTP" });
    }
    await Users.update(
      { email_verified_at: moment(), otp: null },
      { where: { id: req.user_id } }
    );
    res
      .status(200)
      .json({ success: true, message: "Email verified successfully" });
  } catch (error) {
    console.log("🚀  error:", error);
    next(error);
  }
};
