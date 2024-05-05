// requiring modules 

const express=require('express');
const cors=require('cors')              //jab localhost database ka react ka alag ho tab
const app=express();
const mongoose=require('mongoose');
const dotenv=require('dotenv')             // password secure ke liye 
const path=require('path')                  //getting path
const cookieParser=require('cookie-parser');
const bodyParser=require('body-parser');    //json wagehra ke liye 


const {body,validationResult}=require('express-validator')  //for validating the field in register.jsx


// this is scret key of stripe 


dotenv.config({path:'./conn.env'});         //requiring conn.env file 

const port=process.env.PORT;            //getting port value from conn.env file 

require('./db/conn');                   //requiing database file from db folder


const user=require('./models/userRegister');    //requiring userRegister from models folder




app.use(cookieParser());
app.use(bodyParser.json())
app.use(express.json());                        //isse json me nahi dikta

  
app.use(express.urlencoded({extended:false}));          //isse undefined nahi aata

app.get('/',(req,res)=>{
    res.send('hello hii');
})


// defining routes 

app.post('/assistant',async(req,res)=>{

    const {id,name,mobile,email,salary,city,country,department,role}=req.body;      //object destructring

    if(!id || !name || !mobile || !email || !salary || !city || !country  || !department || !role){
        return res.status(400).json({error:'plz fill all the details correctly'})
    }   

    try{
        const login_detail=await user.findOne({id:id})
        if(login_detail){
            return res.status(400).json({error:'id already exists'})
        }

        else{
            const result=new user({
                id:req.body.id,
                name:req.body.name,
                mobile:req.body.mobile,
                email:req.body.email,
                salary:req.body.salary,
                city:req.body.city,
                country:req.body.country,
                department:req.body.department,
                role:req.body.role,
            })
            
                    const result1=await result.save();
                    // console.log(result1);
                    return res.status(200).json({msg:'assistant registerd successfully'});
                }
            }
            
    catch(err){
        console.log(err);
        return res.status(400).send(err);
    }
})


app.put('/assistant/:id',async(req,res)=>{

    const id1=req.params.id;
    const data=await user.findOne({id:id1})
    if(data){
        const {name,mobile,email,salary,city,country,department,role}=req.body;      //object destructring

        if(!name || !mobile || !email || !salary || !city || !country  || !department || !role){
            return res.status(400).json({error:'plz fill all the details correctly'})
        }   

        try{
            const data=await user.updateOne({"id":id1},{$set:{name:req.body.name,email:req.body.email,mobile:req.body.mobile,salary:req.body.salary,city:req.body.city,country:req.body.country,department:req.body.department,role:req.body.role}})

            return res.status(200).json({msg:'data updated successully'});
        }
                
        catch(err){
            console.log(err);
        }
    }
    else{
        return res.status(200).json({msg:'data not found'});        
    }

    
})



app.get('/assistant/:id',async(req,res)=>{

    const id1=req.params.id;
    // console.log(id1);
    // const data=await user.findOne({id:req.body.id})
    const data=await user.findOne({id:id1})
    if(data){
        return res.status(200).json({msg:'data fetched successully',data});
    }
    else{
        return res.status(200).json({msg:'data not found'});        
    }
})


app.delete('/assistant/:id',async(req,res)=>{

    const id1=req.params.id;
    const data1=await user.findOne({id:id1})
    if(data1){
        const h1=await user.deleteOne({id:id1})
        return res.status(200).json({msg:'details deleted successully'});
    }
    else{
        return res.status(200).json({msg:'details not found'});        
    }
})

// app is listening on the 5000 port coming from conn.env 
app.listen(port,()=>{
    console.log(`server is running on port ${port} : `)
})