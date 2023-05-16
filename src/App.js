import './App.css';
import {
  BrowserRouter, Routes, Route
} from "react-router-dom";
import MainPage from './component/page/MainPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<MainPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
