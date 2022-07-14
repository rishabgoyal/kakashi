import {
    LightningElement,
    track,
    wire
} from 'lwc';
import fetchDataRecords from "@salesforce/apex/SearchLwcController.fetchDataRecords";
import getAllObjectList from "@salesforce/apex/DataSearchController.getAllObjectList";
import saveView from "@salesforce/apex/DataSearchController.saveView";
import getViewList from "@salesforce/apex/DataSearchController.getViewList";




import getView from "@salesforce/apex/DataSearchController.getView";

 
import {
    ShowToastEvent
} from 'lightning/platformShowToastEvent';

export default class Aqb_dataSearch extends LightningElement {


    @track errormessage = false;

    @track limitDefaultValue = 10000;
    @track oppList;

    @track objectSelected = true;
    @track selectedObject = '';
    @track objectOptions = [];

    @track showSpinner = false;
    @track showObjectOptions = false;
    @track allObjectFieldArr = [];

    @track viewOptions = [];
    @track isModalOpen = false;

    @track openViewId = '';

    @track saveAsLabel = '';
    @track isModalOpenSaveAs = false;

    @track fieldsToDisplay = [];

    @track viewId = '';
    connectedCallback() {

        this.showSpinner = true;
        this.showObjectOptions = false;
        getAllObjectList()
            .then(result => {
                this.allObjectFieldArr = result;
                this.template.querySelector('c-aqb_create-filter').allObjectFieldArr = result;
                this.objectOptions = [];
                let addOptions = [];
                let obj = [];
                result.forEach(currentItem => {

                    obj.label = currentItem.ObjectLabel;
                    obj.value = currentItem.ObjectAPIName;
                    addOptions.push(obj);
                    obj = [];
                });
                addOptions.sort((a, b) => {
                    return a.label > b.label ? 1 : -1;
                });
                this.objectOptions = addOptions;
                this.showSpinner = false;
            })
            .catch(err => {
                console.log('error:' + err);
                this.showSpinner = false;
            })

        this.refreshViewList();


    }

    refreshViewList() {
        getViewList()
            .then(result => {
                this.viewOptions = [];
                if (result.length > 0) {
                    for (var i = 0; i < result.length; i++) {
                        this.viewOptions.push({
                            label: result[i].Name,
                            value: result[i].Name,
                            id: result[i].Id
                        });
                    }
                }
            })
    }
    handleObjectChanges(event) {

        this.selectedFieldsToDisplay = '';
        this.selectedObject = event.detail.value;
        this.setFieldsDisplay(this.selectedObject);
    }

    setFieldsDisplay(objName) {

        console.log('In Here to L3');
        if (this.selectedObject != '') {
            this.template.querySelector('c-aqb_create-Filter').fechfieldListfromMetadata(objName);
        }

        this.template.querySelector('c-aqb_multi-level-select-picklist').setSeletedFields(this.selectedFieldsToDisplay, this.selectedObject);
    }

    fetchViewDetails() {
        this.showSpinner = true;

        getView({
                viewId: this.openViewId
            })
            .then(result => {

                this.isModalOpen = false;
                console.log(result);
                if (result != undefined && result != null && result != []) {
                    this.viewId = result.view.Id;
                    this.saveAsLabel = result.view.Name;
                    this.selectedObject = result.view.objectName__c;
                    this.limitDefaultValue = result.view.Limit__c;
                    this.selectedFieldsToDisplay = result.view.Field_To_Display_JSON__c;
                    this.setFieldsDisplay(result.view.objectName__c);

                    this.template.querySelector('c-aqb_filter-sub-component-lwc').setViewDetails(result);
                    //this.template.querySelector('c-combobox-multi-select').setMultipleOptions(result.view.FieldToDisplay__c); 
                } else {
                    const evt = new ShowToastEvent({
                        title: 'Error',
                        message: 'View load failed',
                        variant: 'error',
                        mode: 'dismissable'
                    });
                    this.dispatchEvent(evt);
                }


                this.showSpinner = false;

            })
            .catch(error => {
                this.showSpinner = false;
                console.log(error);

            })
    }


    handleLimitChange(event) {



        var value = event.detail.value;
        if (value > 10000) {
            event.target.setCustomValidity("Please enter limit less than 10000");
        } else {
            this.limitDefaultValue = value;
            event.target.setCustomValidity(""); // if there was a custom error before, reset it
        }
        event.target.reportValidity();
    }
    handleAddFilter(event) {
        console.log('Adding Filter');
        this.template.querySelector('c-aqb_filter-sub-component-lwc').handleAddFilterItem(event.detail.filterItemnew);
    }

