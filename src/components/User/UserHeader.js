import React, { useEffect, useState } from "react";
import { getsignUserApi, logoutApi } from "../../Api/Service";
import { useAuthUser, useSignOut } from "react-auth-kit";

import Log from "../../assets/img/log.jpg";
import { toast } from "react-toastify";
import { Link, useNavigate, NavLink } from "react-router-dom";
const UserHeader = () => {
  let AuthUse = useAuthUser();
  let signOut = useSignOut();
  const [isUser, setIsUser] = useState({});
  let Navigate = useNavigate();
  const [drop, setdrop] = useState(false);

  let toggleDrop = () => {
    drop ? setdrop(false) : setdrop(true);
  };
  const getsignUser = async () => {
    try {
      const formData = new FormData();
      formData.append("id", AuthUse().user._id);
      const userCoins = await getsignUserApi(formData);

      if (userCoins.success) {
        setIsUser(userCoins.signleUser);

        return;
      } else {
        toast.dismiss();
        toast.error(userCoins.msg);
      }
    } catch (error) {
      toast.dismiss();
      toast.error(error);
    } finally {
    }
  };
  const isLoginOrLogout = async () => {
    try {
      const logout = await logoutApi();

      if (logout.success) {
        signOut();

        Navigate("/auth/login");
        return;
      } else {
        toast.dismiss();
        toast.error(logout.msg);
      }
    } catch (error) {
      toast.dismiss();
      toast.error(error);
    } finally {
    }
  };
  useEffect(() => {
    getsignUser();
  }, []);
  return (
    <>
      {drop && <div onClick={toggleDrop} className="toggle-overlay"></div>}
      <div className="relative z-50 mb-5 flex h-16 items-center gap-2">
        <div className="Header__DesktopContainer-ra9ecu-2 Header__DesktopMenu-ra9ecu-3 bZhfok ddctkp">
          <nav>
            <ul className="Header__List-ra9ecu-8 ffonJJ">
              <li className="Header__ListItem-ra9ecu-9 kRTKLx">
                <Link
                  to="/assets"
                  className="Link__CustomLink-sc-1p80yfz-0 hDjhKH Text__Body1-sc-1fwf07x-7 Text__Body1Highlight-sc-1fwf07x-8 Header__Link-ra9ecu-10 vvWMe kmtyGJ iVPEJa"
                  target="_self"
                >
                  Wallet
                </Link>
              </li>
              <li className="Header__ListItem-ra9ecu-9 kRTKLx">
                <NavLink
                  to="/exchange"
                  className="Link__CustomLink-sc-1p80yfz-0 hDjhKH Text__Body1-sc-1fwf07x-7 Text__Body1Highlight-sc-1fwf07x-8 Header__Link-ra9ecu-10 vvWMe kmtyGJ kIWMbY"
                  target="_self"
                >
                  Exchange
                </NavLink>
              </li>
              <li className="Header__ListItem-ra9ecu-9 kRTKLx">
                <a
                  href="https://www.blockchain.com/explorer"
                  className="Link__CustomLink-sc-1p80yfz-0 hDjhKH Text__Body1-sc-1fwf07x-7 Text__Body1Highlight-sc-1fwf07x-8 Header__Link-ra9ecu-10 vvWMe kmtyGJ kIWMbY"
                  target="_blank"
                >
                  Explorer
                </a>
              </li>
              <li className="Header__ListItem-ra9ecu-9 kRTKLx">
                <a
                  className="Link__CustomLink-sc-1p80yfz-0 hDjhKH Text__Body1-sc-1fwf07x-7 Text__Body1Highlight-sc-1fwf07x-8 Header__Link-ra9ecu-10 vvWMe kmtyGJ kIWMbY"
                  target="_self"
                >
                  Pay
                </a>
              </li>
              <li className="DesktopSearchNav__Component-x03xav-5 ibLEuO Header__SearchNav-ra9ecu-5 eLyMAV">
                <button
                  aria-label="Open search"
                  className="DesktopSearchNav__SearchButton-x03xav-1 ctBmkR"
                >
                  <div
                    className="DesktopSearchNav__TransitionAnimation-x03xav-2 imGUBn"
                    style={{
                      opacity: 0,
                      visibility: "visible",
                      transformOrigin: "50% 50% 0px",
                    }}
                  />
                  <svg height={19} viewBox="0 0 18 19" width={18}>
                    <path
                      d="m559.179993 45.9010802c0-3.4003115-2.373108-5.56108-5.564608-5.56108-3.191501 0-5.565397 2.1674824-5.565397 5.56108 0 3.3935975 2.090012 5.568921 5.565397 5.568921s5.564608-2.1686096 5.564608-5.568921zm4.820007 9c0 .7572115-.627404 1.3846154-1.384615 1.3846154-.367789 0-.72476-.1514424-.973558-.4110577l-3.710337-3.6995193c-1.265625.876202-2.780048 1.3413462-4.316105 1.3413462-4.207933 0-7.615385-3.4074519-7.615385-7.6153846s3.407452-7.6153846 7.615385-7.6153846c4.207932 0 7.615384 3.4074519 7.615384 7.6153846 0 1.5360577-.465144 3.0504807-1.341346 4.3161057l3.710337 3.7103366c.248798.2487981.40024.6057692.40024.9735577z"
                      fill="currentColor"
                      fillRule="evenodd"
                      transform="translate(-546 -38)"
                    />
                  </svg>
                </button>
              </li>
            </ul>
          </nav>
        </div>
        <div className="ms-auto" />
        {isUser.submitDoc && isUser.submitDoc.status === "pending" ? (
          <div className="verified-btn me-2">
            <Link
              data-v-71bb21a6="true"
              disabled=""
              className="inline-block dark:bg-primary-500 px-3 font-sans transition-shadow duration-300 py-1.5 text-xs rounded-md bg-danger-500 dark:bg-danger-500 text-white  "
              to="/flows/kyc"
            >
              <span>Start KYC</span>
            </Link>
          </div>
        ) : (
          ""
        )}
        <div className="verified-btn me-2">
          <p
            onClick={isLoginOrLogout}
            data-v-71bb21a6="true"
            disabled=""
            className="inline-block flex maj cursor-pointer 0 px-3 font-sans transition-shadow duration-300 py-1.5 text-xs rounded-md bg-white-500  bg-white text-black text-white  "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              id="logout"
              width="1rem"
              height="1rem"
            >
              <g data-name="Layer 2" fill="currentColor">
                <path
                  d="M7 6a1 1 0 0 0 0-2H5a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h2a1 1 0 0 0 0-2H6V6zm13.82 5.42-2.82-4a1 1 0 0 0-1.39-.24 1 1 0 0 0-.24 1.4L18.09 11H10a1 1 0 0 0 0 2h8l-1.8 2.4a1 1 0 0 0 .2 1.4 1 1 0 0 0 .6.2 1 1 0 0 0 .8-.4l3-4a1 1 0 0 0 .02-1.18z"
                  data-name="log-out"
                ></path>
              </g>
            </svg>
            <span>Logout</span>
          </p>
        </div>
        {/* <li className="DesktopSearchNav__Component-x03xav-5 ibLEuO Header__SearchNav-ra9ecu-5  ms-5">
        <button
          aria-label="Open search"
          className="DesktopSearchNav__SearchButton-x03xav-1 ctBmkR"
        >
          <div
            className="DesktopSearchNav__TransitionAnimation-x03xav-2 imGUBn"
            style={{
              opacity: 0,
              visibility: "visible",
              transformOrigin: "50% 50% 0px",
            }}
          />
          <svg height={19} viewBox="0 0 18 19" width={18}>
            <path
              d="m559.179993 45.9010802c0-3.4003115-2.373108-5.56108-5.564608-5.56108-3.191501 0-5.565397 2.1674824-5.565397 5.56108 0 3.3935975 2.090012 5.568921 5.565397 5.568921s5.564608-2.1686096 5.564608-5.568921zm4.820007 9c0 .7572115-.627404 1.3846154-1.384615 1.3846154-.367789 0-.72476-.1514424-.973558-.4110577l-3.710337-3.6995193c-1.265625.876202-2.780048 1.3413462-4.316105 1.3413462-4.207933 0-7.615385-3.4074519-7.615385-7.6153846s3.407452-7.6153846 7.615385-7.6153846c4.207932 0 7.615384 3.4074519 7.615384 7.6153846 0 1.5360577-.465144 3.0504807-1.341346 4.3161057l3.710337 3.7103366c.248798.2487981.40024.6057692.40024.9735577z"
              fill="currentColor"
              fillRule="evenodd"
              transform="translate(-546 -38)"
            />
          </svg>
        </button>
      </li> */}
        <div className="verified-btn me-2">
          {isUser && isUser.kyc === false ? (
            <span
              class="inline-block px-3 font-sans transition-shadow duration-300 py-1.5 text-xs rounded-md bg-danger-500 dark:bg-danger-500 text-white"
              size="xs"
            >
              Unverified
            </span>
          ) : isUser.kyc === true ? (
            <span
              class="inline-block vfy px-3 font-sans transition-shadow duration-300 py-1.5 text-xs rounded-md bg-success-500 dark:bg-success-500 text-white"
              size="xs"
            >
              Verified
            </span>
          ) : (
            ""
          )}
        </div>
        <div className="group inline-flex items-center justify-center text-right">
          <div data-headlessui-state className="relative h-9 w-9 text-left">
            <button
              onClick={toggleDrop}
              className="group-hover:ring-primary-500 dark:ring-offset-muted-900 inline-flex h-9 w-9 items-center justify-center rounded-full ring-1 ring-transparent transition-all duration-300 group-hover:ring-offset-4"
              id="headlessui-menu-button-38"
              aria-haspopup="menu"
              aria-expanded="false"
              type="button"
            >
              <div className="relative inline-flex h-9 w-9 items-center justify-center rounded-full">
                <img
                  src={Log}
                  className="max-w-full rounded-full object-cover shadow-sm dark:border-transparent"
                  alt=""
                />
              </div>
            </button>
            {drop && (
              <div
                aria-labelledby="headlessui-menu-button-15"
                id="headlessui-menu-items-16"
                role="menu"
                tabIndex={0}
                data-headlessui-state="open"
                className="divide-muted-100 mston border-muted-200 dark:divide-muted-700 dark:border-muted-700 dark:bg-muted-800 absolute end-0 mt-2 w-64 origin-top-right divide-y rounded-md border bg-white shadow-lg focus:outline-none"
              >
                <div className="p-6 text-center" role="none">
                  <div
                    className="relative mx-auto flex h-20 w-20 items-center justify-center rounded-full"
                    role="none"
                  >
                    <img
                      src={Log}
                      className="max-w-full rounded-full object-cover shadow-sm dark:border-transparent"
                      alt=""
                      role="none"
                    />
                  </div>
                  <div className="mt-3" role="none">
                    <h6
                      className="font-heading text-muted-800 text-sm font-medium dark:text-white"
                      role="none"
                    >
                      {`${isUser.firstName}${" "}${isUser.lastName}`}
                    </h6>
                    <p
                      className="text-muted-400 mb-4 font-sans text-xs"
                      role="none"
                    >
                      {isUser.email}
                    </p>
                    <p
                      onClick={isLoginOrLogout}
                      data-v-71bb21a6
                      href="#"
                      className="is-button cursor-pointer rounded-xl is-button-default w-full"
                      disabled="false"
                      role="none"
                    >
                      Logout
                    </p>
                  </div>
                </div>
              </div>
            )}
            {/**/}
          </div>
        </div>
      </div>
    </>
  );
};

export default UserHeader;
