chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.action === "paint_cards") {
      chrome.storage.local.get(Storage.keys, function(result) {
        var options = Storage.buildOptions(result),
            jira = new Jira(options);

        // console.log(options);

        jira.showWipCounter();
        jira.paintCards();
      });
    }
  });
