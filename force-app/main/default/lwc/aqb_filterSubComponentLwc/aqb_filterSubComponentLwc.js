import { LightningElement, track, api } from 'lwc';

export default class Aqb_filterSubComponentLwc extends LightningElement {




    @api filterList = [];

    @track objectName = "Opportunity";
    @track conditionLogic = '';
    @track showFilterList = false;

    get filterLogicOptions() {
        return [
            { label: 'All', value: 'AND' },
            { label: 'Any', value: 'OR' },
            { label: 'Custom', value: 'Custom' },
        ];
    }
    connectedCallback() {
        this.refreshFilterList();

    }
    @track selectedObject = '';
    @api setSelectedObject(objectName) {
        this.selectedObject = objectName;
    }
    refreshFilterList() {
        this.showFilterList = false;
        if (this.filterList.length > 0) {
            for (var i = 0; i < this.filterList.length; i++) {
                this.filterList[i].serial = (i + 1);

                //RelationshipFieldAPIName

                //displayText

                //filterString
                if (this.filterList[i].relationshipFieldAPIName == undefined) {
                    this.filterList[i].relationshipFieldAPIName = 'temp';
                }

                if (this.filterList[i].isrelated == true) {
                    this.filterList[i].displayText = this.filterList[i].serial + '. (' + this.filterList[i].relObjName + ') -> ' + this.filterList[i].fieldLabel + ' ' + this.filterList[i].operatorLabel + ' '
                        + this.filterList[i].valuetoFilter;

                } else {
                    this.filterList[i].displayText = this.filterList[i].serial + '. ' + this.filterList[i].fieldLabel + ' ' + this.filterList[i].operatorLabel + ' '
                        + this.filterList[i].valuetoFilter;
                }


                if (this.filterList[i].operatorSymbol == 'in') {
                    let valueSet = this.filterList[i].valuetoFilter.split(',');
                    let valuestring = '';
                    if (valueSet.length > 0) {
                        valuestring = valueSet.join("\',\'");
                    }
                    //filter String
                    if (this.filterList[i].isrelated == true) {
                        this.filterList[i].filterString = 'Id in (SELECT ' + this.filterList[i].relationshipFieldAPIName + ' from ' + this.filterList[i].relObjName + ' WHERE ' + this.filterList[i].fieldAPIName + ' in ' + '(\'' + valuestring + '\'))';

                    } else {
                        this.filterList[i].filterString = this.filterList[i].fieldAPIName + ' in ' + '(\'' + valuestring + '\')';

                    }
                } else if (this.filterList[i].fieldType === 'DATE' || this.filterList[i].fieldType === 'DATETIME') {
                    this.filterList[i].valuetoFilter = this.filterList[i].valuetoFilter.replaceAll("'", "");
                    //filter String
                    if (this.filterList[i].isrelated == true) {
                        this.filterList[i].filterString = 'Id in (SELECT ' + this.filterList[i].relationshipFieldAPIName + ' from ' + this.filterList[i].relObjName + ' WHERE ' + 'DAY_ONLY(' + this.filterList[i].fieldAPIName + ') ' + this.filterList[i].operatorSymbol + ' ' +
                            this.filterList[i].valuetoFilter + ')';
                    } else {
                        this.filterList[i].filterString = 'DAY_ONLY(' + this.filterList[i].fieldAPIName + ') ' + this.filterList[i].operatorSymbol + ' ' +
                            this.filterList[i].valuetoFilter;
                    }

                } else {
                    //filter String
                    if (this.filterList[i].isrelated == true) {
                        this.filterList[i].filterString = 'Id in (SELECT ' + this.filterList[i].relationshipFieldAPIName + ' from ' + this.filterList[i].relObjName + ' WHERE ' + this.filterList[i].fieldAPIName + ' ' + this.filterList[i].operatorSymbol + ' ' + '\'' + this.filterList[i].valuetoFilter + '\')';

                    } else {
                        this.filterList[i].filterString = this.filterList[i].fieldAPIName + ' ' + this.filterList[i].operatorSymbol + ' ' + '\'' + this.filterList[i].valuetoFilter + '\'';
                    }
                }
            }
        } 
        if (this.selectedRadioButton != '') {
            this.createLogicStringFromRadio(this.selectedRadioButton);
        } 
        this.showFilterList = true;
    }

