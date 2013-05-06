
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
                ' * https://github.com/kiva/backbone.siren/blob/master/license.txt\n' +
                ' */\n'

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
    });



    grunt.loadNpmTasks('grunt-rigger');
    grunt.loadNpmTasks('grunt-contrib-jshint');

    grunt.registerTask('test', ['jshint', 'buster']);
};