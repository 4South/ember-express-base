'use strict'

module.exports = (grunt) ->
  
  grunt.initConfig
  
    minispade:
      options:
        renameRequire: true
        useStrict: false
        prefixToRemove: 'public/javascripts/'
      files:
        src: ['public/javascripts/**/*.js']
        dest: 'public/dist/appjs.js'

    sass:
      dist:
        options:
          trace: true
          style: 'expanded'
        files:
          'public/dist/appsass.css': 'public/sass/app.sass'

    ember_templates:
      compile:
        options:
          templateName: (sourceFile) ->
            return sourceFile.replace(/public\/handlebars\//,'')
        files:
          "public/dist/apptemplates.js": "public/handlebars/**/*.handlebars"
    
    watch:
      sass:
        files: ['public/sass/**/*.sass']
        tasks: ['sass']
        options:
          livereload: true
      js:
        files: ['public/javascripts/**/*.js']
        tasks: ['minispade']
        options:
          livereload: true
      handlebars:
        files: ['public/handlebars/**/*.handlebars']
        tasks: ['ember_templates']
        options:
          livereload: true


  grunt.loadNpmTasks('grunt-minispade')
  grunt.loadNpmTasks('grunt-contrib-sass')
  grunt.loadNpmTasks('grunt-ember-templates')
  grunt.loadNpmTasks('grunt-contrib-watch')

  grunt.registerTask('default', [
                                        'ember_templates',
                                        'sass',
                                        'minispade',
                                        'watch'])
