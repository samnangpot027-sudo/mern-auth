import { useSelector } from "react-redux";

const Profile = () => {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <div className="max-w-lg px-3 mx-auto">
      <h1 className="text-center my-7 text-3xl font-semibold">Profile</h1>
      <form className="flex flex-col gap-4">
        <img
          className="w-24 h-24 rounded-full self-center cursor-pointer object-cover"
          src={currentUser.profilePicture}
          alt="pic"
        />
        <input
          defaultValue={currentUser.username}
          className="p-3 bg-slate-100 rounded-md outline-slate-300"
          type="text "
          id="username"
          placeholder="Username"
        />
        <input
          defaultValue={currentUser.email}
          className="p-3 bg-slate-100 rounded-md outline-slate-300"
          type="email "
          id="email"
          placeholder="Email"
        />
        <input
          className="p-3 bg-slate-100 rounded-md outline-slate-300"
          type="password "
          id="password"
          placeholder="Password"
        />
        <button className="bg-slate-700 text-white p-3 rounded-md hover:opacity-95 disabled:opacity-80">
          Update
        </button>
      </form>
      <div className="flex justify-between mt-5">
        <span className="text-red-700 cursor-pointer">Delete Account</span>
        <span className="text-red-700 cursor-pointer">Sign Out</span>
      </div>
    </div>
  );
};

export default Profile;
