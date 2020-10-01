export default class Square {

    type = '';
    status = true;
    color = 'red';
    owner = 'white';


    constructor(type, status, color) {
        this.type = type;
        this.status = status;
        this.color = color;
    }

    setOwner(owner) {
        this.owner = owner;
    }
}