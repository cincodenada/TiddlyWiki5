/*\
title: $:/core/modules/savers/put.js
type: application/javascript
module-type: saver

Saves wiki by performing a PUT request to the server

Works with any server which accepts a PUT request
to the current URL, such as a WebDAV server.

\*/
(function(){

/*jslint node: true, browser: true */
/*global $tw: false */
"use strict";

/*
Select the appropriate saver module and set it up
*/
var PutSaver = function(wiki) {
	this.wiki = wiki;
};

PutSaver.prototype.save = function(text,method,callback) {
	var req = new XMLHttpRequest();
	req.addEventListener("load", function() {
		if (this.status === 200 || this.status === 201) {
			// success
		}
		else {
			// fail
		}
		callback(this.responseText);
	});
	req.open("PUT", encodeURI(window.location.href));
	req.setRequestHeader("Content-Type", "text/html;charset=UTF-8");
	req.send(text);
	return true;
};

/*
Information about this saver
*/
PutSaver.prototype.info = {
	name: "put",
	priority: 2000,
	capabilities: ["save", "autosave"]
};

/*
Static method that returns true if this saver is capable of working
*/
exports.canSave = function(wiki) {
	return /^https?:/.test(location.protocol);
};

/*
Create an instance of this saver
*/
exports.create = function(wiki) {
	return new PutSaver(wiki);
};

})();