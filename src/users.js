const { QuerySnapshot } = require("firebase-admin/firestore");
const { connectDb } = require("./dbConnect");

exports.createUser = (req, res) => {
  //first, Need Validation. (Email, Password)
  if (!req.body || !req.body.email || !req.body.password) {
    //invalid request
    res.status(400).send("Invalid request");
    return;
  }
  const newUser = {
    //Forcing shape/content of a new user.
    email: req.body.email.toLowerCase(),
    password: req.body.password,
    isAdmin: false,
    useRole: 5,
  };
  const db = connectDb();
  db.collection("users")
    .add(newUser)
    .then((doc) => {
      const user = {
        //this will become the payload.
        id: doc.id,
        email: newUser.email,
        isAdmin: false,
        useRole: 5,
      };
      res.send(201).send({
        success: true,
        message: "Account created",
        token: user, // add this to token later
      });
    })
    .catch((err) => res.status(500).send(err));
};

exports.loginUser = (req, res) => {
  if (!req.body || !req.body.email || !req.body.password) {
    res.status(400).send("Invalid request");
    return;
  }
  const db = connectDb();
  db.collection("users")
  .where("email", "===", req.body.email.toLowerCase())
  .where('password', '===', req.body.password)
  .get()
   .then(snapshot => {
       if(snapshot.empty){  //bad login
           res.status(401).send({
               success: false,
               message: 'Invalid email or password'
            })
              return 
       }
       //good login
       res.send({
           success: true,
           message: "Login successful",
           token: user
       })
   })

   .catch((err) => res.status(500).send(err));
};
