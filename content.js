chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.action === "paint_cards") {

      chrome.storage.sync.get(['wip-columns', 'wip-limit', 'days-to-alert-warning', 'days-to-alert-danger', 'warning-color', 'danger-color', 'success-color'], function(items) {
        var daysToAlertWarning = items[2] || 4,
            daysToAlertDanger = items[3] || 7,
            warningColor = items[4] || '#ffff95',
            dangerColor = items[5] || '#f9c6c6',
            successColor = items[6] || '#0c770c',
            wipLimit = items[1] || 8,
            columns = items[0],
            wipColumns = ['DEVELOPMENT', 'CODE REVIEW', 'READY TO TEST', 'TESTING', 'READY TO DEPLOY'];

        if (columns) {
          wipColumns = columns.split(',')
        };

        // count wip items
        var counter = 0;

        var laneIds = [];
        document.querySelectorAll('#ghx-column-headers .ghx-column').forEach(function(lane) {
          var column = lane.querySelector('h2').innerText;
          if (wipColumns.includes(column)) {
            laneIds.push(lane.getAttribute('data-id'));
            counter += parseInt(lane.querySelector('.ghx-qty').innerText);
          }
        });

        // Add wip count on screen
        var header = document.querySelector('#ghx-pool-column'),
            wipContainer = document.createElement('div');

        wipContainer.innerText = 'WIP count: ' + counter;
        wipContainer.style.width = '100%';
        wipContainer.style.textAlign = 'center';
        wipContainer.style.fontSize = '40px';

        var color = successColor;
        if (counter > wipLimit) {
          color = dangerColor;
        } else if (counter > wipLimit - 2) {
          color = warningColor;
        }

        wipContainer.style.border = '1px dashed ' + color;
        wipContainer.style.color = color;
        header.insertBefore(wipContainer, header.firstChild);

        // use colors to mark cards that are in the same lane for too long
        var lanes = document.querySelectorAll('.ghx-swimlane .ghx-column');

        lanes.forEach(function(lane) {
          var laneId = lane.getAttribute('data-column-id');

          if (laneIds.includes(laneId)) {
            var cards = lane.querySelectorAll('.ghx-newcard');
            cards.forEach(function(card) {
              var element = card.querySelector('.ghx-days');
              if (element) {
                var daysCount = parseInt(element.getAttribute('data-tooltip').split(' ')[0]);
                if (daysCount >= daysToAlertDanger) {
                  card.style.backgroundColor = dangerColor;
                } else if (daysCount >= daysToAlertWarning) {
                  card.style.backgroundColor = warningColor;
                }
              }
            });
          }
        });

        console.log('The end');
      });
    }
  });
