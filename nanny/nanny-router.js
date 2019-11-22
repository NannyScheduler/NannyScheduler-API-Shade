const express = require("express");
const bcrypt = require("bcryptjs");

const Nannies = require("./nanny-model.js");
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

    // Destructure only the data we need for nannies table
    const {
      email,
      first_name,
      last_name,
      phone,
      address,
      hourly_rate,
      image_url,
      can_drive
    } = req.body;

    // Creating the parent data to send to the nannies table
    const nanny = {
      email,
      first_name,
      last_name,
      address,
      hourly_rate,
      can_drive,
      phone,
      image_url,
      user_id: id
    };

    // then we'll add the parent
    Nannies.addNanny(nanny)
      .then(savedNanny => {
        res.status(201).json(savedNanny);
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
        res
          .status(401)
          .json({ message: "ou must have a valid email and password" });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.get("/", restricted, (req, res) => {
  Nannies.findAllNannies()
    .then(nannies => {
      const formattedNannies = nannies.map(nanny => ({
        ...nanny,
        can_drive: Boolean(nanny.can_drive)
      }));
      res.json(formattedNannies);
    })
    .catch(error => {
      res.status(500).json({
        message: "failed to get nannies"
      });
    });
});

router.get("/:id", restricted, (req, res) => {
  const { id } = req.params;

  Nannies.findNannyById(id)
    .then(nanny => {
      if (nanny) {
        res.json(nanny);
      } else {
        res
          .status(404)
          .json({ message: "Could not find nanny with given id." });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "Failed to get nannies" });
    });
});

router.put("/:id", restricted, (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  Nannies.findNannyById(id)
    .then(nanny => {
      if (nanny) {
        Nannies.updateNanny(changes, id).then(updatedNanny => {
          res.json({ message: "Successfully updated nanny details" });
        });
      } else {
        res.status(404).json({ message: "Could not find nanny with given id" });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "Failed to update nanny" });
    });
});

router.delete("/:id", restricted, (req, res) => {
  const { id } = req.params;

  Nannies.removeNanny(id)
    .then(deleted => {
      if (deleted) {
        res.json({ message: "Successfully deleted nanny details" });
      } else {
        res.status(404).json({ message: "Could not find nanny with given id" });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "Failed to delete nanny" });
    });
});

module.exports = router;
