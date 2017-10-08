// ==UserScript==
// @name Skip OWA redir.aspx
// @namespace https://github.com/andersk/andersk-userscripts
// @description In Outlook Web Access, replace each indirect redir.aspx link with a direct link to the target URL using rel="noreferrer".
// @author Anders Kaseorg
// @version 1.0
// @downloadURL https://raw.githubusercontent.com/andersk/andersk-userscripts/master/skip-owa-redir.user.js
// @match *://*/owa/*
// @grant none
// ==/UserScript==

(function () {
    'use strict';

    addEventListener('animationstart', function (e) {
        if (e.animationName === 'andersk-owa-redir') {
            e.target.search.slice(1).split('&').forEach(function (q) {
                if (q.startsWith('URL=http%3a') || q.startsWith('URL=https%3a')) {
                    e.target.rel += ' noreferrer';
                    e.target.href = decodeURIComponent(q.slice(4));
                }
            });
        }
    });

    var style = document.createElement('style');
    style.type = 'text/css';
    style.textContent = 'a[href^="redir.aspx?"] {animation-name: andersk-owa-redir;} @keyframes andersk-owa-redir {}';
    document.head.appendChild(style);
})();
