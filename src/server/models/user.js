const bcrypt = require('bcrypt');

async function hashPromise(password, salt = 10) {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, salt, (err, hash) => {
      if (err) reject(err);
      resolve(hash);
    });
  });
}

async function hashPasswordHook(userList) {
  const list = Array.isArray(userList) ? userList : [userList];

  await Promise.all(list.map(async (user) => {
    const pwd = user.get('password');
    let hash = null;

    if (pwd) {
      hash = await hashPromise(pwd, 10);
    }
    user.set('password_hash', hash);
  }));
}

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      email: { type: DataTypes.STRING, allowNull: false },
      nickname: { type: DataTypes.STRING, allowNull: false },
      password: { type: DataTypes.VIRTUAL, allowNull: true },
      password_hash: { type: DataTypes.STRING }
    },
    {
      hooks: {
        beforeBulkCreate: hashPasswordHook,
        beforeCreate: hashPasswordHook,
        beforeUpdate: hashPasswordHook
      }
    },
  );

  User.associate = (models) => {
    User.belongsToMany(models.Album, { as: 'albumFavor', through: 'UserAlbumFavor' });
    User.belongsToMany(models.Comment, { as: 'commentFavor', through: 'UserCommentFavor' });
    User.hasMany(models.Album, { foreignKey: 'makerId' });
    User.hasMany(models.Comment, { foreignKey: 'writerId' });
  };

  User.prototype.serialize = function serialize() {
    return {
      id: this.id,
      nickname: this.nickname,
      email: this.email,
      album: this.albumFavor,
      comment: this.commentFavor
    };
  };

  User.prototype.authenticate = function authenticate(password) {
    return new Promise((resolve, reject) => {
      bcrypt.compare(
        password, this.password_hash,
        (err, isMatch) => {
          if (err) {
            return reject(err);
          }
          return resolve(isMatch);
        }
      );
    });
  };

  return User;
};

