import React from 'react'
import { useTable, usePagination } from 'react-table'
import styled from 'styled-components'
import Facture from "./Facture";
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import  ReactPDF  from '@react-pdf/renderer';
import  BasicFee  from './BasicFee';
import  Permit  from './Permit';
import  AddServices  from './AddServices';
import  Surcharges  from './Surcharges';
import  Subtotal1  from './Subtotal1';
import  Subtotal2  from './Subtotal2';
import  { useState, useEffect } from "react";
import  AirportFees  from './AirportFees';
import  Other  from './Other';
import Handling1 from './Handling1';
import BasicFee2 from "./BasicFee2";
import AptConcession from "./AptConcession";
import axios from "axios";


function InvoiceTest(props) {


  const [ClientDetails,setClientDetails]=useState([]);

  const [FuelDetails,setFuelDetails]=useState([]);
  // const ClientID=props.Q[0].PROVIDER_CODE;
  const ClientID=props.Q[0];
  let Fuel=((ClientID[0].ID).split("/"))[1];
  console.log("((ClientID[0].ID).split))[1]idààààààààààààààà",Fuel);
  let Flight_ID="";

  if(Fuel=="F"){
   Flight_ID=((ClientID[0].ID).split("/"))[0];
  }
 
   

  // console.log("XXXXXXXClientID//////",ClientID)
  // const PROVIDER_code=ClientID[0].PROVIDER_CODE;
  // console.log("XXXXXXX ClientID[0].PROVIDER_CODE",ClientID[0].PROVIDER_CODE)
  //////// Exchanges rates from DB -Table Invoice
  const [Rates,setRates]=useState([])
  
  useEffect(()=>{
   
      //////////////////////// FUEL DETAILS///////
//       const F=Flight_ID;
//   const GetDetailsFuel = async () => {
//     try {
//         const resp = await axios.get('http://127.0.0.1:1501/api/details/fuel/get/'+F);
//         setFuelDetails(resp.data[0]);  
//         console.log("resp.data[0] FUEL**",resp.data[0]);            

//     } catch (err) {
//       throw new Error('Unable to establish Connection with database!!');
//         console.error(err);
//     }
// }; 

  ////////////////////////////// END FUEL DETAILS
     
  const sendGetratesRequest = async () => {
    try {
        const resp = await axios.get('http://127.0.0.1:1501/api/invoice/get/1');
        setRates(resp.data[0]);
      console.log("resp.data[0] rates**",resp.data[0]);
      console.log("XXXXXXX ClientID[0].PROVIDER_CODE",ClientID[0].PROVIDER_CODE)
        

    } catch (err) {
      throw new Error('Unable to establish Connection with database!!');
        console.error(err);
    }
 };
//////////////////////// Get Provider Address details
const GetAddress = async () => {
  try {
      const respAddress = await axios.get('http://127.0.0.1:1501/api/client/get/'+ClientID[0].PROVIDER_CODE);
      setClientDetails(respAddress.data[0]);
    console.log("respAddress.data[0] Clients**",respAddress.data[0]);
  } catch (err) {
    throw new Error('Unable to establish Connection with database!!');
    }
};
//////////////////// End Provider Address details

sendGetratesRequest();
GetAddress();
// GetDetailsFuel();





// GetAddress();



},[])  ///////// End useEffect




  function number2text(value,currency) {
  let cur;
    switch(currency) {
        case "EUR":
          cur="EUROS";
          break;
        case "USD":
            cur="DOLLARS";
          break;
        case "MAD":
            cur="DIRHAMS";
      }
    var fraction = Math.round(frac(value)*100);
    var f_text  = "";

    if(fraction > 0) {
        f_text = "AND "+convert_number(fraction)+" CENTS";
    }

    return convert_number(value)+" "+cur+" " +f_text;
}

function frac(f) {
    return f % 1;
}

function convert_number(number)
{
    if ((number < 0) || (number > 999999999)) 
    { 
        return "NUMBER OUT OF RANGE!";
    }
    var Gn = Math.floor(number / 10000000);  /* Crore */ 
    number -= Gn * 10000000; 
    var kn = Math.floor(number / 100000);     /* lakhs */ 
    number -= kn * 100000; 
    var Hn = Math.floor(number / 1000);      /* thousand */ 
    number -= Hn * 1000; 
    var Dn = Math.floor(number / 100);       /* Tens (deca) */ 
    number = number % 100;               /* Ones */ 
    var tn= Math.floor(number / 10); 
    var one=Math.floor(number % 10); 
    var res = ""; 

    if (Gn>0) 
    { 
        res += (convert_number(Gn) + " CRORE"); 
    } 
    if (kn>0) 
    { 
            res += (((res=="") ? "" : " ") + 
            convert_number(kn) + " LAKH"); 
    } 
    if (Hn>0) 
    { 
        res += (((res=="") ? "" : " ") +
            convert_number(Hn) + " THOUSAND"); 
    } 

    if (Dn) 
    { 
        res += (((res=="") ? "" : " ") + 
            convert_number(Dn) + " HUNDRED"); 
    } 


    var ones = Array("", "ONE", "TWO", "THREE", "FOUR", "FIVE", "SIX","SEVEN", "EIGHT", "NINE", "TEN", "ELEVEN", "TWELVE", "THIRTEEN","FOURTEEN", "FIFTEEN", "SIXTEEN", "SEVENTEEN", "EIGHTEEN","NINETEEN"); 
var tens = Array("", "", "TWENTY", "THIRTY", "FOURTY", "FIFTY", "SIXTY","SEVENTY", "EIGHTY", "NINETY"); 

    if (tn>0 || one>0) 
    { 
        if (!(res=="")) 
        { 
            res += " AND "; 
        } 
        if (tn < 2) 
        { 
            res += ones[tn * 10 + one]; 
        } 
        else 
        { 

            res += tens[tn];
            if (one>0) 
            { 
                res += ("-" + ones[one]); 
            } 
        } 
    }

    if (res=="")
    { 
        res = "zero"; 
    } 
    return res;
}
  const [OtherTTL,setOtherTTL]=useState();
  const [SurchargeTTL,setSurchargeTTL]=useState();
  const [AdditionalTTL,setAdditionalTTL]=useState();
  const [PermitTTL,setPermitTTL]=useState();
  const [BasicTTL,setBasicTTL]=useState();

  const [AptConcessionTTL,setAptConcessionTTL]=useState();

  const [AirportTTL,setAirportTTL]=useState();
  const [HandlingTTL,setHandlingTTL]=useState();
  
  
  const styles = StyleSheet.create({
    body: {
      paddingTop: 35,
      paddingBottom: 65,
      paddingHorizontal: 35,
    },
    title: {
      marginTop: 50,
      fontSize: 20,
      textAlign: 'center'
      // fontFamily: 'Arial'
    },
    author: {
      fontSize: 15,
      textAlign: 'center',
      marginBottom: 40,
    },
    subtitle: {
      fontSize: 14,
      margin: 12,
      fontFamily: 'Oswald'
    },
    text: {
      margin: 12,
      fontSize: 14,
      textAlign: 'justify',
      fontFamily: 'Times-Roman'
    },
    image: {
      marginVertical: 15,
      marginHorizontal: 100,
    },
    header: {
      fontSize: 12,
      marginBottom: 20,
      textAlign: 'center',
      color: 'grey',
    },
    pageNumber: {
      position: 'absolute',
      fontSize: 12,
      bottom: 30,
      left: 0,
      right: 0,
      textAlign: 'center',
      color: 'grey',
    },
  });
  
     console.log("props",props)
        const [data, setData] = React.useState(() => props.Q )
        // const [data_Holiday, setdata_Holiday] = React.useState(() => props.Holiday )
        // const [originalData] = React.useState(data)
     console.log("data[0]",data[0])

      let sita=""
    switch (data[0][0].station) {
case "GMAD":
  sita="AGA"
break;
case "GMTA":
  sita="AHU"
break;

case "GMMN":
  sita="CMN"
break;
case "GMAT":
  sita="TTA"
break;
case "GMMX":
 sita="RAK"
break;
case "GMMH":
 sita="VIL"
break;
case "GMML":
 sita="EUN"
break;
case "GMAG":
 sita="GLN"
break;
case "GMFB":
 sita="UAR"
break;
case "GMAT":
 sita="TTA"
break;

case "GMMZ":
 sita="OZZ"
break;
case "GMFO":
 sita="OUD"
break;
case "GMMD":
 sita="BEM"
break;
case "GMMB":
 sita="GMD"
break;
case "GMFK":
 sita="ERH"
break;
case "GMME":
 sita="RBA"
break;
case "GMTT":
 sita="TNG"
break;
case "GMMW":
 sita="NDR"
break;
case "GMTN":
 sita="TTU"
break;
case "GMFF":
 sita="FEZ"
break;
default:
// code block
};


const Disb_F_NBR=data[0][0].Disb_F_NBR;
const CURRENCY_F_NBR=data[0][0].CURRENCY_F_NBR;
const BasicFee_F_NBR=data[0][0].BasicFee_F_NBR;
const AptConcession_F_NBR=data[0][0].AptConcession_F_NBR;
const ConcessionH_F_NBR=data[0][0].ConcessionH_F_NBR;
const Handling_F_NBR=data[0][0].Handling_F_NBR;




const B=data[0][0].MTOW;
const ID=data[0][0].ID;

const ACT_ARV_DATE=data[0][0].ACT_ARV_DATE;
const ACT_DPT_DATE=data[0][0].ACT_DPT_DATE;

const IsHandling_F=data[0][0].IsHandling_F;
const IsConcessionH_F=data[0][0].IsConcessionH_F;
const HandlingDB=data[0][0].Handling;
const Concession_handlerDB=data[0][0].Concession_handler;
const Registration=data[0][0].registration;

const IsCURRENCY_F=data[0][0].IsCURRENCY_F;
const IsDisb_F=data[0][0].IsDisb_F;
const CURRENCY_DB=data[0][0].CURRENCY;
const Disb_DB=data[0][0].Disb;

const BasicFeeDB=data[0][0].BasicFee;
const ConcessionDB=data[0][0].Concession;

const IsAptConcession_F=data[0][0].IsAptConcession_F;
const IsBasicFee_F=data[0][0].IsBasicFee_F;

const PMT_BY_STARS=data[0][0].PMT_BY_STARS;
//  IsAptConcession_F={IsAptConcession_F} IsBasicFee_F={IsBasicFee_F=}
/////////////////////////
    let OTHER_CHG1=data[0][0].OTHER_CHG1; 
    let OTHER_CHG1_AMT=data[0][0].OTHER_CHG1_AMT; 
    let OTHER_CHG1_INV=data[0][0].OTHER_CHG1_INV; 

    let OTHER_CHG2=data[0][0].OTHER_CHG2; 
    let OTHER_CHG2_AMT=data[0][0].OTHER_CHG2_AMT; 
    let OTHER_CHG2_INV=data[0][0].OTHER_CHG2_INV;

    let OTHER_CHG3=data[0][0].OTHER_CHG3; 
    let OTHER_CHG3_AMT=data[0][0].OTHER_CHG3_AMT; 
    let OTHER_CHG3_INV=data[0][0].OTHER_CHG3_INV;

    let OTHER_CHG4=data[0][0].OTHER_CHG4; 
    let OTHER_CHG4_AMT=data[0][0].OTHER_CHG4_AMT; 
    let OTHER_CHG4_INV=data[0][0].OTHER_CHG4_INV;

    let OTHER_CHG5=data[0][0].OTHER_CHG5; 
    let OTHER_CHG5_AMT=data[0][0].OTHER_CHG5_AMT; 
    let OTHER_CHG5_INV=data[0][0].OTHER_CHG5_INV;

    let MEDICAL_AMT=data[0][0].MEDICAL_AMT; 
    let MEDICAL_INV=data[0][0].MEDICAL_INV;

    let WCH_NBR=data[0][0].WCH_NBR;
    let AMBU_NBR=data[0][0].AMBU_NBR; 
    let UMNR_NBR=data[0][0].UMNR_NBR;    
    let TOWING_NBR=data[0][0].TOWING_NBR;

    let HANDLER=data[0][0].HANDLER; 
    let PUSH_BACK=data[0][0].PUSH_BACK; 
   
   
   let GPU=data[0][0].GPU; 
   let GPU_TIME=data[0][0].GPU_TIME; 
  //  let GPU_PRICE=data[0][0].GPU_PRICE;
   let ASU=data[0][0].ASU; 
  //  let ASU_PRICE=data[0][0].ASU_PRICE;
   let PROVIDER_CODE=data[0][0].PROVIDER_CODE;
   let Station=data[0][0].station;  
   let CURRENCY=data[0][0].CURRENCY; 
   let CUTE_AMT=data[0][0].CUTE_AMT;
   let FUEL_AMT=data[0][0].FUEL_AMT;
   let FUEL_INV=data[0][0].FUEL_INV;
   let Fast_Track=data[0][0].Fast_Track; 
   let IS_FAST_TRACK=data[0][0].IS_FAST_TRACK;
   let JETEX_RAMP_ARV_NBR=data[0][0].JETEX_RAMP_ARV_NBR;
   let JETEX_RAMP_DPT_NBR=data[0][0].JETEX_RAMP_DPT_NBR;
   let JETEX_RAMP_AMT=data[0][0].JETEX_RAMP_AMT;
   let VIP_ARV_PAX_NBR=data[0][0].VIP_ARV_PAX_NBR;
   let VIP_DPT_PAX_NBR=data[0][0].VIP_DPT_PAX_NBR;

   JETEX_RAMP_AMT=(JETEX_RAMP_DPT_NBR+JETEX_RAMP_ARV_NBR)*500;

      Fast_Track=(IS_FAST_TRACK=="Y" ? 1 : 0)*3000;

   let VIP_LOUNGE_ONLY=JETEX_RAMP_AMT+(VIP_ARV_PAX_NBR+VIP_DPT_PAX_NBR)*500;

   let CIQ_Coordination=data[0][0].CIQ_Coordination;
   let CREW_HTC_AMT=data[0][0].CREW_HTC_AMT;
   let CREW_HTC_INV=data[0][0].CREW_HTC_INV;
   let CREW_TRS_INV=data[0][0].CREW_TRS_INV;
   let CREW_TRS_AMT=data[0][0].CREW_TRS_AMT;
   let PAX_HTC_AMT=data[0][0].PAX_HTC_AMT;
   let PAX_HTC_INV=data[0][0].PAX_HTC_INV;
   let PAX_TRS_AMT=data[0][0].PAX_TRS_AMT;
   let PAX_TRS_INV=data[0][0].PAX_TRS_INV;
   let CATERING_AMT=data[0][0].CATERING_AMT;
   let CATERING_INV=data[0][0].CATERING_INV;

   
///////////////////////////
// const Handling=data[0][0].Handling;
// const Concession_handler=data[0][0].Concession_handler;

// const BasicFee=data[0][0].BasicFee;
// const C=data[0][0].Concession;
///////////////////////////
const NAT_FLT=data[0][0].NAT_FLT;
const WO_HNDL_INV=data[0][0].WO_HNDL_INV;

let APT_FEES_AMT=data[0][0].APT_FEES_AMT;
let TASPT_AMT=data[0][0].TASPT_AMT;

APT_FEES_AMT=(+data[0][0].APT_FEES_AMT).toFixed(2);
TASPT_AMT=(+data[0][0].TASPT_AMT).toFixed(2);

let CREW_ASSIST=data[0][0].CREW_ASSIST;
let TRAVEL=data[0][0].TRVL_EXP_AMT;
const PHONE=data[0][0].PHONE_COM_AMT;
const PRINT=data[0][0].PRNT_PAGES_AMT;
let PHONE_PRINT=data[0][0].PHONE_PRINT;
///////////////////////////////////

let ARV_DTE=data[0][0].ARV_DTE;   
let date=data[0][0].date;

let ARV_DTE_W= new Date(ACT_ARV_DATE);
let DEP_DTE_W= new Date(ACT_DPT_DATE);

//////////// DATE ON INVOICE REF 
let DATE_REF= new Date(date);
let moInvoiceRef;

if (DATE_REF.getMonth()=="0"){
  moInvoiceRef="JAN"
}else if(DATE_REF.getMonth()=="1"){
  moInvoiceRef="FEB"
}else if(DATE_REF.getMonth()=="2"){
  moInvoiceRef="MAR"
}else if(DATE_REF.getMonth()=="3"){
  moInvoiceRef="APR"
}else if(DATE_REF.getMonth()=="4"){
  moInvoiceRef="MAY"
}else if(DATE_REF.getMonth()=="5"){
  moInvoiceRef="JUN"
}else if(DATE_REF.getMonth()=="6"){
  moInvoiceRef="JUL"
}else if(DATE_REF.getMonth()=="7"){
  moInvoiceRef="AUG"
}else if(DATE_REF.getMonth()=="8"){
  moInvoiceRef="SEP"
}else if(DATE_REF.getMonth()=="9"){
  moInvoiceRef="OCT"
}else if(DATE_REF.getMonth()=="10"){
  moInvoiceRef="NOV"
}else if(DATE_REF.getMonth()=="11"){
  moInvoiceRef="DEC"
}
////////////////////////////////

let AA=data[0][0].AA; 
let AD=data[0][0].AD;

const T1=`${ACT_ARV_DATE}T${data[0][0].AA}`; console.log('ARV_DTE',ARV_DTE)
const T2=`${ACT_DPT_DATE}T${data[0][0].AD}`;  

const DIFF_TIME=(new Date(T2)-new Date(T1))/3600000;console.log("DIF____TIME",DIFF_TIME)

const COORDINATION_PERMIT=data[0][0].COORDINATION_PERMIT;
const PERMIT=data[0][0].LND_PMT_AMT;
const IS_PMT_OUT=data[0][0].IS_PMT_OUT;
const PMT_REF=data[0][0].PMT_REF;
const PERMIT_O_DET=data[0][0].PERMIT_O_DET;

const Disb=data[0][0].Disb;
////////////////////////////////DELAY ON DEPARTURE

const T_DELAY1=`${date}T${data[0][0].ED}`;
const T_DELAY2=`${ACT_DPT_DATE}T${data[0][0].AD}`;

const DELAY_TIME=(new Date(T_DELAY2)-new Date(T_DELAY1))/3600000;
////////////////////////////////////////
//////////////// DELAY ON ARRIVAL
const T_DELAY1_ARV=`${ARV_DTE}T${data[0][0].EA}`;
const T_DELAY2_ARV=`${ACT_ARV_DATE}T${data[0][0].AA}`;
const DELAY_TIME_ARV=(new Date(T_DELAY2_ARV)-new Date(T_DELAY1_ARV))/3600000;
/////////////////////////////

let S;
if(AirportTTL!=0 || HandlingTTL!=0 || OtherTTL!=0 ){
 S= <Subtotal2 AirportTTL={AirportTTL} HandlingTTL={HandlingTTL} OtherTTL={OtherTTL}/>
}

let OPERATOR;
// let concat=(data[0][0].OPERATOR).concat(data[0][0].PROVIDER);
// console.log("concat",concat);

let originalOperator=data[0][0].OPERATOR;
let originalProvider=data[0][0].PROVIDER;

let C;
if(PROVIDER_CODE!="0456" & PROVIDER_CODE!="2417"){
  if(CURRENCY=="EUR" ){
    C=50;
  }
  
  if(CURRENCY=="USD" & PROVIDER_CODE!="0456"){
    C=60;
  }
  
}else{
  C=0;
}

let removedSpacesOperator = originalOperator.split(" ").join("");
let removedSpacesProvider = originalProvider.split(" ").join("");

console.log('removedSpacesOperator',removedSpacesOperator);
console.log('removedSpacesProvider',removedSpacesProvider);

if ((removedSpacesOperator).localeCompare(removedSpacesProvider)!==0){
OPERATOR= <Text style={{fontSize:"10", marginLeft:"12"}}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Operator   :    {`${data[0][0].OPERATOR}`} </Text>
}
/////////////// TOTAL
let Total=(Math.round((OtherTTL+AirportTTL+HandlingTTL)*Disb)/100)+(Math.round( (C+OtherTTL+AirportTTL+HandlingTTL)*100)/100)+(Math.round((SurchargeTTL+AdditionalTTL+PermitTTL+BasicTTL)*100)/100);

if(CURRENCY=="MAD"){
Total=(Math.round((OtherTTL+AirportTTL+HandlingTTL)*Disb)/100)+(Math.round((((C+OtherTTL+AirportTTL+HandlingTTL)*Disb)/100)*20)/100)+(Math.round( (OtherTTL+AirportTTL+HandlingTTL)*100)/100)+(Math.round((SurchargeTTL+AdditionalTTL+PermitTTL+BasicTTL)*100)/100);
}
////////////////////
let Sub1=AirportTTL+HandlingTTL+OtherTTL ;
let mo;
let dueMonth;
let  dateNow=new Date();
let  dueDate=new Date();
dueDate.setDate(dateNow.getDate()+30);
console.log('dueDate.getMonth',dueDate.getMonth())

if (dateNow.getMonth()=="0"){
  mo="JAN"
}else if(dateNow.getMonth()=="1"){
  mo="FEB"
}else if(dateNow.getMonth()=="2"){
  mo="MAR"
}else if(dateNow.getMonth()=="3"){
  mo="APR"
}else if(dateNow.getMonth()=="4"){
  mo="MAY"
}else if(dateNow.getMonth()=="5"){
  mo="JUN"
}else if(dateNow.getMonth()=="6"){
  mo="JUL"
}else if(dateNow.getMonth()=="7"){
  mo="AUG"
}else if(dateNow.getMonth()=="8"){
  mo="SEP"
}else if(dateNow.getMonth()=="9"){
  mo="OCT"
}else if(dateNow.getMonth()=="10"){
  mo="NOV"
}else if(dateNow.getMonth()=="11"){
  mo="DEC"
}
 
if (dueDate.getMonth()=="0"){
  dueMonth="JAN"
}else if(dueDate.getMonth()=="1"){
  dueMonth="FEB"
}else if(dueDate.getMonth()=="2"){
  dueMonth="MAR"
}else if(dueDate.getMonth()=="3"){
  dueMonth="APR"
}else if(dueDate.getMonth()=="4"){
  dueMonth="MAY"
}else if(dueDate.getMonth()=="5"){
  dueMonth="JUN"
}else if(dueDate.getMonth()=="6"){
  dueMonth="JUL"
}else if(dueDate.getMonth()=="7"){
  dueMonth="AUG"
}else if(dueDate.getMonth()=="8"){
  dueMonth="SEP"
}else if(dueDate.getMonth()=="9"){
  dueMonth="OCT"
}else if(dueDate.getMonth()=="10"){
  dueMonth="NOV"
}else if(dueDate.getMonth()=="11"){
  dueMonth="DEC"
}
let Behalf;
let Disb_Vat;
if(AirportTTL!=0 || HandlingTTL!=0 || OtherTTL!=0){
  Behalf= <View >
<table style={{ marginLeft:"12",marginRight:"12" }}>
  <tr style={{ border: 1, bordercolor: "black",backgroundColor:"lightgrey"}}>
  <Text style={{fontSize:"12",textAlign:"center",textDecoration:'underline'}}>Payments on your behalf </Text>
  <Text style={{fontWeight:"bold",fontSize:"11",textAlign:"center", marginBottom:"4"}}> Description                                      Additional Info             {`${CURRENCY}`!="MAD" ? "Original Amount in MAD" : "    "}              Amount in ({data[0][0].CURRENCY})</Text>
{/* 
  <Text style={{fontWeight:"bold",fontSize:"11",textAlign:"center", marginBottom:"4"}}> Description                                               Additional Info              Original Amount in MAD  Amount in ({data[0][0].CURRENCY})</Text> */}
  </tr>

</table>
</View>

//////////////////// VAT DISPLAY
let VAT1;
let VAT2;
let VAT3;
let VAT4;
let VAT5;
let CONCESSION;
if(CURRENCY=="MAD" && PROVIDER_CODE=="2417"){
  VAT1=<Text style={{fontSize:"11",textAlign:"right",marginRight:"18"}}>  </Text> 
  VAT2=<Text style={{fontSize:"11",textAlign:"right",marginRight:"18"}}>VAT          : </Text>
  VAT3=<Text style={{fontSize:"10",textAlign:"right",marginRight:"18"}}> Disbursement  x 20 %</Text>
  VAT4=<Text style={{fontSize:"10",textAlign:"center",marginRight:"18"}}> </Text>
  VAT5=<Text style={{fontSize:"11",textAlign:"right",marginRight:"18"}}>{Math.round((((C+OtherTTL+AirportTTL+HandlingTTL)*Disb)/100)*20)/100}</Text>
  }
  
/////////////////////////////
Disb_Vat= <View style={{ flexDirection: "row" }}>

<View style={{ flex: 5 }}>
    <Text style={{fontSize:"11",textAlign:"right",marginRight:"18"}}>  </Text>
    {/* <Text style={{fontSize:"11",textAlign:"right",marginRight:"18"}}>  </Text> */}
    {VAT1} 
  </View>

  <View style={{ flex: 5 }}>
    <Text style={{fontSize:"11",textAlign:"right",marginRight:"18"}}>Disbursement : </Text>
    {/* <Text style={{fontSize:"11",textAlign:"right",marginRight:"18"}}>VAT          : </Text> */}
    {VAT2} 
  </View>
  <View style={{ flex: 1 }}>
    <Text style={{fontSize:"10",textAlign:"right",marginRight:"18"}}>{Sub1!=0 ? "Subtotal(2)": "Subtotal"}  x {Disb}%</Text>
    {/* <Text style={{fontSize:"10",textAlign:"right",marginRight:"18"}}> Disbursement  x 20 %</Text> */}
     {VAT3} 
  </View>
  <View style={{ flex: 5 }}>
    <Text style={{fontSize:"10",textAlign:"center",marginRight:"18"}}> </Text>
    {/* <Text style={{fontSize:"10",textAlign:"center",marginRight:"18"}}> </Text> */}
    {VAT4}  
  </View>
  <View style={{ flex: 1,marginRight:"18"}}>                                                             
  
    <Text style={{fontSize:"11",textAlign:"right",marginRight:"18"}}>{(Math.round( (OtherTTL+AirportTTL+HandlingTTL)*Disb)/100).toFixed(2)}</Text>
    {/* <Text style={{fontSize:"11",textAlign:"right",marginRight:"18"}}>{Math.round((((OtherTTL+AirportTTL+HandlingTTL)*Disb)/100)*20)/100}</Text> */}
    {VAT5}
  </View>
</View>;

///////

 }

 //////////////////////////////////////////
let GPU_PRICE=0;
let ASU_PRICE=0;
let PUSH_PRICE=0;
let WCH_PRICE=0;
let UMNR_PRICE=0;
let AMBU_PRICE=0;
let TOWING_PRICE=0;
let M=B;

let Concession=0;
let Handling=0;
let BasicFee=0;
let Concession_handler=0;

 ////////////////// PUSHBACK  //////// 
if (PUSH_BACK=="Y" ){      
  if(PROVIDER_CODE!="0456"){
    PUSH_PRICE=M<50 ? 80 : 100;
  }else{
    PUSH_PRICE=100;
  }
}
 ////////////////////////// A S U ////
 if (ASU=="Y" ){
  if(PROVIDER_CODE!="0456"){
    ASU_PRICE=M<50 ? 100 : 120;
  }else{
    ASU_PRICE=M<80 ? 100 : 120;
  }    
 }
/////////////////////  G P U ////////// 
 if (GPU=="Y" ){
  if(PROVIDER_CODE!="0456"){
    GPU_PRICE=M<50 ? 80 : 100;
  }else{
    GPU_PRICE=M<80 ? 100 : 120;
  }
 }
 /////////////////////  TOWING ////////// 
 if (TOWING_NBR=="Y" ){
  if(PROVIDER_CODE!="0456"){
    TOWING_PRICE=M<80 ? 180 : 300;
  }else{
    TOWING_PRICE=M<80 ? 180 : 300;
  }
 }
////////////////////  W C H  &  UMNR   &   AMBU
if (WCH_NBR!=0 ){WCH_PRICE=WCH_NBR*50};
if (UMNR_NBR!=0 ){UMNR_PRICE=UMNR_NBR*50};
if (AMBU_NBR!=0 ){AMBU_PRICE=AMBU_NBR*90};
///////////////////////////////////////////////////


if(HANDLER=="JETEX" ){ //////// HANDLING QUOTATION JETEX AS HANDLER
  if ((M<=7) && (M>0) ){  /////////// 01-07 T ******** JETEX EAM
    if (Station!="GMAD") {    
      Handling=1860;
      Concession_handler=360;
      BasicFee=180;
      Concession=30; 
    }else{
      Handling=990;
      Concession_handler=360;
      BasicFee=180;
      Concession=30;    
    }
  } ///////////////////////////END OF  01-07 T ******** JETEX EAM

if ((M<=15) && (M>7)) {///////////START OF  07-15 T ******** JETEX EAM
  if(Station!="GMAD"){
    Handling=2465;
    Concession_handler=360;
    BasicFee=180;
    Concession=30;
  }else{
    Handling=1650;
    Concession_handler=360;
    BasicFee=180;
    Concession=30;
  }
}///////////END OF  07-15 T ******** JETEX EAM

if ((M<=19) && (M>15)){ //////////START OF  15-19 T ******** JETEX EAM
  if(Station!="GMAD"){
    Handling=2465;
    Concession_handler=490;
    BasicFee=190;
    Concession=35; 
  }else{
    Handling=1760;
    Concession_handler=490;
    BasicFee=190;
    Concession=35; 
  }
}//////////END OF  15-19 T ******** JETEX EAM

if ((M<=30) && (M>19)){ //////////START OF  19-30T ******** JETEX EAM
  if(Station!="GMAD"){
    Handling=3970;
    Concession_handler=490;
    BasicFee=190;
    Concession=35;
  }else{
    Handling=3300;
    Concession_handler=490;
    BasicFee=190;
    Concession=35;
  }
}//////////END OF  19-30T ******** JETEX EAM

if ((M<=40) && (M>30)){ //////////START OF  30-40T ******** JETEX EAM
  if(Station!="GMAD" ){
    Handling=6280;
    Concession_handler=840;
    BasicFee=200;
    Concession=40;
  }else{
    Handling=4565;
    Concession_handler=840;
    BasicFee=200;
    Concession=40;
  }
} //////////END OF  30-40T ******** JETEX EAM

if ((M<=50) && (M>40)){ /////////// START OF  40-50T ******** JETEX EAM
  if(Station!="GMAD"){
    Handling=6720;
    Concession_handler=840;
    BasicFee=250;
    Concession=40; 
  }else {
    Handling=5005;
    Concession_handler=840;
    BasicFee=250;
    Concession=40; 
  }
}/////////// END OF  40-50T ******** JETEX EAM

if ((M<=60) && (M>50)){ /////////// START OF  50-60T ******** JETEX EAM
  if(Station!="GMAD"){
    Handling=7810;
    Concession_handler=840;
    BasicFee=250;
    Concession=45; 
  }else {
    Handling=6875;
    Concession_handler=840;
    BasicFee=250;
    Concession=45; 
  }  
}/////////// END OF  50-60T ******** JETEX EAM

if ((M<=70) && (M>60)){ /////////// START OF  60-70T ******** JETEX EAM 
  if(Station!="GMAD"){
    Handling=10890;
    Concession_handler=1100;
    BasicFee=250;
    Concession=45; 
  }else{
    Handling=8855;
    Concession_handler=1100;
    BasicFee=250;
    Concession=45; 
  }
}  /////////// END OF  60-70T ******** JETEX EAM 

if ((M<=80) && (M>71)){  /////////// START OF  70-80T ******** JETEX EAM 
  if(Station!="GMAD"){
      Handling=11495;
      Concession_handler=1100;
      BasicFee=250;
    Concession=45;
  }else{
    Handling=9900;
    Concession_handler=1100;
    BasicFee=250;
    Concession=45;
  }
}/////////// END OF  70-80T ******** JETEX EAM 

if ((M<=100) && (M>81)){ /////////// START OF  80-100T ******** JETEX EAM 
  if(Station!="GMAD"){
    Handling=14190;
    Concession_handler=1100;
    BasicFee=300;
    Concession=50;
  }else{
    Handling=10945;
    Concession_handler=1100;
    BasicFee=300;
    Concession=50;
  }
}/////////// START OF  80-100T ******** JETEX EAM

if ((M<=120) && (M>100)){ /////////// START OF  100-120T ******** JETEX EAM
  if(Station!="GMAD"){
    Handling=14545;
    Concession_handler=1580;
    BasicFee=300;
    Concession=50; 
  }else{
    Handling=11605;
    Concession_handler=1580;
    BasicFee=300;
    Concession=50; 
  }
}/////////// END OF  100-120T ******** JETEX EAM

if ((M<=150) && (M>120)){  /////////// START OF  120-150T ******** JETEX EAM 
  if(Station!="GMAD"){
    Handling=18150;
    Concession_handler=1580;
    BasicFee=300;
    Concession=50; 
  }else{
    Handling=15345;
    Concession_handler=1580;
    BasicFee=300;
    Concession=50;  
  }
}/////////// END OF  120-150T ******** JETEX EAM 

if ((M<=180) && (M>150)){ /////////// START OF  150-180T ******** JETEX EAM
  if(Station!="GMAD"){
    Handling=18150;
    Concession_handler=1580;
    BasicFee=350;
  Concession=50;
  }else{
    Handling=15125;
    Concession_handler=1580;
    BasicFee=350;
    Concession=50;
  }
}////////// END OF  150-180T ******** JETEX EAM

if ((M<=200) && (M>180)){ /////////// START OF  180-200T ******** JETEX EAM
  if(Station!="GMAD"){
    Handling=26400;
    Concession_handler=1580;
    BasicFee=350;
    Concession=50; 
  }else{
    Handling=24200;
    Concession_handler=1580;
    BasicFee=350;
    Concession=50; 
  }
}/////////// END OF  180-200T ******** JETEX EAM

if ((M<=230) && (M>200)){  /////////// START OF  200-230T ******** JETEX EAM
  if(Station!="GMAD"){
    Handling=26400;
    Concession_handler=2280;
    BasicFee=350;
    Concession=50; 
  }else{
    Handling=24200;
    Concession_handler=2280;
    BasicFee=350;
    Concession=50; 
  }
}/////////// END OF  200-230T ******** JETEX EAM

if ((M<=300) && (M>230)){ /////////// START OF  230-300T ******** JETEX EAM    
  if(Station!="GMAD"){           
    Handling=27500;
    Concession_handler=2280;
    BasicFee=400;
    Concession=50;
  }else{
    Handling=24695;
    Concession_handler=2280;
    BasicFee=400;
    Concession=50;
  } 
}  /////////// END OF  230-300T ******** JETEX EAM 

if (M>300){ /////////// START OF  MORE TAHN 300T ******** JETEX EAM 
  if(Station!="GMAD"){
    Handling=34100;
    Concession_handler=3000;
    BasicFee=400;
    Concession=50;
  }else{
    Handling=30250;
    Concession_handler=3000;
    BasicFee=400;
    Concession=50;
  }
}/////////// END OF  //////// HANDLING QUOTATION JETEX AS HANDLER

} /////////// End if JETEX

///////////////////////////////////////////////////

if(PROVIDER_CODE=="2417" ){ //////// HANDLING QUOTATION JETEX EAM
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



if(PROVIDER_CODE=="0456" ){ ////////////// QUOTATION HANDLING ROJ
if ((M<=40) && (M>30)){/////////////////////////// 30-40 T ****ROJ
  Concession=35; 
  Handling=476;
  BasicFee=200;
  // Handling=560;
  Concession_handler=84;

}///////////////////// End 30-40 T *****ROJ
///////////////////////// 40-50 T ****ROJ
if ((M<=50) && (M>40)){       
  Concession=35; 
  Handling=516;
  BasicFee=200;
  Concession_handler=84;
  // Handling=600;
} ///////////////////////// End 40-50 T ****ROJ
/////////////////////  70-80 T *****ROJ 
if ((M<=80) && (M>71)){ 
  Concession=40; 
  Handling=985;
  BasicFee=250;
  Concession_handler=110;
  // Handling=1095;
}//////////////////////// End 70-80 T *****ROJ
let ACFT=data[0][0].ACFT;
if ((M<=80) && (M>71) && (ACFT=="C130" || ACFT=="c130" || ACFT==" c130" || ACFT=="c130 ")){ 
  Concession=55; 
  Handling=985;
  BasicFee=290;
  Concession_handler=110;
  // Handling=1095;
}//////////////////////// End 70-80 T *****ROJ
/////////////////////////// 230-300 T ******ROJ    
if ((M<=300) && (M>230)){     
  Concession=55; 
  Handling=2347;
  BasicFee=290;
  Concession_handler=228;
  // Handling=2575;
  
} ///////////////////////////End 230-300 T ******ROJ
}////////////////////// END HANDLING QUOTATION ROJ


if(Station!="GMMN" && Station!="GMMX" && Station!="GMME"){ 
  Fast_Track=0;
}


if((PROVIDER_CODE!="2417" && PROVIDER_CODE!="0456" && HANDLER!="JETEX") && (HANDLER=="TBA OCC" || HANDLER=="RAMH" || HANDLER=="" || HANDLER==" ")){  ////////////// START OF STANDARDIZED HANDLING QUOTATION

  // if(PROVIDER_CODE!="0027" && PROVIDER_CODE!="0194" && PROVIDER_CODE!="0732" ){
   
  if ((M<=7) && (M>0)){ 
    Concession=50; 
    Handling=169;
    BasicFee=190;
    Concession_handler=36;
  }
  /////////////////////////////////////////////
  if ((M<=15) && (M>7)) {   
    Concession=50; 
    BasicFee=190;
    Handling=224;
    Concession_handler=36;
  }
  //////////////////////////
  if ((M<=19) && (M>15)){ 
    Concession=50; 
    BasicFee=190;
    Handling=224;
    Concession_handler=49;
  }
  /////////////////////////
  if ((M<=30) && (M>19)){ 
    Concession=50; 
    BasicFee=210;
    Handling=361;
    Concession_handler=49;
  }
  ////////////////////////////////////////////////////////
  if ((M<=40) && (M>30)){ 
   
    Concession=50; 
    BasicFee=210;
    Handling=571;
    Concession_handler=84;
  } 
  ////////////////////////
  if ((M<=50) && (M>40)){ 
    Concession=50;     
    BasicFee=210;
    Handling=611;
    Concession_handler=84;
  }      
  //////////////////////////
  if ((M<=60) && (M>50)){ 
    Concession=50; 
    BasicFee=250;
    Handling=710;
    Concession_handler=84;
  }     
  ////////////
  if ((M<=70) && (M>60)){  
    Concession=50; 
    BasicFee=250;
    Handling=990;
    Concession_handler=110;
  }
  /////////////////////////
  if ((M<=80) && (M>71)){ 
    Concession=50; 
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
  }/////////////////////////////
  
  // }else{
  // if ((M<=7) && (M>0)){ 
  //   Concession=50; 
  //   Handling=260;
  //   BasicFee=190;
  //   Concession_handler=0;
  // }
  // /////////////////////////////////////////////
  // if ((M<=15) && (M>7)) {   
  //   Concession=50; 
  //   BasicFee=190;
  //   Handling=260;
  //   Concession_handler=0;
  // }
  // //////////////////////////
  // if ((M<=19) && (M>15)){ 
  //   Concession=50; 
  //   BasicFee=190;
  //   Handling=273;
  //  Concession_handler=0;
  // }
  // /////////////////////////
  // if ((M<=30) && (M>19)){ 
  //   Concession=50; 
  //   BasicFee=210;
  //   Handling=410;
  // Concession_handler=0;
  // }
  // ////////////////////////////////////////////////////////
  // if ((M<=40) && (M>30)){ 
   
  //   Concession=50; 
  //   BasicFee=210;
  //   Handling=655;
  //   Concession_handler=0;
  // } 
  // ////////////////////////
  // if ((M<=50) && (M>40)){ 
  //   Concession=50;     
  //   BasicFee=210;
  //   Handling=695;
  //   Concession_handler=0;
  // }      
  // //////////////////////////
  // if ((M<=60) && (M>50)){ 
  //   Concession=50; 
  //   BasicFee=250;
  //   Handling=794;
  //   Concession_handler=0;
  // }     
  // ////////////
  // if ((M<=70) && (M>60)){  
  //   Concession=50; 
  //   BasicFee=250;
  //   Handling=1100;
  //   Concession_handler=0;
  // }
  // /////////////////////////
  // if ((M<=80) && (M>71)){ 
  //   Concession=50; 
  //   BasicFee=250;
  //   Handling=1155;
  //   Concession_handler=0;
  // }
  // ////
  // if ((M<=100) && (M>81)){ 
  //   Concession=50; 
  //   BasicFee=300;
  //   Handling=1400;
  //   Concession_handler=0;
  // }
  // //// 
  // if ((M<=120) && (M>100)){
  //   Concession=50; 
  //   BasicFee=300;
  //   Handling=1480;
  //   Concession_handler=0;
  // }
  // ////
  // if ((M<=150) && (M>120)){ 
  //   Concession=50; 
  //   BasicFee=300;
  //   Handling=1808;
  //   Concession_handler=0;
  //   }
  // ////
  // if ((M<=180) && (M>150)){ 
  // Concession=50; 
  // BasicFee=350;
  // Handling=1808;
  // Concession_handler=0;
  // }
  // ////
  // if ((M<=200) && (M>180)){ 
  //   Concession=50; 
  //   BasicFee=350;
  //   Handling=2558;
  //   Concession_handler=0;
  // }
  // //////////////////
  // if ((M<=230) && (M>200)){  
  //   Concession=50; 
  //   BasicFee=350;
  //   Handling=2628;
  //   Concession_handler=0;
  // }
  // ////
  // if ((M<=300) && (M>230)){     
  //   Concession=50; 
  //   BasicFee=400;
  //   Handling=2728;
  //   Concession_handler=0;
  // }    
  // ////
  // if (M>300){ 
  //   Concession=50; 
  //   BasicFee=400;
  //   Handling=3400;
  //   Concession_handler=0;
  // }
  // }//////////////////// END IF OF REGROUPEMENT
  }  //////////////////////////// END OF STANDARIZED HANDLING QUOTATION
  
////////////////// EXTRA GSE FOR JETEX EAM AS HANDLER//
let VIP_AMT=0;
if(HANDLER=="JETEX"){

  if(Station=="GMMN"){
    VIP_AMT=(VIP_DPT_PAX_NBR==0 ? VIP_ARV_PAX_NBR : VIP_DPT_PAX_NBR )*720;
  }else if(Station=="GMMX" || Station=="GMME"){
    VIP_AMT=(VIP_DPT_PAX_NBR==0 ? VIP_ARV_PAX_NBR : VIP_DPT_PAX_NBR )*600;
  };  
  
  GPU=="Y" ? GPU_PRICE=660 : GPU_PRICE=0;
  // GPU_PRICE=0;
  ASU_PRICE=0;
  PUSH_BACK=="Y" ? PUSH_PRICE=990 : PUSH_PRICE=0;
  // PUSH_PRICE=0;
  WCH_PRICE=WCH_NBR*400;
  // WCH_PRICE=0;
  UMNR_PRICE=0;
  AMBU_PRICE=0;
  TOWING_PRICE=0;
}

if(PROVIDER_CODE=="2417"){
  GPU_PRICE=GPU_PRICE*11;
  ASU_PRICE=ASU_PRICE*11;
  PUSH_PRICE=PUSH_PRICE*11;
  WCH_PRICE=WCH_PRICE*11;
  UMNR_PRICE=UMNR_PRICE*11;
  AMBU_PRICE=AMBU_PRICE*11;
  TOWING_PRICE=TOWING_PRICE*11;
  }
//////////////////////////////////////
//////  SARAH & AIR OCEAN ///////////////
if ( PROVIDER_CODE=="2523" || PROVIDER_CODE=="2234") { 
  Handling=160 ;
  Concession_handler=0;
  BasicFee=100;
  Concession=50;
  } ////// END OF SARAH & AIR OCEAN ///////////////

if ( NAT_FLT=="TECH") { 
Handling=Math.trunc(+(Handling/2)) ;
Concession_handler=Math.trunc(+(Concession_handler/2)) ;
} 
////////////////////////
if(HANDLER=="TBA OCC" && PROVIDER_CODE=="2417"){Concession=550; Handling=0; Concession_handler=0;} ;
////////////////

const H=Handling;
const HC=Concession_handler;
const BF=BasicFee;
const AC=Concession;
const Dis=Disb;
const CUR=CURRENCY;

   axios.post(`http://127.0.0.1:1501/api/data/InsertHandling`,{H,HC,ID,BF,AC,Dis,CUR},{ crossdomain: true }).then(
    (response)=>{
    console.log('sddsdsd',response.data);});

//////////////////////////////// End Handling

/////////////////////  USD CLIENTS INVOICING
if(CURRENCY=="USD"){
  Handling=Handling*(Rates.EXCHANGE_EUR_SELL)/(Rates.EXCHANGE_USD_SELL);
  Concession_handler=Concession_handler*(Rates.EXCHANGE_EUR_SELL)/(Rates.EXCHANGE_USD_SELL);
  Concession=60;
 
  ////////////////////////// GENERAL PRICING
  let M=B;
  if ((M<=7) && (M>0)){ 
    Concession=60; 
     BasicFee=210;
  
  }
  /////////////////////////////////////////////
  if ((M<=15) && (M>7)) {   
    Concession=60; 
    BasicFee=210;
  
  }
  //////////////////////////
  if ((M<=19) && (M>15)){ 
    Concession=60; 
    BasicFee=210;
   
  }
  /////////////////////////
  if ((M<=30) && (M>19)){ 
    Concession=60; 
    BasicFee=250;
   
  }
  ////////////////////////////////////////////////////////
  if ((M<=40) && (M>30)){ 
   
    Concession=60; 
    BasicFee=250;
    
  } 
  ////////////////////////
  if ((M<=50) && (M>40)){ 
    Concession=60;     
    BasicFee=250;
   
  }      
  //////////////////////////
  if ((M<=60) && (M>50)){ 
    Concession=60; 
    BasicFee=290;
  
  }     
  ////////////
  if ((M<=70) && (M>60)){  
    Concession=60; 
    BasicFee=290;
  
  }
  /////////////////////////
  if ((M<=80) && (M>71)){ 
    Concession=60; 
    BasicFee=290;
    
  }
  ////
  if ((M<=100) && (M>81)){ 
    Concession=60; 
    BasicFee=310;
  
  }
  //// 
  if ((M<=120) && (M>100)){
    Concession=60; 
    BasicFee=310;
  
  }
  ////
  if ((M<=150) && (M>120)){ 
    Concession=60; 
    BasicFee=310;
  
    }
  ////
  if ((M<=180) && (M>150)){ 
  Concession=60; 
  BasicFee=370;
  
  }
  ////
  if ((M<=200) && (M>180)){ 
    Concession=60; 
    BasicFee=370;
  
  }
  //////////////////
  if ((M<=230) && (M>200)){  
    Concession=60; 
    BasicFee=370;
  
  }
  ////
  if ((M<=300) && (M>230)){     
    Concession=60; 
    BasicFee=410;
  
  }    
  ////
  if (M>300){ 
    Concession=60; 
    BasicFee=410;
  
  }

  ////////////////////////// END GENERAL PRICING
  let OPERATOR_CODE=data[0][0].OPERATOR_CODE;
  if (OPERATOR_CODE=="1268" && PROVIDER_CODE=="0027"){
    BasicFee=270;
 }
    /////////////////////////////////
 
  // TRAVEL=((+TRAVEL)*(Rates.EXCHANGE_EUR_SELL)/(Rates.EXCHANGE_USD_SELL));
  // CREW_ASSIST=(CREW_ASSIST)*(Rates.EXCHANGE_EUR_SELL)/(Rates.EXCHANGE_USD_SELL);
  
  PUSH_PRICE=PUSH_PRICE*(Rates.EXCHANGE_EUR_SELL)/(Rates.EXCHANGE_USD_SELL);
  GPU_PRICE=GPU_PRICE*(Rates.EXCHANGE_EUR_SELL)/(Rates.EXCHANGE_USD_SELL);
  ASU_PRICE=ASU_PRICE*(Rates.EXCHANGE_EUR_SELL)/(Rates.EXCHANGE_USD_SELL);
  WCH_PRICE=WCH_PRICE*(Rates.EXCHANGE_EUR_SELL)/(Rates.EXCHANGE_USD_SELL);
  UMNR_PRICE=UMNR_PRICE*(Rates.EXCHANGE_EUR_SELL)/(Rates.EXCHANGE_USD_SELL);
  AMBU_PRICE=AMBU_PRICE*(Rates.EXCHANGE_EUR_SELL)/(Rates.EXCHANGE_USD_SELL);
  TOWING_PRICE=TOWING_PRICE*(Rates.EXCHANGE_EUR_SELL)/(Rates.EXCHANGE_USD_SELL);
  }


/////////////////////  END OF USD CLIENTS INVOICING
let ConcessionH_Def;
ConcessionH_Def= ConcessionH_F_NBR>0 ? Concession_handlerDB : Concession_handler;

let Handling_Def;
// Handling_Def= IsHandling_F>0 ? HandlingDB : Handling;
Handling_Def= Handling_F_NBR>0 ? HandlingDB : Handling;

let Concession_Def;
Concession_Def= AptConcession_F_NBR>0 ? ConcessionDB : Concession;

let BasicFee_Def;
BasicFee_Def= BasicFee_F_NBR>0 ? BasicFeeDB : BasicFee;

let CURRENCY_Def;
CURRENCY_Def= CURRENCY_F_NBR>0 ? CURRENCY_DB : CURRENCY;

let Disb_Def;
Disb_Def= Disb_F_NBR>0 ? Disb_DB : Disb;


let Tot;
let Amount;
let Letters;
if(PROVIDER_CODE!='2417' && ClientDetails.LOCAL=="Y"){
  
 Tot=  <table style={{ marginRight :"14"}}>
          <td style={{ border: 1, bordercolor: "black", backgroundColor:"lightgrey"}}>        
             <Text style={{fontSize:"11",textAlign:"right",marginTop :"5",marginBottom :"5",marginRight :"12"}}>{`${data[0][0].CURRENCY}`}    {Total.toFixed(2)}</Text></td>
          <td style={{ border: 1, bordercolor: "black", backgroundColor:"yellow"}}>        
             <Text style={{fontSize:"11",textAlign:"right",marginTop :"5",marginBottom :"5",marginRight :"12"}}>{`MAD`}    {((Rates.EXCHANGE_EUR_SELL)*Total).toFixed(2)}</Text></td>
       </table>    
  
 Letters=  <table style={{marginLeft:"16",marginRight:"12",marginBottom :"4"}}>            
             <td >   
               <Text style={{fontSize:"8",textAlign:"right",marginTop :"5",marginBottom :"5",marginRight :"2"}}>  </Text>
             </td>  
             <td >   
               <Text style={{fontSize:"8",textAlign:"right",marginTop :"5",marginBottom :"5",marginRight :"2"}}>( {number2text(Total,"MAD")})</Text>
             </td>                      
           </table >
 Amount=   <table >          
              <td >
                <Text style={{fontSize:"12",textAlign:"right",marginTop :"5",marginBottom :"5",marginRight :"2"}}></Text> 
              </td>     
              <td >
                <Text style={{fontSize:"12",textAlign:"right",marginTop :"5",marginBottom :"5",marginRight :"2"}}>TOTAL :</Text> 
              </td>                       
           </table >
}else {

 Tot=<table style={{ marginRight :"14"}}>
         <td style={{ border: 1, bordercolor: "black", backgroundColor:"yellow"}}>
           <Text style={{fontSize:"11",textAlign:"right",marginTop :"5",marginBottom :"5",marginRight :"6"}}>{`${data[0][0].CURRENCY}`}    {Total.toFixed(2)}</Text>
         </td>
     </table> 
 Letters=  <table style={{marginLeft:"16",marginRight:"12",marginBottom :"4"}}>            
              <td >   
               <Text style={{fontSize:"8",textAlign:"right",marginTop :"5",marginBottom :"5",marginRight :"2"}}>( {number2text(Total,CURRENCY)})</Text>
             </td>                       
           </table >  
Amount=<table >               
           <td ><Text style={{fontSize:"12",textAlign:"right",marginTop :"5",marginBottom :"5",marginRight :"2"}}>TOTAL :</Text> </td>
       </table>
   
}
//////////////////////////// SERVICES HORS HANDLING 

if(ID.split("-")[6]=="F"){
  Concession=0; 
  BasicFee=0;
  Handling=0;
  Concession_handler=0;
}
////////////////////////// 

// let Concession_Def;

// if(PROVIDER_CODE!="0456" & PROVIDER_CODE!="2417"){
//   if(CURRENCY=="EUR" ){
//     Concession_Def=50;
//   }
  
//   if(CURRENCY=="USD" & PROVIDER_CODE!="0456"){
//     Concession_Def=60;
//   }
  
// }else{
//   Concession_Def=Concession_Def;
// }

/////////////////////////
let APT_CONCESSION;

if (C!=0){APT_CONCESSION= <View style={{ flexDirection: "row" }}>
<View style={{ flex: 5 }}>
</View>
<View style={{ flex: 5 }}>
<Text style={{fontSize:"11",textAlign:"right"}}>Airport Concession</Text>

 </View>
<View style={{ flex: 1 }}>

</View>
<View style={{ flex: 5 }}>
</View>
<View style={{ flex: 1 , textAlign:"right",marginRight:"18" }}>
<Text style={{fontSize:"11"}}>
{C.toFixed(2)} </Text>

</View>
</View>
}
return (
     <>
    
     <Document >
     <Page size="A4" style={styles.page}>
     {/* <Text style={{fontSize:"12",textAlign:"center",marginBpottom:"12"}}> </Text>  */}
     {/* <Text style={{fontSize:"12",textAlign:"center",marginBpottom:"12"}}> </Text>  */}
     <Text style={styles.title}>GENERAL INVOICE</Text>
      <Text style={{fontSize:"12", textAlign:"right",marginRight:"20"}}> Invoice N° {`${data[0][0].INVOICE_NBR}`==0 ? `${props.InvoiceNumber}`: `${data[0][0].INVOICE_NBR}`} </Text>
      <View style={{ flexDirection: "row" }}>
      
            <View style={{ flex: 1 }}>
              <Text style={{fontWeight:"bold",fontSize:"10", marginLeft:"12"}}>Ref. Y/Email                {`${data[0][0].REF_EMAIL}`}</Text>
              {/* <Text style={{fontWeight:"bold",fontSize:"10", marginLeft:"12"}}>Ref. Y/Flight Trip          {`${data[0][0].REF_TRIP}`}</Text> */}
              <Text style={{fontWeight:"bold",fontSize:"10", marginLeft:"12"}}>Ref. Y/Flight Trip          {`${data[0][0].REF_TRIP}`==0 ? "" : `${data[0][0].REF_TRIP}`}</Text>
              <Text style={{fontWeight:"bold",fontSize:"10", marginLeft:"12"}}>Date of Issue               {`${dateNow.getDate()}-${mo}-${+dateNow.getYear()+1900}`}</Text>
              <Text style={{fontWeight:"bold",fontSize:"10", marginLeft:"12"}}>Due Date                     {`${dueDate.getDate()}-${dueMonth}-${+dueDate.getYear()+1900}`}</Text>
              <Text style={{fontWeight:"bold",fontSize:"10", marginLeft:"12"}}>Invoice N°.                   {`${data[0][0].INVOICE_NBR}`==0 ? `${props.InvoiceNumber}`: `${data[0][0].INVOICE_NBR}`}</Text>
              <Text style={{fontWeight:"bold",fontSize:"10", marginLeft:"12"}}>Invoice Ref.                 {`${data[0][0].OPERATOR_CODE}/${moInvoiceRef}-${DATE_REF.getYear()+1900}`}</Text>
              <Text style={{fontWeight:"bold",fontSize:"10", marginLeft:"12"}}>ICE n°                         1524623000039</Text>
              <Text style={{fontWeight:"bold",fontSize:"10", marginLeft:"12"}}>Customer order n°      {`${data[0][0].PROVIDER_CODE}`}</Text>
                    </View>
              
           
            <View style={{ flex: 1}}>
              <table style={{marginRight:"16"}}>
                <tr style={{ border: 2, bordercolor: "black"}}>
              <Text style={{fontSize:"13",textAlign:"center",marginTop :"8"}}>{`${data[0][0].PROVIDER}`}</Text>
              <Text style={{fontSize:"11",textAlign:"center"}}>{`${ClientDetails.Customer_Address1}`}</Text>
              <Text style={{fontSize:"11",textAlign:"center"}}>{`${ClientDetails.Customer_Address2}`}</Text>
              <Text style={{fontSize:"11",textAlign:"center"}}>{`${ClientDetails.Customer_Address3}`}</Text>
              <Text style={{fontSize:"11",textAlign:"center"}}>{`${ClientDetails.Customer_Country}`}</Text>
              <Text style={{fontSize:"11",textAlign:"right",marginBpottom:"12",marginRight:"12"}}>Att : Payable</Text>
              </tr>
              </table >
            </View>
       
      </View>
      {/* <Text style={{fontSize:"12",textAlign:"center",marginBpottom:"12"}}> </Text>     */}
      <Text style={{fontSize:"11", marginLeft:"12"}}>To charge you for costs incurred at {`${data[0][0].station}/${sita} | Acft ${data[0][0].ACFT} | Reg. ${data[0][0].registration} | MTOW ${data[0][0].MTOW}T`}</Text>
      {OPERATOR}
      <Text style={{textAlign:"center",fontSize:"10"}}>{`Schedule  :     Prov : ${data[0][0].PROV}     Date:${ARV_DTE}   EA ${data[0][0].EA} -- AA ${data[0][0].AA} `} {data[0][0].NAT_FLT=="CGO" ? "CGO :": "PAX :"} {data[0][0].NAT_FLT=="CGO" ? data[0][0].CGO_IN+" Kgs" : data[0][0].PAX_IN} </Text>
      <Text style={{textAlign:"center",fontSize:"10"}}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {`       Dest : ${data[0][0].DEST}     Date:${date}   ED ${data[0][0].ED} -- AD ${data[0][0].AD} `} {data[0][0].NAT_FLT=="CGO" ? "CGO :": "PAX :"} {data[0][0].NAT_FLT=="CGO" ? data[0][0].CGO_OUT+" Kgs" : data[0][0].PAX_OUT}</Text>
    
      <View >
      <table style={{ marginLeft:"12",marginRight:"16" }}>
        <tr style={{ border: 1, bordercolor: "black",backgroundColor:"lightgrey"}}>
        <Text style={{fontSize:"12",textAlign:"center",textDecoration:'underline'}}>Representation & Supervision </Text>
        <Text style={{fontWeight:"bold",fontSize:"12",textAlign:"center"}}>                   Description                                 Additional Info                                      Amount in ({data[0][0].CURRENCY})</Text>
        </tr>
  
      </table>
      </View>
      {/* <Text style={{fontSize:"12",textAlign:"center",marginBpottom:"12"}}> </Text>  */}
      
    
      <BasicFee2 PROVIDER_CODE={PROVIDER_CODE} BasicFee_Def={BasicFee_Def} Concession_Def={Concession_Def} Concession={Concession} BasicFee={BasicFee} DIFF_TIME={DIFF_TIME} BasicTTL={ttl=>setBasicTTL(ttl)}/>
      <Permit CURRENCY_Def={CURRENCY_Def} PMT_BY_STARS={PMT_BY_STARS} PERMIT_O_DET={PERMIT_O_DET} PMT_REF={PMT_REF} PERMIT={PERMIT} IS_PMT_OUT={IS_PMT_OUT} COORDINATION_PERMIT={COORDINATION_PERMIT} PermitTTL={ttl=>setPermitTTL(ttl)}/>
      <AddServices  PHONE_PRINT={PHONE_PRINT} CURRENCY_Def={CURRENCY_Def} Rates={Rates} TRAVEL={TRAVEL} CREW_ASSIST={CREW_ASSIST} PHONE={PHONE} PRINT={PRINT} AdditionalTTL={ttl=>setAdditionalTTL(ttl)}/>
      <Surcharges DIFF_TIME={DIFF_TIME} BasicFee_Def={BasicFee_Def} BasicFee={BasicFee} DELAY_TIME_ARV={DELAY_TIME_ARV} DELAY_TIME={DELAY_TIME} DEP_DTE_W={DEP_DTE_W} ARV_DTE_W={ARV_DTE_W} AA={AA} AD={AD} B={B} SurchargeTTL={ttl=>setSurchargeTTL(ttl)} />
      <Subtotal1 Sub1={Sub1} SurchargeTTL={SurchargeTTL} AdditionalTTL={AdditionalTTL} PermitTTL={PermitTTL} BasicTTL={BasicTTL}/>
      
      {Behalf}
   
      <AirportFees CUTE_AMT={CUTE_AMT} CURRENCY={CURRENCY_Def} Rates={Rates} TASPT_AMT={TASPT_AMT} APT_FEES_AMT={APT_FEES_AMT} AirportTTL={ttl=>setAirportTTL(ttl)}/>
      
      <Handling1 CURRENCY_Def={CURRENCY_Def} VIP_LOUNGE_ONLY={VIP_LOUNGE_ONLY} VIP_AMT={VIP_AMT} WCH_NBR={WCH_NBR} Handling_Def={Handling_Def} ConcessionH_Def={ConcessionH_Def} GPU_PRICE={GPU_PRICE} ASU_PRICE={ASU_PRICE} PUSH_PRICE={PUSH_PRICE} WCH_PRICE={WCH_PRICE} UMNR_PRICE={UMNR_PRICE} AMBU_PRICE={AMBU_PRICE} TOWING_PRICE={TOWING_PRICE} ID={ID} Concession_handler={Concession_handler} Handling={Handling} Rates={Rates} HANDLER={HANDLER} PROVIDER_CODE={PROVIDER_CODE} WO_HNDL_INV={WO_HNDL_INV} Station={Station} NAT_FLT={NAT_FLT} CURRENCY={CURRENCY} HandlingTTL={ttl=>setHandlingTTL(ttl)}/>
      <Other MEDICAL_AMT={MEDICAL_AMT} MEDICAL_INV={MEDICAL_INV} OTHER_CHG4={OTHER_CHG4} OTHER_CHG4_AMT={OTHER_CHG4_AMT} OTHER_CHG4_INV={OTHER_CHG4_INV} OTHER_CHG5={OTHER_CHG5} OTHER_CHG5_AMT={OTHER_CHG5_AMT} OTHER_CHG5_INV={OTHER_CHG5_INV}  OTHER_CHG2={OTHER_CHG2} OTHER_CHG2_AMT={OTHER_CHG2_AMT} OTHER_CHG2_INV={OTHER_CHG2_INV} OTHER_CHG3={OTHER_CHG3} OTHER_CHG3_AMT={OTHER_CHG3_AMT} OTHER_CHG3_INV={OTHER_CHG3_INV} OTHER_CHG1={OTHER_CHG1} OTHER_CHG1_AMT={OTHER_CHG1_AMT} OTHER_CHG1_INV={OTHER_CHG1_INV} CURRENCY={CURRENCY_Def} Rates={Rates} Disb={Disb} FUEL_AMT={FUEL_AMT} FUEL_INV={FUEL_INV} Fast_Track={Fast_Track} CIQ_Coordination={CIQ_Coordination} CREW_HTC_AMT={CREW_HTC_AMT} CREW_HTC_INV={CREW_HTC_INV} CREW_TRS_INV={CREW_TRS_INV} CREW_TRS_AMT={CREW_TRS_AMT} PAX_HTC_AMT={PAX_HTC_AMT} PAX_HTC_INV={PAX_HTC_INV} PAX_TRS_AMT={PAX_TRS_AMT} PAX_TRS_INV={PAX_TRS_INV} CATERING_AMT={CATERING_AMT} CATERING_INV={CATERING_INV} OtherTTL={ttl=>setOtherTTL(ttl)} />
    
      {S}
     
      <Text style={{fontSize:"11",marginRight:"18",marginLeft:"18",marginTop:"0"}}> _____________________________________________________________________________________________  </Text>
      {Disb_Vat}
      {APT_CONCESSION}
      {/* <View style={{ flexDirection: "row" }}>
           <View style={{ flex: 5 }}>
           </View>
          <View style={{ flex: 5 }}>
          <Text style={{fontSize:"11",textAlign:"right"}}>Airport Concession</Text>

            </View>
           <View style={{ flex: 1 }}>

           </View>
           <View style={{ flex: 5 }}>
           </View>
           <View style={{ flex: 1 , textAlign:"right",marginRight:"18" }}>
           <Text style={{fontSize:"11"}}>
           {Concession_Def.toFixed(2)} </Text>

           </View>
      </View> */}

    <View style={{ flexDirection: "row" }}>
      
        <View style={{ flex: 0}}>
             {/* <table style={{marginLeft:"16",marginRight:"12",marginBottom :"4"}}>
               
                <td >
                
                  <Text style={{fontSize:"8",textAlign:"right",marginTop :"5",marginBottom :"5",marginRight :"2"}}>( {number2text(Total,CURRENCY)})</Text>
               
                </td>                           
               
              
              </table > */}
              {Letters}
        </View>
        <View style={{ flex: 4}}>
        {/* {Amount} */}
             {/* <table style={{marginLeft:"16",marginRight:"12",marginBottom :"4"}}>
               
                <td >
                
                  <Text style={{fontSize:"12",textAlign:"right",marginTop :"5",marginBottom :"5",marginRight :"2"}}>TOTAL :</Text>
               
                </td>                           
               
              
              </table > */}
             
        </View>
         
        <View style={{ flex: 1}}>
        {/* <table style={{marginRight:"16",marginBottom :"4"}}>
                
                <td style={{ border: 1, bordercolor: "black", backgroundColor:"yellow"}}>
                
                  <Text style={{fontSize:"11",textAlign:"right",marginTop :"5",marginBottom :"5",marginRight :"6"}}>{`${data[0][0].CURRENCY}`}    {Total.toFixed(2)}</Text>
                  
                </td>
                               
               {Moroccan}
              
              </table > */}
              {Tot}
          
        </View>
     

      </View >
          
              <table style={{marginLeft:"16",marginRight:"16",marginBottom :"11"}}>
                {/* <tr style={{ border: 2, bordercolor: "black"}}>
                  <Text style={{fontSize:"10",textAlign:"right"}}>Disbursement : Subtotal(2) x 5%        {`${data[0][0].PROVIDER}`}</Text>
                  <Text style={{fontSize:"10",textAlign:"right"}}>VAT : [Subtotal(1) + Subtotal(2)] x 20%        {`${data[0][0].PROVIDER}`}</Text>
                </tr> */}
                <tr style={{ border: 1, bordercolor: "black", backgroundColor:"lightgrey"}}>
                 
                  <td>
                 <Text style={{fontSize:"8",textAlign:"left",marginTop :"2",marginLeft :"2"}}>For payment by Bank Transfer, please use :</Text>
                 <Text style={{fontSize:"8",textAlign:"left",marginTop :"1",marginLeft :"2"}}>ATTIJARIWAFA BANK                                       | Account Name    : STARS AVIATION SERVICES SA</Text>
                 <Text style={{fontSize:"8",textAlign:"left",marginTop :"1",marginLeft :"2"}}>CENTRE D'AFFAIRES PORTE D'ANFA            | Account Number: 0409 V 000001450 </Text>
                 <Text style={{fontSize:"8",textAlign:"left",marginTop :"1",marginLeft :"2"}}>5, Rue ALI ABDERRAZAK                                 | IBAN Code         : 007 780 0004095000001450 70 </Text>
                 <Text style={{fontSize:"8",textAlign:"left",marginTop :"1",marginLeft :"2"}}>CASABLANCA ANFA - 20 000 - MOROCCO    | SWIFT Code       : BCMAMAMC</Text>
                 <Text style={{fontSize:"8",textAlign:"left",marginTop :"1",marginLeft :"2",textDecoration:'underline'}}>Conditions of payment :  </Text>
                 <Text style={{fontSize:"7",textAlign:"left",marginTop :"1",marginLeft :"3"}}>  1- Please mention on your payment or correspendence our invoice and Customer order anumber and date.</Text>
                 <Text style={{fontSize:"7",textAlign:"left",marginTop :"1",marginLeft :"2"}}>  2- Payment within 30 daysunless otherwise agreed. Due amount invoiced and not settled will be surcharged</Text>
                 <Text style={{fontSize:"7",textAlign:"left",marginTop :"1",marginLeft :"2",marginBottom :"2"}}>     of 1.5% per month or part off. All invoice queries must be sent in writing within 15 days of the invoice to: STARS Aviation Services</Text>
                  </td>
                </tr>
              
              </table >
      {/* </View> */}
   
    </Page>
    </Document>

    
      </>
  )
  
}

export default InvoiceTest
