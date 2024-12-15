import "./Signup.css";
import { MdEdit, MdDelete } from "react-icons/md";
import { IoAddCircle } from "react-icons/io5";
import { useAuth } from "../context/ContextProvider";

function ProfilePage() {
  // Get the token from localStorage

  const { user } = useAuth();
  if (!user) {
    // Optionally, display a loading state or a message while the user is not authenticated
    return <div>Loading...</div>;
  }
  return (
    <div>
      <div className="crud">
        <div className="profileSection"> Hello {user.name}</div>{" "}
        {/* Display the username here */}
        <ul>
          <li>
            <button>
              <IoAddCircle />
            </button>
          </li>
          <li>
            <button>
              <MdDelete />
            </button>
          </li>
        </ul>
      </div>

      <div className="container-profile">
        <div className="card-profile">
          <h3>Title</h3>
          <p>Your Notes</p>
          <button>
            <MdEdit />
          </button>
          <button>
            <MdDelete />
          </button>
        </div>
        <div className="card-profile">
          <h3>Title</h3>
          <p>Your Notes</p>
          <button>Edit</button>
          <button>Delete</button>
        </div>
      </div>

      <div className="btn-add">
        <button>+</button>
      </div>
    </div>
  );
}

export default ProfilePage;
