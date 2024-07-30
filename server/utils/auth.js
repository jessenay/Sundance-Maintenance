const jwt = require('jsonwebtoken');

module.exports = {
  signToken: function ({ username, email, _id, role }) {
    const payload = { username, email, _id, role };
    return jwt.sign({ data: payload }, process.env.SECRET, { expiresIn: '2h' });
  },

  authMiddleware: function ({ req }) {
    let token = req.body.token || req.query.token || req.headers.authorization;

    if (req.headers.authorization) {
      token = token.split(' ').pop().trim();
    }

    if (!token) {
      return req;
    }

    try {
      const { data } = jwt.verify(token, process.env.SECRET, { maxAge: '2h' });
      req.user = data;
    } catch {
      console.log('Invalid token');
    }

    return req;
  },

  isAdmin: function (user) {
    return user && user.role === 'admin';
  }
};
