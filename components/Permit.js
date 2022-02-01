import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

export default function Permit(props) {

    const [COORDINATION_PERMIT, setCOORDINATION_PERMIT] = React.useState(() => props.COORDINATION_PERMIT );
    const [PERMIT, setPERMIT] = React.useState(() => props.PERMIT );
    const [PERMIT_O, setPERMIT_O] = React.useState(() => props.PERMIT_O);

    let PermitTTL=0; 

   
   let T
   let T_DESCRIPTION
   let T_AMOUNT
   if (COORDINATION_PERMIT!=0) { T=<Text style={{fontSize:"10", marginLeft:"30"}}>- Coordination & Administration</Text>;
    T_DESCRIPTION= <Text style={{fontSize:"10"}}>-------------------------</Text>;
    T_AMOUNT= <Text style={{fontSize:"10"}}>{COORDINATION_PERMIT.toFixed(2)}</Text>;
    PermitTTL+=COORDINATION_PERMIT;
    };
    
    let T2
    let T2_DESCRIPTION
    let T2_AMOUNT
    if (PERMIT!=0) { T2=<Text style={{fontSize:"10", marginLeft:"30"}}>- CAA Permit</Text>;
     T2_DESCRIPTION= <Text style={{fontSize:"10"}}> -------------------------</Text>;
     T2_AMOUNT= <Text style={{fontSize:"10"}}>{PERMIT.toFixed(2)}</Text>;
     PermitTTL+=PERMIT;
     };

     let T3
    let T3_DESCRIPTION
    let T3_AMOUNT
    if (PERMIT_O!=0) { T3=<Text style={{fontSize:"10", marginLeft:"30"}}>- CAA Out of opening hours</Text>;
     T3_DESCRIPTION= <Text style={{fontSize:"10"}}>Week-end</Text>;
     T3_AMOUNT= <Text style={{fontSize:"10"}}>{PERMIT_O.toFixed(2)}</Text>;
     PermitTTL+=PERMIT_O;
     };

     ////////////

     PermitTTL = Math.floor(PermitTTL * 100) / 100;
     props.PermitTTL(PermitTTL);
      let P;
      
     if (COORDINATION_PERMIT!=0 || PERMIT!=0 || PERMIT_O!=0){P=<Text style={{fontWeight:"bold",fontSize:"11",marginLeft:"18",marginTop:"6"}}>Diplomatic/CAA Permits, PPR/Slots</Text>
     } 
   return (
        <div>

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
