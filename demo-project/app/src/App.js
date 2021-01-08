import { useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const [invoices, setInvoices] = useState([
    {
      id: 1,
      Vendor: 'Hankook',
      Amount: '$18.00',
      Invoice: '1123',
      Date: '08/21/2020',
    },
    {
      id: 2,
      Vendor: 'Nike',
      Amount: '$118.00',
      Invoice: '1223',
      Date: '11/21/2020',
    },
  ]);
  const [loading, setLoading] = useState(false);

  if (loading) {
    return <div>Loading...</div>;
  }

  const remove = (id) => {
    setInvoices((prevState) =>
      prevState.filter((invoice) => invoice.id !== id)
    );
  };

  const invoicesList = () =>
    invoices.map((invoice) => (
      <tr key={invoice.id}>
        <td>{invoice.Vendor}</td>
        <td>{invoice.Amount}</td>
        <td>{invoice.Invoice}</td>
        <td>{invoice.Date}</td>
        <td>
          <Button
            className='btn btn-lg btn-success'
            onClick={() => remove(invoice.id)}
          >
            OK
          </Button>
        </td>
        <td>
          <Button
            className='btn btn-lg btn-danger'
            onClick={() => remove(invoice.id)}
          >
            NOK
          </Button>
        </td>
        <td>
          <Button
            className='btn btn-lg btn-info'
            onClick={() => remove(invoice.id)}
          >
            50%
          </Button>
        </td>
        <td>
          <Button
            className='btn btn-lg btn-warning'
            onClick={() => remove(invoice.id)}
          >
            ??
          </Button>
        </td>
        <td>
          <Button
            className='btn btn-lg btn-info'
            onClick={() => remove(invoice.id)}
          >
            Image
          </Button>
        </td>
      </tr>
    ));

  return (
    <div className='container border border-secondary rounded center'>
      <div className='row'>
        <div className='col-12'>
          <h4>Pending Invoices - The Test Company</h4>
        </div>
      </div>
      <div className='row'>
        <div className='col-12 center text-center'>
          <Table variant='dark' responsive striped bordered hover>
            <thead>
              <tr>
                <th>Vendor</th>
                <th>Amount</th>
                <th>Invoice #</th>
                <th>Date</th>
                <th colSpan='4'>Actions</th>
                <th>Image</th>
              </tr>
            </thead>
            <tbody>
              {invoices.length ? (
                invoicesList()
              ) : (
                <tr>
                  <td colSpan='9'></td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default App;
