
module.exports = function(grunt) {
    'use strict';


    // Project configuration.
    grunt.initConfig({
        meta: {
            version: require('./package.json').version
            , banner: '/**\n * kiva.js - <%= meta.version %> - <%= grunt.template.today("yyyy-mm-dd h:MM:ss TT") %>\n' +
                ' * http://kiva.org/\n' +
                ' * Copyright (c) <%= grunt.template.today("yyyy") %> kiva.org\n */'
        }

        , preprocess: {
            compile: {
                files: {
                    'dist/amd/aviso.js': ['build/_amd.js']
                    , 'dist/aviso.js': ['build/_core.js']
                }
            }
        }
    });



    grunt.loadNpmTasks('grunt-preprocess');
};