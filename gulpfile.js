/**
 * @version gulp 4.1 
 *
 * Referências:
 * 
 *     @link http://www.matera.com/blog/post/gulp-ferramentas-para-front-end-parte-2
 *     @link https://gist.github.com/timarney/f122a1004de3f09ec215
 *     @link https://hackersandslackers.com/upgrading-to-gulp-4/
 *
 *     | prefixer | Gulp Sourcemaps 
 *     @link https://blog.da2k.com.br/2015/02/21/sourcemaps-debugando-js-e-css-minificados/  
 *     @link https://medium.com/@fnandaleite/gulp-direto-ao-ponto-fluxo-de-trabalho-para-iniciantes-2da02f5ab41e  | prefixer
 *
 *     | gullp series | gullp paralelo
 *     @link https://codeburst.io/switching-to-gulp-4-0-271ae63530c0   | gullp series | gullp paralelo
 *
 *     | autoprefixer | browsers | overrideBrowserslist
 *     @link https://github.com/browserslist/browserslist#readme | autoprefixer | browsers
 *
 *     | uglify | Mimificar arquivos JS já concaenados em um único arquivo
 *     @link https://www.npmjs.com/package/gulp-uglify
 *
 *      | error: The following tasks did not complete: default, Did you forget to signal async completion? 
 *      @link https://stackoverflow.com/questions/52678262/gulp4-tasks-did-not-complete-and-forget-to-signal-async-completion
 *      @link https://visdup.blogspot.com/2019/01/gulp-error-following-tasks-did-not.html
 *      @link https://stackoverflow.com/questions/36897877/gulp-error-the-following-tasks-did-not-complete-did-you-forget-to-signal-async
 *
 * Tarefas a ser executas:
 *
 *     Copíar arquivos externos de libs e recursos necessários
 *     Mimificar arquivos CSS, HTML, JS
 *     Limpar arquivos intermediários
 *     Veriricar a qualidade código, debugando erros em desenvolvimento em arquivos .css e .js
 *     Concatenar arquivos .css e .js em um único arquivo
 *
 * Instalações:
 *
 *     1.0 - npm install gulp-cli -g  
 *     1.1 - npm install --save-dev gulp || npm install -D gulp@4.0.1   || npm install -D gulp
 *     2   - npm install --save-dev gulp-jshint 
 *     3   - npm install --save-dev gulp-uglify
 *     4   - npm install --save-dev gulp-clean
 *     5   - npm install --save-dev gulp-concat
 *     6   - npm install --save-dev event-stream
 *     7   - npm install --save-dev gulp-htmlmin
 *     8   - npm install --save-dev gulp-clean-css
 *     9   - npm install --save-dev run-sequence
 *     10  - npm install --save-dev gulp4-run-sequence
 *     11  - npm install --save-dev gulp-rename
 *     12  - npm install --save-dev gulp-sass
 *     13  - npm install --save-dev readable-stream
 *     14  - npm install --save-dev copy
 *     15  - npm install --save-dev gulp-cssmin
 *     16  - npm install --save-dev gulp-autoprefixer
 *     17  - npm install --save-dev gulp-autoprefixer
 *     18  - npm install --save-dev gulp-sourcemaps
 * 
 * 
 * help: gulp --help |  gulp -v
 *     Gulp:  CLI version: 2.2.0
 * 
 */

'use strict';

// Abaixo com a versão Gulp 4
var gulp             = require('gulp');
var gulpJshint       = require('gulp-jshint');
var gulpClean        = require('gulp-clean');
var gulpConcat       = require('gulp-concat');
var gulpUglify       = require('gulp-uglify');
var eventStream      = require('event-stream');
//var htmlmin        = require('gulp-htmlmin');
var cleanCSS         = require('gulp-clean-css');
var runSequence      = require('run-sequence');
var runSequence      = require('gulp4-run-sequence');
//var rename         = require('gulp-rename');
var gulpSass         = require('gulp-sass');
var pipeline         = require('readable-stream').pipeline;
//var copy           = require('copy').pipeline;
var gulpCssMin       = require('gulp-cssmin');
var gulpAutoprefixer = require('gulp-autoprefixer');
var gulpSourcemaps   = require('gulp-sourcemaps');
var gulpMerge       = require('merge-stream');


/*---------------------------------------------------------------
   Validando erros do Javascript                                                  
----------------------------------------------------------------*/

