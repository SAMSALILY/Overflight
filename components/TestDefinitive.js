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
// import  ReactPDF  from '@react-pdf/renderer';
import { PDFDownloadLink,PDFViewer } from '@react-pdf/renderer';
import ReactPDF from '@react-pdf/renderer';

///////////////////
import  { useState, useEffect } from "react";
import "../App.css";
import * as XLSX from "xlsx";
import axios from "axios";

const Button = styled.button`
  background-color: black;
  color: white;
  font-size: 20px;
  padding: 10px 60px;
  border-radius: 5px;
  margin: 10px 0px;
  cursor: pointer;
`;
// Usage


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
 const wsname=wb.SheetNames[2];
 const ws=wb.Sheets[wsname];
 const data=XLSX.utils.sheet_to_json(ws);
 resolve(data);
};
filereader.onerror=(error)=>{
 reject(error);
}

});


promise.catch((d)=>{

console.log("d[0].date+++++",d[0].date);


axios.post('http://127.0.0.1:1501/api/insert', d[0])
.then(() => {
 setItems(d);
 console.log(" d[0]", d[0]);

  window.open('http://127.0.0.1:1500', "_self");
  alert("Successful Insert into Database")
});
}); 
};


const tr = document.getElementsByTagName("tr")
const [qcm,setQcm]=useState([])
let [color,setColor]=useState("")
let [colorInvoiced,setColorInvoiced]=useState("")

let inf=[]

 //////////////////
 function makeRed() {   
     
    qcm.forEach((q,index)=>{
      let j=index+3
      if (q.station=='TBA' ) {
        inf.push(j); 
        setColor("lightsalmon")
        tr[j].style.backgroundColor=color
      }
        
    })
 }
 ///////////////
 //////////////////
 
//  function invoiced() {   
     
//   qcm.forEach((q,index)=>{
//     let j=index+3
//     if (q.INVOICE_NBR!=0 && q.INVOICE_NBR!="" && q.INVOICE_NBR!==null ) {
//       inf.push(j); 
//       setColorInvoiced("lightgreen");
//       tr[j].style.backgroundColor=colorInvoiced
//     }
      
//   })
// }
///////////////
 useEffect(()=>{
      axios.get(`http://127.0.0.1:1501/api/get`,{ crossdomain: true }).then(
      (response)=>{
       setQcm(response.data);
    })
  },[]);

  
//   else{

//     useEffect(()=>{
//     axios.get(`http://127.0.0.1:1501/api/getQCM/${localStorage.getItem("IdKey")}`,{ crossdomain: true }).then(
//     (response)=>{
//       setQcm(response.data);
//       console.log("response.data.length///",response.data.length);
//       console.log("localStorage.getItem///",localStorage.getItem("IdKey"));
//   })   
// },[]);
// }
///////////////////////// DISPLAY ONLY OCC INTRODUCED QCM 
// useEffect(()=>{
//   axios.get(`http://127.0.0.1:1501/api/getQCM`,{ crossdomain: true }).then(
//     (response)=>{
//       setQcm(response.data);
//       console.log("response.data getQCM.length",response.data.length);
    
//   })
// },[]);
////////////////////////////////////////////////////////
// useEffect(()=>{
//   axios.get('http://127.0.0.1:1501/api/get',{
//     method: 'GET',
//     headers: {
//       'Access-Control-Allow-Origin': '*'
      
//     }
//   }).then(
//     (response)=>{
//       setQcm(response.data);
//       console.log("response.data",response.data)    
//   })
  
// },[]);

