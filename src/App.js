import React, { useContext, useEffect, useReducer, useState } from "react";
import "./App.css";
import { RiArrowDropDownLine } from "react-icons/ri";
import axios from "axios";
import {  RootContext } from "./services/RootContext";

const App = () => {
  const [dropList, setDropList] = useState(false);
  const [users, setUser] = useState([]);

  const reducer = (state, action) => {
    switch (action.type) {
      case "UPDATE":
        const usersApi = async () => {
          try {
            const response = await axios.get(
              "https://randomuser.me/api/?results=10"
            );
            setUser(response.data);
            return response;
          } catch (e) {
            console.log(e);
          }
        };
        return usersApi();
      default:
        return state;
    }
  };
  const [list, dispatch] = useReducer(reducer, users);
  const { nation, setNation, gender, setGender } =useContext(RootContext);

  const randomUsers = users?.results;
  const maleUsers = users?.results?.filter((user) => {
    return user.gender === "male";
  });
  const femaleUsers = users?.results?.filter((user) => {
    return user.gender === "female";
  });
  const isSelected = (val) => gender === val;
  const handleClick = (e) => setGender(e.currentTarget.value);
  const handleDrop = (user) => {
    setNation(user);
    setDropList(false);
  };
  
  useEffect(() => {
    const callUsers = () => {
      dispatch({ type: "UPDATE" });
    };
    callUsers();
  }, []);
  return (
      <div className="main">
        <dl>
          <input
            type="radio"
            value="Male"
            checked={isSelected("Male")}
            onChange={handleClick}
          />
          <span>Male</span>
        </dl>
        <dl>
          <input
            type="radio"
            value="Female"
            checked={isSelected("Female")}
            onChange={handleClick}
          />
          <span>Female</span>
        </dl>
        <dl>
          <input
            type="radio"
            value="All"
            checked={isSelected("All")}
            onChange={handleClick}
          />
          <span>All</span>
        </dl>
        <h1 className="select">Select Nationality:</h1>
        <div className="dropdown">
          <span>{nation}</span>
          <RiArrowDropDownLine
            className="arrow"
            onClick={() => setDropList(!dropList)}
          />
          {dropList === true
            ? randomUsers?.map((user) => {
                return (
                  <div className="list" onClick={() => handleDrop(user.nat)}>
                    {user.nat}{" "}
                  </div>
                );
              })
            : null}
        </div>
        {gender === "All" ? (
          <div>
            {randomUsers?.map((user) => {
              return (
                <div className="userBg">
                  <img className="img" src={user.picture.medium} />
                  <span className="name">
                    {user.name.title} {user.name.first} {user.name.last} (
                    {user.nat})
                  </span>
                  <span className="email">{user.email}</span>
                </div>
              );
            })}
          </div>
        ) : gender === "Male" ? (
          <div>
            {maleUsers?.map((user) => {
              return (
                <div className="userBg">
                  <img className="img" src={user.picture.medium} />
                  <span className="name">
                    {user.name.title} {user.name.first} {user.name.last} (
                    {user.nat})
                  </span>
                  <span className="email">{user.email}</span>
                </div>
              );
            })}
          </div>
        ) : (
          <div>
            {femaleUsers?.map((user) => {
              return (
                <div className="userBg">
                  <img className="img" src={user.picture.medium} />
                  <span className="name">
                    {user.name.title} {user.name.first} {user.name.last} (
                    {user.nat})
                  </span>
                  <span className="email">{user.email}</span>
                </div>
              );
            })}
          </div>
        )}
      </div>

  );
};

export default App;
