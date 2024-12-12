import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Admin = () => {
    return (
        <div className='container  d-flex justify-content-center align-items-center'style={{width:'120%'}}>
            <div className='row'>
                <div className='col-11'>
                    <div className='card p-3 m-2 justify-content-between'>
                        <div className='card-header bg-dark text-white d-flex justify-content-between align-items-center'>
                            <h1 className='h4'>Customer Details</h1>
                            <form className="d-flex" role="search">
                                <input className="form-control" placeholder="Search" aria-label="Search"/>
                            </form>
                        </div>
                        <div className='card-body p-0'>
                            <div className='table-responsive'>
                                <table className='table table-bordered table-striped'>
                                    <thead className='thead-dark'>
                                        <tr style={{ fontSize: '120%' }}>
                                            <th>Name</th>
                                            <th>Address</th>
                                            <th>Email</th>
                                            <th>Contact</th>
                                            <th>Option</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {/* <tr>
                                      <td>John Doe</td>
                                      <td>123 Main St</td>
                                      <td>john@example.com</td>
                                      <td>+123456789</td>
                                      <td><button className='btn btn-primary btn-sm'>Edit</button></td>
                                    </tr> */}
                                        {/* Add table rows here */}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Admin;
