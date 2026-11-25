import { Navigate, Route, Routes, useSearchParams } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Templates from './pages/Templates';
import Quote from './pages/Quote';
import Library from './pages/Library';
import Kpi from './pages/Kpi';
import Invoice from './pages/Invoice';
import Manage from './pages/Manage';

// Xử lý từ chối đã chuyển vào Kho: link cũ tự chuyển sang
function ObjectionsRedirect() {
  const [p] = useSearchParams();
  const n = p.get('n');
  return <Navigate to={`/kho?s=tu-choi${n ? `&n=${n}` : ''}`} replace />;
}

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="bao-gia" element={<Quote />} />
        <Route path="tu-choi" element={<ObjectionsRedirect />} />
        <Route path="tin-soan" element={<Templates />} />
        <Route path="hoa-don" element={<Invoice />} />
        <Route path="kpi" element={<Kpi />} />
        <Route path="kho" element={<Library />} />
        <Route path="quan-ly" element={<Manage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
