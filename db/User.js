const mongoose = require("mongoose");
const url =
  "mongodb+srv://mongodb:mongodb101@cluster0.zbg9d.mongodb.net/db?retryWrites=true&w=majority";
mongoose.connect(url, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

const userSchema = new mongoose.Schema({
  name: {
    required: true,
    type: String,
    minlength: 3,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  tokens: {
    type: Array,
  },
  Advisors: {
    type: Array,
  },
  Bookings: {
    type: Array,
  },
});

const Users = mongoose.model("Users", userSchema);

module.exports = Users;
