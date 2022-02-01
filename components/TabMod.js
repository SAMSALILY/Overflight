import React from 'react'
import { useTable, useRowSelect } from 'react-table'
import List from "./List"

// import makeData from './makeData'

import Modal from "react-modal";

///////////////////
import  { useState, useEffect } from "react";
import "../App.css";

function TabMod(props) {

  
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
  
   const data=props.D 
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
                {/* <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} /> */}
              </div>
            ),
            // The cell can use the individual row's getToggleRowSelectedProps method
            // to the render a checkbox
            Cell: ({ row }) => (
              <div>
                {/* <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} /> */}
              </div>
            ),
          },
          ...columns,
        ])
      }
    )
  


    return (
      <>
  
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
        
  
  
  
      </>
    )
 
  }
  
  export default TabMod
  
  