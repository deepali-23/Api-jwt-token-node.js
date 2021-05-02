const express = require("express");
const app = express();

app.use(express.json());
const Myuser = require("./Mainfolder/userschema");
var jwt = require("jsonwebtoken");
app.listen(3000, () => {
  console.log("server started on port 3000");
});
require("./Mainfolder/database/db.js");

// app.get("/api", function (req, res) {
//   res.json({
//     test: "my api",
//   });
// });

app.post("/users", async (req, res) => {
  const { name, password } = req.body;
  const user = new Myuser({ name, password });
  await user.save();
  res.status(201).json({ message: "User created succesfully" });
});

// app.post("/api/protected", ensureToken, function (req, res) {
//   jwt.verify(req.token, "my_secret_key", function (err, data) {
//     if (err) {
//       res.sendStatus(403);
//     } else {
//       res.json({
//         message: "this is protected",
//         message: data,
//       });
//     }
//   });
// });
// function ensureToken(req, res, next) {
//   const bearerHeader = req.headers["authorization"];
//   if (typeof bearer !== "undefined") {
//     const bearer = bearerHeader.split(" ");
//     const bearerToken = bearer[1];
//     req.token = bearerToken;
//     next();
//   } else {
//     res.sendStatus(403);
//   }
// }

app.post("/api/protected", ensureToken, (req, res) => {
  jwt.verify(req.token, "my_secret_key", (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      res.json({
        message: "True",
        // message: authData,
      });
    }
  });
});

function ensureToken(req, res, next) {
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");

    const bearerToken = bearer[1];
    req.token = bearerToken;

    next();
  } else {
    res.sendStatus(403);
  }
}

app.post("/api/signup", function (req, res) {
  //auth user
  const user = req.body;
  const token = jwt.sign({ user }, "my_secret_key");
  res.json({
    token,
  });
});
