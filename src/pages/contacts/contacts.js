import './contacts.scss';
import Dropdown from '../../components/other/Dropdown';
import Popup from '../../components/other/Popup';
import Tabs from '../../components/other/Tabs';

(function () {
	const $showPopupButton = document.querySelector('.js-show-popup-button');
	const $dropdown = document.querySelector('.js-dropdown');
	const $popup = document.querySelector('.js-popup');
	const $tab = document.querySelector('.js-tabs');

	const $Popup = new Popup($popup);
	new Dropdown($dropdown);
	new Tabs($tab);

	$showPopupButton?.addEventListener('click', () => {
		$Popup.showPopup();
	});
	console.log('init contacts');
})();
