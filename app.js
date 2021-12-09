const express = require('express');
const app = express();
const { engine } = require('express-handlebars');

// send data as json object
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.engine(
  'handlebars',
  engine({
    runtimeOptions: {
      allowProtoPropertiesByDefault: true,
      allowProtoMethodsByDefault: true  
    },
  })
);
// enable handlebars frontend

app.set('view engine', 'handlebars');
app.use(express.static('public'));

module.exports = app;