var Jira = function(options) {
  this.options = options;
  this.wipCount = this._countWipItems();
  this.laneIds = this._laneIds();
};

var fn = Jira.prototype;

fn.showWipCounter = function() {
  if (!document.querySelector('#wipCounter')) {
    var header = document.querySelector('#ghx-pool-column'),
        wipContainer = document.createElement('div');

    wipContainer.setAttribute('id', 'wipCounter');
    wipContainer.innerText = 'Work in progress: ' + this.wipCount;
    wipContainer.style.width = '100%';
    wipContainer.style.textAlign = 'center';
    wipContainer.style.fontSize = '40px';

    var color = this.options.successColor;
    if (this.wipCount > this.options.wipLimit) {
      color = this.options.dangerColor;
    }

    wipContainer.style.border = '1px dashed ' + color;
    wipContainer.style.color = color;
    header.insertBefore(wipContainer, header.firstChild);
  }
};

fn.paintCards = function() {
  var lanes = document.querySelectorAll('.ghx-swimlane .ghx-column'),
      self = this;

  lanes.forEach(function(lane) {
    var laneId = lane.getAttribute('data-column-id');

    if (self._validLane(laneId)) {
      var cards = lane.querySelectorAll('.ghx-newcard');

      cards.forEach(function(card) {
        var element = card.querySelector('.ghx-days');
        if (element) {
          var daysCount = parseInt(element.getAttribute('data-tooltip').split(' ')[0]);
          if (daysCount >= self.options.daysToAlertDanger) {
            card.style.backgroundColor = self.options.dangerColor;
          } else if (daysCount >= self.options.daysToAlertWarning) {
            card.style.backgroundColor = self.options.warningColor;
          }
        }
      });
    }
  });
};

fn._countWipItems = function() {
  var counter = 0,
      self = this;

  document.querySelectorAll('#ghx-column-headers .ghx-column').forEach(function(lane) {
    var column = lane.querySelector('h2').innerText;
    if (self._validColumn(column)) {
      counter += parseInt(lane.querySelector('.ghx-qty').innerText);
    }
  });

  return counter;
};

fn._laneIds = function() {
  var laneIds = [],
      self = this;

  document.querySelectorAll('#ghx-column-headers .ghx-column').forEach(function(lane) {
    var column = lane.querySelector('h2').innerText;
    if (self._validColumn(column)) {
      laneIds.push(lane.getAttribute('data-id'));
    }
  });

  return laneIds;
};

fn._validColumn = function(column) {
  return this.options.wipColumns.includes(column);
};

fn._validLane = function(laneId) {
  return this.laneIds.includes(laneId);
};
