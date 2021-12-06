if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}


const express=require('express');
const app=express();
const path=require('path');
const mongoose=require('mongoose');
const User=require('./models/user.js')
const methodOverride = require('method-override');
const { db } = require('./models/user.js');

mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log('DB Connected'))
    .catch((err) => console.log(err));


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname,'public')))

app.get('/',(req,res)=>{
    // res.send("HELLO FROM SERVER");
    res.render('home');
})

app.get('/home', async (req,res)=>{
    // const data=await User.find({});
    res.render('home');
})
app.post('/signup',async (req,res)=>{
    const {name,email,phone,password}=req.body;
    // console.log(password);
   await User.insertMany({name,phone,email,password});
   
    res.redirect('home');
})

// var newname;
app.get('/login',(req,res)=>{
    
   
// console.log(User.getUser("akash"));

    res.render('login');
    
})

app.get('/info',async (req,res)=>{
    const{name,password}=req.query;
    // console.log(name);
    // newname=name;
    var arr=await User.find({});
    console.log(arr);
    arr.forEach((element) => {
        // console.log(element);
        if(element.name===name && element.password===password){
            console.log("login.......");
            res.redirect('https://www.youtube.com/');
        }
        
    });
    // console.log("wrong password");
    res.redirect('/home');

// else{
//     alert("Wrong")
// }
})

app.listen(process.env.PORT || 2323,(req,res)=>{
    console.log("server running at port 2323");
})