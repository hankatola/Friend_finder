const express = require('express')
const path = require('path')
const fs = require('fs')
const app = express()
const PORT = process.env.PORT || 8080
app.use(express.urlencoded({extended:true}))
app.use(express.json())

const mem = [{
    name:'Dave',
    image:'https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Falcon_Heavy_Demo_Mission_%2838583829295%29.jpg/1200px-Falcon_Heavy_Demo_Mission_%2838583829295%29.jpg',
    scores:[4,5,5,5,5,4,4,2,3,5]
}]

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'app/public/home.html'))
})
app.get('/survey',(req,res)=>{
    res.sendFile(path.join(__dirname,'app/public/survey.html'))
})
app.get('/api',(req,res)=>{
    res.send(JSON.stringify(mem))
})
app.post('/',(req,res)=>{
    console.log(req.body)
    let bestFriend = {score:false,memPos:false}
    for (let i in mem) {
        let m = mem[i].scores, diff = 0
        for (let j in m) {
            let p = req.body
            diff += Math.abs(m[j] - p[j])
        }
        if (!bestFriend.score) {
            bestFriend.memPos = i
            bestFriend.score = diff
        }
        else {
            if (diff < bestFriend.score) {
                bestFriend.memPos = i
                bestFriend.score = diff
            }
        }
    }
    mem.push(req.body)
    let bff = mem[bestFriend.memPos]
    let BFF = {name:bff.name,image:bff.image}
    res.json(BFF)

})

app.listen(PORT,()=>{console.log('listening on port ' + PORT)})