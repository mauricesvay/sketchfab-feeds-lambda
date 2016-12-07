var grunt = require('grunt');
grunt.loadNpmTasks('grunt-aws-lambda');

grunt.initConfig({
    lambda_invoke: {
        default: {
            options: {
                // Task-specific options go here.
            }
        }
    },
    lambda_package: {
        default: {
            options: {
                // Task-specific options go here.
            }
        }
    },
    lambda_deploy: {
        default: {
            arn: 'arn:aws:lambda:us-east-1:975859717469:function:generateFeeds',
            options: {
                // Task-specific options go here.
            }
        }
    },
});

grunt.registerTask('invoke', ['lambda_invoke']);
grunt.registerTask('deploy', ['lambda_package', 'lambda_deploy']);
