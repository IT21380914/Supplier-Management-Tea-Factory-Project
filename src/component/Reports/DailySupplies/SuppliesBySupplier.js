import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SuppliesBySupplierDetails from './SuppliesBySupplierDetails';
import { NavLink } from 'react-router-dom';
import { Button } from '@mui/material';
import Search from '../../images/search.png'


const name='Supplier5'
const URL=`http://localhost:5000/supplies/Allsupplies/dailySupplies/find/${name}`;
const fetchHandler=async()=>{
  return await axios.get(URL).then((res)=>res.data)
}

const SuppliesBySupplier = () => {
  const [supplierdaily,setsupplierdaily]  =useState();
  const [searchTerm,setSearchTerm]=useState('');
  const createPDF=()=>{
    const sTable = document.getElementById('tab').innerHTML;
  
          var style = "<style>";
          style = style + "table {width: 100%;font: 17px Calibri;}";
          style = style + "table, th, td {border: solid 1px #DDD; border-collapse: collapse;";
          style = style + "padding: 2px 3px;text-align: center;}";
          style=style+"h1{text-align:center}";
          style = style + "</style>";
    const win = window.open('', '', 'height=700,width=700');
  
    win.document.write('<html><head>');
    win.document.write('<title>Report</title>');   // <title> FOR PDF HEADER.
    win.document.write(style);          // ADD STYLE INSIDE THE HEAD TAG.
    win.document.write('</head>');
    win.document.write('<body>');
    win.document.write('<h1>DAILY SUPPLY </h1>');
    win.document.write(sTable);         // THE TABLE CONTENTS INSIDE THE BODY TAG.
    win.document.write('</body></html>');
  
    win.document.close(); 	// CLOSE THE CURRENT WINDOW.
  
    win.print();
  }

 
  useEffect(()=>{
      fetchHandler().then(data=>setsupplierdaily(data))
  },[]);

  console.log(supplierdaily)

  
    return(
      <div >
      <div className='suppliersHeadingReport'>
        <div className='sHeadingReport'>
        <h1>Daily Supply Reports</h1>
        </div>
        <div className='sSearchSupplierReport'>
        <input type='text' placeholder='search' className='searchBarSupplier' onChange={(e)=>{setSearchTerm(e.target.value)} }  ></input>
        <img className='searchimg' src={Search} alt='search'/>
        </div>
        
        </div>
        <div id='tab'>
      <table className='SupplierSupplyTable'>
            <tr>
                
                <th>Transaction ID</th>
                <th>Tea Supplied (Kilograms)</th>
                <th>Payment </th>
                <th>Date</th>
                <th>Print Receipt</th>
                
            </tr>
            </table>
            {supplierdaily && supplierdaily.filter((supplierdaily)=>
            {
              if(searchTerm==="")
              {
                  return supplierdaily;

              }
              else if(supplierdaily.date.toLowerCase().includes(searchTerm.toLowerCase())){
                  return supplierdaily;
              }
            }).map((supplierdaily,i)=>(
        <div key={i}>
          <SuppliesBySupplierDetails supplierdaily={supplierdaily}/>
        </div>
      ))} 
      </div>
       <div className='btn'>
        <Button  variant="outlined" color="secondary" size="medium"  LinkComponent={NavLink} to="/supplierHome" >Back</Button>
        <Button  variant="outlined" color="secondary" size="medium"  onClick={createPDF} >Print</Button>
      </div>
    </div>
    );
  
}

export default SuppliesBySupplier