/**
 * Created by samuel on 23/03/15.
 */

Meteor.publish("posts", function(postsLimit){
    check(postsLimit, Number);
    return Posts.find({}, {sort : {submitted: -1}, limit : postsLimit});
});

Meteor.publish("post", function(permalink){
    check(permalink, String);
    return Posts.find({permalink: permalink});
});