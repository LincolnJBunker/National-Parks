import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import PleaseLogin from "../components/PleaseLogin";
function RootLayout() {
    const userId = useSelector((state) => state.userId);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const sessionCheck = async () => {
        const res = await axios.get('/api/session-check')
        if (res.data.success) {
            dispatch({
                type: 'USER_AUTH',
                payload: {
                        userId: res.data.userId,
                        username: res.data.username,
                        password: res.data.password,
                        bio: res.data.bio,
                        userPic: res.data.userPic
                    }
            });
        } else {
                navigate('/');
            };
    };

    useEffect(() => {
        sessionCheck();
    }, []);

  return (
    <div className="root-layout">
        <header className="header">
            <nav>
                <h1 style={{marginLeft: '8px'}} className='home-nav'onClick={() => navigate('home')}>NatureNetwork</h1>
                
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
                <NavLink to='profile/:profileId' onClick={()=>dispatch({type: 'SET_PROFILE', payload: null})}>Profile</NavLink> 
                }
            </nav>
        </header>

        <main>
            {<Outlet/>}
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