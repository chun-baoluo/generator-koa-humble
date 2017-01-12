'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var path = require('path');

module.exports = yeoman.Base.extend({

  initializing: function () {
    this.props = {};
    this.props.appName = this.name || path.basename(process.cwd());
  },

  prompting: function () {
    this.log(yosay(
      'Yo! Welcome to the humble ' + chalk.red('koa') + ' generator!'
    ));

    var prompts = [{
      type: 'input',
      name: 'appName',
      message: 'What is the name of your application?',
      default: this.props.appName
    }, {
      type: 'list',
      name: 'koa',
      message: 'What koa version do you prefer?',
      choices: ['Koa v1', 'Koa v2'],
    }, {
      type: 'list',
      name: 'objectMapping',
      message: 'What object mapping would you like to use?',
      choices: ['Mongoose', 'Sequelize', 'None'],
    }, {
      when: function(response) {
        if(response.objectMapping == 'Sequelize') {
          return response.objectMapping;
        }
      },
      name: 'dbname',
      type: 'input',
      message: 'What is the name of your database?',
      default: this.props.appName
    }, {
      when: function(response) {
        if(response.objectMapping == 'Sequelize') {
          return response.objectMapping;
        }
      },
      name: 'username',
      type: 'input',
      message: 'What is your username for the database?',
      default: 'root'
    }, {
      when: function(response) {
        if(response.objectMapping == 'Sequelize') {
          return response.objectMapping;
        }
      },
      name: 'password',
      type: 'input',
      message: 'What is your password for the database?',
      default: 'pass'
    }, {
      when: function(response) {
        if(response.objectMapping == 'Sequelize') {
          return response.objectMapping;
        }
      },
      name: 'sqlDialect',
      type: 'list',
      message: 'What is your sql dialect?',
      choices: ['mysql', 'postgres', 'mariadb']
    }, {
      type: 'list',
      name: 'cssPreprocessor',
      message: 'What css preprocessor would you like to use?',
      choices: ['Less', 'Sass', 'Stylus']
    }, {
      type: 'confirm',
      name: 'tests',
      message: 'Would you like to use backend tests (Mocha + Supertest)?',
      default: true
    }];

    return this.prompt(prompts).then(function (props) {
      this.props = props;
    }.bind(this));
  },

  writing: function () {

    this.fs.copy(
      this.templatePath('./dev/index.jade'),
      this.destinationPath('./dev/index.jade')
    );

    this.fs.copy(
      this.templatePath('./dev/main.ts'),
      this.destinationPath('./dev/main.ts')
    );

    this.fs.copy(
      this.templatePath('./dev/polyfills.ts'),
      this.destinationPath('./dev/polyfills.ts')
    );

    this.fs.copy(
      this.templatePath('./dev/vendor.ts'),
      this.destinationPath('./dev/vendor.ts')
    );

    this.fs.copy(
      this.templatePath('./dev/app/app.component.jade'),
      this.destinationPath('./dev/app/app.component.jade')
    );

    this.fs.copyTpl(
      this.templatePath('./dev/app/app.component.ts'),
      this.destinationPath('./dev/app/app.component.ts'),
      this
    );

    this.fs.copy(
      this.templatePath('./dev/app/app.module.ts'),
      this.destinationPath('./dev/app/app.module.ts')
    );

    this.fs.copy(
      this.templatePath('./dev/app/app.routing.ts'),
      this.destinationPath('./dev/app/app.routing.ts')
    );

    this.fs.copy(
      this.templatePath('./dev/app/home'),
      this.destinationPath('./dev/app/home')
    );

    if(this.props.cssPreprocessor == 'Stylus') {
      this.fs.copy(
        this.templatePath('./dev/app/app.component.styl'),
        this.destinationPath('./dev/app/app.component.styl')
      );
    } else if(this.props.cssPreprocessor == 'Less') {
      this.fs.copy(
        this.templatePath('./dev/app/app.component.less'),
        this.destinationPath('./dev/app/app.component.less')
      );
    } else if(this.props.cssPreprocessor == 'Sass') {
      this.fs.copy(
        this.templatePath('./dev/app/app.component.scss'),
        this.destinationPath('./dev/app/app.component.scss')
      );
    }

    // Controllers
    this.fs.copyTpl(
      this.templatePath('./controllers/views.js'),
      this.destinationPath('./controllers/views.js'),
      this
    );

    if(this.props.objectMapping != 'None') {
      this.fs.copyTpl(
        this.templatePath('./controllers/users.js'),
        this.destinationPath('./controllers/users.js'),
        this
      );

      // Models
      this.fs.copyTpl(
        this.templatePath('./models/models.js'),
        this.destinationPath('./models/models.js'),
        this
      );
    }

    // Tests
    if(this.props.tests == true) {
      this.fs.copyTpl(
        this.templatePath('./test'),
        this.destinationPath('./test'),
        this
      );
    }

    // Root
    this.fs.copyTpl(
      this.templatePath('./package.json'),
      this.destinationPath('./package.json'),
      this
    );
    
    this.fs.copy(
      this.templatePath('./tsconfig.json'),
      this.destinationPath('./tsconfig.json')
    );

    this.fs.copy(
      this.templatePath('./tslint.json'),
      this.destinationPath('./tslint.json')
    );

    this.fs.copyTpl(
      this.templatePath('./webpack.config.js'),
      this.destinationPath('./webpack.config.js'),
      this
    );

    this.fs.copy(
      this.templatePath('./gitignore'),
      this.destinationPath('./.gitignore')
    );

    this.fs.copyTpl(
      this.templatePath('./app.js'),
      this.destinationPath('./app.js'),
      this
    );
  },

  install: function () {
    var self = this;
    self.installDependencies({bower: false, npm: true, callback: function() {
        var i = self.spawnCommand('npm', ['run-script', 'webpack']);
      
        i.on('close', function() {
          self.log(chalk.green('Done! Have fun!'));
        });
    }});
  },

});
