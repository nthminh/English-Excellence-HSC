import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Inquiry } from './pages/Inquiry';
import { Resources } from './pages/Resources';
import { Reviews } from './pages/Reviews';
import { Blog } from './pages/Blog';
import { About } from './pages/About';
import { FAQ } from './pages/FAQ';
import { LeaveReview } from './pages/LeaveReview';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/inquiry" element={<Inquiry />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/about" element={<About />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/leave-review" element={<LeaveReview />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
