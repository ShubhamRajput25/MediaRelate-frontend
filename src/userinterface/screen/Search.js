
import React, { useState } from "react";
import { getData } from "../../services/fetchnodeservices";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState([]);

  let navigate = useNavigate()

  const handleSearch = async() => {
    if (searchTerm.trim() !== "") {
        let token = JSON.parse(localStorage.getItem('token'))
        let config = {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        }
    let result = await getData(`auth/search-users/${searchTerm}`,config)

    if(result?.status){
        setUsers(result?.data)
    }
    } else {
      setUsers([]);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ textAlign: "center", marginBottom: "30px", color: "#2c3e50" }}>Search Users</h1>
      <div style={{ display: "flex", alignItems: "center", marginBottom: "30px" }}>
        <div style={{ flex: 1, position: "relative" }}>
          <input
            type="text"
            placeholder="Search by name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyDown}
            style={{
              width: "100%",
              padding: "12px 40px 12px 15px",
              fontSize: "16px",
              border: "1px solid #dcdfe6",
              borderRadius: "8px",
              outline: "none",
              backgroundColor: "#ffffff",
              boxShadow: "inset 0 1px 3px rgba(0, 0, 0, 0.1)",
            }}
          />
          <button
            onClick={handleSearch}
            style={{
              position: "absolute",
              right: "10px",
              top: "50%",
              transform: "translateY(-50%)",
              padding: "8px 16px",
              fontSize: "16px",
              backgroundColor: "#3498db",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              transition: "background-color 0.3s",
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#2980b9")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#3498db")}
          >
            Search
          </button>
        </div>
      </div>
      <div>
        {users.length > 0 ? (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "20px" }}>
            {users.map((user) => (
              <div
                key={user._id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "15px",
                  border: "1px solid #dcdfe6",
                  borderRadius: "12px",
                  backgroundColor: "#ffffff",
                  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                }}
              >
                <img
                  src={user.profilepic}
                  alt={user.name?.[0]}
                  style={{ width: "60px", height: "60px", borderRadius: "50%", marginRight: "15px" }}
                />
                <div>
                  <h2 style={{ margin: "0 0 5px 0", fontSize: "18px", color: "#34495e", cursor:'pointer' }} onClick={()=>{
                    let userId = user?._id
                    navigate(`/profile/${userId}`)
                  }}>@{user?.username}</h2>
                  <p style={{ margin: "0", fontSize: "14px", color: "#7f8c8d", textAlign:'start' }}>{user?.name}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p style={{ textAlign: "center", color: "#7f8c8d" }}>No users found</p>
        )}
      </div>
    </div>
  );
};

export default Search;
