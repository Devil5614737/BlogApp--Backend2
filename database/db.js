const mongoose=require('mongoose');

const DB=()=>{
mongoose.connect(process.env.URI, {useNewUrlParser: true, useUnifiedTopology: true }).then(()=>console.log('connected to mongodb')).catch(error=>console.log(error))
}

module.exports=DB;