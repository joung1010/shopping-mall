import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import Products from "./component/products/Products";
import Carts from "./page/carts/Carts";
import NewProduct from "./page/newProduct/NewProduct";
import ProductDetail from "./page/productDetail/ProductDetail";
import Home from "./page/home/Home";
import NotFound from "./page/notFound/NotFound";
import ProtectedRoute from "./page/common/ProtectedRoute";

const root = ReactDOM.createRoot(document.getElementById('root'));
const router = createBrowserRouter([
    {
        path:'/',
        element:<App/>,
        errorElement: <NotFound/>,
        children: [
            {index:true,element:<Home/>},
            {path:'/products',element: <Products/>},
            {path:'/products/new',element:
            <ProtectedRoute requireAdmin>
                <NewProduct/>
            </ProtectedRoute>
            },
            {path:'/products/:id',element: <ProductDetail/>},
            {path:'/carts',element:
                    <ProtectedRoute>
                        <Carts/>
                    </ProtectedRoute>
                    },
        ],
    }
]);

root.render(
  <React.StrictMode>
      <RouterProvider router={router}/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
