'use strict'<% if(props.objectMapping == 'Mongoose') { %>
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost/<%= props.appName %>');

mongoose.Promise = require('bluebird');

const userSchema = new Schema({
	username: String,
	password: String,
	firstname: String,
	lastname: String,
	email: {
		type: String,
		trim: true,
		unique: true,
		match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
	}
});

module.exports = {
	user: mongoose.model('user', userSchema)
};
<% } %><% if(props.objectMapping == 'Sequelize') { %>
const Sequelize = require('sequelize');

const sequelize = new Sequelize('<%= props.appName %>', '<%= props.username %>', '<%= props.password %>', {
	host: 'localhost',
	dialect: '<%= props.sqlDialect %>',
	pool: {
		max: 5,
		min: 0,
		idle: 10000
	},
});

const forceAll = false;

const models = {};

models.user = sequelize.define('user', {
	username: {
		type: Sequelize.STRING(60)
	},
	password: {
		type: Sequelize.STRING(60)
	},
	firstname: {
		type: Sequelize.STRING(60)
	},
	lastname: {
		type: Sequelize.STRING(60)
	},
	email: {
		type: Sequelize.STRING(60),
		isEmail: true
	}
}, {
	timestamps: false
});

models.user.sync({force: forceAll}).then(function() {});

module.exports = models;
<% } %>