const columns = React.useMemo(
  () => [
    {
      Header:'ID',
      accessor:'ID'
    },
    {
      Header:'Flight Number',
      accessor:'flight_number',
     

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
  //////// serialization
  const [InvoiceNumber,setInvoiceNumber]=useState([])
  useEffect(()=>{
  const sendGetRequest = async () => {
    try {
        const resp = await axios.get('http://127.0.0.1:1501/api/invoice/get/1');
        setInvoiceNumber(resp.data[0].ID);
      console.log("resp.data[0].ID  *******",resp.data[0].ID);
    } catch (err) {
      throw new Error('Unable to establish Connection with database!!');
        console.error(err);
    }
};
sendGetRequest();
},[])

console.log('InvoiceNumber',InvoiceNumber)
/////////////////

function invoice (){

  /////////// serialization 
//   axios.put('http://127.0.0.1:1501/api/invoice/1')
// .then(() => {

// });
   //////////



  ///////////////////// Insert invoice number into database ///
//   const sendPostRequest = async () => {
//     try {
//         const resp = await axios.post('http://127.0.0.1:1501/api/flight/invoice',invoiceNumber);
        
//     } catch (err) {
//       throw new Error('Unable to establish Connection with database5!!');
//         console.error(err);
//     }
// };

// sendPostRequest();
  ////////////////
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
      co=Q[0].flight_number /// station ici est implemente cause pas de quirof co dispo data
      X.push(item.registration)
     
      // console.log('f',f)
      // console.log('X',X)
    }
    const f=X.find((item)=>item=="TBA")
    if(Q[0].station!=="TBA" ){
      if (co!=='TBA') {
        const equal= allEqual(X)
        
        if (equal){setQ([Q]); setModalIsOpenInvoice(true)}
        else{ 
          ///////
           alert ("Please select flights with same aircraft registration ")
                
          ///////
          
          
         }
      } 
      else {
        alert('Company ID is missing !! ')
      }
    }else{alert('Attention : Some elemnets are TBA !!')}
 
 }/// end else
}///// function invoice
////////////////

function update (){
 
  // window.open('https://moroccocrafts4u.retool.com/embedded/public/1137bcf9-7eea-4705-889b-278b0387dc2e', "_self")
  window.location.replace('https://moroccocrafts4u.retool.com/embedded/public/1137bcf9-7eea-4705-889b-278b0387dc2e')

  const A=[]
  for (var key in selectedRowIds) {
    A.push(key);
  }

 if (A.length == 1 ){
  
   const B=A[0]
   console.log(B)
   let C= selectedFlatRows[0].original
  
  setD([C])
  
  setModalIsOpen(true)
  
 }
//  else {
//   alert('Please select a single row ')
//  }
 
}
////  function onclick Confirm
let confirm = () => {
  ///////// asynchronus mode
const sendPutRequest = async () => {
try {
const resp = await axios.put('http://127.0.0.1:1501/api/invoice/1');

} catch (err) {
throw new Error('Unable to establish Connection with database!!');
console.error(err);
}
};

sendPutRequest();
///////////
alert("facture bien établie !!");
///////////////////// Insert invoice number into database ///
const sendPostRequest = async () => {
try {
const resp = await axios.put('http://127.0.0.1:1501/api/flight/invoice',{InvoiceNumber:InvoiceNumber,ID:Q[0][0].ID});
 
} catch (err) {
throw new Error('Unable to establish Connection with database5!!');
console.error(err);
}
};

sendPostRequest();

////////// QCM CHECK

      
// console.log('Q[0][0].ID',Q[0][0].ID)         
};

function QcmCheck(){
 
  window.open('https://moroccocrafts4u.retool.com/embedded/public/da786a50-c440-4eb0-9970-87ce4df4d5e3')
}

//////////////// 
//////
let  Button_Confirm;
if(true){
  Button_Confirm=<Button onClick={confirm}> Confirm</Button>
}
  return (
    <>
  
 
      
    <input className= "button" type="file" onChange={(e)=>{
        const file=e.target.files[0];
                 
        readExcel(file);             
         
    }}/>
    <input type="submit" className="button" value="Updates " onClick={() => {update() }}/>
    <input type="submit" className="button" value="Invoice " onClick={() => {invoice() }}/>
    <input type="submit" className="button" value="Preliminary QCM Check " onClick={() => {QcmCheck() }}/>
       <table className="table">
  <thead>
    <tr>
      {/* <th scope="col">Flight number</th>
      <th scope="col">Registration</th>
      <th scope="col">Station</th>
      <th scope="col">Trip number</th>
      <th scope="col">Date</th> */}
  
    </tr>
  </thead>
  <tbody>
 
  {  
      items.map((d)=>(
      <tr key={d.Flt_nbr}>
        <td >{d.Flt_nbr}</td>
        <td>{d.Registration}</td>
        <td>{d.Station}</td>
        <td>{d.Trip}</td>
        <td>{d.Date}</td>

       
      </tr>))
      }
    
    
  </tbody>
</table>

      <table id='myTable' {...getTableProps()}>
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
              <tr  {...row.getRowProps()} onMouseOver={makeRed} >
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
            overlay: { backgroundColor: "grey"},
            content: { color: "black"}
           

          }}
          
        >
          
          <PDFViewer width="1100" height="1180">
            <Invoice Q={Q} InvoiceNumber={InvoiceNumber}/>
          </PDFViewer>

          {/* <Button onClick={() => {
               ///////// asynchronus mode
   const sendPutRequest = async () => {
    try {
        const resp = await axios.put('http://127.0.0.1:1501/api/invoice/1');
        
    } catch (err) {
      throw new Error('Unable to establish Connection with database!!');
        console.error(err);
    }
};

sendPutRequest();
  ///////////
            alert("facture bien établie !!");
     ///////////////////// Insert invoice number into database ///
  const sendPostRequest = async () => {
    try {
        const resp = await axios.put('http://127.0.0.1:1501/api/flight/invoice',{InvoiceNumber:InvoiceNumber,ID:Q[0][0].ID});
              
    } catch (err) {
      throw new Error('Unable to establish Connection with database5!!');
        console.error(err);
    }
};

sendPostRequest();
  ////////////////       
  // console.log('Q[0][0].ID',Q[0][0].ID)         
            }}>

              Confirm 
          </Button>  */}
          {/* <Button onClick={confirm}> Confirm</Button>  */}
          {Button_Confirm}
          <Button onClick={() => {setModalIsOpenInvoice(false); window.open('http://localhost:1500', "_self")}}>
              Close
          </Button> 
          
          
          { console.log('Q',Q)
          /* <PDFDownloadLink document={<Invoice Q={Q}/>} fileName="somename.pdf">
              {({ blob, url, loading, error }) =>
                loading ? 'Loading document...' : 'Download now!'
              }
          </PDFDownloadLink>   */}

          {/* <PDFDownloadLink document={<Invoice Q={Q}/>} fileName="invoice.pdf"> */}
          <PDFDownloadLink document={<Invoice Q={Q}/>} fileName="invoice.pdf">
        
              <Button onClick={() => {
            alert("facture bien établie !!")}}>
                Download 
              </Button>  
          </PDFDownloadLink> 
          <div>
        
     
            
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

