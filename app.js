const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();
const port = 1337;

app.use(cors());

if (process.env.NODE_ENV !== "test") {
	app.use(morgan("combined"));
}


//Add a middleware - callbacks that are called before the routes manager.
// Middlewares take three parameters:
app.use((req, res, next) => {
	console.log(req.method);
	console.log(req.path);
	next();
});


//Error route

app.use((req, res, next) => {
	var err = new Error("Not Found");
	err.status = 404;
	next(err);
});

app.use((err, req, res, next) => {
	if (res.headersSent) {
		return next(err);
	}

	res.status(err.status || 500).json({
		"errors": [
			{
				"status": err.status,
				"title": err.message,
				"detail": err.message
			}
		]
	});
});


//Add a route
app.get("/", (req, res) => {
	const data = {
		data: {
			msg: "Hello World"
		}
	};

	res.json(data);

});


//Add dynamic data

app.get("/hello/:msg", (req, res) => {
	res.json({
		data: {
			msg: req.params.msg
		}
	});
});


//Add a post request

app.post("/user", (req, res) => {
	res.status(201).json({
		data: {
			msg: "Got a POST request"
		}
	});
});




app.delete("/user", (req, res) => {
	res.status(204).send();
});


app.get("/user", (req, res) => {
	res.json({
		data: {
			msg: "Got a GET request"
		}
	});
});



app.put("/user", (req, res) => {
	res.json({
		data: {
			msg: "Got a PUT request"
		}
	});
});



app.listen(port, () => console.log(`Example API listening on port ${port}!`));
