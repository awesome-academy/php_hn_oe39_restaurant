$(document).on('change', '.custom-file-input', function() {
    let image = $("input[name=image]").prop('files')[0]['name'];
    $('.custom-file-label').text(image);
})

$(".alert.alert-block").fadeTo(2000, 500).slideUp(500, function() {
    $(".alert.alert-block").slideUp(500);
});