module.exports = function(grunt) {
   grunt.loadNpmTasks('grunt-contrib-less');
   grunt.loadNpmTasks('grunt-contrib-watch');
   grunt.loadNpmTasks('grunt-contrib-cssmin');

   grunt.initConfig({
      less: {
         development: {
            files: {
               "css/main.css": "less/main.less" // destination file and source file
            }
         }
      },
      cssmin: {
         production: {
            files: {
               "css/main.css": "css/main.min.css" // destination file and source file
            }
         }
      },
      includeSource: {
         options: {
            basePath: 'billing',
            baseUrl: 'public/',
            templates: {
               html: {
                  js: '<script src="{filePath}"></script>',
                  css: '<link rel="stylesheet" type="text/css" href="{filePath}" />',
               }
            }
         },
         myTarget: {
            files: {
               'dist/index.html': 'app/index.tpl.html'
            }
         }
      }
      watch: {
         styles: {
            files: ['less/**/*.less'], // which files to watch
            tasks: ['less'],
            options: {
               nospawn: true
            }
         }
      }
   });

   grunt.registerTask('default', ['watch']);
};