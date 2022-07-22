const { Router } = require("express");
const express = require("express");
require("./db/conn.js")

const Student = require("./models/students.js")

const StudentRouter = require("./routers/student.js")

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
//we need to register a router
app.use(StudentRouter)
//Create a new Student
//Promise
app.post("/students" , (req,res)=>
{
    console.log(req.body);
    const user = new Student(req.body)
    user.save().then(()=>
    {
        res.status(201).send(user);
    }).catch((err) =>
    {
        res.status(400).send(err);
    })
   
})

//Async wait
app.post("/students" , async(req,res)=>
{
    try
    {
    const user = new Student(req.body)
    const createUser =await user.save();
    res.status(201).send(createUser)
    }
    catch(err)
    {
        res.status.apply(400).send(err);
    }
})

//Read data 
app.get("/students",async(req,res)=>
{
        try
        {
          const studentData = await Student.find();
          res.status(201).send(studentData);
        }
        catch(err)
        {
            res.send(err);
        }
})

//Get the individaul data using Student ID.
app.get("/students/:id",async(req,res)=>
{
    try
    {
        const _id = req.params.id;
        const stdatabyid = await Student.findById(_id);
       console.log(stdatabyid);

        if(!stdatabyid)
        {
            return res.status(401).send()
        }
        else
        
        {
            res.send(stdatabyid);
        }
    }
    catch(err)
    {res.send(err)}
    

})
//Update document we will update student by id
app.patch("/students/:id",async(req,res)=>
{
    try
    {
        const _id = req.params.id;
        const updatestudent =  await Student.findByIdAndUpdate(_id,req.body)
        res.send(updatestudent);
    }
    catch(err)
    {
        res.status(401).send(err)
    }
})
//Delete
app.delete("/students/:id",async(req,res)=>
{
    try
    {
        const _id = req.params.id;
        const deletestudent =  await Student.findByIdAndDelete(_id)
        
        if(!_id)
        {
            return res.status(401).send()
        }
        else
        {
            res.send(deletestudent);
        }
    }
    catch(err)
    {
        res.status(500).send(err)
    }
})









//listen
app.listen(port,()=>
{       
        console.log(`Connection is setup at  ${port}`)
})