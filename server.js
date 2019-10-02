"use strict";

let express = require("express");
let cors = require("cors");
let app = express();
let router = require("./routes/route");
let database = require("./routes/database");
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname + "/dist"));
let port = 8000;
app.use("/", router);
app.use("/", database);
app.listen(port, () => console.log(`Server is running on PORT: ${port}!`));
