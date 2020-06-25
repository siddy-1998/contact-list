const express = require('express');
const port = 8000;
const path = require('path');

const db = require('./config/mongoose');
const Contact = require('./models/contact');

const app = express();

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.urlencoded());
app.use(express.static('assets'));

//middleware 1
//  app.use(function(req,res,next)
//  { 
//      console.log("middleware 1 called");
//      next();
//  });

//  //middleware 2
//  app.use(function(req,res,next)
//  { 
//      console.log("middleware 2 called");
//      next();
//  });

// var contactList = [
//       {
//         name:"Arpan",
//         phone:"11234"

//       },
//       {
//         name:"sid",
//         phone:"11234"

//       },
//       {
//         name:"rohan",
//         phone:"11234"

//       }

// ];


app.get('/',function(req,res){

 
    Contact.find({},function(err,contacts){
        if(err)
        {
            console.log('error in fetching the contact from the db');
            return;
        }
         
        return res.render('home',{
            title:"My Contact List",
            contact_list: contacts
        });

    });

   

});

app.get('/practice',function(req,res){
return res.render('practice',{
    title:"Let's play"
});

});

app.post('/create-contact',function(req,res)
{
    // contactList.push(req.body);
    // return res.redirect('/');

    Contact.create({
        name: req.body.name,
        phone:req.body.phone
    },function(err,newContact){

        if(err)
        {
            console.log('error in creating contact');
            return ;
        }

        console.log('***********',newContact);
        
       return res.redirect('back');

    });
    
});


app.get('/delete-contact',function(req,res)
{
    //console.log(req.query);
    let id=req.query.id;

    // let contactIndex = contactList.findIndex(contact => contact.phone == phone);

    // if(contactIndex !=-1)
    // {
    //     contactList.splice(contactIndex,1);
    // }

    Contact.findByIdAndDelete(id,function(err)
    {
        if(err)
        {
            console.log('error in deleting object in database');
            return;
        }

       return res.redirect('back');
    });
   
});

app.listen(port,function(err){
  
    if(err)
    {
        console.log('Error in running the server', err);
        return;
    }
    
    console.log("Yup! My Express server is up and running on Port:",port);

});