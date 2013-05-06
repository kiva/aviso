var config = module.exports;

config['development'] = {
    env: 'browser'
    , rootPath: '../'
    , deps: [
        'components/jquery/jquery.js'
    ]
    , sources: ['src/js/aviso.js']
    , specs: ['test/buster-jquery-assertions.js', 'test/spec/**/*.js']
//    , extensions: [ require('buster-coverage') ]
//    , "buster-coverage": {
//        outputDirectory: "test/coverage"
//        , format: "lcov"
//        , combinedResultsOnly: true
//    }
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
