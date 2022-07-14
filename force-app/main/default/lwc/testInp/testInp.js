/**
 * @File Name          : TestInp.js
 * @Description        : 
 * @Author             : RISHAB GOYAL
 * @Group              : 
 * @Last Modified By   : RISHAB GOYAL
 * @Last Modified On   : 12/6/2019, 4:08:05 PM
 * @Modification Log   : 
 * Ver       Date            Author      		    Modification
 * 1.0    12/6/2019   RISHAB GOYAL     Initial Version
**/
import { LightningElement, track } from 'lwc';

export default class HelloBinding extends LightningElement {
    @track greeting = 'World';
    @track Message = '';
    handleChange(event) {
        this.greeting = event.target.value;
    }
    handleClick() {
        this.Message = this.greeting;
    }
}