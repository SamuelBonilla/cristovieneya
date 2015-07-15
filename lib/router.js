// Consiguramos las rutas para cada una de nuestras plantillas

Router.configure({
  /* Definimos nuestra plantilla base
  donde cada ruta de plantilla que se define es
  agregada al yield dinamico de layout */
  layoutTemplate: 'layout',
  /* plantilla de carga para mostrar mientras se
  se muestran los datos */
  loadingTemplate: "loading",
  // 404
  notFoundTemplate: "notFound",
  // esperamos hasta que los datos esten listos (cache de datos - browser)
  //waitOn: function(){ return Meteor.subscribe("posts");},
  //fastRender la pagina carga mas rapido
  fastRender: true
});

/* Definimos los nombre de nuestras rutas y las mapeamos a su url
correspondiente */
Router.route("/", {name: "index", fastRender: true});

/*
Router.route("/blog", {
    name: "blog",
    waitOn: function(){ return Meteor.subscribe("posts", 3);},
    fastRender: true });
*/

BlogController = RouteController.extend({
    template: "blog",
    fastRender: true,
    increment: 3,
    postsLimit : function(){
        return parseInt(this.params.postsLimit) || this.increment;
    },
    subscriptions: function(){
        this.postsSub =  Meteor.subscribe("posts", this.postsLimit());
    },
    posts: function(){
        return Posts.find();
    },
    data : function(){
        var hasMore = this.posts().count() === this.postsLimit();
        var nextPath =  this.route.path({postsLimit: this.postsLimit() + this.increment});
        return {
            posts: this.posts(),
            ready: this.postsSub.ready,
            nextPath: hasMore ? nextPath: null
        };
    }
});

// ya que se carga por orden de prioridad se configura antes de
// blog/:permalink para que no mande un error 404
Router.route("blogs/:postsLimit?", {
    name: "blog"
});


Router.route("/blog/:permalink", {
    name: "postPermalink",
    waitOn: function(){
        return Meteor.subscribe("post", this.params.permalink);
    },
    fastRender: true,
    data: function(){ return Posts.findOne({permalink: this.params.permalink}); }
});

Router.route("/submit", {name: "postSubmit"});
/*
// falta subscribirce para poder ver y editar los post

Router.route("/blog/:_id/edit", {
    name: "postEdit",
    data: function(){ return Posts.findOne(this.params._id); }
});
*/

// Restriciones en caso que el permalink no exista
Router.onBeforeAction("dataNotFound", {only: "postPermalink"});
