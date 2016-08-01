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


//hit up those API's!
function getCat() {
  $.get('/cats').done(function( cat ) {
    renderImage( cat );
    renderFact( cat );
    })
}

function getNewImage() {
  $.get('/cats').done(function( cat ) {
    $('.loading2').hide();
    renderImage( cat );
  })
}

function getNewFact() {

  $.get('/cats').done(function( cat ) {
    $('.loading').hide()
    renderFact( cat );

  })
}

//get the facts from the db
function getFacts(){
  $.get('/facts')
  .done((response) =>{
    response.map((fact)=>{
       appendFacts(fact)
    })
  })
 }

 //get all the images from the db
  function getImages(){
  $.get('/images')
  .done((response) =>{
    response.map((image)=>{
       appendImages(image)
    })
  })
 }

//render the cat image and the text from the api call(s)
function renderImage( cat ) {

  let src = cat.pic.response.data.images.image.url;
  let copyright = cat.pic.response.data.images.image.source_url;
  let $link = $('<a target="_blank">').attr('href', copyright).text("Source")
  let $imgContainer = $('#community-image');
  let $img = $('<img>').attr('src', src);
  let $buttonDiv = $('<div class="hold-buttons">');
  let $imageAddBut = $('<button class="add-image add-btn">').text("Pure Awesome")
  let $imageNewBut = $('<button class="new-image new-btn">').text("Next")


  // render the image
  $buttonDiv.append($imageAddBut, $imageNewBut)
  $imgContainer.append( $img, $link, $buttonDiv);

  //add image to db
  $imageAddBut.on('click', function(e){
    e.preventDefault;
    $('.loading2').show();
    addImage(src, copyright);
    $imgContainer.empty();
    getNewImage();
  })

  //hit up the api for new image
  $imageNewBut.on('click', function(e){
    $('.loading2').show();
    e.preventDefault();
    $imgContainer.empty();
    getNewImage();

  })

}

function renderFact( cat ) {

  let $factContainer = $('#community-fact');
  let $factText = cat.fact.facts.toString();
  let $fact = $('<p>').text($factText);
  let $buttonDiv = $('<div class="hold-buttons">');
  let $factAddBut = $('<button class="add-fact add-btn">').text("Whaaa?!");
  let $factNewBut = $('<button class="new-fact new-btn">').text("Meh...")


  //render the fact
  $buttonDiv.append($factAddBut, $factNewBut);
  $factContainer.append( $fact, $buttonDiv );

  //add fact to db
  $factAddBut.on('click', function(e){
    e.preventDefault()
    $('.loading').show()
    addFact($factText);
    $factContainer.empty()
    getNewFact();

  })

  //hit up the api for new fact
  $factNewBut.on('click', function(e){
    e.preventDefault();
    $('.loading').show()
    $factContainer.empty();
    getNewFact();
  })

}


//append all the facts to the page from facts db
function appendFacts(fact){

   let $user = $('<p>').text(fact.user);
   let $fact = $('<p>').text(fact.info).attr('class', fact.id);
   let $deleteButton = $('<button>').addClass("delete fact-delete").text('Delete');
   let $editButton = $('<button>').addClass('update').text('Fix this fact');
   let $div = $('<div>').attr('class', fact.id);

   let $editDiv = $('<div class="hide">');
   let $editForm = $('<form>').attr('class', fact.id);
   let $formText = $('<textarea class="edit">').text(fact.info);
   //let $formUser = $('<input>').attr('placeholder', 'enter your name');
   let $formBut  = $('<button>').text('Fix It!');



   $editForm.append($formText, $formBut);
   $editDiv.append($editForm);

   $('#facts').prepend($div.append($fact, $deleteButton, $editButton, $editDiv))

   $deleteButton.click(deleteFact);
   $editButton.on('click', function(e){
    e.preventDefault();
    $editDiv.slideToggle('slow');
   })

   $formBut.on('click', (e)=>{
    e.preventDefault();
    let $newData = $formText.val();
    editFact(e, $newData, fact.id);
    $editDiv.slideToggle('slow');
   });
}


//append all the images to the page from the images db
function appendImages(image){

   let $source = $('<a target="_blank" class="source">').attr('href', image.user).text("source");
   let $overlay = $('<div class="overlay">');
   let $deleteButton = $('<button>').addClass("delete image-delete");
   let $div = $('<div>').addClass(image.id + " image")
              .css({'background-image':'url(' + image.url + ')',
                    'background-size': 'cover'});

   $('#images').prepend($div.append($source, $deleteButton));

   $($overlay).hover(opacityIn, opacityOut);

   $deleteButton.click(deleteImage);

}

//add image to the images db
function addImage(src, source){
   event.preventDefault()

   let data = {
     user: source,
     url: src
   }

   $.post('/images', data).done((response) => {
     appendImages(response);
   })

 }

 //add fact to the facts db
function addFact(fact){
   event.preventDefault()
   let data = {
     user: 'Anon',
     info: fact
   }

   $.post('/facts', data).done((response) => {
     appendFacts(response);
   })

 }

 //edit the fact in the db
function editFact(e, fact, id ){
  e.preventDefault();
  id = parseInt(id);
  let url = '/facts/'+id;

  let data = {info: fact};
  let $pP = $(e.target).parent().parent().parent().find('p')
  console.log($pP)
  $.ajax({
     url: url,
     method: 'put',
     data: data
   }).done(function(arguements){
    console.log(arguements)
    //$form.empty();
   $pP.text(arguements.info)

   })

}

function opacityIn(e){
  $(this).css('opacity', '.5');
}

function opacityOut(e){
  $(this).css('opacity', '0');
}

//delete info from the facts db
function deleteFact(e){
   let id = $(e.target).parent().attr('class')
   id = parseInt(id);

   let url = '/facts/'+id
   $.ajax({
     url: url,
     method: 'delete'
   }).done(function(){
     $(e.target).parent().remove();
   })
 }

 //delete image from the image db
 function deleteImage(e){
   let id = $(e.target).parent().attr('class')
   id = parseInt(id);

   let url = '/images/'+id
   $.ajax({
     url: url,
     method: 'delete'
   }).done(function(){
     $(e.target).parent().remove();
   })
 }

$(document).ready(function() {
  getCat();
  getFacts();
  getImages();

  $(window).load(function() {
  $(".loader").fadeOut("slow");
})

$('.loading').hide();
$('.loading2').hide();

// $(document)
//   .ajaxStart(function () {
//       $('.loading').show();
//    })
//   .ajaxStop(function () {
//       $('.loading').hide();
//   });



///END
});

