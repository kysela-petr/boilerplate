/*global module:false*/
module.exports = function(grunt) {

  // Project (non vendor) source files
  var projectFiles = {
    scripts: [
      'src/js/main.js'
    ],
    // Main file with imports
    style: 'src/style/main.less'
  };  

  grunt.initConfig({

    concat: {
      options: {
        separator: '\n'
      },
      scripts: {
        src: [
          'bower_components/jquery/dist/jquery.js',
        ].concat(projectFiles.scripts),
        dest: 'dist/js/script.js'
      },
      styles: {
        src: [
          'bower_components/HTML5-Reset/assets/css/reset.css',
          'src/style/style.css'
        ],
        dest: 'dist/style/style.css',
      }
    },
    uglify: {
      dist: {
        options: {
          sourceMap: true,
          sourceMapIncludeSources: true
        },
        src: 'dist/js/script.js',
        dest: 'dist/js/script.min.js'
      },
      modernizr: {
        src: 'bower_components/modernizr/modernizr.js',
        dest: 'dist/js/modernizr.js'
      }
    },
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        unused: true,
        boss: true,
        eqnull: true,
        browser: true,
        globals: {
          jQuery: true,
          require: true
        }
      },
      gruntfile: {
        src: '/Gruntfile.js'
      },
      beforeconcat: {
        src: projectFiles.scripts
      }
    },
    jsdoc: {
      dist: {
        src: ['src/js/README.md'].concat(projectFiles.scripts),
        options: {
          destination: 'dist/scriptguide'
        }
      }
    },
    copy: {
      ltIe9: {
        src: 'bower_components/lt-ie-9/lt-ie-9.min.js',
        dest: 'dist/js/lt-ie-9.min.js'
      },
      styleguide: {
        src: 'src/style/styleguide.md',
        dest: 'dist/style/styleguide.md',
      }
    },
    less: {
      default: {
        files: {
          'src/style/style.css': projectFiles.style
        }
      }
    },
    remfallback: {
      options: {
        log: false,
        replace: false
      },
      default: {
        files: {
          'src/style/style.css': 'src/style/style.css'
        }
      }
    },
    autoprefixer: {
      options: {
        browsers: ['> 0.5% in CZ', 'last 5 version', 'ie 8', 'ie 9']
      },
      no_dest: {
        src: 'src/style/style.css' 
      },
    },
    kss: {
      options: {
        css: '../style/style.min.css',
        js: '../js/script.min.js',
      },
      dist: {
        files: {
          'dist/styleguide': ['dist/style']
        }
      }
    },
    cssmin: {
      options: {
        sourceMap: true
      },
      default: {
        files: {
          'dist/style/style.min.css': 'dist/style/style.css'
        }
      }
    },
    clean: {
      styles: [
        'src/style/style.css',
        'dist/style/*.css',
        'dist/styleguide/*'
      ],
      scripts: [
        'dist/js/script.js',
        'dist/js/script.js.map',
        'dist/js/script.min.js',
        'dist/js/script.min.js.map'
      ],
    },
    watch: {
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile']
      },
      scripts: {
        files: '<%= concat.scripts.src =%>',
        tasks: ['scripts'],
        options: {
          spawn: false,
          livereload: true
        }
      },
      styles: {
        files: projectFiles.style,
        tasks: ['styles'],
        options: {
          spawn: false,
          livereload: true
        }
      },
      views: {
        files: ['index.html'],
        tasks: [],
        options: {
          spawn: false,
          livereload: true
        }
      }
    }
  });
    
  // Grunt JIT task - https://github.com/shootaroo/jit-grunt
  // No need to load all tasks separately
  require('jit-grunt')(grunt, {
    concat: 'grunt-contrib-concat'
  });

  // Default task.
  grunt.registerTask('styles', ['clean:styles', 'less', 'remfallback', 'autoprefixer', 'concat:styles', 'kss']);
  grunt.registerTask('scripts', ['clean:scripts', 'jshint:beforeconcat', 'concat:scripts', 'jsdoc']);
  grunt.registerTask('default', ['copy', 'styles', 'uglify:modernizr', 'scripts', 'watch']);
  grunt.registerTask('dist', ['copy', 'styles', 'cssmin', 'uglify:modernizr', 'scripts', 'uglify:dist']);

};