
  import React from 'react';
  import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
  import  PDFViewer  from '@react-pdf/renderer';

  const styles = StyleSheet.create({
    body: {
      paddingTop: 35,
      paddingBottom: 65,
      paddingHorizontal: 35,
    },
    title: {
      fontSize: 24,
      textAlign: 'center',
      fontFamily: 'Oswald'
    },
    author: {
      fontSize: 12,
      textAlign: 'center',
      marginBottom: 40,
    },
    subtitle: {
      fontSize: 18,
      margin: 12,
      fontFamily: 'Oswald'
    },
    text: {
      margin: 12,
      fontSize: 14,
      textAlign: 'justify',
      fontFamily: 'Times-Roman'
    },
    image: {
      marginVertical: 15,
      marginHorizontal: 100,
    },
    header: {
      fontSize: 12,
      marginBottom: 20,
      textAlign: 'center',
      color: 'grey',
    },
    pageNumber: {
      position: 'absolute',
      fontSize: 12,
      bottom: 30,
      left: 0,
      right: 0,
      textAlign: 'center',
      color: 'grey',
    },
  });
  
  function Facture() {
  
 return (
     <Document>
     <Page size="A4" style={styles.page}>
    
      <Text style={styles.title}>GENERAL INVOICE</Text>
      <Text style={styles.author}>Invoice N° </Text>
      
      <View style={{ flexDirection: "row" }}>
      <View style={{ flex: 1 }}>
        <Text>En un </Text>
      </View>
      <View style={{ flex: 1}}>
        <Text>En un lugar</Text>
      </View>
     
    </View>
      
     
      <Text style={styles.text}>
        Hechas, pues, estas prevenciones, no quiso aguardar más tiempo a poner
        en efeto su pensamiento, apretándole a ello la falta que él pensaba que
        hacía en el mundo su tardanza, según eran los agravios que pensaba
        deshacer, tuertos que enderezar, sinrazones que emendar y abusos que
        mejorar y deudas que satisfacer. Y así, sin dar parte a persona alguna
        de su intención y sin que nadie le viese, una mañana, antes del día, que
        era uno de los calurosos del mes de Julio, se armó de todas sus armas,
        subió sobre Rocinante, puesta su mal compuesta celada, embrazó su
        adarga, tomó su lanza y por la puerta falsa de un corral salió al campo
        con grandísimo contento y alborozo de ver con cuánta facilidad había
        dado principio a su buen deseo. Mas apenas se vio en el campo cuando le
        asaltó un pensamiento terrible, y tal, que por poco le hiciera dejar la
        comenzada empresa; y fue que le vino a la memoria que no era armado
        caballero, y que, conforme a ley de caballería, ni podía ni debía tomar
        armas con ningún caballero; y puesto que lo fuera, había de llevar armas
        blancas, como novel caballero, sin empresa en el escudo, hasta que por
        su esfuerzo la ganase. Estos pensamientos le hicieron titubear en su
        propósito; mas pudiendo más su locura que otra razón alguna, propuso de
        hacerse armar caballero del primero que topase, a imitación de otros
        muchos que así lo hicieron, según él había leído en los libros que tal
        le tenían. En lo de las armas blancas, pensaba limpiarlas de manera, en
        teniendo lugar, que lo fuesen más que un arminio; y con esto se quietó18
        y prosiguió su camino, sin llevar otro que aquel que su caballo quería,
        creyendo que en aquello consistía la fuerza de las aventuras
      </Text>
    
     
    
     
      <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => (
        `${pageNumber} / ${totalPages}`
      )} fixed />
    </Page>
    </Document>

 

    )
 
}

  
export default Facture