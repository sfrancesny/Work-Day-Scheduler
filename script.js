$(document).ready(function () {
  // display current day on page
  $('#currentDay').text(dayjs().format('dddd, MMMM D, YYYY'));

  // Create timeblocks for standard business hours
  var hours = [9, 10, 11, 12, 13, 14, 15, 16, 17];

  for (var i = 0; i < hours.length; i++) {
    var timeblock = $('<div>').addClass('time-block row');
    var hourCol = $('<div>').addClass('col-md-1 hour').text(getDisplayHour(hours[i]));
    var descCol = $('<textarea>').addClass('col-md-10 description ' + getTimeblockColor(hours[i])).attr('id', 'hour-' + hours[i]);
    var saveCol = $('<button>').addClass('col-md-1 saveBtn').html('<i class="fas fa-save"></i>');

    timeblock.append(hourCol, descCol, saveCol);
    $('.container').append(timeblock);
  }

  // Get display hour format for a given hour
  function getDisplayHour(hour) {
    var displayHour = hour;
    var amPm = 'AM';
    if (hour === 12) {
      amPm = 'PM';
    } else if (hour > 12) {
      displayHour = hour - 12;
      amPm = 'PM';
    }
    return displayHour + amPm;
  }

  // Get timeblock color based on current hour
  function getTimeblockColor(hour) {
    var currentHour = dayjs().hour();
    if (hour < currentHour) {
      return 'past';
    } else if (hour === currentHour) {
      return 'present';
    } else {
      return 'future';
    }
  }

  // listen for save button clicks
  $('.saveBtn').on('click', function () {
    // get nearby values
    var value = $(this).siblings('.description').val();
    var time = $(this).parent().attr('id');

    // save in localStorage
    localStorage.setItem(time, value);

    // Show notification that item was saved to localStorage by adding class 'show'
    $('.notification').addClass('show');

    // Timeout to remove 'show' class after 5 seconds
    setTimeout(function () {
      $('.notification').removeClass('show');
    }, 5000);
  });

    // Load saved data from local storage
    function loadSavedData() {
    for (var i = 0; i < hours.length; i++) {
      var hour = hours[i];
      var savedValue = localStorage.getItem('hour-' + hour);
      $('#hour-' + hour).val(savedValue);
    }
  }

    function hourUpdater() {
    // get current number of hours
    var currentHour = dayjs().hour();
  
    // loop over time blocks
    $('.time-block').each(function () {
      var blockHour = parseInt($(this).attr('id').split('-')[1]);
  
      // check if we've moved past this time
      if (blockHour < currentHour) {
        $(this).addClass('past');
      } else if (blockHour === currentHour) {
        $(this).removeClass('past');
        $(this).addClass('present');
      } else {
        $(this).removeClass('past');
        $(this).removeClass('present');
        $(this).addClass('future');
      }
    });
  }  

  hourUpdater();

  // set up interval to check if current time needs to be updated
  setInterval(hourUpdater, 15000);

  // load any saved data from localStorage
  $('#hour-9 .description').val(localStorage.getItem('hour-9'));
  $('#hour-10 .description').val(localStorage.getItem('hour-10'));
  $('#hour-11 .description').val(localStorage.getItem('hour-11'));
  $('#hour-12 .description').val(localStorage.getItem('hour-12'));
  $('#hour-13 .description').val(localStorage.getItem('hour-13'));
  $('#hour-14 .description').val(localStorage.getItem('hour-14'));
  $('#hour-15 .description').val(localStorage.getItem('hour-15'));
  $('#hour-16 .description').val(localStorage.getItem('hour-16'));
  $('#hour-17 .description').val(localStorage.getItem('hour-17'));

   // display current day on page
   $('#currentDay').text(dayjs().format('dddd, MMMM D, YYYY'));
  });
