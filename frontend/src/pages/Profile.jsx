import { useProfile } from "../queries/useProfile";

const Profile = () => {

  const { data, isLoading, error } = useProfile();

  if (isLoading) { 
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-lg font-medium">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-red-500">Error loading profile</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white p-8 rounded-xl shadow-md w-[350px] space-y-4">

        <h2 className="text-2xl font-semibold text-center text-black">
          Profile
        </h2>

        <div className="border border-gray-200 rounded-md p-3">
          <p className="text-gray-500 text-sm">Name</p>
          <p className="text-black font-medium">{data.name}</p>
        </div>

        <div className="border border-gray-200 rounded-md p-3">
          <p className="text-gray-500 text-sm">Email</p>
          <p className="text-black font-medium">{data.email}</p>
        </div>

      </div>

    </div>
  );
};

export default Profile;