let express = require("express");
let router = express.Router();
let https = require("https");
let myKey = require("../api-key/api");

let bookQuery = "One Second After";
let bookQueryResult;
let bookList = [];

async function gettingBookInfo() {
  await https
    .get(
      `https://www.googleapis.com/books/v1/volumes?q=${bookQuery}:keyes&key=${myKey}`,
      resp => {
        let data = "";
        resp.on("data", chunk => {
          data += chunk;
        });
        resp.on("end", () => {
          bookQueryResult = JSON.parse(data);
        });
        return bookQueryResult;
      }
    )
    .on("error", err => {
      console.log("Error: " + err.message);
    });
  await new Promise(resolve => setTimeout(resolve, 3000));
  await makingBookObject();
}

let makingBookObject = () => {
  let holderObject;
  for (let i = 0; i < bookQueryResult.items.length; i++) {
    // console.log(bookQueryResult.items[i].volumeInfo);
    holderObject = {
      title: bookQueryResult.items[i].volumeInfo.title,
      authors: bookQueryResult.items[i].volumeInfo.authors,
      description: bookQueryResult.items[i].volumeInfo.description,
      catagories: bookQueryResult.items[i].volumeInfo.catagories,
      publisher: bookQueryResult.items[i].volumeInfo.publisher,
      publishedDate: bookQueryResult.items[i].volumeInfo.publishedDate,
      previewLink: bookQueryResult.items[i].volumeInfo.previewLink,
      timeOfSearch: new Date()
    };
    // console.log(holderObject);
    bookList.push(holderObject);
  }
  return bookList;
};

gettingBookInfo();

router.get("/googleBook", (req, res) => {
  res.send(bookList);
});

module.exports = router;
