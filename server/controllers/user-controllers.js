const User = require('../models/User');

module.exports = {
  async isAuthenticated(req, res) {
    if (req.session.userId) {
      res.json({ isAuthenticated: true });
    } else {
      res.json({ isAuthenticated: false });
    }
  },

  async getCurrentUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.session.userId });

      if(!user) {
        res.status(404).json({ message: "cannot find user" });
        return;
      }
      res.status(200).json(user);
    } catch(err) {
      res.status(500).json(err);
    }
  },

  async createUser(req, res) {
    try {
      const user = await User.create(req.body);
      if (!user) {
        res.status(400).json({ message: "cannot create user" });
        return;
      }
      req.session.userId = user.id;
      res.status(200).json(user);
    } catch(err) {
      res.status(500).json(err);
    }
  },

  async login(req, res) {
    try {
      const user = await User.findOne({ username: req.body.username });
      if (!user) {
        res.status(500).json({ message: "invalid username" });
        return;
      }

      if(req.body.password === user.password) {
        req.session.userId = user.id;
        res.status(200).json({ message: "logged in" });
      } else {
        res.status(500).json({ message: "invalid credentials "});
      }

    } catch(err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  async logout(req, res) {
    try {
      req.session.destroy(() => {
        res.status(200).json({ message: "logged out" });
      });
    } catch(err) {
      res.json(err);
    }
  }
}
