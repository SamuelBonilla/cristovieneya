/**
 * Created by samuel on 30/03/15.
 */

// Inserciones de nuevos datos mediante el formulario

/* editor
Template.postSubmit.rendered = function(){
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = "https://www.raptor-editor.com/download/file/ccdc26adb78f2824eec31f613813f8d136b75e06/raptor.min.js";
    document.getElementsByTagName('head')[0].appendChild(script);
    $('head').append("<link href='https://www.raptor-editor.com/download/file/ccdc26adb78f2824eec31f613813f8d136b75e06/raptor-front-end.min.css' rel='stylesheet' type='text/css'>");

    $('#text').raptor({
        autoEnable: true, // Enable the editor automaticly
        plugins: { // Plugin options
            dock: { // Dock specific plugin options
                docked: true, // Start the editor already docked
                dockToElement: true, // Dock the editor inplace of the element
                persist: false // Do not save the docked state
            }
        }});
};
*/

// Configuramos nuestro contenedor de errores
// Errores
Template.postSubmit.created = function(){
    Session.set("postSubmitErrors", {});
};


// ayudantes de plantilla
// Errores
Template.postSubmit.helpers({
    errorMessage: function(field){
        return Session.get("postSubmitErrors")[field];
    },
    errorClass: function(field){
        return !!Session.get("postSubmitErrors")[field] ? "has-error" : "";
    }
});

// Eventos
Template.postSubmit.events({
    "submit form": function(e){
        // evitamos que se envie el post al retroceder o avanzar
        e.preventDefault();

        // capturamos los datos
        var post = {
            title: $(e.target).find("[name=title]").val(),
            text:  $(e.target).find("[name=text]").val()
        };

        // validadores
        var errors = validatePost(post);
        if(errors.title || errors.text)
            return Session.set("postSubmitErrors", errors);


        // Llamada temota a metedos
        Meteor.call("postInsert", post, function(error, result){
            // se asegura que no hayan errores
            if(error)
                return Errors.throw(error.reason);

            if(result.PostExits)
            // exportamos el paquete
                return Errors.throw("este post ya existe");

            // insertado el post nos redirigimos a la ubicacion del post
            Router.go("postPermalink", {_id: result._id, permalink: result.permalink});
        });

    }
});
