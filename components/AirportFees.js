import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

export default function AirportFees(props) {

    const [MTOW, setMTOW] = React.useState(() => props.B );
    const [TASPT_AMT, setTASPT_AMT] = React.useState(() => props.TASPT_AMT);
    const [APT_FEES_AMT, setAPT_FEES_AMT] = React.useState(() => props.APT_FEES_AMT );
    const [CUTE_AMT, setCUTE_AMT] = React.useState(() => props.CUTE_AMT);

    let AirportTTL=0;
    let currency_sell;
    let currency_buy;
    const CURRENCY=props.CURRENCY;
    console.log('CURRENCY',CURRENCY)
    const RATES=props.Rates;
    const EXCHANGE_EUR_SELL=RATES.EXCHANGE_EUR_SELL;
    const EXCHANGE_EUR_BUY=RATES.EXCHANGE_EUR_BUY;
    const EXCHANGE_USD_BUY=RATES.EXCHANGE_USD_BUY;
    const EXCHANGE_USD_SELL=RATES.EXCHANGE_USD_SELL;

    console.log('CUTE_AMT',CUTE_AMT);

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
    console.log('currency_buy',currency_buy)
    //    if (DIFF_TIME>=4){
//         TurnAround=`T/A time is ${(DIFF_TIME.toFixed(2))} hours` ;
    let P;
    
    if (APT_FEES_AMT!=0 || TASPT_AMT!=0){P=<Text style={{fontWeight:"bold",fontSize:"11",marginLeft:"18"}}>Airport Fees</Text>
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

  //  if (APT_FEES_AMT!=0) { T=<Text style={{fontSize:"10", marginLeft:"30"}}>- Landing/Parking/Approach/PAX/Cargo fee</Text>;
  //   T_DESCRIPTION= <Text style={{fontSize:"10"}}> -------------------------</Text>;
  //   T_DESCRIPTION2= <Text style={{fontSize:"10"}}> {APT_FEES_AMT}</Text>;
  //   // T_AMOUNT= <Text style={{fontSize:"11"}}>{(+APT_FEES_AMT/10).toFixed(2)}</Text>;
  //   T_AMOUNT= <Text style={{fontSize:"10"}}>{Math.floor((+APT_FEES_AMT/(+currency_buy))* 100) / 100}</Text>;
  //   AirportTTL+=APT_FEES_AMT/(+currency_buy);
  //  }

  //   if (TASPT_AMT!=0) { T2=<Text style={{fontSize:"10", marginLeft:"30"}}>- TASPT (Solidarity & Tourism Promotion)</Text>;
  //   T2_DESCRIPTION= <Text style={{fontSize:"10"}}> ------------------------- </Text>;
  //   T2_DESCRIPTION2= <Text style={{fontSize:"10"}}>{TASPT_AMT}</Text>;
  //   T2_AMOUNT= <Text style={{fontSize:"10"}}>{(TASPT_AMT/(+currency_buy)).toFixed(2)}</Text>;
  //   AirportTTL+=TASPT_AMT/(+currency_buy);
  //     };
  //   if (CUTE_AMT!=0) { T3=<Text style={{fontSize:"10", marginLeft:"30"}}>- CUTE</Text>;
  //   T3_DESCRIPTION= <Text style={{fontSize:"10"}}> -------------------------</Text>;
  //   T3_DESCRIPTION2= <Text style={{fontSize:"10"}}>{(+CUTE_AMT).toFixed(2)}</Text>;
  //   T3_AMOUNT= <Text style={{fontSize:"10"}}>{(CUTE_AMT/(+currency_buy)).toFixed(2)}</Text>;
  //   AirportTTL+=CUTE_AMT/(+currency_buy);
  //     };

  //////////////////////////////  CURENCY  MAD  //////////////////////////////////////////
let APT_FEES;
let CUTE;
let TASPT;

if(CURRENCY!="MAD"){
APT_FEES=APT_FEES_AMT;
CUTE=(+CUTE_AMT).toFixed(2);
TASPT=TASPT_AMT;
}else {
APT_FEES="";
CUTE="";
TASPT="";
}
////////////////////////////////////////////////


if (APT_FEES_AMT!=0) { T=<Text style={{fontSize:"10", marginLeft:"30"}}>- Landing/Parking/Approach/PAX/Cargo fee</Text>;
    T_DESCRIPTION= <Text style={{fontSize:"10"}}> -------------------------</Text>;
    T_DESCRIPTION2= <Text style={{fontSize:"10"}}> {APT_FEES}</Text>;
    // T_AMOUNT= <Text style={{fontSize:"11"}}>{(+APT_FEES_AMT/10).toFixed(2)}</Text>;
    T_AMOUNT= <Text style={{fontSize:"10"}}>{(Math.floor((+APT_FEES_AMT/(+currency_buy)))).toFixed(2)}</Text>;
    AirportTTL+=APT_FEES_AMT/(+currency_buy);
   }

    if (TASPT_AMT!=0) { T2=<Text style={{fontSize:"10", marginLeft:"30"}}>- TASPT (Solidarity & Tourism Promotion)</Text>;
    T2_DESCRIPTION= <Text style={{fontSize:"10"}}> ------------------------- </Text>;
    T2_DESCRIPTION2= <Text style={{fontSize:"10"}}>{TASPT}</Text>;
    T2_AMOUNT= <Text style={{fontSize:"10"}}>{(TASPT_AMT/(+currency_buy)).toFixed(2)}</Text>;
    AirportTTL+=TASPT_AMT/(+currency_buy);
      };
    if (CUTE_AMT!=0) { T3=<Text style={{fontSize:"10", marginLeft:"30"}}>- CUTE</Text>;
    T3_DESCRIPTION= <Text style={{fontSize:"10"}}> -------------------------</Text>;
    T3_DESCRIPTION2= <Text style={{fontSize:"10"}}>{CUTE}</Text>;
    T3_AMOUNT= <Text style={{fontSize:"10"}}>{(CUTE_AMT/(+currency_buy)).toFixed(2)}</Text>;
    AirportTTL+=CUTE_AMT/(+currency_buy);
      };

    AirportTTL = Math.floor(AirportTTL * 100) / 100;
    props.AirportTTL(AirportTTL);
    
   return (
        <div>

      {P}
            
      <View style={{ flexDirection: "row" }}>
      
      <View style={{ flex: 2 }}>
      {T} 
      {T2}  
      {T3} 
       
      </View>

      <View style={{ flex: 1}}>
      {T_DESCRIPTION}
      {T2_DESCRIPTION}
      {T3_DESCRIPTION}  
        
      </View>
      <View style={{ flex: 1}}>
         {T_DESCRIPTION2}
         {T2_DESCRIPTION2}
         {T3_DESCRIPTION2}
        
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
