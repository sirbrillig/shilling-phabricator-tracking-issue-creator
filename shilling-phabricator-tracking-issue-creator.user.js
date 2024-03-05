// ==UserScript==
// @name         Shilling Phabricator Tracking Issue Creator
// @namespace    https://github.com/sirbrillig/shilling-phabricator-tracking-issue-creator
// @version      1.0.1
// @description  Adds a Shilling Github Tracking issue for a Phabricator diff
// @author       Payton Swick <payton@foolord.com>
// @match        https://code.a8c.com/D*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=a8c.com
// @grant        none
// ==/UserScript==

(function () {
	'use strict';
	const description = document.querySelector(
		'.phui-property-list-text-content',
	);
	if (description) {
		const hasTrackedBy = /Tracked (by|here):? https:/i.test(
			document.querySelector('.phui-property-list-text-content')
				.textContent,
		);
		if (hasTrackedBy) {
			return;
		}
	}

	const header = document.querySelector('.phui-header-header');
	if (!header) {
		return;
	}
	const headerText = header.innerText;
	if (headerText.length < 2) {
		return;
	}
	const project = 'Automattic/655';
	const githubUrl = `https://github.com/Automattic/payments-shilling/issues/new?title=${encodeURIComponent(
		headerText,
	)}&body=${encodeURIComponent(document.location.href)}&projects=${project}`;

	const button = document.createElement('button');
	button.appendChild(document.createTextNode('Create tracking issue'));
	button.addEventListener('click', () => {
		window.open(githubUrl, '_blank');
	});
	document.querySelector('.phui-header-shell').appendChild(button);
})();
