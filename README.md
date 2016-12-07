# sketchfab-feeds-lambda

Generate RSS Feeds for Sketchfab with AWS Lambda

* [Staffpicks](https://mauricesvay.s3.amazonaws.com/sketchfab/staffpicks.xml)

## For developers

* `npm install` to install dependencies
* `grunt invoke` to run locally
* `grunt deploy` to package and deploy.

To deploy, you need to have aws CLI installed and configured.
The logged in user must have the rights to deploy to the lambda defined in `Gruntfile.js`.
The lambda needs a role that can write into the bucket defined in `index.js`.
