import './App.css';
import CartValue from './componenets/CartValue';
import Location from './componenets/Location';
import ExpenseList from './componenets/ExpenseList';
import ItemSelected from './componenets/ItemSelected';
import { AppProvider } from './context/Appcontext';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <AppProvider>
    <div className='container'>
        <h1 className='mt-3'>Shopping App</h1>
        <div className='row mt-3'> 
            <div className='col-sm'>
                <CartValue />
            </div>
            <div className='col-sm'>
                <Location />
            </div>
        </div>
        <h3 className='mt-3'>Shopping Cart</h3>
        <div className='row '>
            <div className='col-sm'>
                <ExpenseList />
            </div>
        </div>
        <h3 className='mt-3'>Add Items</h3>
        <div className='row mt-3'>
            <div className='col-sm'>
                <ItemSelected/>
            </div>
        </div>
    </div>
</AppProvider>

  );
}

export default App;
