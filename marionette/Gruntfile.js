'use strict';
var mountFolder = function(connect, dir) {
  return connect.static(require('path').resolve(dir));
};
module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    // Task configuration.
    clean: {
      files: ['./tmp/']
    },
    uglify: {
      dist: {
        src: 'js/index.js',
        dest: 'js/index.min.js'
      }
    },
    targethtml: {
      dev: {
        files: {
          './index.html': './index.tpl.html'
        }
      },
      dist: {
        files: {
          './dist/index.html': './index.tpl.html'
        }
      }
    },
    watch: {
      less: {
        files: ['less/*.less'],
        tasks: ['less:dev']
      },
      html: {
        files: ['index.html'],
        options: {
          livereload: true
        }
      },
      htmlTemplate: {
        files: ['index.tpl.html'],
        tasks: ['targethtml:dev']
      },
      css: {
        files: ['css/style.css'],
        options: {
          livereload: true
        }
      },
      js: {
        files: ['js/*.js'],
        // tasks: ['copy:js'],
        options: {
          livereload: true
        }
      },
    },

    less: {
      dev: {
        files: {
          "./css/style.css": "less/index.less"
        },
        options: {
          compress: false,
          sourceMap: false
        }
      },
      dist: {
        options: {
          compress: true,
          sourceMap: false
        },
        files: {
          "./dist/css/index.css": "less/index.less"
        }
      }
    },
    connect: {
      development: {
        options: {
          port: 2222,
          open: true,
          base: ["."]
        }
      },
      production: {
        options: {
          keepalive: true,
          port: 8080,
          open: true,
          base: ["./dist"]
        }
      }
    },
    // requirejs: {
    //   compile: {
    //     options: {
    //       name: 'config',
    //       mainConfigFile: 'app/config.js',
    //       out: '<%= concat.dist.dest %>',
    //       optimize: 'none'
    //     }
    //   }
    // },
    shell: {
      'r_optimizer': {
        command: 'node r.js -o ./build.js',
        options: {
          stdout: true,
          execOptions: {
            cwd: '.'
          }
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-shell');
  // grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-targethtml');




  grunt.registerTask('default', ['targethtml:dev', 'less:dev', 'connect:development', 'watch']);
  grunt.registerTask('dev', ['targethtml:dev', 'less:dev', 'connect:development', 'watch']);
  grunt.registerTask('build', ['targethtml:dist', 'shell', 'less:dist', 'uglify']);
};
