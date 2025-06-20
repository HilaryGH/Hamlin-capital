type Member = {
  _id: string;
  fullName: string;
  email: string;
  country: string;
  interests: string[];
  message: string;
  createdAt: string;
};

type Props = {
  members: Member[];
};

const DiasporaList = ({ members }: Props) => {
  return (
    <div className="mt-6 px-2 sm:px-4 lg:px-6">
      <h2 className="text-base sm:text-lg  font-semibold text-blue-900 mb-4 text-center">
        Recent Community Members
      </h2>

      {/* Grid layout */}
      <div className="grid  grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {members.map((member) => (
          <div
            key={member._id}
            className=" bg-soft-gold border border-gray-200 rounded-lg shadow-sm p-4 text-xs hover:shadow-md transition"
          >
            <h3 className="text-sm font-semibold text-gray-900 mb-1">
              {member.fullName}
            </h3>

            <p className="text-xs text-gray-500 mb-1">{member.email}</p>

            <p className="text-xs text-gray-600 mb-1">
              <span className="font-medium">Country:</span> {member.country}
            </p>

            <p className="text-xs text-gray-600 mb-2 line-clamp-2">
              <span className="font-medium">Message:</span> {member.message}
            </p>

            <div className="text-[11px] text-blue-600">
              <span className="font-medium">Interests:</span>{" "}
              {member.interests.join(", ")}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DiasporaList;
