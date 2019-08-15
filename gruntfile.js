'use strict';
module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        banner: '/* MedForward - <%= grunt.template.today("mm-dd-yyyy") %>' +
            '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>;*/\n',

        jshint: {
            options: {
                predef: ["document", "console", "$", "window", "Waves"],
                esnext: true, //allows for ES6
                globalstrict: true,
                reporter: require('jshint-stylish', { beep: true })
                // globals: {"$": true }
                // browserify: true
            },
            target: ['src/js/main.js'],
            files: ['src/js/main.js']
        },




        // copy: {
        //     bootstrap: {
        //         expand: true,
        //         cwd: 'node_modules/bootstrap/dist',
        //         src: ['**'],
        //         dest: '../dist'
        //     },
        //     jquery: {
        //         expand: true,
        //         cwd: 'node_modules/jquery/dist',
        //         src: ['jquery.min.js'],
        //         dest: '../dist'
        //     }
        // },





        // minifies JS files
        uglify: {
            options: {
                banner: '<%= banner %>',
                sourceMap: true,
                // beautify for debugging
                beautify: true

            },
            my_target: {
                files: {
                    'main.min.js': 'src/js/main.js',
                    'customThree.min.js': 'src/js/customThree.js',
                }
            }
        },

        sass: {

            dist: {
                files: {
                    'src/css/styles.full.css': 'src/css/styles.scss'
                }
            }
        },

        cssmin: {

            target: {
                files: [{
                    expand: true,
                    cwd: 'src/css/',
                    src: ['*.css', '!*.min.css'],
                    dest: '',
                    ext: '.min.css'
                }]
            }
        },

        // for local development
        'http-server': {

            'dev': {
                root: ".",
                host: "localhost",
                port: '8080',

                cache: 0,
                showDir: true,
                autoIndex: true,

                // server default file extension
                ext: "html",

                // run in parallel with other tasks
                runInBackground: true

                // Tell grunt task to open the browser
                // openBrowser: true
            }
        },



        watch: {
            // reload gruntfile.js if it changes while running
            configFiles: {
                files: ['*.html'],
                options: {
                    reload: true,
                    livereload: true
                }

            },
            options: {
                livereload: true,
            },
            javascripts: {
                files: ['src/js/main.js'],
                tasks: ['jshint', 'uglify']
            },
            customThree: {
                files: ['src/js/customThree.js'],
                tasks: ['uglify']
            },
            sass: {
                files: ['src/css/*.scss'],
                tasks: ['sass', 'cssmin'],
                options: {
                    livereload: true,
                },
            },

            html: {
                files: ["src/**/*.html", "src/**/*.njk"],
                tasks: ["nunjucks"],
                options: {
                    spawn: false,
                    livereload: true
                }
            }

        },
        // Nunjucks task
        nunjucks: {
            options: {
                data: grunt.file.readJSON("data.json"),
                paths: "src/html"
            },
            dev: {
                files: [{
                    expand: true,
                    cwd: "src/html",
                    src: [
                        "**/*.html"
                    ],
                    dest: '',
                    ext: ".html"
                }],
            }
        }

    });


    // Load the plugins to run your tasks
    require("load-grunt-tasks")(grunt, {
        scope: "devDependencies"
    });
    require("time-grunt")(grunt);
    require('jit-grunt')(grunt);

    grunt.registerTask('default', [
        'http-server:dev',
        'uglify',
        'sass',
        'cssmin',
        'nunjucks',
        'watch'
    ]);
    //now, just typing 'grunt' will run this and the watch task will take over.
};
