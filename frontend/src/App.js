import {BrowserRouter, Routes, Route} from 'react-router-dom'
import HomePage from './Pages/HomePage';
import LogIn from './Pages/LogIn';
import Register from './Pages/Register';
import { useSelector } from 'react-redux';
import Spinner from './Components/Spinner';
import ProtectedRoutes from './Components/ProtectedRoutes';
import PublicRoute from './Components/PublicRoute';

function App() {
  const {loading} = useSelector(state => state.alert)
  return (
    <>
    <BrowserRouter>
    {loading ? (<Spinner/>
    ) : (
    <Routes>
      <Route path='/' element = {
      <ProtectedRoutes>
        <HomePage/>
      </ProtectedRoutes>
    }/>
      <Route path='/login' element = {
      <PublicRoute>
        <LogIn/>
      </PublicRoute>
      }/>
      <Route path='/register' element = {
        <PublicRoute>
          <Register/>
        </PublicRoute>
      }/>
    </Routes>
    )}
    </BrowserRouter>
    </>
  );
}

export default App;
