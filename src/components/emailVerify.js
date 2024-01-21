import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import success from "../assets/img/success.png";
import styles from "./styles.module.css";
import { verifyEmailApi } from "../Api/Service";
import { toast } from "react-toastify";
import Loading from "../assets/img/loading.gif";

const EmailVerify = () => {
  const [validUrl, setValidUrl] = useState(false);
  const [header, setHeader] = useState(false);
  const param = useParams();
  useEffect(() => {
    //
    const verifyEmailUrl = async (e) => {
      let data = { id: param.id, token: param.token };
      try {
        const updateHeader = await verifyEmailApi(data);

        if (updateHeader.success) {
          setHeader(updateHeader.msg);
          setValidUrl(true);
        } else {
          setHeader(updateHeader.msg);
          setValidUrl(false);
        }
      } catch (error) {
        toast.dismiss();
        toast.error(
          error?.data?.msg || error?.message || "Something went wrong"
        );
      } finally {
      }
    };
    verifyEmailUrl();
    //
  }, [param]);

  return (
    <>
      {validUrl ? (
        <div className={styles.container}>
          <img src={success} alt="success_img" className={styles.success_img} />
          <h1 className={styles.verified}>Email verified successfully</h1>
          <Link to="/auth/login">
            <button className={styles.green_btn}>Login</button>
          </Link>
        </div>
      ) : (
        <div>
          {header ? (
            <h1
              style={{
                fontSize: "25px",
                marginLeft: "30px",
                marginTop: "30px",
              }}
            >
              {header}
            </h1>
          ) : (
            <div className="fulla">
              <img src={Loading} />
            </div>
          )}
        </div>
      )}{" "}
    </>
  );
};

export default EmailVerify;
