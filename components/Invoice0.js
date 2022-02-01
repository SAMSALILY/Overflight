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



function Invoice(props) {

  function number2text(value,currency) {
  let cur;
    switch(currency) {
        case "EUR":
          cur="EUROS";
          break;
        case "USD":
            cur="DOLLARS";
          break;
       
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
case "GMMN":
  sita="CMN"
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

////////////////////////////////

const T_DELAY1=`${date}T${data[0][0].ED}`;
const T_DELAY2=`${date}T${data[0][0].AD}`;

const DELAY_TIME=(new Date(T_DELAY2)-new Date(T_DELAY1))/3600000;
////////////////////////////////////////

let Behalf;
if(AirportTTL!=0 || HandlingTTL!=0 || OtherTTL!=0){
  Behalf= <View >
<table style={{ marginLeft:"12",marginRight:"12" }}>
  <tr style={{ border: 1, bordercolor: "black",backgroundColor:"lightgrey"}}>
  <Text style={{fontSize:"12",textAlign:"center",textDecoration:'underline'}}>Payments on your behalf </Text>
 
  <Text style={{fontWeight:"bold",fontSize:"11",textAlign:"center", marginBottom:"4"}}> Description                                               Additional Info              Original Amount in MAD  Amount in ({data[0][0].CURRENCY})</Text>
  </tr>

</table>
</View>
 }

let S;
if(AirportTTL!=0 || HandlingTTL!=0 || OtherTTL!=0 ){
 S= <Subtotal2 AirportTTL={AirportTTL} HandlingTTL={HandlingTTL} OtherTTL={OtherTTL}/>
}

let OPERATOR;
let concat=(data[0][0].OPERATOR).concat(data[0][0].PROVIDER);
console.log("concat",concat);

if ((data[0][0].OPERATOR).localeCompare(data[0][0].PROVIDER)!==0){
OPERATOR= <Text style={{fontSize:"10", marginLeft:"12"}}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Operator   :    {`${data[0][0].OPERATOR}`} </Text>
}
let Total=(Math.round((OtherTTL+AirportTTL+HandlingTTL)*5)/100)+(Math.round((OtherTTL+AirportTTL+HandlingTTL+SurchargeTTL+AdditionalTTL+PermitTTL+BasicTTL)*20)/100)+(Math.round( (OtherTTL+AirportTTL+HandlingTTL)*100)/100)+(Math.round((SurchargeTTL+AdditionalTTL+PermitTTL+BasicTTL)*100)/100);
  return (
     <>
    
     <Document >
     <Page size="A4" style={styles.page}>
     {/* <Text style={{fontSize:"12",textAlign:"center",marginBpottom:"12"}}> </Text>  */}
     {/* <Text style={{fontSize:"12",textAlign:"center",marginBpottom:"12"}}> </Text>  */}
     <Text style={styles.title}>GENERAL INVOICE</Text>
      <Text style={{fontSize:"12", textAlign:"right",marginRight:"12"}}> # {`${data[0][0].registration}`} </Text>
      <Text style={{fontSize:"11", marginLeft:"12", marginBottom:"6"}}>Reference  {`${data[0][0].registration}`}</Text>

      <View style={{ flexDirection: "row" }}>
      
            <View style={{ flex: 1 }}>
              <Text style={{fontWeight:"bold",fontSize:"10", marginLeft:"12"}}>Invoice n°                    {`${data[0][0].registration}`}</Text>
              <Text style={{fontWeight:"bold",fontSize:"10", marginLeft:"12"}}>Date of issue               {`${data[0][0].date}`}</Text>
              <Text style={{fontWeight:"bold",fontSize:"10", marginLeft:"12"}}>Due date                     {`${data[0][0].date}`}</Text>
              <Text style={{fontWeight:"bold",fontSize:"10", marginLeft:"12"}}>Invoice Ref.                 {`${data[0][0].date}`}</Text>
              <Text style={{fontWeight:"bold",fontSize:"10", marginLeft:"12"}}>ICE n°                         2254668977/8</Text>
              <Text style={{fontWeight:"bold",fontSize:"10", marginLeft:"12"}}>Customer order n°      {`${data[0][0].date}`}</Text>
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
              <Text style={{fontSize:"11",marginLeft:"5"}}>7005 LEBOURGET</Text>
              <Text style={{fontSize:"11",marginLeft:"5"}}>Payable</Text>
              <Text style={{fontSize:"11",marginLeft:"5"}}>7005 LEBOURGET</Text>
              <Text style={{fontSize:"11",marginLeft:"5"}}>Payable</Text>
              <Text style={{fontSize:"11",textAlign:"center",marginBpottom:"12"}}>Att : Payable</Text>
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
      <AddServices TRAVEL={TRAVEL} CREW_ASSIST={CREW_ASSIST} PHONE={PHONE} PRINT={PRINT} AdditionalTTL={ttl=>setAdditionalTTL(ttl)}/>
      <Surcharges DELAY_TIME={DELAY_TIME} DEP_DTE_W={DEP_DTE_W} ARV_DTE_W={ARV_DTE_W} AA={AA} AD={AD} B={B} SurchargeTTL={ttl=>setSurchargeTTL(ttl)} />
      <Subtotal1 SurchargeTTL={SurchargeTTL} AdditionalTTL={AdditionalTTL} PermitTTL={PermitTTL} BasicTTL={BasicTTL}/>
      

      {Behalf}
      {/* <View >
      <table style={{ marginLeft:"12",marginRight:"12" }}>
        <tr style={{ border: 1, bordercolor: "black",backgroundColor:"lightgrey"}}>
        <Text style={{fontSize:"14",textAlign:"center"}}>Payments on your behalf </Text>
       
        <Text style={{fontWeight:"bold",fontSize:"11",textAlign:"center"}}> Description                                               Additional Info              Original Amount in MAD  Amount in ({data[0][0].CURRENCY})</Text>
        </tr>
  
      </table>
      </View> */}
      <AirportFees TASPT_AMT={TASPT_AMT} APT_FEES_AMT={APT_FEES_AMT} AirportTTL={ttl=>setAirportTTL(ttl)}/>
      {/* <Subtotal2 AirportTTL={AirportTTL}/> */}
      <Handling1 WO_HNDL_INV={WO_HNDL_INV} Concession_handler={Concession_handler} Handling={Handling} HandlingTTL={ttl=>setHandlingTTL(ttl)}/>
      <Other FUEL_AMT={FUEL_AMT} FUEL_INV={FUEL_INV} Fast_Track={Fast_Track} CIQ_Coordination={CIQ_Coordination} CREW_HTC_AMT={CREW_HTC_AMT} CREW_HTC_INV={CREW_HTC_INV} CREW_TRS_INV={CREW_TRS_INV} CREW_TRS_AMT={CREW_TRS_AMT} PAX_HTC_AMT={PAX_HTC_AMT} PAX_HTC_INV={PAX_HTC_INV} PAX_TRS_AMT={PAX_TRS_AMT} PAX_TRS_INV={PAX_TRS_INV} CATERING_AMT={CATERING_AMT} CATERING_INV={CATERING_INV} OtherTTL={ttl=>setOtherTTL(ttl)} />
    
      {S}
      {/* <View style={{ flex: 4}}> */}
      <Text style={{fontSize:"11",marginRight:"18",marginLeft:"18",marginTop:"0"}}> _____________________________________________________________________________________________  </Text>

      <View style={{ flexDirection: "row" }}>
      
        <View style={{ flex: 4 }}>
          <Text style={{fontSize:"11",textAlign:"right",marginRight:"18"}}>Disbursement :        Subtotal(2)  x 05%       </Text>
          <Text style={{fontSize:"11",textAlign:"right",marginRight:"18"}}>VAT : [Subtotal(1) + Subtotal(2)] x 20%        </Text>
            
        </View>
        <View style={{ flex: 1}}>                                                             
        
          <Text style={{fontSize:"11",textAlign:"right",marginRight:"18"}}>{Math.round( (OtherTTL+AirportTTL+HandlingTTL)*5)/100}</Text>
          <Text style={{fontSize:"11",textAlign:"right",marginRight:"18"}}>{Math.round((OtherTTL+AirportTTL+HandlingTTL+SurchargeTTL+AdditionalTTL+PermitTTL+BasicTTL)*20)/100}</Text>
          
        </View>
     

      </View>
        
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
                
                  <Text style={{fontSize:"9",textAlign:"right",marginTop :"5",marginBottom :"5",marginRight :"2"}}>( {number2text(Total,"EUR")} )</Text>
               
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
                
                  <Text style={{fontSize:"10",textAlign:"right",marginTop :"5",marginBottom :"5",marginRight :"2"}}>{`${data[0][0].CURRENCY}`}    {Total}</Text>
               
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
