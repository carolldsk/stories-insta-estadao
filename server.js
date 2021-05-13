const express = require("express");
const routes = require("./routes");

// App
const app = express();

// Set port
const port = process.env.PORT || "8081";
app.set("port", port);

app.use('/', routes);

// Server
app.listen(port, () => console.log(`Server running on localhost:${port}`));
