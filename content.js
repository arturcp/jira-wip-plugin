chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.action === "paint_cards") {

      chrome.storage.sync.get(Storage.keys, function(items) {
        var options = Storage.data(items),
            jira = new Jira(options);

        jira.showWipCounter();
        jira.paintCards();
      });
    }
  });
