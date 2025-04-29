// // src/components/Sidebar.jsx
// import { Link } from "react-router-dom";
// import { useState } from "react";
// import { Collapse } from "react-bootstrap";
// import './Sidebar.css'; // optional: for custom styles

// const Sidebar = () => {
//   const [openCategories, setOpenCategories] = useState(false);
//   const [openAC, setOpenAC] = useState(false);
//   const [openNonAC, setOpenNonAC] = useState(false);

//   return (
//     <div className="bg-dark text-white  sidebar p-3" style={{ width: "220px" }}>
//       <h4 className="text-light">🚌 Bus Admin</h4>
//       <ul className="nav flex-column mt-4">
//         <li className="nav-item mb-2">
//           <Link to="/admin/dashboard" className="nav-link text-white">
//             <i className="bi bi-speedometer2 me-2"></i> Dashboard
//           </Link>
//         </li>

//         {/* Categories Dropdown */}
//         <li className="nav-item mb-2">
//           <span
//             onClick={() => setOpenCategories(!openCategories)}
//             className="nav-link text-white d-flex align-items-center"
//             style={{ cursor: "pointer" }}
//           >
//             <i className="bi bi-card-list me-2"></i> Categories
//             <i className={`bi ms-auto ${openCategories ? "bi-chevron-up" : "bi-chevron-down"}`}></i>
//           </span>

//           <Collapse in={openCategories}>
//             <ul className="list-unstyled ps-3 mt-1">
//               {/* AC */}
//               <li>
//                 <span
//                   onClick={() => setOpenAC(!openAC)}
//                   className="text-white d-flex align-items-center ms-3"
//                   style={{ cursor: "pointer" }}
//                 >
//                   AC
//                   <i className={`bi ms-auto ${openAC ? "bi-chevron-up" : "bi-chevron-down"}`}></i>
//                 </span>
//                 <Collapse in={openAC}>
//                   <ul className="list-unstyled ps-3 mt-1">
//                     <li>
//                       <Link to="/admin/categories/ac/2+1-sleeper" className="text-white text-decoration-none">
//                         2+1 Sleeper
//                       </Link>
//                     </li>
//                     <li>
//                       <Link to="/admin/categories/ac/2+2-semi-sleeper" className="text-white text-decoration-none">
//                         2+2 Semi Sleeper
//                       </Link>
//                     </li>
//                   </ul>
//                 </Collapse>
//               </li>

//               {/* Non AC */}
//               <li className="mt-2">
//                 <span
//                   onClick={() => setOpenNonAC(!openNonAC)}
//                   className="text-white d-flex align-items-center ms-3"
//                   style={{ cursor: "pointer" }}
//                 >
//                   Non AC
//                   <i className={`bi ms-auto ${openNonAC ? "bi-chevron-up" : "bi-chevron-down"}`}></i>
//                 </span>
//                 <Collapse in={openNonAC}>
//                   <ul className="list-unstyled ps-3 mt-1">
//                     <li>
//                       <Link to="/admin/categories/non-ac/2+1-sleeper" className="text-white text-decoration-none">
//                         2+1 Sleeper
//                       </Link>
//                     </li>
//                     <li>
//                       <Link to="/admin/categories/non-ac/2+2-semi-sleeper" className="text-white text-decoration-none">
//                         2+2 Semi Sleeper
//                       </Link>
//                     </li>
//                   </ul>
//                 </Collapse>
//               </li>
//             </ul>
//           </Collapse>
//         </li>

//         <li className="nav-item mb-2">
//           <Link to="/admin/buses" className="nav-link text-white">
//             <i className="bi bi-bus-front me-2"></i> AddBuses
//           </Link>
//         </li>
//         <li className="nav-item mb-2">
//           <Link to="/admin/offers" className="nav-link text-white">
//             <i className="bi bi-ticket-perforated me-2"></i> Offers
//           </Link>
//         </li>
//         <li className="nav-item mb-2">
//           <Link to="/admin/users" className="nav-link text-white">
//             <i className="bi bi-people me-2"></i> Users
//           </Link>
//         </li>
//       </ul>
//     </div>
//   );
// };

// export default Sidebar;
// src/components/Sidebar.jsx
import { Link } from "react-router-dom";
import { useState } from "react";
import { Collapse } from "react-bootstrap";
import './Sidebar.css';

const Sidebar = () => {
  const [openCategories, setOpenCategories] = useState(false);

  return (
    <div className="bg-dark text-white sidebar p-3" style={{ width: "220px" }}>
      <h4 className="text-light">NAVIGATION</h4>
      <ul className="nav flex-column mt-4">
        <li className="nav-item mb-2">
          <Link to="dashboard" className="nav-link text-white">
            <i className="bi bi-speedometer"></i> Dashboard
          </Link>
        </li>

        {/* Categories Dropdown */}
        <li className="nav-item mb-2">
          <span
            onClick={() => setOpenCategories(!openCategories)}
            className="nav-link text-white d-flex align-items-center"
            style={{ cursor: "pointer" }}
          >
            <i className="bi bi-card-list me-2"></i> Categories
            <i className={`bi ms-auto ${openCategories ? "bi-chevron-up" : "bi-chevron-down"}`}></i>
          </span>

          <Collapse in={openCategories}>
            <ul className="list-unstyled ps-3 mt-1">
              <li>
                <Link to="/admin/categories/ac" className="text-white text-decoration-none">
                  Categories
                </Link>
              </li>
              <li className="mt-2">
                <Link to="/admin/categories/non-ac" className="text-white text-decoration-none">
                 Product
                </Link>
              </li>
            </ul>
          </Collapse>
        </li>

        {/* <li className="nav-item mb-2">
          <Link to="/admin/buses" className="nav-link text-white">
            <i className="bi bi-bus-front me-2"></i> AddBuses
          </Link>
        </li>
        <li className="nav-item mb-2">
          <Link to="/admin/offers" className="nav-link text-white">
            <i className="bi bi-ticket-perforated me-2"></i> Offers
          </Link>
        </li> */}
        <li className="nav-item mb-2">
          <Link to="user" className="nav-link text-white">
            <i className="bi bi-people me-2"></i> Users
          </Link>
        </li>
        <li className="nav-item mb-2">
          <Link to="order" className="nav-link text-white">
            <i className="bi bi-people me-2"></i> Orders
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
