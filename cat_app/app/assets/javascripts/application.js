// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require_tree .

function renderCat( cat ) {
  console.log(cat)
  console.log(cat.pic.response.data.images.image.source_url)
  var $container = $('#cats');
  var $cat = $('<li class="cat">');
  var $name = $('<p>')
  $name.text( cat.quote.facts );
  var $img = $('<img>').attr('src', cat.pic.response.data.images.image.url)
  // render the image
  $cat.append( $name );
  $cat.append($img);
  $container.append( $cat );
}

function getCats() {
  $.get('/cats').done(function( cat ) {
    console.log(cats)
    renderCat( cat );
    })
}



$(function() {
  getCats();
})
