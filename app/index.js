'use strict';

var fs = require('fs');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var chalk = require('chalk');
var wiredep = require('wiredep');

module.exports = yeoman.generators.Base.extend({
    // Your initialization methods (checking current project state, getting configs, etc)
    initializing: function () {
        this.pkg = require('../package.json');
    },
    // Where you write the generator specific files (routes, controllers, etc)
    writing: {
        gulpfile: function () {
            this.template('gulpfile.js');
        },
        packageJSON: function () {
            this.template('_package.json', 'package.json');
        },
        git: function () {
            this.copy('gitignore', '.gitignore');
            this.copy('gitattributes', '.gitattributes');
        },
        jshint: function () {
            this.copy('jshintrc', '.jshintrc');
        },
        editorConfig: function () {
            this.copy('editorconfig', '.editorconfig');
        },
        favicon: function() {
            this.copy('favicon.ico', 'app/favicon.ico');
        },  
        mainStylesheet: function () {
            this.copy('main.css', 'app/styles/main.css');
        },
        writeIndex: function () {
            this.indexFile = this.src.read('index.html');
            this.indexFile = this.engine(this.indexFile, this);

            this.indexFile = this.appendFiles({
                html: this.indexFile,
                fileType: 'js',
                optimizedPath: 'scripts/main.js',
                sourceFileList: ['scripts/main.js']
            });

            this.write('app/index.html', this.indexFile);
        },
        app: function () {
            this.mkdir('app');
            this.mkdir('app/scripts');
            this.mkdir('app/styles');
            this.mkdir('app/images');
            this.copy('main.js', 'app/scripts/main.js');
        }
    },
    // Where installation are run (npm, bower)
    install: function () {
        var howToInstall =
            '\nAfter running ' +
            chalk.yellow.bold('npm install') +
            ', preview your project by running ' +
            chalk.yellow.bold('gulp serve') +
            '.';

        this.log(howToInstall);
    }
});