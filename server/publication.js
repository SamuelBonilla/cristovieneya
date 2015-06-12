/**
 * Created by samuel on 23/03/15.
 */

Meteor.publish("posts", function(){
    return Posts.find();
});

Meteor.publish("post", function(permalink){
    check(permalink, String);
    return Posts.find({permalink: permalink});
});