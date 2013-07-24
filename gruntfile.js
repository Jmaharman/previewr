var path = require('path');

var staticFolder = './static/';

module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    bgShell: {
      runNode: {
        cmd: 'node ./node_modules/nodemon/nodemon.js index.js',
        bg: true
      }
    },

    handlebars: {
      compile: {
        options: {
          namespace: false,
          commonjs: true,
          processName: function(filename) {
            return filename.replace('templates/', '').replace('.hbs', '');
          }
        },
        src: staticFolder + '**/*.html',
        dest: staticFolder + 'compiledtemplates.js'
      }
    },

    less: {
        basic: {
            files: {
                'static/main.css': 'static/less/main.less',
            }
        }
    },

    watch: {
      scripts: {
        files: 'app/**/*.js',
        tasks: ['rendr_stitch'],
        options: {
			livereload: true,
			interrupt: true
        }
      },
      templates: {
        files: [staticFolder + '**/*.html'],
        options: {
  			livereload: true,
      		interrupt: true
        }
      },
      stylesheets: {
          files: [staticFolder + '**/*.less'],
          tasks: ['less'],
          options: {
          livereload: true,
          interrupt: true
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-handlebars');
  grunt.loadNpmTasks('grunt-bg-shell');

  grunt.registerTask('compile', ['handlebars', 'less']);

  // Run the server and watch for file changes
  grunt.registerTask('server', ['bgShell:runNode', 'watch']);

  // Default task(s).
  grunt.registerTask('default', ['compile']);
};
