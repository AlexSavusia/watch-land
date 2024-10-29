import './main.scss';
import Tabs from '../../components/other/Tabs';
import TabsInner from '../../components/other/TabsInner';
import TabsInner2 from '../../components/other/TabsInner2';
import Dropdown from '../../components/other/Dropdown';
import { fadeIn, fadeOut } from '../../utils/utils';

(function () {
    const $dropdowm = document.querySelectorAll('.js-dropdown');
    const $dropdowmItems = document.querySelectorAll('.js-dropdown-item');
    const $tab = document.querySelectorAll('.js-tabs');
    const $tabsInner = document.querySelectorAll('.js-tabs-inner');
    const $tabsInner2 = document.querySelectorAll('.js-tabs-inner2');
    const $cardsButtons = document.querySelectorAll('.js-program-button');
    const $questionLinks = document.querySelectorAll('.js-question-link');
    // const $cardsContainer = document.querySelectorAll('.js-cards');
    const $contentButtons = document.querySelectorAll('.js-content-button');
    // const $bannerButton = document.querySelector('.js-open-tab');
    const $homeButton = document.querySelector('.js-home-button');
    const $programsButton = document.querySelector('.js-programs-button');
    const $programsSection = document.querySelector('.js-programs');
    const $workSection = document.querySelector('.js-work');

    //const $Dropdown = new Dropdown($dropdowm);
	//const $Tabs = new Tabs();
	$dropdowm.forEach(el => {
		const $Dropdown = new Dropdown(el);
	})

    $tab.forEach(el => {
		let $Tabs = new Tabs(el);
		$Tabs.openTabItem(0);

		// $bannerButton.addEventListener('click', () => {
		// 	$Tabs.openTabItem(1, 1);
		// });
	})


    // window.addEventListener('resize', () => {
    //     console.log(window.innerWidth, 'window width');
    // });

    //Открытие контента карточек
    $cardsButtons.forEach((button) => {
        const buttonAttr = button.getAttribute(['data-button-index']);
        button.addEventListener('click', () => {
            const $content = document.querySelector(`[data-content-index='${buttonAttr}']`);
            const $container = button.closest('.js-cards');
            fadeOut($container, 100);
            fadeIn($content, 500);
        });
    });

    //Закрытие контента карточек
    $contentButtons.forEach((button) => {
        const buttonAttr = button.getAttribute(['data-button-index']);
        button.addEventListener('click', () => {
            const $content = document.querySelector(`[data-content-index='${buttonAttr}']`);
            fadeOut($content, 100);
            const $contentContainer = $content.closest('.cards__content-container');
            const $singleCardsContainer = $contentContainer.previousElementSibling;
            fadeIn($singleCardsContainer, 500);
        });
    });

    //Переход на страницу вопросов
    $questionLinks.forEach((link) => {
        const index = link.getAttribute(['data-link-index']);
        link.addEventListener('click', () => {
            const $tabButton = document.querySelector(`[data-tab-index="2"]`);
            $tabButton.click();
            $Dropdown.openByIndex(index);
            const $activeQuestion = getActiveQuestion(index);
            setTimeout(() => {
                $activeQuestion.scrollIntoView({ behavior: 'smooth', block: 'center' });
            });
        });
    });

    //Скролл к страховым программам
    $programsButton.addEventListener('click', () => {
        const $tabButton = document.querySelector(`[data-tab-index="0"]`);
        $tabButton.click();
        $programsSection.scrollIntoView();
    });

    $homeButton.addEventListener('click', () => {
        $workSection.scrollIntoView({ behavior: 'smooth' });
    });





    $tabsInner.forEach((tab) => {
        new TabsInner(tab);
    });

    $tabsInner2.forEach((tab) => {
        new TabsInner2(tab);
    });

    function getActiveQuestion(index) {
        const $activeQuestion = document.querySelector(`[data-question-index="${index}"]`);
        return $activeQuestion;
    }
})();
