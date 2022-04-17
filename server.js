const express=require('express');
const app=express();
const mysql=require('mysql');
const cors=require('cors');
const fs=require('fs');
const path=require('path');
const moment=require('moment');


app.use(cors({origin:"http://127.0.0.1:1500"}));
app.use(express.json());

// const pool = mysql.createPool({
//     host: 'localhost',
//     user: 'jamal',
//     password: '123456',
//     database: 'qcms'
//   });

  const pool = mysql.createPool({
    host: '139.162.141.183',
    user: 'tcemoroc_opsmgr',
    password: 'Khadija1978',
    database: 'tcemoroc_qcms'
  });
//////////////////////////////
  app.get('/api/getQCM/:id', (req,res)=>{
   
    const sqlGet=`SELECT * FROM flight WHERE ID = ${req.params.id} & QCM_OK=1` ;
    pool.query(sqlGet,(err,result)=>{res.send(result);console.log(result)} )
});
////////////////////

/////////////////////
app.get('/api/get/:id', (req,res)=>{   
  const sqlGet=`SELECT * FROM flight WHERE ID = ${req.params.id}` ;
  pool.query(sqlGet,(err,result)=>{res.send(result);console.log(result)} )
});
////////////////////
app.get('/api/get', (req,res)=>{

  // console.log('req.body.ID=====',req.body.ID)
    const sqlGet="SELECT * FROM flight where QCM_OK=1";
    pool.query(sqlGet,(err,result)=>{
    result.forEach( record=> {
      console.log('record.date',record.date)
      const x=`${record.date}`;
      const arv_dte=`${record.ARV_DTE}`;
      const received_at=`${record.RECEIVED_AT}`;
      const date_sup=`${record.DATE_SUP}`;

      const x_act=`${record.ACT_DPT_DATE}`;
      const arv_dte_act=`${record.ACT_ARV_DATE}`;
///////////////////////////////////////

      console.log('indexOf',x.indexOf('1899'))

      if (x.indexOf('1899')==11){record.date="Invalid date"}
      else {record.date=moment(record.date).format("YYYY-MM-DD")}

      if (arv_dte.indexOf('1899')==11){record.ARV_DTE="Invalid date"}
      else {record.ARV_DTE=moment(record.ARV_DTE).format("YYYY-MM-DD")}

      if (received_at.indexOf('1899')==11){record.RECEIVED_AT="Invalid date"}
      else {record.RECEIVED_AT=moment(record.RECEIVED_AT).format("MMM Do YY")}

      if (date_sup.indexOf('1899')==11){record.DATE_SUP="Invalid date"}
      else {record.DATE_SUP=moment(record.DATE_SUP).format("MMM Do YY")}

      if (x_act.indexOf('1899')==11){record.ACT_DPT_DATE="Invalid date"}
      else {record.ACT_DPT_DATE=moment(record.ACT_DPT_DATE).format("YYYY-MM-DD")}

      if (arv_dte_act.indexOf('1899')==11){record.ACT_ARV_DATE="Invalid date"}
      else {record.ACT_ARV_DATE=moment(record.ACT_ARV_DATE).format("YYYY-MM-DD")}
    
    } )
    res.send(result);
    // console.log('GPU TIME',result[8].GPU_TIME);
    })
});

