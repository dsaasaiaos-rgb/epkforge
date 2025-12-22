import Home from './pages/Home';
import Search from './pages/Search';
import Explore from './pages/Explore';
import __Layout from './Layout.jsx';


export const PAGES = {
    "Home": Home,
    "Search": Search,
    "Explore": Explore,
}

export const pagesConfig = {
    mainPage: "Home",
    Pages: PAGES,
    Layout: __Layout,
};