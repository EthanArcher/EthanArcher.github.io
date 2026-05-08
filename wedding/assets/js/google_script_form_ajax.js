var $form = $('form#rsvp-form'),
    url = 'https://script.google.com/macros/s/AKfycbzNZmDvFNvtujVfm40_oqR9UbB9f9Otkc7ds-4C2SapI2m2DbnUMJCjB18JbARI4so/exec'

$('#submit-form').on('click', function(e) {
  e.preventDefault()
  var ajaxReq = $.ajax({
    url: url,
    method: "GET",
    dataType: "json",
    data: $form.serialize(),
    success:function(data) {
      document.getElementById("rsvp-form").reset();
       $('#msg').html("Thank you for your RSVP").fadeIn('slow') //also show a success message
       $('#msg').delay(5000).fadeOut('slow');
   }
 });
})
