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
          'index.html',
          'styles/scss/styles.scss'
        ]
      }
    },
    clean: {
      build: ['dist']
    },
    compass: {
      options: {
        importPath:['bower_components/bootstrap-sass/assets/stylesheets'],
        sassDir: 'styles/scss',
        imageDir: 'styles/images',
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
        },
        {
          src: 'libs/jQuery.mmenu-master/dist/js/jquery.mmenu.all.min.js',
          dest: 'dist/'
        },
        {
          src: 'libs/jQuery.mmenu-master/dist/css/jquery.mmenu.all.css',
          dest: 'dist/'
        },
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
        files: 'app/js/**/*.js',
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

  grunt.registerTask('dist', ['clean:build', 'bower:dist', 'includeSource', 'compass:dist', 'copy:dist']);
  grunt.registerTask('build', ['clean:build', 'compass:dev', 'includeSource', 'bower:dist',]);
  grunt.registerTask('default', ['watch']);
};
