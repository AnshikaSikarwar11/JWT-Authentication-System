var express = require('express');
var app = express();
var mysql = require('mysql');
var bodyParser = require('body-parser');
var cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '111127', 
    database: 'college'
});
connection.connect();
const secretKey="mysecretkey";
app.post('/register',(req,res)=>{
    const{name,password}=req.body;+
    console.log(name,password);
    bcrypt.hash(password,10,function(err,hashedPassword){
        if(err){
            console.log(err);
            return res.status(500).json({success:false,message:"Error hashing password"});
        }
        console.log("Password hashed:",hashedPassword);
        connection.query("insert into token (name,password) values (?,?)",[name,hashedPassword],function(err,result){
            if(err){
                console.log(err);
                return res.status(500).json({success:false,message:"Error inserting user"});
            }
            console.log("1 log inserted");
            res.json({message:"data received succesfully",data:req.body});
        });
    });
});
app.post('/login',(req,res)=>{
    const{name,password}=req.body;
    console.log(name,password);
    connection.query("select * from token where name=?",[name],function(err,result){
        if(err){
            console.log(err);
        }
        if(result.length===0){
            return res.json({success:false,message:"user not found"});
        }
        const user=result[0];
        bcrypt.compare(password,user.password,function(err,isMatch){
            if(err){
                console.log(err);
            }if(isMatch){
                const token=jwt.sign({name:user.name},secretKey,{expiresIn:'1h'});
                res.json({success:true,message:"Login succesfully",token:token});
            }
            else{
                res.json({success:false,message:"Invalid name or password"});
            }
        })
    })
})
function kavach(req,res,next){
    const brearHeader=req.headers['authorization'];
    if(!brearHeader){
        return res.json({success:false,message:"No token provided"});
    }
    const token=brearHeader.split(' ')[1];
    jwt.verify(token,secretKey,(err,decoded)=>{
        if(err){
            return res.json({success:false,message:"Failed to authenticate token"});
        }
        req.user=decoded;
        next();
    })
}
app.get('/dash',kavach,(req,res)=>{
    res.json({
        message:"Welcome to dashboard",
        user:req.user
    });
});
app.listen(5000, function () {
    console.log("listening");
});