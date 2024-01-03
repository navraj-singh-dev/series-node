const express = require("express");
const app = express();

// Mongoose section
const mongoose = require("mongoose");

// 0. connect with mongodb using mongoose
mongoose
  .connect("mongodb://127.0.0.1:27017/learning-database-1")
  .then(() => console.log("MongoDB Connected")) // it will return a promise so using .then
  .catch((err) => console.log("Mongo Error", err)); // if any error then catch it

// 1. schema making
const userSchema = new mongoose.Schema(
  {
    first_name: { type: String, required: true },
    last_name: { type: String, required: false },
    email: { type: String, required: false, unique: true },
    gender: { type: String, required: true },
    job: { type: String, required: true },
  },
  { timestamps: true }
);

// 2. schema -> model (using this model i can do crud)
const User_Model = mongoose.model("user_model", userSchema);

// middle-ware for parsing
app.use(express.urlencoded({ extended: false }));

// homepage
app.get("/", (req, res) => {
  return res.json("welcome to slash bro");
});

// returning html to render for simple slash routes
app.get("/users", async (req, res) => {
  const all_users = await User_Model.find({});
  const html = `
  <ul>
    ${all_users.map((user_obj) => `<li>${user_obj.first_name}</li>`).join("")}
  </ul>
  `;
  return res.send(html);
});

// returning json for mobile devices as raw data on /api/something
app.get("/api/users", async (req, res) => {
  const all_users = await User_Model.find({});
  res.json(all_users);
});

// one route but different http methods to be perfoemed?, so using .route mehtod in express!
app
  .route("/api/users/:id")
  .get( async (req, res) => {
    const id = await User_Model.findById(req.params.id);
    if (!id) {return res.status(404).json({msg : "user not found"})};
    res.json(id);
  })
  .patch( async (req, res) => {
    await User_Model.findByIdAndUpdate(req.params.id, {last_name: "changed"})
    res.json({msg: "user_update!"})
  })
  .delete( async (req, res) => {
    await User_Model.findByIdAndDelete(req.params.id)
    return res.json({msg: "deleted the id"})
  });

// adding a user to database(mock_data.json file), also could have used put, but its fine
app.post("/api/add_user", async (req, res) => {
  const new_user = req.body;
  // condition to check if everything is provided in body
  if (
    !new_user ||
    !new_user.first_name ||
    !new_user.last_name ||
    !new_user.email ||
    !new_user.gender ||
    !new_user.job
  ) {
    return res.status(400).json({ alert: "all fields are required" });
  }

  // adding new user in mongodb
  const added_user = await User_Model.create({
    first_name: new_user.first_name,
    last_name: new_user.last_name,
    email: new_user.email,
    gender: new_user.gender,
    job: new_user.job,
  });
  console.log(added_user);
  return res
    .status(201)
    .json({ new_user_created: "success, new user created" });
});

app.listen(8080, () => {
  console.log("\n\n server running on 8080... \n\n");
});
