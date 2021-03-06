/* eslint global-require: 0 */
/* eslint "vars-on-top": 0 */

// Generated on 2015-10-12 using
// generator-webapp 1.1.0
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// If you want to recursively match all subfolders, use:
// 'test/spec/**/*.js'

module.exports = function (grunt) {

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    // Automatically load required grunt tasks
    require('jit-grunt')(grunt, {
        useminPrepare: 'grunt-usemin'
    });

    // Configurable paths
    var config = {
        app: 'app',
        dist: 'dist',
        tmp: '.tmp',
        test: 'test'
    };

    // Define the configuration for all the tasks
    grunt.initConfig({

        // Project settings
        config: config,

        // Watches files for changes and runs tasks based on the changed files
        watch: {
            bower: {
                files: ['bower.json'],
                tasks: ['wiredep']
            },
            browserify: {
                files: ['<%= config.app %>/scripts/{,*/}*.js'],
                tasks: [
                    'newer:eslint',
                    'browserify:dist',
                    'browserSync:test',
                    'mocha'
                ]
            },
            test: {
                files: [
                    '<%= config.test %>/spec/{,*/}*.js',
                    '<%= config.test %>/index.html'
                ],
                tasks: [
                    'newer:eslint',
                    'browserSync:test',
                    'mocha'
                ]
            },
            gruntfile: {
                files: ['Gruntfile.js'],
                tasks: ['newer:eslint']
            },
            sass: {
                files: ['<%= config.app %>/styles/{,*/}*.{scss,sass}'],
                tasks: ['sass', 'postcss']
            },
            styles: {
                files: ['<%= config.app %>/styles/{,*/}*.css'],
                tasks: ['newer:copy:styles', 'postcss']
            }
        },

        browserSync: {
            options: {
                notify: false,
                background: true,
                watchOptions: {
                    ignored: ''
                }
            },
            livereload: {
                options: {
                    files: [
                        '<%= config.app %>/{,*/}*.html',
                        '.tmp/styles/{,*/}*.css',
                        '<%= config.app %>/images/{,*/}*',
                        '.tmp/scripts/{,*/}*.js'
                    ],
                    port: 9000,
                    server: {
                        baseDir: ['.tmp', config.app],
                        routes: {
                            '/bower_components': './bower_components'
                        }
                    }
                }
            },
            test: {
                options: {
                    port: 9001,
                    open: false,
                    logLevel: 'verbose',
                    host: 'localhost',
                    server: {
                        baseDir: ['.tmp', './test', config.app],
                        routes: {
                            '/bower_components': './bower_components',
                            '/dist': './dist'
                        }
                    }
                }
            },
            dist: {
                options: {
                    background: false,
                    server: '<%= config.dist %>'
                }
            }
        },

        // Empties folders to start fresh
        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: [
                        '.tmp',
                        '<%= config.dist %>/*',
                        '!<%= config.dist %>/.git*'
                    ]
                }]
            },
            server: '.tmp'
        },

        // Make sure code styles are up to par and there are no obvious mistakes
        eslint: {
            target: [
                'Gruntfile.js',
                '<%= config.app %>/scripts/{,*/}*.js',
                '!<%= config.app %>/scripts/vendor/*',
                'test/spec/{,*/}*.js'
            ]
        },

        // Mocha testing framework configuration options
        mocha: {
            options: {
                log: true,
                run: true
            },
            all: {
                options: {
                    urls: ['http://<%= browserSync.test.options.host %>:<%= browserSync.test.options.port %>/index.html']
                }
            }
        },

        // Compiles ES6 with Babel
        babel: {
            options: {
                sourceMap: true
            },
            test: {
                files: [{
                    expand: true,
                    cwd: 'test/spec',
                    src: '{,*/}*.js',
                    dest: '.tmp/spec',
                    ext: '.js'
                }]
            }
        },

        browserify: {
            dist: {
                options: {
                    transform: ['babelify'],
                    browserifyOptions: {
                        debug: true
                    }
                },
                files: {
                    '.tmp/scripts/main.js': '<%= config.app %>/scripts/main.js'
                }
            }
        },

        // Compiles Sass to CSS and generates necessary files if requested
        sass: {
            options: {
                sourceMap: true,
                sourceMapEmbed: true,
                sourceMapContents: true,
                includePaths: ['.']
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= config.app %>/styles',
                    src: ['*.{scss,sass}'],
                    dest: '.tmp/styles',
                    ext: '.css'
                }]
            }
        },

        postcss: {
            options: {
                map: true,
                processors: [
                    // Add vendor prefixed styles
                    require('autoprefixer')({
                        browsers: ['> 1%', 'last 2 versions', 'Firefox ESR']
                    })
                ]
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: '.tmp/styles/',
                    src: '{,*/}*.css',
                    dest: '.tmp/styles/'
                }]
            }
        },

        // Automatically inject Bower components into the HTML file
        wiredep: {
            app: {
                src: ['<%= config.app %>/index.html'],
                ignorePath: /^(\.\.\/)*\.\./
            },
            sass: {
                src: ['<%= config.app %>/styles/{,*/}*.{scss,sass}'],
                ignorePath: /^(\.\.\/)+/
            }
        },

        // Renames files for browser caching purposes
        filerev: {
            dist: {
                src: [
                    '<%= config.dist %>/scripts/{,*/}*.js',
                    '<%= config.dist %>/styles/{,*/}*.css',
                    '<%= config.dist %>/images/{,*/}*.*',
                    '<%= config.dist %>/styles/fonts/{,*/}*.*',
                    '<%= config.dist %>/*.{ico,png}'
                ]
            }
        },

        // Reads HTML for usemin blocks to enable smart builds that
        // automatically concat, minify and revision files. Creates
        // configurations in memory so additional tasks can operate on them
        useminPrepare: {
            options: {
                dest: '<%= config.dist %>'
            },
            html: '<%= config.app %>/index.html'
        },

        // Performs rewrites based on rev and the useminPrepare configuration
        usemin: {
            options: {
                assetsDirs: [
                    '<%= config.dist %>',
                    '<%= config.dist %>/images',
                    '<%= config.dist %>/styles'
                ]
            },
            html: ['<%= config.dist %>/{,*/}*.html'],
            css: ['<%= config.dist %>/styles/{,*/}*.css']
        },

        // The following *-min tasks produce minified files in the dist folder
        imagemin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= config.app %>/images',
                    src: '{,*/}*.{gif,jpeg,jpg,png}',
                    dest: '<%= config.dist %>/images'
                }]
            }
        },

        svgmin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= config.app %>/images',
                    src: '{,*/}*.svg',
                    dest: '<%= config.dist %>/images'
                }]
            }
        },

        htmlmin: {
            dist: {
                options: {
                    collapseBooleanAttributes: true,
                    collapseWhitespace: true,
                    conservativeCollapse: true,
                    removeAttributeQuotes: true,
                    removeCommentsFromCDATA: true,
                    removeEmptyAttributes: true,
                    removeOptionalTags: true,
                    // true would impact styles with attribute selectors
                    removeRedundantAttributes: false,
                    useShortDoctype: true
                },
                files: [{
                    expand: true,
                    cwd: '<%= config.dist %>',
                    src: '{,*/}*.html',
                    dest: '<%= config.dist %>'
                }]
            }
        },

        // Copies remaining files to places other tasks can use
        copy: {
            dist: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= config.app %>',
                    dest: '<%= config.dist %>',
                    src: [
                        '*.{ico,png,txt}',
                        'images/{,*/}*.webp',
                        '{,*/}*.html',
                        'styles/fonts/{,*/}*.*'
                    ]
                }]
            },
            js: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= config.tmp %>',
                    dest: '<%= config.dist %>',
                    src: [
                        'scripts/main.js'
                    ]
                }]
            }
        },

        // Run some tasks in parallel to speed up build process
        concurrent: {
            server: [
                'browserify:dist',
                'sass'
            ],
            test: [
                'eslint',
                'babel'
            ],
            dist: [
                'browserify:dist',
                'sass',
                'imagemin',
                'svgmin'
            ]
        }
    });


    grunt.registerTask('serve', 'start the server and preview your app',
        function (target) {

            if (target === 'dist') {
                return grunt.task.run(['build', 'browserSync:dist']);
            }

            grunt.task.run([
                'clean:server',
                'wiredep',
                'eslint',
                'concurrent:server',
                'postcss',
                'browserSync:livereload',
                'watch'
            ]);
        }
    );

    grunt.registerTask('test', function (target) {
        if (target !== 'watch') {
            grunt.task.run([
                'clean:server',
                'concurrent:test',
                'postcss'
            ]);
        }

        grunt.task.run([
            'browserSync:test',
            'mocha'
        ]);
    });

    grunt.registerTask('build', [
        'clean:dist',
        'wiredep',
        'concurrent:dist',
        'postcss',
        'copy',
        'htmlmin'
    ]);

    grunt.registerTask('default', [
        'newer:eslint',
        'test',
        'build'
    ]);
};
