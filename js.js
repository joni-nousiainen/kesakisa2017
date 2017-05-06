function showPart(part) {
  $('.part').hide()
  $('#' + part).show()
}

var startTime,
  minutes = 0,
  seconds = 0,
  extraTime = 0,
  interval

function startClock() {
  if (startTime === undefined) {
    startTime = Date.now()
    interval = setInterval(updateClock, 200)
  }
}

function updateClock() {
  var currentTime = Date.now() + (extraTime * 1000)
  minutes = zeroPad(Math.floor((currentTime - startTime) / 1000 / 60))
  seconds = zeroPad(Math.round((currentTime - startTime) / 1000) % 60)
  $('#time span').html(minutes + ":" + seconds)
}

function zeroPad(number) {
  if (number < 10) {
    return "0" + number;
  }
  else {
    return "" + number;
  }
}

function stopClock() {
  clearInterval(interval)
  $('#time').hide()
  $('#final-time').html(minutes + " min " + seconds + " s")
}

function validateField(fieldToValidate, expectedValue) {
  var value = $(fieldToValidate).val()

  if ('' === value) {
    $('.part:not(:hidden) .alert-success').addClass('hidden')
    $('.part:not(:hidden) .alert-danger').addClass('hidden')
    $('.part:not(:hidden) .forward').prop('disabled', true)
  }
  else if (expectedValue === value) {
    $('.part:not(:hidden) .alert-success').removeClass('hidden')
    $('.part:not(:hidden) .alert-danger').addClass('hidden')
    $('.part:not(:hidden) .forward').prop('disabled', false)
  }
  else {
    $('.part:not(:hidden) .alert-success').addClass('hidden')
    $('.part:not(:hidden) .alert-danger').removeClass('hidden')
    $('.part:not(:hidden) .forward').prop('disabled', true)
  }
}

function showHint() {
  $('.part:not(:hidden) .hint').toggleClass('hidden')
}

$(document).ready(function () {

  $('input').keypress(function (e) {
    if (e.keyCode == 13) {
      e.preventDefault()
    }
  })

  $('#question1').bind('change paste keyup', function () {
    validateField(this, '1917')
  })

  $('#question2').bind("change paste keyup", function () {
    /*
      Täällä yksi sauna
      Meitä on viisi saunojaa
      Heitä kolmet löylyt
      Ja neljä uskaltaa uimaan
     */
    validateField(this, '1534')
  })

  $('#question3').bind("change paste keyup", function () {
    /*
      (Aitasta kuuluu kuorsausta)
      krooh pyyh
      krooh krooh pyyh
      krooh
      krooh pyyh
     */
    validateField(this, '2312')
  })

  $('#question4').bind("change paste keyup", function () {
    /*
      Laulujoutsenella on <piip> jalkaa
      Ahvenella on <piip> jalkaa
      Karhulla on <piip> jalkaa
      Leppäkertulla on <piip> jalkaa
     */
    validateField(this, '2046')
  })

  $('.hint-trigger').click(function () {
    showHint()
    $(this).hide()
    extraTime += 30
  })

  showPart('start')

})
