'use strict';

function getPrintedTime(timestamp) {
  var date = new Date(timestamp);
  return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()} ${date.getDay()}/${date.getMonth()}/${date.getFullYear()}`;
}

function getWord() {
  var length = rand(4, 8);
  var word = '';
  while (length) {
    word += String.fromCharCode(rand(97, 123));
    length--;
  }
  return word;
}

function getId(length = 8) {
  var id = '';
  while (length) {
    id += String.fromCharCode(rand(44, 123));
    length--;
  }
  return id;
}

function rand(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}