    handleShowData(event) {

        var fieldsToDisplay = this.template.querySelector('c-aqb_multi-level-select-picklist').AllSelectedFields();
        console.log(fieldsToDisplay);
        this.selectedFieldsToDisplay = JSON.stringify(fieldsToDisplay);
        var apiNametoQuery = '';
        for (var i = 0; i < fieldsToDisplay.length; i++) {
            apiNametoQuery = apiNametoQuery + fieldsToDisplay[i].value + ',';
        }

        if (apiNametoQuery == undefined || apiNametoQuery == '') {
            const evt = new ShowToastEvent({
                title: 'Error',
                message: 'Select some fields to display',
                variant: 'error',
                mode: 'dismissable'
            });
            this.dispatchEvent(evt);
        } else {
            apiNametoQuery = apiNametoQuery.substring(0, apiNametoQuery.length - 1);
            let whereClauseString = this.template.querySelector('c-aqb_filter-sub-component-lwc').showLogicString;
            this.template.querySelector('c-aqb_data-table').setSpinnerOn();
            fetchDataRecords({
                    WhereClause: whereClauseString,
                    objectName: this.selectedObject,
                    fieldsToDisplay: apiNametoQuery,
                    Querylimit:this.limitDefaultValue
                })
                .then(results => {
                    
                    let fieldapi = apiNametoQuery.split(',');
                    let headerList = [];
                    let headerItem = {};
                    for (var i = 0; i < fieldsToDisplay.length; i++) {
                        if (fieldapi.includes(fieldsToDisplay[i].value)) {
                            headerItem.label = fieldsToDisplay[i].label;
                            headerItem.apiName = (fieldsToDisplay[i].value).replaceAll('.','_');
                            headerItem.dataType = fieldsToDisplay[i].fieldType;
                            headerList.push(headerItem);
                            headerItem = {};
                        }
                    }
                    console.log(JSON.stringify(headerList));
                    if (results != undefined && results != null) {

                       var flattenedResults = [];

                   
                    results.allData.forEach(currentItem => {
                        
                        flattenedResults.push(this.flattenobj(JSON.parse(JSON.stringify(currentItem))));
                    });
                    results.allData = flattenedResults;

                        this.template.querySelector('c-aqb_data-table').getsearchdata(results, headerList);
                    }
                })
                .catch(error => {
                    this.error = error;
                    this.record = undefined;
                });
        }

    }
    @track selectedFieldsToDisplay = '';
    handleMultiSelectFieldChange(event) {
        event.stopPropagation();
        const detail = event.detail.selectedListData;
        const key = event.detail.key;
        if (detail.length > 0) {
            this.selectedFieldsToDisplay = detail.join(",");
        }
    }

    @track showDetails = false;
    showDetailsChange(event) {
        if (this.showDetails == false) {
            this.showDetails = true;
            this.template.querySelector('[data-id="filterDetailsClass"]').className = 'slds-show';
        } else {
            this.showDetails = false;
            this.template.querySelector('[data-id="filterDetailsClass"]').className = 'slds-hide';
        }
    }


    @track isSave = false;
    @track isSaveAs = false;
    showAddLabel() {
        this.isModalOpenSaveAs = true;
    }
    openSaveViewModal() {
        this.isModalOpenSaveAs = true;
        this.isSave = true;
    }
    closeModal() {
        this.isModalOpen = false;
        this.isModalOpenSaveAs = false;
        this.isModalOpenSave = false;
        this.isSave = false;
        this.isSaveAs = false;
    }
    openSaveAsViewModal() {
        this.isModalOpenSaveAs = true;
        this.isSaveAs = true;
    }
    viewNameChange(event) {
        this.saveAsLabel = event.target.value;
    }
    saveViewAs() {


        if (this.saveAsLabel != null && this.saveAsLabel != '') {
            let viewData = {};

            let viewDetails = {};
            viewDetails.Name = this.saveAsLabel;
            viewDetails.objectName__c = this.selectedObject;
            viewDetails.Limit__c = '' + this.limitDefaultValue;
            viewDetails.Condition__c = this.template.querySelector('c-aqb_filter-sub-component-lwc').selectedRadioButton;
            viewDetails.CustomLogic__c = this.template.querySelector('c-aqb_filter-sub-component-lwc').logicString;

            viewDetails.Field_To_Display_JSON__c = JSON.stringify(this.template.querySelector('c-aqb_multi-level-select-picklist').AllSelectedFields());
            viewData.view = viewDetails;

            let filterListChildCompo = this.template.querySelector('c-aqb_filter-sub-component-lwc').filterList;


            let filterList = [];
            for (var i = 0; i < filterListChildCompo.length; i++) {
                let filterItem = {};
                let childCompItem = filterListChildCompo[i];

                filterItem.isrelated__c = childCompItem.isrelated;
                filterItem.fieldType__c = childCompItem.fieldType;
                filterItem.fieldAPIName__c = childCompItem.fieldAPIName;
                filterItem.fieldLabel__c = childCompItem.fieldLabel;
                filterItem.operatorSymbol__c = childCompItem.operatorSymbol;
                filterItem.operatorLabel__c = childCompItem.operatorLabel;
                filterItem.valuetoFilter__c = childCompItem.valuetoFilter;
                filterItem.displayText__c = childCompItem.displayText;
                filterItem.serial__c = '' + childCompItem.serial;
                filterItem.relationshipFieldAPIName__c = childCompItem.relationshipFieldAPIName;
                filterItem.filterString__c = childCompItem.filterString;
                filterItem.relObjName__c = childCompItem.relObjName;

                filterList.push(filterItem);
            }

            viewData.filterList = filterList;
            this.saveInDb(viewData);
            this.isModalOpenSaveAs = false;
        } else {
            const evt = new ShowToastEvent({
                title: 'Error',
                message: 'Enter Label',
                variant: 'error',
                mode: 'dismissable'
            });
            this.dispatchEvent(evt);
        }
    }


