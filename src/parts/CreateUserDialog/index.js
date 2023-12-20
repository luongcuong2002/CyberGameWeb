import React from "react";
import styles from "./create_user_dialog.module.scss";
import Popup from "reactjs-popup";

const CreateUserDialog = ({ setShowDialog }) => {

    const closeDialog = () => {
        setShowDialog(false);
    }

    return <Popup
        modal
        open
        overlayStyle={{ background: "#00000080" }}
        onClose={closeDialog}
    >
        <div id={styles.root}>

        </div>
    </Popup>
}

export default CreateUserDialog;
