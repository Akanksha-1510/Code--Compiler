const express = require('express');
const app = express();
const bodyP=require("body-parser")
const compiler = require("compilex")
const options={stats : true}
compiler.init(options)
app.use(bodyP.json())
app.use("/codemirror-5.65.19",express.static("/home/akanksha/Documents/COMPILER/codemirror-5.65.19"))
app.get("/",function(req,res){
    compiler.flush(function(){
        console.log("deleted")
    })
    res.sendFile("/home/akanksha/Documents/COMPILER/index.html")
})
app.post("/compile", function(req, res) {
    var code = req.body.code;
    var input = req.body.input;
    var lang = req.body.lang;
    try{
        
        if(lang=="Cpp"){
            if(!input){
                var envData = { OS : "linux" , cmd : "gcc" , options : { timeout:10000 }};
                compiler.compileCPP(envData , code , function (data) {
                    if(data.output){
            res.send(data);

        }
        else{
            res.send({output:"error"})
        }
                });
            }
            else{
                var envData = { OS : "linux" , cmd : "gcc", options : { timeout:10000 } }; // ( uses gcc command to compile )
                compiler.compileCPPWithInput(envData , code , input , function (data) {
                    if(data.output){
            res.send(data);

        }
        else{
            res.send({output:"error"})
        }
                });
            }
        }
        else if(lang=="Java"){
            if(!input){
                var envData = { OS : "linux" };
                compiler.compileJava( envData , code , function(data){
                    if(data.output){
            res.send(data);

        }
        else{
            res.send({output:"error"})
        }
                });
            }
            else{
                var envData = { OS : "linux" };
    compiler.compileJavaWithInput( envData , code , input ,  function(data){
        if(data.output){
            res.send(data);

        }
        else{
            res.send({output:"error"})
        }
    });
            }
        }
        else if(lang=="Python"){
            if(!input){
            var envData = { OS : "linux" }; 
            compiler.compilePython( envData , code , function(data){
                if(data.output){
            res.send(data);

        }
        else{
            res.send({output:"error"})
        }
            });
        }
        else{
            var envData = { OS : "linux" }; 
            compiler.compilePythonWithInput( envData , code , input ,  function(data){
                if(data.output){
            res.send(data);

        }
        else{
            res.send({output:"error"})
        }        
            });
        
        }
    }
}
catch(e){
    console.log("error")
}

});

app.listen(8000)