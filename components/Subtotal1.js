import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import  { useState, useEffect,useRef } from "react";


export default function Subtotal1(props) {

    // const [state,setState]=useState()
    // useEffect(()=>{
    //    setState(props.SurchargeTTL)
        
    //   },[]);
    
  
   let Surcharge_ttl=props.SurchargeTTL;
   let Additional_ttl=props.AdditionalTTL;
   let PermitTTL=props.PermitTTL;
   let BasicTTL=props.BasicTTL;

   let Sub1=props.Sub1;

   let Subtotal1=((+Additional_ttl)+(+Surcharge_ttl)+(+PermitTTL)+(BasicTTL)).toFixed(2);
    
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
    T6_AMOUNT= <Text style={{fontSize:"10",backgroundColor:"lightgreen",marginRight:"12",marginBottom:"4" }}> {Sub1!=0 ? "Subtotal(1)":"Subtotal"}  {Subtotal1}   </Text>;
    
      
 
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