import {formSpend,nameSpend,priceSpend,typeSpend} from '../selectors.js';
import {addSpend, fillSpend,spend,ui} from '../functions.js';

export default class App{
    constructor(){
        this.initApp();
    };
    initApp(){
        nameSpend.addEventListener('input',fillSpend);
        priceSpend.addEventListener('input',fillSpend);
        typeSpend.addEventListener('input',fillSpend);

        formSpend.addEventListener('submit',addSpend);
        spend.allSpends = JSON.parse(localStorage.getItem('SPENDS-MANAGE')) || [];
        ui.viewHtmlSpends(spend.allSpends);
        ui.viewCategories(spend.viewCategoriesSpends());
        ui.setYearFooter();
    };
};