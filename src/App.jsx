import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import {useAuthState} from 'react-firebase-hooks/auth';
import {auth} from './firebase';
import Admin from './components/Admin'
import SignIn from './components/SignIn'
import Home from './components/Home'
import Navigation from './components/Navigation';

function App() {
  const [user] = useAuthState(auth);

  return (  
    <Router>
      <div className="
        flex
        flex-col
        bg-slate-200
        min-h-screen
      ">
        <Navigation />
        <main className="
          flex
          items-center
          justify-center
          min-h-screen
          p-6
        ">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sign-in" element={<SignIn />} />
            <Route 
              path="/admin"
              element={user ? <Admin /> : <Navigate to="/sign-in" />}
            />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