app.put('/api/put0', (req,res)=>{
  
  // let Handling,Concession,BasicFee,Concession_handler; 
   
   
   let CIQ_Coordination=0;
   let Disb=0;
   let Fast_Track=0;
   let {ACT_ARV_DATE,ACT_DPT_DATE,Flt_nbr,Registration,Station,Trip,date,MTD_PAY,ACFT,MTOW,TTL_CREW,NAT_FLT,ARV_DTE,PROV,DEST,PAX_IN,PAX_OUT,CGO_IN,CGO_OUT,EA,AA,ED,AD,PKG,DLY_CODE,DLY_TIME,DLY_REASON,INF_IN_OUT,LIGHTING,COMMENT1,COMMENT2,COMMENT3,COMMENT4,COMMENT5,COMMENT6,COMMENT7,COMMENT8,COMMENT9,COMMENT10,COMMENT11,COMMENT12,COMMENT13,PUSH_BACK,HANDLER,DSK_USED,CHK_IN_OPEN,CHK_IN_CLOSE,BOARD_OPEN,BOARD_CLOSE,DOORS_SHUT,COMMENT_CHK_IN,COMMENT_BOARD,REF_TRIP,INFO_GIVEN_PAX,PAX_REACTION,EXP_INCURRED,OTHER_GSE,OPERATOR,PROVIDER,COMMENT_CLEAN,COMMENT_RAMP,COMMENT_CGO,COMMENT_CATERING,EXP_AUTH_BY,COMMENT_CREW,CURRENCY,WO_HNDL_INV,APT_FEES_INV,APT_FEES_AMT,APT_FEES_PAY,APT_FEES_RMK,TASPT_INV,TASPT_AMT,TASPT_PAY,TASPT_RMK,VIP_ARV_INV,VIP_ARV_RMK,VIP_DEP_INV,VIP_DEP_RMK,CATERING_INV,CATERING_AMT,CATERING_PAY,CATERING_RMK,CATERING_PRO,CREW_TRS_INV,CREW_TRS_AMT,CREW_TRS_PAY,CREW_TRS_RMK,CREW_TRS_PRO,PAX_TRS_INV,PAX_TRS_AMT,PAX_TRS_PAY,PAX_TRS_RMK,PAX_TRS_PRO,CREW_HTC_INV,CREW_HTC_AMT,CREW_HTC_PAY,CREW_HTC_RMK,CREW_HTC_PRO,PAX_HTC_INV,PAX_HTC_AMT,PAX_HTC_PAY,PAX_HTC_RMK,PAX_HTC_PRO,FUEL_INV,FUEL_AMT,FUEL_PAY,FUEL_RMK,FUEL_PRO,CGO_INV,CGO_AMT,CGO_PAY,CGO_RMK,CGO_PRO,TECH_INT_INV,TECH_INT_AMT,TECH_INT_PAY,TECH_INT_RMK,TECH_INT_PRO,LND_PMT_AMT,LND_PMT_RMK,TRVL_EXP_AMT,TRVL_EXP_RMK,PORTERS_AMT,PORTERS_RMK,PRNT_PAGES_AMT,PRNT_PAGES_RMK,PHONE_COM_AMT,PHONE_COM_RMK,OTHER_CHG1,OTHER_CHG1_INV,OTHER_CHG1_AMT,OTHER_CHG1_PAY,OTHER_CHG1_RMK,OTHER_CHG1_PRO,OTHER_CHG2,OTHER_CHG2_INV,OTHER_CHG2_AMT,OTHER_CHG2_PAY,OTHER_CHG2_RMK,OTHER_CHG2_PRO,SUPERVISION_ARV_BY,APPROVED_BY,RECEIVED_AT,SUP_CHARGE_NOTE_AMT,SUP_CHARGE_NOTE_INV,SUP_CHARGE_NOTE_RMK,EXCESS_BAG,VERSION,MOTIF,DATE_SUP,TRS_APT_INV,TRS_APT_PRO,TRS_APT_PAY,TRS_APT_AMT,TRS_APT_RMK,SUPERVISION_DEP_BY,GPU,GPU_TIME,ASU,flight_number_arv,PROVIDER_CODE,OTHER_CHG3,OTHER_CHG3_INV,OTHER_CHG3_AMT,OTHER_CHG3_PAY,OTHER_CHG3_RMK,OTHER_CHG3_PRO,OTHER_CHG4,OTHER_CHG4_INV,OTHER_CHG4_AMT,OTHER_CHG4_PAY,OTHER_CHG4_RMK,OTHER_CHG4_PRO,CORVER_BY,CUTE_INV,CUTE_AMT,CUTE_PAY,CUTE_RMK,AMBU_NBR,WCH_NBR,UMNR_NBR,FAE_LINK,APT_FEES_LINK,CATERING_LINK,APT_TRANS_LINK,CREW_TRANS_LINK,PAX_TRANS_LINK,FUEL_LINK,CREW_HOTAC_LINK,PAX_HOTAC_LINK,CGO_FEES_LINK,TECH_INTER_LINK,FACTURETTES_LINK,TASPT_LINK,CUTE_LINK,QSR_LINK,ROJ_WO_LINK,IMOC_FORM_LINK,IMOC_HDLG_LINK,Service_Type,OTHER_CHG5,OTHER_CHG5_INV,OTHER_CHG5_AMT,OTHER_CHG5_PAY,OTHER_CHG5_RMK,OTHER_CHG5_PRO,MEDICAL_INV,MEDICAL_AMT,MEDICAL_PAY,MEDICAL_RMK,MEDICAL_PRO,TOWING,QCM_REF,FLIGHT_ID,IS_FAST_TRACK,IS_FAST_TRACK_RMK,IS_FAST_TRACK_INV,CHECKED_ITEMS_RATE,VIP_ARV_PAX_NBR,VIP_DPT_PAX_NBR,JETEX_RAMP_ARV_NBR,JETEX_RAMP_DPT_NBR}=req.body 
     const COMMENT=`1-${COMMENT1} \n 2-${COMMENT2} \n 3-${COMMENT3} \n 4-${COMMENT4} \n 5-${COMMENT5} \n 6-${COMMENT6} \n 7-${COMMENT7} \n 8-${COMMENT8} \n 9-${COMMENT9} \n 10${COMMENT10} \n 11-${COMMENT11} \n 12-${COMMENT12} \n 13-${COMMENT13}`
    let M= MTOW;

    
   console.log("typeof(date)")
    if (typeof(date)=='string'){
   let Ar= date.split('/');
  
   let AanneeID=Ar[2];
   let AmoisID=+Ar[1]; AmoisID<10 ? AmoisID="0"+AmoisID : AmoisID;
   let AjourID=+Ar[0]; AjourID<10 ? AjourID="0"+AjourID : AjourID;
   
   AanneeID.length==4 ? AanneeID : AanneeID="20"+AanneeID; 
   date=AanneeID+"-"+AmoisID+"-"+AjourID;
   }
   if (typeof(ARV_DTE)=='string'){
   let Br= ARV_DTE.split('/');
  
   let BanneeID=Br[2];
   let BmoisID=+Br[1];  BmoisID<10 ? BmoisID="0"+BmoisID : BmoisID;
   let BjourID=+Br[0];  BjourID<10 ? BjourID="0"+BjourID : BjourID;
   
   BanneeID.length==4 ? BanneeID : BanneeID="20"+BanneeID
   ARV_DTE=BanneeID+"-"+BmoisID+"-"+BjourID;
   }
   

if (typeof(date)=='number'){
  var Timestamp = Math.round((date-25569)*86400*1000)
  var date2 = moment(new Date(Timestamp)); //Pass in unix timestamp instead of Excel date
  console.log('date2',date2);
  date = date2.format('YYYY-MM-DD');
  DATE=date2.format('DD-MMM')
} 
    /////////////////////week-end //

       var givenDate=new Date(date);
    console.log('givenDate',givenDate);
    var currentDay = givenDate.getDay();
    var dateIsInWeekend = (currentDay === 6) || (currentDay === 0);
    if(dateIsInWeekend==true){
      console.log("The given date "+givenDate+" is a Weekend");
    } else {
      console.log("The given date " +givenDate+"is a not a Weekend");
    }
    /////////////////////////////////// end week-end
   
    
    
  
   /////// ARV_dte
     if (typeof(ARV_DTE)=='number'){
      var Timestamp_ARV_DTE = Math.round((ARV_DTE-25569)*86400*1000)
   
      var ARV_DTE2 = moment(new Date(Timestamp_ARV_DTE)); //Pass in unix timestamp instead of Excel date
      
      ARV_DTE = ARV_DTE2.format('YYYY-MM-DD');
     }   
     
     if (typeof(ACT_DPT_DATE)=='number'){
      var Timestamp_ACT_DPT_DATE = Math.round((ACT_DPT_DATE-25569)*86400*1000)
   
      var ACT_DPT_DATE2 = moment(new Date(Timestamp_ACT_DPT_DATE)); //Pass in unix timestamp instead of Excel date
      
      ACT_DPT_DATE = ACT_DPT_DATE2.format('YYYY-MM-DD');
     } 

 
      
       ///////// RECEIVED_AT
       if (typeof(RECEIVED_AT)=='number'){
        var Timestamp_RECEIVED_AT = Math.round((RECEIVED_AT-25569)*86400*1000)
        
        var RECEIVED_AT2 = moment(new Date(Timestamp_RECEIVED_AT)); //Pass in unix timestamp instead of Excel date
        
        RECEIVED_AT = RECEIVED_AT2.format('YYYY-MM-DD');
       console.log('date',RECEIVED_AT);
        } 

      //////// 
          ///////// DATE_SUP
       if (typeof(DATE_SUP)=='number'){
        var Timestamp_DATE_SUP = Math.round((DATE_SUP-25569)*86400*1000)
        
        var DATE_SUP2 = moment(new Date(Timestamp_DATE_SUP)); //Pass in unix timestamp instead of Excel date
        
        DATE_SUP = DATE_SUP2.format('YYYY-MM-DD');
       console.log('date',DATE_SUP);
        } 

      //////// 
        
         const GPU_TIME_h=parseInt(24*GPU_TIME) 
         const GPU_TIME_o=GPU_TIME*24
         const GPU_TIME_m=Math.round((GPU_TIME_o-GPU_TIME_h)*60)

         const EA_h=parseInt(24*EA) 
         const EA_o=EA*24
         const EA_m=Math.round((EA_o-EA_h)*60)
        
         const ED_h=parseInt(24*ED) 
         const ED_o=ED*24
         const ED_m=Math.round((ED_o-ED_h)*60)
        
         const AD_h=parseInt(24*AD) 
         const AD_o=AD*24
         const AD_m=Math.round((AD_o-AD_h)*60)
        
         const AA_h=parseInt(24*AA) 
         const AA_o=AA*24
         const AA_m=Math.round((AA_o-AA_h)*60)
                ////////////////
                const CHK_IN_OPEN_h=parseInt(24*CHK_IN_OPEN) 
                const CHK_IN_OPEN_o=CHK_IN_OPEN*24
                const CHK_IN_OPEN_m=Math.round((CHK_IN_OPEN_o-CHK_IN_OPEN_h)*60)
                ///////////////
                ////////////////
                const CHK_IN_CLOSE_h=parseInt(24*CHK_IN_CLOSE) 
                const CHK_IN_CLOSE_o=CHK_IN_CLOSE*24
                const CHK_IN_CLOSE_m=Math.round((CHK_IN_CLOSE_o-CHK_IN_CLOSE_h)*60)
                ///////////////
                ////////////////
                const BOARD_OPEN_h=parseInt(24*BOARD_OPEN) 
                const BOARD_OPEN_o=BOARD_OPEN*24
                const BOARD_OPEN_m=Math.round((BOARD_OPEN_o-BOARD_OPEN_h)*60)
                ///////////////
                ////////////////
                const BOARD_CLOSE_h=parseInt(24*BOARD_CLOSE) 
                const BOARD_CLOSE_o=BOARD_CLOSE*24
                const BOARD_CLOSE_m=Math.round((BOARD_CLOSE_o-BOARD_CLOSE_h)*60)
                ///////////////
                ////////////////
                const DOORS_SHUT_h=parseInt(24*DOORS_SHUT) 
                const DOORS_SHUT_o=DOORS_SHUT*24
                const DOORS_SHUT_m=Math.round((DOORS_SHUT_o-DOORS_SHUT_h)*60)
                ///////////////
                ////////////////
                const DLY_TIME_h=parseInt(24*DLY_TIME) 
                const DLY_TIME_o=DLY_TIME*24
                const DLY_TIME_m=Math.round((DLY_TIME_o-DLY_TIME_h)*60)
                ///////////////
         CHK_IN_OPEN=`${CHK_IN_OPEN_h}:${CHK_IN_OPEN_m}`;
         CHK_IN_CLOSE=`${CHK_IN_CLOSE_h}:${CHK_IN_CLOSE_m}`;
         BOARD_OPEN=`${BOARD_OPEN_h}:${BOARD_OPEN_m}`;
         BOARD_CLOSE=`${BOARD_CLOSE_h}:${BOARD_CLOSE_m}`;
         DOORS_SHUT=`${DOORS_SHUT_h}:${DOORS_SHUT_m}`;
         DLY_TIME=`${DLY_TIME_h}:${DLY_TIME_m}`; 
         GPU_TIME=`${GPU_TIME_h}:${GPU_TIME_m}`;

         EA=`${EA_h}:${EA_m}`;
         ED=`${ED_h}:${ED_m}`;
         AD=`${AD_h}:${AD_m}`;
         AA=`${AA_h}:${AA_m}`;//////////// diff between date & ARV_DTE //////////////

const T1=`${ARV_DTE}T${AA}:00`;
const T2=`${ACT_DPT_DATE}T${AD}:00`;
let DIFF_TIME;
DIFF_TIME=(new Date(T2)-new Date(T1))/3600000;
console.log("T1",T1)
console.log("T2",T2)
console.log("typeof(ACT_DPT_DATE",typeof(ACT_DPT_DATE))
console.log("AD",AD)
////////////////////////////////////////////////////////

        //  let ID=`${Registration}-${Trip}-${Station}-${DATE}`;
  ////////////////////// DIFFERENCE BETWEEN DATES 
// const T1=`${ARV_DTE}T23:00:00`;
// const T2=`${date}T23:30:00`;
// // const T1=`${ARV_DTE}T${AA}`;
// // const T2=`${date}T${AD}`;
// let DIFF_TIME;
// DIFF_TIME=(new Date(T2)-new Date(T1))/3600000;
// console.log("new Date(T2)-new Date(T1)",(new Date(T2)-new Date(T1))/3600000)
// // console.log('dateT23:30:00',T1);
// console.log('DIFF_TIME',DIFF_TIME);

  //////////////////////////
        
        
        let ID=`${Registration}-${Trip}-${Station}-${date}`;
        let now=new Date();
        const T=`${date}T${AD}:00`;
        
        let date_delay=new Date(T)
        let A=(now.getTime()-date_delay.getTime())/(1000 * 60 * 60 * 24); 
        let B=(A-Math.trunc(A))*24;
        Delay_invoice=(Math.trunc(A))+" days "+Math.trunc(B)+" Hours"  ;

        //////////////////// HHHHHHHHH
        // let PROVIDER_CODE=req.body.PROVIDER_CODE;
        // let CURRENCY=req.body.CURRENCY;
        // let NAT_FLT=req.body.NAT_FLT;
        // let ID=req.body.ID;
        // let M=req.body.MTOW;
        // let Station=req.body.Station;
        // let Registration=req.body.Registration;
        // let HANDLER=req.body.HANDLER;
      
////////////////////////////////// H A N D L I N G //////////

// let PROVIDER_CODE=props.PROVIDER_CODE;
// let Station=props.Station;
// const CURRENCY=props.CURRENCY;
// const Registration=props.Registration;
// let HANDLER=props.HANDLER;

let Concession,Handling,BasicFee,Concession_handler;
 
if(PROVIDER_CODE=="1111" || HANDLER=="JETEX"){ //////// HANDLING QUOTATION JETEX EAM
  if ((M<=7) && (M>0) ){  /////////// 01-07 T ******** JETEX EAM
    if (Station!="GMAD") {    
      Handling=1860;
      Concession_handler=360;
      BasicFee=1980;
      Concession=300; 
    }else{
      Handling=990;
      Concession_handler=360;
      BasicFee=1980;
      Concession=300;   
    }
  } ///////////////////////////END OF  01-07 T ******** JETEX EAM

if ((M<=15) && (M>7)) {///////////START OF  07-15 T ******** JETEX EAM
  if(Station!="GMAD"){
    Handling=2465;
    Concession_handler=360;
    BasicFee=1980;
    Concession=300;
  }else{
    Handling=1650;
    Concession_handler=360;
    BasicFee=1980;
    Concession=300;
  }
}///////////END OF  07-15 T ******** JETEX EAM

if ((M<=19) && (M>15)){ //////////START OF  15-19 T ******** JETEX EAM
  if(Station!="GMAD"){
    Handling=2465;
    Concession_handler=490;
    BasicFee=2090;
    Concession=350;
  }else{
    Handling=1760;
    Concession_handler=490;
    BasicFee=2090;
    Concession=350;
  }
}//////////END OF  15-19 T ******** JETEX EAM

if ((M<=30) && (M>19)){ //////////START OF  19-30T ******** JETEX EAM
  if(Station!="GMAD"){
    Handling=3970;
    Concession_handler=490;
    BasicFee=2090;
    Concession=350;
  }else{
    Handling=3300;
    Concession_handler=490;
    BasicFee=2090;
    Concession=350;
  }
}//////////END OF  19-30T ******** JETEX EAM

if ((M<=40) && (M>30)){ //////////START OF  30-40T ******** JETEX EAM
  if(Station!="GMAD" ){
    Handling=6280;
    Concession_handler=840;
    BasicFee=2200;
    Concession=400;
  }else{
    Handling=4565;
    Concession_handler=840;
    BasicFee=2200;
    Concession=400;
  }
} //////////END OF  30-40T ******** JETEX EAM

if ((M<=50) && (M>40)){ /////////// START OF  40-50T ******** JETEX EAM
  if(Station!="GMAD"){
    Handling=6720;
    Concession_handler=840;
    BasicFee=2200;
    Concession=400;
  }else {
    Handling=5005;
    Concession_handler=840;
    BasicFee=2200;
    Concession=400;
  }
}/////////// END OF  40-50T ******** JETEX EAM

if ((M<=60) && (M>50)){ /////////// START OF  50-60T ******** JETEX EAM
  if(Station!="GMAD"){
    Handling=7810;
    Concession_handler=840;
    BasicFee=2750;
    Concession=400;
  }else {
    Handling=6875;
    Concession_handler=840;
    BasicFee=2750;
    Concession=400;
  }  
}/////////// END OF  50-60T ******** JETEX EAM

if ((M<=70) && (M>60)){ /////////// START OF  60-70T ******** JETEX EAM 
  if(Station!="GMAD"){
    Handling=10890;
    Concession_handler=1100;
    BasicFee=2750;
    Concession=450;
  }else{
    Handling=8855;
    Concession_handler=1100;
    BasicFee=2750;
    Concession=450;
  }
}  /////////// END OF  60-70T ******** JETEX EAM 

if ((M<=80) && (M>71)){  /////////// START OF  70-80T ******** JETEX EAM 
  if(Station!="GMAD"){
      Handling=11495;
      Concession_handler=1100;
      BasicFee=2750;
      Concession=450;
  }else{
    Handling=9900;
    Concession_handler=1100;
    BasicFee=2750;
    Concession=450;
  }
}/////////// END OF  70-80T ******** JETEX EAM 

if ((M<=100) && (M>81)){ /////////// START OF  80-100T ******** JETEX EAM 
  if(Station!="GMAD"){
    Handling=14190;
    Concession_handler=1100;
    BasicFee=3300;
    Concession=450;
  }else{
    Handling=10945;
    Concession_handler=1100;
    BasicFee=3300;
    Concession=450;
  }
}/////////// START OF  80-100T ******** JETEX EAM

if ((M<=120) && (M>100)){ /////////// START OF  100-120T ******** JETEX EAM
  if(Station!="GMAD"){
    Handling=14545;
    Concession_handler=1580;
    BasicFee=3300;
    Concession=500;
  }else{
    Handling=11605;
    Concession_handler=1580;
    BasicFee=3300;
    Concession=500;
  }
}/////////// END OF  100-120T ******** JETEX EAM

if ((M<=150) && (M>120)){  /////////// START OF  120-150T ******** JETEX EAM 
  if(Station!="GMAD"){
    Handling=18150;
    Concession_handler=1580;
    BasicFee=3300;
    Concession=500;
  }else{
    Handling=15345;
    Concession_handler=1580;
    BasicFee=3300;
    Concession=500;  
  }
}/////////// END OF  120-150T ******** JETEX EAM 

if ((M<=180) && (M>150)){ /////////// START OF  150-180T ******** JETEX EAM
  if(Station!="GMAD"){
    Handling=18150;
    Concession_handler=1580;
    BasicFee=3850;
    Concession=500;
  }else{
    Handling=15125;
    Concession_handler=1580;
    BasicFee=3850;
    Concession=500; 
  }
}////////// END OF  150-180T ******** JETEX EAM

if ((M<=200) && (M>180)){ /////////// START OF  180-200T ******** JETEX EAM
  if(Station!="GMAD"){
    Handling=26400;
    Concession_handler=1580;
    BasicFee=3850;
    Concession=500;
  }else{
    Handling=24200;
    Concession_handler=1580;
    BasicFee=3850;
    Concession=500; 
  }
}/////////// END OF  180-200T ******** JETEX EAM

if ((M<=230) && (M>200)){  /////////// START OF  200-230T ******** JETEX EAM
  if(Station!="GMAD"){
    Handling=26400;
    Concession_handler=2280;
    BasicFee=3850;
    Concession=550;
  }else{
    Handling=24200;
    Concession_handler=2280;
    BasicFee=3850;
    Concession=550; 
  }
}/////////// END OF  200-230T ******** JETEX EAM

if ((M<=300) && (M>230)){ /////////// START OF  230-300T ******** JETEX EAM    
  if(Station!="GMAD"){           
    Handling=27500;
    Concession_handler=2280;
    BasicFee=4400;
    Concession=550;
  }else{
    Handling=24695;
    Concession_handler=2280;
    BasicFee=4400;
    Concession=550;
  } 
}  /////////// END OF  230-300T ******** JETEX EAM 

if (M>300){ /////////// START OF  MORE TAHN 300T ******** JETEX EAM 
  if(Station!="GMAD"){
    Handling=34100;
    Concession_handler=3000;
    BasicFee=4400;
    Concession=550;
  }else{
    Handling=30250;
    Concession_handler=3000;
    BasicFee=4400;
    Concession=550;
  }
}/////////// END OF  MORE TAHN 300T ******** JETEX EAM 
} /////////// End if JETEX



if(PROVIDER_CODE=="0456" && HANDLER!="JETEX"){ ////////////// QUOTATION HANDLING ROJ
if ((M<=40) && (M>30)){/////////////////////////// 30-40 T ****ROJ
  Concession=35; 
  Handling=476;
  BasicFee=200;
  Concession_handler=84;
}///////////////////// End 30-40 T *****ROJ
///////////////////////// 40-50 T ****ROJ
if ((M<=50) && (M>40)){       
  Concession=35; 
  Handling=516;
  BasicFee=200;
  Concession_handler=84;
} ///////////////////////// End 40-50 T ****ROJ
/////////////////////  70-80 T *****ROJ 
if ((M<=80) && (M>71)){ 
  Concession=40; 
  Handling=985;
  BasicFee=250;
  Concession_handler=110;
}//////////////////////// End 70-80 T *****ROJ
/////////////////////////// 230-300 T ******ROJ    
if ((M<=300) && (M>230)){     
  Concession=55; 
  Handling=2347;
  BasicFee=400;
  Concession_handler=228;
} ///////////////////////////End 230-300 T ******ROJ
}////////////////////// END HANDLING QUOTATION ROJ

if((PROVIDER_CODE!="1111" && PROVIDER_CODE!="0456" && HANDLER!="JETEX") || HANDLER=="NIL"){  ////////////// START OF STANDARDIZED HANDLING QUOTATION 
if ((M<=7) && (M>0)){ 
  Concession=30; 
  Handling=169;
  BasicFee=180;
  Concession_handler=36;
}
/////////////////////////////////////////////
if ((M<=15) && (M>7)) {   
  Concession=30; 
  BasicFee=180;
  Handling=224;
  Concession_handler=36;
}
//////////////////////////
if ((M<=19) && (M>15)){ 
  Concession=35; 
  BasicFee=190;
  Handling=224;
  Concession_handler=49;
}
/////////////////////////
if ((M<=30) && (M>19)){ 
  Concession=35; 
  BasicFee=190;
  Handling=361;
  Concession_handler=49;
}
////////////////////////////////////////////////////////
if ((M<=40) && (M>30)){ 
  Concession=40; 
  BasicFee=200;
  Handling=571;
  Concession_handler=84;
} 
////////////////////////
if ((M<=50) && (M>40)){ 
  Concession=40;     
  BasicFee=250;
  Handling=611;
  Concession_handler=84;
}      
//////////////////////////
if ((M<=60) && (M>50)){ 
  Concession=45; 
  BasicFee=250;
  Handling=710;
  Concession_handler=84;
}     
////////////
if ((M<=70) && (M>60)){  
  Concession=45; 
  BasicFee=250;
  Handling=990;
  Concession_handler=110;
}
/////////////////////////
if ((M<=80) && (M>71)){ 
  Concession=45; 
  BasicFee=250;
  Handling=1045;
  Concession_handler=110;
}
////
if ((M<=100) && (M>81)){ 
  Concession=50; 
  BasicFee=300;
  Handling=1290;
  Concession_handler=110;
}
//// 
if ((M<=120) && (M>100)){
  Concession=50; 
  BasicFee=300;
  Handling=1322;
  Concession_handler=158;
}
////
if ((M<=150) && (M>120)){ 
  Concession=50; 
  BasicFee=300;
  Handling=1650;
  Concession_handler=158;
  }
////
if ((M<=180) && (M>150)){ 
Concession=50; 
BasicFee=350;
Handling=1650;
Concession_handler=158;
}
////
if ((M<=200) && (M>180)){ 
  Concession=50; 
  BasicFee=350;
  Handling=2400;
  Concession_handler=158;
}
//////////////////
if ((M<=230) && (M>200)){  
  Concession=50; 
  BasicFee=350;
  Handling=2400;
  Concession_handler=228;
}
////
if ((M<=300) && (M>230)){     
  Concession=50; 
  BasicFee=400;
  Handling=2500;
  Concession_handler=228;
}    
////
if (M>300){ 
  Concession=50; 
  BasicFee=400;
  Handling=3100;
  Concession_handler=300;
}
}  //////////////////////////// END OF STANDARIZED HANDLING QUOTATION

if(HANDLER=="JETEX"){
  Handling=Handling+Concession_handler;
  Concession_handler=0;
}

//////////////////////////////////////
if ( NAT_FLT=="TECH") { 
Handling=Math.trunc(+(Handling/2)) ;
Concession_handler=Math.trunc(+(Concession_handler/2)) ;
} 
////////////////////////
if(HANDLER=="NIL" && PROVIDER_CODE=="1111"){Concession=550; Handling=0; Concession_handler=0;} ;
if(HANDLER=="JETEX"){
  // Concession_handler=0;
  // Handling=0;
}
////////////////
//////////////////////////////// End Handling

console.log('ID ',ID)

const sql=`UPDATE flight SET  QCM_OK=?, flight_number= ?,MTD_PAY= ?,ACFT= ?,MTOW= ?,TTL_CREW= ?,NAT_FLT= ?,ARV_DTE= ?,PAX_IN= ?,PAX_OUT= ?,CGO_IN= ?,CGO_OUT= ?,EA= ?,ED= ?,PKG= ?,DLY_CODE= ?,DLY_TIME= ?,DLY_REASON= ?,INF_IN_OUT= ?,LIGHTING= ?,COMMENT= ?,PUSH_BACK= ?,HANDLER= ?,DSK_USED= ?,CHK_IN_OPEN= ?,CHK_IN_CLOSE= ?,BOARD_OPEN= ?,BOARD_CLOSE= ?,
DOORS_SHUT= ?,COMMENT_CHK_IN= ?,COMMENT_BOARD= ?,INFO_GIVEN_PAX= ?,PAX_REACTION= ?,EXP_INCURRED= ?,OTHER_GSE= ?,COMMENT_CLEAN= ?,COMMENT_RAMP= ?,COMMENT_CGO= ?,COMMENT_CATERING= ?,EXP_AUTH_BY= ?,COMMENT_CREW= ?,WO_HNDL_INV= ?,APT_FEES_INV= ?,APT_FEES_AMT= ?,APT_FEES_PAY= ?,APT_FEES_RMK= ?,TASPT_INV= ?,TASPT_AMT= ?,TASPT_PAY= ?,
TASPT_RMK= ?,VIP_ARV_INV= ?,VIP_ARV_RMK= ?,VIP_DEP_INV= ?,VIP_DEP_RMK= ?,CATERING_INV= ?,CATERING_AMT= ?,CATERING_PAY= ?,CATERING_RMK= ?,CATERING_PRO= ?,CREW_TRS_INV= ?,CREW_TRS_AMT= ?,CREW_TRS_PAY= ?,CREW_TRS_RMK= ?,CREW_TRS_PRO= ?,PAX_TRS_INV= ?,PAX_TRS_AMT= ?,PAX_TRS_PAY= ?,PAX_TRS_RMK= ?,PAX_TRS_PRO= ?,CREW_HTC_INV= ?,CREW_HTC_AMT= ?,CREW_HTC_PAY= ?,CREW_HTC_RMK= ?,CREW_HTC_PRO= ?,PAX_HTC_INV= ?,PAX_HTC_AMT= ?,PAX_HTC_PAY= ?,PAX_HTC_RMK= ?,PAX_HTC_PRO= ?,FUEL_INV= ?,FUEL_AMT= ?,FUEL_PAY= ?,FUEL_RMK= ?,FUEL_PRO= ?,CGO_INV= ?,CGO_AMT= ?,CGO_PAY= ?,CGO_RMK= ?,CGO_PRO= ?,TECH_INT_INV= ?,TECH_INT_AMT= ?,TECH_INT_PAY= ?,TECH_INT_RMK= ?,TECH_INT_PRO= ?,TRVL_EXP_RMK= ?,PORTERS_AMT= ?,PORTERS_RMK= ?,PRNT_PAGES_AMT= ?,PRNT_PAGES_RMK= ?,PHONE_COM_AMT= ?,PHONE_COM_RMK= ?,OTHER_CHG1= ?,OTHER_CHG1_INV= ?,OTHER_CHG1_AMT= ?,OTHER_CHG1_PAY= ?,OTHER_CHG1_RMK= ?,OTHER_CHG1_PRO= ?,OTHER_CHG2= ?,OTHER_CHG2_INV= ?,OTHER_CHG2_AMT= ?,OTHER_CHG2_PAY= ?,OTHER_CHG2_RMK= ?,OTHER_CHG2_PRO= ?,SUPERVISION_ARV_BY= ?,APPROVED_BY= ?,RECEIVED_AT= ?,SUP_CHARGE_NOTE_AMT= ?,SUP_CHARGE_NOTE_INV= ?,SUP_CHARGE_NOTE_RMK= ?,EXCESS_BAG= ?,VERSION= ?,MOTIF= ?,DATE_SUP= ?,TRS_APT_INV= ?,TRS_APT_PRO= ?,TRS_APT_PAY= ?,TRS_APT_AMT= ?,TRS_APT_RMK= ?,SUPERVISION_DEP_BY= ?,GPU= ?,GPU_TIME= ?,ASU= ?,flight_number_arv= ?,OTHER_CHG3= ?,OTHER_CHG3_INV= ?,OTHER_CHG3_AMT= ?,OTHER_CHG3_PAY= ?,OTHER_CHG3_RMK= ?,OTHER_CHG3_PRO= ?,OTHER_CHG4= ?,OTHER_CHG4_INV= ?,OTHER_CHG4_AMT= ?,OTHER_CHG4_PAY= ?,OTHER_CHG4_RMK= ?,OTHER_CHG4_PRO= ?,CORVER_BY= ?,CUTE_INV= ?,CUTE_AMT= ?,CUTE_PAY= ?,CUTE_RMK= ?,AMBU_NBR= ?,WCH_NBR= ?,UMNR_NBR= ?,FAE_LINK= ?,APT_FEES_LINK= ?,CATERING_LINK= ?,APT_TRANS_LINK= ?,CREW_TRANS_LINK= ?,PAX_TRANS_LINK= ?,FUEL_LINK= ?,CREW_HOTAC_LINK= ?,PAX_HOTAC_LINK= ?,CGO_FEES_LINK= ?,TECH_INTER_LINK= ?,FACTURETTES_LINK= ?,TASPT_LINK= ?,CUTE_LINK= ?,QSR_LINK= ?,ROJ_WO_LINK= ?,IMOC_FORM_LINK= ?,IMOC_HDLG_LINK= ?,Service_Type= ?,OTHER_CHG5= ?,OTHER_CHG5_INV= ?,OTHER_CHG5_AMT= ?,OTHER_CHG5_PAY= ?,OTHER_CHG5_RMK= ?,OTHER_CHG5_PRO= ?,MEDICAL_INV= ?,MEDICAL_AMT= ?,MEDICAL_PAY= ?,MEDICAL_RMK= ?,MEDICAL_PRO=?,
TOWING= ?,FLIGHT_ID= ?,VIP_ARV_PAX_NBR= ?,VIP_DPT_PAX_NBR= ?,JETEX_RAMP_ARV_NBR= ?,JETEX_RAMP_DPT_NBR= ?,IS_FAST_TRACK= ?,IS_FAST_TRACK_RMK= ?,IS_FAST_TRACK_INV= ? WHERE ID= ?`;

pool.query(sql,[1,Flt_nbr ,MTD_PAY ,ACFT ,MTOW ,TTL_CREW ,NAT_FLT ,ARV_DTE ,PAX_IN ,PAX_OUT ,CGO_IN ,CGO_OUT ,EA ,ED ,PKG ,DLY_CODE ,DLY_TIME ,DLY_REASON ,INF_IN_OUT ,LIGHTING ,COMMENT ,PUSH_BACK ,HANDLER ,DSK_USED ,CHK_IN_OPEN ,CHK_IN_CLOSE ,BOARD_OPEN ,BOARD_CLOSE ,
  DOORS_SHUT ,COMMENT_CHK_IN ,COMMENT_BOARD ,INFO_GIVEN_PAX ,PAX_REACTION ,EXP_INCURRED ,OTHER_GSE ,COMMENT_CLEAN ,COMMENT_RAMP ,COMMENT_CGO ,COMMENT_CATERING ,EXP_AUTH_BY ,COMMENT_CREW ,WO_HNDL_INV ,APT_FEES_INV ,APT_FEES_AMT ,APT_FEES_PAY ,APT_FEES_RMK ,TASPT_INV ,TASPT_AMT ,TASPT_PAY ,
  TASPT_RMK ,VIP_ARV_INV ,VIP_ARV_RMK ,VIP_DEP_INV ,VIP_DEP_RMK ,CATERING_INV ,CATERING_AMT ,CATERING_PAY ,CATERING_RMK ,CATERING_PRO ,CREW_TRS_INV ,CREW_TRS_AMT ,CREW_TRS_PAY ,CREW_TRS_RMK ,CREW_TRS_PRO ,PAX_TRS_INV ,PAX_TRS_AMT ,PAX_TRS_PAY ,PAX_TRS_RMK  ,PAX_TRS_PRO ,CREW_HTC_INV ,CREW_HTC_AMT ,CREW_HTC_PAY ,CREW_HTC_RMK ,CREW_HTC_PRO ,PAX_HTC_INV ,PAX_HTC_AMT ,PAX_HTC_PAY ,PAX_HTC_RMK ,PAX_HTC_PRO ,FUEL_INV ,FUEL_AMT ,FUEL_PAY ,FUEL_RMK ,FUEL_PRO ,CGO_INV ,CGO_AMT ,CGO_PAY ,CGO_RMK ,CGO_PRO ,TECH_INT_INV ,TECH_INT_AMT ,TECH_INT_PAY ,TECH_INT_RMK ,TECH_INT_PRO ,TRVL_EXP_RMK ,PORTERS_AMT ,PORTERS_RMK ,PRNT_PAGES_AMT ,PRNT_PAGES_RMK ,PHONE_COM_AMT ,PHONE_COM_RMK ,OTHER_CHG1 ,OTHER_CHG1_INV ,OTHER_CHG1_AMT ,OTHER_CHG1_PAY ,OTHER_CHG1_RMK ,OTHER_CHG1_PRO ,OTHER_CHG2 ,OTHER_CHG2_INV ,OTHER_CHG2_AMT ,OTHER_CHG2_PAY ,OTHER_CHG2_RMK ,OTHER_CHG2_PRO ,SUPERVISION_ARV_BY ,APPROVED_BY ,RECEIVED_AT ,SUP_CHARGE_NOTE_AMT ,SUP_CHARGE_NOTE_INV ,SUP_CHARGE_NOTE_RMK ,EXCESS_BAG ,VERSION ,MOTIF ,DATE_SUP ,TRS_APT_INV ,TRS_APT_PRO ,TRS_APT_PAY ,TRS_APT_AMT ,TRS_APT_RMK ,SUPERVISION_DEP_BY ,GPU ,GPU_TIME ,ASU ,flight_number_arv ,OTHER_CHG3 ,OTHER_CHG3_INV ,OTHER_CHG3_AMT ,OTHER_CHG3_PAY ,OTHER_CHG3_RMK ,OTHER_CHG3_PRO ,OTHER_CHG4 ,OTHER_CHG4_INV ,OTHER_CHG4_AMT ,OTHER_CHG4_PAY ,OTHER_CHG4_RMK ,OTHER_CHG4_PRO ,CORVER_BY ,CUTE_INV ,CUTE_AMT ,CUTE_PAY ,CUTE_RMK ,AMBU_NBR ,WCH_NBR ,UMNR_NBR ,FAE_LINK ,APT_FEES_LINK ,CATERING_LINK ,APT_TRANS_LINK ,CREW_TRANS_LINK ,PAX_TRANS_LINK ,FUEL_LINK ,CREW_HOTAC_LINK ,PAX_HOTAC_LINK ,CGO_FEES_LINK ,TECH_INTER_LINK ,FACTURETTES_LINK ,TASPT_LINK ,CUTE_LINK ,QSR_LINK ,ROJ_WO_LINK ,IMOC_FORM_LINK ,IMOC_HDLG_LINK ,Service_Type ,OTHER_CHG5 ,OTHER_CHG5_INV ,OTHER_CHG5_AMT ,OTHER_CHG5_PAY ,OTHER_CHG5_RMK ,OTHER_CHG5_PRO ,MEDICAL_INV ,MEDICAL_AMT ,MEDICAL_PAY ,MEDICAL_RMK ,MEDICAL_PRO,TOWING ,FLIGHT_ID,VIP_ARV_PAX_NBR ,VIP_DPT_PAX_NBR ,JETEX_RAMP_ARV_NBR ,JETEX_RAMP_DPT_NBR,IS_FAST_TRACK,IS_FAST_TRACK_RMK,IS_FAST_TRACK_INV,ID],(err,data)=> {console.log(data)}); 
// const sql=`UPDATE flight SET  QCM_OK=?, flight_number= ?,MTD_PAY= ?,ACFT= ?,MTOW= ?,TTL_CREW= ?,NAT_FLT= ?,ARV_DTE= ?,PAX_IN= ?,PAX_OUT= ?,CGO_IN= ?,CGO_OUT= ?,EA= ?,ED= ?,PKG= ?,DLY_CODE= ?,DLY_TIME= ?,DLY_REASON= ?,INF_IN_OUT= ?,LIGHTING= ?,COMMENT= ?,PUSH_BACK= ?,HANDLER= ?,DSK_USED= ?,CHK_IN_OPEN= ?,CHK_IN_CLOSE= ?,BOARD_OPEN= ?,BOARD_CLOSE= ?,
// DOORS_SHUT= ?,COMMENT_CHK_IN= ?,COMMENT_BOARD= ?,INFO_GIVEN_PAX= ?,PAX_REACTION= ?,EXP_INCURRED= ?,OTHER_GSE= ?,COMMENT_CLEAN= ?,COMMENT_RAMP= ?,COMMENT_CGO= ?,COMMENT_CATERING= ?,EXP_AUTH_BY= ?,COMMENT_CREW= ?,WO_HNDL_INV= ?,APT_FEES_INV= ?,APT_FEES_AMT= ?,APT_FEES_PAY= ?,APT_FEES_RMK= ?,TASPT_INV= ?,TASPT_AMT= ?,TASPT_PAY= ?,
// TASPT_RMK= ?,VIP_ARV_INV= ?,VIP_ARV_RMK= ?,VIP_DEP_INV= ?,VIP_DEP_RMK= ?,CATERING_INV= ?,CATERING_AMT= ?,CATERING_PAY= ?,CATERING_RMK= ?,CATERING_PRO= ?,CREW_TRS_INV= ?,CREW_TRS_AMT= ?,CREW_TRS_PAY= ?,CREW_TRS_RMK= ?,CREW_TRS_PRO= ?,PAX_TRS_INV= ?,PAX_TRS_AMT= ?,PAX_TRS_PAY= ?,PAX_TRS_RMK= ?,PAX_TRS_PRO= ?,CREW_HTC_INV= ?,CREW_HTC_AMT= ?,CREW_HTC_PAY= ?,CREW_HTC_RMK= ?,CREW_HTC_PRO= ?,PAX_HTC_INV= ?,PAX_HTC_AMT= ?,PAX_HTC_PAY= ?,PAX_HTC_RMK= ?,PAX_HTC_PRO= ?,FUEL_INV= ?,FUEL_AMT= ?,FUEL_PAY= ?,FUEL_RMK= ?,FUEL_PRO= ?,CGO_INV= ?,CGO_AMT= ?,CGO_PAY= ?,CGO_RMK= ?,CGO_PRO= ?,TECH_INT_INV= ?,TECH_INT_AMT= ?,TECH_INT_PAY= ?,TECH_INT_RMK= ?,TECH_INT_PRO= ?,LND_PMT_AMT= ?,LND_PMT_RMK= ?,TRVL_EXP_AMT= ?,TRVL_EXP_RMK= ?,PORTERS_AMT= ?,PORTERS_RMK= ?,PRNT_PAGES_AMT= ?,PRNT_PAGES_RMK= ?,PHONE_COM_AMT= ?,PHONE_COM_RMK= ?,OTHER_CHG1= ?,OTHER_CHG1_INV= ?,OTHER_CHG1_AMT= ?,OTHER_CHG1_PAY= ?,OTHER_CHG1_RMK= ?,OTHER_CHG1_PRO= ?,OTHER_CHG2= ?,OTHER_CHG2_INV= ?,OTHER_CHG2_AMT= ?,OTHER_CHG2_PAY= ?,OTHER_CHG2_RMK= ?,OTHER_CHG2_PRO= ?,SUPERVISION_ARV_BY= ?,APPROVED_BY= ?,RECEIVED_AT= ?,SUP_CHARGE_NOTE_AMT= ?,SUP_CHARGE_NOTE_INV= ?,SUP_CHARGE_NOTE_RMK= ?,EXCESS_BAG= ?,VERSION= ?,MOTIF= ?,DATE_SUP= ?,TRS_APT_INV= ?,TRS_APT_PRO= ?,TRS_APT_PAY= ?,TRS_APT_AMT= ?,TRS_APT_RMK= ?,SUPERVISION_DEP_BY= ?,GPU= ?,GPU_TIME= ?,ASU= ?,flight_number_arv= ?,OTHER_CHG3= ?,OTHER_CHG3_INV= ?,OTHER_CHG3_AMT= ?,OTHER_CHG3_PAY= ?,OTHER_CHG3_RMK= ?,OTHER_CHG3_PRO= ?,OTHER_CHG4= ?,OTHER_CHG4_INV= ?,OTHER_CHG4_AMT= ?,OTHER_CHG4_PAY= ?,OTHER_CHG4_RMK= ?,OTHER_CHG4_PRO= ?,CORVER_BY= ?,CUTE_INV= ?,CUTE_AMT= ?,CUTE_PAY= ?,CUTE_RMK= ?,AMBU_NBR= ?,WCH_NBR= ?,UMNR_NBR= ?,FAE_LINK= ?,APT_FEES_LINK= ?,CATERING_LINK= ?,APT_TRANS_LINK= ?,CREW_TRANS_LINK= ?,PAX_TRANS_LINK= ?,FUEL_LINK= ?,CREW_HOTAC_LINK= ?,PAX_HOTAC_LINK= ?,CGO_FEES_LINK= ?,TECH_INTER_LINK= ?,FACTURETTES_LINK= ?,TASPT_LINK= ?,CUTE_LINK= ?,QSR_LINK= ?,ROJ_WO_LINK= ?,IMOC_FORM_LINK= ?,IMOC_HDLG_LINK= ?,Service_Type= ?,OTHER_CHG5= ?,OTHER_CHG5_INV= ?,OTHER_CHG5_AMT= ?,OTHER_CHG5_PAY= ?,OTHER_CHG5_RMK= ?,OTHER_CHG5_PRO= ?,MEDICAL_INV= ?,MEDICAL_AMT= ?,MEDICAL_PAY= ?,MEDICAL_RMK= ?,MEDICAL_PRO=?,
// TOWING= ?,FLIGHT_ID= ?,VIP_ARV_PAX_NBR= ?,VIP_DPT_PAX_NBR= ?,JETEX_RAMP_ARV_NBR= ?,JETEX_RAMP_DPT_NBR= ?,IS_FAST_TRACK= ?,IS_FAST_TRACK_RMK= ?,IS_FAST_TRACK_INV= ?,ACT_ARV_DATE= ?,ACT_DPT_DATE= ? WHERE ID= ?`;

// pool.query(sql,[1,Flt_nbr ,MTD_PAY ,ACFT ,MTOW ,TTL_CREW ,NAT_FLT ,ARV_DTE ,PAX_IN ,PAX_OUT ,CGO_IN ,CGO_OUT ,EA ,ED ,PKG ,DLY_CODE ,DLY_TIME ,DLY_REASON ,INF_IN_OUT ,LIGHTING ,COMMENT ,PUSH_BACK ,HANDLER ,DSK_USED ,CHK_IN_OPEN ,CHK_IN_CLOSE ,BOARD_OPEN ,BOARD_CLOSE ,
//   DOORS_SHUT ,COMMENT_CHK_IN ,COMMENT_BOARD ,INFO_GIVEN_PAX ,PAX_REACTION ,EXP_INCURRED ,OTHER_GSE ,COMMENT_CLEAN ,COMMENT_RAMP ,COMMENT_CGO ,COMMENT_CATERING ,EXP_AUTH_BY ,COMMENT_CREW ,WO_HNDL_INV ,APT_FEES_INV ,APT_FEES_AMT ,APT_FEES_PAY ,APT_FEES_RMK ,TASPT_INV ,TASPT_AMT ,TASPT_PAY ,
//   TASPT_RMK ,VIP_ARV_INV ,VIP_ARV_RMK ,VIP_DEP_INV ,VIP_DEP_RMK ,CATERING_INV ,CATERING_AMT ,CATERING_PAY ,CATERING_RMK ,CATERING_PRO ,CREW_TRS_INV ,CREW_TRS_AMT ,CREW_TRS_PAY ,CREW_TRS_RMK ,CREW_TRS_PRO ,PAX_TRS_INV ,PAX_TRS_AMT ,PAX_TRS_PAY ,PAX_TRS_RMK  ,PAX_TRS_PRO ,CREW_HTC_INV ,CREW_HTC_AMT ,CREW_HTC_PAY ,CREW_HTC_RMK ,CREW_HTC_PRO ,PAX_HTC_INV ,PAX_HTC_AMT ,PAX_HTC_PAY ,PAX_HTC_RMK ,PAX_HTC_PRO ,FUEL_INV ,FUEL_AMT ,FUEL_PAY ,FUEL_RMK ,FUEL_PRO ,CGO_INV ,CGO_AMT ,CGO_PAY ,CGO_RMK ,CGO_PRO ,TECH_INT_INV ,TECH_INT_AMT ,TECH_INT_PAY ,TECH_INT_RMK ,TECH_INT_PRO ,LND_PMT_AMT ,LND_PMT_RMK ,TRVL_EXP_AMT ,TRVL_EXP_RMK ,PORTERS_AMT ,PORTERS_RMK ,PRNT_PAGES_AMT ,PRNT_PAGES_RMK ,PHONE_COM_AMT ,PHONE_COM_RMK ,OTHER_CHG1 ,OTHER_CHG1_INV ,OTHER_CHG1_AMT ,OTHER_CHG1_PAY ,OTHER_CHG1_RMK ,OTHER_CHG1_PRO ,OTHER_CHG2 ,OTHER_CHG2_INV ,OTHER_CHG2_AMT ,OTHER_CHG2_PAY ,OTHER_CHG2_RMK ,OTHER_CHG2_PRO ,SUPERVISION_ARV_BY ,APPROVED_BY ,RECEIVED_AT ,SUP_CHARGE_NOTE_AMT ,SUP_CHARGE_NOTE_INV ,SUP_CHARGE_NOTE_RMK ,EXCESS_BAG ,VERSION ,MOTIF ,DATE_SUP ,TRS_APT_INV ,TRS_APT_PRO ,TRS_APT_PAY ,TRS_APT_AMT ,TRS_APT_RMK ,SUPERVISION_DEP_BY ,GPU ,GPU_TIME ,ASU ,flight_number_arv ,OTHER_CHG3 ,OTHER_CHG3_INV ,OTHER_CHG3_AMT ,OTHER_CHG3_PAY ,OTHER_CHG3_RMK ,OTHER_CHG3_PRO ,OTHER_CHG4 ,OTHER_CHG4_INV ,OTHER_CHG4_AMT ,OTHER_CHG4_PAY ,OTHER_CHG4_RMK ,OTHER_CHG4_PRO ,CORVER_BY ,CUTE_INV ,CUTE_AMT ,CUTE_PAY ,CUTE_RMK ,AMBU_NBR ,WCH_NBR ,UMNR_NBR ,FAE_LINK ,APT_FEES_LINK ,CATERING_LINK ,APT_TRANS_LINK ,CREW_TRANS_LINK ,PAX_TRANS_LINK ,FUEL_LINK ,CREW_HOTAC_LINK ,PAX_HOTAC_LINK ,CGO_FEES_LINK ,TECH_INTER_LINK ,FACTURETTES_LINK ,TASPT_LINK ,CUTE_LINK ,QSR_LINK ,ROJ_WO_LINK ,IMOC_FORM_LINK ,IMOC_HDLG_LINK ,Service_Type ,OTHER_CHG5 ,OTHER_CHG5_INV ,OTHER_CHG5_AMT ,OTHER_CHG5_PAY ,OTHER_CHG5_RMK ,OTHER_CHG5_PRO ,MEDICAL_INV ,MEDICAL_AMT ,MEDICAL_PAY ,MEDICAL_RMK ,MEDICAL_PRO,TOWING ,FLIGHT_ID,VIP_ARV_PAX_NBR ,VIP_DPT_PAX_NBR ,JETEX_RAMP_ARV_NBR ,JETEX_RAMP_DPT_NBR,IS_FAST_TRACK,IS_FAST_TRACK_RMK,IS_FAST_TRACK_INV,ACT_ARV_DATE,ACT_DPT_DATE,ID],(err,data)=> {console.log(data)}); 

});

