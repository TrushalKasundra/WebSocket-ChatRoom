import React from "react";
import ConnectionManager from "../component/connectionManager"
import { ReactComponent as LogoImage } from "../Assesst/logo.svg"

const Header = () => {
    return (
        <div className="headerStyle">
            <LogoImage width={100} height={100} />
            <ConnectionManager />
        </div>
    )
}
export default Header;