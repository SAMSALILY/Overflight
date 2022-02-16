import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

export default function Other(props) {

   //////// Currencies & Rates ////
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
   ///// end Currencies and rates
    
   let OtherTTL=0;    
  
   let Fast_Track=props.Fast_Track;

   // let CIQ_Coordination=props.CIQ_Coordination;
   let CIQ_Coordination=props.CIQ_Coordination;

   let FUEL_AMT=props.FUEL_AMT;
   let FUEL_INV=props.FUEL_INV;

   let CREW_HTC_AMT=props.CREW_HTC_AMT;
   let CREW_HTC_INV=props.CREW_HTC_INV;

   let CREW_TRS_INV=props.CREW_TRS_INV;
   let CREW_TRS_AMT=props.CREW_TRS_AMT;

   let PAX_HTC_AMT=props.PAX_HTC_AMT;
   let PAX_HTC_INV=props.PAX_HTC_INV;

   let PAX_TRS_AMT=props.PAX_TRS_AMT;
   let PAX_TRS_INV=props.PAX_TRS_INV;

   let CATERING_AMT=props.CATERING_AMT;
   let CATERING_INV=props.CATERING_INV;

   let TRANS=CREW_TRS_AMT+PAX_TRS_AMT;
   let HOTAC=CREW_HTC_AMT+PAX_HTC_AMT;
////////////////////////////////  OTHER CHARGES
    let OTHER_CHG1=props.OTHER_CHG1;
    let OTHER_CHG1_AMT=props.OTHER_CHG1_AMT;
        OTHER_CHG1_AMT=(+OTHER_CHG1_AMT).toFixed(2);
    let OTHER_CHG1_INV=props.OTHER_CHG1_INV;

    let OTHER_CHG2=props.OTHER_CHG2;
    let OTHER_CHG2_AMT=props.OTHER_CHG2_AMT;
    OTHER_CHG2_AMT=(+OTHER_CHG2_AMT).toFixed(2);
    let OTHER_CHG2_INV=props.OTHER_CHG2_INV;

    let OTHER_CHG3=props.OTHER_CHG3;
    let OTHER_CHG3_AMT=props.OTHER_CHG3_AMT;
    OTHER_CHG3_AMT=(+OTHER_CHG3_AMT).toFixed(2);
    let OTHER_CHG3_INV=props.OTHER_CHG3_INV;

    let OTHER_CHG4=props.OTHER_CHG4;
    let OTHER_CHG4_AMT=props.OTHER_CHG4_AMT;
    OTHER_CHG4_AMT=(+OTHER_CHG4_AMT).toFixed(2);
    let OTHER_CHG4_INV=props.OTHER_CHG4_INV;

    let OTHER_CHG5=props.OTHER_CHG5;
    let OTHER_CHG5_AMT=props.OTHER_CHG5_AMT;
    OTHER_CHG5_AMT=(+OTHER_CHG5_AMT).toFixed(2);
    let OTHER_CHG5_INV=props.OTHER_CHG5_INV;

    let MEDICAL_AMT=props.MEDICAL_AMT;
    let MEDICAL_INV=props.MEDICAL_INV;
///////////////////////////////////////////////
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

  let T6;
  let T6_DESCRIPTION;
  let T6_DESCRIPTION2;
  let T6_AMOUNT;

  let T7;
  let T7_DESCRIPTION;
  let T7_DESCRIPTION2;
  let T7_AMOUNT;

  let TO1;
  let TO1_DESCRIPTION;
  let TO1_DESCRIPTION2;
  let TO1_AMOUNT;

  let TO2;
  let TO2_DESCRIPTION;
  let TO2_DESCRIPTION2;
  let TO2_AMOUNT;

  let TO3;
  let TO3_DESCRIPTION;
  let TO3_DESCRIPTION2;
  let TO3_AMOUNT;

  let TO4;
  let TO4_DESCRIPTION;
  let TO4_DESCRIPTION2;
  let TO4_AMOUNT;

  let TO5;
  let TO5_DESCRIPTION;
  let TO5_DESCRIPTION2;
  let TO5_AMOUNT;

  let TMED;
  let TMED_DESCRIPTION;
  let TMED_DESCRIPTION2;
  let TMED_AMOUNT;

  console.log("TRANS",TRANS+100000000)

  if (CIQ_Coordination!=0) { T=<Text style={{fontWeight:"bold",fontSize:"10",marginLeft:"18"}}>Facilities: CIQ Coordination </Text>;
   T_DESCRIPTION= <Text style={{fontSize:"10"}}>-------------------------</Text>;
   T_DESCRIPTION2= <Text style={{fontSize:"10"}}>{(CIQ_Coordination).toFixed(2)}</Text>;
   T_AMOUNT= <Text style={{fontSize:"10"}}>{(CIQ_Coordination/(+currency_buy)).toFixed(2)}</Text>;
   OtherTTL+=CIQ_Coordination/(+currency_buy);
  }

   if (+FUEL_AMT!=0) { T2=<Text style={{fontWeight:"bold",fontSize:"10",marginLeft:"18"}}>Fuel</Text>;
   T2_DESCRIPTION= <Text style={{fontSize:"10"}}> ------------------------- </Text>;
   T2_DESCRIPTION2= <Text style={{fontSize:"10"}}>{CURRENCY!="MAD" ? (+FUEL_AMT).toFixed(2):""}</Text>;
   T2_AMOUNT= <Text style={{fontSize:"10"}}>{(FUEL_AMT/(+currency_buy)).toFixed(2)}</Text>;
   OtherTTL+=(+FUEL_AMT)/(+currency_buy);
   };

   if (Fast_Track!=0) { T3=<Text style={{fontWeight:"bold",fontSize:"10",marginLeft:"18"}}>Fast Track / CIQ Coordination</Text>;
   T3_DESCRIPTION= <Text style={{fontSize:"10"}}> ------------------------- </Text>;
   T3_DESCRIPTION2= <Text style={{fontSize:"10"}}> {CURRENCY!="MAD" ? (Fast_Track).toFixed(2):""}</Text>;
   T3_AMOUNT= <Text style={{fontSize:"10"}}>{(Fast_Track/(+currency_buy)).toFixed(2)}</Text>;
   OtherTTL+=Fast_Track/(+currency_buy);
   };

   if (HOTAC!=0) { T4=<Text style={{fontWeight:"bold",fontSize:"10",marginLeft:"18"}}>Hotel Accomodation</Text>;
   T4_DESCRIPTION= <Text style={{fontSize:"10"}}> ------------------------- </Text>;
   T4_DESCRIPTION2= <Text style={{fontSize:"10"}}> {CURRENCY!="MAD" ? (HOTAC).toFixed(2):""}</Text>;
   T4_AMOUNT= <Text style={{fontSize:"10"}}>{(HOTAC/(+currency_buy)).toFixed(2)}</Text>;
   OtherTTL+=HOTAC/(+currency_buy);
   };

   if (TRANS!=0) { T5=<Text style={{fontWeight:"bold",fontSize:"10",marginLeft:"18"}}>Transport To/From Hotel</Text>;
   T5_DESCRIPTION= <Text style={{fontSize:"10"}}> ------------------------- </Text>;
   T5_DESCRIPTION2= <Text style={{fontSize:"10"}}> {CURRENCY!="MAD" ? (TRANS).toFixed(2):""}</Text>;
   T5_AMOUNT= <Text style={{fontSize:"10"}}>{(TRANS/(+currency_buy)).toFixed(2)}</Text>;
   OtherTTL+=TRANS/(+currency_buy);
   };

   if (CATERING_AMT!=0) { T6=<Text style={{fontWeight:"bold",fontSize:"10",marginLeft:"18"}}>Catering</Text>;
   T6_DESCRIPTION= <Text style={{fontSize:"10"}}> ------------------------- </Text>;
   T6_DESCRIPTION2= <Text style={{fontSize:"10"}}>{`${CURRENCY}`!="MAD" ? (CATERING_AMT).toFixed(2): ""}</Text>;
   T6_AMOUNT= <Text style={{fontSize:"10"}}>{(CATERING_AMT/(+currency_buy)).toFixed(2)}</Text>;
   OtherTTL+=CATERING_AMT/(+currency_buy);
   };
   ///////////////////////////////OTHER CHARGES /////////////
   if (OTHER_CHG1_AMT!=0) { TO1=<Text style={{fontWeight:"bold",fontSize:"10",marginLeft:"18"}}>{OTHER_CHG1}</Text>;
   TO1_DESCRIPTION= <Text style={{fontSize:"10"}}> ------------------------- </Text>;
   TO1_DESCRIPTION2= <Text style={{fontSize:"10"}}>{`${CURRENCY}`!="MAD" ? OTHER_CHG1_AMT: ""}</Text>;
   TO1_AMOUNT= <Text style={{fontSize:"10"}}>{(OTHER_CHG1_AMT/(+currency_buy)).toFixed(2)}</Text>;
   OtherTTL+=OTHER_CHG1_AMT/(+currency_buy);
   };
   if (OTHER_CHG2_AMT!=0) { TO2=<Text style={{fontWeight:"bold",fontSize:"10",marginLeft:"18"}}>{OTHER_CHG2}</Text>;
   TO2_DESCRIPTION= <Text style={{fontSize:"10"}}> ------------------------- </Text>;
   TO2_DESCRIPTION2= <Text style={{fontSize:"10"}}>{`${CURRENCY}`!="MAD" ? OTHER_CHG2_AMT: ""}</Text>;
   TO2_AMOUNT= <Text style={{fontSize:"10"}}>{(OTHER_CHG2_AMT/(+currency_buy)).toFixed(2)}</Text>;
   OtherTTL+=OTHER_CHG2_AMT/(+currency_buy);
   };
   console.log("(OTHER_CHG3_AMT/(+currency_buy)).toFixed(2)/*/*/*/",(OTHER_CHG3_AMT/(+currency_buy)).toFixed(2))
 if (+OTHER_CHG3_AMT!=0 ) { TO3=<Text style={{fontWeight:"bold",fontSize:"10",marginLeft:"18"}}>{OTHER_CHG3}</Text>;
   TO3_DESCRIPTION= <Text style={{fontSize:"10"}}> ------------------------- </Text>;
   TO3_DESCRIPTION2= <Text style={{fontSize:"10"}}>{`${CURRENCY}`!="MAD" ? OTHER_CHG3_AMT: ""}</Text>;
   TO3_AMOUNT= <Text style={{fontSize:"10"}}>{(OTHER_CHG3_AMT/(+currency_buy)).toFixed(2)}</Text>;
   OtherTTL+=OTHER_CHG3_AMT/(+currency_buy);
   };

   if (OTHER_CHG4_AMT!=0) { TO4=<Text style={{fontWeight:"bold",fontSize:"10",marginLeft:"18"}}>{OTHER_CHG4}</Text>;
   TO4_DESCRIPTION= <Text style={{fontSize:"10"}}> ------------------------- </Text>;
   TO4_DESCRIPTION2= <Text style={{fontSize:"10"}}>{`${CURRENCY}`!="MAD" ? OTHER_CHG4_AMT: ""}</Text>;
   TO4_AMOUNT= <Text style={{fontSize:"10"}}>{(OTHER_CHG4_AMT/(+currency_buy)).toFixed(2)}</Text>;
   OtherTTL+=OTHER_CHG4_AMT/(+currency_buy);
   };
   if (OTHER_CHG5_AMT!=0) { TO5=<Text style={{fontWeight:"bold",fontSize:"10",marginLeft:"18"}}>{OTHER_CHG5}</Text>;
   TO5_DESCRIPTION= <Text style={{fontSize:"10"}}> ------------------------- </Text>;
   TO5_DESCRIPTION2= <Text style={{fontSize:"10"}}>{`${CURRENCY}`!="MAD" ? OTHER_CHG5_AMT: ""}</Text>;
   TO5_AMOUNT= <Text style={{fontSize:"10"}}>{(OTHER_CHG5_AMT/(+currency_buy)).toFixed(2)}</Text>;
   OtherTTL+=OTHER_CHG5_AMT/(+currency_buy);
   };
   if (MEDICAL_AMT!=0) { TMED=<Text style={{fontWeight:"bold",fontSize:"10",marginLeft:"18"}}>Medical Care</Text>;
   TMED_DESCRIPTION= <Text style={{fontSize:"10"}}> ------------------------- </Text>;
   TMED_DESCRIPTION2= <Text style={{fontSize:"10"}}>{`${CURRENCY}`!="MAD" ? MEDICAL_AMT: ""}</Text>;
   TMED_AMOUNT= <Text style={{fontSize:"10"}}>{(MEDICAL_AMT/(+currency_buy)).toFixed(2)}</Text>;
   OtherTTL+=MEDICAL_AMT/(+currency_buy);
   };
   ////////////////////////////END  OTHER CHARGES ////////////////
   // if (true) { T7=<Text style={{fontWeight:"bold",fontSize:"10",marginLeft:"18"}}>Miscellaneous Charge</Text>;
   // T7_DESCRIPTION= <Text style={{fontSize:"10"}}> ------------------------- </Text>;
   // T7_DESCRIPTION2= <Text style={{fontSize:"10"}}> 120.00</Text>;
   // T7_AMOUNT= <Text style={{fontSize:"10"}}>12.00</Text>;
   // OtherTTL+=0;
   // };
   
   OtherTTL = Math.floor( OtherTTL * 100) / 100;
   props.OtherTTL(OtherTTL);
   console.log('OtherTTL',OtherTTL+10000000000000)
   
  return (
       <div>
           
     <View style={{ flexDirection: "row" }}>
     
     <View style={{ flex: 2 }}>
     {T} 
     {T2}
     {T3}  
     {T4} 
     {T5}
     {T6} 
     {T7}  
     {TO1}
     {TO2}
     {TO3}
     {TO4}
     {TO5}
     {TMED}      
     </View>

     <View style={{ flex: 1}}>
     {T_DESCRIPTION}
     {T2_DESCRIPTION}
     {T3_DESCRIPTION}
     {T4_DESCRIPTION}
     {T5_DESCRIPTION}
     {T6_DESCRIPTION}
     {T7_DESCRIPTION}
     {TO1_DESCRIPTION}  
     {TO2_DESCRIPTION} 
     {TO3_DESCRIPTION}
     {TO4_DESCRIPTION}  
     {TO5_DESCRIPTION} 
     {TMED_DESCRIPTION}        
     </View>
     <View style={{ flex: 1}}>
        {T_DESCRIPTION2}
        {T2_DESCRIPTION2}
        {T3_DESCRIPTION2}
        {T4_DESCRIPTION2}
        {T5_DESCRIPTION2}
        {T6_DESCRIPTION2}
        {T7_DESCRIPTION2}
        {TO1_DESCRIPTION2}
        {TO2_DESCRIPTION2}
        {TO3_DESCRIPTION2}
        {TO4_DESCRIPTION2}
        {TO5_DESCRIPTION2}
        {TMED_DESCRIPTION2}   
       </View>

     <View style={{ flex: 1}}>
     {T_AMOUNT}
     {T2_AMOUNT}
     {T3_AMOUNT}
     {T4_AMOUNT}
     {T5_AMOUNT}
     {T6_AMOUNT}
     {T7_AMOUNT}
     {TO1_AMOUNT} 
     {TO2_AMOUNT}
     {TO3_AMOUNT}
     {TO4_AMOUNT} 
     {TO5_AMOUNT}
     {TMED_AMOUNT} 
    </View>

</View>
       </div>
   )
}
