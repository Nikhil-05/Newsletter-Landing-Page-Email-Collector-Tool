const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req,res){
    res.sendFile(__dirname + "/signup.html");
})

app.post("/", function(req,res){
    var firstName = req.body.fname;
    var lastName = req.body.lname;
    var email = req.body.email;
    // console.log(firstName, lastName, email);

    var data = {
         members:[
            {
               email_address: email,
               status:"subscribed",
               merge_fields:{
                FNAME: firstName,
                LNAME: lastName
               }
            }
         ]
    }
    var jsonData = JSON.stringify(data);

// f0aeb543a2 
// f0aeb543a2 
// f0aeb543a2 
const url = "https://us12.api.mailchimp.com/3.0/lists/f0aeb543a2";

const options = {
    method: "POST",
    auth: "nikhil:c7493b7a5e17a34e2816cedad4f5d140-us12"
}


  const request =   https.request(url,options,function(response){

    if(response.statusCode===200){
        res.sendFile(__dirname + "/success.html");
        
    }
    else{
        res.sendFile(__dirname + "/failure.html");
    }
        response.on("data", function(data){
            console.log(JSON.parse(data));
        })

    })
    request.write(jsonData);
    request.end();
});

app.post("/failure", function(req,res){
    res.redirect("/");
})

app.listen(process.env.PORT || 3000, function(){
    console.log("server started on 3000");
}); 


// c7493b7a5e17a34e2816cedad4f5d140-us12

