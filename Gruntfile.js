
module.exports = function(grunt) {
    'use strict';


    // Project configuration.
    grunt.initConfig({
        meta: {
            version: require('./package.json').version
            , banner: '/**\n * aviso.js - v<%= meta.version %> \n' +
                ' * Copyright (c) <%= grunt.template.today("yyyy") %> Kiva Microfunds\n' +
                ' * \n' +
                ' * Licensed under the MIT license.\n' +
                ' * https://github.com/kiva/aviso/blob/master/license.txt\n' +
                ' */\n'

        }


        , buster: {
            test: {
                reporter: 'specification'
            }
        }


        , jshint: {
            options: {
                jshintrc: '.jshintrc'
            }
            , all: ['src/*.js', 'test/spec/**/*.js']
        }


        , rig: {
            compile: {
                options: {
                    banner: '<%= meta.banner %>'
                }
                , files: {
                    'dist/amd/aviso.js': ['build/_amd.js']
                    , 'dist/aviso.js': ['build/_core.js']
                }
            }
        }


        , uglify: {
            target: {
                options: {
                    banner: '<%= meta.banner %>'
                }
                , files: {
                    'dist/aviso.min.js': ['dist/aviso.js']
                    , 'dist/amd/aviso.min.js': ['dist/amd/aviso.js']
                }
            }
        }
    });


    grunt.loadNpmTasks('grunt-buster');
    grunt.loadNpmTasks('grunt-rigger');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('test', ['jshint', 'buster']);
    grunt.registerTask('build', ['rig', 'uglify']);
};