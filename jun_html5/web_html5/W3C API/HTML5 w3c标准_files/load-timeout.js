var currentAlert;
var currentAlertTimeout;
function showAlert(s, href) {
  if (!currentAlert) {
    currentAlert = document.createElement('div');
    currentAlert.id = 'alert';
    var x = document.createElement('input');
    x.type = "button";
    x.value = "Close";
    x.onclick = closeAlert2;
    currentAlert.appendChild(x);
    currentAlert.appendChild(document.createElement('p'));
    currentAlert.onmousemove = function () {
      clearTimeout(currentAlertTimeout);
      currentAlert.className = '';
      currentAlertTimeout = setTimeout(closeAlert, 10000);
    }
    document.body.appendChild(currentAlert);
  } else {
    clearTimeout(currentAlertTimeout);
    currentAlert.className = '';
  }
  currentAlert.lastChild.textContent = s + ' ';
  if (href) {
    var link = document.createElement('a');
    link.href = href;
    link.textContent = href;
    currentAlert.lastChild.appendChild(link);
  }
  currentAlertTimeout = setTimeout(closeAlert, 10000);
}
function closeAlert() {
  clearTimeout(currentAlertTimeout);
  if (currentAlert) {
    currentAlert.className = 'closed';
    currentAlertTimeout = setTimeout(closeAlert2, 3000);
  }
}
function closeAlert2() {
  clearTimeout(currentAlertTimeout);
  if (currentAlert) {
    currentAlert.parentNode.removeChild(currentAlert);
    currentAlert = null;
  }
}
window.addEventListener('keydown', function (event) {
  if (event.keyCode == 27) {
    if (currentAlert)
      closeAlert2();
  } else {
    closeAlert();
  }
}, false);
window.addEventListener('scroll', function (event) {
  closeAlert();
}, false);
if (document.body.className == "") {
  setTimeout(function () {
    showAlert("Too slow? Try reading the multipage copy of the spec instead:", "spec.html")
  }, 6000);
}
