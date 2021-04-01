module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define('user', {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    }
  }, { underscored: true })

  User.associate = function (models) {
    User.hasMany(models.transaction)
    User.hasMany(models.transactionSchedule)
  };

  return User

}
