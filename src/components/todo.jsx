import React from "react";
import "./todo.css";
import { useState } from "react";
import { LuListTodo } from "react-icons/lu";
import { GiHamburgerMenu } from "react-icons/gi";
import { CiBurger } from "react-icons/ci";
import { MdAdd } from "react-icons/md";

function Todo() {
  const [modal, setModal] = useState(false);

  const activateModal = () => {
    setModal(true);
  };

  const deactivateModal = () => {
    setModal(false);
  };

  return (
    <div className="wrapper">
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
              <p>
                Thursday <br />
                25
              </p>
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
              <p>
                Thursday <br /> 25
              </p>
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
              <p>
                Thursday <br />
                25
              </p>
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
              <p>
                Thursday <br />
                25
              </p>
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
              <p>
                Thursday <br />
                25
              </p>
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
              <p>
                Thursday <br />
                25
              </p>
            </div>
          </div>
        </div>

        <div className="addButton">
          <button onClick={() => activateModal()}>
            <MdAdd />
          </button>
        </div>

        {modal && (
          <div className="modal">
            <div className="overlay" onClick={deactivateModal}></div>
            <div className="modalContent">
              <p id="small">PLEASE ENTER EMPLOYEE INFORMATION TO BE CAPTURED</p>
              <p id="formHeading">PERSONAL INFORMATION</p>
              <button onClick={deactivateModal} className="closeModal">
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Todo;
