import { useState } from 'react';
import './VerticalMenu.css';

const VerticalMenu = () => {
  const [activeRoles, setActiveRoles] = useState([]);

  const handleToggle = (role) => {
    if (activeRoles.includes(role)) {
      setActiveRoles(activeRoles.filter(r => r !== role)); // Đóng menu khi ấn lại vào menu đã mở
    } else {
      setActiveRoles([...activeRoles, role]); // Mở menu mới khi ấn vào menu chưa mở
    }
  };

  const isRoleActive = (role) => {
    return activeRoles.includes(role);
  };

  return (
    <div id="left">
      <div id="danhmuc" className="danhmuc">
        <ul>
          <li>
            <div
              className="flex-toggle"
              style={{ display: 'flex', alignItems: 'center' }}
              onClick={() => handleToggle(0)}
            >
              <div data-toggle="" role="0" className="box-i">
                <i className="fa fa-caret-right" aria-hidden="true"></i>
              </div>
              <a href="pa-te">PATE</a>
            </div>
            <ul
              data-role="0"
              style={{
                display: isRoleActive(0) ? 'block' : 'none',
                paddingLeft: '20px'
              }}
            >
              <li>
                <div
                  className="flex-toggle"
                  style={{ display: 'flex', alignItems: 'center' }}
                >
                  <div data-toggle="" role="0" className="box-i">
                    <i className="fa fa-caret-right" aria-hidden="true"></i>
                  </div>
                  <a href="cho-meo">Pate cho mèo</a>
                </div>
              </li>
              <li>
                <div
                  className="flex-toggle"
                  style={{ display: 'flex', alignItems: 'center' }}
                >
                  <div data-toggle="" role="0" className="box-i">
                    <i className="fa fa-caret-right" aria-hidden="true"></i>
                  </div>
                  <a href="cho-cho">Pate cho chó</a>
                </div>
              </li>
            </ul>
          </li>
        </ul>

        <ul>
          <li>
            <div
              className="flex-toggle"
              style={{ display: 'flex', alignItems: 'center' }}
              onClick={() => handleToggle(2)}
            >
              <div data-toggle="" role="0" className="box-i">
                <i className="fa fa-caret-right" aria-hidden="true"></i>
              </div>
              <a href="pa-te">Thức ăn hạt</a>
            </div>
            <ul
              data-role="2"
              style={{
                display: isRoleActive(2) ? 'block' : 'none',
                paddingLeft: '20px'
              }}
            >
              <li>
                <div
                  className="flex-toggle"
                  style={{ display: 'flex', alignItems: 'center' }}
                >
                  <div data-toggle="" role="0" className="box-i">
                    <i className="fa fa-caret-right" aria-hidden="true"></i>
                  </div>
                  <a href="cho-meo">Hạt cho mèo</a>
                </div>
              </li>
              <li>
                <div
                  className="flex-toggle"
                  style={{ display: 'flex', alignItems: 'center' }}
                >
                  <div data-toggle="" role="0" className="box-i">
                    <i className="fa fa-caret-right" aria-hidden="true"></i>
                  </div>
                  <a href="cho-cho">Hạt cho chó</a>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default VerticalMenu;
