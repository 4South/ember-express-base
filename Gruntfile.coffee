'use strict'

module.exports = (grunt) ->
  
  grunt.initConfig
    #javascript files 
    jsDir: "public/javascripts"
    #javascript source files
    jsSrcDir: "<%= jsDir %>/src"
    #javascript libraries
    jsLibDir: "<%= jsDir %>/libs"
    jsCompiled: "app.js"

    #handlebars files
    hbDir: "public/handlebars"
    hbCompiled: "apptemplates.js"

    #sass files
    sassDir: "public/sass"
    mainSassFile: "app.sass"
    sassCompiled: "appsass.css"

    #output files
    distDir: "public/dist"

    minispade:
      options:
        renameRequire: true
        useStrict: false
        prefixToRemove: '<%= jsSrcDir %>'+'/'
      files:
        src: ['<%= jsSrcDir %>/**/*.js']
        dest: '<%= distDir %>/<%= jsCompiled %>'

    sass:
      dist:
        options:
          trace: true
          style: 'expanded'
        files:
          '<%= distDir %>/<%= sassCompiled %>': '<%= sassDir %>/<%= mainSassFile %>'

    ember_templates:
      compile:
        options:
          templateName: (sourceFile) ->
            #TODO: THIS IS HARDCODED...SHOULD CHANGE TO REF GLOBAL
            return sourceFile.replace("public/handlebars/", "")
        files:
          "<%= distDir%>/<%= hbCompiled %>": "<%= hbDir %>/**/*.handlebars"
    
    jshint:
      all: ['<%= jsSrcDir %>/**/*.js']

    watch:
      sass:
        files: ['<%= sassDir %>/**/*.sass']
        tasks: ['sass']
        options:
          livereload: true

      js:
        files: ['<%= jsSrcDir %>/**/*.js']
        tasks: ['jshint', 'minispade']
        options:
          livereload: true

      handlebars:
        files: ['<%= hbDir%>/**/*.handlebars']
        tasks: ['ember_templates']
        options:
          livereload: true

    


  grunt.loadNpmTasks('grunt-minispade')
  grunt.loadNpmTasks('grunt-contrib-sass')
  grunt.loadNpmTasks('grunt-ember-templates')
  grunt.loadNpmTasks('grunt-contrib-jshint')
  grunt.loadNpmTasks('grunt-contrib-watch')

  grunt.registerTask('default', [
                                        'ember_templates',
                                        'sass',
                                        'minispade',
                                        'jshint',
                                        'watch'])
