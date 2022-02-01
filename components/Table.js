import React from 'react'
import './table.css'
import { useTable, useGlobalFilter, useRowSelect } from 'react-table'

////////////////
import  { useState, useEffect } from "react";
import "../App.css";
import * as XLSX from "xlsx";
import axios from "axios";
import { GlobalFilter } from './GlobalFilter';
import Checkbox from './Checkbox';


// import styles from "./input.module.css";
//////////////////////////////////

// function Table({ columns, data }) {
  function Table() {
  
  // const [qcm,setQcm]=useState([])

  // useEffect(()=>{
  //   axios.get('http://localhost:3000/api/get').then(
  //     (response)=>{setQcm(response.data)}
  //   )
  // })


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

     
      axios.post('http://localhost:2000/api/insert', d[0])
      .then(() => {
        setItems(d);
        console.log(d)
        alert("Successful Insert");

      });
     
    }); ////End Promise
  
  };
  /////////////////////fin input


  // Render the UI for your table
  const [qcm,setQcm]=useState([])

  useEffect(()=>{
    axios.get('http://localhost:2000/api/get').then(
      (response)=>{setQcm(response.data)}
    )
   
  })

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
    //  const data = React.useMemo(() => makeData(10), []) 
    const data = qcm 
   

     const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      rows,
      prepareRow,
      state,
      setGlobalFilter,
      selectedFlatRows
    } = useTable({
      columns,
      data,
    }, 
      useGlobalFilter,
      useRowSelect,
      (hooks)=>{
        hooks.visibleColumns.push((columns)=>{
          return [
            {
              id:'selection',
              Header:({getToggleAllRowsSelectedProps})=>(
                <Checkbox {...getToggleAllRowsSelectedProps()}/>
              ),
              Cell : ({row})=>(
                <Checkbox {...row.getToggleRowSelectedProps()}/>
              )
            },
            ...columns
          ]
        })
      })

  const {globalFilter}=state


  const firstPagerows= rows.slice(0,15)

  return (
    <>
   
   
    <input type="file" onChange={(e)=>{
        const file=e.target.files[0];
        console.log("fileName",file.name)             
        readExcel(file);       
      }}/>
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

{/* {qcm.map((f)=>{
      
      return <ul key={f.ID}>{f.registration}</ul>
    })} */}

<GlobalFilter filter={globalFilter} setFilter={setGlobalFilter}/>
      
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
        {firstPagerows.map((row, i) => {
          prepareRow(row)
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => {
                return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
              })}
            </tr>
          )
        })}
      </tbody>
    </table>
    <pre>
      <code>
        {JSON.stringify(
          {
            selectedFlatRows:selectedFlatRows.map((row)=>row.original),
          },
          null,
          2
        )}
      </code>
    </pre>
    </>
  )
  
}

export default Table