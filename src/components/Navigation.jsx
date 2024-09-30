import {Link} from 'react-router-dom'
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';

export default function Navigation() {
    const [user] = useAuthState(auth);

    return (
        <nav className="bg-blue-500 p-4">
            <ul className="flex space-x-4">
                <li>
                    <Link to="/" className="text-white hover:underline">Home</Link>
                </li>

                {user ? (
                    <>
                        <li>
                            <Link to="/admin" className="text-white hover:underline">Admin</Link>
                        </li>
                        <li>
                            <button onClick={() => signOut(auth)} className="text-white hover:underline">Sign Out</button>
                        </li>
                    </>
                ) : (
                    <li>
                        <Link to="/sign-in" className="text-white hover:underline">Sign In</Link>
                    </li>
                )}

                {/* <li>
                    <Link to="/sign-in" className="text-white hover:underline">Sign In</Link>
                </li> */}
            </ul>
        </nav>
    )
}
