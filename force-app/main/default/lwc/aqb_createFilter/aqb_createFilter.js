import { LightningElement, track, api } from 'lwc';
import getPicklistOptions from '@salesforce/apex/SearchLwcController.getPicklistValues';
export default class Aqb_createFilter extends LightningElement {


    @track operator;
    fieldListfromMetadata = [];
    @track fieldOptions = [];
    @track fieldId;
    @track fieldSelected;
    @api objectname;

    @track showError = false;
    @track showFieldOptions;
    @track showValueContainer;
    @track showMultiSelectCombobox;
    @track showTextInput;
    @track showDateInput;

    @track multiselectoptions = [];
    @track operatorOptions = [];
    @track relatedListOptions = [];

    get fieldTypeOptions() {
        return [
            { label: 'Field', value: 'field' },
            { label: 'Related List', value: 'relatedlist' }
        ];
    }


    dateOptions =
        [
            { label: 'Equals', value: '=' },
            { label: 'less than', value: '<' },
            { label: 'greater than', value: '>' },
            { label: 'less than Equals', value: '<' },
            { label: 'greater than Equals', value: '>=' },
        ];

    picklistOptions =
        [

            { label: 'In', value: 'in' }
        ];

    textOptions =
        [
            { label: 'Equals', value: '=' },
            { label: 'Contains', value: '% like %' },
            { label: 'Starts with', value: 'like %' },
            { label: 'Ends with', value: '% like' },
        ];

    @track selectedValues = '';

    @api allObjectFieldArr = [];
    connectedCallback() {
        this.showFieldOptions = false;
        this.handleResetFilter();

        this.fieldOptions = [];
        this.fieldListfromMetadata = [];
        this.fechfieldListfromMetadata(this.objectname);
    }
    @track showFields = false;

    @track selectedRadioButton = '';
    @track showFieldContainer = true;

    @track isRelatedFilter = false;
    radioChanged(event) {
        this.selectedRadioButton = event.target.value;
        this.radiovalue = event.target.value; 

        if (this.selectedRadioButton === 'field') {
            this.isRelatedFilter = false 
            this.showFieldContainer = false;
            this.showValueContainer = false;
            this.relatedListOptions = [];
            this.fieldOptions = [];
            for (var i = 0; i < this.allObjectFieldArr.length; i++) {
                if (this.objectname === this.allObjectFieldArr[i].ObjectAPIName) { 

                    let objfieldList = this.allObjectFieldArr[i].fieldList;


                    let fieldItem = {};
                    for (var j = 0; j < objfieldList.length; j++) {

                        fieldItem.label = objfieldList[j].FieldLabel;
                        fieldItem.value = objfieldList[j].FieldAPIName;
                        fieldItem.Type = objfieldList[j].FieldType;
                        this.fieldOptions.push(fieldItem);
                        fieldItem = {};
                    }
                    this.fieldOptions.sort((a, b) => {
                        return a.label > b.label ? 1 : -1;
                    });
                    this.showFieldOptions = true;
                    break;
                }
            }
            this.showFieldContainer = true;
        } else if (this.selectedRadioButton === 'relatedlist') {
            this.fieldOptions = [];

            this.showValueContainer = false;
            this.relatedListOptions = [];
            for (var i = 0; i < this.allObjectFieldArr.length; i++) {
                if (this.objectname === this.allObjectFieldArr[i].ObjectAPIName) {
                    this.relatedListOptions = [];
                    let listItem = {};
                    let objrelatedlist = this.allObjectFieldArr[i].relatedLists;
                    for (var j = 0; j < objrelatedlist.length; j++) {

                        listItem.label = objrelatedlist[j].RelationshipLabel;
                        listItem.value = objrelatedlist[j].RelatedListSObjectName;
                        listItem.relationshipFieldAPIName = objrelatedlist[j].RelationshipFieldAPIName;
                        this.relatedListOptions.push(listItem);
                        listItem = {};
                    }
                    this.relatedListOptions.sort((a, b) => {
                        return a.label > b.label ? 1 : -1;
                    });
                    break;
                }
            } 
            this.showRelatedListOptions = true;
            this.isRelatedFilter = true;
        } 
    }

    @track currelatedObjName = '';
    @track currelatedObjAPIRelation = '';
    handleRelatedObjectChanges(event) {
        this.currelatedObjName = event.target.value; 
        for (var i = 0; i < this.relatedListOptions.length; i++) {
            if (this.relatedListOptions[i].value == this.currelatedObjName) {
                this.currelatedObjAPIRelation = this.relatedListOptions[i].relationshipFieldAPIName; 
                break;
            }
        }




        for (var i = 0; i < this.allObjectFieldArr.length; i++) { 

            if (this.currelatedObjName.toLowerCase() == this.allObjectFieldArr[i].ObjectAPIName.toLowerCase()) { 

                let objfieldList = this.allObjectFieldArr[i].fieldList;



                this.fieldOptions = [];
                let fieldItem = {};
                for (var j = 0; j < objfieldList.length; j++) {

                    fieldItem.label = objfieldList[j].FieldLabel;
                    fieldItem.value = objfieldList[j].FieldAPIName;
                    fieldItem.Type = objfieldList[j].FieldType;
                    this.fieldOptions.push(fieldItem);
                    fieldItem = {};
                }
                this.fieldOptions.sort((a, b) => {
                    return a.label > b.label ? 1 : -1;
                }); 
                this.showFieldOptions = true;
                break;
            }
        }
    }


    @api fechfieldListfromMetadata(objName) {

        this.objectname = objName;
        this.showFieldOptions = false;

        this.handleResetFilter();
         
    }



