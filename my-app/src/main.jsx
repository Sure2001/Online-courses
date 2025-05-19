import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { CartProvider } from './cartpages/CartContext.jsx';
import { CourseProvider } from './assets/CourseContext.jsx';

createRoot(document.getElementById('root')).render(
   <CourseProvider>
     <StrictMode>
       <CartProvider>
         <App />
       </CartProvider>
     </StrictMode>
   </CourseProvider>
);
