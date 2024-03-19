import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
function RootLayout() {
    const userId = useSelector((state) => state.userId);
    const navigate = useNavigate();

  return (
    <div className="root-layout">
        <header className="header">
            <nav>
                <h1 className='home-nav'onClick={() => navigate('home')}>National Parks</h1>
                
                {!userId &&
                <NavLink to='/'>Login</NavLink>
                }

                {userId &&
                <NavLink to='home'>Home</NavLink>
                }
                
                {userId &&
                <NavLink to='parks'>Parks</NavLink>
                }


                {userId &&
                <NavLink to='map'>Map</NavLink>
                }

                {userId &&
                <NavLink to='profile'>Profile</NavLink> 
                }
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