import UI from './clases/UI.js';
import Spend from './clases/Spend.js';
import {
    formSpend,nameSpend as nameSpendInput,
    priceSpend as priceSpendInput,typeSpend as typeSpendInput
} from './selectors.js';

export const ui = new UI();
export const spend = new Spend();

let mode = false;

let objGSpend = {
    nameSpend:'',
    typeSpend:'',
    priceSpend:'',
    data:'',
};

function addSpend(e){
    e.preventDefault();

    const {nameSpend,typeSpend,priceSpend} = objGSpend;
    if(!(nameSpend === '' || typeSpend === '' || priceSpend < 0)){
        if(!mode){
            objGSpend.id = Date.now();
            objGSpend.data = date();

            spend.addSpend({...objGSpend});
            ui.message('Agregado Correctamente','correcto');
        }else{
            objGSpend.data = date();
            spend.editSpend({...objGSpend});
            formSpend.querySelector('button[type="submit"]').textContent = "Agregar";
            ui.message('Se ha editado Correctamente','correcto');
        };
        setStorageSpends(spend.allSpends);
        ui.viewHtmlSpends(spend.allSpends);
        ui.viewCategories(spend.viewCategoriesSpends());
        formSpend.reset();
        resetObjSpend();
        return;
    };
    ui.message('Debes Rellenar Todos los Campos','incorrecto');
};
function fillSpend(e){
    switch(e.target.name){
        case "priceSpend":
            objGSpend[e.target.name] = Number(e.target.value);
            break;
        default:
            objGSpend[e.target.name] = e.target.value;
            break;
    };
};
function resetObjSpend(){
    for(let key in objGSpend){
        objGSpend[key] = '';
    };
};
function setStorageSpends(arr){
    localStorage.setItem("SPENDS-MANAGE",JSON.stringify(arr));
    spend.allSpends = JSON.parse(localStorage.getItem("SPENDS-MANAGE"));
};
function categoryHtml(value,tipo){
    const category = document.createElement('div');
    category.classList.add('ctn-category');

    const descripCategory = document.createElement('div');
    descripCategory.classList.add('left-category');
    descripCategory.innerHTML = `
    <p class="img">${emoji(tipo)}</p>
    <p class="nameCategory">${tipo}</p>`;

    const pGastado = document.createElement('p')
    pGastado.classList.add('totalSpend');
    pGastado.innerHTML = `<span>$${value}</span>`

    category.appendChild(descripCategory);
    category.appendChild(pGastado);

    return category;
};
function spendHtml(obj){
    const {nameSpend,typeSpend,priceSpend,id,data} = obj;
    const spend = document.createElement('div');
    spend.classList.add('item-spend');

    const descripSpend = document.createElement('div');
    descripSpend.classList.add('text-descrip');
    descripSpend.innerHTML = `
    <p class="img">${emoji(typeSpend)}</p>
    <p>${nameSpend}</p>
    <p>${typeSpend}</p>
    <p class="spendDate">${data}</p>`

    const pGastado = document.createElement('p');
    pGastado.innerHTML = `Gasto:<span>$${priceSpend}</span>`;

    const btnDelete = document.createElement('button');
    btnDelete.classList.add('btn','red','btnEliminar');
    btnDelete.textContent = '❌';
    btnDelete.onclick = () => {
        deleteSpend(id);
    };

    const btnEdit = document.createElement('button');
    btnEdit.classList.add('btn','submit','btnEditar');
    btnEdit.textContent = '✏️';
    btnEdit.onclick = () => {
        editSpend(obj);
    };
    spend.appendChild(descripSpend);
    spend.appendChild(pGastado);
    spend.appendChild(btnDelete);
    spend.appendChild(btnEdit);
    
    return spend;
};
function deleteSpend(id){
    let validate = confirm('¿Esta seguro de Eliminar el Gasto?');
    if(validate){
        spend.deleteSpend(id);
        setStorageSpends(spend.allSpends);
        ui.viewHtmlSpends(spend.allSpends);
        ui.viewCategories(spend.viewCategoriesSpends());
        ui.message('Se ha Eliminado El Gasto','incorrecto');
    };    
};
function editSpend(obj){
    const {nameSpend,typeSpend,priceSpend} = obj;
    
    nameSpendInput.value = nameSpend;
    typeSpendInput.value = typeSpend;
    priceSpendInput.value = priceSpend.toString();

    formSpend.querySelector('button[type="submit"]').textContent = "Editar Gasto";
    objGSpend = {...obj};
    mode = true;
};
function emoji(type){
    let emoji = '';
    switch(type){
        case 'comida':
            emoji = '🌮';
            break;
        case 'ropa':
            emoji = '👕';
            break;
        case 'salud':
            emoji = '🩺';
            break;
        case 'compras':
            emoji = '🛍️';
            break;
        case 'diversion':
            emoji = '🎡';
            break;
        case 'pagos':
            emoji = '💳';
            break;
        default:
            break;
    };
    return emoji;
};
function date(){
    let data = new Date();

    let months = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];

    const day = data.getDate();
    const month = data.getMonth();
    const year = data.getFullYear();

    let objDate = {
        day,
        month:months[month],
        year
    };

    return `${objDate.day} ${objDate.month} ${objDate.year}`;
};

export {addSpend,fillSpend,spendHtml,categoryHtml};