// JSHInt: Análisa o Código JS reportando erros caso exista
// gulp.task('jshint', gulp.series( function () {
//     return gulp.src(
//             [
//                 'assets/js/global.js'
//             ],
//             { allowEmpty: true }
//         )
//         .pipe( gulpJshint() )
//         .pipe(gulpJshint.reporter('default'));
// }));


/*---------------------------------------------------------------
    'Limpa os arquivos anteriores para produção'                                                
----------------------------------------------------------------*/

// Limpa os arquivos .js mimificados 
// gulp.task('clean-dist-js', gulp.series( function () {
//     return gulp.src(['assets/dist/js'], { allowEmpty: true, read: false})
//     .pipe( gulpClean() );
// }));

// Limpa os arquivos .css mimificados 
// gulp.task('clean-dist-css', gulp.series( function () {
//     return gulp.src(['assets/dist/css'], { allowEmpty: true, read: false})
//     .pipe( gulpClean() );
// }));

// Limpa todos os arquivos .js e .css  mimificados 
// gulp.task('clean-dist-all', gulp.series( function () {
//     return gulp.src(['assets/dist/js','assets/dist/css', 'assets/dist/fonts'], { allowEmpty: true, read: false})
//     .pipe( gulpClean() );
// }));


/*---------------------------------------------------------------
    'Cópia arquivos .sass e converte para .css'                                                
----------------------------------------------------------------*/

/** 
 * Cópia os arquivos .sass de libs externas e converte em .css para modificações e customizações
 * Comando perigoso, realizar apenas uma vez, e desmacar os que não precisar copiar novamente 
 * pois se os arquivos já estiverem alterados, perderá voltando ao original
 */
// gulp.task('copy-sass-ext', gulp.series( function () {
//     return gulp.src(
//         ['node_modules/bootstrap/scss/*.scss'],
//         { allowEmpty: true }  // corrige erro -> Error: File not found with singular glob: <path/glob> (if this was purposeful, use 'allowEmpty' option)
//     )
//     .pipe( gulpSourcemaps.init() )
//     .pipe( gulpSass().on('error', gulpSass.logError) ) // converter o Sass em CSS
//     .pipe( gulpSourcemaps.write('./') )
//     .pipe( gulp.dest('assets/css') )
// }));


// gulp.task('copy-css-ext', gulp.series( function () {
//     return gulp.src(
//         [
//             'node_modules/bootstrap/dist/css/bootstrap.css',
//             'node_modules/font-awesome/css/font-awesome.css',
//             'node_modules/animate.css/animate.css',
//             'node_modules/malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.css'
//         ],
//         { allowEmpty: true }  // corrige erro -> Error: File not found with singular glob: <path/glob> (if this was purposeful, use 'allowEmpty' option)
//     )
//     .pipe( gulp.dest('assets/css') )
// }));


/**
 * Copy Sass BooStrap
 * 
 * https://stackoverflow.com/questions/26784094/can-i-use-a-gulp-task-with-multiple-sources-and-multiple-destinations
 */
gulp.task('copy-sass-bs', gulp.series( function () {
    var firstPath =  gulp.src(
        [
            // bootstrap requeridos
            'node_modules/bootstrap/scss/_functions.scss',
            'node_modules/bootstrap/scss/_variables.scss',
            'node_modules/bootstrap/scss/_mixins.scss',
            // bootstrap opcionais
            'node_modules/bootstrap/scss/_modal.scss',
            'node_modules/bootstrap/scss/_buttons.scss',
            'node_modules/bootstrap/scss/_close.scss',
        ],
        { allowEmpty: true }  
    )
    .pipe( gulp.dest('assets/sass/elements/bootstrap') );

    var secondPath = gulp.src(
        [ 'node_modules/bootstrap/scss/mixins/*scss'],
        { allowEmpty: true }  
    )
    .pipe( gulp.dest('assets/sass/elements/bootstrap/mixins') );

    var threePath = gulp.src(
        ['node_modules/bootstrap/scss/vendor/*scss'],
        { allowEmpty: true }  
    )
    .pipe( gulp.dest('assets/sass/elements/bootstrap/vendor') );

    return gulpMerge(firstPath, secondPath, threePath);
 }));

 // Sass
