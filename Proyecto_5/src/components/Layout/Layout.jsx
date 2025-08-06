import { Outlet } from "react-router-dom"
import Header from "./Header"
import { Toolbar } from "@mui/material"; 

const Layout=()=>{
    return(
        <>
        <Header />
         <Toolbar /> {/* Espacio para el AppBar */}
            <main>
                <Outlet/>
            </main>
        
        </>
    )
}

export default Layout