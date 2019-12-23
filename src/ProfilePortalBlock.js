import { Component } from "react";
import ReactDOM from "react-dom";

class ProfilePortalBlock extends Component {
    render() {
        return ReactDOM.createPortal(
            this.props.children,
            document.getElementById("profile")
        );
    }
}

export default ProfilePortalBlock;
