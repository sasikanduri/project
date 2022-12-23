const express = require("express"); //importing
const app= express(); //initailizing
const  mongoose=require("mongoose");
app.use(express.json()); //data in json format acceptance
const cors= require("cors");
app.use(cors());
const bcrypt=require("bcrypt");

const jwt=require("jsonwebtoken");
const JWT_SECRET="nxsdjfnjef(),ekfjjewn@1345[]mdekm$rnkdfefef*fdbfur()jdhfyybdjs2345!rbjghrbgrhtutrtjrti4*hrwceht"
const mongoUrl="mongodb+srv://sasikala:sasikala@cluster0.3bl04bj.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(mongoUrl,{
    useNewUrlParser:true,
})
.then(()=>{
    console.log("connected to db");
})
.catch((e)=>console.log(e));

require("./useDetails");

const User = mongoose.model("UserInfo");
app.post("/registery",async(req,res)=>{
    const {uname,email,password}=req.body;

    const encryptedPassword= await bcrypt.hash(password,10);
    try{
        const oldUser= await User.findOne({email});
        if(oldUser){
           return res.json({error: "User Exists"});
        }
        await User.create({
            uname,
            email,
            password:encryptedPassword,
        });
        res.send({status:"ok"});
    }catch(e){
        res.send({
            status:"error"
        });
    }
});

app.post("/login-user",async(req,res)=>{
    const {email,password} = req.body;

    const user=await User.findOne({email});
    if(!user){
        return res.json({error: "User Not Exists"});
    }
    if(await bcrypt.compare(password,user.password)){
        const token=jwt.sign({},JWT_SECRET);

        if(res.status(201)){
            return res.json({status:"ok",data:token});
        }else{
            return res.json({status:"error"});
        }
    }
    res.json({status:"error",error:"invalid password"}); 
});

app.post("/userData",async(req,res)=>{
    const {token}=req.body;
    try{
        const user=jwt.verify(token,JWT_SECRET);
        const useremail=user.email;
        User.findOne({email:useremail}).then((data)=>{
            res.send({status:"ok",data:data});
        }).catch((e)=>{
            res.send({status:"error",data:error});
        });
    }catch(e){}
})

app.listen(3000,()=>{
    console.log("Server started");
});
