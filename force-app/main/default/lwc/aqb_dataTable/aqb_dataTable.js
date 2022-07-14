import { LightningElement, track, api } from 'lwc';

import { ShowToastEvent } from "lightning/platformShowToastEvent";
import { NavigationMixin } from 'lightning/navigation';
const showIt = "visibility:visible";
const hideIt = "visibility:hidden";
const pageNumber = 1;
export default class Aqb_dataTable extends LightningElement {

    //------------------------------------------------------------------------------------------------------------------
    @track columns = [];

    @track value;
    @track error;
    @track data;
    @track datatodisplay = [];
    @api sortedDirection = 'asc';
    @api sortedBy = 'Name';
    @api searchKey = '';
    result;

    @track pageSizeOptions = [{ label: '10', value: "10" }, { label: '20', value: "20" }, { label: '50', value: "50" },]
    @track showNextButton = true;
    @track showPrevButton = true;

    @track page = 1;
    @track items = [];
    @track startingRecord = 1;
    @track endingRecord = 0;
    @track pageSize = 10;
    @track totalRecountCount = 0;
    @track totalPage = 0;
    @track totalRecords = 0;
    @track showSpinner = false;
    connectedCallback() {

    }

    @track data = [];
    setInitialData(results, headerList) {

        this.showSpinner = true;

        let headerTemplist = headerList;
        this.columns = [];
        for (var i = 0; i < headerTemplist.length; i++) {
            let colItem = {};
            colItem.label = headerTemplist[i].label;
            colItem.fieldName = headerTemplist[i].apiName;
            if (  headerTemplist[i].dataType === 'DATE') {
                colItem.type = 'date';
            } else if (headerTemplist[i].dataType === 'DATETIME') {
                colItem.type = 'date-local'
            } else if (headerTemplist[i].dataType === 'EMAIL') {
                colItem.type = 'email'
            } else if (headerTemplist[i].dataType === 'ID' || headerTemplist[i].dataType === 'BOOLEAN' ||
                headerTemplist[i].dataType === 'PICKLIST' || headerTemplist[i].dataType === 'STRING' || 
                headerTemplist[i].dataType === 'DOUBLE' || headerTemplist[i].dataType === 'TEXTAREA') {
                colItem.type = 'text';
            } else if (headerTemplist[i].dataType === 'CURRENCY') {
                colItem.type = 'currency'
            } else if (headerTemplist[i].dataType === 'PERCENT') {
                colItem.type = 'percent'
            } else if (headerTemplist[i].dataType === 'PHONE') {
                colItem.type = 'phone'
            } else if (headerTemplist[i].dataType === 'URL') {
                colItem.type = 'url'
            }
 
            this.columns.push(colItem); 

        }

        this.data = results.allData;
        if (this.data != undefined && this.data != null && this.data.length != undefined) {
            this.totalRecords = this.data.length;
        }

        let currData = this.data;

        this.page = 1;
        this.startingRecord = 0;
        this.endingRecord = this.pageSize;
        this.totalPage = Math.ceil(currData.length / this.pageSize);

        if (this.totalPage > this.page) {
            this.showNextButton = false;
        }
        else {
            this.showNextButton = true;
        }
        if (1 < this.page) {
            this.showPrevButton = false;
        }
        else {
            this.showPrevButton = true;
        }

        this.datatodisplay = currData.slice(this.startingRecord, this.endingRecord);
        this.showSpinner = false;
    }

    nextHandler(event) {
        this.showSpinner = true;


        let currData = this.data;
        this.datatodisplay = [];
        this.page = Math.ceil(this.page + 1);
        this.startingRecord = (this.page - 1) * this.pageSize;
        this.endingRecord = (this.page) * this.pageSize;
        this.totalPage = Math.ceil(currData.length / this.pageSize);


        if (this.totalPage > this.page) {
            this.showNextButton = false;
        }
        else {
            this.showNextButton = true;
        }
        if (1 < this.page) {
            this.showPrevButton = false;
        }
        else {
            this.showPrevButton = true;
        }

        this.datatodisplay = currData.slice(this.startingRecord, this.endingRecord);
        this.showSpinner = false;
    }
    previousHandler(event) {
        this.showSpinner = true;


        let currData = this.data;
        this.datatodisplay = [];
        this.page = this.page - 1;
        this.startingRecord = (this.page - 1) * this.pageSize;
        this.endingRecord = (this.page) * this.pageSize;

        this.totalPage = Math.ceil(currData.length / this.pageSize);
        this.page = Number(this.page);
        this.totalPage = Number(this.totalPage);
        if (this.totalPage > this.page) {
            this.showNextButton = false;
        }
        else {
            this.showNextButton = true;
        }
        if (1 < this.page) {
            this.showPrevButton = false;
        }
        else {
            this.showPrevButton = true;
        }

        this.datatodisplay = currData.slice(this.startingRecord, this.endingRecord);
        this.showSpinner = false;
    }

    handlePageSizeChange(event) {
        this.showSpinner = true;


        this.pageSize = event.detail.value;
        let currData = this.data;

        this.page = 1;
        this.startingRecord = 0;
        this.endingRecord = this.pageSize;
        this.totalPage = Math.ceil(currData.length / this.pageSize);
        this.page = Number(this.page);
        this.totalPage = Number(this.totalPage);
        if (this.totalPage > this.page) {
            this.showNextButton = false;
        }
        else {
            this.showNextButton = true;
        }
        if (1 < this.page) {
            this.showPrevButton = false;
        }
        else {
            this.showPrevButton = true;
        }

        this.datatodisplay = currData.slice(this.startingRecord, this.endingRecord);

        this.showSpinner = false;
    }
    @track isModalOpen = false;
    openModal() {
        this.isModalOpen = true;
    }
    closeModal() {
        this.isModalOpen = false;
    }
    @track fieldValue = '';
    handleLeadSourceChange(event) {
        event.stopPropagation();
        const detail = event.detail.selectedListData;
        const key = event.detail.key;
        let productPicklistVal = '';
        if (detail.length > 0) {
            this.fieldValue = detail.join(",");
            this.fieldValue = this.fieldValue.replaceAll(" ", "_");
        } else {
            this.fieldValue = '';
        } 

        
    }
    

    updateColumnSorting(event) {
        var fieldName = event.detail.fieldName;
        var sortDirection = event.detail.sortDirection;
        // assign the latest attribute with the sorted column fieldName and sorted direction
        this.sortedBy = fieldName;
        this.sortedDirection = sortDirection;
        this.data = this.sortData(fieldName, sortDirection);
    }

    @api setSpinnerOn() {
        this.showSpinner = true;
    }
    @api getsearchdata(results, headerList) { 
        this.setInitialData(results, headerList);
    }

    //------------------------------------------------------------------------------------------------------------------



}