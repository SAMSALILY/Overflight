import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

export default function AddServices(props) {

    let CREW_ASSIST = props.CREW_ASSIST ;
    let TRAVEL= props.TRAVEL ;
    console.log("||||||||||| TRAVEL ADDSERVC",TRAVEL)
    const [PRINT, setPRINT] = React.useState(() => props.PRINT );
    const [PHONE, setPHONE] = React.useState(() => props.PHONE );
    
    let PHONE_PRINT= props.PHONE_PRINT;
    //////// Currencies & Rates ////PRINT_PHONE_TOT
   let currency_sell;
   let currency_buy;
   const CURRENCY=props.CURRENCY_Def;
  
  //  {{ PHONE>15 ? PHONE_PRINT=10 : PHONE_PRINT=5}}
  

   const RATES=props.Rates;
   const EXCHANGE_EUR_SELL=RATES.EXCHANGE_EUR_SELL;
   const EXCHANGE_EUR_BUY=RATES.EXCHANGE_EUR_BUY;
   const EXCHANGE_USD_BUY=RATES.EXCHANGE_USD_BUY;
   const EXCHANGE_USD_SELL=RATES.EXCHANGE_USD_SELL;
   switch (CURRENCY) {
     case "EUR":
       currency_sell = EXCHANGE_EUR_SELL;
       currency_buy = EXCHANGE_EUR_BUY;
       PHONE>15 ? PHONE_PRINT=10 : PHONE_PRINT=5
       break;
     case "MAD":
       currency_sell = 1;
       currency_buy = 1;
       break;  
     case "USD":
       currency_sell = EXCHANGE_USD_SELL;
       currency_buy = EXCHANGE_USD_BUY;
       PHONE>15 ? PHONE_PRINT=12 : PHONE_PRINT=6
   }
   ///// end Currencies and rates
    
    let T;
    let T_DESCRIPTION;
    let T_AMOUNT; 
    let Additional=0;  
 
    if (CREW_ASSIST!=0) { T=<Text style={{fontSize:"10", marginLeft:"30"}}>- Crew/ Engineers Assistance/ Crew Swap</Text>;
    T_DESCRIPTION= <Text style={{fontSize:"10"}}> -------------------------</Text>;
    T_AMOUNT= <Text style={{fontSize:"10"}}>{(CREW_ASSIST).toFixed(2)} </Text>;
    Additional+=CREW_ASSIST;
    };
    let T2
   let T2_DESCRIPTION
   let T2_AMOUNT
   if (TRAVEL!=0) { T2=<Text style={{fontSize:"10", marginLeft:"30"}}>- Travel Expenses/ Extra time STARS Rep.</Text> ;
    T2_DESCRIPTION= <Text style={{fontSize:"10"}}> -------------------------</Text>;
    // T2_AMOUNT= <Text style={{fontSize:"10"}}>{TRAVEL.toFixed(2)} </Text>;
    T2_AMOUNT= <Text style={{fontSize:"10"}}>{(TRAVEL).toFixed(2)} </Text>;
    Additional+=TRAVEL;
    };

    let T3;
    let T3_DESCRIPTION;
    let T3_AMOUNT;
    

    if ((PHONE_PRINT)!=0) { T3=<Text style={{fontSize:"10", marginLeft:"30"}}>- Phone / @ / Printing</Text> ;
     T3_DESCRIPTION= <Text style={{fontSize:"10"}}>------------------------- </Text>;
     T3_AMOUNT= <Text style={{fontSize:"10"}}>{(+PHONE_PRINT).toFixed(2)}</Text>;
     Additional+=(+PHONE_PRINT);
     };
      
      Additional = Math.floor(Additional * 100) / 100;
      props.AdditionalTTL(Additional);

      let P;
      
      if (CREW_ASSIST!=0 || TRAVEL!=0 || (PHONE_PRINT)!=0){P= <Text style={{fontWeight:"bold",fontSize:"11",marginLeft:"18"}}>Flight Ops Avcs/ Additional Services/ Miscellaneous charges  </Text>
      } 

   return (
        <div>
            {/* <Text > </Text> */}
         {P}
            
      <View style={{ flexDirection: "row" }}>
      
        <View style={{ flex: 2 }}>
        {T}
        {T2}
        {T3}
        </View>
      <View style={{ flex: 2}}>
         {T_DESCRIPTION}
         {T2_DESCRIPTION}
         {T3_DESCRIPTION}
        
      </View>

      <View style={{ flex: 1}}>
      {T_AMOUNT}
      {T2_AMOUNT}
      {T3_AMOUNT}
      </View>

</View>
        </div>
    )
}
