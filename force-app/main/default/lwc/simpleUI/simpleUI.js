import { LightningElement,track } from 'lwc';
export default class SimpleUI extends LightningElement {
   @track UserName = 'Vyom Goyal';
    newName = 'Rishab Goyal';

    handleChange(event){
        console.log(event.detail.value);
        this.newName = event.detail.value;
    }

    handleClick(){
        console.log(this.newName);
        this.UserName = this.newName;
    }
}