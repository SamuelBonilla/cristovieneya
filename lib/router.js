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
  waitOn: function(){ return Meteor.subscribe("posts");}
  //fastRender la pagina carga mas rapido
});

/* Definimos los nombre de nuestras rutas y las mapeamos a su url
correspondiente */
Router.route("/", {name: "index"});

Router.route("/blog", { name: "blog" });

Router.route("/blog/:permalink", {
    name: "postPermalink",
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
