const e = require("express");

let books=[
    {
        "id":85074,
        "Name":"Quantitative Aptitude" ,
        "Title": "Genral compition",
        "Author":"R.S.Aggrawal",
        "Unit":"15",
        "Price":"500"

    },
    {
        "id":98621,
        "Name":"Mathematics" ,
        "Title": "For class seven",
        "Author":"R.S.Aggrawal",
        "Unit":"12",
        "Price":"300"  
    },
    {
        "id":98704,
        "Name": "The Commonwealth of Cricket",
        "Title": "Cricket",
        "Author":"Ramachandra Guha",
        "Unit":"25",
        "Price":"600"
    }
];
let lastid = 98704;
module.exports= {
    findAll() {
        return books;

    },
    findOne(id){
        return books.find(book => book.id === id)
    },
     
    create(book) {
        const id = ++lastid;
        
       
        const newBook = {
        
            id,
            Name:book.Name,
            Title: book.Title,
            Author:book.Author,
            Unit:book.unit,
            Price:book.Price
        };

         books.push(newBook);
         return newBook;
        
    },
    update(id, book) {
        const existingBook =books.find(book => book.id ===id);

        if(!existingBook){
            return null;
        
        }
        const updateBook =  {
            ...existingBook,
            ...book
        };
        books = books.map(book => {
            if (book.id === id)
            {
                return updateBook;
            }
            return book;

        });
        return updateBook;
    },
    destroy(id){
        books = books.filter(book => book.id !== id);
        

        return id;
    }
};