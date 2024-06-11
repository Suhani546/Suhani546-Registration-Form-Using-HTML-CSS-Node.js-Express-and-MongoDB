const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/Employe_registration").then(() => {
    console.log(`connection successful`);
}).catch((e) => {
    console.log(`No connection`);
})