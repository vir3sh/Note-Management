import React from 'react'
import './Signup.css'
import { MdEdit,MdDelete  } from "react-icons/md";
import { IoAddCircle } from "react-icons/io5";
function ProfilePage() {
  return (
    <div>

      <div className="crud">
        <div className="profileSection">Name</div>
        <ul>
          <li><button><IoAddCircle /></button></li>
          <li><button><MdDelete /></button></li>
          {/* <li></li> */}
        </ul>
      </div>


      <div className="container-profile">
       
        <div className="card-profile">
          <h3>Title</h3>
          <p>Your Notes</p>
          <button><MdEdit /></button>
          <button><MdDelete /></button>
        </div>
        <div className="card-profile">
          <h3>Title</h3>
          <p>Your Notes</p>
          <button>Edit</button>
          <button>Delete</button>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
