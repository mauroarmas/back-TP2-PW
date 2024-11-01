const { Students } = require("../model/studentsModels");

const validateBody = (req, res, next) => {
  if (
    !req.body.firstname ||
    !req.body.lastname ||
    !req.body.dni ||
    !req.body.email
  ) {
    res.status(400).json({
      message: "firstname, lastname, dni, and email fields are required.",
    });
    return;
  }
  next();
};

const studentExistent = async (req, res, next) => {
  if (
    !req.body.firstname ||
    !req.body.lastname ||
    !req.body.dni ||
    !req.body.email
  ) {
    res.status(400).json({
      message: "firstname, lastname, dni, and email fields are required.",
    });
    return;
  }
  next();
};

const validateById = (req, res, next) => {
  if (isNaN(Number(req.params.id))) {
    res.status(400).json({ message: "Invalid ID format" });
    return;
  }
  req.params.id = Number(req.params.id);
  next();
};

module.exports = {
  validateBody,
  validateById,
  studentExistent,
};
