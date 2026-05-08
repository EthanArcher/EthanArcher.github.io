var $form = $('form#taxi-form'),
    url = 'https://script.google.com/macros/s/AKfycbxyE5jt8MrhdoaMqch14hWCRvd0HpKOYcQ1VbIBqAPU2ADJIsNud7NnqVECITE1A0k/exec'

$('#submit-form').on('click', function(e) {
  e.preventDefault()
  var ajaxReq = $.ajax({
    url: url,
    method: "GET",
    dataType: "json",
    data: $form.serialize(),
    success:function(data) {
      document.getElementById("taxi-form").reset();
       $('#msg').html("Your taxi has been reserved").fadeIn('slow') //also show a success message
       $('#msg').delay(5000).fadeOut('slow');
   }
 });
})
