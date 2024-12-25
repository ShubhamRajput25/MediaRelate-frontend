
import React, { useEffect, useRef, useState } from "react";
import { getData } from "../../services/fetchnodeservices";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { Grid, Pagination, Typography, useMediaQuery, useTheme } from "@mui/material";
import LoadingPage from "../components/LoadingPage";

const Search = ({refresh, setRefresh, isLoading, setIsLoading}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1)
  const [totalData, setTotalData] = useState('')
  const [totalPages, setTotalPages] = useState(null);

  let navigate = useNavigate()
  let fetchCalled = useRef(false)

  const itemsPerPage = 10;
  const count = users?.length;

  const startEntry = (currentPage - 1) * itemsPerPage + 1;
  const endEntry = Math.min(currentPage * itemsPerPage, totalData);

  const handlePageChange = (event, value) => {
      setCurrentPage(value);
      fetchCalled.current = false
  };


   const theme = useTheme()
   const matches1 = useMediaQuery(theme.breakpoints.down(1000))
   const matches2 = useMediaQuery(theme.breakpoints.down(800))
   const matches3 = useMediaQuery(theme.breakpoints.down(700))
   const matches4 = useMediaQuery(theme.breakpoints.down(600))
   const matches5 = useMediaQuery(theme.breakpoints.down(500))
   const matches6 = useMediaQuery(theme.breakpoints.down(1200))

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

   const fetchAllUsers = async () => {
          let token = JSON.parse(localStorage.getItem('token'))
          let config = {
              headers: {
                  Authorization: `Bearer ${token}`,
              }
          }
          let result = await getData(`users/fetch-user-with-pagination?pageNumber=${currentPage}`,config)
          if(result?.status == true){
              setUsers(result.data?.users)
              setTotalPages(result?.data?.totalPages)
              setTotalData(result?.data?.totalUsers)
          }
          setIsLoading(false)
      }

  useEffect(function(){
    if(!fetchCalled.current) {
      fetchAllUsers()
      fetchCalled.current = true
    }
  },[currentPage])

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return ( isLoading? <LoadingPage /> :
    <div style={{ width: '100%',height:matches3?'auto':'100vh', background: '#f5f6fa' }}>
        <Grid container spacing={2} style={{ display:'flex',justifyContent:'center',position:'relative'}}>
            <Grid item xs={12} style={{ background: 'white' , position:'fixed',top:0,left:0,zIndex:1000,width:'100%'}}>

                <Header refresh={refresh} setRefresh={setRefresh} />
          
            </Grid>
    <Grid item xs={12} style={{ padding: "20px", maxWidth: "800px", margin: "0 auto", fontFamily: "Arial, sans-serif" }}>
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
                  src={user.profilepic || "https://static.vecteezy.com/system/resources/thumbnails/005/545/335/small/user-sign-icon-person-symbol-human-avatar-isolated-on-white-backogrund-vector.jpg"}
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
         {users?.length > 0 && (
                                <div
                                    style={{
                                        borderTop: "1px solid gainsboro",
                                        padding: "2%",
                                        marginTop: '2%',
                                        display: "flex",
                                        justifyContent: "space-between",
                                    }}
                                >
                                    <Typography
                                        style={{
                                            fontWeight: 500,
                                            fontSize: 15,
                                            color: "black",
                                        }}
                                    >{`Showing ${startEntry} to ${endEntry} of ${totalData} Records`}</Typography>
                                    <Pagination
                                        count={totalPages}
                                        page={currentPage}
                                        onChange={handlePageChange}
                                        color="primary"
                                    />
                                </div>
                            )}
      </div>
    </Grid>

    </Grid>
    </div>
  );
};

export default Search;
