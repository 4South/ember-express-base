//helper method for 400 responses w/ message

var exports = module.exports;

exports.send400 = function (res, message) {
  res.status(400).json({message: message});
};

//helper method for 200 responses w/ data
exports.send200 = function (res, data) {
  res.json(data);
};
