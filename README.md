# Assignment 1 - API testing and Source Control.

Name: Zhiran Sun

## Overview.

This testing test the book model of library system.

## API endpoints.
 + GET /books - should return all the books of library
 + GET /books/:name/byName - should return the books with right name
 + GET /books/:press/byPress - should return the books with right press
 + GET /books/:id - should return the books with correct id
 + POST /books - should return successful message and the new book
 + DELETE /books/:id - should return a message that deleting successfully and the deleted book


## Data storage.
Using Mongodb 'mongodb://admin:123456a@ds139883.mlab.com:39883/librarydb'.

## Sample Test execution.

    (node:24416) DeprecationWarning: current URL string parser is deprecated, and will be removed in a future version. To use the new parser, pass option { useNewUrlParser: true } to MongoClient.connect.
      Library
        GET /books
    Successfully Connected to [ librarydb]
    GET /books 200 100.675 ms - 674
          ✓ should return all the books of library (133ms)
        GET /books/:name/byName
    GET /books/Time%20Boo/byName 200 30.424 ms - 227
          ✓ should return the books with right name
        GET /books/:press/byPress
    GET /books/Time%20Press/byPress 200 8.738 ms - 227
          ✓ should return the books with right press
        GET /books/:id
    GET /books/5be1c1ca2fe96d5f60a721c4 200 10.690 ms - 227
          ✓ should return the books with correct id (63ms)
        POST /books
    POST /books 200 17.988 ms - 277
          ✓ should return successful message and the new book
    GET /books 200 7.793 ms - 897
        DELETE /books/:id
    (node:24416) DeprecationWarning: collection.findAndModify is deprecated. Use findOneAndUpdate, findOneAndReplace or findOneAndDelete instead.
    DELETE /books/5be1c1ca2fe96d5f60a721cb 200 10.241 ms - 40
          ✓ should return a message that deleting successfully and the deleted book
    GET /books 200 12.379 ms - 449
    
    
      6 passing (382ms)


[ Markdown Tip: By indenting the above listing, GitHub will display it in a 'box' and preserve any formatting.]

