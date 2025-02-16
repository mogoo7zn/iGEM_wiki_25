import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Loading from './components/Loading/Loading';

const Home = lazy(() => import('./features/Home'));
const Team = lazy(() => import('./features/Team'));

const App = () => (
  <BrowserRouter>
    <Layout>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/team" element={<Team />} />
        </Routes>
      </Suspense>
    </Layout>
  </BrowserRouter>
);

export default App;
