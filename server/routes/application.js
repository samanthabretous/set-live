exports.IsAuthenticated = (req, res, next) => {
  if (!req.isAuthenticated()) {
    next();
  } else {
    next(new Error(401));
  }
};

exports.destroySession = (req, res, next) => {
  req.logOut();
  req.session.destroy();
  res.redirect('/');
};
