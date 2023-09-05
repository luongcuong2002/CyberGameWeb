import React, { useState } from "react";
import styles from "./signin.module.scss";
import { useNavigate } from "react-router-dom";
import { PiWarningCircleBold } from "react-icons/pi";
import clsx from "clsx";
import Loader from "../../components/Loader";

const SignIn = () => {
  let navigate = useNavigate();

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [warning, setWarning] = useState("");

  const [waitingForServer, setWaitingForServer] = useState(false);

  const onClickSignInButton = () => {
    if (!userName) {
      return setWarning("Tên đăng nhập không được để trống!");
    }
    if (!password) {
      return setWarning("Mật khẩu không được để trống!");
    }

    setWarning("");
    setWaitingForServer(true);

    console.log("User: " + userName);
    console.log("Pass: " + password);

    setTimeout(() => {
      setWaitingForServer(false);
    }, 2000);
  };

  const onUserNameChange = (event) => {
    const inputValue = event.target.value.toUpperCase();
    const regex = /^[a-zA-Z0-9]+$/;

    if (regex.test(inputValue) || inputValue == "") {
      setUserName(inputValue);
    }
  };

  const onPasswordChange = (event) => {
    const inputValue = event.target.value;
    setPassword(inputValue);
  };

  return (
    <div id={styles.root}>
      <div className={styles.signInContainer}>
        <h1 className={styles.title}>Đăng nhập</h1>
        <div className={styles.signInForm}>
          <div className={styles.inputGroup}>
            <label className={styles.inputLabel}>Tên người dùng</label>
            <input
              className={clsx(
                styles.inputCell,
                warning && !userName && styles.inputWarning
              )}
              aria-invalid="false"
              type="text"
              placeholder="Nhập tên người dùng"
              autoCorrect="off"
              value={userName}
              onChange={onUserNameChange}
            />
          </div>
          <div className={styles.inputGroup}>
            <label className={styles.inputLabel}>Mật khẩu</label>
            <input
              className={clsx(
                styles.inputCell,
                warning && !password && styles.inputWarning
              )}
              aria-invalid="false"
              type="password"
              placeholder="Nhập mật khẩu"
              autoCorrect="off"
              value={password}
              onChange={onPasswordChange}
            />
          </div>
          <>
            {warning && (
              <div className={styles.warningBox}>
                <PiWarningCircleBold size={20} color="white" />
                <p className={styles.warningText}>{warning}</p>
              </div>
            )}
          </>
          <button className={styles.signInButton} onClick={onClickSignInButton}>
            {waitingForServer ? <Loader /> : "Đăng nhập"}
          </button>
          <p className={styles.forgotPasswordText}>Quên mật khẩu?</p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
