const express = require("express");
// const database = express.Router();
const pool = require("../connection");
let route = require("../routes/route");

// function selectAllBooks(req, res) {
//   pool.query("select * from nodeBook").then(result => {
//     res.send(result.rows);
//   });
// }

// database.get("/database", selectAllBooks);
// function selectAllBooks(req, res) {
//   pool.query("select * from nodebook").then(result => {
//     res.json(result.rows);
//     // console.log(res);
//   });
// }

// database.get("/books", function(req, res) {
//   selectAllBooks(req, res);
// });

// database.post("/books", (req, res) => {
//   for (let book of bookQueryList) {
//     pool
//       .query(
//         "insert into nodebook (title, authors, description, catagories, publisher, publisheddate, previewlink, timeofsearch ) values ($1::text, $2::text, $3::text, $4::int, $5::text, $6::text, $7::text, $8::text)",
//         [
//           book.title,
//           book.authors,
//           book.description,
//           book.catagories,
//           book.publisher,
//           book.publisheddate,
//           book.previewlink,
//           book.timeofsearch
//         ]
//       )
//       .then(() => {
//         selectAllBooks(req, res);
//         // console.log(req, res);
//       });
//   }
// });

// console.log(route.bookQuery);
module.exports = {
  databaseRoute: database
  // getCall: databaseGetCall()
};
