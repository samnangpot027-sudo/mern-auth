import { useSelector, useDispatch } from "react-redux";
import { useRef, useState } from "react";
import { signInSuccess } from "../redux/user/userSlice";

const Profile = () => {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const fileRef = useRef(null);

  const [formData, setFormData] = useState({
    username: currentUser.username,
    email: currentUser.email,
    profilePicture: currentUser.profilePicture,
  });

  const [uploading, setUploading] = useState(false);

  // 🔥 Convert file to base64
  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (err) => reject(err);
    });
  };

  // 🔥 Upload image to Cloudinary (via backend)
  const handleImageUpload = async (file) => {
    try {
      setUploading(true);

      const base64 = await convertToBase64(file);

      const res = await fetch("/api/upload", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ image: base64 }),
      });

      const data = await res.json();

      if (!data.url) {
        throw new Error("Upload failed");
      }

      // update form state
      setFormData((prev) => ({
        ...prev,
        profilePicture: data.url,
      }));

      setUploading(false);
    } catch (error) {
      console.log(error);
      setUploading(false);
    }
  };

  // 🔥 Handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  // 🔥 Submit update (IMPORTANT FIX HERE)
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`/api/upload/update/${currentUser._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      console.log("Updated user:", data);

      // 🔥 IMPORTANT FIX (update Redux)
      dispatch(signInSuccess(data));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-lg px-3 mx-auto">
      <h1 className="text-center my-7 text-3xl font-semibold">Profile</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Hidden file input */}
        <input
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
          onChange={(e) => handleImageUpload(e.target.files[0])}
        />

        {/* Profile Image */}
        <div className="flex flex-col items-center">
          <img
            className="w-24 h-24 rounded-full cursor-pointer object-cover"
            src={formData.profilePicture}
            alt="profile"
            onClick={() => fileRef.current.click()}
          />

          {uploading && (
            <p className="text-sm text-gray-500 mt-2">Uploading...</p>
          )}
        </div>

        {/* Username */}
        <input
          value={formData.username}
          onChange={handleChange}
          className="p-3 bg-slate-100 rounded-md outline-slate-300"
          type="text"
          id="username"
          placeholder="Username"
        />

        {/* Email */}
        <input
          value={formData.email}
          onChange={handleChange}
          className="p-3 bg-slate-100 rounded-md outline-slate-300"
          type="email"
          id="email"
          placeholder="Email"
        />

        {/* Password */}
        <input
          className="p-3 bg-slate-100 rounded-md outline-slate-300"
          type="password"
          id="password"
          placeholder="Password"
          onChange={handleChange}
        />

        {/* Button */}
        <button
          disabled={uploading}
          className="bg-slate-700 text-white p-3 rounded-md hover:opacity-95 disabled:opacity-70"
        >
          Update
        </button>
      </form>

      {/* Actions */}
      <div className="flex justify-between mt-5">
        <span className="text-red-700 cursor-pointer">Delete Account</span>
        <span className="text-red-700 cursor-pointer">Sign Out</span>
      </div>
    </div>
  );
};

export default Profile;
