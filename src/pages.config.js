import AdminClaims from './pages/AdminClaims';
import ArtistProfile from './pages/ArtistProfile';
import Build from './pages/Build';
import Dashboard from './pages/Dashboard';
import DashboardEdit from './pages/DashboardEdit';
import DashboardExports from './pages/DashboardExports';
import Explore from './pages/Explore';
import Home from './pages/Home';
import Pricing from './pages/Pricing';
import PrintExport from './pages/PrintExport';
import Search from './pages/Search';
import __Layout from './Layout.jsx';


export const PAGES = {
    "AdminClaims": AdminClaims,
    "ArtistProfile": ArtistProfile,
    "Build": Build,
    "Dashboard": Dashboard,
    "DashboardEdit": DashboardEdit,
    "DashboardExports": DashboardExports,
    "Explore": Explore,
    "Home": Home,
    "Pricing": Pricing,
    "PrintExport": PrintExport,
    "Search": Search,
}

export const pagesConfig = {
    mainPage: "Home",
    Pages: PAGES,
    Layout: __Layout,
};