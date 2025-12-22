import Home from './pages/Home';
import Search from './pages/Search';
import Explore from './pages/Explore';
import Build from './pages/Build';
import ArtistProfile from './pages/ArtistProfile';
import Dashboard from './pages/Dashboard';
import DashboardEdit from './pages/DashboardEdit';
import DashboardExports from './pages/DashboardExports';
import PrintExport from './pages/PrintExport';
import AdminClaims from './pages/AdminClaims';
import __Layout from './Layout.jsx';


export const PAGES = {
    "Home": Home,
    "Search": Search,
    "Explore": Explore,
    "Build": Build,
    "ArtistProfile": ArtistProfile,
    "Dashboard": Dashboard,
    "DashboardEdit": DashboardEdit,
    "DashboardExports": DashboardExports,
    "PrintExport": PrintExport,
    "AdminClaims": AdminClaims,
}

export const pagesConfig = {
    mainPage: "Home",
    Pages: PAGES,
    Layout: __Layout,
};