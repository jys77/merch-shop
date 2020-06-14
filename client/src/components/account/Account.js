import React, { useState } from "react";
import styled from "styled-components";
import Cookie from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { update } from "../../actions";

const AccountWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: column;
  .account-header {
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
    padding-bottom: 1rem;
    border-bottom: 1px #f1f5f8 solid;
  }
  .account-form {
    display: flex;
    flex-flow: column;
    font-size: 1.2rem;
    .email {
      line-height: 1.5rem;
      margin-bottom: 2rem;
      div:nth-child(1) {
        font-weight: 700;
      }
    }
  }
  .fill-box {
    display: flex;
    flex-flow: column;
    line-height: 1.5rem;
    margin-bottom: 2rem;
    label {
      font-weight: 700;
      margin-bottom: 0.5rem;
    }
    input {
      width: 200px;
      border-radius: 0;
      border: 1px solid black;
      padding: 2px 5px;
      height: 35px;
      box-shadow: none;
      -webkit-appearance: none;
      outline: none;
    }
  }
  .password {
    margin-top: 1rem;
    line-height: 1.5rem;
    margin-bottom: 2rem;
    .password-header {
      font-size: 1.5rem;
      margin-bottom: 1.5rem;
      padding-bottom: 1rem;
      border-bottom: 1px #f1f5f8 solid;
    }
  }
  .tip {
    color: darkgray;
  }
  .update-button {
    cursor: pointer;
    margin-top: 1rem;
    height: 40px;
    width: 200px;
    line-height: 40px;
    text-align: center;
    border: 1px solid rgb(28, 25, 25);
    background-color: rgb(28, 25, 25);
    color: #fff;
    margin-bottom: 2rem;
    &:hover {
      background-color: #fff;
      color: black;
      font-weight: 700;
    }
  }
`;

export const Account = (props) => {
  const dispatch = useDispatch();
  const userInfo = Cookie.getJSON("userInfo");
  const [firstName, setFirstName] = useState(`${userInfo.fname}`);
  const [lastName, setLastName] = useState(`${userInfo.lname}`);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPassword2, setNewPassword2] = useState("");

  const updateNameHandler = (e) => {
    e.preventDefault();
    if (!oldPassword && !newPassword && !newPassword2) {
      dispatch(
        update({ userId: userInfo._id, fname: firstName, lname: lastName })
      );
    } else if (newPassword !== newPassword2) {
      alert("Your re-entered new password is different.");
    } else {
      dispatch(
        update({
          userId: userInfo._id,
          fname: firstName,
          lname: lastName,
          oldPassword: oldPassword,
          newPassword: newPassword,
        })
      );
      setOldPassword("");
      setNewPassword("");
      setNewPassword2("");
    }
  };

  const { loading, success, error } = useSelector((state) => state.userUpdate);

  return (
    <AccountWrapper>
      <div className="account-header">My Account</div>
      <form className="account-form" onSubmit={updateNameHandler}>
        <div className="email">
          <div>Email</div>
          <div>{userInfo.email}</div>
        </div>
        <div className="fill-box">
          <label htmlFor="fname">First Name</label>
          <input
            value={firstName}
            name="fname"
            id="fname"
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div className="fill-box">
          <label htmlFor="lname">Last Name</label>
          <input
            value={lastName}
            name="lname"
            id="lname"
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div className="password">
          <div className="password-header">Password</div>
          <div className="fill-box">
            <label htmlFor="oldPassword">Old Password</label>
            <input
              value={oldPassword}
              name="oldPassword"
              id="oldPassword"
              type="password"
              onChange={(e) => setOldPassword(e.target.value)}
              autoComplete="on"
            />
          </div>
          <div className="fill-box">
            <label htmlFor="newPassword">New Password</label>
            <input
              value={newPassword}
              name="newPassword"
              id="newPassword"
              type="password"
              onChange={(e) => setNewPassword(e.target.value)}
              autoComplete="on"
            />
          </div>
          <div className="fill-box">
            <label htmlFor="newPassword2">Re-enter New Password</label>
            <input
              value={newPassword2}
              name="newPassword2"
              id="newPassword2"
              type="password"
              onChange={(e) => setNewPassword2(e.target.value)}
              autoComplete="on"
            />
          </div>
        </div>
        {loading ? (
          <div className="tip">Saving...</div>
        ) : error ? (
          <div className="tip">{error.msg}</div>
        ) : success ? (
          <div className="tip">Account updated.</div>
        ) : null}
        <button className="update-button" type="submit">
          Update
        </button>
      </form>
    </AccountWrapper>
  );
};
