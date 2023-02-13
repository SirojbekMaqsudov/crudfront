import React from "react";
import Login from "./Pages/Login";

import './App.css'
import 'react-toastify/dist/ReactToastify.css'
import {QueryClient, QueryClientProvider} from "react-query";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Dashboard from "./Pages/Dashboard";
import {AuthProvider} from "./context/AuthContext";
import Layout from "./Components/Layout";
import RequireAuth from "./Components/RequireAuth";
import LogOut from "./Pages/LogOut";

const queryClient = new QueryClient({
    // defaultOptions: {
    //     queries: {
    //         refetchOnWindowFocus: false,
    //         refetchOnmount: true,
    //         refetchOnReconnect: false,
    //         retry: 1,
    //         staleTime: 5 * 1000,
    //     },
    // },
})

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <AuthProvider>
                <BrowserRouter>
                    <Routes>
                        <Route path={'/'} element={<Layout />}>
                            <Route path={'/login'} element={<Login />}/>
                            <Route path={'/logout'} element={<LogOut />}/>
                            <Route element={<RequireAuth allowRole={'ADMIN'}/>}>
                                <Route path={'/'} element={<Dashboard />}/>
                            </Route>
                        </Route>
                    </Routes>
                </BrowserRouter>
            </AuthProvider>
        </QueryClientProvider>
    );
}

export default App;