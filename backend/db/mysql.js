/*
 * @Author: xiaohuolong
 * @Date: 2020-06-10 23:01:20
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2020-06-13 14:20:19
 * @FilePath: /blog-app/backend/db/mysql.js
 */ 

const { MYSQL_CONF } = require('../conf/db')
const Sequelize = require('sequelize');

const sequelize = new Sequelize(MYSQL_CONF.database, MYSQL_CONF.user, MYSQL_CONF.password, {
    host: MYSQL_CONF.host,
    dialect: 'mysql',
    timezone: '+08:00',
    pool: {
        max: 5,
        min: 0,
        idle: 30000
    }
});

const baseOption = {
    timestamps: false,
    charset: 'utf8mb4', 
    collate: 'utf8mb4_general_ci',
}

const baseModel = {
    id: {
        type: Sequelize.INTEGER(10),
        allowNull: false,
        unique: true,
        primaryKey: true,
        unsigned: true,
        autoIncrement: true
    },
    status: {
        type: Sequelize.ENUM(['0', '1', '2']),
        allowNull: false,
        defaultValue: '0'
    },
    create_time: {
        type: Sequelize.BIGINT,
        allowNull: false
    },
    update_time: {
        type: Sequelize.BIGINT,
        allowNull: false
    }
}

const defineModel = (name, model, option) => {
    return sequelize.define(name, {
        ...baseModel,
        ...model
    }, {
        ...baseOption,
        ...option,
        tableName: name,
    })
}

module.exports = {
    sequelize,
    defineModel
}