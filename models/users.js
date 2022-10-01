module.exports = function(sequelize, DataTypes) {
    const User = sequelize.define('users', {
        userId: {
            autoIncrement: true,
            type: DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true
        },
        email: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        password: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        role: {
            type: DataTypes.ENUM('CUSTOMER','COMPANY'),
            allowNull: false
        }
    }, {
        sequelize,
        tableName: 'users'
    });
    User.sync({alter: true}).then(() => {
        console.log("USER TABLE SYNCED")
    }).catch(err => {
        console.log("Error in Sync "+err)
    })
    return User;
}