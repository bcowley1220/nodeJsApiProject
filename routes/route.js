// var exports = (module.exports = {});
let express = require("express");
let router = express.Router();
let database = express.Router();

let https = require("https");
let myKey = require("../api-key/api");
const pool = require("../connection");
// let database = require("../routes/database");

let bookQuery = "Patient";
let body = "";
let bookQueryList = [];
let bodyItems;
let length = 150;

let url = `https://www.googleapis.com/books/v1/volumes?q=${bookQuery}?orderBy=relevance:keyes&key=${myKey}`;

async function gettingBookInfo() {
  await database.get("/checkdatabase", function(req, res) {
    checkDatabaseFirst(req, res);
  });
  if (checkDatabaseFirst) {
    await https.get(url, res => {
      res.setEncoding("utf8");
      // let body = "";
      res.on("data", data => {
        body += data;
      });
      res.on("end", () => {
        body = JSON.parse(body);
        // console.log(body);
      });
      return body;
    });
    await new Promise(resolve => setTimeout(resolve, 3000));
    await makingBookObject();
  } else {
    console.log("its there");
  }
}

let makingBookObject = () => {
  bodyItems = body.items;
  // console.log(bodyItems);
  for (let book of bodyItems) {
    // console.log(book);
    // console.log(book.volumeInfo.categories);
    bookObject = {
      title: book.volumeInfo.title,
      authors: `${book.volumeInfo.authors}`,
      description: `${stringLimit(book)}`,
      catagories: `${book.volumeInfo.categories}`,
      publisher: book.volumeInfo.publisher,
      publishedDate: book.volumeInfo.publishedDate,
      previewLink: book.volumeInfo.previewLink,
      queryDate: `${new Date()}`
    };
    // console.log(bookObject);
    bookQueryList.push(bookObject);
  }
  for (let i = 0; i < bookQueryList.length; i++) {
    console.log(bookQueryList[i].description);
  }
  return bookQueryList;
};

let stringLimit = arr => {
  if (!arr.volumeInfo.description) {
    return "Description Unavailable";
  } else {
    return arr.volumeInfo.description.substring(0, length);
  }
};

gettingBookInfo();
router.get("/googleBook", (req, res) => {
  res.send(bookQueryList);
});

// ! Database calls

let checkDatabaseFirst = (req, res) => {
  pool
    .query(`select title from nodebook where title like '${bookQuery}%';`)
    .then(result => {
      res.json(result.rows);
    });
};

let selectAllBooks = (req, res) => {
  pool.query("select * from nodebook order by index").then(result => {
    res.json(result.rows);
  });
};

database.get("/books", function(req, res) {
  selectAllBooks(req, res);
});

database.post("/books", (req, res) => {
  for (let book of bookQueryList) {
    pool
      .query(
        "insert into nodebook (title, authors, description, catagories, publisher, publisheddate, previewlink, timeofsearch) values ($1::text, $2::text, $3::text, $4::text, $5::text, $6::text, $7::text, $8::text)",
        [
          `${book.title}`,
          `${book.authors}`,
          `${book.description}`,
          `${book.catagories}`,
          `${book.publisher}`,
          `${book.publishedDate}`,
          `${book.previewLink}`,
          `${book.queryDate}`
        ]
      )
      .then(() => {
        selectAllBooks(req, res);
      });
  }
});

module.exports = {
  router: router,
  database: database
};
