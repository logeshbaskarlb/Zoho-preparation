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
        const { email, password } = req.body;
        console.log(email , password);

        const connection = await MongoClient.connect(URL);
        const db = connection.db("users");

        const user = await db.collection("Signup").findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User or password not match!" });
        }

        const passwordValid = await bcrypt.compare(password, user.password);
        if (!passwordValid) {
            return res.status(404).json({ message: "User or password not match!" });
        }

        const token = jsonwebtoken.sign({ userId: user._id }, process.env.SECRET_KEY, {
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
        });
    }
});


app.get('/profile/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;
        const connection = await MongoClient.connect(URL, { useNewUrlParser: true, useUnifiedTopology: true });
        const db = connection.db('users');

        const user = await db.collection('Signup').findOne({ _id: ObjectId(userId) });
        if (!user) {
            return res.status(404).json({ message: 'User not found!' });
        }

        res.status(200).json(user);
        connection.close();
    } catch (error) {
        console.log('Error occurred in profile:', error);
        res.status(500).json({
            message: 'Something went wrong'
        });
    }
});

app.put('/profile/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;
        const { age, gender, dob, mobile } = req.body;
        const connection = await MongoClient.connect(URL, { useNewUrlParser: true, useUnifiedTopology: true });
        const db = connection.db('users');

        const updatedUser = await db.collection('Signup').updateOne(
            { _id: ObjectId(userId) },
            { $set: { age, gender, dob, mobile } }
        );

        if (updatedUser.modifiedCount === 0) {
            return res.status(404).json({ message: 'User not found!' });
        }

        res.status(200).json({ message: 'Profile updated successfully' });
        connection.close();
    } catch (error) {
        console.log('Error occurred in profile update:', error);
        res.status(500).json({
            message: 'Something went wrong'
        });
    }
});



const SMPT = process.env.SMPT || 5050
app.listen(SMPT, ()=> {
    console.log(`Server is running on port ${SMPT}`)
})