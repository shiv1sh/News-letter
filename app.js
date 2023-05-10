const express=require("express");
const bodyParser=require("body-parser");
const request=require("request");
const app=express();
const https=require("https");

app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static("Public"));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/signup.html");
})

app.post("/",function(req,res){
    const firstName=req.body.firstName;
    const lastName=req.body.lastName;
    const email=req.body.email;

    const data={
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
    };

    const jsonData=JSON.stringify(data);   

    // from line number 20 to 33, we have prepared the data given by user for the mailChimp API; 
                          // mail chimp API accepts data in the same format as written;





    const url= "https://us8.api.mailchimp.com/3.0/lists/59e175820b"

    const options={
        method:"POST",
        auth: "shivansh:8ffcf1f2f4b939f4fe67d7f86335b6cb-us8"
    }

    const request=https.request(url,options,function(response){

        if(response.statusCode===200){
            res.sendFile(__dirname+"/success.html");
        }else{
            res.sendFile(__dirname+"/failiure.html");
        }

        response.on("data",function(data){
            console.log(JSON.parse(data));
        })
    })

    request.write(jsonData);
    request.end();
});


// At line number 40   and   42 to 45   we are making two constants ie: url and option, because these fields are required by the mailchimp server to post the request;
    // since, we have to post the data entered by the user to an external resource; 


// URL part     
    // we will post the data to the URL we are generating;
    // this URL is generated on the basis of the our API key and the Audience ID;
    //  https://<dc>.api.mailchimp.com/3.0/      --> this is the end point of the mailchimp API;
                                                   // we have written the <dc> to us8 because we are asigned to us8 server;
                                                   // the srever can be any where between us4 to us20;
    // lists/59e175820b  --> list is one of those optional parts where we can tag on;                           
                    //   --> 59e175820b is the list id which we are targeting for our subscribers;

// options part
   // options is a object, because mailchimp specified in there documentation to make the options as an object;
   // in the options of http request,  we have somethinf called 'method' and 'auth';    
       // method --> It is one of the option, it tells that we have to post this request;
       // auth   --> for our POST request to go through successfully, we have to provide some form of Authentication,  and 'auth' allows us to do this form os basic authentication;
                     
                     // In the mailchimp documentation, it is given that we can authenticate a request through the API key, by following these steps-
                                                      // make any string as the userId and API key as the password;
                                                      // string behind ':' is the username and string after ':' is API key;

                                                     
//If we look to the documentation of the 'request' method,
                          // we have to save our request in a constatnt;
                          // after that, we can use that constant request  to send things over to the mailchimp server;   
                                                                          
  app.post("/failiure",function(req,res){
    res.redirect("/");
  })

app.listen(process.env.PORT||3000,function(){
    console.log("Server started on port 3000");
})

// API key
// 8ffcf1f2f4b939f4fe67d7f86335b6cb-us8

// Audience Id
// 59e175820b.