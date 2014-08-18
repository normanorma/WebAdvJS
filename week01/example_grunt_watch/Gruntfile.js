module.exports = function(grunt) {
    // Load Grunt tasks declared in the package.json file
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
    // Configure Grunt
    grunt.initConfig({

        // Grunt express - our webserver
        // https://github.com/blai/grunt-express
        express: {
            all: {
                options: {
                    bases: ['~/Volumes/Dropbox/Dropbox/_RECENTWORKS/2014_Fall/WebAdvJSGit/week01/example_grunt_watch'],
                    port: 9999,
                    hostname: "0.0.0.0",
                    livereload: true
                }
            }
        },

        // grunt-watch will monitor the projects files
        // https://github.com/gruntjs/grunt-contrib-watch
        watch: {
            all: {
                files: '*',
                options: {
                    livereload: true
                }
            }
        },

        // grunt-open will open your browser at the project's URL
        // https://www.npmjs.org/package/grunt-open
        open: {
            all: {
                path: 'http://localhost:' + 9999 + '/index.html'
            }
        }
    });

    // Creates the `server` task
    grunt.registerTask('server', [
        'express',
        'open',
        'watch'
    ]);
};