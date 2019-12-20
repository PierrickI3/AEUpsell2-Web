function showMessage(heading, message) {
  $.toast({
    heading: heading
    , text: message
    , position: 'top-right'
    , loaderBg: '#ff6849'
    , icon: 'info'
    , hideAfter: 3500
    , stack: 6
  })
}

function showErrorMessage(heading, message) {
  $.toast({
    heading: heading
    , text: message
    , position: 'top-right'
    , loaderBg: '#ff0000'
    , icon: 'error'
    , hideAfter: 10000
    , stack: 6
  })
}