$(document).ready(function () {

    // Set current date //
    $("#currentDay").text(moment().format("LL"));

    // Set time blocks / get items from local storage//
    for (let i = 9; i < 18; i++) {
        var row = $('<div class="row">');
        var task = window.localStorage.getItem(i)
        var timeCol = $('<div class="col-sm-2"><p class="hour">' + checkAmPm(i) + '</p>');
        var taskCol = $('<textarea class="description col-sm-8" id= ' + [i] + '></textarea>').val(task);
        var saveCol = $('<button id=' + [i] + ' class="saveBtn"><i class="fas fa-save"></i></button>');
        row.append(timeCol, taskCol, saveCol);
        $(".container").append(row);
        checkAmPm(i);
        changeColorBlock(taskCol, i);
    }

    // Define am/pm time on time block
    function checkAmPm(i) {
        var hours = i
        var ampm = (hours >= 12) ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12;
        return hours + ampm;
    }

    // Change colors on time blocks depending on current time (past, present and future)
    function changeColorBlock(taskCol, i) {
        var currentHour = parseInt(moment().format('H'));

        if (i < currentHour) {
            $(taskCol).addClass("past");

        } else if (i === currentHour) {
            $(taskCol).addClass("present");
        }
        else {
            $(taskCol).addClass("future");
        }
    }

    // Save data to local storage
    $(".saveBtn").click(function () {
        var taskCol = $(this).attr('id');
        var description = $(this).prev().val();
        localStorage.setItem(taskCol, description);
    });
});
