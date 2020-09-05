//NUMBER 1
$(function(){
    console.log(( "Let's get ready to party with jQuery!"))
})

//NUMBER 2
$('article').find('img').addClass('image-center')

//NUMBER 3
$('article').find('p').eq(-1).remove()

//NUMBER 4
$('#title').css('font-size',`${Math.floor(Math.random()*100)}px`)

//NUMBER 5
$('ol').append($("<li>").text('i just added this!'));

//NUMBER 6
$('aside').empty().append($('<p>').text('Apologies!'))

//NUMBER 7
let inputs = $('.form-control')
$(inputs).on('click', function(){
    $('body').css('background-color', `rgb(${inputs.eq(0).val()}, ${inputs.eq(2).val()}, ${inputs.eq(1).val()})`)
})

//NUMBER 8
$('img').on('click', function(e) {
    $(e.target).remove()
}) 