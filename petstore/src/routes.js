/* eslint-disable import/no-anonymous-default-export */
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Home from './pages/Home/index'
import Login from './pages/Login'
import Product from './pages/Product'
import Products from './pages/Products'
import RegularProducts from './pages/RegularProducts'
import Register from './pages/Register'
import Cart from './pages/Cart'
import Exeption from './pages/Error'

export default function (){
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/login" exact component={Login} />
                <Route path="/product/:id" exact component={Product} />
                <Route path="/products/:category" exact component={Products} />
                <Route path="/products/list/:string" exact component={RegularProducts} />
                <Route path="/register" exact component={Register} />
                <Route path="/cart" exact component={Cart} />
                <Route path="/" component={Exeption} />
            </Switch>
        </BrowserRouter>
    )
}
