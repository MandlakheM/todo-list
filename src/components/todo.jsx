import React from "react";
import "./todo.css";
import { LuListTodo } from "react-icons/lu";
import { GiHamburgerMenu } from "react-icons/gi";
import { CiBurger } from "react-icons/ci";

function Todo() {
  return (
    <div className="wrapper">
      <div className="gutter">
        <div className="todoContainer">
          <div className="header">
            <div>
              <LuListTodo id="headerIcons" />
            </div>
            <div className="name">
              <p>i-List</p>
            </div>
            <div className="dateContainer">
              <div className="date">
                <p>2024-07-23</p>
              </div>
              <div className="search">
                <input type="text" />
              </div>
            </div>
            <div className="menu">
              <GiHamburgerMenu id="headerIcons" />
            </div>
          </div>

          <div className="tasks">
            <div className="taskCard">
              <div className="taskIcon">
                <CiBurger id="headerIcons" />
              </div>
              <div className="time">
                <p id="taskTime">08:00am - 09:00 am</p>
                <p>Take the kids to school</p>
              </div>
              <div className="taskDate">
                <p>Thursday 25</p>
              </div>
            </div>

            <div className="taskCard">
              <div className="taskIcon">
                <CiBurger id="headerIcons" />
              </div>
              <div className="time">
                <p id="taskTime">08:00am - 09:00 am</p>
                <p>Take the kids to school</p>
              </div>
              <div className="taskDate">
                <p>Thursday 25</p>
              </div>
            </div>

            <div className="taskCard">
              <div className="taskIcon">
                <CiBurger id="headerIcons" />
              </div>
              <div className="time">
                <p id="taskTime">08:00am - 09:00 am</p>
                <p>Take the kids to school</p>
              </div>
              <div className="taskDate">
                <p>Thursday 25</p>
              </div>
            </div>

            <div className="taskCard">
              <div className="taskIcon">
                <CiBurger id="headerIcons" />
              </div>
              <div className="time">
                <p id="taskTime">08:00am - 09:00 am</p>
                <p>Take the kids to school</p>
              </div>
              <div className="taskDate">
                <p>Thursday 25</p>
              </div>
            </div>

            <div className="taskCard">
              <div className="taskIcon">
                <CiBurger id="headerIcons" />
              </div>
              <div className="time">
                <p id="taskTime">08:00am - 09:00 am</p>
                <p>Take the kids to school</p>
              </div>
              <div className="taskDate">
                <p>Thursday 25</p>
              </div>
            </div>

            <div className="taskCard">
              <div className="taskIcon">
                <CiBurger id="headerIcons" />
              </div>
              <div className="time">
                <p id="taskTime">08:00am - 09:00 am</p>
                <p>Take the kids to school</p>
              </div>
              <div className="taskDate">
                <p>Thursday 25</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Todo;
