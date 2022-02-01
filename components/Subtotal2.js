import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import  { useState, useEffect,useRef } from "react";


export default function Subtotal2(props) {
   
  console.log('props dans sub2',props)
   let AirportTTL=props.AirportTTL;
   let HandlingTTL=props.HandlingTTL;
   let OtherTTL=props.OtherTTL;

   console.log("OtherTTL sur Subtotal2",OtherTTL)

   let Subtotal2=(AirportTTL+HandlingTTL+OtherTTL).toFixed(2);

    console.log(" Subtotal2********", Subtotal2)
    console.log("AirportTTL**********",AirportTTL+1000000)
    console.log("HandlingTTL********",HandlingTTL)
  
   let T6;
   let T6_DESCRIPTION;
   let T6_AMOUNT;

   let T55;
   let T55_DESCRIPTION;
   let T55_AMOUNT;

    
    T55=<Text style={{fontSize:"10", marginLeft:"30"}}> </Text>;
    T55_DESCRIPTION= <Text style={{fontSize:"10"}}> </Text>;
    T55_AMOUNT= <Text style={{fontSize:"11"}}> ________________   </Text>;

    T6=<Text style={{fontSize:"10", marginLeft:"30"}}> </Text>;
    T6_DESCRIPTION= <Text style={{fontSize:"10"}}> </Text>;
    T6_AMOUNT= <Text style={{fontSize:"10",backgroundColor:"lightgreen",marginRight:"12" }}> Subtotal(2)  {Subtotal2}   </Text>;
    
      
 
   return (
        <div>

     
            
      <View style={{ flexDirection: "row" }}>
      
        <View style={{ flex: 2 }}>
        
        {T55}
        {T6}
        
        </View>
      <View style={{ flex: 2}}>
      
      {T55_DESCRIPTION}
      {T6_DESCRIPTION}
        
      </View>

      <View style={{ flex: 1}}>
      
      {T55_AMOUNT}
      {T6_AMOUNT}
      
      </View>

</View>
        </div>
    )

  }