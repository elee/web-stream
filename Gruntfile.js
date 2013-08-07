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
      files: ['Gruntfile.js', 'lib/**/*.js', 'test/**/*.js']
    },
    blanket: {
      options: {},
      files: { 'lib-cov/': ['lib/'] }
    }
  });

  grunt.registerTask('run-test-cov', 'run mocha locally', function() {
    require('child_process').exec('mocha --require blanket -R html-cov > coverage.html', function(error, stdout, stderr) {
      if (error)
        throw new Error('error running mocha ' + stderr);
      else
        console.log('done generating test coverage report: coverage.html');
    });
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-simple-mocha');
  grunt.loadNpmTasks('grunt-blanket');

  grunt.registerTask('test-cov', ['run-test-cov']);
  grunt.registerTask('test', ['jshint', 'simplemocha']);
  grunt.registerTask('default', ['test']);
};
