import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

function PageTransition({ children }) {
  const location = useLocation();
  const [key, setKey] = useState(location.pathname);

  useEffect(() => {
    setKey(location.pathname);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  return (
    <div key={key} className="page-enter">
      {children}
    </div>
  );
}

export default PageTransition;