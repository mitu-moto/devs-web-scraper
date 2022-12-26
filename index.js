const express = require("express");
const app = express();
const getRoutes = require("./routes/getRoutes");
const PORT = 3001;

// middelwares
app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({extended: false}));

app.use('/api/v1/', getRoutes); 

app.listen(PORT, ()=>{
    console.log("app is running on port = " , PORT);
})
