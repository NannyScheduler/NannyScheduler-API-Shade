const express = require("express");
const bcrypt = require("bcryptjs");

const Nannies = require("./nanny-model.js");
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

router.post("/register", (req, res) => {
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 10); // 2 ^ n
  user.password = hash;

  Nannies.addNanny(user)
    .then(saved => {
      res.status(201).json(saved);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.post("/login", (req, res) => {
  let { username, password } = req.body;

  Nannies.findNannyBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        req.session.user = user;
        res.status(200).json({
          message: `Welcome ${user.username}!`
        });
      } else {
        res.status(401).json({ message: "Invalid Credentials" });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.get("/", (req, res) => {
  Nannies.findAllNannies()
    .then(nanny => {
      res.json(nanny);
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

// router.post("/", restricted, (req, res) => {
//   const nannyData = req.body;

//   Nannies.addNanny(nannyData)
//     .then(nanny => {
//       res.status(201).json(nanny);
//     })
//     .catch(err => {
//       res.status(500).json({ message: "Failed to create new nanny" });
//     });
// });

router.put("/:id", restricted, (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  Nannies.findNannyById(id)
    .then(nanny => {
      if (nanny) {
        Nannies.updateNanny(changes, id).then(updatedNanny => {
          res.json(updatedNanny);
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
        res.json({ removed: deleted });
      } else {
        res.status(404).json({ message: "Could not find nanny with given id" });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "Failed to delete nanny" });
    });
});

module.exports = router;
