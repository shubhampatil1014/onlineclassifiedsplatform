import { useState , useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import logo from "./images/logo_7.png";
import searchImg from "./images/search.png";
import './theme.css';
import { getAllCateories, getProductsByKeyword , getLocations } from "./api/Api.js";

function Header() {

  const [searchQuery, setSearchQuery] = useState("");
  const [locationQuery, setLocationQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]); // results
  const [suggestedLocations, setSuggestedLocations] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
          // ✅ this runs once when component loads (like document.onload)
          const fetchCategories = async () => {
              try {
                  const data = await getAllCateories(); // call your API function
                  setCategories(data); // update state with API response
              } catch (error) {
                  console.error("Error fetching categories:", error);
              }
          };
  
          fetchCategories();
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
    // here you can redirect, or call another function
  };

  const openLogin=function(){
    document.getElementById("loginpage").style.display="block";
  }

  const selectedCategory= (event) => {
    console.log(event.target.value);
  }

  return (
    <div className="header" id="header">
      <header>
        <div className="logo">
        <Link to={`/index`}>
            <img
              title="index"
              src={logo}
              width="110"
              height="60"
              alt="logo"
            />
          </Link>
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
                  <div className="dropdown-search" id="drop-item">
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
                <button>
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
                      <div className="dropdown-search" id="drop-location">
                        {suggestedLocations.length > 0 && suggestedLocations.map((item) => (<div className='dropdownlist' key={item.locId} onClick={() => handleSelect(item.locId)}>{item.locName} </div>))}
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
      <hr/>
      <nav>
        <div>
          <div className="category">
            <div className="pets">
              <select id="categories" title="pet categories" name="category">
                <option value="Shop By Category" defaultValue>
                  Shop By Category
                </option>
                {categories.length && categories.map((category) => (
                  <option key={category.categoryId} value={category.categoryName} onChange={() => selectedCategory(this)}>
                  {category.categoryName}s
                </option>
                ))}
              </select>
            </div>
            <div className="clear-both"></div>
          </div>
          <div className="nav-bar">
            <div className="nav-bar-content">
              <div className="location" id="locFilter">
                <button>x</button>
              </div>
            </div>
          </div>
          <div className="profiles">
            <div className="signed-user">
              <div id="label">
                <label>
                  <pre id="user"></pre>
                </label>
              </div>
            </div>
            <div id="profile-icon" onClick={() => openLogin()}>
              <div>
                <a id="profile" title="login/signup" href="#">
                  <img
                    id="prof"
                    src="/images/default-user.png"
                    style={{ width: "30px", borderRadius: "50%" }}
                    alt="user"
                  />
                </a>
                <div className="dropdown" id="drop-profile">
                  <div></div>
                  <div>
                    <div>Edit profile</div>
                  </div>
                  <div>
                    <div>Order Details</div>
                  </div>
                  <div>
                    <div>Post Details</div>
                  </div>
                  <div>
                    <div>Chat History</div>
                  </div>
                  <div>
                    <div>Log Out</div>
                  </div>
                </div>
              </div>
              <div>
                <a title="favorites">
                  <img src="/images/liked.png" style={{ width: "30px" }} alt="favorite" />
                </a>
              </div>
              <div>
                <a title="sell">
                  <img src="/images/sell.png" alt="sell" />
                </a>
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
