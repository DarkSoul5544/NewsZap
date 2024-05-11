import React, { useState } from 'react';

export default function Profile() {
  const [name, setName] = useState('Vishal');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('newszap@mail.com');
  const [category, setCategory] = useState('');
  const [phone, setPhone] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [image, setImage] = useState('https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg');

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  };

  const handleImageChange = (e) => {
    setImage(e.target.value);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const url = URL.createObjectURL(file);
    setImage(url);
};

  const handleSaveClick = () => {
    // Save the edited data to the database
    //...

    // Set isEditing to false to exit the editing mode
    setIsEditing(false);
  };

  return (
    <div>
      <div className="container rounded bg-white mt-5 mb-5">
        <div className="row">
          <div className="col-md-3 ">
            <div className="d-flex flex-column align-items-center text-center p-3 py-5">
              <img
                className="rounded-circle mt-5"
                width="150px"
                src={image}
                alt="error"
              />
              <span className="font-weight-bold">{name}</span>
              <span className="text-black-50">{email}</span>
              <span> </span>
            </div>
          </div>
          <div className="col-md-5 ">
            <div className="p-3 py-5">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h4 className="text-right">Profile Settings</h4>
              </div>
              <div className="row mt-2">
                <div className="col-md-6">
                  <label className="labels">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={name}
                    onChange={handleNameChange}
                    placeholder="Enter your name"
                    disabled={!isEditing}
                  />
                </div>
                <div className="col-md-6">
                  <label className="labels">Last Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={lastName}
                    onChange={handleLastNameChange}
                    placeholder="Enter your last name"
                    disabled={!isEditing}
                  />
                </div>
                <div className="col-md-6">
                  <label className="labels">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    value={email}
                    onChange={handleEmailChange}
                    placeholder="Enter your email"
                    disabled={!isEditing}
                  />
                </div>
                <div className="col-md-6">
                  <label className="labels">Category</label>
                  <input
                    type="text"
                    className="form-control"
                    value={category}
                    onChange={handleCategoryChange}
                    placeholder="Enter your category"
                    disabled={!isEditing}
                  />
                </div>
                <div className="col-md-6">
                  <label className="labels">Phone</label>
                  <input
                    type="text"
                    className="form-control"
                    value={phone}
                    onChange={handlePhoneChange}
                    placeholder="Enter your phone number"
                    disabled={!isEditing}
                  />
                </div>
                <div className="col-md-6">
                  <label className="labels">Image</label>
                  <input
                    type="text"
                    className="form-control"
                    value={image}
                    onChange={handleImageChange}
                    placeholder="Enter image URL"
                    disabled={!isEditing}
                  />
                  {isEditing && (
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      disabled={!isEditing}
                    />
                  )}
                </div>
              </div>
              <div className="mt-5 text-center">
                {isEditing? (
                  <button className="btn btn-primary profile-button" type="button" onClick={handleSaveClick}>
                    Save Profile
                  </button>
                ) : (
                  <button className="btn btn-primary profile-button" type="button" onClick={() => setIsEditing(true)}>
                    Edit Profile
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}