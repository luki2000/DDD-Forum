import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { MainPage } from './pages/mainPage';
import { RegisterPage } from './pages/registerPage';
import { UserProvider } from './context/userContext';
import { SpinnerProvider } from './context/spinnerContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {

  return (
    <SpinnerProvider>
      <UserProvider>
        <BrowserRouter>
          <meta name="color-scheme" content='light only'></meta>
          <Routes>
            <Route path="/" element={<MainPage />} ></Route>
            <Route path="/join" element={<RegisterPage />} ></Route>
          </Routes>
        </BrowserRouter>
        <ToastContainer />
      </UserProvider>
    </SpinnerProvider>
  )
}

export default App
