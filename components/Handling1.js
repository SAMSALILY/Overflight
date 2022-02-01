import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

export default function Handling(props) {

  let Services_Converted;
  //////////////////////////////// Conversion   
 let currency_sell;
 let currency_buy;

 const CURRENCY=props.CURRENCY;
 const RATES=props.Rates;

 const EXCHANGE_EUR_SELL=RATES.EXCHANGE_EUR_SELL;
 const EXCHANGE_EUR_BUY=RATES.EXCHANGE_EUR_BUY;
 const EXCHANGE_USD_BUY=RATES.EXCHANGE_USD_BUY;
 const EXCHANGE_USD_SELL=RATES.EXCHANGE_USD_SELL;

 
 switch (CURRENCY) {
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
   
   let Services=props.Handling ;
   let Concession_handler=props.Concession_handler ;
   let CUSTOMER=props.CUSTOMER;
   let GPU=props.GPU;
   let GPU_TIME=props.GPU_TIME;
   let ASU=props.ASU;
   let PUSH_BACK=props.PUSH_BACK;
   let HANDLER=props.HANDLER;

     let PushBack=0;
   if (PUSH_BACK=="Y" ){
    PushBack=80;
   }
   let Asu=0;
   if (ASU=="Y" ){
    Asu=80;
   }
   let Gpu=0;
   if (GPU=="Y" ){
    Gpu=80;
   }



   if(HANDLER=="JETEX"){
    Concession_handler=0;
    Gpu=0;
    Asu=0;
    PushBack=0;
    Services_Converted=Services/currency_buy;
  }

   ////////////////// EXTRA GSE FOR JETEX EAM //
   if(CUSTOMER=="1111"){
      Gpu=Gpu*11;
      Asu=Asu*11;
      PushBack=PushBack*11;
   }
   //////////////////////////////////////
   let ServicesTTL=0; 
  //  let NAT_FLT=props. NAT_FLT;
   let WO_HNDL_INV=props.WO_HNDL_INV;
 
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

  if (Services!=0 && HANDLER!="JETEX") { T=<Text style={{fontSize:"10", marginLeft:"30"}}>- Full Services</Text>;
   T_DESCRIPTION= <Text style={{fontSize:"10"}}> WO {WO_HNDL_INV}</Text>;
   T_DESCRIPTION2= <Text style={{fontSize:"10"}}> </Text>;
   T_AMOUNT= <Text style={{fontSize:"10"}}>{Services.toFixed(2)}</Text>;
     ServicesTTL+=Services;
  }else if(Services!=0 && HANDLER=="JETEX"){
  T=<Text style={{fontSize:"10", marginLeft:"30"}}>- Full Services</Text>;
  T_DESCRIPTION= <Text style={{fontSize:"10"}}> WO {WO_HNDL_INV}</Text>;
  T_DESCRIPTION2= <Text style={{fontSize:"10"}}> {Services.toFixed(2)}</Text>;
  T_AMOUNT= <Text style={{fontSize:"10"}}>{Services_Converted.toFixed(2)}</Text>;
    ServicesTTL+=Services;
 }

   if (Concession_handler!=0) { T2=<Text style={{fontSize:"10", marginLeft:"30"}}>- Concession fee</Text>;
   T2_DESCRIPTION= <Text style={{fontSize:"10"}}> ------------------------- </Text>;
   T2_DESCRIPTION2= <Text style={{fontSize:"10"}}>  </Text>;
   T2_AMOUNT= <Text style={{fontSize:"10"}}>{Concession_handler.toFixed(2)}</Text>;
     ServicesTTL+=Concession_handler;
   };
   if (Gpu!=0) { T5=<Text style={{fontSize:"10", marginLeft:"30"}}>- Extra: GPU</Text>;
   T5_DESCRIPTION= <Text style={{fontSize:"10"}}> ------------------------- </Text>;
   T5_DESCRIPTION2= <Text style={{fontSize:"10"}}>  </Text>;
   T5_AMOUNT= <Text style={{fontSize:"10"}}>{Gpu.toFixed(2)}</Text>;
     ServicesTTL+=Gpu;
   };
   if (PushBack!=0) { T3=<Text style={{fontSize:"10", marginLeft:"30"}}>- Extra: Push-Back</Text>;
   T3_DESCRIPTION= <Text style={{fontSize:"10"}}> ------------------------- </Text>;
   T3_DESCRIPTION2= <Text style={{fontSize:"10"}}>  </Text>;
   T3_AMOUNT= <Text style={{fontSize:"10"}}>{PushBack.toFixed(2)}</Text>;
     ServicesTTL+=PushBack;
   };
   if (Asu!=0) { T4=<Text style={{fontSize:"10", marginLeft:"30"}}>- Extra: ASU</Text>;
   T4_DESCRIPTION= <Text style={{fontSize:"10"}}> ------------------------- </Text>;
   T4_DESCRIPTION2= <Text style={{fontSize:"10"}}>  </Text>;
   T4_AMOUNT= <Text style={{fontSize:"10"}}>{Asu.toFixed(2)}</Text>;
     ServicesTTL+=Asu;
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
     {T5}
     {T3}
     {T4}      
     
     </View>

     <View style={{ flex: 1}}>
     {T_DESCRIPTION}
     {T2_DESCRIPTION}
     {T5_DESCRIPTION}
     {T3_DESCRIPTION}  
     {T4_DESCRIPTION}  
     </View>
     <View style={{ flex: 1}}>
        {T_DESCRIPTION2}
        {T2_DESCRIPTION2}
        {T5_DESCRIPTION2}
        {T3_DESCRIPTION2}
        {T4_DESCRIPTION2}
     </View>

     <View style={{ flex: 1}}>
     {T_AMOUNT}
     {T2_AMOUNT}
     {T5_AMOUNT}
     {T3_AMOUNT} 
     {T4_AMOUNT}  
     </View>

</View>
       </div>
   )
}
