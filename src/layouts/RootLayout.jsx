import { NavLink, Outlet, useNavigate } from "react-router-dom";

function RootLayout() {
    const navigate = useNavigate();

  return (
    <div className="roote-layout">
        <header className="header">
            <nav>
                <h1>National Parks</h1>
                <NavLink to='/'>Home</NavLink>
                <NavLink to='map'>Map</NavLink>
                <NavLink to='parks'>Parks</NavLink>
                <NavLink to='profile'>Profile</NavLink>
            </nav>
        </header>

        <main>
            <Outlet/>
        </main>

        <div className="footer">
            <footer>
                <nav>
                    <NavLink to='contact'>Contact</NavLink>
                    <NavLink to='faqs'>FAQ's</NavLink>
                </nav>
            </footer>
        </div>
    </div>
  )
}

export default RootLayout