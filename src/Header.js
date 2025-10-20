import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Header.css';
import logo from "./images/logo_7.png";
import searchImg from "./images/search.png";
import './theme.css';
import { getAllCateories, getProductsByKeyword, getLocations, getSessionInfo, getAllCategories } from "./api/Api.js";
import { authState } from './config.js';

function Header() {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [locationQuery, setLocationQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]); // results
  const [suggestedLocations, setSuggestedLocations] = useState([]);
  const [categories, setCategories] = useState([]);
  const [sessionInfo, setSesionInfo] = useState("");

  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const suggestionRef = useRef(null);
  const locationSuggestionRef = useRef(null);

  const openDropDown = () => {
    setIsOpen((prev) => !prev); // toggle between true/false
  };

  useEffect(() => {
    // ✅ this runs once when component loads (like document.onload)
    const fetchCategories = async () => {
      try {
        const data = await getAllCategories(); // call your API function
        setCategories(data); // update state with API response
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    const getSessionsInfo = async () => {
      try {
        const data = await getSessionInfo();
        authState.isLoggedIn = data.loggedIn;
        authState.loggedUser = data.username;
        setSesionInfo(data);
      } catch (error) {
        console.error("Error fetching session:", error);
      }
    };

    const handleClickOutside = (event) => {
      // if dropdown is open AND click is outside dropdownRef
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
      if (suggestionRef.current && !suggestionRef.current.contains(event.target)) {
        setSuggestions([]);
      }
      if (locationSuggestionRef.current && !locationSuggestionRef.current.contains(event.target)) {
        setSuggestedLocations([]);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    getSessionsInfo();
    fetchCategories();
    // ✅ cleanup on unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const globalSearch = async (event) => {
    const keyword = event.target.value;
    setSearchQuery(keyword);
    if (keyword.length > 2) {
      try {
        const data = await getProductsByKeyword(keyword);
        setSuggestions(data);
      } catch (error) {

      }
    }
    else {
      setSuggestions([]);
    }

  }

  const locationSearch = async (event) => {
    const location = event.target.value;
    setLocationQuery(location);
    if (location.length > 2) {
      try {
        const data = await getLocations(location);
        setSuggestedLocations(data);
      } catch (error) {

      }
    }
    else {
      setSuggestedLocations([]);
    }

  }


  const handleSelect = (id) => {
    console.log("Selected item:", id);
  };

  const selectedLocation = (locationFilter) => {
    console.log("Selected item:", locationFilter);
    const params = new URLSearchParams(location.search);
    if (locationFilter && locationFilter !== "") {
      params.set("location", locationFilter);
    }
    else {
      params.delete("location");
    }
    navigate({ pathname: location.pathname, search: params.toString() });
  };

  const openLogin = function () {
    if (authState.isLoggedIn) {
      openDropDown();
    }
    else {
      document.getElementById("loginpage").style.display = "block";
    }
  }

  const openLogout = function () {
    document.getElementById("logoutpage").style.display = "block";
  }


  const openFavourites = () => {
    if (authState && authState.isLoggedIn) {
      navigate("/favourites"); // ✅ React way instead of window.location.href
    } else {
      document.getElementById("loginpage").style.display = "block";
    }
  };

  const openSellPage = () => {
    if (authState && authState.isLoggedIn) {
      navigate("/sell"); // ✅ React way instead of window.location.href
    } else {
      document.getElementById("loginpage").style.display = "block";
    }
  }

  const selectedCategory = (event) => {
    const params = new URLSearchParams(location.search);
    const elt = event.target;
    if (elt.selectedIndex > 0) {
      let category = elt.value;
      params.set("category", category);
    }
    else {
      params.delete("category");
    }
    navigate({ pathname: location.pathname, search: params.toString() });
  }

  const search = function () {
    if (searchQuery && searchQuery !== "") {
      window.location.href = `search-results?keyword=${searchQuery}`;
    }
  };

  const removeFilter = (event) => {
    const element = event.target;
    const params = new URLSearchParams(location.search);
    params.delete(element.parentElement.className);
    document.getElementById("locationName").innerHTML = "";
    element.parentElement.style.display = "none";
    navigate({ pathname: location.pathname, search: params.toString() });
  }

  return (
    <div className="header" id="header">
      <header>
        <div className="logo">
          <a href={`/index`}>
            <img
              title="index"
              src={logo}
              width="110"
              height="60"
              alt="logo"
            />
          </a>
        </div>
        <div className="srch-con">
          <div className="search-container">
            <div className="search">
              <div>
                <input
                  id="search"
                  title="start typing product name"
                  placeholder="Search For More Than 10,000 Products"
                  type="text"
                  value={searchQuery}
                  onChange={globalSearch}
                />
              </div>
              <div className="suggestion-box">
                <div id="item">
                  <div ref={suggestionRef} className="dropdown-search" id="drop-item">
                    {suggestions.length > 0 &&
                      suggestions.map((item) => (
                        <div key={item[0]} onClick={() => handleSelect(item[0])}>
                          <span>{item[1]}</span>
                          <br />
                          <span
                            style={{
                              fontSize: "12px",
                              whiteSpace: "nowrap",
                              textOverflow: "ellipsis",
                            }}
                          >
                            {item[2]}
                          </span>
                        </div>
                      ))}
                  </div>
                </div>
              </div>

              <div id="serch-btn">
                <button onClick={() => search()}>
                  <img
                    src={searchImg}
                    style={{ background: "darkgray", top: 0, width: "45px", height: "45px" }}
                    title="search"
                    alt="search"
                  />
                </button>
              </div>
            </div>
          </div>
          <div className="contact">
            <div className="location-search">
              <div className="search">
                <div>
                  <input
                    id="search-location"
                    title="start typing product name"
                    placeholder="search location"
                    type="text"
                    value={locationQuery}
                    onChange={locationSearch}
                  />

                </div>
                <div className='location-suggestion-box'>
                  <div id="loc">
                    <div ref={locationSuggestionRef} className="dropdown-search" id="drop-location">
                      {suggestedLocations.length > 0 && suggestedLocations.map((item) => (<div className='dropdownlist' key={item.locId} onClick={() => selectedLocation(item.locName)}>{item.locName} </div>))}
                    </div>
                  </div>
                </div>
                <div id="serch-btn">
                  <button>
                    <img src={searchImg} title="search" alt="search" />
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="clear-both"></div>
        </div>
        <div className="clear-both"></div>
      </header>
      <hr />
      <nav>
        <div>
          <div className="category">
            <div className="pets">
              <select id="categories" title="pet categories" name="category" onChange={(event) => selectedCategory(event)}>
                <option value="Shop By Category" defaultValue>
                  Shop By Category
                </option>
                {categories.length && categories.map((category) => (
                  <option key={category.categoryId} value={category.categoryName} >
                    {category.categoryName}s
                  </option>
                ))}
              </select>
            </div>
            <div className="clear-both"></div>
          </div>
          <div className="nav-bar">
            <div className="nav-bar-content">
              <div className="location" id="locFilter"> <button onClick={(event) => removeFilter(event)}>x</button><span id="locationName"></span></div>
            </div>
          </div>
          <div className="profiles">
            <div className="signed-user">
              <div id="label">
                <label>
                  <pre id="user">{sessionInfo.loggedIn ? `Hello, ${sessionInfo.username}` : `Welcome, Guest !`} </pre>
                </label>
              </div>
            </div>
            <div id="profile-icon">
              <div ref={dropdownRef} onClick={() => openLogin()}>
                <div>
                  <img
                    id="prof"
                    src="/images/default-user.png"
                    style={{ width: "30px", borderRadius: "50%" }}
                    alt="user"
                  />
                  <div ref={dropdownRef} className="dropdown" id="drop-profile" style={{ display: isOpen ? "block" : "none", border: "1px solid gray", padding: "10px" }}>
                    <div></div>
                    <div>
                      <Link to={`/edit-profile`}>
                        <div>Edit profile</div>
                      </Link>
                    </div>
                    <div>
                      <div>Order Details</div>
                    </div>
                    <div>
                      <Link to={`/myPosts`}>
                        <div>Post Details</div>
                      </Link>
                    </div>
                    <div>
                      <Link to={`/chats`}>
                        <div>Chat History</div>
                      </Link>
                    </div>
                    <div>
                      <div onClick={() => openLogout()}>Log Out</div>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div onClick={() => openFavourites()} title="favorites">
                  <img src="/images/liked.png" style={{ width: "30px" }} alt="favorite" />
                </div>
              </div>
              <div>
                <div title="sell" onClick={() => openSellPage()}>
                  <img src="/images/sell.png" alt="sell" />
                </div>
              </div>
            </div>
          </div>
          <div className="clear-both"></div>
        </div>
        <div className="clear-both"></div>
      </nav>
    </div>
  );
}

export default Header;
