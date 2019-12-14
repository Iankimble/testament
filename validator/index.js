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

exports.createPostValidator = (req, res, next) => {
  // title
  req.check("title", "please give your prayer a name").notEmpty();
  req.check("title", "Title must be between 4 to 150 characters").isLength({
    min: 4,
    max: 150
  });
  // body
  req.check("body", "Pleas write a prayer").notEmpty();
  req.check("body", "Body must be between 4 to 2000 characters").isLength({
    min: 4,
    max: 2000
  });
  // check for errors
  const errors = req.validationErrors();
  // if error show the first one as they happen
  if (errors) {
    const firstError = errors.map(error => error.msg)[0];
    return res.status(400).json({ error: firstError });
  }
  // proceed to next middleware
  next();
};
