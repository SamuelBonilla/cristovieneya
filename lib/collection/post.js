/**
 * Created by samuel on 23/03/15.
 */

Posts = new Mongo.Collection("posts");


// Validar post
validatePost = function(post){
    var error = {};

    if(!post.title)
        error.title = "Este campo no puede estar vacio";

    if(!post.text || post.text === "<p><br></p>")
        error.text = "Tienes que introducir un texto";

    return error;
};

// los metodos nos permitencontrolar autenticacion de una manera
// mas personalizadas las acciones de los usuarios a las colecciones
Meteor.methods({
    postInsert: function(PostAttributes){
        check(Meteor.userId(), String);
        // se insertaran los datos correctos
        check(PostAttributes, {
            title: String,
            text: String
        });

        var errors = validatePost(PostAttributes);
        if(errors.title || errors.text){
            throw new Meteor.Error("invalid-post", "faltan campos");
        }

        /*if(Meteor.isServer){
         PostAttributes.title += "(is-server)";
         //Esperamos para la insercion
         Meteor._sleepForMs(5000);
         }
         else{
         PostAttributes.title += "(is-client)";
         } */

        // nos aseguramo que no se ingresen post con el mismo titulo
        var PostWithSameTitle = Posts.findOne({title: PostAttributes.title});
        if(PostWithSameTitle){
            return {
                PostExits: true,
                _id: PostWithSameTitle._id
            };
        }

        var permalink = PostAttributes.title.split(" ").join("-")
        var user = Meteor.user();
        var post = _.extend(PostAttributes, {
            userId: user._id,
            username: user.username,
            resumen: PostAttributes.text.substring(0, 130),
            submitted: new Date,
            permalink: permalink
        });

        var postId = Posts.insert(post);

        return {
            "_id": postId,
            "permalink": permalink
        };
    }
});
