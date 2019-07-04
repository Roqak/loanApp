const Router = require('express')();
const passport = require('passport');
const jwt= require('jsonwebtoken');


require('dotenv').config();

let applications = [];
let users = [
    {
        id: 0,
        name: "Akinkunmi",
        password: "akin",
        email: "roqak1@gmail.com"
    },
    {
        id: 1,
        name: "Folu",
        password: "folu",
        email: "folu@gmail.com"
    }
    // "Akinkunmi","folu"
];

//LOAN TENURES ARE CONVERTED TO MONTHS FOR PROPER CALCULATION
let loans = [
    {
        id: 0,
        name: "Ren money",
        Description: "Salary Earners Discounted loan",
        intrestRate: 3,
        amount: 50000,
        tenure: 18
    },
    {
        id: 1,
        name: "Kia Kia",
        Description: "Easy Small Loan",
        intrestRate: 5,
        amount: 5000,
        tenure: 3
    }
]

Router.use(passport.initialize());
require('../auth')(passport);
Router.post('/user',(req,res)=>{
    if(req.body){
        let newUser = {
            id: users.length,
            name: req.body.name,
            password: req.body.password,
            email: req.body.mail
        }
        users.push(newUser);
        res.status(200).json(newUser)
    }else{
        res.status(400).json({error: "Something went wrong"});
    }
})
Router.get('/loan',passport.authenticate('jwt', { session: false }),(req,res)=>{
    // console.log(req.cookies.user)
    res.status(200).json(loans);
})
Router.post('/apply/:loanId',passport.authenticate('jwt', { session: false }),(req,res)=>{
    if(req.params.loanId < loans.length){
        let newApplication = {
            id: applications.length,
            userId: req.cookies.user.id,
            loan: loans[req.params.loanId]
        }
        applications.push(newApplication)
        res.status(200).json(newApplication);
        // res.json(loans[req.params.loanId])
    }else{
        res.json({message: "Invalid Loan ID"})
    }

})
Router.get('/all',(req,res)=>{
    res.json(applications)
})
Router.post("/login",(req,res)=>{
    if(users.findIndex(x => x.name === req.body.name) >= 0){
        let index = users.findIndex(x => x.name === req.body.name);
        let username = req.body.name;
        let password = users[index].password;
        if(password === req.body.password){
            // res.status(200).json({msg: "Login Successful"})
            const authUser = {
                id: users[index].id,
                name: username,
                email: users[index].email,
                loggedInat: Date.now()
            };
            jwt.sign(authUser,process.env.JWT_SECRET,(err,token)=>{
                if(err){
                    res.status(401).json({err});
                }else{
                    res
                        .cookie('user',jwt.decode(token, process.env.JWT_SECRET))
                        .json({
                            token: `Bearer ${token}`,
                            user: jwt.decode(token, process.env.JWT_SECRET)
                        })


                }
            });
        }else{
            res.status(401).json({errorMsg:"Login not Successful"});
        }
    }else{
        res.status(400).json("Invalid Username")
    }


});

module.exports = Router;
