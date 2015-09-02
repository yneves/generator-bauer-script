"use strict";
var yeoman = require("yeoman-generator");
var chalk = require("chalk");
var yosay = require("yosay");

module.exports = yeoman.generators.Base.extend({
  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      "Welcome to the " + chalk.red("bauer script") + " generator!"
    ));

    var prompts = [{
      type    : "input",
      name    : "script",
      message : "Script name"
    },{
      type    : "input",
      name    : "description",
      message : "Script description"
    },{
      type    : "input",
      name    : "github_username",
      message : "Github username",
      store   : true
    },{
      type    : "input",
      name    : "npm_email",
      message : "NPM email",
      store   : true
    },{
      type    : "input",
      name    : "author_name",
      message : "Author's name",
      store   : true,
      default: ""
    },{
      type    : "input",
      name    : "author_website",
      message : "Author's website",
      store   : true,
      default: ""
    }];

    this.prompt(prompts, function (props) {
      this.props = props;
      done();
    }.bind(this));
  },

  writing: {
    app: function () {
      this.fs.copyTpl(
        this.templatePath("_package.json"),
        this.destinationPath("package.json"),
        this.props
      );
      this.fs.copyTpl(
        this.templatePath("_main.js"),
        this.destinationPath("main.js"),
        this.props
      );
    },

    projectfiles: function () {
      this.fs.copy(
        this.templatePath("jshintrc"),
        this.destinationPath(".jshintrc")
      );
      this.fs.copy(
        this.templatePath("gitignore"),
        this.destinationPath(".gitignore")
      );
      this.fs.copy(
        this.templatePath("npmignore"),
        this.destinationPath(".npmignore")
      );
      this.fs.copy(
        this.templatePath("yo-rc.json"),
        this.destinationPath(".yo-rc.json")
      );
    }
  },

  install: function () {
    this.installDependencies();
  }
});
