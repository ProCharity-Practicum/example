

module.exports = {
  salt: "test",
  jwtSecret: "super-secret",
  jwtOptions: { algorithm: 'HS256', expiresIn: '1h' },
  hashType: "sha256"
};
