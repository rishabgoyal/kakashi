import { LightningElement, api } from 'lwc';
export default class Aqb_filterItem extends LightningElement {


        @api fieldLabel = '';
        @api fieldAPIName = '';
        @api operatorLabel = '';
        @api operatorSymbol = '';
        @api valuetoFilter = '';
        @api serial = '';
        @api displayText='';
        @api filterString='';

        @api item = [{ filterString:'',displayText:'',fieldLabel: '', fieldAPIName: '', operatorLabel: '', operatorSymbol: '', valuetoFilter: '' }];

        connectedCallback() {  
                //console.log('IN CC------'+this.filterString);
        } 

        deleteItem() {
                //Write code to delete Item
                var key=this.serial; 
                var operation="delete";
                var field=this.filterString;
                //console.log('Field----'+field);
                const selectedEvent = new CustomEvent("changeoperation", {
                        detail: { operation,key, field }
                });
                this.dispatchEvent(selectedEvent);
        }
}