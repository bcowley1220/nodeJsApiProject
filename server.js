"use strict";

let express = require("express");
let cors = require("cors");
let app = express();
let router = require("./routes/route");
// let database = require("./routes/route");
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname + "/dist"));
let port = 8000;
app.use("/", router.router);
app.use("/", router.database);
app.listen(port, () => console.log(`Server is running on PORT: ${port}!`));
