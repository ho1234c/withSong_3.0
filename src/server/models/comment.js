module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment',
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      content: { type: DataTypes.STRING, allowNull: false },
      like: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 }
    }
  );

  Comment.associate = function(models) {
    Comment.belongsTo(models.User, { foreignKey: 'writerId' });
    Comment.belongsTo(models.List, { foreignKey: 'listId' });
    Comment.belongsToMany(models.User, { as: 'userFavor', through: 'UserCommentFavor' });
  }
  return Comment;
};