gulp.task('sass', gulp.series( function() {
    return gulp.src(['assets/sass/*.scss'])
        .pipe( gulpSass().on('error', gulpSass.logError) )
        .pipe( gulpSass({outputStyle: 'nested'}).on('error', gulpSass.logError))
        .pipe( gulpAutoprefixer(
            {
                overrideBrowserslist: ['last 25 versions'],
                cascade: false
            }
        ))
        .pipe(gulp.dest('assets/css'));
}));



// Cópia os arquivos .js de libs externas para modificações e customizações
// Comando perigoso, realizar apenas uma vez, e desmacar os que não precisar copiar novamente 
// pois se os arquivos já estiverem alterados, perderá voltando ao original
// gulp.task('copy-js-ext', gulp.series( function () {
//     return gulp.src(
//         [
//             'node_modules/jquery/dist/jquery.js',
//             'node_modules/popper.js/dist/umd/popper.js',
//             'node_modules/bootstrap/dist/js/bootstrap.js',
//             'node_modules/html5shiv/dist/html5shiv-printshiv.js',
//             'node_modules/malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.js',
//             'node_modules/wow.js/dist/wow.js',
//             'node_modules/countup/countUp.js',
//         ],
//         { allowEmpty: true }
//     )
//     .pipe(gulp.dest('assets/js'))
// }));

// Cópia os arquivos de fonts de plugins para dev e local
// gulp.task('copy-fonts-ext', gulp.series( function () {
//     return gulp.src(
//         [
//             'node_modules/font-awesome/fonts/*'
//         ],
//         { allowEmpty: true }
//     )
//     .pipe(gulp.dest('assets/fonts'))
// }));

// gulp.task('copy-fonts-prd', gulp.series( function () {
//     return gulp.src( [ 'assets/fonts/*', 'assets/icomoon/fonts/*'],{ allowEmpty: true } ).pipe(gulp.dest('assets/dist/fonts'))
// }));


/*---------------------------------------------------------------
    'Cópia arquivos .css e .js para desenvolvimento local'                                                
----------------------------------------------------------------*/

// Cópia os arquivos .sass e transforma em .css para uso local de desenvolviemnto 'assets/sass/**/*.css']
// gulp.task('copy-sass-dev', function (callback) {
//     return gulp.src(
//         [
//             'assets/sass/**/*.scss'
//         ],
//         { allowEmpty: true }  // corrige erro -> Error: File not found with singular glob: <path/glob> (if this was purposeful, use 'allowEmpty' option)
//     )
//     .pipe( gulpSourcemaps.init() )
//     .pipe( gulpSass().on('error', gulpSass.logError) ) // converter o Sass em CSS
//     //.pipe( gulpSass({outputStyle: 'compressed'}).on('error', gulpSass.logError) ) // converter o Sass em CSS
//     .pipe( gulpAutoprefixer(
//         {
//             overrideBrowserslist: ['last 25 versions'],
//             cascade: false
//         }
//     ))
//     .pipe( gulpSourcemaps.write('./')  )
//     .pipe( gulp.dest('assets/css'))

//     callback();
// });

//Copia Verifica Erros de Javascript
// gulp.task('copy-js-dev',  gulp.series( gulp.parallel ('jshint'), function () {
//     return gulp.src( ['assets/global.js'], { allowEmpty: true })
//         .pipe( gulpJshint() )
//         .pipe(gulpJshint.reporter('default'))
// }));


/*---------------------------------------------------------------
 'Mimificação e Concatenação de arquivos .js e .css para Produção'                                                
----------------------------------------------------------------*/
// Mimificação dos arquivos JS   [passo-1]
// gulp.task('minjs',  gulp.series( function () {
//     return pipeline(
//             gulp.src( ['assets/js/**/*.js'] ),
//             gulpUglify(),
//             gulp.dest('assets/src/js') 
//         );
// }));

// Copy arquivos JS separdos para Production
// gulp.task('copy-minjs-prd', gulp.series( function () {
//     return gulp.src(
//         [
//             'assets/src/js/html5shiv-printshiv.js',
//         ],
//         { allowEmpty: true }
//     )
//     .pipe( gulpSourcemaps.init() )
//     .pipe( gulpConcat('html5shiv-printshiv-min.js')) 
//     .pipe( gulpUglify()) 
//     .pipe( gulpSourcemaps.write( '.' ) )
//     .pipe( gulp.dest('assets/dist/js'));

// }));

