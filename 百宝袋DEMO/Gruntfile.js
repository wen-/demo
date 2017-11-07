module.exports = function(grunt) {
	// Project configuration.
	grunt.initConfig({
		//获取package.json的内容
		pkg: grunt.file.readJSON('package.json'),
		//js压缩参数配置
		uglify: {
			options: {
				//preserveComments:"some",//保留注释
				//banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
				banner:'/*\n* JS Document for <%= pkg.name %>\n* Developer: <%= pkg.developer %>\n* Email: <%= pkg.email %>\n* Date: <%= pkg.date %>\n<%= pkg.details %>\n'
			},
			build: {
				//单个文件写法
				src: 'js/main.js',
				dest: 'js/main.min.js'
				//单个文件另一种写法
				//files:{
				//	'src/abc.min.js':['src/abc.js']
				//}
				/*
				 //多文件写法
				 files: [{
				 expand: true,
				 cwd: '管理后台页面/js',//输入目录
				 src: '*.js',//输入目录所有文件
				 dest: 'build/js',//输出目录
				 ext: '.min.js'//后缀
				 }]
				 */
			}
		},
		//css3加前缀
		autoprefixer: {
			options: {
				browsers: ['last 20 versions', 'ie 9'],
				//browsers: ['opera 12', 'ff 15', 'chrome 25']
			},
			//单个文件写法
			/*single_file: {
			 src: 'css/a.css',
			 dest: 'autoprefixer/a.css'
			 }*/
			//多文件写法
			multiple_files: {
				expand: true,
				flatten: true,
				src: 'css/main.css',
				dest: 'css/autoprefixer/'
			}
		},
		//css压缩
		cssmin: {
			options : {
				compatibility : 'ie7', //设置兼容模式
				noAdvanced : true //取消高级特性
			},
			target: {
				files: [{
					expand: true,
					cwd: 'css/autoprefixer',
					src: ['main.css', '!*.min.css'],//不包含.min.css后缀的文件
					dest: 'css',
					ext: '.min.css'
				}]
			}
		},
		//文件改动监听
		watch: {  // grunt-contrib-watch的事务定义
			all: {
				files: ['css/main.css','js/main.js'],
				tasks: ['newer:uglify','newer:autoprefixer','newer:cssmin'],
				options: {
					debounceDelay: 250
				}
			}
		}
	});

	// 告诉grunt要使用哪些包.
	grunt.loadNpmTasks('grunt-contrib-uglify');//js压缩
	grunt.loadNpmTasks('grunt-autoprefixer');//css3加前缀
	grunt.loadNpmTasks('grunt-contrib-cssmin');//css压缩
	grunt.loadNpmTasks('grunt-contrib-watch');//文件变动监听（作用是实现我们一开始需求的“自动化”！是最重要的一个插件之一！它会监听需要处理的文件的变动，一旦有变动就会自动执行相应处理。但是它有一个问题，就是每当监听到一处变动时，就会大费周章地把所有被监听的文件都处理一遍；）
	grunt.loadNpmTasks('grunt-newer');//只执行变动的文件（作用是处理上方watch的毛病，让watch在监听到某个文件变动时，仅仅对变动的文件进行事务处理）
	// 在命令行输入grunt时做些什么（注意顺序）.
	//grunt.registerTask('default', ['uglify','autoprefixer','cssmin']);
	grunt.registerTask('default', ['newer:uglify','newer:autoprefixer','newer:cssmin','watch']);
};