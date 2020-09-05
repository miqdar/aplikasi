class CarFactory {
    constructor() {
        this.factory = [];
    }
    produksi() {
        let random = Math.floor(Math.random() * 6) +1;
        let data = [new Avanza, new Innova, new Alphard];
        for (let i = 0; i < random; i++) {
            this.factory.push(data[Math.floor(Math.random() * 3)]);
        }
        console.log(`Hasil Produksi : ${random} unit\n`);
        for (let i=0; i <this.factory.length; i++) {
            console.log(`            Merk : ${this.factory[i].carname}
            Type : ${this.factory[i].type}
            Seat : ${this.factory[i].chair}
            Year : ${this.factory[i].year}
            Tyre : ${this.factory[i].tyre.merkban} "${this.factory[i].tyre.sizeban}"
            Warranty Until : ${this.factory[i].grn}
            `);
        }
        //console.log(data);
    }
}

class Car {
    constructor(carname, type, chair, year, warranty, merkban, sizeban) {
        this.carname = carname;
        this.type = type;
        this.chair = chair;
        this.year = year;
        this.tyre = new Tyre;
    }
}

class Tyre {
    constructor() {
        this.merkban = "Dunlop";
        this.sizeban = "185/70/14";
    }
}

class Avanza extends Car {
    constructor() {
        super("Avanza",'manual','7','2001');
        this.grn = parseInt(this.year) + Math.floor(Math.random() * 5) +1;
    }
}
class Innova extends Car {
    constructor() {
        super("Innova",'matic','8','2002');
        this.grn = parseInt(this.year) + Math.floor(Math.random() * 5) +1;
    }
}
class Alphard extends Car {
    constructor() {
        super("Alphard",'matic','10','2003');
        this.grn = parseInt(this.year) + Math.floor(Math.random() * 5) +1;
    }
}


const factory = new CarFactory();

factory.produksi();
