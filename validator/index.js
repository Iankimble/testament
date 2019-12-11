exports.userSignupValidator = (req, res, next) => {
  req.check("firstName", " first name is required").notEmpty();
  req.check("lastName", " last name is required").notEmpty();
  req
    .check("email", "email is required")
    .matches(/.+\@.+\..+/)
    .withMessage("email must contain and @ symbol")
    .isLength({
      min: 4,
      max: 100
    });

  req.check("password", "password is required ").notEmpty();
  req
    .check("password")
    .isLength({ min: 6 })
    .withMessage("pass must be atleast 6 characters long");

  const errors = req.validationErrors();
  if (errors) {
    const firstError = errors.map(error => error.msg)[0];
    return res.status(400).json({ error: firstError });
  }

  next();
};
