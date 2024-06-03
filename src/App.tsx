

import '../src/assets/App.scss';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AddDataForms from './pages/AddDataForms';
import Sidebar from './components/fixed/Sidebar';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <div className='sidebar'>
        <Sidebar />
        </div>
        <div className='main-content'>
          <div className="content">
            <Routes>
              <Route path='/' element={<HomePage />} />
              <Route path='/upload' element={<AddDataForms />} />
            </Routes>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
