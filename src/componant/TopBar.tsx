import { Link, useNavigate } from "react-router-dom"
import logo from '../../public/assets/Logo.png'
import LogoutIcon from '@mui/icons-material/Logout';
import { Button } from "@mui/material";
import { useUserContext } from "../lib/context/AuthContext";
import { signOutFn } from "../lib/api";

const TopBar = () => {

    const { user } = useUserContext()
    const navigate = useNavigate()

    return (
        <section className='topbar flex flex-between'>
            <div className='flex-between py-4 px-4'>
                <Link
                    className="flex gap-3 items-center"
                    to='/'
                >
                    <img src={logo} alt='logo' width={70} height={70} />
                    <h2 className=" border-l body-bold" >sapologram</h2>
                </Link>
            </div>
            <div className="flex">
                <Link to={`/profile/${user.id}`} className="flex-center gap-3">
                    <img src={user.imageUrl} className="h-8 w-8 rounded-full" />
                </Link>
                <Button onClick={() => {
                    const isUserSignOut: any = signOutFn()
                    isUserSignOut ? navigate('sign-in') : navigate('')
                }}  className="flex gap-4"  >
                    <LogoutIcon style={{ color: "purple" }} onClick={signOutFn} />
                </Button>
            </div>
        </section>
    )
}

export default TopBar
