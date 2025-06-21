import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  updatePassStart,
  updatePassSuccess,
  updatePassFailure,
} from "../../redux/user/userSlice";
import "../styles/AdminProfile.css";
import defaultProfileImg from "../../assets/images/profile.png";

const getImageUrl = (url) => {
  if (!url) return defaultProfileImg;
  if (url.startsWith('http')) return url;
  // Remove /api from VITE_API_URL to get the base URL
  const baseUrl = import.meta.env.VITE_API_URL.replace('/api', '');
  return `${baseUrl}${url}`;
};

const AdminUpdateProfile = () => {
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [updateProfileDetailsPanel, setUpdateProfileDetailsPanel] =
    useState(true);
  const [formData, setFormData] = useState({
    username: "",
    address: "",
    phone: "",
    avatar: "",
  });
  const [updatePassword, setUpdatePassword] = useState({
    oldpassword: "",
    newpassword: "",
  });

  useEffect(() => {
    if (currentUser !== null) {
      setFormData({
        username: currentUser.username,
        address: currentUser.address,
        phone: currentUser.phone,
        avatar: currentUser.avatar,
      });
    }
  }, [currentUser]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handlePass = (e) => {
    setUpdatePassword({
      ...updatePassword,
      [e.target.id]: e.target.value,
    });
  };

  const handlePhotoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const formDataPhoto = new FormData();
    formDataPhoto.append("image", file);
    try {
      const res = await axios.post("/api/upload", formDataPhoto, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (res.data && res.data.imageUrl) {
        setFormData((prev) => ({ ...prev, avatar: res.data.imageUrl }));
        alert("Profile photo uploaded!");
      } else {
        alert("Upload failed");
      }
    } catch (err) {
      alert("Upload error");
    }
  };

  const updateUserDetails = async (e) => {
    e.preventDefault();
    if (
      currentUser.username === formData.username &&
      currentUser.address === formData.address &&
      currentUser.phone === formData.phone
    ) {
      alert("Change atleast 1 field to update details");
      return;
    }
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false && res.status !== 201 && res.status !== 200) {
        dispatch(updateUserSuccess());
        dispatch(updateUserFailure(data?.messsage));
        alert("Session Ended! Please login again");
        navigate("/login");
        return;
      }
      if (data.success && res.status === 201) {
        alert(data?.message);
        dispatch(updateUserSuccess(data?.user));
        return;
      }
      alert(data?.message);
      return;
    } catch (error) {
      console.log(error);
    }
  };

  const updateUserPassword = async (e) => {
    e.preventDefault();
    if (
      updatePassword.oldpassword === "" ||
      updatePassword.newpassword === ""
    ) {
      alert("Enter a valid password");
      return;
    }
    if (updatePassword.oldpassword === updatePassword.newpassword) {
      alert("New password can't be same!");
      return;
    }
    try {
      dispatch(updatePassStart());
      const res = await fetch(`/api/user/update-password/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatePassword),
      });
      const data = await res.json();
      if (data.success === false && res.status !== 201 && res.status !== 200) {
        dispatch(updateUserSuccess());
        dispatch(updatePassFailure(data?.message));
        alert("Session Ended! Please login again");
        navigate("/login");
        return;
      }
      dispatch(updatePassSuccess());
      alert(data?.message);
      setUpdatePassword({
        oldpassword: "",
        newpassword: "",
      });
      return;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{
      background: 'linear-gradient(120deg, #e0e7ef 60%, #f0f4f8 100%)',
      minHeight: '100vh',
      paddingTop: 48,
      paddingBottom: 48,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <div style={{
        position: 'relative',
        maxWidth: 440,
        width: '100%',
        background: 'rgba(255,255,255,0.85)',
        borderRadius: '2rem',
        boxShadow: '0 12px 48px rgba(30,41,59,0.18)',
        padding: '3.5rem 2.2rem 2.5rem 2.2rem',
        backdropFilter: 'blur(8px)',
        border: '1.5px solid #e0e7ef',
        zIndex: 1,
      }}>
        <div style={{
          position: 'absolute',
          top: '-60px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}>
          <img
            src={getImageUrl(formData.avatar) || defaultProfileImg}
            alt={formData.username}
            style={{
              width: 110,
              height: 110,
              borderRadius: '50%',
              border: '4px solid #2563eb',
              boxShadow: '0 4px 24px rgba(59,130,246,0.13)',
              background: '#f1f5f9',
              objectFit: 'cover',
            }}
          />
          <label htmlFor="profile-photo-upload" style={{ marginTop: 10, cursor: 'pointer', color: '#2563eb', fontWeight: 600, fontSize: 14, textDecoration: 'underline' }}>
            Change Photo
            <input
              id="profile-photo-upload"
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={handlePhotoUpload}
            />
          </label>
          <span style={{
            marginTop: 10,
            fontWeight: 700,
            color: '#2563eb',
            fontSize: 24,
            letterSpacing: 0.5,
            textShadow: '0 1px 0 #fff',
          }}>{formData.username}</span>
          <span style={{
            fontSize: 13,
            color: '#fff',
            background:'#2563eb',
            borderRadius: 10,
            padding: '3px 16px',
            marginTop: 7,
            letterSpacing: 1,
            fontWeight: 700,
            boxShadow: '0 2px 8px rgba(59,130,246,0.10)',
            border: '1.5px solid #fff',
          }}>ADMIN</span>
        </div>
        <div style={{height: 60}} />
        <div style={{textAlign: 'center', marginBottom: 28}}>
          <span style={{fontSize: 22, color: '#334155', fontWeight: 700, letterSpacing: 0.2}}>Admin Profile</span>
        </div>
        <hr style={{margin: '1.2rem 0', borderColor: '#e5e7eb'}} />
        {updateProfileDetailsPanel === true ? (
          <>
            <div style={{fontSize: 17, color: '#2563eb', fontWeight: 600, marginBottom: 18, textAlign: 'center', letterSpacing: 0.2}}>Profile Details</div>
            <form className="admin-profile-form" onSubmit={updateUserDetails}>
              <div>
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  id="username"
                  value={formData.username}
                  onChange={handleChange}
                  autoComplete="off"
                />
              </div>
              <div>
                <label htmlFor="address">Address</label>
                <textarea
                  maxLength={200}
                  id="address"
                  value={formData.address}
                  onChange={handleChange}
                  rows={2}
                />
              </div>
              <div>
                <label htmlFor="phone">Phone</label>
                <input
                  type="text"
                  id="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  autoComplete="off"
                />
              </div>
              <button type="submit" disabled={loading} style={{marginTop: 16, fontSize: 17, fontWeight: 600, background: 'linear-gradient(90deg, #2563eb 60%, #38bdf8 100%)', border: 'none', color: '#fff', borderRadius: 8, padding: '0.7rem 1.2rem', boxShadow: '0 2px 8px rgba(59,130,246,0.10)', cursor: 'pointer', transition: 'background 0.2s, box-shadow 0.2s, transform 0.1s'}}>
                {loading ? "Loading..." : "Update Profile"}
              </button>
            </form>
            <button
              type="button"
              className="admin-profile-switch"
              disabled={loading}
              style={{marginTop: 22, fontWeight: 600, color: '#2563eb', background: 'none', border: 'none', fontSize: 16, cursor: 'pointer'}}
              onClick={() => setUpdateProfileDetailsPanel(false)}
            >
              {loading ? "Loading..." : "Change Password"}
            </button>
          </>
        ) : (
          <>
            <div style={{fontSize: 17, color: '#2563eb', fontWeight: 600, marginBottom: 18, textAlign: 'center', letterSpacing: 0.2}}>Change Password</div>
            <form className="admin-profile-form" onSubmit={updateUserPassword}>
              <div>
                <label htmlFor="oldpassword">Old Password</label>
                <input
                  type="password"
                  id="oldpassword"
                  value={updatePassword.oldpassword}
                  onChange={handlePass}
                  autoComplete="off"
                />
              </div>
              <div>
                <label htmlFor="newpassword">New Password</label>
                <input
                  type="password"
                  id="newpassword"
                  value={updatePassword.newpassword}
                  onChange={handlePass}
                  autoComplete="off"
                />
              </div>
              <button type="submit" disabled={loading} style={{marginTop: 16, fontSize: 17, fontWeight: 600, background: 'linear-gradient(90deg, #2563eb 60%, #38bdf8 100%)', border: 'none', color: '#fff', borderRadius: 8, padding: '0.7rem 1.2rem', boxShadow: '0 2px 8px rgba(59,130,246,0.10)', cursor: 'pointer', transition: 'background 0.2s, box-shadow 0.2s, transform 0.1s'}}>
                {loading ? "Loading..." : "Update Password"}
              </button>
            </form>
            <button
              type="button"
              className="admin-profile-switch"
              disabled={loading}
              style={{marginTop: 22, fontWeight: 600, color: '#2563eb', background: 'none', border: 'none', fontSize: 16, cursor: 'pointer'}}
              onClick={() => {
                setUpdateProfileDetailsPanel(true);
                setUpdatePassword({ oldpassword: "", newpassword: "" });
              }}
            >
              {loading ? "Loading..." : "Back to Profile"}
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default AdminUpdateProfile;
