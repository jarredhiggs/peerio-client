// ---------------------
// Peerio.storage
// ---------------------
//
// Peerio's storage object interface with various storage adapters
// in order to provide reliable long-term storage on various platforms.

Peerio.storage = {};
Peerio.storage.options = window.cordova ? {adapter: 'websql'} : null;

(function() {
	'use strict';

	Peerio.storage.db = new PouchDB('_default', Peerio.storage.options)

	/**
	* Open the PouchDB for a username and assign it to Peerio.storage.db.
	* @param {string} username
	*/
	Peerio.storage.init = function(username) {
		Peerio.storage.db = new PouchDB(username, Peerio.storage.options)
	}

})()