    saveView(event) {

        if (this.saveAsLabel != null && this.saveAsLabel != '') {


            let viewData = {};

            let viewDetails = {};
            if (this.viewId != '') {
                viewDetails.Id = this.viewId;
            }
            viewDetails.Name = this.saveAsLabel;
            viewDetails.objectName__c = this.selectedObject;
            viewDetails.Limit__c = '' + this.limitDefaultValue;
            viewDetails.Condition__c = this.template.querySelector('c-aqb_filter-sub-component-lwc').selectedRadioButton;
            viewDetails.CustomLogic__c = this.template.querySelector('c-aqb_filter-sub-component-lwc').logicString;
            viewDetails.Field_To_Display_JSON__c = JSON.stringify(this.template.querySelector('c-aqb_multi-level-select-picklist').AllSelectedFields());
            viewData.view = viewDetails;

            let filterListChildCompo = this.template.querySelector('c-aqb_filter-sub-component-lwc').filterList;


            let filterList = [];
            for (var i = 0; i < filterListChildCompo.length; i++) {
                let filterItem = {};
                let childCompItem = filterListChildCompo[i];
                if (childCompItem.Id != undefined && childCompItem.Id != '') {
                    filterItem.Id = childCompItem.Id;
                }
                filterItem.isrelated__c = childCompItem.isrelated;
                filterItem.fieldType__c = childCompItem.fieldType;
                filterItem.fieldAPIName__c = childCompItem.fieldAPIName;
                filterItem.fieldLabel__c = childCompItem.fieldLabel;
                filterItem.operatorSymbol__c = childCompItem.operatorSymbol;
                filterItem.operatorLabel__c = childCompItem.operatorLabel;
                filterItem.valuetoFilter__c = childCompItem.valuetoFilter;
                filterItem.displayText__c = childCompItem.displayText;
                filterItem.serial__c = '' + childCompItem.serial;
                filterItem.relationshipFieldAPIName__c = childCompItem.relationshipFieldAPIName;
                filterItem.filterString__c = childCompItem.filterString;
                filterItem.relObjName__c = childCompItem.relObjName;

                filterList.push(filterItem);
            }

            viewData.filterList = filterList;
            this.saveInDb(viewData);

        } else {
            const evt = new ShowToastEvent({
                title: 'Error',
                message: 'Enter Label',
                variant: 'error',
                mode: 'dismissable'
            });
            this.dispatchEvent(evt);
        }
    }
    saveInDb(viewData) {
        console.log('Hello');
        console.log(JSON.stringify(viewData));
        saveView({
                viewData: viewData
            })
            .then(result => {
                this.closeModal();
                if (result == 'Success') {
                    const evt = new ShowToastEvent({
                        title: 'Success',
                        message: 'View Saved',
                        variant: 'success',
                        mode: 'dismissable'
                    });
                    this.dispatchEvent(evt);
                } else {
                    const evt = new ShowToastEvent({
                        title: 'Error',
                        message: result,
                        variant: 'error',
                        mode: 'dismissable'
                    });
                    this.dispatchEvent(evt);

                }
            })
    }



    handleSelectedField(event) {
        const selectedValueString = event.detail.selctedString;
        event.stopPropagation();
    }

    openView() {
        this.refreshViewList();
        if (this.viewOptions.length > 0) {

            this.isModalOpen = true;
        } else {
            const evt = new ShowToastEvent({
                title: 'No views found',
                message: 'Create new views.',
                variant: 'warning',
                mode: 'dismissable'
            });
            this.dispatchEvent(evt);
        }
    }

    handleViewChanges(event) {
        for (var i = 0; i < this.viewOptions.length; i++) {
            if (this.viewOptions[i].value == event.detail.value) {

                this.openViewId = this.viewOptions[i].id;
            }
        }

    }

    flattenobj(ob) {

        // The object which contains the
        // final result
        let result = {};
        // loop through the object "ob"
        for (let i in ob) {
            // We check the type of the i using
            // typeof() function and recursively
            // call the function again
            if ((typeof ob[i]) === 'object' && !Array.isArray(ob[i])) {
                var temp = this.flattenobj(ob[i]);
                for (let j in temp) {
                    // Store temp in result
                    result[i + '_' + j] = temp[j];
                }
            }

            // Else store ob[i] in result directly
            else {
                result[i] = ob[i];
            }
        }
        return result;

    }
  
}