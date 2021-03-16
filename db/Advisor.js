const mongoose = require("mongoose");
const url =
  "mongodb+srv://mongodb:mongodb101@cluster0.zbg9d.mongodb.net/db?retryWrites=true&w=majority";
mongoose.connect(url, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

const advisorSchema = new mongoose.Schema({
  name: {
    required: true,
    type: String,
    minlength: 3,
  },
  url: {
    require: true,
    type: String,
  },
});

const Advisors = mongoose.model("Advisors", advisorSchema);

module.exports = Advisors;
