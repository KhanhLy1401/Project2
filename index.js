const express = require('express');
var methodOverride = require('method-override');
require("dotenv").config();

const route = require("./routes/client/index.route")

const database = require("./config/database");

const systemConfig = require("./config/system");

const routeAdmin = require("./routes/admin/index.route");
// const route = require("./routes/client/index.route")

database.connect();

const app = express();
const port = process.env.PORT;

// ghi đè
app.use(methodOverride('_method'));

app.set("views", "./views");
app.set("view engine", "pug");

app.locals.prefixAdmin = systemConfig.prefixAdmin;

app.use(express.static("public"));

routeAdmin(app);
route(app);

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
