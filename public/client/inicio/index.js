// Se activa el scroll automaticamente

Template.index.rendered = function(){
  /* ======= ScrollTo ======= */
  $('a.scrollto').on('click', function(e){

    //store hash
    var target = this.hash;

    e.preventDefault();

    $('body').scrollTo(target, 800, {offset: -70, 'axis':'y', easing:'easeOutQuad'});
    //Collapse mobile menu after clicking
    if ($('.navbar-collapse').hasClass('in')){
      $('.navbar-collapse').removeClass('in').addClass('collapse');
    }

  });

  // activamos los complementos extras
    $('[data-toggle="popover"]').popover();
};
