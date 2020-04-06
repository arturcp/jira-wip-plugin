var LocalStorage = {
  prefix: 'jira-wip-plugin__',

  read: function(key) {
    return localStorage.getItem(this._storageKey(key));
  },

  write: function(key, value) {
    localStorage.setItem(this._storageKey(key), value);
  },

  remove: function(key) {
    localStorage.removeItem(this._storageKey(key));
  },

  _storageKey: function(key) {
    return this.prefix + key;
  }
}
