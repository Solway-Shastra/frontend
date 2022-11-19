/* eslint-disable react/no-unknown-property */
import styled from "styled-components";
import { Search, Globe, Menu, User } from "react-feather";
import Image from "next/image";
import { useRef, useEffect, useState } from "react";
import DatePicker from "./DatePicker";
import ThemeToggle from "./ThemeToggle";
import { useMediaQuery } from "@react-hook/media-query";
import { useRouter } from "next/router";
import MobileNav from "./MobileNav";
export default function Header({ placeholder }) {
  const router = useRouter();

  const navRef = useRef(null);
  const headerRef = useRef(null);
  const [scrolled, setScrolled] = useState(false);
  const [inputFocus, setInputFocus] = useState(false);
  const primaryLocationRef = useRef(null);
  const secondaryLocationRef = useRef(null);

  const isSmallScreen = useMediaQuery("(max-width: 36rem)");

  //form data

  const [location, setLocation] = useState("");
  const [checkInDate, setCheckInDate] = useState(new Date());
  const [checkOutDate, setCheckOutDate] = useState(new Date());
  const [numberOfAdults, setNumberOfAdults] = useState(0);
  const [numberOfChildren, setNumberOfChildren] = useState(0);

  const openDatePicker = () => {
    setInputFocus(true);
    document.body.style.overflow = "hidden";
    setTimeout(() => {
      if (!isSmallScreen && secondaryLocationRef.current) {
        secondaryLocationRef.current.focus();
      }
    }, 10);
  };
  const closeDatePicker = () => {
    setInputFocus(false);
    setLocation("");
    setNumberOfChildren(0);
    setNumberOfAdults(0);
    setCheckInDate(new Date());
    setCheckOutDate(new Date());
    document.body.style.overflow = "initial";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!location) {
      primaryLocationRef.current.focus();
      return;
    }
    router.push({
      pathname: "/search",
      query: {
        location: location,
        checkIn: checkInDate.toISOString(),
        checkOut: checkOutDate.toISOString(),
        guests: numberOfChildren + numberOfAdults,
      },
    });
    setTimeout(() => closeDatePicker(), 100);
  };

  useEffect(() => {
    const handleClick = (event) => {
      if (!headerRef.current.contains(event.target)) {
        closeDatePicker();
      }
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <HeaderSection
      ref={headerRef}
      className={[
        scrolled || inputFocus || router.pathname !== "/" ? "scrolled" : null,
        inputFocus ? "inputFocus" : null,
      ]}
    >
      <div className="headerInner">
        <div className="logo" onClick={() => router.push("/")}>
        <svg width="35" height="35" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.07926 0.222253C7.31275 -0.007434 7.6873 -0.007434 7.92079 0.222253L14.6708 6.86227C14.907 7.09465 14.9101 7.47453 14.6778 7.71076C14.4454 7.947 14.0655 7.95012 13.8293 7.71773L13 6.90201V12.5C13 12.7761 12.7762 13 12.5 13H2.50002C2.22388 13 2.00002 12.7761 2.00002 12.5V6.90201L1.17079 7.71773C0.934558 7.95012 0.554672 7.947 0.32229 7.71076C0.0899079 7.47453 0.0930283 7.09465 0.32926 6.86227L7.07926 0.222253ZM7.50002 1.49163L12 5.91831V12H10V8.49999C10 8.22385 9.77617 7.99999 9.50002 7.99999H6.50002C6.22388 7.99999 6.00002 8.22385 6.00002 8.49999V12H3.00002V5.91831L7.50002 1.49163ZM7.00002 12H9.00002V8.99999H7.00002V12Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
          <span>SolInn</span>
        </div>
        <nav ref={navRef}>
          <Link href="/" className="active">
            Places to stay
          </Link>
          <Link href="/">Experiences</Link>
          <Link href="/">Online Experiences</Link>
        </nav>
        <MobileNav />
        <form className="search">
          <input
            type="text"
            ref={primaryLocationRef}
            placeholder={placeholder ? placeholder : "Where are you going?"}
            onFocus={openDatePicker}
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />

          {inputFocus && (
            <div className="overlay">
              <div className="field">
                <label htmlFor="location">Location</label>
                <input
                  id="location"
                  value={location}
                  ref={secondaryLocationRef}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Where are you going?"
                />
              </div>

              <div className="field">
                <label>Check-in</label>
                <input disabled placeholder="Add dates" value={checkInDate} />
              </div>

              <div className="field">
                <label>Check-out</label>
                <input disabled placeholder="Add dates" value={checkOutDate} />
              </div>

              <div className="field">
                <label>Guests</label>
                <span className="guestNumber">
                  {numberOfChildren || numberOfAdults ? (
                    <p>{numberOfAdults + numberOfChildren} guests</p>
                  ) : (
                    <p className="empty">Add guests</p>
                  )}
                </span>
              </div>
            </div>
          )}
          <button
            type="submit"
            disabled={
              inputFocus &&
              !(
                location &&
                checkInDate &&
                checkOutDate &&
                (numberOfAdults || numberOfChildren)
              )
            }
            onClick={handleSubmit}
            aria-label="search places"
          >
            <Search />
            <span>Search</span>
          </button>
        </form>
        {inputFocus && (
          <DatePicker
            className="datepicker"
            close={closeDatePicker}
            checkInDate={{ value: checkInDate, setValue: setCheckInDate }}
            checkOutDate={{ value: checkOutDate, setValue: setCheckOutDate }}
            numberOfAdults={{
              value: numberOfAdults,
              setValue: setNumberOfAdults,
            }}
            numberOfChildren={{
              value: numberOfChildren,
              setValue: setNumberOfChildren,
            }}
          />
        )}

        <div className="profile">
          <Link href="/">Rent</Link>
          <ThemeToggle icon />
          <Link href="wallet" className="globe">
          <svg width="128" height="106" viewBox="0 0 128 106" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M120.471 52.0091H106.139C106.139 23.2846 82.3791 0 53.0684 0C24.1204 0 0.585366 22.7145 0.0093645 50.9471C-0.586549 80.1302 27.3517 105.472 57.1345 105.472H60.8807C87.1378 105.472 122.331 85.329 127.829 60.7858C128.845 56.2616 125.198 52.0091 120.471 52.0091ZM31.7705 53.2886C31.7705 57.1299 28.5648 60.2715 24.6452 60.2715C20.7255 60.2715 17.5198 57.1285 17.5198 53.2886V41.992C17.5198 38.1507 20.7255 35.0091 24.6452 35.0091C28.5648 35.0091 31.7705 38.1507 31.7705 41.992V53.2886ZM56.513 53.2886C56.513 57.1299 53.3073 60.2715 49.3877 60.2715C45.468 60.2715 42.2623 57.1285 42.2623 53.2886V41.992C42.2623 38.1507 45.4694 35.0091 49.3877 35.0091C53.3073 35.0091 56.513 38.1507 56.513 41.992V53.2886Z" fill="white"/>
          </svg>
          </Link>
          <div className="user">
            <Menu className="menu" />
            <User className="userIcon" />
          </div>
        </div>
      </div>
    </HeaderSection>
  );
}

const HeaderSection = styled.header`
  position: fixed;
  top: 0;
  color: #e6e6ff;
  padding: 1.5rem var(--sidePadding);
  width: 100%;
  z-index: 10;
  transition: background 0.2s, border-bottom 0.2s;

  .overlay {
    position: absolute;
    width: 100%;
    height: 100%;
    background: var(--light);
    border-radius: 99px;
    display: flex;
    align-items: center;
    left: 0;
    top: 0;
    transition: all 0.2s;

    label,
    input,
    .guestNumber {
      background: none;
      font-size: 14px;
      border: none;
      line-height: 1.5;
      display: block;
      color: var(--dark);
      outline: none;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    input {
      width: 100%;
      font-weight: 700;

      &::placeholder {
        color: var(--dark);
        font-weight: 400;
        opacity: 0.5;
      }
    }
    .guestNumber {
      font-weight: 700;
      .empty {
        color: var(--dark);
        font-weight: 400;
        opacity: 0.5;
      }
    }
    .field {
      width: 100%;
      padding: 0.5rem 1.5rem;
      border-radius: 99px;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      transition: background 0.2s;
      position: relative;

      & + .field::before {
        position: absolute;
        content: "";
        width: 2px;
        height: 2rem;
        background: var(--gray);
        border-radius: 2px;
        left: 0;
        transition: transform 0.2s;
      }
      &:hover,
      &:focus-within {
        background: var(--gray);
      }

      &:last-of-type {
        padding-right: 10rem;
      }
    }
  }
  .overlay:hover .field::before,
  .overlay:focus-within .field::before {
    transform: scale(0);
  }

  .user,
  .profile,
  .logo,
  .globe,
  nav {
    display: flex;
    align-items: center;
  }

  .headerInner {
    max-width: var(--containerWidth);
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr 2fr 1fr;
  }

  & > div {
    flex: 0 0 20%;
  }
  nav {
    flex: 1;
    justify-content: center;
    transition: all 0.2s;
    a + a {
      margin-left: 1.5rem;
    }
    a {
      position: relative;
    }
    a::before {
      position: absolute;
      content: "";
      width: 1.5rem;
      height: 2px;
      border-radius: 2px;
      background: var(--light);
      bottom: -0.5rem;
      left: calc(50% - 0.75rem);
      transform: scaleX(0);
      transform-origin: center;
      transition: transform 0.2s;
    }
    a:hover::before,
    a.active::before {
      transform: scaleX(1);
    }
  }
  .logo {
    cursor: pointer;
    svg {
      height: 2rem;
      color: #e6e6ff;
      transition: color 0.2s;
    }
    span {
      font-weight: 600;
      font-size: 1.15rem;
      margin-left: 0.5rem;
    }
  }
  .profile {
    justify-content: flex-end;
    white-space: nowrap;
    svg {
      height: 1.15rem;
    }
    a,
    .themeToggle {
      margin-right: 1.5rem;
    }
    .userIcon {
      background: #2e2e48;
      border-radius: 99px;
      height: 1.5rem;
      width: 1.5rem;
      color: #e6e6ff;
    }
    .user {
      background: #e6e6ff;
      border-radius: 99px;
      padding: 0.25rem 0.25rem 0.25rem 0.5rem;
    }
    .menu {
      color: #2e2e48;
      margin-right: 0.5rem;
    }
  }

  form {
    position: absolute;
    transform: translate(-50%, 150%);
    left: 50%;
    top: -1rem;
    background: var(--light);
    padding: 0.5rem;
    border-radius: 99px;
    display: flex;
    align-items: center;
    max-width: 720px;
    margin: 1.5rem 0;
    width: 60vw;
    box-shadow: 0 1rem 3rem -1rem #1e1e38;
    transition: all 0.2s;
    transform-origin: center;

    & * {
      transition: all 0.2s;
    }

    & > input {
      background: none;
      border: none;
      font-size: 1.15rem;
      flex: 1;
      padding: 0 1.5rem;
      color: var(--dark);
      outline: none;

      &::placeholder {
        color: var(--dark);
        opacity: 0.6;
      }
    }
    & > button {
      background: var(--red);
      color: #e6e6ff;
      border: none;
      padding: 0.5rem calc(1.75rem / 2);
      height: 3rem;
      max-width: 300px;
      display: flex;
      align-items: center;
      border-radius: 99px;
      font-weight: 700;
      font-size: 1rem;
      overflow: hidden;
      z-index: 2;

      &:hover:not(:disabled) {
        box-shadow: 0 0 0 2px var(--white), 0 0 0 4px var(--red);
      }

      &:disabled {
        opacity: 0.5;
      }
    }
    & > button svg {
      height: 1.25rem;
      margin-right: 0.75rem;
      flex: 0 0 1.25rem;
    }
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  input[type="number"] {
    -moz-appearance: textfield;
  }

  @media (max-width: 36rem) {
    .profile,
    .logo,
    nav,
    form > button span {
      display: none;
    }
    .overlay {
      display: none;
    }
    .headerInner {
      grid-template-columns: 1fr;
    }
    form {
      position: relative;
      transform: none !important;
      width: 100% !important;
      left: unset;
      top: 0;
      margin: 0;
      & > input {
        padding: 0 1rem;
        font-size: 1rem;
      }
      & > button {
        width: 2.5rem;
        height: 2.5rem;
        padding: 0 0.6rem;
      }
      & > button svg {
        height: 1rem;
        width: 1rem;
      }
    }
  }

  @media (min-width: 36rem) and (max-width: 62.5rem) {
    nav {
      display: none;
    }
    .headerInner {
      grid-template-columns: 1fr 1fr;
    }
  }

  &.scrolled:not(.inputFocus) {
    background: var(--light);
    color: var(--dark);
    border-bottom: 2px solid var(--gray);

    .overlay {
      opacity: 0;
      pointer-events: none;
    }

    nav {
      opacity: 0;
      pointer-events: none;
    }
    .logo svg {
      color: var(--red);
    }
    .user {
      box-shadow: 0 0 0 2px var(--gray);
    }
    form {
      box-shadow: 0 0 0 2px var(--gray);
      transform: translate(-50%, 0.125rem) scale(0.83);
      width: 480px;
      & > button {
        max-width: 3rem;
      }
      & > button span {
        opacity: 0;
      }
    }
    @media (max-width: 36rem) {
      padding-top: 1rem;
      padding-bottom: 1rem;

      form {
        padding: 0;
        box-shadow: none;
        background: var(--gray);
      }
    }

    @media (min-width: 36rem) and (max-width: 62.5rem) {
      .profile {
        opacity: 0;
        pointer-events: none;
      }
      form {
        left: auto;
        right: 0;
        transform: translate(0, 0.125rem) scale(0.83);
        width: 50%;
      }
    }
  }

  &.inputFocus {
    color: var(--dark);

    .logo svg {
      color: var(--red);
    }

    form {
      background: var(--light);
      width: 100%;
      box-shadow: 0 1rem 1.5rem -0.5rem #0001;
    }
  }
`;