///////////////////////  /api/corver  PST CORVER 
app.post('/api/qcm/corver', (req,res)=>{
  
  const sql="INSERT INTO Corver (FLIGHT_ID,Reg_Trip_Sta_Date,VERSION,MOTIF,CORVER_BY,APPROVED_BY,CORVER_DATE,HOUR) VALUES (?,?,?,?,?,?,?,?);"
  console.log("req.body cor ver/////",req.body)
 
  // let Checked=req.body.Checked;
  let dateFlight=req.body.date;
  var Timestamp = Math.round((dateFlight-25569)*86400*1000)
  var date0 = moment(new Date(Timestamp)); //Pass in unix timestamp instead of Excel date
  let dateFlightCorver = date0.format('YYYY-MM-DD');

  let Reg_Trip_Sta_Date=req.body.Registration+"-"+req.body.Trip+"-"+req.body.Station+"-"+dateFlightCorver;
  let VERSION=req.body.VERSION;
  let MOTIF=req.body.MOTIF;
  let CORVER_BY=req.body.CORVER_BY;
  let APPROVED_BY=req.body.APPROVED_BY;
  let FLIGHT_ID=req.body.FLIGHT_ID;
  console.log("Reg_Trip_Sta_Date",Reg_Trip_Sta_Date)

  const now=new Date(); console.log('now',now);
  const CORVER_DATE_DAY=now.getDate();
  const CORVER_DATE_MON= now.getMonth();
  const CORVER_DATE_YEA=now.getYear();

  
  let HOUR=(now.getHours())+"H"+(now.getMinutes());
  
  let MOIS;
  if ( CORVER_DATE_MON=="0"){
    MOIS="JAN"
  }else if( CORVER_DATE_MON=="1"){
    MOIS="FEB"
  }else if( CORVER_DATE_MON=="2"){
    MOIS="MAR"
  }else if( CORVER_DATE_MON=="3"){
    MOIS="APR"
  }else if( CORVER_DATE_MON=="4"){
    MOIS="MAY"
  }else if( CORVER_DATE_MON=="5"){
    MOIS="JUN"
  }else if( CORVER_DATE_MON=="6"){
    MOIS="JUL"
  }else if( CORVER_DATE_MON=="7"){
    MOIS="AUG"
  }else if( CORVER_DATE_MON=="8"){
    MOIS="SEP"
  }else if( CORVER_DATE_MON=="9"){
    MOIS="OCT"
  }else if( CORVER_DATE_MON=="10"){
    MOIS="NOV"
  }else if( CORVER_DATE_MON=="11"){
    MOIS="12"
  }
  let CORVER_DATE=CORVER_DATE_DAY+"-"+MOIS+"-"+(CORVER_DATE_YEA+1900);
  
   pool.query(sql,[FLIGHT_ID,Reg_Trip_Sta_Date,VERSION,MOTIF,CORVER_BY,APPROVED_BY,CORVER_DATE,HOUR],(err,result)=>{res.send(result);console.log(result)} )
   
 });
