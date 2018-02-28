module.exports = (sequelize, DataTypes) => {
  const Album = sequelize.define(
    'Album',
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      name: { type: DataTypes.STRING, allowNull: false },
      detail: { type: DataTypes.STRING, allowNull: false, defaultValue: 'No description' },
      like: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
      contents: { type: DataTypes.TEXT, allowNull: false },
      thumbnail: { type: DataTypes.STRING, defaultValue: '{"src":"default.png","width":"160","height":"120"}' }
    }
  );

  Album.associate = (models) => {
    Album.belongsTo(models.User, { foreignKey: 'makerId', as: 'maker' });
    Album.belongsToMany(models.User, { as: 'favor', through: 'UserAlbumFavor' });
    Album.hasMany(models.Comment, { foreignKey: 'albumId' });
  };
  return Album;
};
