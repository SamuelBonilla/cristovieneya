/**
 * Created by samuel on 23/03/15.
 */

Meteor.publish("posts", function(){
    return Posts.find();
});