/////////////////////END  POST CORVER 
////////////////////////// FUEL ///////////////

app.put('/api/fuel/qcm/:id', (req,res)=>{
  
  let {flight_number_arv,Flt_nbr,ACFT,MTOW,ARV_DTE,PROV,DEST,PAX_IN,PAX_OUT,CGO_IN,CGO_OUT,EA,ED,OPERATOR,PROVIDER,FUEL_INV,FUEL_AMT,FUEL_PAY,FUEL_RMK,FUEL_PRO,date,Registration,Trip,Station}=req.body
    
  // const sql="UPDATE flight SET Flt_nbr=?,ACFT=?,MTOW=?,ARV_DTE=?,PROV=?,DEST=?,PAX_IN=?,PAX_OUT=?,CGO_IN=?,CGO_OUT=?,EA=?,ED=?,OPERATOR=?,PROVIDER=?,FUEL_INV=?,FUEL_AMT=?,FUEL_PAY=?,FUEL_RMK=?,FUEL_PRO=?,date=?,registration=?,trip=?,station=?) WHERE ID= ?"
   
  // pool.query(sql,[Flt_nbr,ACFT,MTOW,ARV_DTE,PROV,DEST,PAX_IN,PAX_OUT,CGO_IN,CGO_OUT,EA,ED,OPERATOR,PROVIDER,FUEL_INV,FUEL_AMT,FUEL_PAY,FUEL_RMK,FUEL_PRO,date,Registration,Trip,Station,req.params.id],(err,data)=> {console.log(data)}); 
  if ( typeof(ARV_DTE)=='number'){
    var Timestamp = Math.round((ARV_DTE-25569)*86400*1000)
    var ARV = moment(new Date(Timestamp)); //Pass in unix timestamp instead of Excel date
    ARV_DTE = ARV.format('YYYY-MM-DD');
  } 
  
  if ( typeof(date)=='number'){
    var Timestamp = Math.round((date-25569)*86400*1000)
    var date2 = moment(new Date(Timestamp)); //Pass in unix timestamp instead of Excel date
    console.log('date2',date2);
    date = date2.format('YYYY-MM-DD');
  } 

  let PARAM=req.params.id
  PARAM=PARAM+"-"+date+"-F";
  console.log('Flt_nbr',Flt_nbr);
  console.log('EA*60',EA*60);


  

  // const sqlFuel="UPDATE flight SET IsCheck=?, Flt_nbr=?, ACFT=?, MTOW=?, ARV_DTE=?, PROV=?, DEST=?, PAX_IN=?, PAX_OUT=?, CGO_IN=?, CGO_OUT=?, OPERATOR=?, PROVIDER=?, FUEL_INV=?, FUEL_AMT=?, FUEL_PAY=?, FUEL_RMK=?, FUEL_PRO=?, date=?, registration=?, trip=?, station=? WHERE ID= ?"
  // pool.query(sqlFuel,[1,Flt_nbr,ACFT,MTOW,ARV_DTE,PROV,DEST,PAX_IN,PAX_OUT,CGO_IN,CGO_OUT,OPERATOR,PROVIDER,FUEL_INV,FUEL_AMT,FUEL_PAY,FUEL_RMK,FUEL_PRO,date,Registration,Trip,Station,PARAM],(err,result)=>{res.send(result);console.log(result);console.log("Ana ousst lpool")} ) 

  const sqlFuel="UPDATE flight SET flight_number_arv=?, flight_number=?, PROV=?, DEST=?, FUEL_PRO=?, FUEL_PAY=?, FUEL_INV=?, FUEL_RMK=?, PAX_OUT=?, date=?, ARV_DTE=?, MTOW=?, IsChecked=?, OPERATOR=?, PROVIDER=?, station=? WHERE ID= ?";
  pool.query(sqlFuel,[flight_number_arv,Flt_nbr,PROV,DEST,FUEL_PRO,FUEL_PAY,FUEL_INV,FUEL_RMK,PAX_OUT,date,ARV_DTE,MTOW,1,OPERATOR,PROVIDER,Station,PARAM],(err,result)=>{res.send(result);console.log(result);console.log("Ana ousst lpool")} ) 
  
});
/////////////////////////////////// END FUEL

