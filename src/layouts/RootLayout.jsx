import { NavLink, Outlet, useNavigate } from "react-router-dom";

function RootLayout() {
    const navigate = useNavigate();

  return (
    <div className="root-layout">
        <header className="header">
            <nav>
                <h1 className='home-nav'onClick={() => navigate('home')}>National Parks</h1>
                <NavLink to='/'>Login</NavLink>

                {/* here i want to add a conditional render to show these other NavLink once a user is logged in */}

                <NavLink to='parks'>Parks</NavLink>
                <NavLink to='home'>Home</NavLink>
                <NavLink to='map'>Map</NavLink>
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