// Concat e Uglify: Junta todos os arquivos mimificados .js num só arquivo. [passo-2]
// gulp.task('concat-js',  gulp.series( gulp.parallel ('clean-dist-js'), function () {
//     return eventStream.merge (
//         gulp.src(
//                 [   // important para não gerar erros, está é ordem de precência como se estivesse nom site
//                     'assets/src/js/jquery.js',
//                     'assets/src/js/countUp.js',
//                     'assets/src/js/popper.js',
//                     'assets/src/js/bootstrap.js',
//                     'assets/src/js/malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.js',
//                     'assets/src/js/wow.js/dist/wow.js',
//                     'assets/src/js/global.js',
//                 ], 
//                 { allowEmpty: true } 
//         )
//         //.pipe( gulpUglify() ) 
//     )
//     .pipe( gulpSourcemaps.init() )
//     .pipe( gulpConcat('scripts-all-min.js')) 
//     .pipe( gulpUglify()) 
//     .pipe( gulpSourcemaps.write( '.' ) )
//     .pipe( gulp.dest('assets/dist/js'));
// }));

// Concatena e  mimifca arquivos .css
// gulp.task('cssmin', gulp.series( gulp.parallel ('clean-dist-css'), function () {
//     return gulp.src(
//         [
//             'assets/css/bootstrap.css',
//             'assets/css/font-awesome.css',
//             'assets/icomoon/style.css',
//             'assets/css/animate.css/animate.css',
//             'assets/css/malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.css',
//             'style.css',
//             'assets/css/global.css',
//         ],
//         { allowEmpty: true } 
//     )
//     .pipe( gulpSourcemaps.init() )
//     .pipe(cleanCSS({debug: true}, (details) => {
//         console.log(`${details.name}: ${details.stats.originalSize}`);
//         console.log(`${details.name}: ${details.stats.minifiedSize}`);
//       }))
//     .pipe( gulpConcat('styles-all-min.css') )
//     .pipe( gulpCssMin() )
//     .pipe( gulpSourcemaps.write('./')  )
//     .pipe( gulp.dest('assets/dist/css') );
// }));



/*--------------------------------------------------------------
        >>> Watch: Alterações nos arquivos .css e .js                                                  
----------------------------------------------------------------*/
// gulp.task('watch-sass', gulp.series( function() {
//     gulp.watch(['assets/sass/**/*.scss'], gulp.parallel( ['copy-sass-dev']));
// }));

// gulp.task('watch-js', gulp.series( function() {
//     gulp.watch(['assets/js/**/*.js'], gulp.parallel( ['jshint','copy-js-dev']));
// }));

// Sass CSS e JS: Executa tudo em tempo real quando há alteração nos arquivos  em development
// gulp.task('watch', gulp.series( function() {
//     gulp.watch(['assets/sass/**/*.scss'], gulp.parallel( ['watch-sass']));
//     gulp.watch(['assets/js/**/*.js'], gulp.parallel(['watch-js']));
// }));


/** 
 * Defautl:
 * 
 * 1 - Executar sempre quando há alterações em arquivos .css e .js
 * 
 */
// gulp.task('default', gulp.series( ['watch'] ));


/**
 * Build para produção All, ou Build apenas de arquivos .css  ou .js
 * 
 * 2 -  Executar sempre quando há alterações em arquivos .css e .js e enviar para produção
 * 
 */ 
//gulp.task('build', gulp.series( ['clean','jshint','copy','uglify','sass', 'cssmin'] ));

// gulp.task('build', function (callback) {
//     //return runSequence('clean', ['jshint','copy','uglify', 'cssmin'], callback);
//     // return runSequence(['jshint','minjs', 'copy-minjs-prd', 'concat-js','cssmin','copy-fonts-prd'], callback);

//     return runSequence('clean-dist-all', ['jshint','minjs', 'copy-minjs-prd', 'concat-js', 'cssmin', 'copy-fonts-prd'], callback);
// });

// gulp.task('build-css', function (callback) {
//     //return runSequence('clean', ['jshint','copy','uglify', 'cssmin'], callback);
//     return runSequence(['cssmin'], callback);
// });

// gulp.task('build-js', function (callback) {
//     //return runSequence('clean', ['jshint','copy','uglify', 'cssmin'], callback);
//     return runSequence(['jshint','minjs','concat-js'], callback);
// });
