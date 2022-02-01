import React from 'react'
import styled from 'styled-components'
import List from "./List"
import TabMod from './TabMod'
import Editable from './Editable'
import EditTwo from './EditTwo'
import Invoice from './Invoice'
import Modal from "react-modal";
import { useTable, useRowSelect, useFilters, useGlobalFilter, useAsyncDebounce } from 'react-table'
// A great library for fuzzy filtering/sorting items
import matchSorter from 'match-sorter'
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
////////////
// Define a default UI for filtering
function GlobalFilter({
    preGlobalFilteredRows,
    globalFilter,
    setGlobalFilter,
  }) {
    const count = preGlobalFilteredRows.length
    const [value, setValue] = React.useState(globalFilter)
    const onChange = useAsyncDebounce(value => {
      setGlobalFilter(value || undefined)
    }, 200)
  
    return (
      <span>
        Search:{' '}
        <input
          value={value || ""}
          onChange={e => {
            setValue(e.target.value);
            onChange(e.target.value);
          }}
          placeholder={`${count} records...`}
          style={{
            fontSize: '1.1rem',
            border: '0',
          }}
        />
      </span>
    )
  }
  
  // Define a default UI for filtering
  function DefaultColumnFilter({
    column: { filterValue, preFilteredRows, setFilter },
  }) {
    const count = preFilteredRows.length
  
    return (
      <input
        value={filterValue || ''}
        onChange={e => {
          setFilter(e.target.value || undefined) // Set undefined to remove the filter entirely
        }}
        placeholder={`Search ${count} records...`}
      />
    )
  }
  
  // This is a custom filter UI for selecting
  // a unique option from a list
  function SelectColumnFilter({
    column: { filterValue, setFilter, preFilteredRows, id },
  }) {
    // Calculate the options for filtering
    // using the preFilteredRows
    const options = React.useMemo(() => {
      const options = new Set()
      preFilteredRows.forEach(row => {
        options.add(row.values[id])
      })
      return [...options.values()]
    }, [id, preFilteredRows])
  
    // Render a multi-select box
    return (
      <select
        value={filterValue}
        onChange={e => {
          setFilter(e.target.value || undefined)
        }}
      >
        <option value="">All</option>
        {options.map((option, i) => (
          <option key={i} value={option}>
            {option}
          </option>
        ))}
      </select>
    )
  }
  
  // This is a custom filter UI that uses a
  // slider to set the filter value between a column's
  // min and max values
  function SliderColumnFilter({
    column: { filterValue, setFilter, preFilteredRows, id },
  }) {
    // Calculate the min and max
    // using the preFilteredRows
  
    const [min, max] = React.useMemo(() => {
      let min = preFilteredRows.length ? preFilteredRows[0].values[id] : 0
      let max = preFilteredRows.length ? preFilteredRows[0].values[id] : 0
      preFilteredRows.forEach(row => {
        min = Math.min(row.values[id], min)
        max = Math.max(row.values[id], max)
      })
      return [min, max]
    }, [id, preFilteredRows])
  
    return (
      <>
        <input
          type="range"
          min={min}
          max={max}
          value={filterValue || min}
          onChange={e => {
            setFilter(parseInt(e.target.value, 10))
          }}
        />
        <button onClick={() => setFilter(undefined)}>Off</button>
      </>
    )
  }
  
  // This is a custom UI for our 'between' or number range
  // filter. It uses two number boxes and filters rows to
  // ones that have values between the two
  function NumberRangeColumnFilter({
    column: { filterValue = [], preFilteredRows, setFilter, id },
  }) {
    const [min, max] = React.useMemo(() => {
      let min = preFilteredRows.length ? preFilteredRows[0].values[id] : 0
      let max = preFilteredRows.length ? preFilteredRows[0].values[id] : 0
      preFilteredRows.forEach(row => {
        min = Math.min(row.values[id], min)
        max = Math.max(row.values[id], max)
      })
      return [min, max]
    }, [id, preFilteredRows])
  
    return (
      <div
        style={{
          display: 'flex',
        }}
      >
        <input
          value={filterValue[0] || ''}
          type="number"
          onChange={e => {
            const val = e.target.value
            setFilter((old = []) => [val ? parseInt(val, 10) : undefined, old[1]])
          }}
          placeholder={`Min (${min})`}
          style={{
            width: '70px',
            marginRight: '0.5rem',
          }}
        />
        to
        <input
          value={filterValue[1] || ''}
          type="number"
          onChange={e => {
            const val = e.target.value
            setFilter((old = []) => [old[0], val ? parseInt(val, 10) : undefined])
          }}
          placeholder={`Max (${max})`}
          style={{
            width: '70px',
            marginLeft: '0.5rem',
          }}
        />
      </div>
    )
  }
  
