var ids = [
  'wip-columns',
  'wip-limit',
  'days-to-alert-warning',
  'days-to-alert-danger',
  'warning-color',
  'danger-color',
  'success-color'
];

function saveOptions() {
  ids.forEach(function(id) {
    LocalStorage.write(id, document.getElementById(id).value);
  });

  alert('Data saved.');
}

function restoreOptions() {
  ids.forEach(function(id) {
    var value = LocalStorage.read(id);
    if (value) {
      document.getElementById(id).value = value;
    }
  });
}

document.addEventListener('DOMContentLoaded', function() {
  restoreOptions();

  document.getElementById('save').addEventListener('click', saveOptions);
});
