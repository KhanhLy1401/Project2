const express = require('express');
const path = require('path');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const flash = require('express-flash');
const moment = require('moment');
const session = require('express-session');
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

//parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}));

app.set("views", `${__dirname}/views`);
app.set("view engine", "pug");

// // Flash
app.use(cookieParser('keyboard cat'));
app.use(session({cookie: {maxAge: 60000}}));
app.use(flash());

// End flash


//TinyMCE
app.use(
    '/tinymce', 
    express.static(path.join(__dirname, 'node_modules', 'tinymce'))
);

// End TinyMCE

app.locals.prefixAdmin = systemConfig.prefixAdmin;
app.locals.moment = moment;


app.use(express.static(`${__dirname}/public`));

routeAdmin(app);
route(app);

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
