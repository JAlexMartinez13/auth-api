const { connectDb } = require('./dbConnect')

exports.createUser = ( req, res) => {
    //first, Need Validation. (Email, Password)
    if(!req.body || !req.body.email || !req.body.password){
        //invalid request
        res.status(400).send('Invalid request')
        return
    }
    const newUser = {     //Forcing shape/content of a new user.
        email: req.body.email,
        password: req.body.password,
        isAdmin: false,
        useRole: 5,
    }
    const db = connectDb()
    db.collection('users').add(newUser)
    .then(doc => {
        
        res.send(201).send('Account created')
    })
    .catch(err => res.status(500).send(err))
}