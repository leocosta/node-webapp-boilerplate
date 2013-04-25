module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
	concat:{
		options:{
			separator: ';'
		},
		basic:{
			src: ['src/**/*.js'],
			dest: 'build/<%= pkg.name %>.js'
		},
		lib:{
			src: ['libs/**/*.js'],
			dest: 'libs/libs.js'
		}
	},
	jshint:{
		// define the files to lint
		all: ['Gruntfile.js', 'src/**/*.js', 'tests/**/*.js'],
		// configure JSHint (documented at http://www.jshint.com/docs/)
		options: {
			// more options here if you want to override JSHint defaults
			globals:{
				jQuery: true,
				console: true,
				module: true
			}
		}
	},
	simplemocha: {
		options: {
			globals: ['should'],
			timeout: 3000,
			ignoreLeaks: false,
			grep: '*-test',
			ui: 'bdd',
			reporter: 'tap'
		},
		all: { src: 'tests/**/*.js' }
	},
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: 'build/<%= pkg.name %>.js',
        dest: 'build/<%= pkg.name %>.min.js'
      }
    },
	watch:{
		files:['<%= jshint.files %>'],
		tasks:['jshint','simplemocha']
	}
	});

	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-simple-mocha');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('test', ['jshint', 'simplemocha']);
	grunt.registerTask('default', ['simplemocha', 'concat', 'uglify']);

};
