import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';


export default function Surcharges(props) {

    const [DELAY_TIME, setDELAY_TIME] = React.useState(() => props.DELAY_TIME );
    const [DELAY_TIME_ARV, setDELAY_TIME_ARV] = React.useState(() => props.DELAY_TIME_ARV );
    // const [CUSTOMER, setCUSTOMER] = React.useState(() => props.CUSTOMER );
    // const [Station, setStation] = React.useState(() => props.Station );
    // const [BasicFee, setBasicFee] = React.useState(() => props.BasicFee );

    const [ARV_DTE_W, setARV_DTE_W] = React.useState(() => props.ARV_DTE_W );
    const [DEP_DTE_W, setDEP_DTE_W] = React.useState(() => props.DEP_DTE_W );
    const [MTOW, setMTOW] = React.useState(() => props.B );
    const [AA, setAA] = React.useState(() => props.AA );
    const [AD, setAD] = React.useState(() => props.AD );
  
    const M=props.B ;
    const BasicFee=props.BasicFee_Def;
    const DIFF_TIME=props.DIFF_TIME;

  let Delay="";
  let D_WEEK;
  let ARV_MONTH;
  let DEP_MONTH;

  const Holidays=["Jan 11 2022","Nov 06 2021"]
  const Natures=["National","Religious"]
  
  if(Holidays.indexOf("ARV_DTE_WH") !== -1){
    alert("Value exists!")
} 
  // let D_ARV=(ARV_DTE_W.toString())[0];
  // let A_ARV=(ARV_DTE_W.toString())[1];
  // let Y_ARV=(ARV_DTE_W.toString())[2];

  let M_ARV=(ARV_DTE_W.toString())[4];
  let O_ARV=(ARV_DTE_W.toString())[5];
  let N_ARV=(ARV_DTE_W.toString())[6];

  let JJ_ARV=(ARV_DTE_W.toString())[8];
  let OO_ARV=(ARV_DTE_W.toString())[9];

  let YY_ARV=(ARV_DTE_W.toString())[11];
  let EE_ARV=(ARV_DTE_W.toString())[12];
  let AA_ARV=(ARV_DTE_W.toString())[13];
  let RR_ARV=(ARV_DTE_W.toString())[14];
  
  // let D_DEP=(DEP_DTE_W.toString())[0];
  // let A_DEP=(DEP_DTE_W.toString())[1];
  // let Y_DEP=(DEP_DTE_W.toString())[2];

  let M_DEP=(DEP_DTE_W.toString())[4];
  let O_DEP=(DEP_DTE_W.toString())[5];
  let N_DEP=(DEP_DTE_W.toString())[6];

  let JJ_DEP=(DEP_DTE_W.toString())[8];
  let OO_DEP=(DEP_DTE_W.toString())[9];

  let YY_DEP=(DEP_DTE_W.toString())[11];
  let EE_DEP=(DEP_DTE_W.toString())[12];
  let AA_DEP=(DEP_DTE_W.toString())[13];
  let RR_DEP=(DEP_DTE_W.toString())[14];

  let ARV_DTE_WH=M_ARV+O_ARV+N_ARV+" "+JJ_ARV+OO_ARV+" "+YY_ARV+EE_ARV+AA_ARV+RR_ARV;
  let DEP_DTE_WH=M_DEP+O_DEP+N_DEP+" "+JJ_DEP+OO_DEP+" "+YY_DEP+EE_DEP+AA_DEP+RR_DEP;
 
/////////////////////ASYNC

// const [Holiday,setHoliday]=useState([]);

// useEffect(()=>{
// const sendGetRequest = async () => {
//   try {
//       const response = await axios.get('https://tce-morocco.com/flights/api/holidays');
//       setHoliday(response.data);
      
     
//   } catch (err) {
//       // Handle Error Here
//       console.error(err);
//   }
// };

// sendGetRequest();

// },[])
////////////


  /////////////// Holiday ////////////

// const [Holiday,setHoliday]=useState([]);
// useEffect(()=>{
 
//   axios.get('https://tce-morocco.com/flights/api/holidays').then(
//     (response)=>{
//       setHoliday(response.data);
//       console.log("response.data-holidays",response.data);
      
//     })

// },[])

// console.log('Holiday',Holiday[0])

  /////////////
  switch (ARV_DTE_W.getMonth()) {
    case 0:
      ARV_MONTH = "Jan";
      break;
    case 1:
      ARV_MONTH = "Feb";
      break;
    case 2:
      ARV_MONTH = "Mar";
      break;
    case 3:
      ARV_MONTH = "Apr";
      break;
    case 4:
      ARV_MONTH = "May";
      break;
    case 5:
      ARV_MONTH = "Jun";
      break;
    case 6:
    ARV_MONTH = "Jul";
    break;
    case 7:
    ARV_MONTH = "Aug";
    break;
    case 8:
    ARV_MONTH = "Sep";
    break;
    case 9:
    ARV_MONTH = "Oct";
    break;
    case 10:
    ARV_MONTH = "Nov";
    break;
    case 11:
    ARV_MONTH = "Dec";
    break;
  
  }

  switch (DEP_DTE_W.getMonth()) {
    case 0:
      DEP_MONTH = "Jan";
      break;
    case 1:
      DEP_MONTH = "Feb";
      break;
    case 2:
      DEP_MONTH = "Mar";
      break;
    case 3:
      DEP_MONTH = "Apr";
      break;
    case 4:
      DEP_MONTH = "May";
      break;
    case 5:
      DEP_MONTH = "Jun";
      break;
    case 6:
    DEP_MONTH = "Jul";
    break;
    case 7:
    DEP_MONTH = "Aug";
    break;
    case 8:
    DEP_MONTH = "Sep";
    break;
    case 9:
    DEP_MONTH = "Oct";
    break;
    case 10:
    DEP_MONTH = "Nov";
    break;
    case 11:
    DEP_MONTH = "Dec";
    break;
  
  }

  ////////////
 

  let isAweek;
  (ARV_DTE_W.getDay()==0 || ARV_DTE_W.getDay()==6 || DEP_DTE_W.getDay()==0 || DEP_DTE_W.getDay()==6) ? isAweek=true : isAweek=false;
////////////////////////////////

  if ( ARV_DTE_W.getDay()==0 & DEP_DTE_W.getDay()==0 & DEP_DTE_W.getDate()== ARV_DTE_W.getDate()){

    D_WEEK="Sun "+ARV_DTE_W.getDate()+"-"+ARV_MONTH
  }
  else if(ARV_DTE_W.getDay()==0 & DEP_DTE_W.getDay()==0 & DEP_DTE_W.getDate() != ARV_DTE_W.getDate() ) {
    D_WEEK="Sun "+ARV_DTE_W.getDate()+"-"+ARV_MONTH+" // "+"Sun "+DEP_DTE_W.getDate()+"-"+DEP_MONTH
  } 
  
  else if (ARV_DTE_W.getDay()==0 & DEP_DTE_W.getDay()==6 ) {
    D_WEEK="Sun " + ARV_DTE_W.getDate()+" "+ARV_MONTH+"//"+"Sat "+DEP_DTE_W.getDate()+" "+DEP_MONTH
  }
  else  if ( ARV_DTE_W.getDay()==6 & DEP_DTE_W.getDay()==6 & DEP_DTE_W.getDate()== ARV_DTE_W.getDate()){

    D_WEEK="Sat "+ARV_DTE_W.getDate()+" "+ARV_MONTH
  }
  else  if ( ARV_DTE_W.getDay()==6 & DEP_DTE_W.getDay()==0 & DEP_DTE_W.getDate()!= ARV_DTE_W.getDate()){

    D_WEEK="Sat "+ARV_DTE_W.getDate()+" "+ARV_MONTH+" // "+"Sun "+DEP_DTE_W.getDate()+"-"+DEP_MONTH
  }
  else if (ARV_DTE_W.getDay()==0 & DEP_DTE_W.getDay()!=0 & DEP_DTE_W.getDay()!=6){
    D_WEEK="Sun "+ARV_DTE_W.getDate()+" "+ARV_MONTH;
  }
  else if (ARV_DTE_W.getDay()==6 & DEP_DTE_W.getDay()!=0 & DEP_DTE_W.getDay()!=6){
    D_WEEK="Sat "+ARV_DTE_W.getDate()+" "+ARV_MONTH;

  }
  else if (DEP_DTE_W.getDay()==0 & ARV_DTE_W.getDay()!=0 & ARV_DTE_W.getDay()!=6){
    D_WEEK="Sun "+DEP_DTE_W.getDate()+" "+DEP_MONTH;
  }
  else if (DEP_DTE_W.getDay()==6 & ARV_DTE_W.getDay()!=0 & ARV_DTE_W.getDay()!=6){
    D_WEEK="Sat "+DEP_DTE_W.getDate()+" "+DEP_MONTH;
  }
 
  console.log('DELAY_TIME_ARV',DELAY_TIME_ARV)
  console.log('DELAY_TIME',DELAY_TIME)
  
  if (DELAY_TIME>=2){
    Delay=`Delay time : ${Math.trunc(DELAY_TIME)}H ${Math.trunc((DELAY_TIME-Math.trunc(DELAY_TIME))*60)} mn` 
  }
   
 if (DELAY_TIME_ARV>=2 & DELAY_TIME<2){
    Delay=`Delay time : ${Math.trunc(DELAY_TIME_ARV)}H ${Math.trunc((DELAY_TIME_ARV-Math.trunc(DELAY_TIME_ARV))*60)} mn` 
  }
   let T;
   let T_DESCRIPTION;
   let T_AMOUNT;

   let T2;
   let T2_DESCRIPTION;
   let T2_AMOUNT;

   let T3;
   let T3_DESCRIPTION;
   let T3_AMOUNT;

   let T4;
   let T4_DESCRIPTION;
   let T4_AMOUNT;

   let T5;
   let T5_DESCRIPTION;
   let T5_AMOUNT;

   let T6;
   let T6_DESCRIPTION;
   let T6_AMOUNT;

   let Surcharge_ttl=0;
   let compteur=0

   if (DELAY_TIME_ARV>=2 && DELAY_TIME<2) { T=<Text style={{fontSize:"10", marginLeft:"30"}}>- Delay (ATA-STA) exceeding 2 hours</Text>;
   T_DESCRIPTION= <Text style={{fontSize:"10"}}>{Delay }</Text>;
   T_AMOUNT= <Text style={{fontSize:"10"}}>{(0.25*BasicFee).toFixed(2)}</Text>;
   Surcharge_ttl +=(0.25*BasicFee);
   compteur+=1;
   };
     
    if (DELAY_TIME>2 ) { T=<Text style={{fontSize:"10", marginLeft:"30"}}>- Delay (ATD-STD) exceeding 2 hours</Text>;
    T_DESCRIPTION= <Text style={{fontSize:"10"}}>{Delay }</Text>;
    T_AMOUNT= <Text style={{fontSize:"10"}}>{(0.25*BasicFee).toFixed(2)}</Text>;
    Surcharge_ttl +=(0.25*BasicFee);
    compteur+=1;
    };

    if (isAweek) { T2=<Text style={{fontSize:"10", marginLeft:"30"}}>- Week-end</Text>;
    T2_DESCRIPTION= <Text style={{fontSize:"10"}}>{D_WEEK}</Text>;
    T2_AMOUNT= <Text style={{fontSize:"10"}}>{(0.25*BasicFee).toFixed(2)}</Text>;
    Surcharge_ttl +=(0.25*BasicFee);
    compteur+=1;
    };

    if ( (AA>"06:00:00" &  AA<"09:00:00" & AA<"16:00:00" ) ||  (AD>"06:00:00" &  AD<"09:00:00" & AD<"16:00:00" ) ) { T4=<Text style={{fontSize:"10", marginLeft:"30"}}>- Out of Opening hours</Text>;
    T4_DESCRIPTION= <Text style={{fontSize:"10"}}>"06h00 to 09h00"</Text>;
    T4_AMOUNT= <Text style={{fontSize:"10"}}>{(0.25*BasicFee).toFixed(2)}</Text>;
    Surcharge_ttl +=(0.25*BasicFee);
    compteur+=1;
    };

    if ( (AA>"09:00:00" &  AA>"16:00:00" & AA<"21:00:00" ) ||  (AD>"09:00:00" &  AD>"16:00:00" & AD<"21:00:00" )){ T4=<Text style={{fontSize:"10", marginLeft:"30"}}>- Out of Opening hours</Text>;
    T4_DESCRIPTION= <Text style={{fontSize:"10"}}>"16h00 to 21h00"</Text>;
    T4_AMOUNT= <Text style={{fontSize:"10"}}>{(0.25*BasicFee).toFixed(2)}</Text>;
    Surcharge_ttl +=(0.25*BasicFee);
    compteur+=1;
    };
    if ( ((AA>"06:00:00" &  AA<"09:00:00" & AA<"16:00:00" ) ||  (AD>"06:00:00" &  AD<"09:00:00" & AD<"16:00:00" )) & ( (AA>"09:00:00" &  AA>"16:00:00" & AA<"21:00:00" ) ||  (AD>"09:00:00" &  AD>"16:00:00" & AD<"21:00:00" )) ) { T4=<Text style={{fontSize:"10", marginLeft:"30"}}>- Out of Opening hours</Text>;
    T4_DESCRIPTION= <Text style={{fontSize:"10"}}>"06h-09h & 16h-21h"</Text>;
    T4_AMOUNT= <Text style={{fontSize:"10"}}>{(0.25*BasicFee).toFixed(2)}</Text>;
    Surcharge_ttl +=(0.25*BasicFee);
    compteur+=1;
    };
    if ( (AA>"21:00:00" )|| (AA<"06:00:00" &  AA>"00:00:00" )  ||  (AD>"21:00:00" )|| (AD<"06:00:00" &  AD>"00:00:00" )  ) { T4=<Text style={{fontSize:"10", marginLeft:"30"}}>- Night OPS</Text>;
    T4_DESCRIPTION= <Text style={{fontSize:"10"}}>"21h-06h"</Text>;
    T4_AMOUNT= <Text style={{fontSize:"10"}}>{(0.25*BasicFee).toFixed(2)}</Text>;
    Surcharge_ttl +=(0.25*BasicFee);
    compteur+=1;
    };

    if ((Holidays.indexOf(ARV_DTE_WH) !== -1) & (Holidays.indexOf(DEP_DTE_WH) !== -1) & ( DEP_DTE_WH!==ARV_DTE_WH)) { T5=<Text style={{fontSize:"10", marginLeft:"30"}}>- Holiday (National/Religious)</Text>;
    T5_DESCRIPTION= <Text style={{fontSize:"10"}}>{ARV_DTE_WH} & {DEP_DTE_WH} ({Holidays[Natures.indexOf(ARV_DTE_WH)]}) </Text>;
    T5_AMOUNT= <Text style={{fontSize:"10"}}>{(0.25*BasicFee).toFixed(2)}</Text>;
    Surcharge_ttl +=(0.25*BasicFee);
    compteur+=1;
    }
    else if ((Holidays.indexOf(ARV_DTE_WH) !== -1) & (Holidays.indexOf(DEP_DTE_WH) == -1) ) { T5=<Text style={{fontSize:"10", marginLeft:"30"}}>- Holiday (National/Religious)</Text>;
    T5_DESCRIPTION= <Text style={{fontSize:"10"}}>{ARV_DTE_WH} ({Holidays[Natures.indexOf(ARV_DTE_WH)]}) </Text>;
    T5_AMOUNT= <Text style={{fontSize:"10"}}>{(0.25*BasicFee).toFixed(2)}</Text>;
    Surcharge_ttl +=(0.25*BasicFee);
    compteur+=1;
    }
    else if ((Holidays.indexOf(DEP_DTE_WH) !== -1) & (Holidays.indexOf(ARV_DTE_WH) == -1) ) { T5=<Text style={{fontSize:"10", marginLeft:"30"}}>- Holiday (National/Religious)</Text>;
    T5_DESCRIPTION= <Text style={{fontSize:"10"}}>{DEP_DTE_WH} ({Holidays[Natures.indexOf(ARV_DTE_WH)]}) </Text>;
    T5_AMOUNT= <Text style={{fontSize:"10"}}>{(0.25*BasicFee).toFixed(2)}</Text>;
    Surcharge_ttl +=(0.25*BasicFee);
    compteur+=1;
    }


    // else if ((Holidays.indexOf(DEP_DTE_WH) !== -1) & ( DEP_DTE_WH!==ARV_DTE_WH))  { T5=<Text style={{fontSize:"10", marginLeft:"30"}}>- Holiday (National/Religious)</Text>;
    // T5_DESCRIPTION= <Text style={{fontSize:"10"}}>{DEP_DTE_WH} ({Natures[Holidays.indexOf(DEP_DTE_WH)]}) </Text>;
    // T5_AMOUNT= <Text style={{fontSize:"10"}}>{(0.25*BasicFee).toFixed(2)}</Text>;
    // Surcharge_ttl +=(0.25*BasicFee);
    // }

    else if ( (Holidays.indexOf(DEP_DTE_WH) !== -1)  & ( DEP_DTE_WH===ARV_DTE_WH)) { T5=<Text style={{fontSize:"10", marginLeft:"30"}}>- Holiday (National/Religious)</Text>;
    T5_DESCRIPTION= <Text style={{fontSize:"10"}}>{DEP_DTE_WH} ({Natures[Holidays.indexOf(DEP_DTE_WH)]}) </Text>;
    T5_AMOUNT= <Text style={{fontSize:"10"}}>{(0.25*BasicFee).toFixed(2)}</Text>;
    Surcharge_ttl +=(0.25*BasicFee);
    compteur+=1;
    };
      
    console.log("({Natures[Holidays.indexOf(DEP_DTE_WH)]})",Natures[Holidays.indexOf(DEP_DTE_WH)])
    console.log("DEP_DTE_WH.getDay()",DEP_DTE_W.getDay())
    Surcharge_ttl = Math.floor(Surcharge_ttl * 100) / 100;
   

    // Surcharge_ttl=Surcharge_ttl.toFixed(2)
    props.SurchargeTTL(Surcharge_ttl);
    console.log("Surcharge_ttl ded Surcharge.js.toFixed(2)",Surcharge_ttl+1000)
    
      let P;
      if (compteur!=0 ){
        P=<Text style={{fontWeight:"bold",fontSize:"12",marginLeft:"18",marginTop:"6"}}>Surcharges</Text>
      } 
      
   
 
   return (
        <div>

      {P}
            
      <View style={{ flexDirection: "row" }}>
      
        <View style={{ flex: 2 }}>
        {T} 
        {T2}
        {T3}
        {T4}
        {T5} 
        </View>
      <View style={{ flex: 2}}>
      {T_DESCRIPTION}
      {T2_DESCRIPTION}
      {T3_DESCRIPTION}
      {T4_DESCRIPTION}
      {T5_DESCRIPTION}
   
      </View>

      <View style={{ flex: 1}}>
      {T_AMOUNT}
      {T2_AMOUNT}
      {T3_AMOUNT}
      {T4_AMOUNT}
      {T5_AMOUNT}
     
  
      </View>

</View>
        </div>
    )

  }