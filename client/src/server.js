import express from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());


const books = [
    {id: 1, name: "book1"},
    {id: 2, name: "book2"}
];

// app.post('/login', (req, res) => {
//     //AuThentication
//     //AuThorization
//     //{username: 'Test}
//     const data = req.body;
//     console.log(data);
//     const accessToken = jwt.sign(data, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '30s',
//     });
//     res.json({ accessToken });
// });


app.get('/books', authenToken, (req, res) => {
    // trả về kết quả cho client
    res.json({ status: 'success', data:books });
});

function authenToken(req, res, next) {
    const authorizationHeader = req.headers['authorization'];
    const token = authorizationHeader.split(' ')[1];
    if (!token) res.sendStatus(401);
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, data) => {
        console.log(err, data)
        if (err) res.sendStatus(403);
        next();
    });
};

app.listen(PORT, () => {
    // callback nếu server chạy lên thành công
    console.log(`Server is running on PORT ${PORT}`)

});