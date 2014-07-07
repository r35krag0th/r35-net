function update_countdown() {
    var now = new Date();
    var then = new Date(2014, 6, 23, 0, 0, 0);

    var delta = then - now;
    delta /= 1000;

    if (delta > 0) {
        var seconds_in_day = 86400;
        var seconds_in_hour = 3600;
        var seconds_in_minute = 60;

        var remainder = delta;

        var days = parseInt(remainder / seconds_in_day);
        remainder -= days * seconds_in_day;
        var hours = parseInt(remainder / seconds_in_hour);
        remainder -= hours * seconds_in_hour;
        var minutes = parseInt(remainder / seconds_in_minute);
        remainder -= minutes * seconds_in_minute;
        var seconds = parseInt(remainder);

        var output = '<span class="digit">' + days + '</span><span class="digit_unit">d</span> <span class="digit">' + hours + '</span><span class="digit_unit">h</span> <span class="digit">' + minutes + '</span><span class="digit_unit">m</span> <span class="digit">' + seconds + '</span><span class="digit_unit">s</span>';
    } else {
        var output = '<span class="fin">The time has come!</span>';
    }

    $("div.stripe").html(output);

}

$(document).ready(function() {
    setInterval(update_countdown, 1000);
});
