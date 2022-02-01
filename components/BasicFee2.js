import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

export default function BasicFee(props) {

    // const M=props.B ;
    const [DIFF_TIME, setDIFF_TIME] = React.useState(() => props.DIFF_TIME );
    console.log("DIFF_TIME",DIFF_TIME); 

    let Concession=props.Concession;
    let BasicFee=props.BasicFee

      let TurnAround="";

   let BasicTTL=BasicFee+Concession;


   if (DIFF_TIME>=4){
        TurnAround=`T/A time is ${(DIFF_TIME.toFixed(2))} hours` ;
        
   }
   let T
   let T_DESCRIPTION
   let T_AMOUNT
   if (TurnAround!="") { T=<Text style={{fontSize:"11", marginLeft:"30"}}>- T/A Exceeding 4 hrs</Text>;
    T_DESCRIPTION= <Text style={{fontSize:"10"}}>{TurnAround }</Text>;
    T_AMOUNT= <Text style={{fontSize:"10"}}>{(0.25*BasicFee).toFixed(2)}</Text>;
    BasicTTL+=0.25*BasicFee;
    };
    
    BasicTTL = Math.floor(BasicTTL * 100) / 100;
    props.BasicTTL(BasicTTL);
   return (
        <div>

      <Text style={{fontWeight:"bold",fontSize:"11",marginLeft:"18"}}>Basic Fee for Turnaround</Text>
            
      <View style={{ flexDirection: "row" }}>
      
      <View style={{ flex: 2 }}>
        <Text style={{fontSize:"10", marginLeft:"30"}}>- Basic Fee</Text>
      
        <Text style={{fontSize:"10", marginLeft:"30"}}>- Airport Concession Fee </Text>
        {T} 
      </View>
      <View style={{ flex: 2}}>
        <Text style={{fontSize:"10"}}> -------------------------</Text>
        
        <Text style={{fontSize:"10"}}> -------------------------</Text>
        {T_DESCRIPTION}
      </View>
      <View style={{ flex: 1}}>
      <Text style={{fontSize:"10"}}>{BasicFee.toFixed(2)} </Text>
       
        <Text style={{fontSize:"10"}}>{Concession.toFixed(2)}</Text>
        {T_AMOUNT}
      </View>

</View>
        </div>
    )
}
