const express = require("express");
const fs = require("fs");

const app = express();

// middle ware
app.use(express.urlencoded({ extended: false }));

// middleware 1
app.use((req, res, next) => {
  console.log("middleware 1 ran...");
  req.property_one = "value_one";
  req.property_two = "value_two";
  next();
});

// middleware 2
app.use((req, res, next) => {
  console.log("middleware 2 ran...");
  console.log(
    `the req object that i edited in middleware 1 is also availabe in every other middleware ${req.property_one} ${req.property_two}`
  );
  next();
});

const fake_data = require("./MOCK_DATA.json");

// use /api/users route for mobiles to send json
// use /users route for browsers to html

// web-server
app.get("/", (req, res) => {
  return res.send("hi this is a web server");
});

// show all users
app.get("/users", (req, res) => {
  const html = `
    <ul>
        ${fake_data
          .map((user_object) => {
            return `<li>${user_object.first_name}</li>`;
          })
          .join("")}
    </ul>
    `;
  return res.send(html);
});

app.get("/api/users", (req, res) => {
  res.setHeader("X-custom_Header", "Custom Value");
  return res.json(fake_data);
});

app.post("/api/users", (req, res) => {
  const new_user_data = req.body;
  fake_data.push({ id: fake_data.length + 1, ...new_user_data });
  fs.writeFile("./MOCK_DATA.json", JSON.stringify(fake_data), (err, data) => {
    return res.json({ status: "Success", id_generated: fake_data.lenght });
  });
});

app
  .route("/api/users/:id")
  .get((req, res) => {
    const id = Number(req.params.id);
    const user = fake_data.find((user_object) => user_object.id === id);
    return res.json(user);
  })
  .patch((req, res) => {
    const updated_info = req.body;
    const id = Number(req.params.id);
    let user_to_be_updated = fake_data.find(
      (user_object) => user_object.id === id
    );
    // update using speread operator and destructuring
    // 1. de-structure object whose values will be used to update user_to_be_updated
    const { first_name, last_name, email, gender, job } = updated_info;
    // 2. make a new object or keep existing one,
    // in that object destructure user_to_be_updated,
    // and use properties of,
    // updated_info to update.
    user_to_be_updated = {
      ...user_to_be_updated,
      first_name,
      last_name,
      email,
      gender,
      job,
    };
    fake_data[id - 1] = user_to_be_updated;
    // 3. put it in database using file system (fs)
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(fake_data), (err, data) => {
      return res.json({ status: "successful", user_updated: "TRUE" });
    });
  })
  .delete((req, res) => {
    const id_to_be_deleted = Number(req.params.id);
    const new_data_after_deletion = fake_data.filter(
      (user_obj) => user_obj.id !== id_to_be_deleted
    );
    fs.writeFile(
      "./MOCK_DATA.json",
      JSON.stringify(new_data_after_deletion),
      (err, data) => {
        return res.json({ status: "Success", user_deleted: "TRUE" });
      }
    );
  });

app.listen(8000, () => {
  console.log("server up and running on 8000 ...");
});
