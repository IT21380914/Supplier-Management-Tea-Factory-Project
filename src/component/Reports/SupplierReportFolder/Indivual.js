import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Report from '../SupplierReportFolder/SupplierReports';
import { NavLink } from 'react-router-dom';
import { Button } from '@mui/material';
import Search from '../../images/search.png'



const URL="http://localhost:5000/supplies/Allsupplies/suppliesTotal/Supplier1";
const fetchHandler=async()=>{
  return await axios.get(URL).then((res)=>res.data)
}


  const Indivual = () => {
  const [totalsupply,setTotalSupply]  =useState();
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
    win.document.write('<h1>Supplies </h1>');
    win.document.write(sTable);         // THE TABLE CONTENTS INSIDE THE BODY TAG.
    win.document.write('</body></html>');
  
    win.document.close(); 	// CLOSE THE CURRENT WINDOW.
  
    win.print();
  }

 
  useEffect(()=>{
      fetchHandler().then(data=>setTotalSupply(data))
  },[]);

  console.log(totalsupply)
    return (
      <div>
      <div className='suppliersHeadingReport'>
        
        <div className='sHeadingReport'>
        <h1>Supplies Report</h1>
        </div>
        <div className='sSearchReport'>
        <input type='text' placeholder='search' className='searchBar' onChange={(e)=>{setSearchTerm(e.target.value)}}  ></input>
        <img className='searchimg' src={Search} alt='search'/>
        </div>
        
        </div>
        <div id='tab'> 
      <table className='dailySupplyTable'>
            <tr>
                
                <th>Name</th>
                <th>Total Tea Supplied (Kilograms)</th>
                <th>Total Payments Made</th>
                
            </tr>
            </table>
            {totalsupply && totalsupply.filter((totalsupply)=>
            {
              if(searchTerm==="")
              {
                  return totalsupply;

              }
              else if(totalsupply._id.toLowerCase().includes(searchTerm.toLowerCase())){
                  return totalsupply;
              }
            }).map((report,i)=>(
        <div key={i}>
          <Report report={report}/>
        </div>
      ))} 
      </div>
       <div className='btn'>
        <Button  variant="contained" color="secondary" size="medium"  LinkComponent={NavLink} to="/Home" >Back</Button>
        <Button  variant="contained" color="secondary" size="medium" onClick={createPDF} >Print</Button>
      </div>
    </div>
    );
}

Indivual.propTypes = {}

export default Indivual