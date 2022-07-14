import { LightningElement,api,track } from 'lwc';
export default class Aqb_multiLevelPicklist extends LightningElement {

    @api name='MultiLevel';
    @api label='MultiLevel';
    @api value='MultiLevel';
    @api placeholder='MultiLevel';
    @track listOptions=[];
    @api allOptions=[];


    @track selectedValueName ='';
    @track selectedValuelabel='';
    @api primaryObjectSelected='';
    @api currentsobjectAPIName='';
    @track confirmedSelectedOption={};


    connectedCallback() {
       var selectedObjectAPIName = this.primaryObjectSelected;
        this.currentsobjectAPIName = this.primaryObjectSelected;
          this.allOptions.forEach(currentItem => {
                   if(currentItem.ObjectAPIName==selectedObjectAPIName)
                   {
                       var fieldList = currentItem.fieldList;
                    
                       fieldList.forEach(field => { 
                            if(field.FieldType=='REFERENCE')
                            {
                                
                                var option = {};
                                if((field.FieldAPIName).includes('__c'))
                                {
                                    option.value =  field.FieldAPIName.replace('__c','__r.');
                                }
                                else{
                                       option.value =  field.FieldAPIName.replace('Id','.');
                                }
                                option.Type = field.FieldType;
                                option.isReference =false;
                            
                                if(field.ReferencedSObjectName)
                                {
                                   option.isReference =true;
                                   option.referenceName = field.ReferencedSObjectName;
                                }

                                option.label = (field.FieldLabel).replace(' ID','') + ' -> ';

                                this.listOptions.push(JSON.parse(JSON.stringify(option)));
                            }

                           
                       });
                        fieldList.forEach(field => { 
                            var option = {};
                            option.label = field.FieldLabel;
                            option.value =  field.FieldAPIName;
                            option.Type = field.FieldType;
                            option.isReference =false;

                            this.listOptions.push(JSON.parse(JSON.stringify(option)));
                           
                       });

                   }
                    
                });
    }

    handleValueChanges(event)
    {

        var localselectedValueName =   this.selectedValueName;
          var localselectedValuelabel =   this.selectedValuelabel;


        this.selectedValueName= localselectedValueName.slice(0,localselectedValueName.lastIndexOf('.')+1);
        if(localselectedValuelabel.lastIndexOf('-> ')==-1)
        {
            this.selectedValuelabel= '';
        }
        else{
        this.selectedValuelabel= localselectedValuelabel.slice(0,localselectedValuelabel.lastIndexOf('-> ')+3);
        }
        
        var valueSelected = event.target.value;
        this.selectedValueName=this.selectedValueName+valueSelected;
        
        var selectedOption ={};
         this.listOptions.forEach(currentItem => { 
                    if(currentItem.value==valueSelected)
                   {
                       selectedOption= currentItem;
                   }
        });

        this.selectedValuelabel=this.selectedValuelabel+selectedOption.label;
        
        if(selectedOption.isReference==true)
        {
        
        var selectedObjectAPIName = selectedOption.referenceName;
        this.currentsobjectAPIName= selectedObjectAPIName;
         this.listOptions=[];
                             var Backoption = {};
                            Backoption.label = '<--';
                            Backoption.value =  this.primaryObjectSelected;
                            this.listOptions.push(JSON.parse(JSON.stringify(Backoption)));
                            this.repopulateList(selectedObjectAPIName);
          
        }
        else{
            
           if(selectedOption.label=='<--')
           {
               
               this.listOptions=[];
                this.selectedValueName='';
                this.selectedValuelabel='';
               this.connectedCallback();
           }
           else{
                
                this.confirmedSelectedOption ={};
                this.confirmedSelectedOption.value=this.selectedValueName;
                this.confirmedSelectedOption.label=this.selectedValuelabel;
                this.confirmedSelectedOption.Type=selectedOption.Type;
                this.confirmedSelectedOption.currentsobjectAPIName = this.currentsobjectAPIName;
                //console.log(this.confirmedSelectedOption);
                var selctedString = JSON.stringify(this.confirmedSelectedOption);
                const selectedEvent = new CustomEvent('selected', {
                                                                 detail: { selctedString },
                                                                bubbles: true,
                                                                composed: true
                                                                }   
                                                    );
          
                
                this.dispatchEvent(selectedEvent);
           }
        }

    }


    repopulateList(selectedObjectAPIName){
            this.allOptions.forEach(currentItem => {
                   if(currentItem.ObjectAPIName==selectedObjectAPIName)
                   {
                       var fieldList = currentItem.fieldList;
                    
                       fieldList.forEach(field => { 
                            if(field.FieldType=='REFERENCE')
                            {
                                var option = {};
                                 if((field.FieldAPIName).includes('__c'))
                                {
                                    option.value =  field.FieldAPIName.replace('__c','__r.');
                                }
                                else{
                                       option.value =  field.FieldAPIName.replace('Id','.');
                                }
                                option.Type = field.FieldType;
                                option.isReference =false;
                            
                                if(field.ReferencedSObjectName)
                                {
                                   option.isReference =true;
                                   option.referenceName = field.ReferencedSObjectName;
                                }

                                option.label = (field.FieldLabel).replace(' ID','') + ' -> ';

                                this.listOptions.push(JSON.parse(JSON.stringify(option)));
                            }

                           
                       });
                        fieldList.forEach(field => { 
                            var option = {};
                            option.label = field.FieldLabel;
                            option.value =  field.FieldAPIName;
                            option.Type = field.FieldType;
                           
                           

                            this.listOptions.push(JSON.parse(JSON.stringify(option)));
                           
                       });

                   }
                    
                });
    }

   
}