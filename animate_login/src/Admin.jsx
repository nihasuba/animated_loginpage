import React from 'react'
import'bootstrap/dist/css/bootstrap.min.css';

const Admin = () => {
  
  

  return (
    <div className='container'>
      <div className='row '>
        <div className='col-md-11   col-lg-11'>
          <div className='card'>
            <div className='card-header bg-dark text-white d-flex justify-content-between align-items-center'>
                <form className="d-flex" role="search">
                    <input className="form-control"  placeholder="Search" aria-label="Search"/>
                </form>
                <h1 className='h4 text-center'>Customer Details</h1>
                <button className="btn btn-info text-dark m-1" >
                    Add Customer
                </button>
              
            </div>
            <div className='card-body p-0'>
              <div className='table-responsive'>
                <table className='table table-bordered table-striped'>
                  <thead className='thead-dark'>
                    <tr style={{fontSize:'140%'}}>
                      <th>Name</th>
                      <th>Address</th>
                      <th>Email</th>
                      <th>contact</th>
                      <th>Option</th>
                    </tr>
                  </thead>
                  <tbody></tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      
    </div>
  )
}

export default Admin