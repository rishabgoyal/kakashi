({
    update : function(component, event, helper) {
        console.log("update fired");
        
        var TMAY1 =component.get("v.TMAY1" );
        var TMAY2 =component.get("v.TMAY2" );
        var TMAY3 =component.get("v.TMAY3" );
        var TMAY4 =component.get("v.TMAY4" );
        var TMAY5 =component.get("v.TMAY5" );
        var TMT  =component.get("v.TMT" );
        
        
        
        var TLAY1   =component.get("v.TLAY1" );
        var TLAY2   =component.get("v.TLAY2" );
        var TLAY3   =component.get("v.TLAY3" );
        var TLAY4   =component.get("v.TLAY4" );
        var TLAY5   =component.get("v.TLAY5" );
        var TLT   =component.get("v.TLT" );
        
        var TGAY1   =component.get("v.TGAY1" );
        var TGAY2   =component.get("v.TGAY2" );
        var TGAY3  =component.get("v.TGAY3" );
        var TGAY4   =component.get("v.TGAY4" );
        var TGAY5   =component.get("v.TGAY5" );
        var TGT   =component.get("v.TGT" );
        
        var OFY1   =component.get("v.OFY1" );
        var OFY2   =component.get("v.OFY2" );
        var OFY3   =component.get("v.OFY3" );
        var OFY4   =component.get("v.OFY4" );
        var OFY5   =component.get("v.OFY5" );
        var OFT   =component.get("v.OFT" );
        
        
        var GTotal   =component.get("v.GTotal" );
        var Y1T  =component.get("v.Y1T" );
        var Y2T   =component.get("v.Y2T" );
        var Y3T   =component.get("v.Y3T" );
        var Y4T   =component.get("v.Y4T" );
        var Y5T   =component.get("v.Y5T" );
        
        
        if( typeof TMAY1==='undefined'){
            TMAY1='0';}
        if( typeof TMAY2==='undefined'){
            TMAY2='0';}
        if( typeof TMAY3==='undefined'){
            TMAY3='0';}
        if( typeof TMAY4==='undefined'){
            TMAY4='0';}
        if( typeof TMAY5==='undefined'){
            TMAY5='0';}
        console.log(TLAY1+','+TLAY2+','+TLAY3+','+TLAY4+','+TLAY5)
        if( typeof TLAY1==='undefined'){
            TLAY1='0';}
        if( typeof TLAY2==='undefined'){
            TLAY2='0';}
        if( typeof TLAY3==='undefined'){
            TLAY3='0';}
        if( typeof TLAY4==='undefined'){
            TLAY4='0';}
        if( typeof TLAY5==='undefined'){
            TLAY5='0';}
        if( typeof TGAY1==='undefined'){
            TGAY1='0';}
        if( typeof TGAY2==='undefined'){
            TGAY2='0';}
        if( typeof TGAY3==='undefined'){
            TGAY3='0';}
        if( typeof TGAY4==='undefined'){
            TGAY4='0';}
        if( typeof TGAY5==='undefined'){
            TGAY5='0';}
        if( typeof OFY1==='undefined'){
            OFY1='0';}
        if( typeof OFY2==='undefined'){
            OFY2='0';}
        if( typeof OFY3==='undefined'){
            OFY3='0';}
        if( typeof OFY4==='undefined'){
            OFY4='0';}
        if( typeof OFY5==='undefined'){
            OFY5='0';}
        
        TMT = parseInt(TMAY1) + parseInt(TMAY2) + parseInt(TMAY3) + parseInt(TMAY4) + parseInt(TMAY5);
        
        TLT = parseInt(TLAY1) + parseInt(TLAY2) + parseInt(TLAY3) + parseInt(TLAY4) + parseInt(TLAY5);
        
        TGT = parseInt(TGAY1) + parseInt(TGAY2) + parseInt(TGAY3) + parseInt(TGAY4) + parseInt(TGAY5);
        
        OFT = parseInt(OFY1) + parseInt(OFY2) + parseInt(OFY3) + parseInt(OFY4) + parseInt(OFY5);
        
        GTotal = parseInt(TMT) + parseInt(TLT) + parseInt(TGT) + parseInt(OFT) ;
        
        Y1T = parseInt(TMAY1) + parseInt(TLAY1) + parseInt(TGAY1) + parseInt(OFY1);
        Y2T = parseInt(TMAY2) + parseInt(TLAY2) + parseInt(TGAY2) + parseInt(OFY2);
        Y3T = parseInt(TMAY3) + parseInt(TLAY3) + parseInt(TGAY3) + parseInt(OFY3);
        Y4T = parseInt(TMAY4) + parseInt(TLAY4) + parseInt(TGAY4) + parseInt(OFY4);
        Y5T = parseInt(TMAY5) + parseInt(TLAY5) + parseInt(TGAY5) + parseInt(OFY5);
        
        
        component.set("v.TMT",TMT );
        component.set("v.TLT",TLT );
        component.set("v.TGT",TGT );
        component.set("v.OFT",OFT );
        component.set("v.GTotal",GTotal );
        component.set("v.Y1T",Y1T );
        component.set("v.Y2T",Y2T );
        component.set("v.Y3T",Y3T );
        component.set("v.Y4T",Y4T );
        component.set("v.Y5T",Y5T );
        
        
    }
})