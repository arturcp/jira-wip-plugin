var Storage = {
  keys: ['wip-columns', 'wip-limit', 'days-to-alert-warning', 'days-to-alert-danger', 'warning-color', 'danger-color', 'success-color'],

  data: function(items) {
    var columns = items[0],
        wipColumns = ['DEVELOPMENT', 'CODE REVIEW', 'READY TO TEST', 'TESTING', 'READY TO DEPLOY'];

    if (columns) {
      wipColumns = columns.split(',')
    };

    return {
      daysToAlertWarning: items[2] || 4,
      daysToAlertDanger: items[3] || 7,
      warningColor: items[4] || '#ffff95',
      dangerColor: items[5] || '#f9c6c6',
      successColor: items[6] || '#0c770c',
      wipLimit: items[1] || 8,
      wipColumns: wipColumns
    };
  }
}
