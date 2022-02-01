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
import axios from "axios";


function Invoice(props) {


  const [ClientDetails,setClientDetails]=useState([]);
  // const ClientID=props.Q[0].PROVIDER_CODE;
  const ClientID=props.Q[0]
  console.log("XXXXXXXClientID//////",ClientID)
  // const PROVIDER_code=ClientID[0].PROVIDER_CODE;
  console.log("XXXXXXX ClientID[0].PROVIDER_CODE",ClientID[0].PROVIDER_CODE)
  //////// Exchanges rates from DB -Table Invoice
  const [Rates,setRates]=useState([])
  
  useEffect(()=>{
  const sendGetratesRequest = async () => {
    try {
        const resp = await axios.get('http://127.0.0.1:1501/api/invoice/get/1');
        setRates(resp.data[0]);
      console.log("resp.data[0] rates**",resp.data[0]);
    } catch (err) {
      throw new Error('Unable to establish Connection with database!!');
        console.error(err);
    }
};
sendGetratesRequest();
//////////////////////// Get Provider Address details
const GetAddress = async () => {
  try {
      const resp = await axios.get('http://127.0.0.1:1501/api/client/get/'+ClientID[0].PROVIDER_CODE);
      setClientDetails(resp.data[0]);
    console.log("resp.data[0] Clients**",resp.data[0]);
  } catch (err) {
    throw new Error('Unable to establish Connection with database!!');
      console.error(err);
  }
};
GetAddress();
//////////////////// End Provider Address details

},[])  ///////// End useEffect
console.log("***/*/*/*/*/*ClientDetails.Customer_Address1",ClientDetails.Customer_Address1);

console.log('Rates.EXCHANGE_EUR_SELL',Rates.EXCHANGE_EUR_SELL)
////////////////
  //////// serialization
//   const [InvoiceNumber,setInvoiceNumber]=useState([])
//   useEffect(()=>{
//   const sendGetRequest = async () => {
//     try {
//         const resp = await axios.get('http://127.0.0.1:1501/api/invoice/get/1');
//         setInvoiceNumber(resp.data[0].ID);
//       console.log("resp.data[0].ID*******",resp.data[0].ID);
//     } catch (err) {
//       throw new Error('Unable to establish Connection with database!!');
//         console.error(err);
//     }
// };
// sendGetRequest();
// },[])

// console.log('InvoiceNumber',InvoiceNumber)
/////////////////

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
     switch(data[0][0].station) {
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

const B=data[0][0].MTOW;

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

   let HANDLER=data[0][0].HANDLER; 
   let PUSH_BACK=data[0][0].PUSH_BACK;  
   let GPU=data[0][0].GPU; 
   let GPU_TIME=data[0][0].GPU_TIME; 
   let ASU=data[0][0].ASU; 
   let CUSTOMER=data[0][0].CUSTOMER;
   let Station=data[0][0].station;  
   let CURRENCY=data[0][0].CURRENCY; 
   let CUTE_AMT=data[0][0].CUTE_AMT;
   let FUEL_AMT=data[0][0].FUEL_AMT;
   let FUEL_INV=data[0][0].FUEL_INV;
   let Fast_Track=data[0][0].Fast_Track;
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
const Handling=data[0][0].Handling;
const Concession_handler=data[0][0].Concession_handler;

const BasicFee=data[0][0].BasicFee;
const Concession=data[0][0].Concession;
///////////////////////////
const NAT_FLT=data[0][0].NAT_FLT;
const WO_HNDL_INV=data[0][0].WO_HNDL_INV;

let APT_FEES_AMT=data[0][0].APT_FEES_AMT;
let TASPT_AMT=data[0][0].TASPT_AMT;

APT_FEES_AMT=(+data[0][0].APT_FEES_AMT).toFixed(2);
TASPT_AMT=(+data[0][0].TASPT_AMT).toFixed(2);

const CREW_ASSIST=data[0][0].CREW_ASSIST;
const TRAVEL=data[0][0].TRVL_EXP_AMT;
const PHONE=data[0][0].PHONE_COM_AMT;
const PRINT=data[0][0].PRNT_PAGES_AMT;
///////////////////////////////////

let ARV_DTE=data[0][0].ARV_DTE;   
let date=data[0][0].date;

let ARV_DTE_W= new Date(ARV_DTE);
let DEP_DTE_W= new Date(date);

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

const T1=`${ARV_DTE}T${data[0][0].AA}`;
const T2=`${date}T${data[0][0].AD}`;

const DIFF_TIME=(new Date(T2)-new Date(T1))/3600000;

const COORDINATION_PERMIT=data[0][0].COORDINATION_PERMIT;
const PERMIT=data[0][0].LND_PMT_AMT;
const PERMIT_O=data[0][0].PERMIT_O;
const LND_PMT_REF=data[0][0].LND_PMT_REF;
const PERMIT_O_DET=data[0][0].PERMIT_O_DET;

const Disb=data[0][0].Disb;
////////////////////////////////DELAY ON DEPARTURE

const T_DELAY1=`${date}T${data[0][0].ED}`;
const T_DELAY2=`${date}T${data[0][0].AD}`;

const DELAY_TIME=(new Date(T_DELAY2)-new Date(T_DELAY1))/3600000;
////////////////////////////////////////
//////////////// DELAY ON ARRIVAL
const T_DELAY1_ARV=`${ARV_DTE}T${data[0][0].EA}`;
const T_DELAY2_ARV=`${ARV_DTE}T${data[0][0].AA}`;
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

let removedSpacesOperator = originalOperator.split(" ").join("");
let removedSpacesProvider = originalProvider.split(" ").join("");

console.log('removedSpacesOperator',removedSpacesOperator);
console.log('removedSpacesProvider',removedSpacesProvider);

if ((removedSpacesOperator).localeCompare(removedSpacesProvider)!==0){
OPERATOR= <Text style={{fontSize:"10", marginLeft:"12"}}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Operator   :    {`${data[0][0].OPERATOR}`} </Text>
}
/////////////// TOTAL
let Total=(Math.round((OtherTTL+AirportTTL+HandlingTTL)*Disb)/100)+(Math.round( (OtherTTL+AirportTTL+HandlingTTL)*100)/100)+(Math.round((SurchargeTTL+AdditionalTTL+PermitTTL+BasicTTL)*100)/100);

if(CURRENCY=="MAD"){
Total=(Math.round((OtherTTL+AirportTTL+HandlingTTL)*Disb)/100)+(Math.round((((OtherTTL+AirportTTL+HandlingTTL)*Disb)/100)*20)/100)+(Math.round( (OtherTTL+AirportTTL+HandlingTTL)*100)/100)+(Math.round((SurchargeTTL+AdditionalTTL+PermitTTL+BasicTTL)*100)/100);
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
if(CURRENCY=="MAD"){
  VAT1=<Text style={{fontSize:"11",textAlign:"right",marginRight:"18"}}>  </Text> 
  VAT2=<Text style={{fontSize:"11",textAlign:"right",marginRight:"18"}}>VAT          : </Text>
  VAT3=<Text style={{fontSize:"10",textAlign:"right",marginRight:"18"}}> Disbursement  x 20 %</Text>
  VAT4=<Text style={{fontSize:"10",textAlign:"center",marginRight:"18"}}> </Text>
  VAT5=<Text style={{fontSize:"11",textAlign:"right",marginRight:"18"}}>{Math.round((((OtherTTL+AirportTTL+HandlingTTL)*Disb)/100)*20)/100}</Text>
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
            {/* <View style={{ flex: 1}}>
              <Text style={{fontSize:"12"}}>15/06/21 </Text>
              <Text style={{fontSize:"12"}}>236547</Text>
              <Text style={{fontSize:"12"}}>Due date</Text>
              <Text style={{fontSize:"12"}}>Invoice</Text>
              <Text style={{fontSize:"12"}}>15/06/21 </Text>
              <Text style={{fontSize:"12"}}>236547</Text>
              <Text style={{fontSize:"12"}}>Due date</Text>
              <Text style={{fontSize:"12"}}>Invoice</Text>
            </View> */}
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
      {/* <Text style={{fontSize:"12",textAlign:"center",marginBpottom:"12"}}> </Text> */}
      {/* <Text style={{fontSize:"12", marginLeft:"12"}}>To charge you for costs incurred at {`${data[0][0].station}/${sita} | Acft ${data[0][0].ACFT}| Reg. ${data[0][0].registration} | MTOW ${data[0][0].MTOW}T`}</Text>
      <Text style={{textAlign:"center",fontSize:"10", marginTop:"5"}}>{`        Prov : ${data[0][0].PROV}     Date:${data[0][0].ARV_DTE}   EA ${data[0][0].EA} -- AA ${data[0][0].AA}  PAX: 12`}</Text>
      <Text style={{textAlign:"center",fontSize:"10"}}>{`        Dest : ${data[0][0].DEST}     Date:${data[0][0].date}   ED ${data[0][0].ED} -- AD ${data[0][0].AD}  PAX: 00`}</Text>
       */}
      <View >
      <table style={{ marginLeft:"12",marginRight:"16" }}>
        <tr style={{ border: 1, bordercolor: "black",backgroundColor:"lightgrey"}}>
        <Text style={{fontSize:"12",textAlign:"center",textDecoration:'underline'}}>Representation & Supervision </Text>
        <Text style={{fontWeight:"bold",fontSize:"12",textAlign:"center"}}>                   Description                                 Additional Info                                      Amount in ({data[0][0].CURRENCY})</Text>
        </tr>
  
      </table>
      </View>
      {/* <Text style={{fontSize:"12",textAlign:"center",marginBpottom:"12"}}> </Text>  */}
      <BasicFee2 DIFF_TIME={DIFF_TIME} BasicFee={BasicFee} Concession={Concession} BasicTTL={ttl=>setBasicTTL(ttl)}/>
      <Permit PERMIT_O_DET={PERMIT_O_DET} LND_PMT_REF={LND_PMT_REF} PERMIT={PERMIT} PERMIT_O={PERMIT_O} COORDINATION_PERMIT={COORDINATION_PERMIT} PermitTTL={ttl=>setPermitTTL(ttl)}/>
      <AddServices CURRENCY={CURRENCY} Rates={Rates} TRAVEL={TRAVEL} CREW_ASSIST={CREW_ASSIST} PHONE={PHONE} PRINT={PRINT} AdditionalTTL={ttl=>setAdditionalTTL(ttl)}/>
      <Surcharges BasicFee={BasicFee} DELAY_TIME_ARV={DELAY_TIME_ARV} DELAY_TIME={DELAY_TIME} DEP_DTE_W={DEP_DTE_W} ARV_DTE_W={ARV_DTE_W} AA={AA} AD={AD} B={B} SurchargeTTL={ttl=>setSurchargeTTL(ttl)} />
      <Subtotal1 Sub1={Sub1} SurchargeTTL={SurchargeTTL} AdditionalTTL={AdditionalTTL} PermitTTL={PermitTTL} BasicTTL={BasicTTL}/>
      
     
      {Behalf}
      
      {/* <View >
      <table style={{ marginLeft:"12",marginRight:"12" }}>
        <tr style={{ border: 1, bordercolor: "black",backgroundColor:"lightgrey"}}>
        <Text style={{fontSize:"14",textAlign:"center"}}>Payments on your behalf </Text>
       
        <Text style={{fontWeight:"bold",fontSize:"11",textAlign:"center"}}> Description                                               Additional Info              Original Amount in MAD  Amount in ({data[0][0].CURRENCY})</Text>
        </tr>
  
      </table>
      </View> */}
      <AirportFees CUTE_AMT={CUTE_AMT} CURRENCY={CURRENCY} Rates={Rates} TASPT_AMT={TASPT_AMT} APT_FEES_AMT={APT_FEES_AMT} AirportTTL={ttl=>setAirportTTL(ttl)}/>
      {/* <Subtotal2 AirportTTL={AirportTTL}/> */}
      <Handling1 CURRENCY={CURRENCY} Rates={Rates} HANDLER={HANDLER} CUSTOMER={CUSTOMER} GPU_TIME={GPU_TIME} GPU={GPU} ASU={ASU} PUSH_BACK={PUSH_BACK} WO_HNDL_INV={WO_HNDL_INV} Concession_handler={Concession_handler} Handling={Handling} HandlingTTL={ttl=>setHandlingTTL(ttl)}/>
     <Other MEDICAL_AMT={MEDICAL_AMT} MEDICAL_INV={MEDICAL_INV} OTHER_CHG4={OTHER_CHG4} OTHER_CHG4_AMT={OTHER_CHG4_AMT} OTHER_CHG4_INV={OTHER_CHG4_INV} OTHER_CHG5={OTHER_CHG5} OTHER_CHG5_AMT={OTHER_CHG5_AMT} OTHER_CHG5_INV={OTHER_CHG5_INV}  OTHER_CHG2={OTHER_CHG2} OTHER_CHG2_AMT={OTHER_CHG2_AMT} OTHER_CHG2_INV={OTHER_CHG2_INV} OTHER_CHG3={OTHER_CHG3} OTHER_CHG3_AMT={OTHER_CHG3_AMT} OTHER_CHG3_INV={OTHER_CHG3_INV} OTHER_CHG1={OTHER_CHG1} OTHER_CHG1_AMT={OTHER_CHG1_AMT} OTHER_CHG1_INV={OTHER_CHG1_INV} CURRENCY={CURRENCY} Rates={Rates} Disb={Disb} FUEL_AMT={FUEL_AMT} FUEL_INV={FUEL_INV} Fast_Track={Fast_Track} CIQ_Coordination={CIQ_Coordination} CREW_HTC_AMT={CREW_HTC_AMT} CREW_HTC_INV={CREW_HTC_INV} CREW_TRS_INV={CREW_TRS_INV} CREW_TRS_AMT={CREW_TRS_AMT} PAX_HTC_AMT={PAX_HTC_AMT} PAX_HTC_INV={PAX_HTC_INV} PAX_TRS_AMT={PAX_TRS_AMT} PAX_TRS_INV={PAX_TRS_INV} CATERING_AMT={CATERING_AMT} CATERING_INV={CATERING_INV} OtherTTL={ttl=>setOtherTTL(ttl)} />
    
      {S}
      {/* <View style={{ flex: 4}}> */}
      <Text style={{fontSize:"11",marginRight:"18",marginLeft:"18",marginTop:"0"}}> _____________________________________________________________________________________________  </Text>
      {Disb_Vat}
      {/* <View style={{ flexDirection: "row" }}>
      
      <View style={{ flex: 5 }}>
          <Text style={{fontSize:"11",textAlign:"right",marginRight:"18"}}>  </Text>
          <Text style={{fontSize:"11",textAlign:"right",marginRight:"18"}}>  </Text>
            
        </View>
      
        <View style={{ flex: 5 }}>
          <Text style={{fontSize:"11",textAlign:"right",marginRight:"18"}}>Disbursement : </Text>
          <Text style={{fontSize:"11",textAlign:"right",marginRight:"18"}}>VAT          : </Text>
            
        </View>
        <View style={{ flex: 1 }}>
          <Text style={{fontSize:"10",textAlign:"right",marginRight:"18"}}>{Sub1!=0 ? "Subtotal(2)": "Subtotal"}  x {Disb}%</Text>
          <Text style={{fontSize:"10",textAlign:"right",marginRight:"18"}}> Disbursement  x 20 %</Text>
            
        </View>
        <View style={{ flex: 5 }}>
          <Text style={{fontSize:"10",textAlign:"center",marginRight:"18"}}> </Text>
          <Text style={{fontSize:"10",textAlign:"center",marginRight:"18"}}> </Text>
            
        </View>
        <View style={{ flex: 1,marginRight:"18"}}>                                                             
        
          <Text style={{fontSize:"11",textAlign:"right",marginRight:"18"}}>{Math.round( (OtherTTL+AirportTTL+HandlingTTL)*Disb)/100}</Text>
          <Text style={{fontSize:"11",textAlign:"right",marginRight:"18"}}>{Math.round((((OtherTTL+AirportTTL+HandlingTTL)*Disb)/100)*20)/100}</Text>
          
        </View>
     

      </View> */}
        
     {/* <Text style={{fontSize:"11",marginRight:"18",marginLeft:"18",marginTop:"0"}}> _________ ___________________________________________________________________________________   </Text> */}
                 {/* <Text style={{fontSize:"11",textAlign:"right",marginRight:"18"}}>Disbursement : Subtotal(2) x 5%        125.00</Text>
                  <Text style={{fontSize:"11",textAlign:"right",marginRight:"18"}}>VAT : [Subtotal(1) + Subtotal(2)] x 20%        1325.00</Text> */}






{/* <View style={{ flexDirection: "row" }}>
      
<View style={{ flex: 4 }}>
<table style={{marginLeft:"12",marginRight:"12"}}>
       
<td >   
        
          <Text style={{fontSize:"11",textAlign:"left",marginTop :"5",marginBottom :"5",marginRight :"2"}}>                                  Disbursement : Subtotal(2) x 5% </Text>
       
        </td>                           
       
      
      </table >
</View>
<View style={{ flex: 1}}>
<table style={{marginLeft:"12",marginRight:"12"}}>
        
        <td style={{ border: 1, bordercolor: "black", backgroundColor:"grey"}}>
        
          <Text style={{fontSize:"11",textAlign:"right",marginTop :"5",marginBottom :"5",marginRight :"2"}}>1253.00</Text>
       
        </td>
                       
       
      
      </table >
  
</View>


</View>

<View style={{ flexDirection: "row" }}>
      
<View style={{ flex: 4 }}>
<table style={{marginLeft:"12",marginRight:"12"}}>
       
<td>
        
          <Text style={{fontSize:"11",textAlign:"left",marginTop :"5",marginBottom :"5",marginRight :"2"}}>                                      Subtotal(2) x 5%           </Text>
       
        </td>                           
       
      
      </table >
</View>
<View style={{ flex: 1}}>
<table style={{marginLeft:"12",marginRight:"12"}}>
        
        <td style={{ border: 1, bordercolor: "black", backgroundColor:"grey"}}>
        
          <Text style={{fontSize:"11",textAlign:"right",marginTop :"5",marginBottom :"5",marginRight :"2"}}>6253.00</Text>
       
        </td>
     
      </table >
  
</View>


</View> */}

    
      
     


    <View style={{ flexDirection: "row" }}>
      
        <View style={{ flex: 0}}>
             <table style={{marginLeft:"16",marginRight:"12",marginBottom :"4"}}>
               
                <td >
                
                  <Text style={{fontSize:"8",textAlign:"right",marginTop :"5",marginBottom :"5",marginRight :"2"}}>( {number2text(Total,CURRENCY)})</Text>
               
                </td>                           
               
              
              </table >
        </View>
        <View style={{ flex: 4}}>
             <table style={{marginLeft:"16",marginRight:"12",marginBottom :"4"}}>
               
                <td >
                
                  <Text style={{fontSize:"12",textAlign:"right",marginTop :"5",marginBottom :"5",marginRight :"2"}}>TOTAL :</Text>
               
                </td>                           
               
              
              </table >
        </View>
         
        <View style={{ flex: 1}}>
        <table style={{marginRight:"16",marginBottom :"4"}}>
                
                <td style={{ border: 1, bordercolor: "black", backgroundColor:"yellow"}}>
                
                  <Text style={{fontSize:"11",textAlign:"right",marginTop :"5",marginBottom :"5",marginRight :"6"}}>{`${data[0][0].CURRENCY}`}    {Total.toFixed(2)}</Text>
               
                </td>
                               
               
              
              </table >
          
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

export default Invoice
