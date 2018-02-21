module.exports = (sequelize, DataTypes) => {
  const List = sequelize.define(
    'List',
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      name: { type: DataTypes.STRING, allowNull: false },
      detail: { type: DataTypes.STRING, allowNull: false, defaultValue: 'No description' },
      like: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
      songInfo: { type: DataTypes.TEXT, allowNull: false },
      thumbnail: { type: DataTypes.STRING, defaultValue: '{"src":"default.png","width":"160","height":"120"}' }
    }
  );

  List.associate = (models) => {
    List.belongsTo(models.User, { foreignKey: 'makerId', as: 'maker' });
    List.belongsToMany(models.User, { as: 'favor', through: 'UserListFavor' });
    List.hasMany(models.Comment, { foreignKey: 'listId' });
  };
  return List;
};
