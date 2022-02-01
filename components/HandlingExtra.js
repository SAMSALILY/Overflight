import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

export default function Handling(props) {

   
   let Services=props.Handling ;
   let Concession_handler=props.Concession_handler ;
   let GPU=props.GPU;
   let GPU_TIME=props.GPU_TIME;
   let ASU=props.ASU;
   let PUSH_BACK=props.PUSH_BACK;

   let PushBack=0;
   if (PUSH_BACK=="Y" ){
    PushBack=80;
   }
   let Asu=0;
   if (ASU=="Y" ){
    Asu=80;
   }
   let ServicesTTL=0; 
  //  let NAT_FLT=props. NAT_FLT;
   let WO_HNDL_INV=props.WO_HNDL_INV;
 
   let P;
    
   if (Services!=0 || Concession_handler!=0){P=<Text style={{fontWeight:"bold",fontSize:"11",marginLeft:"18"}}>GSE & manpower: GHS</Text>
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

  if (Services!=0) { T=<Text style={{fontSize:"10", marginLeft:"30"}}>- Full Services</Text>;
   T_DESCRIPTION= <Text style={{fontSize:"10"}}> WO {WO_HNDL_INV}</Text>;
   T_DESCRIPTION2= <Text style={{fontSize:"10"}}> </Text>;
   T_AMOUNT= <Text style={{fontSize:"10"}}>{Services.toFixed(2)}</Text>;
     ServicesTTL+=Services;
  }

   if (Concession_handler!=0) { T2=<Text style={{fontSize:"10", marginLeft:"30"}}>- Concession fee</Text>;
   T2_DESCRIPTION= <Text style={{fontSize:"10"}}> ------------------------- </Text>;
   T2_DESCRIPTION2= <Text style={{fontSize:"10"}}>  </Text>;
   T2_AMOUNT= <Text style={{fontSize:"10"}}>{Concession_handler.toFixed(2)}</Text>;
     ServicesTTL+=Concession_handler;
   };

   if (PushBack!=0) { T2=<Text style={{fontSize:"10", marginLeft:"30"}}>- Extra: Push-Back</Text>;
   T2_DESCRIPTION= <Text style={{fontSize:"10"}}> ------------------------- </Text>;
   T2_DESCRIPTION2= <Text style={{fontSize:"10"}}>  </Text>;
   T2_AMOUNT= <Text style={{fontSize:"10"}}>{PushBack.toFixed(2)}</Text>;
     ServicesTTL+=PushBack;
   };
   if (Asu!=0) { T2=<Text style={{fontSize:"10", marginLeft:"30"}}>- Extra: ASU</Text>;
   T2_DESCRIPTION= <Text style={{fontSize:"10"}}> ------------------------- </Text>;
   T2_DESCRIPTION2= <Text style={{fontSize:"10"}}>  </Text>;
   T2_AMOUNT= <Text style={{fontSize:"10"}}>{Asu.toFixed(2)}</Text>;
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
     
      
     </View>

     <View style={{ flex: 1}}>
     {T_DESCRIPTION}
     {T2_DESCRIPTION}
       
       
     </View>
     <View style={{ flex: 1}}>
        {T_DESCRIPTION2}
        {T2_DESCRIPTION2}
       
       
     </View>

     <View style={{ flex: 1}}>
     {T_AMOUNT}
     {T2_AMOUNT}
      
       
     </View>

</View>
       </div>
   )
}
