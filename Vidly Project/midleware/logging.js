function logging(req, res, next) {
  console.log('Logging....');
  next();
}

module.exports = logging;
