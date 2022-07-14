import { LightningElement, api, track } from 'lwc';
export default class Aqb_multiLevelSelectPicklist extends LightningElement {

    @api name = 'MultiLevel';
    @api label = 'MultiLevel';
    @api value = 'MultiLevel';
    @api placeholder = 'MultiLevel';
    @track listOptions = [];
    @api allOptions = [];


    @track selectedValueName = '';
    @track selectedValuelabel = '';
    @api primaryObjectSelected = '';

    @track confirmedSelectedOption = {};

    @api strFieldsToDisplay = '';

    @track optionData = [];  //label , value , selected



    connectedCallback() {
        this.optionData = [];
        console.log('hello')
        this.init();

        
    }

    init (){
        var selectedObjectAPIName = this.primaryObjectSelected;
        console.log(selectedObjectAPIName);
         
        this.allOptions.forEach(currentItem => {
            if (currentItem.ObjectAPIName == selectedObjectAPIName) {
                var fieldList = currentItem.fieldList;

                fieldList.forEach(field => {
                    if (field.FieldType == 'REFERENCE') {

                        var option = {};
                        if ((field.FieldAPIName).includes('__c')) {
                            option.value = field.FieldAPIName.replace('__c', '__r.');
                        }
                        else {
                            option.value = field.FieldAPIName.replace('Id', '.');
                        }
                        option.Type = field.FieldType;
                        option.isReference = false;

                        if (field.ReferencedSObjectName) {
                            option.isReference = true;
                            option.referenceName = field.ReferencedSObjectName;
                        }

                        option.label = (field.FieldLabel).replace(' ID', '') + ' -> ';

                        this.listOptions.push(JSON.parse(JSON.stringify(option)));
                    }


                });
                fieldList.forEach(field => {
                    var option = {};
                    option.label = field.FieldLabel;
                    option.value = field.FieldAPIName;
                    option.Type = field.FieldType;
                    option.isReference = false;

                    this.listOptions.push(JSON.parse(JSON.stringify(option)));

                });

            }

        });
    }

    setSelectedOptions(strFieldsDisplay) {
        let strList = strFieldsDisplay.split(",");
 
        for (var i = 0; i < strList.length; i++) { 
            this.setValueChanges(strList[i])
        }

    }

    removePill(event) { 
        let arrShow = [];
        for (var i = 0; i < this.optionData.length; i++) {
            if (this.optionData[i].value != event.target.dataset.id) {
                arrShow.push(this.optionData[i]);
            }
        }
        this.optionData = arrShow; 
    }

    handleValueChanges(event) {
        this.setValueChanges(event.target.value);
    }

    setValueChanges(strVal) {

        var localselectedValueName = this.selectedValueName;
        var localselectedValuelabel = this.selectedValuelabel;


        this.selectedValueName = localselectedValueName.slice(0, localselectedValueName.lastIndexOf('.') + 1);
        if (localselectedValuelabel.lastIndexOf('-> ') == -1) {
            this.selectedValuelabel = '';
        }
        else {
            this.selectedValuelabel = localselectedValuelabel.slice(0, localselectedValuelabel.lastIndexOf('-> ') + 3);
        }

        var valueSelected = strVal;
        this.selectedValueName = this.selectedValueName + valueSelected;

        var selectedOption = {};
        this.listOptions.forEach(currentItem => {
            if (currentItem.value == valueSelected) {
                selectedOption = currentItem;
            }
        });

        this.selectedValuelabel = this.selectedValuelabel + selectedOption.label;

        if (selectedOption.isReference == true) {

            var selectedObjectAPIName = selectedOption.referenceName;

            this.listOptions = [];
            var Backoption = {};
            Backoption.label = '<--';
            Backoption.value = this.primaryObjectSelected;
            this.listOptions.push(JSON.parse(JSON.stringify(Backoption)));
            this.repopulateList(selectedObjectAPIName);

        }
        else {

            if (selectedOption.label == '<--') {

                this.listOptions = [];
                this.selectedValueName = '';
                this.selectedValuelabel = '';
                this.init();
            }
            else {

                this.confirmedSelectedOption = {};
                this.confirmedSelectedOption.value = this.selectedValueName;
                this.confirmedSelectedOption.label = this.selectedValuelabel;
                this.confirmedSelectedOption.Type = selectedOption.Type;
                

                this.optionData.push(this.confirmedSelectedOption);
 

            }
        }

    }


    repopulateList(selectedObjectAPIName) {
        this.allOptions.forEach(currentItem => {
            if (currentItem.ObjectAPIName == selectedObjectAPIName) {
                var fieldList = currentItem.fieldList;

                fieldList.forEach(field => {
                    if (field.FieldType == 'REFERENCE') {
                        var option = {};
                        if ((field.FieldAPIName).includes('__c')) {
                            option.value = field.FieldAPIName.replace('__c', '__r.');
                        }
                        else {
                            option.value = field.FieldAPIName.replace('Id', '.');
                        }
                        option.Type = field.FieldType;
                        option.isReference = false;

                        if (field.ReferencedSObjectName) {
                            option.isReference = true;
                            option.referenceName = field.ReferencedSObjectName;
                        }

                        option.label = (field.FieldLabel).replace(' ID', '') + ' -> ';

                        this.listOptions.push(JSON.parse(JSON.stringify(option)));
                    }


                });
                fieldList.forEach(field => {
                    var option = {};
                    option.label = field.FieldLabel;
                    option.value = field.FieldAPIName;
                    option.Type = field.FieldType;


                    this.listOptions.push(JSON.parse(JSON.stringify(option)));

                });

            }

        });
    }
     @api AllSelectedFields (){
        return this.optionData;
    }
    @api setSeletedFields (fieldstoDisplayJSON,selectedObject){
        console.log(fieldstoDisplayJSON);
        if(selectedObject!=''){
            this.primaryObjectSelected= selectedObject;
            this.connectedCallback();
        }
        if(fieldstoDisplayJSON){
        this.optionData = JSON.parse(fieldstoDisplayJSON);
        }

    }
}