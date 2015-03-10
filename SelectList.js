'use strict';

var React = require('react');

var e = React.createElement;

module.exports = React.createClass({
	getInitialState: function(){
		return { items: [] };
	},

	componentWillMount: function(){
		this.onData = function( data ){
			this.setState({ items: data });
		}.bind(this);

		this.props.bucket.onData(this.onData);
	},

	componentWillUnmount: function(){
		this.props.bucket.offData(this.onData);
	},

	render: function(){
		if (this.props.singular && this.state.items.length < 2)
			return false;

		return e('select', { className: 'select-list', ref: 'select', onChange: this.handleChange },
			this.state.items.map(function( item, index ){
				return e('option', { key: index, value: index }, item.name);
			}, this)
		);
	},

	handleChange: function( e ){
		e.preventDefault();

		var index = this.refs.select.getDOMNode().value;

		this.props.dispatcher.emit('change', index);
	}
});
