module.exports = function(grunt) {
  
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        dist: {
            outputFolder: './dist', 
            outputJsMap: './dist/<%= pkg.name %>.js.map', 
            outputJsFile: './dist/<%= pkg.name %>-src.js', 
            outputJsMinFile: './dist/<%= pkg.name %>.min.js', 
            outputCssFile: './dist/<%= pkg.name %>-src.css', 
            outputCssMinFile: './dist/<%= pkg.name %>.min.css',
            outputJsPluginsFile: './dist/plugins.js'
        }, 
        concat: {
            options: {
                separator: ';',
                stripBanners: true,
                banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' + '<%= grunt.template.today("yyyy-mm-dd") %> */',
            },
            dist: {
                src: [
                    'js/_<%= pkg.name %>.js', 
                ],
                dest: 'js/<%= pkg.name %>.js'
            },
            plugins: {
                files: {
                    '<%= dist.outputJsPluginsFile %>': 'node_modules/jquery/dist/jquery.min.js', 
                },
            }
        },
        babel: {
            options: {
                sourceMap: true,
                presets: ['es2015']
            },
            dist: {
                files: {
                    '<%= dist.outputJsFile %>': 'js/_<%= pkg.name %>.js'
                }
            }
        }, 
        sass: {
            dist: {
                options: {
                    style: 'expanded'
                },
                files: {  
                    '<%= dist.outputCssFile %>': './sass/<%= pkg.name %>.scss'
                }
            }
        }, 
        autoprefixer: {
            options: {
                browsers: ['last 6 versions']
            },
            css: {
                src: '<%= dist.outputCssFile %>'
            },
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n', 
                sourceMap: true,
                sourceMapName: 'path/to/sourcemap.map'
            },
            build: {
                src: 'src/<%= pkg.name %>.js',
                dest: '<%= dist.outputJsMinFile %>'
            }
        }, 
        includeSource: {
            options: {
                basePath: '',
                baseUrl: '<%= dist.outputFolder %>',
                templates: {
                    html: {
                        js: '<script src="{filePath}"></script>',
                        css: '<link rel="stylesheet" type="text/css" href="{filePath}" />',
                    }
                }
            },
            dist: {
                files: {
                    '<%= dist.outputFolder %>/index.html': 'index.html'
                }
            }
        }, 
        watch: {
            configFiles: {
                files: [ 'Gruntfile.js' ],
                options: {
                    reload: true
                }
            }, 
            css: {
                files: 'sass/*.scss', 
                tasks: ['sass', 'autoprefixer', 'includeSource']
            }, 
            js: {
                files: 'js/*.js', 
                tasks: ['concat:dist', 'babel', 'uglify', 'includeSource']
            }, 
            html: {
                files: '*.html', 
                tasks: ['concat:dist', 'babel', 'includeSource']
            }
        }
    });

    
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-include-source');
    grunt.loadNpmTasks('grunt-babel');

    grunt.registerTask('default', ['concat', 'sass', 'autoprefixer', 'uglify', 'includeSource', 'watch']);

};