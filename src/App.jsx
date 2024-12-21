import RootLayout from "./_root/RootLayout";
import "./index.css";
import { Routes, Route } from "react-router-dom";
import Form from "./_root/Pages/FormContainer";
import { Navigate } from "react-router-dom";
import Table from "./_root/Pages/Table";
const App = () => {
  return (
    <main className="max-w-screen-xl mx-auto p-4">
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<Navigate to="/form" replace />} />
          <Route path="form" element={<Form />} />
          <Route path="/table" element={<Table />} />
        </Route>
      </Routes>
    </main>
  );
};

export default App;
