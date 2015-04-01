/**
 * Created by samuel on 29/03/15.
 */

// configuramos el admin para que establesca los campor van por defecto

Houston.methods("Posts", {
    "postInsert": function (post) {
        var user = Meteor.user();
        Posts.update(post._id, {$set: {username: user.username, userId: user._id}});
        return post.title + " published successfully.";
    }
});