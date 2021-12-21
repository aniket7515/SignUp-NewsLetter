const express = require('express');
const bodyParser =require('body-parser');
const request=require('request');
const https = require('https');

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended:true}));

app.get("/",(req,res)=>{
    res.sendFile(__dirname+'/signup.html');
})

app.post('/',(req,res)=>{
    const firstName = req.body.fName;
    const lastName=req.body.lName;
    const email=req.body.email;

    const data={
        members:[
            {
                email_address:email,
                status: "subscribed",
                merge_fields:{
                    FNAME:firstName,
                    LNAME:lastName
                }
            }
        ]
    };

    const jsonData=JSON.stringify(data);

    const url="https://us20.api.mailchimp.com/3.0/lists/d85d862083";
    const options={
        method:"POST",
        auth:"Aniket:a20961b7f5af4de4a53d2639d23e6fa7-us20"

    }

    const request=https.request(url,options,function(response){

        if(response.statusCode===200){
            res.sendFile(__dirname+"/success.html");
        }else{
            res.sendFile(__dirname+"/failure.html");
        }



        response.on("data",(data)=>{
            console.log(JSON.parse(data));
        })

    })

    request.write(jsonData);
    request.end();


})

app.post("/failure",(req,res)=>{
    res.redirect("/");
})


const port =process.env.PORT || 3000;







app.listen(port,()=>console.log('listening on port'));




// API KEY
// a20961b7f5af4de4a53d2639d23e6fa7-us20

// List ID 
// d85d862083 