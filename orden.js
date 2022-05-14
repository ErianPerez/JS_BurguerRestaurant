class Orden {

    //constructor
    constructor(id,nombre,hamburguesa,papas,aderezo,descuento){

        this.id = id;
        this.nombre = nombre;
        this.hamburguesa = hamburguesa;
        this.papas = papas;
        this.aderezo = aderezo;
        this.descuento = descuento
        this.estado = "En preparacion";

    }
 
    getEstadoCombo(){

        return this.estado;
    }

    setEstadoCombo(nuevo_estado){

        this.estado = nuevo_estado;

    }



}