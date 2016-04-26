module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    bower: {
      dist: {
        base: 'bower_components',
        dest: 'dist/bower_components',
        options: {
          checkExistence: true,
          debugging: true,
          paths: {
              bowerDirectory: 'bower_components',
              bowerrc: '.bowerrc',
              bowerJson: 'bower.json'
          }
        }
      },
    },
    bowerInstall:{
      dev: {
        src: [
          'index.html'
        ]
      }
    },
    clean: {
      build: ['dist']
    },
    compass: {
      options: {
        importPath: ['bower_components/bootstrap-sass/assets/stylesheets'],
        sassDir: 'styles/scss',
        imageDir: 'styles/images',
        fontsDir: 'styles/fonts',
        force: true,
        //raw: 'Encoding.default_external = \'utf-8\'\n',
      },
      dev: {
        options: {
          cssDir: 'styles',
          environment: 'development',
          outputStyle: 'nested',
          sourcemap: true
        }
      },
      dist: {
        options: {
          cssDir: 'dist/styles',
          environment: 'development',
          outputStyle: 'compressed',
          sourcemap: true
        }
      },
    },
    copy: {
      init: {
        files: [{
          cwd: 'bower_components/bootstrap-sass/assets/fonts/bootstrap',
          src: '**',
          dest: 'styles/fonts/',
          expand: true
        }]
      },
      dist: {
        files: [{
          src: '**',
          dest: 'dist/app',
          expand: true,
          cwd: 'app'
        },{
          src: 'index.html',
          dest: 'dist/'
        },{
          src: 'styles/fonts/{,*/}*.*',
          expand: true,
          flatten: true,
          dot: true,
          dest: 'dist/styles/fonts',
        }
        ]
      },
    },
    includeSource: {
      options: {
        basePath: '',
        baseUrl: ''
      },
      dev: {
        files: {
          'index.html': 'index.html'
        }
      }
    },
    jshint: {
      all: ['Gruntfile.js', 'app/**/*.js']
    },
    watch: {
      options: {
        interrupt: true,
      },
      grunt: {
        options: {
          reload: true
        },
        files: ['Gruntfile.js']
      },
      compass: {
        files: ['styles/scss/**/*.scss'],
        tasks: ['compass:dev']
      },
      includeSource: {
        files: 'app/{,*/}*.js',
        tasks: ['includeSource'],
        options: {
          event: ['added', 'deleted']
        }
      }
    },
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-jshint');

  grunt.loadNpmTasks('grunt-bower-install');  // add bower component to html (bowerInstall)
  grunt.loadNpmTasks('main-bower-files');     // copy bower main files to dist folder (bower)
  grunt.loadNpmTasks('grunt-include-source'); // add js files to html (IncludeSource, watch/includeSource)
  grunt.loadNpmTasks('grunt-contrib-copy');   // copy file and folder (copy)

  grunt.registerTask('init', ['copy:init', 'bowerInstall']);  // initial the working environment, only need run once
  grunt.registerTask('dist', ['clean:build', 'bower:dist', 'includeSource', 'compass:dist', 'copy:dist']);
  grunt.registerTask('build', ['clean:build', 'includeSource', 'bowerInstall', 'copy:init', 'compass:dev',]);
  grunt.registerTask('default', ['compass:dev', 'bowerInstall', 'includeSource', 'watch']);
};
