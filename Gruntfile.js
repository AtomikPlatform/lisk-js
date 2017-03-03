module.exports = function (grunt) {
	require('load-grunt-tasks')(grunt);

	grunt.initConfig({
		eslint: {
			options: {
				configFile: 'eslint_ecma5.json',
				reset: true
			},
			target: ['lib/**', 'test/**', 'Gruntfile.js', 'index.js']
		},

		pkg: grunt.file.readJSON('package.json'),

		browserify: {
			js: {
				src: './index.js',
				dest: './lisk-js.js'
			},
			options: {
				browserifyOptions: {
					standalone: 'lisk'
				}
			}
		},

		watch: {
			scripts: {
				files: ['lib/*.js'],
				tasks: ['eslint', 'browserify'],
				options: {
					spawn: false,
					livereload: true
				},
			},
		}
	});

	grunt.loadNpmTasks('grunt-browserify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-force');
	grunt.registerTask('default', [
		'force:on',
		'browserify',
		'eslint',
		'watch'
	]);
};
