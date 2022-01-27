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

  app.get('/api/get/:id', (req,res)=>{
   
    const sqlGet=`SELECT * FROM flight WHERE ID = ${req.params.id}` ;
    pool.query(sqlGet,(err,result)=>{res.send(result);console.log(result)} )
    console.log("Hello FastComet")
});

app.get('/api/get', (req,res)=>{
    const sqlGet="SELECT * FROM flight";
    pool.query(sqlGet,(err,result)=>{
    result.forEach( record=> {
      console.log('record.date',record.date)
      const x=`${record.date}`;
      const arv_dte=`${record.ARV_DTE}`;
      const received_at=`${record.RECEIVED_AT}`;
      const date_sup=`${record.DATE_SUP}`;
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
    
    } )
    res.send(result);
    // console.log('GPU TIME',result[8].GPU_TIME);
    })
});



app.post('/api/insert', (req,res)=>{
  //console.log("req.body",req.body)
   const pats=`C:\\electron projects\\electron-react-app\\electron-react-app\\source\\flight.xlsx`
   const patc=`C:\\electron projects\\electron-react-app\\electron-react-app\\cible\\flight-d.xlsx`
   //console.log('Moment-Time',time(0.02083333333332).getHours() )
  //  const sql_dte= "SELECT date convert(varchar(8), date,3) As Converted_date from flight" 
    let Handling,Concession,BasicFee,Concession_handler; 
    
   
   let CIQ_Coordination=0;
   let Disb=0;
   let Fast_Track=0;

   let {Delay_invoice,Flt_nbr,Registration,Station,Trip,date,MTD_PAY,ACFT,MTOW,TTL_CREW,NAT_FLT,ARV_DTE,PROV,DEST,PAX_IN,PAX_OUT,CGO_IN,CGO_OUT,EA,AA,ED,AD,PKG,DLY_CODE,DLY_TIME,DLY_REASON,INF_IN_OUT,LIGHTING,COMMENT1,COMMENT2,COMMENT3,COMMENT4,COMMENT5,COMMENT6,COMMENT7,COMMENT8,COMMENT9,COMMENT10,COMMENT11,COMMENT12,COMMENT13,PUSH_BACK,HANDLER,DSK_USED,CHK_IN_OPEN,CHK_IN_CLOSE,BOARD_OPEN,BOARD_CLOSE,DOORS_SHUT,COMMENT_CHK_IN,COMMENT_BOARD,REF_TRIP,INFO_GIVEN_PAX,PAX_REACTION,EXP_INCURRED,OTHER_GSE,OPERATOR,PROVIDER,COMMENT_CLEAN,COMMENT_RAMP,COMMENT_CGO,COMMENT_CATERING,EXP_AUTH_BY,COMMENT_CREW,CURRENCY,WO_HNDL_INV,APT_FEES_INV,APT_FEES_AMT,APT_FEES_PAY,APT_FEES_RMK,TASPT_INV,TASPT_AMT,TASPT_PAY,TASPT_RMK,VIP_ARV_INV,VIP_ARV_AMT,VIP_ARV_PAY,VIP_ARV_RMK,VIP_ARV_PRO,VIP_DEP_INV,VIP_DEP_AMT,VIP_DEP_PAY,VIP_DEP_RMK,VIP_DEP_PRO,CATERING_INV,CATERING_AMT,CATERING_PAY,CATERING_RMK,CATERING_PRO,CREW_TRS_INV,CREW_TRS_AMT,CREW_TRS_PAY,CREW_TRS_RMK,CREW_TRS_PRO,PAX_TRS_INV,PAX_TRS_AMT,PAX_TRS_PAY,PAX_TRS_RMK,PAX_TRS_PRO,CREW_HTC_INV,CREW_HTC_AMT,CREW_HTC_PAY,CREW_HTC_RMK,CREW_HTC_PRO,PAX_HTC_INV,PAX_HTC_AMT,PAX_HTC_PAY,PAX_HTC_RMK,PAX_HTC_PRO,FUEL_INV,FUEL_AMT,FUEL_PAY,FUEL_RMK,FUEL_PRO,CGO_INV,CGO_AMT,CGO_PAY,CGO_RMK,CGO_PRO,TECH_INT_INV,TECH_INT_AMT,TECH_INT_PAY,TECH_INT_RMK,TECH_INT_PRO,LND_PMT_AMT,LND_PMT_RMK,TRVL_EXP_AMT,TRVL_EXP_RMK,PORTERS_AMT,PORTERS_RMK,PRNT_PAGES_AMT,PRNT_PAGES_RMK,PHONE_COM_AMT,PHONE_COM_RMK,OTHER_CHG1,OTHER_CHG1_INV,OTHER_CHG1_AMT,OTHER_CHG1_PAY,OTHER_CHG1_RMK,OTHER_CHG1_PRO,OTHER_CHG2,OTHER_CHG2_INV,OTHER_CHG2_AMT,OTHER_CHG2_PAY,OTHER_CHG2_RMK,OTHER_CHG2_PRO,CURRENC_EX_BUY,CURRENC_EX_SELL,SUPERVISION_ARV_BY,APPROVED_BY,RECEIVED_AT,SUP_CHARGE_NOTE_AMT,SUP_CHARGE_NOTE_INV,SUP_CHARGE_NOTE_RMK,EXCESS_BAG,VERSION,MOTIF,DATE_SUP,TRS_APT_INV,TRS_APT_PRO,TRS_APT_PAY,TRS_APT_AMT,TRS_APT_RMK,SUPERVISION_DEP_BY,GPU,GPU_TIME,ASU,flight_number_arv,CUSTOMER,OTHER_CHG3,OTHER_CHG3_INV,OTHER_CHG3_AMT,OTHER_CHG3_PAY,OTHER_CHG3_RMK,OTHER_CHG3_PRO,OTHER_CHG4,OTHER_CHG4_INV,OTHER_CHG4_AMT,OTHER_CHG4_PAY,OTHER_CHG4_RMK,OTHER_CHG4_PRO,CORVER_BY,CUTE_INV,CUTE_AMT,CUTE_PAY,CUTE_RMK,AMBU_NBR,WCH_NBR,UMNR_NBR,FAE_LINK,APT_FEES_LINK,CATERING_LINK,APT_TRANS_LINK,CREW_TRANS_LINK,PAX_TRANS_LINK,FUEL_LINK,CREW_HOTAC_LINK,PAX_HOTAC_LINK,CGO_FEES_LINK,TECH_INTER_LINK,FACTURETTES_LINK,TASPT_LINK,CUTE_LINK,QSR_LINK,ROJ_WO_LINK,IMOC_FORM_LINK,IMOC_HDLG_LINK,Service_Type,OTHER_CHG5,OTHER_CHG5_INV,OTHER_CHG5_AMT,OTHER_CHG5_PAY,OTHER_CHG5_RMK,OTHER_CHG5_PRO,MEDICAL_INV,MEDICAL_AMT,MEDICAL_PAY,MEDICAL_RMK,MEDICAL_PRO,OTHER_CHG1_LINK,OTHER_CHG2_LINK,OTHER_CHG3_LINK,OTHER_CHG4_LINK,OTHER_CHG5_LINK,MEDICAL_LINK}=req.body   
    const COMMENT=`1-${COMMENT1} \n 2-${COMMENT2} \n 3-${COMMENT3} \n 4-${COMMENT4} \n 5-${COMMENT5} \n 6-${COMMENT6} \n 7-${COMMENT7} \n 8-${COMMENT8} \n 9-${COMMENT9} \n 10${COMMENT10} \n 11-${COMMENT11} \n 12-${COMMENT12} \n 13-${COMMENT13}`
    
    //console.log('MOMENT', moment("2021-06-28T23:00:00.000Z").format("MMM Do YY"));
    
   // if (date){console.log('date-insert-null',date)}

      if (typeof(date)=='number'){
    var Timestamp = Math.round((date-25569)*86400*1000)
    
    var date2 = moment(new Date(Timestamp)); //Pass in unix timestamp instead of Excel date
    console.log('date2',date2);
    // console.log('moment(new Date(date))',moment(new Date(Timestamp)));
    date = date2.format('YYYY-MM-DD');
    DATE=date2.format('DD-MMM')
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
   
    } 
     /////// ARV_dte
     if (typeof(ARV_DTE)=='number'){
      var Timestamp_ARV_DTE = Math.round((ARV_DTE-25569)*86400*1000)
   
      var ARV_DTE2 = moment(new Date(Timestamp_ARV_DTE)); //Pass in unix timestamp instead of Excel date
      
      ARV_DTE = ARV_DTE2.format('YYYY-MM-DD');
     console.log('date',ARV_DTE);
     
//////////// diff between date & ARV_DTE //////////////
console.log('date',date);
const T1=`${ARV_DTE}T23:00:00`;
const T2=`${date}T23:30:00`;
// const T1=`${ARV_DTE}T${AA}`;
// const T2=`${date}T${AD}`;
let DIFF_TIME;
DIFF_TIME=(new Date(T2)-new Date(T1))/3600000;
console.log("new Date(T2)-new Date(T1)",(new Date(T2)-new Date(T1))/3600000)
// console.log('dateT23:30:00',T1);
console.log('DIFF_TIME',DIFF_TIME);

////////////////////////////////////////////////////////

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
         AA=`${AA_h}:${AA_m}`;

         let ID=`${Registration}-${Trip}-${Station}-${DATE}`;

        let now=new Date();
        const T=`${date}T${AD}:00`;
        
        let date_delay=new Date(T)
        let A=(now.getTime()-date_delay.getTime())/(1000 * 60 * 60 * 24); 
        let B=(A-Math.trunc(A))*24;
        Delay_invoice=(Math.trunc(A))+" days "+Math.trunc(B)+" Hours"  ;

        /////// 

        if(CUSTOMER=="1111"){CURRENCY="MAD"};
        let M=MTOW;
 ////////////////////////// handling ////////////////////////////
 

 if ((M<=7) && (M>0))
{ 
  if(CUSTOMER!="1111"){
    Concession=30; 
    Handling=169;
    BasicFee=180;
    Concession_handler=36;
  }
   else{
    if(Station!="GMAD"){
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
   } 
}
/////////////////////////////////////////////
 
 if ((M<=15) && (M>7))
 { 
  if(CUSTOMER!="1111"){
   Concession=30; 
   BasicFee=180;
   Handling=224;
   Concession_handler=36;
  }
  else{
    if(Station!="GMAD"){
      Handling=2465;
      Concession_handler=360;
      BasicFee=1980;
      Concession=300;
      }
      else{
       Handling=1650;
       Concession_handler=360;
       BasicFee=1980;
       Concession=300;
      }
  }

 }
 //////////////////////////
 if ((M<=19) && (M>15))
 { 
  if(CUSTOMER!="1111"){
   Concession=35; 
   BasicFee=190;
   Handling=224;
   Concession_handler=49;
  }
  else{
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
  }
 }
 /////////////////////////
 if ((M<=30) && (M>19))
 { 
  if(CUSTOMER!="1111"){
   Concession=35; 
   BasicFee=190;
   Handling=361;
   Concession_handler=49;
  }
    else{if(Station!="GMAD"){
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
    }
 }
 
 ////////////////////////////////////////////////////////
 if ((M<=40) && (M>30))
 { 
  if(CUSTOMER!="1111"){
   Concession=40; 
   BasicFee=200;
   Handling=571;
   Concession_handler=84;
  }
    else{
      if(Station!="GMAD"){
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
    }
   
 }
 ////////////////////////
 if ((M<=50) && (M>40))
 { 
  if(CUSTOMER!="1111"){
   Concession=40;     
   BasicFee=250;
   Handling=611;
   Concession_handler=84;
  }
    else{
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
    }
  }
 //////////////////////////
  if ((M<=60) && (M>50))
 { 
  if(CUSTOMER!="1111"){
   Concession=45; 
   BasicFee=250;
   Handling=710;
   Concession_handler=84;
  }
    else{
      if(Station!="GMAD"){
        Handling=7810;
        Concession_handler=840;
        BasicFee=2750;
        Concession=400;
        }else{
         Handling=6875;
         Concession_handler=840;
         BasicFee=2750;
         Concession=400;
        }
    }   
 }
 ////////////
 
 if ((M<=70) && (M>60))
 {  
  if(CUSTOMER!="1111"){  
   Concession=45; 
   BasicFee=250;
   Handling=990;
   Concession_handler=110;
  }else{
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
  }  
}
 /////////////////////////
 if ((M<=80) && (M>71))
 { 
  if(CUSTOMER!="1111"){  
   Concession=45; 
   BasicFee=250;
   Handling=1045;
   Concession_handler=110;
  }else{
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
  }
}
 ////
 if ((M<=100) && (M>81))
 { 
  if(CUSTOMER!="1111"){ 
   Concession=50; 
   BasicFee=300;
   Handling=1290;
   Concession_handler=110;
  }
  else{
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
  }
 }
 //// 
 
 if ((M<=120) && (M>100))
 {
  if(CUSTOMER!="1111"){ 
   Concession=50; 
   BasicFee=300;
   Handling=1322;
   Concession_handler=158;
  }
  else{
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
  }
 }
 ////
 
 if ((M<=150) && (M>120))
 { 
  if(CUSTOMER!="1111"){
   Concession=50; 
   BasicFee=300;
   Handling=1650;
   Concession_handler=158;
  }
  else{
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
  }
 }
 ////
 
 if ((M<=180) && (M>150))
 { 
  if(CUSTOMER!="1111"){   
   Concession=50; 
   BasicFee=350;
   Handling=1650;
   Concession_handler=158;
  }
  else{
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
  }

 }
 ////
 if ((M<=200) && (M>180))
 { 
  if(CUSTOMER!="1111"){   
   Concession=50; 
   BasicFee=350;
   Handling=2400;
   Concession_handler=158;
  }
  else{
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
  }
 }
 //////////////////
 if ((M<=230) && (M>200))
 {  
  if(CUSTOMER!="1111"){ 
   Concession=50; 
   BasicFee=350;
   Handling=2400;
   Concession_handler=228;
  }
   else{
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
    }
 }
 ////
 if ((M<=300) && (M>230))
 {     
  if(CUSTOMER!="1111"){ 
   Concession=50; 
   BasicFee=400;
   Handling=2500;
   Concession_handler=228;
  }
  else{
    if(Station!="GMAD"){
      Handling=27500;
      Concession_handler=2280;
      BasicFee=4400;
      Concession=550;
      }
      else {
       Handling=24695;
       Concession_handler=2280;
       BasicFee=4400;
       Concession=550;
      }
  }
   
 }
 ////
 if (M>300)
 { 
  if(CUSTOMER!="1111"){    
   Concession=50; 
   BasicFee=400;
   Handling=3100;
   Concession_handler=300;
  }
    else{
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
    }
 }
 ////////////////////////
 if(HANDLER=="NIL"){Concession=550; Handling=Concession_handler=0;} ;

 ////////////////
   if ( NAT_FLT=="TECH") { 
      Handling=Math.trunc(+(Handling/2)) ;
   } 
   console.log("Math.trunc(+(Services/2))",Math.trunc(+(Handling/2)))
//////////////////////////////// End Handling


const sql="INSERT INTO flight (Disb,CIQ_Coordination,Fast_Track,Handling,Concession,BasicFee,Concession_handler,Delay_invoice, ID,flight_number,registration,station,trip,date,MTD_PAY,ACFT,MTOW,TTL_CREW,NAT_FLT,ARV_DTE,PROV,DEST,PAX_IN,PAX_OUT,CGO_IN,CGO_OUT,EA,AA,ED,AD,PKG,DLY_CODE,DLY_TIME,DLY_REASON,INF_IN_OUT,LIGHTING,COMMENT,PUSH_BACK,HANDLER,DSK_USED,CHK_IN_OPEN,CHK_IN_CLOSE,BOARD_OPEN,BOARD_CLOSE,DOORS_SHUT,COMMENT_CHK_IN,COMMENT_BOARD,REF_TRIP,INFO_GIVEN_PAX,PAX_REACTION,EXP_INCURRED,OTHER_GSE,OPERATOR,PROVIDER,COMMENT_CLEAN,COMMENT_RAMP,COMMENT_CGO,COMMENT_CATERING,EXP_AUTH_BY,COMMENT_CREW,CURRENCY,WO_HNDL_INV,APT_FEES_INV,APT_FEES_AMT,APT_FEES_PAY,APT_FEES_RMK,TASPT_INV,TASPT_AMT,TASPT_PAY,TASPT_RMK,VIP_ARV_INV,VIP_ARV_AMT,VIP_ARV_PAY,VIP_ARV_RMK,VIP_ARV_PRO,VIP_DEP_INV,VIP_DEP_AMT,VIP_DEP_PAY,VIP_DEP_RMK,VIP_DEP_PRO,CATERING_INV,CATERING_AMT,CATERING_PAY,CATERING_RMK,CATERING_PRO,CREW_TRS_INV,CREW_TRS_AMT,CREW_TRS_PAY,CREW_TRS_RMK,CREW_TRS_PRO,PAX_TRS_INV,PAX_TRS_AMT,PAX_TRS_PAY,PAX_TRS_RMK,PAX_TRS_PRO,CREW_HTC_INV,CREW_HTC_AMT,CREW_HTC_PAY,CREW_HTC_RMK,CREW_HTC_PRO,PAX_HTC_INV,PAX_HTC_AMT,PAX_HTC_PAY,PAX_HTC_RMK,PAX_HTC_PRO,FUEL_INV,FUEL_AMT,FUEL_PAY,FUEL_RMK,FUEL_PRO,CGO_INV,CGO_AMT,CGO_PAY,CGO_RMK,CGO_PRO,TECH_INT_INV,TECH_INT_AMT,TECH_INT_PAY,TECH_INT_RMK,TECH_INT_PRO,LND_PMT_AMT,LND_PMT_RMK,TRVL_EXP_AMT,TRVL_EXP_RMK,PORTERS_AMT,PORTERS_RMK,PRNT_PAGES_AMT,PRNT_PAGES_RMK,PHONE_COM_AMT,PHONE_COM_RMK,OTHER_CHG1,OTHER_CHG1_INV,OTHER_CHG1_AMT,OTHER_CHG1_PAY,OTHER_CHG1_RMK,OTHER_CHG1_PRO,OTHER_CHG2,OTHER_CHG2_INV,OTHER_CHG2_AMT,OTHER_CHG2_PAY,OTHER_CHG2_RMK,OTHER_CHG2_PRO,CURRENC_EX_BUY,CURRENC_EX_SELL,SUPERVISION_ARV_BY,APPROVED_BY,RECEIVED_AT,SUP_CHARGE_NOTE_AMT,SUP_CHARGE_NOTE_INV,SUP_CHARGE_NOTE_RMK,EXCESS_BAG,VERSION,MOTIF,DATE_SUP,TRS_APT_INV,TRS_APT_PRO,TRS_APT_PAY,TRS_APT_AMT,TRS_APT_RMK,SUPERVISION_DEP_BY,GPU,GPU_TIME,ASU,flight_number_arv,CUSTOMER,OTHER_CHG3,OTHER_CHG3_INV,OTHER_CHG3_AMT,OTHER_CHG3_PAY,OTHER_CHG3_RMK,OTHER_CHG3_PRO,OTHER_CHG4,OTHER_CHG4_INV,OTHER_CHG4_AMT,OTHER_CHG4_PAY,OTHER_CHG4_RMK,OTHER_CHG4_PRO,CORVER_BY,CUTE_INV,CUTE_AMT,CUTE_PAY,CUTE_RMK,AMBU_NBR,WCH_NBR,UMNR_NBR,FAE_LINK,APT_FEES_LINK,CATERING_LINK,APT_TRANS_LINK,CREW_TRANS_LINK,PAX_TRANS_LINK,FUEL_LINK,CREW_HOTAC_LINK,PAX_HOTAC_LINK,CGO_FEES_LINK,TECH_INTER_LINK,FACTURETTES_LINK,TASPT_LINK,CUTE_LINK,QSR_LINK,ROJ_WO_LINK,IMOC_FORM_LINK,IMOC_HDLG_LINK,Service_Type,OTHER_CHG5,OTHER_CHG5_INV,OTHER_CHG5_AMT,OTHER_CHG5_PAY,OTHER_CHG5_RMK,OTHER_CHG5_PRO,MEDICAL_INV,MEDICAL_AMT,MEDICAL_PAY,MEDICAL_RMK,MEDICAL_PRO,OTHER_CHG1_LINK,OTHER_CHG2_LINK,OTHER_CHG3_LINK,OTHER_CHG4_LINK,OTHER_CHG5_LINK,MEDICAL_LINK) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);"


pool.query(sql,[Disb,CIQ_Coordination,Fast_Track,Handling,Concession,BasicFee,Concession_handler,Delay_invoice,ID,Flt_nbr,Registration,Station,Trip,date,MTD_PAY,ACFT,MTOW,TTL_CREW,NAT_FLT,ARV_DTE,PROV,DEST,PAX_IN,PAX_OUT,CGO_IN,CGO_OUT,EA,AA,ED,AD,PKG,DLY_CODE,DLY_TIME,DLY_REASON,INF_IN_OUT,LIGHTING,COMMENT,PUSH_BACK,HANDLER,DSK_USED,CHK_IN_OPEN,CHK_IN_CLOSE,BOARD_OPEN,BOARD_CLOSE,DOORS_SHUT,COMMENT_CHK_IN,COMMENT_BOARD,REF_TRIP,INFO_GIVEN_PAX,PAX_REACTION,EXP_INCURRED,OTHER_GSE,OPERATOR,PROVIDER,COMMENT_CLEAN,COMMENT_RAMP,COMMENT_CGO,COMMENT_CATERING,EXP_AUTH_BY,COMMENT_CREW,CURRENCY,WO_HNDL_INV,APT_FEES_INV,APT_FEES_AMT,APT_FEES_PAY,APT_FEES_RMK,TASPT_INV,TASPT_AMT,TASPT_PAY,TASPT_RMK,VIP_ARV_INV,VIP_ARV_AMT,VIP_ARV_PAY,VIP_ARV_RMK,VIP_ARV_PRO,VIP_DEP_INV,VIP_DEP_AMT,VIP_DEP_PAY,VIP_DEP_RMK,VIP_DEP_PRO,CATERING_INV,CATERING_AMT,CATERING_PAY,CATERING_RMK,CATERING_PRO,CREW_TRS_INV,CREW_TRS_AMT,CREW_TRS_PAY,CREW_TRS_RMK,CREW_TRS_PRO,PAX_TRS_INV,PAX_TRS_AMT,PAX_TRS_PAY,PAX_TRS_RMK,PAX_TRS_PRO,CREW_HTC_INV,CREW_HTC_AMT,CREW_HTC_PAY,CREW_HTC_RMK,CREW_HTC_PRO,PAX_HTC_INV,PAX_HTC_AMT,PAX_HTC_PAY,PAX_HTC_RMK,PAX_HTC_PRO,FUEL_INV,FUEL_AMT,FUEL_PAY,FUEL_RMK,FUEL_PRO,CGO_INV,CGO_AMT,CGO_PAY,CGO_RMK,CGO_PRO,TECH_INT_INV,TECH_INT_AMT,TECH_INT_PAY,TECH_INT_RMK,TECH_INT_PRO,LND_PMT_AMT,LND_PMT_RMK,TRVL_EXP_AMT,TRVL_EXP_RMK,PORTERS_AMT,PORTERS_RMK,PRNT_PAGES_AMT,PRNT_PAGES_RMK,PHONE_COM_AMT,PHONE_COM_RMK,OTHER_CHG1,OTHER_CHG1_INV,OTHER_CHG1_AMT,OTHER_CHG1_PAY,OTHER_CHG1_RMK,OTHER_CHG1_PRO,OTHER_CHG2,OTHER_CHG2_INV,OTHER_CHG2_AMT,OTHER_CHG2_PAY,OTHER_CHG2_RMK,OTHER_CHG2_PRO,CURRENC_EX_BUY,CURRENC_EX_SELL,SUPERVISION_ARV_BY,APPROVED_BY,RECEIVED_AT,SUP_CHARGE_NOTE_AMT,SUP_CHARGE_NOTE_INV,SUP_CHARGE_NOTE_RMK,EXCESS_BAG,VERSION,MOTIF,DATE_SUP,TRS_APT_INV,TRS_APT_PRO,TRS_APT_PAY,TRS_APT_AMT,TRS_APT_RMK,SUPERVISION_DEP_BY,GPU,GPU_TIME,ASU,flight_number_arv,CUSTOMER,OTHER_CHG3,OTHER_CHG3_INV,OTHER_CHG3_AMT,OTHER_CHG3_PAY,OTHER_CHG3_RMK,OTHER_CHG3_PRO,OTHER_CHG4,OTHER_CHG4_INV,OTHER_CHG4_AMT,OTHER_CHG4_PAY,OTHER_CHG4_RMK,OTHER_CHG4_PRO,CORVER_BY,CUTE_INV,CUTE_AMT,CUTE_PAY,CUTE_RMK,AMBU_NBR,WCH_NBR,UMNR_NBR,FAE_LINK,APT_FEES_LINK,CATERING_LINK,APT_TRANS_LINK,CREW_TRANS_LINK,PAX_TRANS_LINK,FUEL_LINK,CREW_HOTAC_LINK,PAX_HOTAC_LINK,CGO_FEES_LINK,TECH_INTER_LINK,FACTURETTES_LINK,TASPT_LINK,CUTE_LINK,QSR_LINK,ROJ_WO_LINK,IMOC_FORM_LINK,IMOC_HDLG_LINK,Service_Type,OTHER_CHG5,OTHER_CHG5_INV,OTHER_CHG5_AMT,OTHER_CHG5_PAY,OTHER_CHG5_RMK,OTHER_CHG5_PRO,MEDICAL_INV,MEDICAL_AMT,MEDICAL_PAY,MEDICAL_RMK,MEDICAL_PRO,OTHER_CHG1_LINK,OTHER_CHG2_LINK,OTHER_CHG3_LINK,OTHER_CHG4_LINK,OTHER_CHG5_LINK,MEDICAL_LINK],(err,result)=> {
                              res.send('<h1>data well recorded into database</h1>');
    fs.copyFile(pats,patc, (err)=>{ if (err) { console.log(err)}});
     fs.unlink(pats, (err)=>{ if (err) { console.log(err)
    }})})
  
       
        // fs.copyFile(pats,patc, (err)=>{ if (err) { console.log(err)}})
        //fs.unlink(pats, (err)=>{ if (err) { console.log(err)}})
  
       
});


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
  pool.query(sqlGet,(err,result)=>{res.send(result);console.log(result)} )
  console.log("Hello FastComet")
});
////// Insert Invoice number for the flight
app.put('/api/flight/invoice', (req,res)=>{
  console.log("req.body2222",req.body)
  const sqlUpdate="UPDATE flight SET INVOICE_NBR = ? WHERE ID= ?" ;
  pool.query(sqlUpdate,[req.body.InvoiceNumber,req.body.ID],(err,result)=>{res.send(result);console.log(result)} )
  
});
//////
////// Insert Checked on localhost:1500
app.post('/api/flight/post', (req,res)=>{
  
 const sql="INSERT INTO flight (ID,QCM_CHECK) VALUES (?,?);"
 console.log("req.body/////",req.body)

 let Checked=req.body.Checked;
 let ID=req.body.ID;
  pool.query(sql,[ID,Checked],(err,result)=>{res.send(result);console.log(result)} )
  
});
//////
///////////// Get Exchanges Rates
// app.get('/api/invoice/getRates/:id', (req,res)=>{
   
//   const sqlGet=`SELECT ID FROM invoice WHERE ID_INVOICE = ${req.params.id}` ;
//   pool.query(sqlGet,(err,result)=>{res.send(result);console.log(result)} )
//   console.log("Hello FastComet")
// });
////////////////////////////
app.listen("1501", ()=> console.log("Server running on port 1501"))
