
const express = require('express');
const app = express();
const cors = require('mysql2');
app.use(express.static("abc"));
const connection = cors.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'cdac',
	database: 'test',
	port: 3306
});

app.get("/ssel", (req, resp) => {
	let bookid1 = req.query.bookid;
	console.log(bookid1);
	let details = { status: false, bookdetails: {} };
	connection.query('select bookname,price from book where bookid=?', [bookid1],
		(error, row) => {
			if (error) {
				console.log("Error takes place" + error);
			}
			else if (row.length > 0) {
				details.status = true;
				details.bookdetails.bookname = row[0].bookname;
				details.bookdetails.price = row[0].price;

			}
			console.log(details.bookdetails.price)
			resp.send(details);
		})
});
//--------------------------------------------Update-----------------------------------------

app.get("/update", (req, resp) => {
	let bookid1 = req.query.bookid;
	let bookname1 = req.query.bookname;
	let price1 = req.query.price;

	console.log(bookid1);
	let details = { status: false, bookdetails: {} };
	connection.query('update book set bookname=?, price=? where bookid=?', [bookname1, price1, bookid1],
		(error, row) => {
			if (error) {
				console.log("Error takes place" + error);
			}
			else if(row.affectedRows>0){
				console.log("CHanges are"+row.affectedRows)
			}
			console.log(details.bookdetails.price)
			resp.send(details);
		})
});


app.listen(8081, function () {
	console.log("server listening at port 8081...");
});