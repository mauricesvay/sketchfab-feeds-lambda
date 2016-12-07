var axios = require('axios');
var AWS = require('aws-sdk');
var RSS = require('rss');

var staffpicksUrl = 'https://api.sketchfab.com/v3/models?sort_by=-staffpickedAt&staffpicked=true';

function getDescription( item ) {

    var images = item.thumbnails.images;
    images.sort(function(a,b){
        return b.width - a.width;
    });

    return [
        '<a href="' + item.viewerUrl + '">',
        '<img src="' + images[0].url + '" alt="' + item.name + '" width="' + images[0].width + '" height="' + images[0].height + '">',
        '</a>',
        '<br>',
        item.description
    ].join('');
}

function generateFeed( items ) {
    var feed = new RSS({
        'title': 'Sketchfab Staff Picks',
        'description': 'Sketchfab Staff Picks',
        'site_url': 'https://sketchfab.com/models/staffpicks'
    });

    items.forEach(function(item) {
        feed.item({
            'title': item.name + ' by ' + item.user.displayName,
            'description': getDescription(item),
            'url': item.viewerUrl
        });
    });

    return feed.xml();
}

function uploadToS3( feed, callback ) {
    var s3 = new AWS.S3({
        params: {
            Bucket: 'mauricesvay'
        }
    });
    s3.upload({
        Key: 'sketchfab/staffpicks.xml',
        Body: feed,
        ACL: 'public-read',
        ContentType: 'application/xml'
    }, callback);
}

exports.handler = function (event, context) {

    axios.get(staffpicksUrl)
        .then(function (response) {
            if (response.data && response.data.results.length) {
                var feed = generateFeed(response.data.results);
                uploadToS3(feed, function(err, result){
                    if (err) {
                        console.error(err);
                        context.done('Error');
                    } else {
                        console.log(result);
                        context.done(null, 'Success');
                    }
                });
            } else {
                context.done('No items');
            }
        })
        .catch(function (error) {
            console.log(error);
            context.done('Error');
        });

};
