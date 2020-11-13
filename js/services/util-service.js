'use strict'

export const utilService = {
    makeId,
    loadFromStorage,
    saveToStorage
}


function makeId(length = 10) {
    var txt = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return txt;
}

function loadFromStorage(key) {
    const json = localStorage.getItem(key);
    const value = JSON.parse(json)
    return value;
}

function saveToStorage(key, value) {
    const json = JSON.stringify(value);
    localStorage.setItem(key, json)
}