    @api handleAddFilterItem(filterItem) {
        console.log(filterItem);
        var filterItemObj = JSON.parse(filterItem) ;
        if (filterItemObj != undefined && filterItemObj != null && filterItemObj != {}) {
            filterItemObj.displayText = filterItemObj.serial + '. ' + filterItemObj.fieldLabel + ' ' + filterItemObj.operatorLabel + ' '
                + filterItemObj.valuetoFilter;
            this.filterList.push(filterItemObj);
            console.log(JSON.stringify(filterItemObj));
        } 
        console.log(JSON.stringify(this.filterList));
        this.refreshFilterList();
    }

    @api logicString = '';
    handleConditionLogicChange(event) {
        this.logicString = event.target.value;
    }

    //Remove Pill function
    handleOperationChange(event) {
        this.showFilterList = false;
        let fieldname = event.detail.field; 
        let templist = [];
        for (var i = 0; i < this.filterList.length; i++) {
            if (this.filterList[i].filterString !== fieldname) {
                templist.push(this.filterList[i]);
            }
        }
        for (var i = 0; i < templist.length; i++) {
            templist[i].serial = (i + 1);
            templist[i].displayText = templist[i].serial + '. ' + templist[i].fieldLabel + ' ' + templist[i].operatorLabel + ' ' + templist[i].valuetoFilter;

        }
        this.filterList = [];
        this.filterList = templist;
        this.refreshFilterList();
        this.showFilterList = true;

    }
    @api selectedRadioButton = '';
    radioChanged(event) {
        this.selectedRadioButton = event.target.value;
        this.createLogicStringFromRadio(this.selectedRadioButton);
    }
    createLogicStringFromRadio(newRadioChanged) {
        let sendString = ''; 
        if (this.filterList != undefined && this.filterList != null && this.filterList.length > 0) {
            if (newRadioChanged === 'AND') {
                for (var i = 0; i < this.filterList.length; i++) {
                    sendString += (i + 1);
                    if ((i + 1) != this.filterList.length) {
                        sendString += ' AND ';
                    }
                }
                this.prepareLogicString(sendString);
            } else if (newRadioChanged === 'OR') {
                for (var i = 0; i < this.filterList.length; i++) {
                    sendString += (i + 1);
                    if ((i + 1) != this.filterList.length) {
                        sendString += ' OR ';
                    }
                }
                this.prepareLogicString(sendString);
            } else if (newRadioChanged === 'Custom') {
                if (this.logicString !== '') {
                    this.prepareLogicString(this.logicString);
                }
            }
        } else {
            this.showLogicString = '';
        }
    }

    @api showLogicString = '';
    searchBuild(event) { 
        this.prepareLogicString(this.logicString);
    }

    prepareLogicString(newlogicstring) { 
        this.showLogicString = newlogicstring.trim();
        this.showLogicString = this.showLogicString.replaceAll(" ", "");
        this.showLogicString = this.showLogicString.toLocaleUpperCase();
        this.showLogicString = this.showLogicString.replaceAll("AND", " AND ");
        this.showLogicString = this.showLogicString.replaceAll("OR", " OR ");
        let filterMap = [];
        for (var i = 0; i < this.filterList.length; i++) {
            let newItem = {};
            newItem.key = String(i + 1);
            newItem.value = this.filterList[i].filterString;
            filterMap.push(newItem);
            // this.showLogicString = this.showLogicString.replace((i + 1), this.filterList[i].filterString);
        } 
        let displayString = '';
        for (var i = 0; i < this.showLogicString.length; i++) { 

            if (isNaN(this.showLogicString.charAt(i)) || this.showLogicString.charAt(i) == ' ') {
                displayString += this.showLogicString.charAt(i);
            } else { 

                for (var k = 0; k < filterMap.length; k++) {
                    if (filterMap[k].key === this.showLogicString.charAt(i)) { 
                        displayString += filterMap[k].value;//this.showLogicString.replace(this.showLogicString.charAt(i), filterMap[k].value);
                        break;
                    }
                }


            }

        }
        this.showLogicString = displayString;
        console.log('DISPLAYSTRING:' + displayString); 

    }

    @api setViewDetails(result) { 
        this.selectedRadioButton = result.view.Condition__c;
        this.logicString = result.view.CustomLogic__c;
        let fltrlst = result.filterList;


        let newList = result.filterList;
        let str = JSON.stringify(newList);
        str = str.replaceAll("__c", "");
        let strJSON = JSON.parse(str);

        this.filterList = strJSON;

        this.createLogicStringFromRadio(this.selectedRadioButton);
  
    }


}