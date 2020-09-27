module.exports = ((sequelize, DataTypes) => (
    sequelize.define('user', {
      nick: {
        type: DataTypes.STRING(40),
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      provider: {
        type: DataTypes.STRING(10),
        allowNull: false,
        defaultValue: 'local',
      },
    }, {
      timestamps: true,
      paranoid: true,
    })
));