import { LightningElement, wire, track } from 'lwc';
import getAccountList from '@salesforce/apex/FirstLWCApex.getAccountList';

export default class First extends LightningElement {
    cardTitle = "Account List";
    @track searchValue = '';

    @wire(getAccountList, { searchKey: '$searchValue' })
    Accounts;

    handleKeyChange(event) {
        // Debouncing this method: Do not update the reactive property as long as this function is
        // being called within a delay of DELAY. This is to avoid a very large number of Apex method calls.
        //window.clearTimeout(this.delayTimeout);
        const searchValue = event.target.value;
       // this.delayTimeout = renderedCallback( {
            this.searchValue= searchValue;
            // ... manipulating the span LightningElement
       // });
     
    }
    handleKeyUp(evt) {
        console.log(evt.target.value);
        const isEnterKey = evt.keyCode === 13;
        if (isEnterKey) {
            this.searchValue = evt.target.value;
        }
    }
}