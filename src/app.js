const express = require("express");
const hbs = require("hbs");
const path = require("path");
const app = express();
const port = process.env.PORT || 4000;
require("./db/conn");
const Register = require("./models/registers")

// app.use(express.json());
app.use(express.urlencoded({extended:false}));

const staticpath = path.join(__dirname, "../public");
const templates_path = path.join(__dirname, "../templates/views");
const partial_path = path.join(__dirname, "../templates/partials");

app.use(express.static(staticpath));
app.set("view engine", "hbs");
app.set("views", templates_path);
hbs.registerPartials(partial_path);

app.get('/index', (req, res) => {
    res.render("index");
});
app.get('/login', (req, res) => {
    res.render("login");
});
app.post('/login', async(req,res)=> {
    try{
        const Email = req.body.Email;
        const Password = req.body.Password;
        const useremail = await Register.findOne({email:Email});
        if(useremail.password == Password){
            res.status(201).render('index');
        }
        else(
            res.send("password are not matching")
        )
    }catch(error){
        res.status(400).send('invalid email');
    }
})

app.get('/register', (req, res) => {
    res.render("register");
});
// create a new user in our database
app.post('/register', async(req, res) => {
    try{
        const password = req.body.password;
        const cpassword = req.body.confirmPassword;
        if(password === cpassword){
            const registerEmployee = new Register({
                fullName: req.body.fullName,
                username: req.body.username,
                email: req.body.email,
                phoneNumber: req.body.phoneNumber,
                password: req.body.password,
                confirmPassword: req.body.confirmPassword,
                gender: req.body.gender
            })
            const registered =  await registerEmployee.save();
            res.status(201).render('index');
        }else{
            res.send("password are not matching");
        }
    }catch(error){
        res.status(400).send(error);
    }
});
app.listen(port, () => {
    console.log(`server is running at port no ${port}`);
})