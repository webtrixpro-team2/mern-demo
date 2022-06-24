import { NavLink} from "react-router-dom";

const LSide = () => {
    return (
        <div className="d-flex flex-column flex-shrink-0 p-3 text-dark" style={{ width: 280, minHeight: "calc(100vh - 112px)", backgroundColor: "#f2f2f2"}}>
            <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-dark text-decoration-none">
                <svg className="bi me-2" width={40} height={32}><use xlinkHref="#bootstrap" /></svg>
                <span className="fs-4">Sidebar</span>
            </a>
            <hr />
            <ul className="nav nav-pills flex-column mb-auto">
                <li className="nav-item">
                    <NavLink to="/" className="nav-link">Crawl</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to="/about" className="nav-link">About</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to="/terms-condition" className="nav-link">Terms Condition</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to="/privacy-policy" className="nav-link">Privacy Policy</NavLink>
                </li>
            </ul>
        </div>
    );
}

export default LSide;