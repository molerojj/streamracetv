import {Menu, X} from "lucide-react"
import {useState} from "react"
import logo from '../assets/logo.png'
import { navItems } from '../constants'
import { Link } from 'react-router-dom';

const Navbar = () => {
    const [mobileDrawerOpen, setmobileDrawerOpen] = useState(false);
    const toggleNavbar = () => {
        setmobileDrawerOpen(!mobileDrawerOpen);
    }

  return (
    <nav className="sticky top-0 z-50 py-3 backdrop-blur-lg border-b border-neutral-700/80">
        <div className="container px-4 mx-auto relative text-sm">
            <div className="flex justify-between items-center">
                <div className="flex items-center flex-shrink-0">
                    <Link to="/">
                        <img className="h-20 mr-2 cursor-pointer" src={logo} alt="Logo Streamrace TV" />
                    </Link>
                </div>
                <ul className="hidden lg:flex ml-14 space-x-12">
                    {navItems.map((item, index) => (
                        <li key={index}>
                            <a href={item.href} className="hover:text-blue-500 transition-colors">
                                {item.label}
                            </a>
                        </li>
                    ))}
                </ul>
                <div className="hidden lg:flex justify-center space-x-12 items-center">
                    <a href="https://wa.link/8g3t92" target='_blank' className="py-2 px-3 border rounded-md">Contáctanos</a>
                    <a href="https://chat.whatsapp.com/JXdLHJviwpTGOm1lw7jbxb?mode=wwc" target='_blank' className="bg-custom-purple py-2 px-3 rounded-md">Únete al canal de WhatsApp</a>
                    <Link to="/upload" target="_blank" title="Panel Admin">
                    <div className="p-2 rounded-full hover:bg-neutral-800 transition-colors">
                        <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-white hover:text-blue-500"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        >
                        <path d="M20 21v-2a4 4 0 0 0-3-3.87" />
                        <path d="M4 21v-2a4 4 0 0 1 3-3.87" />
                        <circle cx="12" cy="7" r="4" />
                        </svg>
                    </div>
                    </Link>
                </div>
                <div className="lg:hidden md:flex flex-col justify-end">
                    <button onClick={toggleNavbar} >
                        {mobileDrawerOpen ? <X /> : <Menu />}
                    </button>
                </div>
            </div>
            {mobileDrawerOpen && (
                <div className="fixed right-0 z-20 bg-neutral-900 w-full p-12 flex flex-col justify-center items-center lg:hidden">
                    <ul>
                        {navItems.map((item, index) => (
                            <li key={index} className="py-4 text-center">
                                <a href={item.href}>{item.label}</a>
                            </li>
                        ))}
                    </ul>
                    <div className="flex space-x-6">
                        <a href="https://wa.link/8g3t92" className="py-2 px-3 border rounded-md">Contáctanos</a>
                        <a href="https://chat.whatsapp.com/JXdLHJviwpTGOm1lw7jbxb?mode=wwc" className="bg-custom-purple py-2 px-3 rounded-md">Únete al canal de WhatsApp</a>
                    </div>
                </div>
            )}
        </div>
    </nav>
  )
}

export default Navbar