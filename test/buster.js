var config = module.exports;

config['development'] = {
    env: 'browser'
    , rootPath: '../'
    , deps: [
        'bower_components/jquery/jquery.js'
    ]
    , sources: ['src/js/aviso.js']
    , specs: ['test/buster-jquery-assertions.js', 'test/spec/**/*.js']
    , extensions: [ require('buster-istanbul') ]
    , "buster-istanbul": {
        outputDirectory: "test/coverage"
        , format: "lcov"
    }
};


// @TODO Add tests for the /dist files
//
//config['core'] = {
//    env: 'browser'
//    , rootPath: '../'
//    , deps: [
//        'components/jquery/jquery.js'
//    ]
//    , sources: ['dist/aviso.js']
//    , specs: ['test/buster-jquery-assertions.js', 'test/spec/**/*.js']
//};
//
//config['amd'] = {
//    env: 'browser'
//    , rootPath: '../'
//    , deps: [
//        'components/jquery/jquery.js'
//    ]
//    , sources: ['dist/amd/aviso.js']
//    , specs: ['test/buster-jquery-assertions.js', 'test/spec/**/*.js']
//};
