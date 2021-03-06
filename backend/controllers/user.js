const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/User');



exports.signup = (req, res, next) => {
  var buf_mail = Buffer.from(req.body.email).toString('base64');
    bcrypt.hash(req.body.password, 10)
      .then(hash => {
        const user = new User({
          email: buf_mail,
          password: hash
        });
        user.save()
          .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
          .catch(error => res.status(400).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
  };

exports.login = (req, res, next) => {
  var buf_mail = Buffer.from(req.body.email).toString('base64');
  User.findOne({ email: buf_mail })
    .then(user => {
      if (!user) {
        return res.status(401).json({ message: 'Utilisateur non trouvé !' });
      }
      bcrypt.compare(req.body.password, user.password)
        .then(valid => {
          if (!valid) {
            return res.status(401).json({ message:'Mot de passe incorrect !' });
          }
          res.status(200).json({
            userId: user._id,
            token: jwt.sign(
              { userId: user._id },
              'RANDOM_TOKEN_SECRET',
              { expiresIn: '24h' }
            )
          });
        })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};