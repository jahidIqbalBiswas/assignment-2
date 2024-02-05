const http = require("http")
const fs = require("fs")
const url = require("url")
const multer = require("multer")
const PORT = 5500
const diskStorage = multer.diskStorage({
    destination: function (req,file,cb){
        cb(null,"./uploads")
    },
    filename: function (req,file,cb){
        cb(null,file.originalname)
    }
})
const upload = multer({storage:diskStorage}).single("myFile")
const server = http.createServer(reqResFunc)

function reqResFunc(req,res){
    const urlPathName = url.parse(req.url).pathname
    if(urlPathName === "/"){
        res.writeHead(200,{"Content-Type": "text/html"})
        res.end("This is Home Page")
    }else if(urlPathName === "/about"){
        res.writeHead(200,{"Content-Type":"text/html"})
        res.end("This is About Page")
    }else if(urlPathName === "/contact"){
        res.writeHead(200,{"Content-Type":"text/html"})
        res.end("This is Contact Page")
    }else if(urlPathName === "/file-write"){
        fs.writeFile("demo.txt","hello world", (err) => {
            if(err){
                res.writeHead(404,{"Content-Type":"text/html"})
                res.write("File create failed!")
            }else{
                res.writeHead(201,{"Content-Type":"text/html"})
                res.write("File create success.")
            }
            res.end()
        })
    }else if(urlPathName === "/upload"){
        upload(req,res,(err) => {
            if(err){
                res.writeHead(404,{"Content-Type":"text/html"})
                res.write("file upload failed")
            }else{
                res.writeHead(200,{"Content-Type":"text/html"})
                res.write("file upload success.")
            }
            res.end()
        })
    }
}

server.listen(PORT,() => {
    console.log(`Server is listening on port http://localhost:${PORT}`)
})