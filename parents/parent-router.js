const express = require("express");
const bcrypt = require("bcryptjs");

const Parents = require("./parent-model.js");
const Users = require("../users/user-model.js");
const restricted = require("../auth/restricted-middleware");
const router = express.Router();

router.get("/logout", (req, res) => {
  if (req.session) {
    req.session.destroy(err => {
      if (err) {
        res.json("you can not leave, actually");
      } else {
        res.json("goodbye, sad to see you go");
      }
    });
  } else {
    res.end();
  }
});

//middleware function to register user
function registerUser(req, res, next) {
  let user;
  const { email, password, first_name, last_name, phone } = req.body;
  const hash = bcrypt.hashSync(password, 10); // 2 ^ n

  user = { email, password: hash, first_name, last_name, phone };

  Users.addUser(user)
    .then(saved => {
      if (saved) {
        next();
      } else {
        res.status(401).json({ message: "unable to register user" });
      }
    })
    .catch(err => {
      res.status(501).json({ message: "There was an error adding user" });
    });
}

router.post("/register", registerUser, (req, res) => {
  // The goal is to find the id of the user we just added (in registerUser)
  // Using the user's email, we'll go find the id of the user
  const findUserByEmail = Users.findUserBy({ email: req.body.email }).first();

  // Once we find the user, we'll grab the id from the .then function
  findUserByEmail.then(foundUser => {
    // get the id from the found user
    const { id } = foundUser;

    // Destructure only the data we need for parent table
    const { email, first_name, last_name, phone, address } = req.body;

    // Creating the parent data to send to the parent table
    const parent = {
      first_name,
      last_name,
      email,
      phone,
      address,
      user_id: id
    };

    // then we'll add the parent
    Parents.addParent(parent)
      .then(savedParent => {
        res.status(201).json(savedParent);
      })
      .catch(error => {
        res.status(500).json(error);
      });
  });
});

router.post("/login", (req, res) => {
  let { email, password } = req.body;

  Users.findUserBy({ email })
    .first()
    .then(user => {
      //checking password for a particular user
      const isPasswordCorrect =
        user && bcrypt.compareSync(password, user.password);
      if (isPasswordCorrect) {
        req.session.user = user;
        res.status(200).json({
          message: `Welcome ${user.first_name}!`
        });
      } else {
        res.status(401).json({ message: "You must have a valid email and password" });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.get("/", restricted, (req, res) => {
  Parents.findAllParents()
    .then(parent => {
      res.json(parent);
    })
    .catch(error => {
      res.status(500).json({
        message: "failed to get parents"
      });
    });
});

router.get("/:id", restricted, (req, res) => {
  const { id } = req.params;

  Parents.findParentbyId(id)
    .then(parent => {
      if (parent) {
        res.json(parent);
      } else {
        res
          .status(404)
          .json({ message: "Could not find parent with given id." });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "Failed to get parents" });
    });
});

router.put("/:id", restricted, (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  Parents.findParentbyId(id)
    .then(parent => {
      if (parent) {
        Parents.updateParent(changes, id).then(updatedParent => {
          res.json({ message: "Successfully updated parents details" });
        });
      } else {
        res
          .status(404)
          .json({ message: "Could not find parent with given id" });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "Failed to update parent" });
    });
});

router.delete("/:id", restricted, (req, res) => {
  const { id } = req.params;

  Parents.removeParent(id)
    .then(deleted => {
      if (deleted) {
        res.json({ message: "Successfully deleted" });
      } else {
        res
          .status(404)
          .json({ message: "Could not find parent with given id" });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "Failed to delete parent" });
    });
});

module.exports = router;
