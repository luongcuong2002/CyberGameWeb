import React from "react";
import styles from "./free_account.module.scss";
import clsx from "clsx";

const FreeAccount = () => {
    return <div id={styles.freeAccountContainer}>
        <label className={styles.neonText}>Tài khoản miễn phí</label>
        <p className={styles.freeAccountDescription}>
            Tài khoản miễn phí là tài khoản mà bạn có thể sử dụng để đăng nhập vào máy trạm mà không cần phải trả bất kỳ khoản phí nào.
        </p>
        <div className={clsx(styles.block, styles.glow)}>
            <div className={styles.tableContainer}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Tài khoản</th>
                            <th>Mật khẩu</th>
                            <th>Số giờ chơi</th>
                            <th>Thời gian đăng nhập</th>
                            <th>Ngày</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>FREES1</td>
                            <td>tewerrwe</td>
                            <td>2h</td>
                            <td>07:00 đến 08:00</td>
                            <td>28-02-2024</td>
                        </tr>
                        <tr>
                            <td>FREES2</td>
                            <td>vcvxcsda</td>
                            <td>1h</td>
                            <td>07:00 đến 08:00</td>
                            <td>28-02-2024</td>
                        </tr>
                        <tr>
                            <td>FREES2</td>
                            <td>vcvxcsda</td>
                            <td>1h</td>
                            <td>07:00 đến 08:00</td>
                            <td>28-02-2024</td>
                        </tr>
                        <tr>
                            <td>FREES2</td>
                            <td>vcvxcsda</td>
                            <td>1h</td>
                            <td>07:00 đến 08:00</td>
                            <td>28-02-2024</td>
                        </tr>
                        <tr>
                            <td>FREES2</td>
                            <td>vcvxcsda</td>
                            <td>1h</td>
                            <td>07:00 đến 08:00</td>
                            <td>28-02-2024</td>
                        </tr>
                        <tr>
                            <td>FREES2</td>
                            <td>vcvxcsda</td>
                            <td>1h</td>
                            <td>07:00 đến 08:00</td>
                            <td>28-02-2024</td>
                        </tr>
                        <tr>
                            <td>FREES2</td>
                            <td>vcvxcsda</td>
                            <td>1h</td>
                            <td>07:00 đến 08:00</td>
                            <td>28-02-2024</td>
                        </tr>
                        <tr>
                            <td>FREES2</td>
                            <td>vcvxcsda</td>
                            <td>1h</td>
                            <td>07:00 đến 08:00</td>
                            <td>28-02-2024</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
}

export default FreeAccount;