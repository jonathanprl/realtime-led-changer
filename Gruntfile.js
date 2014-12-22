module.exports = function(grunt) {
   grunt.loadNpmTasks('grunt-contrib-less');
   grunt.loadNpmTasks('grunt-contrib-watch');

   grunt.initConfig({
      less: {
         development: {
            files: {
               "public/css/main.css": "public/less/main.less" // destination file and source file
            }
         }
      },
      watch: {
         styles: {
            files: ['public/less/**/*.less'], // which files to watch
            tasks: ['less'],
            options: {
               nospawn: true
            }
         }
      }
   });

   grunt.registerTask('default', ['watch']);
};