const express = require("express");
const database = express.Router();
const pool = require("../connection");
let bookList = require("../routes/route");

// function selectAllBooks(req, res) {
//   pool.query("select * from nodeBook").then(result => {
//     res.send(result.rows);
//   });
// }

// database.get("/database", selectAllBooks);
function selectAllBooks(req, res) {
  pool.query("select * from nodebook").then(result => {
    res.json(result.rows);
    // console.log(res);
  });
}

database.get("/books", function(req, res) {
  selectAllBooks(req, res);
});

database.post("/books", (req, res) => {
  pool
    .query(
      "insert into nodebook (title, authors, description, catagories, publisher, publisheddate, previewlink, timeofsearch ) values ($1::text, $2::text, $3::text, $4::int, $5::text, $6::text, $7::text, $8::text)",
      [
        bookList[0].title,
        req.body.authors,
        req.body.description,
        req.body.catagories,
        req.body.publisher,
        req.body.publisheddate,
        req.body.previewlink,
        req.body.timeofsearch
      ]
    )
    .then(() => {
      selectAllBooks(req, res);
      // console.log(req, res);
    });
});
module.exports = database;
