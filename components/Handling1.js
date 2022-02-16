import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import  { useState, useEffect } from "react";
import axios from "axios";

export default function Handling(props) {

  let Services=props.Handling_Def;
  let Concession_handler=props.ConcessionH_Def;
  let CURRENCY_Def=props.CURRENCY_Def;
 
  let Services_Converted;
   //////////////////////////////// Conversion   
 let currency_sell;
 let currency_buy;

 const RATES=props.Rates; 
//  const CURRENCY=props.CURRENCY;

 const EXCHANGE_EUR_SELL=RATES.EXCHANGE_EUR_SELL;
 const EXCHANGE_EUR_BUY=RATES.EXCHANGE_EUR_BUY;
 const EXCHANGE_USD_BUY=RATES.EXCHANGE_USD_BUY;
 const EXCHANGE_USD_SELL=RATES.EXCHANGE_USD_SELL;
 
 switch (CURRENCY_Def) {
   case "EUR":
     currency_sell = EXCHANGE_EUR_SELL;
     currency_buy = EXCHANGE_EUR_BUY;
     break;
   case "MAD":
     currency_sell = 1;
     currency_buy = 1;
     break;  
   case "USD":
     currency_sell = EXCHANGE_USD_SELL;
     currency_buy = EXCHANGE_USD_BUY;
 }
///////////////End Conversion

 




let GPU_PRICE=props.GPU_PRICE;
let ASU_PRICE=props.ASU_PRICE;
let PUSH_PRICE=props.PUSH_PRICE;
let WCH_PRICE=props.WCH_PRICE;
let UMNR_PRICE=props.UMNR_PRICE;
let AMBU_PRICE=props.AMBU_PRICE;
let TOWING_PRICE=props.TOWING_PRICE;
let HANDLER=props.HANDLER;
let ID=props.ID;

let WCH_NBR=props.WCH_NBR;
let VIP_AMT=props.VIP_AMT;
let VIP_LOUNGE_ONLY=props.VIP_LOUNGE_ONLY;
// let PUSH_BACK=props.PUSH_BACK;
// let GPU_NBR=props.GPU_NBR;
// let ASU_NBR=props.ASU_NBR;
// let TOWING=props.TOWING;
console.log("Services dans hnadling1",Services);

let EXTRA;

let compteur=0;
if (GPU_PRICE!=0){compteur+=1;}
if (ASU_PRICE!=0){compteur+=1;}
if (PUSH_PRICE!=0){compteur+=1;}
if (AMBU_PRICE!=0){compteur+=1;}
if (TOWING_PRICE!=0){compteur+=1;}
if (WCH_PRICE!=0){compteur+=1;}
if (VIP_AMT!=0){compteur+=1;}


// useEffect(()=>{

  // const updateHandling = async () => {
  
  //   try {
  //     const request = await axios.put(
  //       'http://127.0.0.1:1501/api/data/putHandling',
  //       {
  //         title: 'Updated Post',
  //        body: {Services,Concession_handler,ID},
  //       }
  //     );
  //     console.log("REQUEST",request);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  // updateHandling();


// },[{}])
// useEffect(()=>{
//   axios.get(`http://127.0.0.1:1501/api/data/GetHandling`+ID,{ crossdomain: true }).then(
//     (response)=>{
//     console.log('GetHandling',response.data);});  
// },[]);
   
  //  axios.put(`http://127.0.0.1:1501/api/putHandling`,{Services,Concession_handler,ID},{ crossdomain: true }).then(
  // (response)=>{
  //  console.log('sddsdsd',response.data);})
  let WO_HNDL_INV=props.WO_HNDL_INV;

   if (VIP_AMT!=0 || GPU_PRICE!=0 || ASU_PRICE!=0 || PUSH_PRICE!=0 || AMBU_PRICE!=0 || TOWING_PRICE!=0 || WCH_PRICE!=0){
    EXTRA=compteur+" Extra SVC included";
  }else {EXTRA="WO:"+WO_HNDL_INV}

   if(HANDLER=="JETEX"){
    // GPU_Converted=GPU_PRICE/currency_buy;
    Services=Services+Concession_handler+VIP_AMT+GPU_PRICE+ASU_PRICE+PUSH_PRICE+WCH_PRICE+UMNR_PRICE+AMBU_PRICE+TOWING_PRICE;
    Services_Converted=Services/currency_buy;
    Concession_handler=0;
    GPU_PRICE=0;
    ASU_PRICE=0;
    PUSH_PRICE=0;
    WCH_PRICE=0;
    UMNR_PRICE=0;
    AMBU_PRICE=0;
    TOWING_PRICE=0;

    VIP_LOUNGE_ONLY=0;
       
    // PUSH_PRICE_Converted=PUSH_PRICE/currency_buy;

  }
   
      
   let ServicesTTL=0; 
  
  //  let NAT_FLT=props. NAT_FLT;
   
 
   let P;
    
   if (Services!=0 || Concession_handler!=0){P=<Text style={{fontWeight:"bold",fontSize:"11",marginLeft:"18"}}>GSE & manpower: GHS</Text>
   }else{
    P=<Text style={{fontWeight:"bold",fontSize:"11",marginLeft:"18"}}>GSE & manpower: GHS</Text>
   }
//    }

  let T;
  let T_DESCRIPTION;
  let T_DESCRIPTION2;
  let T_AMOUNT;

  let T2;
  let T2_DESCRIPTION;
  let T2_DESCRIPTION2;
  let T2_AMOUNT;

  let T3;
  let T3_DESCRIPTION;
  let T3_DESCRIPTION2;
  let T3_AMOUNT;

  let T4;
  let T4_DESCRIPTION;
  let T4_DESCRIPTION2;
  let T4_AMOUNT;

  let T5;
  let T5_DESCRIPTION;
  let T5_DESCRIPTION2;
  let T5_AMOUNT;

  let TW;
  let TW_DESCRIPTION;
  let TW_DESCRIPTION2;
  let TW_AMOUNT;

  let TU;
  let TU_DESCRIPTION;
  let TU_DESCRIPTION2;
  let TU_AMOUNT;

  let TA;
  let TA_DESCRIPTION;
  let TA_DESCRIPTION2;
  let TA_AMOUNT;

  let TT;
  let TT_DESCRIPTION;
  let TT_DESCRIPTION2;
  let TT_AMOUNT;

  let TVIP;
  let TVIP_DESCRIPTION;
  let TVIP_DESCRIPTION2;
  let TVIP_AMOUNT;
  


  if (Services!=0 && HANDLER!="JETEX") { T=<Text style={{fontSize:"10", marginLeft:"30"}}>- Full Services</Text>;
   T_DESCRIPTION= <Text style={{fontSize:"10"}}> WO {WO_HNDL_INV}</Text>;
   T_DESCRIPTION2= <Text style={{fontSize:"10"}}>{CURRENCY_Def!="MAD" ? ((+currency_sell)*Services).toFixed(2):""} </Text>;
   T_AMOUNT= <Text style={{fontSize:"10"}}>{Services.toFixed(2)}</Text>;
     ServicesTTL+=Services;
  }
  if(Services!=0 && HANDLER=="JETEX") {    
  T=<Text style={{fontSize:"10", marginLeft:"30"}}>- Full Services</Text>;
  T_DESCRIPTION= <Text style={{fontSize:"10"}}> {EXTRA}</Text>;
  T_DESCRIPTION2= <Text style={{fontSize:"10"}}> {Services.toFixed(2)}</Text>;
  T_AMOUNT= <Text style={{fontSize:"10"}}>{Services_Converted.toFixed(2)}</Text>;
    ServicesTTL+=Services_Converted;
 }

  //  if (Concession_handler!=0) { T2=<Text style={{fontSize:"10", marginLeft:"30"}}>- Concession fee</Text>;
  //  T2_DESCRIPTION= <Text style={{fontSize:"10"}}> ------------------------- </Text>;
  //  T2_DESCRIPTION2= <Text style={{fontSize:"10"}}> {((+currency_sell)*Concession_handler).toFixed(2)} </Text>;
  //  T2_AMOUNT= <Text style={{fontSize:"10"}}>{Concession_handler.toFixed(2)}</Text>;
  //    ServicesTTL+=Concession_handler;
  //  };
  
   if (Concession_handler!=0) { T2=<Text style={{fontSize:"10", marginLeft:"30"}}>- Concession fee</Text>;
   T2_DESCRIPTION= <Text style={{fontSize:"10"}}> ------------------------- </Text>;
   T2_DESCRIPTION2= <Text style={{fontSize:"10"}}> {CURRENCY_Def!="MAD" ? ((+currency_sell)*Concession_handler).toFixed(2) : ""} </Text>;
   T2_AMOUNT= <Text style={{fontSize:"10"}}>{Concession_handler.toFixed(2)}</Text>;
     ServicesTTL+=Concession_handler;
   };



  if (VIP_LOUNGE_ONLY!=0) { TVIP=<Text style={{fontSize:"10", marginLeft:"30"}}>- VIP Lounge</Text>;
  TVIP_DESCRIPTION= <Text style={{fontSize:"10"}}> ------------------------- </Text>;
  TVIP_DESCRIPTION2= <Text style={{fontSize:"10"}}> {`${CURRENCY_Def}`!="MAD" ? VIP_LOUNGE_ONLY.toFixed(2): ""} </Text>;
  TVIP_AMOUNT= <Text style={{fontSize:"10"}}>{(VIP_LOUNGE_ONLY/(+currency_buy)).toFixed(2)}</Text>;
    ServicesTTL+=(VIP_LOUNGE_ONLY/(+currency_buy));
  };



   if (GPU_PRICE!=0) { T5=<Text style={{fontSize:"10", marginLeft:"30"}}>- Extra: GPU</Text>;
   T5_DESCRIPTION= <Text style={{fontSize:"10"}}> ------------------------- </Text>;
   T5_DESCRIPTION2= <Text style={{fontSize:"10"}}> {CURRENCY_Def!="MAD" ? ((+currency_sell)*GPU_PRICE).toFixed(2):""} </Text>;
   T5_AMOUNT= <Text style={{fontSize:"10"}}>{GPU_PRICE.toFixed(2)}</Text>;
     ServicesTTL+=GPU_PRICE;
   };
   if (PUSH_PRICE!=0) { T3=<Text style={{fontSize:"10", marginLeft:"30"}}>- Extra: Push-Back</Text>;
   T3_DESCRIPTION= <Text style={{fontSize:"10"}}> ------------------------- </Text>;
   T3_DESCRIPTION2= <Text style={{fontSize:"10"}}> {CURRENCY_Def!="MAD" ? ((+currency_sell)*PUSH_PRICE).toFixed(2):""} </Text>;
   T3_AMOUNT= <Text style={{fontSize:"10"}}>{PUSH_PRICE.toFixed(2)}</Text>;
     ServicesTTL+=PUSH_PRICE;
   };
   if (ASU_PRICE!=0) { T4=<Text style={{fontSize:"10", marginLeft:"30"}}>- Extra: ASU</Text>;
   T4_DESCRIPTION= <Text style={{fontSize:"10"}}> ------------------------- </Text>;
   T4_DESCRIPTION2= <Text style={{fontSize:"10"}}> {CURRENCY_Def!="MAD" ? ((+currency_sell)*ASU_PRICE).toFixed(2):""} </Text>;
   T4_AMOUNT= <Text style={{fontSize:"10"}}>{ASU_PRICE.toFixed(2)}</Text>;
     ServicesTTL+=ASU_PRICE;
   };
   if (WCH_PRICE!=0) { TW=<Text style={{fontSize:"10", marginLeft:"30"}}>- Extra: WCHR</Text>;
   TW_DESCRIPTION= <Text style={{fontSize:"10"}}> {WCH_NBR} WCH </Text>;
   TW_DESCRIPTION2= <Text style={{fontSize:"10"}}>{CURRENCY_Def!="MAD" ? ((+currency_sell)*WCH_PRICE).toFixed(2):""}  </Text>;
   TW_AMOUNT= <Text style={{fontSize:"10"}}>{(+WCH_PRICE).toFixed(2)}</Text>;
     ServicesTTL+=+WCH_PRICE;
   };
   if (UMNR_PRICE!=0) { TU=<Text style={{fontSize:"10", marginLeft:"30"}}>- Extra: UMNR</Text>;
   TU_DESCRIPTION= <Text style={{fontSize:"10"}}> ------------------------- </Text>;
   TU_DESCRIPTION2= <Text style={{fontSize:"10"}}> {CURRENCY_Def!="MAD" ? ((+currency_sell)*UMNR_PRICE).toFixed(2):""} </Text>;
   TU_AMOUNT= <Text style={{fontSize:"10"}}>{(+UMNR_PRICE).toFixed(2)}</Text>;
     ServicesTTL+=+UMNR_PRICE;
   };
   if (AMBU_PRICE!=0) { TA=<Text style={{fontSize:"10", marginLeft:"30"}}>- Extra: AMBU</Text>;
   TA_DESCRIPTION= <Text style={{fontSize:"10"}}> ------------------------- </Text>;
   TA_DESCRIPTION2= <Text style={{fontSize:"10"}}>{CURRENCY_Def!="MAD" ? ((+currency_sell)*AMBU_PRICE).toFixed(2):""}  </Text>;
   TA_AMOUNT= <Text style={{fontSize:"10"}}>{(+AMBU_PRICE).toFixed(2)}</Text>;
     ServicesTTL+=+AMBU_PRICE;
   };
   if (TOWING_PRICE!=0) { TT=<Text style={{fontSize:"10", marginLeft:"30"}}>- Extra: TOWING</Text>;
   TT_DESCRIPTION= <Text style={{fontSize:"10"}}> ------------------------- </Text>;
   TT_DESCRIPTION2= <Text style={{fontSize:"10"}}>{CURRENCY_Def!="MAD" ? ((+currency_sell)*TOWING_PRICE).toFixed(2):""}  </Text>;
   TT_AMOUNT= <Text style={{fontSize:"10"}}>{(+TOWING_PRICE).toFixed(2)}</Text>;
     ServicesTTL+=+TOWING_PRICE;
   };

   ServicesTTL = Math.floor(  ServicesTTL * 100) / 100;
   props.HandlingTTL( ServicesTTL);
  
  return (
       <div>

     {P}
           
     <View style={{ flexDirection: "row" }}>
     
     <View style={{ flex: 2 }}>
     {T} 
     {T2} 
     {TVIP}
     {T5}
     {T3}
     {T4} 
     {TW}
     {TU}
     {TA}  
     {TT} 
       
     
     </View>

     <View style={{ flex: 1}}>
     {T_DESCRIPTION}
     {T2_DESCRIPTION}
     {TVIP_DESCRIPTION} 
     {T5_DESCRIPTION}
     {T3_DESCRIPTION}  
     {T4_DESCRIPTION} 
     {TW_DESCRIPTION}
     {TU_DESCRIPTION}  
     {TA_DESCRIPTION} 
     {TT_DESCRIPTION} 
     
      
     </View>
     <View style={{ flex: 1}}>
        {T_DESCRIPTION2}
        {T2_DESCRIPTION2}
        {TVIP_DESCRIPTION2} 
        {T5_DESCRIPTION2}
        {T3_DESCRIPTION2}
        {T4_DESCRIPTION2}
        {TW_DESCRIPTION2}
        {TU_DESCRIPTION2}
        {TA_DESCRIPTION2}
        {TT_DESCRIPTION2}
     </View>

     <View style={{ flex: 1}}>
     {T_AMOUNT}
     {T2_AMOUNT}
     {TVIP_AMOUNT}
     {T5_AMOUNT}
     {T3_AMOUNT} 
     {T4_AMOUNT}
     {TW_AMOUNT}
     {TU_AMOUNT} 
     {TA_AMOUNT}
     {TT_AMOUNT}   
     </View>

</View>
       </div>
   )
}
