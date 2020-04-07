var Storage = {
  keys: [
    'wipColumns',
    'wipLimit',
    'daysToAlertWarning',
    'daysToAlertDanger',
    'warningColor',
    'dangerColor',
    'successColor'
  ],

  buildOptions: function(result) {
    var columns = result.wipColumns || 'DEVELOPMENT, CODE REVIEW, READY TO TEST, TESTING, READY TO DEPLOY';

    var regex = /\s*,\s*/;

    return {
      daysToAlertWarning: result.daysToAlertWarning || 4,
      daysToAlertDanger: result.daysToAlertDanger || 7,
      warningColor: result.warningColor || '#ffff95',
      dangerColor: result.dangerColor || '#f9c6c6',
      successColor: result.successColor || '#0c770c',
      wipLimit: result.wipLimit || 8,
      wipColumns: columns.split(regex)
    };
  }
}
