const express = require("express")
const app = express()
const bcrypt = require("bcryptjs");
const jsonwebtoken = require("jsonwebtoken");
const cors = require("cors");
const { MongoClient } = require("mongodb")
const dotenv = require("dotenv").config();
const URL = process.env.DB

app.use(express.json())
app.use(cors({
    origin: "http://localhost:5173"
}));

app.get("/", (req, res)=> {
    res.send("Hello World")
})

app.post("/signup",async (req, res)=> {
        try {
            const { name , email , password , confirmpassword } = req.body;
            console.log(name, email , password);
            const hashedPassword =  await bcrypt.hash(password, 10);
            const connection = await MongoClient.connect(URL);
            const db = connection.db("users");
            const newUser = {
                name,
                email,
                password: hashedPassword,
                confirmpassword : hashedPassword
            };
            const result = await db.collection("Signup").insertOne(newUser);
            const token = jsonwebtoken.sign({
                userId: result.insertedId,
            },process.env.secrectkey, {
                expiresIn: "24h"
            });
            res.status(201).json({token: token, message: "User created successfully"})
            connection.close()
        } catch (error) {
            console.log("Error occured in signup :", error );
            res.status(500).json({
                message: "Something went wrong,Try again"
            })
        }
})

app.post("/login", async (req, res) => {
    try {
    const  { email , password } = req.body
    console.log(email);
    const connection = await MongoClient.connect(URL);
    const db = connection.db("users");
    const user = await db.collection("Registered").findOne({
      email,
    });
    if (!user) {
      res.status(404).json({ message: "User or password not match!" });
    } 
      const passwordValid = await bcrypt.compare(password, user.password);
      if (!passwordValid) {
        res.status(404).json({ message: "User or password not match!" });
      }
        const token = jsonwebtoken.sign({ userId: user._id }, secretKey, {
          expiresIn: "24h",
        });
        res.status(200).json({
          userId: user._id,
          token,
        });
        connection.close();
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong"
        })
    }
})

app.post("/profile", async (req, res) => {
    try {
        console.log();
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong"
        })
    }
})



const SMPT = process.env.SMPT || 5050
app.listen(SMPT, ()=> {
    console.log(`Server is running on port ${SMPT}`)
})