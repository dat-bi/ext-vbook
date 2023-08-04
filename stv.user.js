
// ==UserScript==
// @name         STV Translate
// @version      1
// @description  Dịch tiếng Trung với API STV
// @author       Mol
// @match        *://*/*
// @icon         https://i.imgur.com/89Gaurs.png
// @require      https://moldich.gq/assets/js/stv-translate.js
// @grant        GM_getResourceText
// @grant        GM_addStyle
// ==/UserScript==

(function () {
    'use strict';
    GM_addStyle(`
     .cv-btn {
     position: fixed;
     display: flex;
     z-index: 99999;
    left: .5rem;
    bottom: .5rem;
    border: none;
    width: 30px;
    height: 30px;
    background: rgba(11, 91, 137, 0.5);
    cursor: pointer;
    color: white;
    border-radius: 2px;
    padding: .25rem; }
   .cv-btn:hover {
    background: #0d75b5; }
`);
    var button = document.createElement("button");
    button.innerHTML = '<img src="https://i.imgur.com/epynPm6.png" width="100%">';
    button.className = "cv-btn";
    var body = document.getElementsByTagName("body")[0];
    body.appendChild(button);



    button.addEventListener("click", function () {
        startScript();
    });
})();
