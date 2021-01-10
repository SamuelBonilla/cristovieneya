/**
 * Created by samuel on 23/03/15.
 */

Template.blog.helpers({
    //posts: function(){
        /* el cliente ve los datos enviados por publish como un
         como un todo asi esten filtrados son un todo para
         el cliente, en este caso se adseden a todos los post que
         la subscipcion a enviado */
      //  return Posts.find({}, {sort: {submitted: -1}});
    //},

    ownPost: function(){
        return this.userId === Meteor.userId();
    }
});
