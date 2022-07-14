({
    initial : function(component) {
        
        var action = component.get("c.getCIWSummary");
        action.setParams({
            
            AppId : 'a5Kr00000004f2BEAQ'
            
        });
        
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                console.log(response.getReturnValue());
                component.set("v.CIWList",response.getReturnValue().summaries);
                component.set("v.fstatement",response.getReturnValue().fstatement);
                component.set("v.investDepSch",response.getReturnValue().investDepSch);
                var pexpense19 =response.getReturnValue().investDepSch.RD_RDAE_Investment_2019__c;
                var pexpense20 =response.getReturnValue().investDepSch.RD_RDAE_Investment_2020__c;
                var pexpense21 =response.getReturnValue().investDepSch.RD_RDAE_Investment_2021__c;
                var pexpense22 =response.getReturnValue().investDepSch.RD_RDAE_Investment_2022__c;
                var pexpense23 =response.getReturnValue().investDepSch.RD_RDAE_Investment_2023__c;
                var summary=response.getReturnValue().summaries[1];
                var RDapp= response.getReturnValue().summaries[1].RD_RDAE_Application__r;
                var fundingcategory = RDapp.RD_RDAE_Funding_Category_Requested__c;
                var TotalPC = RDapp.RD_RDAE_Grant_Amount_Requested__c + RDapp.RD_RDAE_Loan_Amount_Requested__c +RDapp.RD_RDAE_Matching_Funds__c +RDapp.RD_RDAE_Other_Funds__c ;
                component.set("v.TotalPC",TotalPC);
                
                var fstatement= response.getReturnValue().fstatement;
                
                
                
                var  y1t=summary.RD_RDAE_Total_Investment_Cost_2019__c ;
                var  y2t=summary.RD_RDAE_Total_Investment_Cost_2020__c ;  
                var  y3t=summary.RD_RDAE_Total_Investment_Cost_2021__c ;   
                var  y4t=summary.RD_RDAE_Total_Investment_Cost_2022__c ;
                var  y5t=summary.RD_RDAE_Total_Investment_Cost_2023__c ;
                if( typeof y1t==='undefined' || y1t==''){
                    y1t=0;
                }
                
                if( typeof y2t==='undefined' || y2t==''){
                    y2t=0;
                }
                
                if( typeof y3t==='undefined' || y3t==''){
                    y3t=0;
                }
                
                if( typeof y4t==='undefined' || y4t==''){
                    y4t=0;
                }
                
                if( typeof y5t==='undefined' || y5t==''){
                    y5t=0;
                }
                
                
                var total = y1t + y2t + y3t + y4t + y5t;
                // var total= summary.RD_RDAE_Total_Investment_Cost_2019__c +summary.RD_RDAE_Total_Investment_Cost_2020__c +summary.RD_RDAE_Total_Investment_Cost_2021__c +summary.RD_RDAE_Total_Investment_Cost_2022__c +summary.RD_RDAE_Total_Investment_Cost_2023__c ;
                if(fundingcategory=='100 Percent Loan'){
                    fstatement[3].RD_RDAE_2019__c=0;
                    fstatement[1].RD_RDAE_2019__c=pexpense19;
                    fstatement[2].RD_RDAE_2019__c=y1t-fstatement[1].RD_RDAE_2019__c-fstatement[0].RD_RDAE_2019__c;
                    
                    fstatement[3].RD_RDAE_2020__c=0;
                    fstatement[1].RD_RDAE_2020__c=pexpense20;
                    fstatement[2].RD_RDAE_2020__c=y2t-fstatement[1].RD_RDAE_2020__c-fstatement[0].RD_RDAE_2020__c;
                    
                    fstatement[3].RD_RDAE_2021__c=0;
                    fstatement[1].RD_RDAE_2021__c=pexpense21;
                    fstatement[2].RD_RDAE_2021__c=y3t-fstatement[1].RD_RDAE_2021__c-fstatement[0].RD_RDAE_2021__c;   
                    
                    fstatement[3].RD_RDAE_2022__c=0;
                    fstatement[1].RD_RDAE_2022__c=pexpense22;
                    fstatement[2].RD_RDAE_2022__c=y4t-fstatement[1].RD_RDAE_2022__c-fstatement[0].RD_RDAE_2022__c;
                    
                    
                    fstatement[3].RD_RDAE_2023__c=0;
                    fstatement[1].RD_RDAE_2023__c=pexpense23;
                    fstatement[2].RD_RDAE_2023__c=y5t-fstatement[1].RD_RDAE_2023__c-fstatement[0].RD_RDAE_2023__c;  
                    
                    
                    if(RDapp.RD_RDAE_Matching_Funds__c<statement[2].RD_RDAE_2019__c){
						statement[2].RD_RDAE_2019__c=RDapp.RD_RDAE_Matching_Funds__c;
                        statement[2].RD_RDAE_2020__c=0;
                        statement[2].RD_RDAE_2021__c=0;
                        statement[2].RD_RDAE_2022__c=0;
                        statement[2].RD_RDAE_2023__c=0;
                    }

					
                    if(RDapp.RD_RDAE_Matching_Funds__c-statement[2].RD_RDAE_2019__c<statement[2].RD_RDAE_2020__c){
						statement[2].RD_RDAE_2020__c=RDapp.RD_RDAE_Matching_Funds__c-statement[2].RD_RDAE_2019__c;
                        statement[2].RD_RDAE_2021__c=0;
                        statement[2].RD_RDAE_2022__c=0;
                        statement[2].RD_RDAE_2023__c=0;
                    }

					
                    if(RDapp.RD_RDAE_Matching_Funds__c-statement[2].RD_RDAE_2019__c-statement[2].RD_RDAE_2020__c<statement[2].RD_RDAE_2021__c){
                        statement[2].RD_RDAE_2021__c=RDapp.RD_RDAE_Matching_Funds__c-statement[2].RD_RDAE_2019__c-statement[2].RD_RDAE_2020__c;
                        statement[2].RD_RDAE_2022__c=0;
                        statement[2].RD_RDAE_2023__c=0;
                    }
					
                    
                    if(RDapp.RD_RDAE_Matching_Funds__c-statement[2].RD_RDAE_2019__c-statement[2].RD_RDAE_2020__c>statement[2].RD_RDAE_2020__c){
                   	    statement[2].RD_RDAE_2022__c=0;
                        statement[2].RD_RDAE_2023__c=0;
                    }
                    
                    
                    if(RDapp.RD_RDAE_Matching_Funds__c>statement[2].RD_RDAE_2019__c){
						statement[2].RD_RDAE_2019__c=RDapp.RD_RDAE_Matching_Funds__c;
                        statement[2].RD_RDAE_2020__c=0;
                        statement[2].RD_RDAE_2021__c=0;
                        statement[2].RD_RDAE_2022__c=0;
                        statement[2].RD_RDAE_2023__c=0;
                    }
                    
                    
                    
                    
                    component.set("v.tmaDisabled",true);
                    component.set("v.tgaDisabled",true);
                    component.set("v.TMALabel","Total Match Amount");
                    
                }
                if(fundingcategory=='100 Percent Grant'){
                    //  PFSA - Pre App Expenses - Other Funds - TMA + Pre App Expense                  
                    
                    fstatement[2].RD_RDAE_2019__c=0;	
                    fstatement[1].RD_RDAE_2019__c=y1t - pexpense19 -fstatement[0].RD_RDAE_2019__c-fstatement[3].RD_RDAE_2019__c+pexpense19;
                    
                    fstatement[2].RD_RDAE_2020__c=0;	
                    fstatement[1].RD_RDAE_2020__c=y2t-pexpense20-fstatement[0].RD_RDAE_2020__c-fstatement[3].RD_RDAE_2020__c+pexpense20;
                    
                    fstatement[2].RD_RDAE_2021__c=0;	
                    fstatement[1].RD_RDAE_2021__c=y3t-pexpense21-fstatement[0].RD_RDAE_2021__c-fstatement[3].RD_RDAE_2021__c+pexpense21;   
                    
                    fstatement[2].RD_RDAE_2022__c=0;	
                    fstatement[1].RD_RDAE_2022__c=y4t-pexpense22-fstatement[0].RD_RDAE_2022__c-fstatement[3].RD_RDAE_2022__c+pexpense22;
                    
                    fstatement[2].RD_RDAE_2023__c=0;	
                    fstatement[1].RD_RDAE_2023__c=y5t-pexpense23-fstatement[0].RD_RDAE_2023__c-fstatement[3].RD_RDAE_2023__c+pexpense23;  
                    
                    component.set("v.tlaDisabled",true);
                    component.set("v.tmaDisabled",true);
                    component.set("v.tgaDisabled",true);
                    
                    component.set("v.TMALabel","Total Match Amount");
                }
                if(fundingcategory=='50 Percent Loan and 50 Percent Grant'){
                    //   fstatement[1].RD_RDAE_2019__c=pexpense19;
                    //   
                    //   PFSA-Pre app exp- OF - CSA - TLA = TGA
                    fstatement[1].RD_RDAE_2019__c=y1t-pexpense19-fstatement[0].RD_RDAE_2019__c-fstatement[3].RD_RDAE_2019__c-fstatement[2].RD_RDAE_2019__c;
                    
                    // fstatement[1].RD_RDAE_2020__c=pexpense20;
                    fstatement[1].RD_RDAE_2020__c=y2t-pexpense20-fstatement[0].RD_RDAE_2020__c-fstatement[3].RD_RDAE_2020__c-fstatement[2].RD_RDAE_2020__c;
                    
                    //  fstatement[1].RD_RDAE_2021__c=pexpense21;
                    fstatement[1].RD_RDAE_2021__c=y3t-pexpense21-fstatement[0].RD_RDAE_2021__c-fstatement[3].RD_RDAE_2021__c-fstatement[2].RD_RDAE_2021__c;   
                    
                    //   fstatement[1].RD_RDAE_2022__c=pexpense22;
                    fstatement[1].RD_RDAE_2022__c=y4t-pexpense22-fstatement[0].RD_RDAE_2022__c-fstatement[3].RD_RDAE_2022__c-fstatement[2].RD_RDAE_2022__c;
                    
                    //  fstatement[1].RD_RDAE_2023__c=pexpense23;
                    fstatement[1].RD_RDAE_2023__c=y5t-pexpense23-fstatement[0].RD_RDAE_2023__c-fstatement[3].RD_RDAE_2023__c-fstatement[2].RD_RDAE_2023__c;  
                    
                    component.set("v.tgaDisabled",true);
                }
                
                component.set("v.fstatement",fstatement);
                
                component.set("v.OFT",fstatement[0].RD_RDAE_Total__c);
                component.set("v.TGT",fstatement[1].RD_RDAE_Total__c);
                component.set("v.TLT",fstatement[2].RD_RDAE_Total__c);
                component.set("v.TMT",fstatement[3].RD_RDAE_Total__c);
                
                component.set("v.Y1T",y1t);
                component.set("v.Y2T",y2t);
                component.set("v.Y3T",y3t);		
                component.set("v.Y4T",y4t);
                component.set("v.Y5T",y5t);
                
                
                component.set("v.GTotal",total);
                
                component.set("v.GSubTotal",total);
                
            }
            else if (state === "INCOMPLETE") {
            }
                else if (state === "ERROR") {
                    var errors = response.getError();
                    if (errors) {
                        if (errors[0] && errors[0].message) {
                            console.log("Error message: " + 
                                        errors[0].message);
                        }
                    } else {
                        console.log("Unknown error");
                    }
                }
        });
        
        $A.enqueueAction(action);
    }
})