    handleFieldChanges(event) {
        this.showValueContainer = false;

        this.fieldId = event.detail.value; 
        var fieldList = this.fieldOptions;
        this.fieldSelected = {};
        for (var i = 0; i < fieldList.length; i++) {
            if (fieldList[i].value == this.fieldId) {
                this.fieldSelected = fieldList[i];
            }
        } 

        if (this.fieldSelected) {

            //CheckforPicklistOptionsinValues
            //switch the Value container
            this.showMultiSelectCombobox = false;
            this.showTextInput = false;
            this.showDateInput = false; 

            if (this.fieldSelected.Type == 'PICKLIST') {
              
                getPicklistOptions({
                    objectName: this.objectname,
                    fieldName: this.fieldSelected.value
                })
                    .then(result => {
                        this.multiselectoptions = result; 
                        this.showMultiSelectCombobox = true;
                        this.showValueContainer = true;
                    })
                    .catch(error => {
 
                    })
                this.operatorOptions = this.picklistOptions;
            }
            else if (this.fieldSelected.Type == 'DATE' || this.fieldSelected.Type == 'DATETIME') {
                this.showDateInput = true;
                this.showValueContainer = true;
                this.operatorOptions = this.dateOptions;
            }
            else {
                this.operatorOptions = this.textOptions;

                this.showTextInput = true;
                this.showValueContainer = true;
            }


        }

    }
    handleChange(event) {
        this.operator = event.detail.value; 
    }

    handleAddFilter() {
        var filter = {};

        var isValid = true;
        if (!this.operator) {
            isValid = false;
        }
        if (!this.fieldId) {
            isValid = false;
        }
        if (!this.selectedValues) {
            isValid = false;
        }
        if (isValid) {
            this.showError = false;
            var operatorOptions = this.operatorOptions;
            var operatorLabel = '';

            for (var i = 0; i < operatorOptions.length; i++) {
                if (this.operator == operatorOptions[i].value) {
                    operatorLabel = operatorOptions[i].label;
                }
            }
            let operatorSymbol = this.operator;
            let valuetoFilter = "" + this.selectedValues + "";
            if (operatorSymbol == '% like %') {
                operatorSymbol = 'like';
                valuetoFilter = "%" + this.selectedValues + "%";
            }
            if (operatorSymbol == 'like %') {
                operatorSymbol = 'like';
                valuetoFilter = this.selectedValues + "%";
            }
            if (operatorSymbol == '% like') {
                operatorSymbol = 'like';
                valuetoFilter = "%" + this.selectedValues;
            }
            if (this.selectedRadioButton == 'field') {
                filter.isrelated = false;
            } else if (this.selectedRadioButton == 'relatedlist') {
                filter.isrelated = true;
                filter.relObjName = this.currelatedObjName; 
                filter.relationshipFieldAPIName = this.currelatedObjAPIRelation;
            }
            filter.fieldType = this.fieldSelected.Type;
            filter.fieldAPIName = this.fieldSelected.value;
            filter.fieldLabel = this.fieldSelected.label;
            filter.operatorSymbol = operatorSymbol;
            filter.operatorLabel = operatorLabel;
            filter.valuetoFilter = valuetoFilter;
            filter.objectName = this.objectname; 


            //send the filter to the Filter Sub Component LWC

            let filterItemnew = JSON.stringify(filter);
            const selectedEvent = new CustomEvent("addfilter", {
                detail: { filterItemnew }
            });
            this.dispatchEvent(selectedEvent);
            this.handleResetFilter();
        }
        else {
            this.showError = true;
        }

    }
    @track radiovalue;
    handleResetFilter() {
        this.operator = null;
        this.fieldId = null;
        this.showMultiSelectCombobox = false;
        this.showTextInput = false;
        this.showDateInput = false;
        this.showError = false;
        this.showValueContainer = false;

        this.selectedRadioButton = '';
        this.radiovalue = undefined;
        this.relatedListOptions = [];
        this.fieldOptions = [];

    }
    handleDateChange(event) {
        this.selectedValues = event.detail.value;
    }
    handleTextChange(event) {
        this.selectedValues = event.detail.value;
    }
    handleMultiSelectValueChange(event) {
        event.stopPropagation();
        const detail = event.detail.selectedListData;
        const key = event.detail.key;
        if (detail.length > 0) {
            this.selectedValues = detail.join(",");
        }

    }

    handleSelectedField(event) {
        this.showValueContainer = false;

        const selectedValueString = event.detail.selctedString;  
        this.fieldSelected = {};
        this.fieldSelected = JSON.parse(selectedValueString);
        this.fieldId = this.fieldSelected.value; 

        if (this.fieldSelected) {

            //CheckforPicklistOptionsinValues
            //switch the Value container
            this.showMultiSelectCombobox = false;
            this.showTextInput = false;
            this.showDateInput = false;
            if (this.fieldSelected.Type == 'PICKLIST') { 
                var fieldName=(this.fieldSelected.value).slice((this.fieldSelected.value).lastIndexOf('.')+1,(this.fieldSelected.value).length);
 
                getPicklistOptions({
                    objectName: this.fieldSelected.currentsobjectAPIName,
                    fieldName: fieldName
                })
                    .then(result => {
                        this.multiselectoptions = result; 
                        this.showMultiSelectCombobox = true;
                        this.showValueContainer = true;
                    })
                    .catch(error => {

                        console.log('Error:' + error);
                    })
                this.operatorOptions = this.picklistOptions;
            }
            else if (this.fieldSelected.Type == 'DATE' || this.fieldSelected.Type == 'DATETIME') {
                this.showDateInput = true;
                this.showValueContainer = true;
                this.operatorOptions = this.dateOptions;
            }
            else {
                this.operatorOptions = this.textOptions;

                this.showTextInput = true;
                this.showValueContainer = true;
            }


        }

        event.stopPropagation();
    }
}