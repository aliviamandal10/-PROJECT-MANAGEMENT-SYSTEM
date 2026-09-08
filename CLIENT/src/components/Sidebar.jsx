import { useEffect, useRef,useState } from 'react'
import { NavLink } from 'react-router-dom'
import MyTasksSidebar from './MyTasksSidebar'
import ProjectSidebar from './ProjectsSidebar'
import {toggleTheme} from "../features/themeSlice";
import {useDispatch} from "react-redux";
import{useNavigate} from "react-router-dom";
//import WorkspaceDropdown from './WorkspaceDropdown'
import { FolderOpenIcon, LayoutDashboardIcon, SettingsIcon, UsersIcon } from 'lucide-react'

const Sidebar = ({ isSidebarOpen, setIsSidebarOpen }) => {
    const [isSettingsOpen,setIsSettingsOpen]= useState(false);
    const dispatch = useDispatch();
    const [isProfileOpen,setIsProfileOpen]=useState(false);
    const navigate = useNavigate();

    const menuItems = [
        { name: 'Dashboard', href: '/', icon: LayoutDashboardIcon },
        { name: 'Projects', href: '/projects', icon: FolderOpenIcon },
        { name: 'Team', href: '/team', icon: UsersIcon },
    ]

    const sidebarRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
                setIsSidebarOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [setIsSidebarOpen]);

    return (
        <div ref={sidebarRef} className={`z-10 bg-white dark:bg-zinc-900 min-w-68 flex flex-col h-screen border-r border-gray-200 dark:border-zinc-800 max-sm:absolute transition-all ${isSidebarOpen ? 'left-0' : '-left-full'} `} >
            {/*<WorkspaceDropdown />*/}
            <hr className='border-gray-200 dark:border-zinc-800' />
            <div className='flex-1 overflow-y-scroll no-scrollbar flex flex-col'>
                <div>
                    <div className='p-4'>
                        {menuItems.map((item) => (
                            <NavLink to={item.href} key={item.name} className={({ isActive }) => `flex items-center gap-3 py-2 px-4 text-gray-800 dark:text-zinc-100 cursor-pointer rounded transition-all  ${isActive ? 'bg-gray-100 dark:bg-zinc-900 dark:bg-gradient-to-br dark:from-zinc-800 dark:to-zinc-800/50  dark:ring-zinc-800' : 'hover:bg-gray-50 dark:hover:bg-zinc-800/60'}`} >
                                <item.icon size={16} />
                                <p className='text-sm truncate'>{item.name}</p>
                            </NavLink>
                        ))}
                        <button
                        onClick={()=>
                        setIsSettingsOpen(!isSettingsOpen)}className='flex w-full items-center gap-3 py-2 px-4 text-gray-800 dark:text-zinc-100 cursor-pointer rounded hover:bg-gray-50 dark:hover:bg-zinc-800/60 transition-all'>
                            <SettingsIcon size={16} />
                            <p className='text-sm truncate'>Settings</p>
                        </button>
                        {isSettingsOpen && (
                            <div className="mt-2 ml-4 rounded-lg bg-gray-100 dark:bg-zinc-800 p-2">

                                <button  onClick={() =>
                               // setIsProfileOpen(! isProfileOpen)}
                               navigate ("/profile")}
                                className="w-full text-left px-3 py-2">
                                    Profile
                                </button>
                                {isProfileOpen && (
  <div className="mt-2 ml-4 p-3 rounded-lg bg-gray-50 dark:bg-zinc-700">
    <p className="text-sm font-medium">User Profile</p>
    <p className="text-xs text-gray-500 dark:text-gray-300 mt-1">
      View and manage your profile information
    </p>
  </div>
)}

                                {/* <button className="w-full text-left px-3 py-2">
                                    Change Password
                                </button> */}

                                <button onClick={() =>
                                dispatch(toggleTheme())}
                                className="w-full text-left px-3 py-2">
                                    Theme
                                </button>

                                {/* <button className="w-full text-left px-3 py-2">
                                    Logout
                                </button> */}
                            </div>
                        )}
                    </div>
                    <MyTasksSidebar />
                    <ProjectSidebar />
                </div>


            </div>

        </div>
    )
}

export default Sidebar
