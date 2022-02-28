// static file sharing 
const express=require("express");
const app=express();
const port=80;
const fs=require("fs");
const mongoose = require('mongoose');
const bodyparser = require('body-parser');



app.use("/public",express.static('public'));
// middleware used to access to from data
app.use(express.urlencoded());

// set the tampalte engine:************************
app.set('view engine', 'pug');
const path=require("path");
app.set('views',path.join(__dirname,'views'))
//**************************************************** */

//    *******database Create using Mongoose************************
main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/contactDance');
}
//    **********************Create Schema*********************
const ContactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String
  });
   
  const Contact = mongoose.model('Contact', ContactSchema);

 // pug demo endpoint:*********************************
 app.get('/',(req, res)=>{ 
     const params={};
    res.status(200).render('home.pug', params);
 });
 //********************************************************** */
//  ***************************** contact********************
 // **********************************get request****************
 app.get('/contact',(req, res)=>{ 
    const params={};
   res.status(200).render('contact.pug', params);
});

// ************************post request************
app.post('/contact', (req, res)=>{
 
    let myData=new Contact(req.body);
    myData.save(()=>{
        res.send("Your from has Sumbitted! Thank You")
    })

});



app.listen(port,()=>{
    console.log(" port 80 runiing....")
});
//*********************************************************** */