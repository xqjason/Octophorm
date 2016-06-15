'use strict';

var React = require('react');
var $ = React.DOM;


var CheckBox = React.createClass({
  displayName: 'CheckBox',

  handleChange: function(event) {
    var val = event.target.checked ? true : null;
    this.props.update(this.props.path, val, val);
  },
  render: function() {
    return $.input({
      name: this.props.label,
      type: "checkbox",
      checked: this.props.value || false,
      onChange: this.handleChange,
      disabled: this.props.disabled });
  }
});

module.exports = CheckBox;

