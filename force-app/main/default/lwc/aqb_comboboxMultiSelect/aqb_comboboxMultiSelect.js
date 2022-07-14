import { LightningElement, track, api } from 'lwc';

export default class Aqb_comboboxMultiSelect extends LightningElement {
@api options=[];
    @api selectedValue;
    @api selectedValues = [];
    @api label;
    @api minChar = 2;
    @api disabled = false;
    @api multiSelect = false;
    @track value;
    @track values = [];
    @api optionData=[];
    @track searchString;
    @track message;
    @api prepopulated = '';
    @api showDropdown = false;
    @api selectedObjectName;
    @api selectedFieldName;
    @track dataList=[];
    @track prodOptions=[];
    connectedCallback() { 
        if(this.prepopulated)
        {
            this.setMultipleOptions(this.prepopulated);
        }
    }

    filterOptions(event) {
        this.searchString = event.target.value;
        if( this.searchString && this.searchString.length > 0 ) {
            this.message = '';
            if(this.searchString.length >= this.minChar) {
                var flag = true;
                for(var i = 0; i < this.optionData.length; i++) {
                    if(this.optionData[i].label.toLowerCase().trim().startsWith(this.searchString.toLowerCase().trim())) {
                        this.optionData[i].isVisible = true;
                        flag = false;
                    } else {
                        this.optionData[i].isVisible = false;
                    }
                }
                if(flag) {
                    this.message = "No results found for '" + this.searchString + "'";
                }
            }
            this.showDropdown = true;
        } else {
            this.showDropdown = false;
        }
	}

    selectItem(event) {
        var selectedVal = event.currentTarget.dataset.id;  
        this.setSelectedItem(selectedVal);
        
    }

    setSelectedItem(selectedVal){ 
        if(selectedVal) {
            var count = 0;
            var options = JSON.parse(JSON.stringify(this.optionData));
            for(var i = 0; i < options.length; i++) {
                if(options[i].value === selectedVal) { 
                    if(this.multiSelect) { 
                        if(this.values.includes(options[i].value)) {
                            this.values.splice(this.values.indexOf(options[i].value), 1); 
                        } else { 
                            this.values.push(options[i].value);
                        } 
                        options[i].selected = options[i].selected ? false : true;   
                    } else {
                       
                        this.value = options[i].value;
                        this.searchString = options[i].label;
                        options[i].selected=options[i].selected ? false : true;  
                    }
                }
                if(options[i].selected) {
                    count++; 
                }
            } 
            this.optionData=[];
            this.optionData = options; 
            if(this.multiSelect)
                {this.searchString = count + ' Option(s) Selected';}
            if(this.multiSelect)
                {event.preventDefault();}
            else
                {this.showDropdown = false; }
            //--------------------------send data back
                var selectedCount=0;
                var selectedListData = [];
                for(var i = 0; i < this.optionData.length; i++) {
                    if(this.optionData[i].selected == true) {
                        selectedCount++;
                        selectedListData.push(this.optionData[i].value);
                    }
                }
                if(selectedCount>0){
                    this.searchString = selectedCount + ' Option(s) Selected';
                }else{
                    this.searchString ='Select';
                }  
            var key='1234';
            const selectedEvent = new CustomEvent("valuechanged", {
            detail: { selectedListData, key }
            });
            this.dispatchEvent(selectedEvent);
        } 
    }

    showOptions() {
        if(this.disabled == false && this.options) {
            this.message = '';
            this.searchString = '';
            var options = JSON.parse(JSON.stringify(this.optionData));
            for(var i = 0; i < options.length; i++) {
                options[i].isVisible = true;
            }
            if(options.length > 0) {
                this.showDropdown = true;
            }
            this.optionData = options;
        }
	}

    removePill(event) {
        var value = event.currentTarget.name;
        var count = 0;
        var options = JSON.parse(JSON.stringify(this.optionData));
        for(var i = 0; i < options.length; i++) {
            if(options[i].value === value) {
                options[i].selected = false;
                this.values.splice(this.values.indexOf(options[i].value), 1);
            }
            if(options[i].selected) {
                count++;
            }
        }
        this.optionData = options;
        ////////-------option select
        var selectedCount=0;
        var selectedListData = [];
        for(var i = 0; i < this.optionData.length; i++) {
            if(this.optionData[i].selected == true) {
                selectedCount++;
                selectedListData.push(this.optionData[i].value);
            }
        }
        if(selectedCount>0){
            this.searchString = selectedCount + ' Option(s) Selected';
        }else{
            this.searchString ='Select';
        }  
    var key='1234';
    const selectedEvent = new CustomEvent("valuechanged", {
    detail: { selectedListData, key }
    });
    this.dispatchEvent(selectedEvent);
    }

    blurEvent() {
        var selectedCount=0;
        var selectedListData = [];
        for(var i = 0; i < this.optionData.length; i++) {
            if(this.optionData[i].selected == true) {
                selectedCount++;
                selectedListData.push(this.optionData[i].value);
            }
        }
        if(selectedCount>0){
            this.searchString = selectedCount + ' Option(s) Selected';
        }else{
            this.searchString ='Select';
        }  
        
        this.showDropdown = false; 
         
    }

    @api setMultipleOptions(valStr){ 
        let valArr=valStr.split(","); 
        for(var i=0;i<valArr.length;i++){
               this.setSelectedItem(valArr[i]); 
        }
        
    }
}