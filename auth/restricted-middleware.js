module.exports = (req, res, next) => {
  if (req.session && req.session.user) {
    next();
  } else {
    res.status(400).json({ message: "You don't have a valid email and password to access this page" });
  }
};
