import React, { useEffect, useState } from 'react';
import axios from 'axios';
import RegistrationReportDetails from './RegistrationReportDetails';
import { NavLink } from 'react-router-dom';
import { Button } from '@mui/material';
import Search from '../../images/search.png'
import Suppliers from '../../Supplier/Suppliers';


const date='2023-04-21'
const URL=`http://localhost:5000/suppliers/Allsuppliers/find/${date}`;
const fetchHandler=async()=>{
  return await axios.get(URL).then((res)=>res.data)}




const RegistraionReport = () => {
    const [dailysupplier,setdailysupplier]  =useState();
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
        fetchHandler().then(data=>setdailysupplier(data.supplier))
    },[]);
  
    console.log(dailysupplier)

    
      return (
        <div >
        <div className='suppliersHeadingReport'>
          <div className='sHeadingReport'>
          <h1>Suppliers</h1>
          </div>
          <div className='sSearchRegisteredReport'>
          <input type='text' placeholder='search' className='searchBarRegsitered' onChange={(e)=>{setSearchTerm(e.target.value)}}  ></input>
          <img className='searchimg' src={Search} alt='search'/>
          </div>
          
          </div>
          <div id='tab'>
        <table className='dailySupplierTable'>
              <tr>
                  
                  <th>ID</th>
                  <th>Name</th>
                  <th>Threshold(Kgs)</th>
                  <th>Email</th>
                  <th>Contact</th>
                  <th>Date</th>
                  
              </tr>
              </table>
              {dailysupplier && dailysupplier.filter((dailysupplier)=>
              {
                if(searchTerm==="")
                {
                    return dailysupplier;
  
                }
                else if(dailysupplier.name.toLowerCase().includes(searchTerm.toLowerCase())){
                    return dailysupplier;
                }
              }).map((dailysupplier,i)=>(
          <div key={i}>
            <RegistrationReportDetails dailysupplier={dailysupplier}/>
          </div>
        ))} 
        </div>
         <div className='btn'>
          <Button  variant="outlined" color="secondary" size="medium"  LinkComponent={NavLink} to="/Home" >Back</Button>
          <Button  variant="outlined" color="secondary" size="medium"  onClick={createPDF} >Print</Button>
        </div>
      </div>
      );
     

}

export default RegistraionReport