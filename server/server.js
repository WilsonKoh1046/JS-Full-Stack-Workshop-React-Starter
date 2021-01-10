const Express = require('express');
const app = Express();
const bodyParser = require('body-parser');
const path = require('path');
const port = 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(Express.static(path.join(__dirname, "..", "build")));
app.use(Express.static("public"));

let posts = [];

let users = [
    {
        "name": "User 1",
        "password": "user1PW",
        "email": "user1@email.com"
    },
    {
        "name": "User 2",
        "password": "user2PW",
        "email": "user2@email.com"
    },
    {
        "name": "User 3",
        "password": "user3PW",
        "email": "user3@email.com"
    },
    {
        "name": "User 4",
        "password": "user4PW",
        "email": "user4@email.com"
    },
    {
        "name": "User 5",
        "password": "user5PW",
        "email": "user5@email.com"
    }
];

/*
app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, "..", "build", "index.html"));
})
*/

app.get('/', (req, res) => {
    res.send('server is alive');
})

app.get('/posts', (req, res) => {
    res.status(200).json(posts);
})

app.post('/posts', (req, res) => {
    const { name, title, content, tag, date } = req.body;
    posts.push({
        'name': name,
        'title': title,
        'content': content,
        'tag': tag,
        'date': date
    });
    res.status(201).json({ "Message": "Successfully created new post!" });
})

app.post('/sign-up', (req, res) => {
    const { name, password, email } = req.body;
    let userExists = users.some((item) => item.name === name || item.email === email);
    if (userExists) {
        res.status(403).json({"Message": "Name / email already taken"});
    } else {
        users.push({
            'name': name,
            'password': password,
            'email': email
        });
        res.status(201).json({"Message": "Successfully created new account!"});
    }
    return;
})

app.post('/sign-in', (req, res) => {
    const { name, password } = req.body;
    let user = users.filter((item) => item.name === name && item.password === password)[0];
    if (!user) {
        res.status(404).json({ "Message": "User not found" });
    } else {
        const response = {
            "name": user.name,
            "email": user.email
        }
        res.status(200).json(response);
    }
    return;
})

app.listen(port, () => {
	console.log(`Server running at port ${port}`);
})
