module.exports = function(grunt) {
  
  grunt.initConfig({
    simplemocha: {
      options: {
        globals: ['should'],
        timeout: 2000,
        ignoreLeaks: false,
        ui: 'bdd',
        reporter: 'spec'
      },
      all: {
        src: 'test/**/*.js'
      }
    },
    jshint: {
      files: ['Gruntfile.js', './index.js', 'test/**/*.js']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-simple-mocha');

  grunt.registerTask('test', ['jshint', 'simplemocha']);
  grunt.registerTask('default', ['test']);

};
