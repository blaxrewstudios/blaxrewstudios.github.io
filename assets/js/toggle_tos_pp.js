var iswitchStatus = false;
$("#itogBtn").on('change', function() {
    if ($(this).is(':checked')) {
        iswitchStatus = $(this).is(':checked');
        document.getElementById("isub").disabled = false;
    }
    else {
        iswitchStatus = $(this).is(':checked');
        document.getElementById("isub").disabled = true;
    }
});

var aswitchStatus = false;
$("#atogBtn").on('change', function() {
    if ($(this).is(':checked')) {
        aswitchStatus = $(this).is(':checked');
        document.getElementById("asend").disabled = false;
    }
    else {
        aswitchStatus = $(this).is(':checked');
        document.getElementById("asend").disabled = true;
    }
});