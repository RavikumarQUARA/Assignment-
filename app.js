const express = require('express');
const bodyParser = require('body-parser');

const Book = require('./Book');
const { findOne } = require('./Book');

const app= express();

const port = 3000;

//app.use(bodyParser.json());
app.use(express.json());
app.get('/books',(req, res, next) =>{
    res.send(Book.findAll());
});
app.get('/books/:bookid',(req, res) => {    

    const bookid = parseInt(req.params.bookid,10);
    const book = Book.findOne(bookid);
    if(!book){
        res.status(404).send({
            massage:'could not find the book'
        });
        return;
    }
    res.send(book);




});
app.post('/books',(req, res) => {
    // middleware
    // body-parser
    //res.send(req.body);
    const bookid = parseInt(req.params.bookid, 10);
    
        
    
    
    res.send(Book.create(req.body));
});
app.put('/books/:bookid', (req, res)=>{
   const bookid = parseInt(req.params.bookid,10);
   const updateBook = Book.update(bookid, req.body);
   if(!updateBook)
   {
    return res.status(404).send({
    message:"The book you  want to update does not exit"
    });
   }

    res.send(updateBook);

});

app.delete('/books/:bookid', (req,res) => {
    const bookid = parseInt(req.params.bookid, 10);
    const book = Book.findOne(bookid);
    if (!book) 
    {
        res.status(404).send({
            massage: " The book you want to delete does not exits"
        });
    }

    const destroyBookid =Book.destroy(bookid);
    if(destroyBookid !== null)
    {
       return res.sendStatus(204);
    }

    res.status(500).send({
        message:"could not book delete the book"
    });
});

app.listen(port,()=>{
    console.log(port);
});
