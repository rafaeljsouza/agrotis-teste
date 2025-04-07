import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { FormProvider } from './context/FormContext';
import ListPage from './pages/ListPage';
import FormPage from './pages/FormPage';

function App() {
  return (
    <FormProvider>
      <Router>
        <Routes>
          <Route path="/" element={<ListPage />} />
          <Route path="/form" element={<FormPage />} />
        </Routes>
      </Router>
    </FormProvider>
  );
}

export default App;