////////////////////// GET DETAILS FOR FUEL INVOICE ////
// app.get('/api/details/fuel/get/:id', (req,res)=>{
//   const sqlGetFuel=`SELECT * FROM flight WHERE ID = ${req.params.id}` ;
//   pool.query(sqlGetFuel,(err,result)=>{res.send(result);console.log("result Fuel details",result)} )
  
// });
/////////////////////// END OF  GET DETAILS FOR FUEL INVOICE


app.put('/api/get/:id', (req,res)=>{
  console.log("req.body",req.body)
  
  const sqlUpdate="UPDATE flight SET registration = ?, station=?, flight_number=? WHERE ID = ?" ;
  pool.query(sqlUpdate,[req.body.registration,req.body.station,req.body.flt_nbr,req.params.id],(err,result)=>{res.send(result);console.log(result)} )
  
});

app.put('/api/invoice/:id', (req,res)=>{
  const sqlUpdate="UPDATE invoice SET ID = ID+1 WHERE ID_INVOICE = ?" ;
  pool.query(sqlUpdate,[req.params.id],(err,result)=>{res.send(result);console.log(result)} )
  
});
app.get('/api/invoice/get/:id', (req,res)=>{
   
  const sqlGet=`SELECT * FROM invoice WHERE ID_INVOICE = ${req.params.id}` ;
  pool.query(sqlGet,(err,result)=>{res.send(result);console.log("result invoice",result)} )
 
});
////// Insert Invoice number for the flight
app.put('/api/flight/invoice', (req,res)=>{
  console.log("req.body2222",req.body)
  const sqlUpdate="UPDATE flight SET INVOICE_NBR = ? WHERE ID= ?" ;
  pool.query(sqlUpdate,[req.body.InvoiceNumber,req.body.ID],(err,result)=>{res.send(result);console.log(result)} )
  
});
//////
////// Insert Checked on localhost:1500
app.post('/api/flight/check', (req,res)=>{
  
 const sql="INSERT INTO Checker (FLIGHT_ID,SUPERVISOR_CODE,QCM_CHECK,HOUR,DATE,OPERATOR,ARV_DTE,DPT_DTE) VALUES (?,?,?,?,?,?,?,?);"
 console.log("req.body/////",req.body)

 let Checked=req.body.Checked;
 let FLIGHT_ID=req.body.ID;
 let SUPERVISOR_CODE=req.body.SUPERVISOR_CODE;
 let DATE=req.body.DATE;
 let HOUR=req.body.Time;
 let OPERATOR=req.body.OPERATOR;
 let ARV_DTE=req.body.ARV_DTE;
 let DPT_DTE=req.body.date;

  pool.query(sql,[FLIGHT_ID,SUPERVISOR_CODE,Checked,HOUR,DATE,OPERATOR,ARV_DTE,DPT_DTE],(err,result)=>{res.send(result);console.log(result)} )
  
});