//   function fuzzyTextFilterFn(rows, id, filterValue) {
//     return matchSorter(rows, filterValue, { keys: [row => row.values[id]] })
//   }
  
  // Let the table remove the filter if the string is empty
//   fuzzyTextFilterFn.autoRemove = val => !val
  
///////////////
function Table({data}) {

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalIsOpenInvoice, setModalIsOpenInvoice] = useState(false);

    
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


axios.post('https://tce-morocco.com/flights/api/insert', d[0])
.then(() => {
 setItems(d);
 console.log(d)


 
//   setTimeout(function(){ alert("Successful Insert into Database")}, 2000);
  window.open('http://localhost:1500', "_self");
  alert("Successful Insert into Database")
});



}); ////End Promise

};


const [qcm,setQcm]=useState([])

useEffect(()=>{
  axios.get('https://tce-morocco.com/flights/api/get').then(
    (response)=>{
      setQcm(response.data);
         
    })
 
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
 

///////////
const filterTypes = React.useMemo(
    () => ({
      // Add a new fuzzyTextFilterFn filter type.
    //   fuzzyText: fuzzyTextFilterFn,
      // Or, override the default text filter to use
      // "startWith"
      text: (rows, id, filterValue) => {
        return rows.filter(row => {
          const rowValue = row.values[id]
          return rowValue !== undefined
            ? String(rowValue)
                .toLowerCase()
                .startsWith(String(filterValue).toLowerCase())
            : true
        })
      },
    }),
    []
  )

  const defaultColumn = React.useMemo(
    () => ({
      // Let's set up our default Filter UI
      Filter: DefaultColumnFilter,
    }),
    []
  )

//////////
const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    selectedFlatRows,
    visibleColumns,
    preGlobalFilteredRows,
    setGlobalFilter,
    state: { selectedRowIds },
  } = useTable(
    {
      columns,
      data,
      defaultColumn, // Be sure to pass the defaultColumn option
      filterTypes
    },
    useFilters, // useFilters!
    useGlobalFilter, // useGlobalFilter!
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
let [Q,setQ]=useState()
////////////////

function invoice (){
  const A=[]
  for (var key in selectedRowIds) {
    A.push(key);
  }

 if (A.length == 0 ){
  
  alert('Please select at least a single row ')
  
 }else {
 
  
      console.log("A",A) //// Array of selected indexes
      Q=[]
      let X=[]
      let co=""
      A.forEach(myFunction);

      function allEqual(arr) {
        return new Set(arr).size == 1;
      }

    function myFunction( item,index) {
      item= selectedFlatRows[index].original
     
      // if (Q.item[index])  
      Q.push(item)
      co=Q[0].station
      X.push(item.registration)
   
    }

    if (co!=="TBA") {
    const equal= allEqual(X)
    console.log("equal",equal)
    if (equal){setQ([Q]); setModalIsOpenInvoice(true)}
    else{  alert ("Please select flights with same aircraft registration ")}
    } else {
      alert('Company ID is missing !! ')
    }
 
 }/// end else
}///// function invoice
////////////////

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
    <input type="submit" className="button" value="Make Invoice " onClick={() => {invoice() }}/>
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
                <th {...column.getHeaderProps()}>{column.render('Header')}
                 <div>{column.canFilter ? column.render('Filter') : null}</div>
                </th>
              ))}
            </tr>
          ))}
          <tr>
            <th
              colSpan={visibleColumns.length}
              style={{
                textAlign: 'left',
              }}
            >
              {/* <GlobalFilter
                preGlobalFilteredRows={preGlobalFilteredRows}
                globalFilter={state.globalFilter}
                setGlobalFilter={setGlobalFilter}
              /> */}
            </th>
          </tr>
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
          <Editable id="Editable" D={D}/>
          <EditTwo  D={D}/>
          
          <div>
            <button onClick={() => {setModalIsOpen(false); window.open('http://localhost:1500', "_self")}}>Close</button>
          </div>
        </Modal>
      </div>

   
      

      <div className="App">
        <button onClick={() => setModalIsOpenInvoice(true)}>Open Modal Invoice</button>

        <Modal
          isOpen={modalIsOpenInvoice}
          shouldCloseOnOverlayClick={false}
          onRequestClose={() => setModalIsOpenInvoice(false)}
          style={{
            overlay: { backgroundColor: "grey" },
            content: { color: "green" }
          }}
        >
          <h2>Invoice </h2>
          <Invoice Q={Q}/>
          {/* <TabMod D={D}/> */}
          {/* <Editable  D={D}/>
          <EditTwo  D={D}/> */}
          
          <div>
        
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
            
            <button onClick={() => {setModalIsOpenInvoice(false); window.open('http://localhost:1500', "_self")}}>Close</button>
          </div>
        </Modal>
      </div>









      <br />
      <div>Showing the first 20 results of {rows.length} rows</div>
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

}

export default Table

