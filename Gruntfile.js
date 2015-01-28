module.exports = function(grunt) {
    // Project configuration.
    require('time-grunt')(grunt);
    require('load-grunt-tasks')(grunt);
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        watch: {
            compass: {
                files: ['**/*.{scss,sass}'],
                tasks: ['compass:dev']
            },
            js: {
                files: ['assets/js/**/*.js', '!assets/js/main.min.js'],
                tasks: ['uglify']
            },
            options: {
                livereload: true,
            }
        },
        compass: {
            dev: {
                options: {
                    sassDir: ['assets/stylesheets/sass'],
                    cssDir: ['assets/stylesheets/css'],
                    environment: 'development'
                }
            },
            prod: {
                options: {
                    sassDir: ['assets/stylesheets/sass'],
                    cssDir: ['assets/stylesheets/css'],
                    environment: 'production'
                }
            }
        },
        uglify: {
            all: {
                files: {
                    'assets/js/main.min.js': [
                        'assets/js/parallax.min.js',
                        'assets/js/handlebars.js',
                        'assets/js/main.js'
                    ]
                }
            }
        },
        autoprefixer: {
            dist: {
                files: {
                    'assets/stylesheets/css/style.css': 'assets/stylesheets/css/style.css'
                }
            }
        },
        'ftp-deploy': {
            build: {
                auth: {
                  host: 's162881.gridserver.com',
                  port: 21,
                  authKey: 'key1'
                },
                src: '.',
                dest: 'domains/portfolio.nplsk.info/html/archive/ayfast',
                exclusions: ['assets/sass', '.ftppass', 'node_modules', '**/.DS_Store', '**/Thumbs.db', 'tmp', '.git*', '.*']
            }
        }
        // CONFIG ===================================/

    });
    // DEPENDENT PLUGINS =========================/

    // TASKS =====================================/
    grunt.registerTask('default', ['newer:compass:dev', 'newer:uglify', 'watch']);
    grunt.registerTask('prod', ['compass:dev', 'autoprefixer']);
    grunt.registerTask('push', ['ftp-deploy']);
};