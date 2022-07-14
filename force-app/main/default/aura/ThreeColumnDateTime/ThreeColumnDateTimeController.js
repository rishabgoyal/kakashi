({
    onChangeDate : function(component, event, helper) {
        
        var whichOne = event.getSource().getLocalId();
        // console.log(whichOne);
        /*   if(whichOne=='dateinput')
        {
            var inputdate=component.find("dateinput");
            console.log(inputdate.get("v.value"));
            var qdate = inputdate.get("v.value");
            var qday = qdate.substring(0, 4);
            var qmonth = qdate.substring(5, 7);
            var qyear = qdate.substring(8, 10);
            //console.log(qday+' '+qmonth+' '+qyear);
            
        }
		if(whichOne=='inputHours')
        {
            var qday = component.get("v.selectedHour"));
        }
		if(whichOne=='inputMinutes')
        {
            console.log(component.get("v.selectedMinute"));
        }
		if(whichOne=='inputAMPM')
        {
            console.log(component.get("v.selectedAMPM"));
        }*/
        var vday='00';
        var vmonth='00';
        var vyear='0000';            
        
        var inputdate=component.find("dateinput");
        //console.log(inputdate.get("v.value"));
        var qdate = inputdate.get("v.value");
        if(qdate!=null)
        {    
            var qyear = qdate.substring(0, 4);
            var qmonth = qdate.substring(5, 7);
            var qday = qdate.substring(8, 10);
            vyear=qyear;
            vday=qday;
            vmonth=qmonth;
            
        }
        // console.log(qday+' '+qmonth+' '+qyear);
        var qhour = component.get("v.selectedHour");
        var qmin = component.get("v.selectedMinute");
        var qampm = component.get("v.selectedAMPM");
        // console.log(qhour+' '+qmin+' '+qampm );
        var  vhour='00';
        var  vmin='00';
        
        if(qhour!='')
        {
            var vhour=qhour;
        }
        else{
            qhour='00';	
        }
        if(qmin!='')
        {
            var vmin=qmin;
        }
        if(qampm!='')
        {
            if(qampm=='PM')
            {
                if(vhour!='12')
                {
                    vhour = parseInt(vhour)+12;
                    
                }
            }
            else{
                if(vhour=='12')
                {
                    vhour='00';
                }
            }
        }
        
        var d = new Date(vyear, parseInt(vmonth)-1 , vday, vhour, vmin, '00', '0');
        console.log(d)
        
        console.log('Year: '+vyear);
        console.log('Month: '+vmonth);
        console.log('Day: '+vday );
        console.log('Hour: '+qhour);
        console.log('Min: '+vmin);
        console.log('AM/PM: '+qampm );
        
        var mdate=component.get("v.selectedDate");
        var mhour=component.get("v.selectedHour");
        var mminute=component.get("v.selectedMinute");
        var mampm=component.get("v.selectedAMPM");
        
         if(mdate==null||mhour==''||mminute==''||mampm==''||mdate==''){
            if(mdate==null||mdate=='')
            {
                var cmpTarget = component.find('dateinput');
               // $A.util.addClass(cmpTarget, 'slds-has-error');
                
            }else{
                var cmpTarget = component.find('dateinput');
                $A.util.removeClass(cmpTarget, 'slds-has-error');
            }
            if(mhour=='')
            {
                var cmpTarget = component.find('inputHours');
                //$A.util.addClass(cmpTarget, 'slds-has-error');
                
            }else{
                var cmpTarget = component.find('inputHours');
                $A.util.removeClass(cmpTarget, 'slds-has-error');
            }
            if(mminute=='')
            {
                var cmpTarget = component.find('inputMinutes');
               // $A.util.addClass(cmpTarget, 'slds-has-error');
                
            }else{
                var cmpTarget = component.find('inputMinutes');
                $A.util.removeClass(cmpTarget, 'slds-has-error');
            }
            if(mampm=='')
            {
                var cmpTarget = component.find('inputAMPM');
                //$A.util.addClass(cmpTarget, 'slds-has-error');
                
            }else{
                var cmpTarget = component.find('inputAMPM');
                $A.util.removeClass(cmpTarget, 'slds-has-error');
            }
            /*var cmpTarget = cmp.find('changeIt');
            $A.util.removeClass(cmpTarget, 'changeMe');*/
            component.set("v.showErrorMessage",true);
        }
        else{
            var cmpTarget = component.find('dateinput');
            $A.util.removeClass(cmpTarget, 'slds-has-error');
            var cmpTarget = component.find('inputHours');
            $A.util.removeClass(cmpTarget, 'slds-has-error');
            var cmpTarget = component.find('inputMinutes');
            $A.util.removeClass(cmpTarget, 'slds-has-error');
            var cmpTarget = component.find('inputAMPM');
            $A.util.removeClass(cmpTarget, 'slds-has-error');
            component.set("v.showErrorMessage",false);
        }
    },
    valdiatedate : function(component, event, helper) {
        var mdate=component.get("v.selectedDate");
        var mhour=component.get("v.selectedHour");
        var mminute=component.get("v.selectedMinute");
        var mampm=component.get("v.selectedAMPM");
        console.log(component.get("v.selectedDate"));
        console.log(component.get("v.selectedHour"));
        console.log(component.get("v.selectedMinute"));
        console.log(component.get("v.selectedAMPM"));
        if(mdate==null||mhour==''||mminute==''||mampm==''||mdate==''){
            if(mdate==null||mdate=='')
            {
                var cmpTarget = component.find('dateinput');
                $A.util.addClass(cmpTarget, 'slds-has-error');
                
            }else{
                var cmpTarget = component.find('dateinput');
                $A.util.removeClass(cmpTarget, 'slds-has-error');
            }
            if(mhour=='')
            {
                var cmpTarget = component.find('inputHours');
                $A.util.addClass(cmpTarget, 'slds-has-error');
                
            }else{
                var cmpTarget = component.find('inputHours');
                $A.util.removeClass(cmpTarget, 'slds-has-error');
            }
            if(mminute=='')
            {
                var cmpTarget = component.find('inputMinutes');
                $A.util.addClass(cmpTarget, 'slds-has-error');
                
            }else{
                var cmpTarget = component.find('inputMinutes');
                $A.util.removeClass(cmpTarget, 'slds-has-error');
            }
            if(mampm=='')
            {
                var cmpTarget = component.find('inputAMPM');
                $A.util.addClass(cmpTarget, 'slds-has-error');
                
            }else{
                var cmpTarget = component.find('inputAMPM');
                $A.util.removeClass(cmpTarget, 'slds-has-error');
            }
            /*var cmpTarget = cmp.find('changeIt');
            $A.util.removeClass(cmpTarget, 'changeMe');*/
            component.set("v.showErrorMessage",true);
        }
        else{
            var cmpTarget = component.find('dateinput');
            $A.util.removeClass(cmpTarget, 'slds-has-error');
            var cmpTarget = component.find('inputHours');
            $A.util.removeClass(cmpTarget, 'slds-has-error');
            var cmpTarget = component.find('inputMinutes');
            $A.util.removeClass(cmpTarget, 'slds-has-error');
            var cmpTarget = component.find('inputAMPM');
            $A.util.removeClass(cmpTarget, 'slds-has-error');
            component.set("v.showErrorMessage",false);
        }
    }
})