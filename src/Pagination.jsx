import React, { useState } from 'react'
import { useEffect } from 'react';
import axios from 'axios';
import styles from "./Pagination.module.css"

const Pagination = () => {
    const [data,setData]=useState([])
    const [filteredData,setFilteredData]=useState([])
    const [page,setPage]=useState(1)
    const [perPage] = useState(10);
    useEffect(()=>{
        fetchData()
      },[])
    
      const fetchData=async()=>{
        try{
          const res=await axios.get('https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json')
          setData(res.data)
        }
        catch(err){
          alert("failed to fetch data")
        }
      }

      useEffect(()=>{
        let tableData=[...data]
        const paginatedData= tableData.splice(0,10)
        setFilteredData(paginatedData)

      },[data])

       const onNextClick=()=>{
       const pagesVisited = page * perPage;
       const lastSetData = pagesVisited + perPage;
       setPage(page+1)
    setFilteredData(data.slice(pagesVisited, lastSetData));
      }

      const onPreviousClick=()=>{
        const pagesVisited =(page-1)*perPage
       const lastSetData = pagesVisited - perPage;
       setPage(page-1)
    setFilteredData(data.slice(lastSetData,pagesVisited));
      }
  return (
    <div>
      <h1>Employee Data Table</h1>
      <table className={styles.table}>
      <thead>
        <tr className={styles.tablerow}>
        <th className={styles.tableHead}>ID</th>
        <th className={styles.tableHead} >Name</th>
        <th className={styles.tableHead}>Email</th>
        <th className={styles.tableHead}>Role</th>
        </tr>
        </thead>
           { filteredData.length && filteredData.map((item, mykey) =>
   <tbody key={mykey}>
     <tr className={styles.tablerow}>
      <td>{item.id}</td>
      <td>{item.name}</td>    
      <td>{item.email}</td>    
      <td>{item.role}</td>  
      </tr>
      </tbody> )}
      </table>
      <div className={styles.buttonWrapper}>
      <button className={styles.button} onClick={(e)=>onPreviousClick()} disabled={page===1}>Previous</button>
      <button className={styles.button}>{page}</button>
      <button className={styles.button} onClick={(e)=>onNextClick()} disabled={page===5}>Next</button>
      </div>
    </div>
  )
}

export default Pagination
