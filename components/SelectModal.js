import React from 'react'
import styled from 'styled-components'
import { useTable, useRowSelect } from 'react-table'
import List from "./List"
import TabMod from './TabMod'
import Editable from './Editable'
import EditTwo from './EditTwo'
// import makeData from './makeData'

import Modal from "react-modal";

///////////////////
import  { useState, useEffect } from "react";
import "../App.css";
import * as XLSX from "xlsx";
import axios from "axios";
// import { GlobalFilter } from './GlobalFilter';
// import Checkbox from './Checkbox';

/////////////////////
// function invoice (){
//   alert('heloo')
// }
// Modal.setAppElement("#root");

function Table({data}) {

  const [modalIsOpen, setModalIsOpen] = useState(false);

    
    ////////////////
const [items, setItems]=useState([])
const readExcel=(file)=>{
const promise=new Promise((reject,resolve)=>{
const filereader=new FileReader()

filereader.readAsArrayBuffer(file)
filereader.onload=(e)=>{
 const bufferArray=e.target.result;
// fs.copyFile(`.\\source\\${bufferArray.name}`,`.\\cible\\${bufferArray.name}`, (err)=>{ if (err) { console.log(err)}})

 console.log("bufferArray :",bufferArray)
 const wb=XLSX.read(bufferArray,{type:"buffer"});
 console.log("wb",wb)
 const wsname=wb.SheetNames[0];
 const ws=wb.Sheets[wsname];
 const data=XLSX.utils.sheet_to_json(ws);
 resolve(data);
};
filereader.onerror=(error)=>{
 reject(error);
}

});
promise.catch((d)=>{

// console.log(d)


axios.post('http://localhost:1501/api/insert', d[0])
.then(() => {
 setItems(d);
 console.log(d)
 setTimeout(function(){ alert("Successful Insert into Database"); }, 500);


});



}); ////End Promise

};

const [qcm,setQcm]=useState([])

useEffect(()=>{
  axios.get('http://localhost:1501/api/get').then(
    (response)=>{setQcm(response.data)}
  )
 
},[])

const columns = React.useMemo(
  () => [
    {
      Header:'ID',
      accessor:'ID'
    },
    {
      Header:'Flight Number',
      accessor:'flight_number'

    },     
    {           
      Header: 'Aircraft Registration',
      accessor: 'registration'
    },
    {
      Header: 'Station',
      accessor: 'station'
    },
    {
      Header:'Trip',
      accessor: 'trip'
    },
    {
      Header:'Date (departure)',
      accessor: 'date'
    }
        
      ],[])

 data=qcm   
// const data = React.useMemo(()=>qcm,[])


const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    selectedFlatRows,
    state: { selectedRowIds },
  } = useTable(
    {
      columns,
      data,
    },
    useRowSelect,
    hooks => {
      hooks.visibleColumns.push(columns => [
        // Let's make a column for selection
        {
          id: 'selection',
          // The header can use the table's getToggleAllRowsSelectedProps method
          // to render a checkbox
          Header: ({ getToggleAllRowsSelectedProps }) => (
            <div>
              <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
            </div>
          ),
          // The cell can use the individual row's getToggleRowSelectedProps method
          // to the render a checkbox
          Cell: ({ row }) => (
            <div>
              <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
            </div>
          ),
        },
        ...columns,
      ])
    }
  )

  



const IndeterminateCheckbox = React.forwardRef(
  ({ indeterminate, ...rest }, ref) => {
    const defaultRef = React.useRef()
    const resolvedRef = ref || defaultRef

    React.useEffect(() => {
      resolvedRef.current.indeterminate = indeterminate
    }, [resolvedRef, indeterminate])

    return (
      <>
        
        <input type="checkbox" ref={resolvedRef} {...rest} />
       
      </>
    )
  }
)

const [D,setD]=useState()
function update (){
 
  const A=[]
  for (var key in selectedRowIds) {
    A.push(key);
  }

 if (A.length == 1 ){
  
   const B=A[0]
   console.log(B)
   let C= selectedFlatRows[0].original
  // console.log(A)return 
  // console.log(selectedFlatRows[0].original.flight_number)
  console.log("Cccc",C)
  
  console.log("[C]",[C])
  
  setD([C])
  
  setModalIsOpen(true)

  
 }else {
  alert('Please select a single row ')
  
 }
}
console.log('D',D)

// function Table() {
  // Use the state and functions returned from useTable to build your UI
  
  // Render the UI for your table
  return (
    <>
  
  {/* <List data={data} /> */}
        
    <input className= "button" type="file" onChange={(e)=>{
        const file=e.target.files[0];
                 
        readExcel(file);             
         
    }}/>
    <input type="submit" className="button" value="Display " onClick={() => {update() }}/>
       
       <table className="table">
  <thead>
    <tr>
      <th scope="col">Flight number</th>
      <th scope="col">Registration</th>
      <th scope="col">Station</th>
      <th scope="col">Trip number</th>
      <th scope="col">Date</th>
  
    </tr>
  </thead>
  <tbody>
 
  {  
      items.map((d)=>(
      <tr key={d.Flight_number}>
        <td >{d.Flight_number}</td>
        <td>{d.Registration}</td>
        <td>{d.Station}</td>
        <td>{d.Trip}</td>
        <td>{d.Date}</td>

       
      </tr>))
      }
    
    
  </tbody>
</table>







      <table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return <td {...cell.getCellProps()}>{cell.render('Cell')  }</td>
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
      

      <div className="App">
        <button onClick={() => setModalIsOpen(true)}>Open Modal</button>

        <Modal
          isOpen={modalIsOpen}
          shouldCloseOnOverlayClick={false}
          onRequestClose={() => setModalIsOpen(false)}
          style={{
            overlay: { backgroundColor: "grey" },
            content: { color: "green" }
          }}
        >
          <h2>Modal Title</h2>
          {/* <TabMod D={D}/> */}
          <Editable D={D}/>
          <EditTwo D={D}/>
          <div>
            <button onClick={() => {setModalIsOpen(false); window.open('http://localhost:1500')}}>Close</button>
          </div>
        </Modal>
      </div>










      <p>Selected Rows: {Object.keys(selectedRowIds).length}</p>
      <pre>
        <code>
          {JSON.stringify(
            {
              selectedRowIds: selectedRowIds,
              'selectedFlatRows[].original': selectedFlatRows.map(
                d => d.original
              ),
            },
            null,
            2
          )}
        </code>
      </pre>
    </>
  )
// }

// function App() {

//   return (
//     <Styles>
//       <Table columns={columns} data={data} />
//     </Styles>
//   )
// // }

}

export default Table

