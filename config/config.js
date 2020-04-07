function saveOptions() {
  keys = {}
  Storage.keys.forEach(function(id) {
    keys[id] = document.getElementById(id).value;
  });

  chrome.storage.local.set(keys, function() {
    alert('Data saved.');
  });
}

function restoreOptions() {
  chrome.storage.local.get(Storage.keys, function(result) {
    Storage.keys.forEach(function(key) {
      if (result[key]) {
        document.getElementById(key).value = result[key];
      }
    });
  });
}

document.addEventListener('DOMContentLoaded', function() {
  restoreOptions();

  document.getElementById('save').addEventListener('click', saveOptions);
});
