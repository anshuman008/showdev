import { Camera, Link2, MapPin } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { UpdateUser } from "../../serverActions/CheckUser";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { useUser } from "@clerk/nextjs";
import useUserInfo from "../../../store/userInfo";
import { uploadImage } from "../../../utils/supabaseLogic";

const BasicDetails = () => {
  const userdata = useUserInfo();
  const [selectedOption, setSlectedOption] = useState("");
  const [userProfile,setProfile] = useState('');
  let timeoutId;

  const { user } = useUser();

  const updateData = async (data, field, email) => {
    const res = await UpdateUser(data, field, email);
    if (res.status === 200) {
      toast.success(`${field} updated succesfully!!`);
    } else {
      toast.error("there is an error!");
    }
  };

  const handeleUpdate = (event, field) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      console.log(event.target.value);
      updateData(
        event.target.value,
        field,
        user.primaryEmailAddress.emailAddress
      );
    }, 1000);
  };



useEffect(() => {
  userdata&&setProfile(userdata?.userInfo?.profileImage)
},[userdata])

  const handelFileUpload = async(event) => {
    const file = event.target.files[0];

    if (file) {
      const url = await uploadImage(file);
       
      setProfile(url);
      if(url){
         await  updateData(url,'profileImage',user.primaryEmailAddress.emailAddress)
      }
    }
  }

  return (
    <div className="p-7 rounded-lg bg-gray-800 my-7">
      <div className="flex gap-6 items-center">
       <label htmlFor="file-upload">
        {!userProfile&&<Camera className="p-3 h-12 w-12 rounded-full bg-gray-500 cursor-pointer" />}
        {userProfile&&<img src={userProfile} className=" h-12 w-12 rounded-full bg-gray-500 cursor-pointer"/>}
       </label>

       <input type="file" id="file-upload" style={{display:'none'}} 
       accept="image/png, image/gif, image/jpeg"
        onChange={handelFileUpload}
       />
        <input
          defaultValue={userdata?.userInfo?.username}
          type="text"
          placeholder="Enter here"
          onChange={(event) => {
            handeleUpdate(event, "username");
          }}
          className="input input-bordered w-full"
        />
      </div>
      <textarea
        defaultValue={userdata?.userInfo?.bio}
        className="textarea textarea-bordered mt-3 w-full"
        placeholder="Bio"
        onChange={(event) => {
          handeleUpdate(event, "bio");
        }}
      ></textarea>

      <div>
        <div className="flex gap-3 mt-6">
          <MapPin
            className={`h-12 w-12 p-3 text-blue-400 rounded-md hover:bg-gray-600 ${selectedOption === 'location' && 'bg-gray-600'}`}
            onClick={() => setSlectedOption("location")}
          />
          <Link2
            className={`h-12 w-12 p-3 text-yellow-400 rounded-md hover:bg-gray-600 ${selectedOption === 'link' && 'bg-gray-600'}`}
            onClick={() => setSlectedOption("link")}
          />
        </div>

        {selectedOption === "location" ? (
          <div className="mt-2">
            <label className="input input-bordered flex items-center gap-2">
              <MapPin className="" />
              
              <input type="text" className="grow" placeholder="enter your location" 
              defaultValue={userdata?.userInfo?.location}
              onChange={(event) => handeleUpdate(event,'location')}
              key={1}
              />
            </label>
          </div>
        ) : selectedOption === "link" ? (
          <div className="mt-2">
            <label className="input input-bordered flex items-center gap-2">
              <Link2 className="" />
              <input type="text" className="grow" placeholder="your links" 
                onChange={(event) => handeleUpdate(event,'link')}
                key={2}
                defaultValue={userdata?.userInfo?.link}
              />
            </label>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default BasicDetails;
