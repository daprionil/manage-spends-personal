import {boxCategoryHtml,boxSpendHtml,yearFooter} from '../selectors.js';
import {spendHtml,categoryHtml} from '../functions.js';

export default class UI {
    viewHtmlSpends(arr){
        this.cleanSpendsHtml();
        if(arr.length > 0){
            arr.forEach(spend => {
                boxSpendHtml.appendChild(spendHtml(spend));
            });
        }else{
            const msg = document.createElement('div');
            msg.textContent = "No Hay Gastos por mostrar";
            msg.style.textAlign = "center";
            msg.style.padding = "7px";
            msg.style.background = "white"

            boxSpendHtml.appendChild(msg);
        };
    };
    viewCategories(obj){
        this.cleanCategoryHtml();
        for(let category in obj){
            let value = obj[category].length > 0 ? obj[category].reduce( (value,spend) => value += spend.priceSpend,0) : 0;
            boxCategoryHtml.appendChild(categoryHtml(value,category));
        };
    };
    cleanCategoryHtml(){
        while(boxCategoryHtml.firstChild){
            boxCategoryHtml.removeChild(boxCategoryHtml.firstChild);
        };
    }
    cleanSpendsHtml(){
        while(boxSpendHtml.firstChild){
            boxSpendHtml.removeChild(boxSpendHtml.firstChild);
        };
    };
    message(text,type){
        this.deleteMessage();
        const body = document.querySelector('body');

        const msg = document.createElement('div');
        msg.classList.add('message',type === 'correcto' ? 'correcto' : 'incorrecto');
        msg.textContent = text;

        body.insertBefore(msg,body.firstChild);
        setTimeout(()=>{
            this.deleteMessage();
        },3000)
    };
    setYearFooter(){
        yearFooter.textContent = new Date().getFullYear();
    };
    deleteMessage(){
        const body = document.querySelector('body');
        while(document.querySelector('.message')){
            body.removeChild(body.firstChild);
        };
    };
};