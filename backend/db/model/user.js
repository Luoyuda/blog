const { defineModel } = require('../mysql')
const Sequelize = require('sequelize');

const dbUser = defineModel('user_info', {
    name: {
        type: Sequelize.STRING(255),
        allowNull: false,
        unique: true,
    },
    email: {
        type: Sequelize.STRING(255),
        allowNull: false,
        unique: true,
    },
    password: {
        type: Sequelize.STRING(255),
        allowNull: false,
    },
    pic: {
        type: Sequelize.STRING(255),
        allowNull: true,
    },
    info: {
        type: Sequelize.STRING(2550),
        allowNull: true,
    },
    gender: {
        type: Sequelize.ENUM(['0', '1', '2']),
        defaultValue: '0'
    },
})
dbUser.sync({
    // force: true  // 强制同步，先删除表，然后新建
});

module.exports = {
    dbUser
}