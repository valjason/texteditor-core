const express = require("express");
const app = express();

const port = 1337;

//Add a route
app.get("/", (req, res) => {
	const data = {
		data: {
			msg: "Hello World"
		}
	};

	res.json(data);

});

app.listen(port, () => console.log(`Example API listening on port ${port}!`));
