module.exports = function(grunt){
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            client: {
                src: 'client/scripts/app.js',
                dest: 'server/public/assets/scripts/app.min.js'
            },
            controllers: {
                src: 'client/scripts/controllers/controller.js',
                dest: 'server/public/assets/scripts/controller.min.js'
            }

        },
        copy: {
            bootstrap: {
                expand: true,
                cwd: 'node_modules',
                src: [
                    "bootstrap/dist/css/bootstrap.min.css"
                ],
                "dest": "server/public/vendors/"
            },
            style: {
                expand: true,
                cwd: 'client',
                src: [
                    "styles/styles.css"
                ],
                "dest": "server/public/assets"
            },
            jquery: {
                expand: true,
                cwd: 'node_modules',
                src: 'jquery/dist/jquery.min.js',
                dest: 'server/public/vendors'
            },
            html: {
                expand: true,
                cwd: 'client/views/',
                src: [
                    "index.html",
                     "register.html",
                    "admin.html",
                    "views/users.html"

                ],
                "dest": "server/public/assets/views/"
            },
             htmlRoutes: {
                expand: true,
                cwd: 'client',
                src: [
                    "views/routes/timer.html",
                     "views/routes/home.html",
                     "views/routes/crutch.html",
                    "views/routes/grammar.html",
                    "views/routes/about.html"


                ],
                "dest": "server/public/assets"
            },
            angular: {
                expand: true,
                cwd: 'node_modules',
                src: [
                    "angular/angular.min.js",
                    "angular/angular.min.js.map"
                ],
                "dest": "server/public/vendors/"
            },

            angularRoute: {
                expand: true,
                cwd: 'node_modules',
                src: [
                    "angular-route/angular-route.min.js",
                    "angular-route/angular-route.min.js.map"
                ],
                "dest": "server/public/vendors/"
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('default', ['copy', 'uglify']);
};