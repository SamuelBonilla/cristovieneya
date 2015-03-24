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
});

/* Definimos los nombre de nuestras rutas y las mapeamos a su url
correspondiente */
Router.route("/", {name: "index"});

Router.route("/blog", {
    name: "blog",
    waitOn: function() {
        return Meteor.subscribe('posts');
    }
});


Router.route("/blog/:permalink", {
    name: "postPermalink",
    waitOn: function() {
        return Meteor.subscribe('posts');
    },
    data: function(){ return Posts.findOne({permalink: this.params.permalink});; }
});

// Restriciones en caso que el permalink no exista
Router.onBeforeAction("dataNotFound", {only: "postPermalink"});
