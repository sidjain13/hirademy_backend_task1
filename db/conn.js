// used to connect the database 

const mongoose=require('mongoose');

const db=process.env.DATABASE;
// database connection 

mongoose.connect(db).then(()=>{
    console.log('connection successful');
})
.catch(()=>{
    console.log('error');
})
