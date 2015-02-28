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