/////////// Check if flight exist prior to add it

///////////////////// Route for FeeDback qcm Checker
app.get('/api/flight/check', (req,res)=>{
  
  const sqlGet=`SELECT * FROM Checker WHERE FLIGHT_ID = ${req.params.id}` ;  console.log("req.body/////",req.body)
 
   pool.query(sqlGet,(err,result)=>{res.send(result);console.log(result)} )
   
 });
////////////////////////////////////////

// app.put('/api/put/:id', (req,res)=>{
//   console.log("req.body.HANDLER",req.body.HANDLER)
//   const sql="UPDATE flight SET HANDLER=? , QCM_OK=? WHERE ID= ?" ;
//   pool.query(sql,[req.body.HANDLER,"1",req.params.id],(err,result)=>{res.send(result);console.log(result)} )
 
// });
///////////////////// Address Details of PROVIDER_CODE
app.get('/api/client/get/:id', (req,res)=>{
  
  const sqlGet=`SELECT * FROM Clients WHERE Customer_ID = ${req.params.id}` ;  console.log("req.body/////",req.body)
 
   pool.query(sqlGet,(err,result)=>{res.send(result);console.log(result)} )
  ///////////////////// End of Address Details of PROVIDER_CODE 
 });
////////////////////////////////////////


app.post('/api/data/InsertHandling', (req,res)=>{

// let Handling =req.body.H;
// let Concession_handler =req.body.C;
// let ID =req.body.ID;
// let GPU_PRICE =req.body.G;
// let ASU_PRICE =req.body.AS;
// let PUSH_PRICE =req.body.P;

let Handling =req.body.H;
let Concession_handler =req.body.HC;
let ID =req.body.ID;
let BasicFee =req.body.BF;
let Concession =req.body.AC;
let Disb =req.body.Dis;
let CURRENCY=req.body.CUR;


console.log("ID",ID)
// const sql="INSERT INTO Handling (Flight_ID,Handling,Concession_handler,GPU_PRICE,ASU_PRICE,PUSH_PRICE) VALUES (?,?,?,?,?,?);"
// pool.query(sql,[ID,Handling,Concession_handler,GPU_PRICE,ASU_PRICE,PUSH_PRICE],(err,result)=>{res.send(result);console.log(result)} )

const sql="INSERT INTO Handling (Flight_ID,Handling,Concession_handler,BasicFee,Concession,Disb,CURRENCY) VALUES (?,?,?,?,?,?,?);"
pool.query(sql,[ID,Handling,Concession_handler,BasicFee,Concession,Disb,CURRENCY],(err,result)=>{res.send(result);console.log(result)} )


});


app.listen("1501", ()=> console.log("Server running on port 1501"))

////////// test github

