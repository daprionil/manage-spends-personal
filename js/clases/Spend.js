class Spend{
    constructor(){
        this.allSpends = [];
    };
    addSpend(obj){
        this.allSpends = [...this.allSpends,obj];
    };
    deleteSpend(id){
        this.allSpends = this.allSpends.filter( spend => spend.id !== id );
    };
    editSpend(obj){
        this.allSpends = this.allSpends.map( spend => {
            if(spend.id === obj.id){
                return obj;
            }else{
                return spend;
            }
        });
    };
    viewCategoriesSpends(){
        const comida = this.filterCategory('comida');
        const ropa = this.filterCategory('ropa');
        const salud = this.filterCategory('salud');
        const diversion = this.filterCategory('diversion');
        const pagos = this.filterCategory('pagos');
        const compras = this.filterCategory('compras');

        return {
            comida,ropa,salud,diversion,pagos,compras
        }
    };
    filterCategory(tipo){
        const valor = this.allSpends.filter( spend => spend.typeSpend === tipo);
        return valor;
    };
};
export default Spend;