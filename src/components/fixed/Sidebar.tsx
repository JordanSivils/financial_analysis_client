import { Link } from "react-router-dom";
import '../../assets/sidebar.scss'

const Sidebar = () => {

  return ( 
    <div className="sidenav">
      <div>
        <h1 className="company-name"><Link to={`/`}>Moore Equine</Link></h1>
      </div>
      <ul>
        <li><Link to={`/upload`}>Add Data</Link></li>
        <li><Link to={`/data/view`}>View Reports</Link></li>
      </ul>
      
    </div>
   );
}
 
export default Sidebar;