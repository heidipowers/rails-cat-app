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


//get the cat image for header
function getCats() {
  $.get('/cats').done(function( cat ) {
    console.log(cat)
    renderCat( cat );
    })
}

//get all the facts from the db
function getFacts(){
  $.get('/facts')
  .done((response) =>{
    response.map((fact)=>{
      console.log(fact)
       appendFacts(fact)
    })
  })
 }

 //get all the images from the db
  function getImages(){
  $.get('/images')
  .done((response) =>{
    response.map((image)=>{
      console.log(image)
       appendImages(image)
    })
  })
 }

//render all the cat from the api call
function renderCat( cat ) {
  console.log(cat)
  console.log(cat.pic.response.data.images.image.source_url)
  var $container = $('#community');
  var $cat = $('<li class="cat">');
  var $name = $('<p>')
  $name.text( cat.fact.facts );
  var $img = $('<img>').attr('src', cat.pic.response.data.images.image.url)
  // render the image
  $cat.append( $name );
  $cat.append($img);
  $container.append( $cat );
}


//append all the facts to the page from facts db
function appendFacts(fact){

   let $author = $('<p>').text(fact.user)
   let $content = $('<p>').text(fact.info)
   let $deleteButton = $('<button>').addClass("delete").text('Delete')
   let $editButton = $('<button>').addClass('update').text('Update')
   let $div = $('<div>').attr('class', fact.id)

   $('#facts').prepend($div.append($author, $content, $deleteButton, $editButton))

   $deleteButton.click(deleteFact)
   //$editButton.click(editPost)
}

//append all the images to the page from the images db
function appendImages(image){

   let $author = $('<p>').text(image.user)
   let $content = $('<img>').attr("src", image.url)
   let $deleteButton = $('<button>').addClass("delete").text('Delete')
   let $div = $('<div>').attr('class', image.id)

   $('#images').prepend($div.append($author, $content, $deleteButton))

   $deleteButton.click(deleteImage)

}

//delete info from the facts db
function deleteFact(e){
   let id = $(e.target).parent().attr('class')
   id = parseInt(id);

   let url = '/facts/'+id
   console.log(url, id)
   $.ajax({
     url: url,
     method: 'delete'
   }).done(function(){
     console.log(arguments);
     $(e.target).parent().remove();
   })
 }

 //delete image from the image db
 function deleteImage(e){
   let id = $(e.target).parent().attr('class')
   id = parseInt(id);

   let url = '/images/'+id
   console.log(url, id)
   $.ajax({
     url: url,
     method: 'delete'
   }).done(function(){
     console.log(arguments);
     $(e.target).parent().remove();
   })
 }





$(function() {
  getCats();
  getFacts();
  getImages();
})
