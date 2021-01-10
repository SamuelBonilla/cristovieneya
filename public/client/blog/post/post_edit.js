/**
 * Created by samuel on 31/03/15.
 */

// editor
Template.postEdit.rendered = function(){
    $('#text').raptor();
};

// Errores
Template.postEdit.created = function(){
    Session.set("postEditErrors", {});
};

Template.postEdit.helpers({
    classMessage: function(field){
        return !!Session.get("postEditErrors")[field] ? "has-error": "";
    },

    errorMessage: function(field){
        return Session.get("postEditErrors")[field];
    }
});

// eventos
Template.postEdit.events({
    "submit form": function(e){
        e.preventDefault();

        // _id del contexto de datos de la plantilla
        var currentPostId = this._id;

        var postProperties = {
            title: $(e.target).find("[name=title]").val(),
            text: $(e.target).find("[name=text]").val()
        };

        var errors = validatePost(postProperties);
        if(errors.title || errors.text)
            Session.set("postEditErrors", errors);

        Posts.update(currentPostId, {$set: postProperties}, function(error){
            if(error){
                throwError(error.reason);
            }
            else {
                // redirecionamos al post edit
                Router.go("postPermalink", {_id: currentPostId, permalink: this.permalink});
            }
        });
    },

    "click .delete": function(e){
        e.preventDefault();

        if(confirm("are you sure ?")){
            var currentPostId = this._id;
            Posts.remove(currentPostId);
            Router.go("postsList");
        }
    }
});
