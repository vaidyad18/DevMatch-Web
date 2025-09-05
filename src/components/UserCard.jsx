  const UserCard = ({ user }) => {
    const { firstName, lastName, photoURL, description, gender, age } = user;

    const name = `${firstName || ""} ${lastName || ""}`.trim();

    return (
      <div className="relative rounded-2xl p-[1px] bg-gradient-to-r from-[hsl(20_95%_60%/.4)] to-[hsl(330_85%_65%/.4)] shadow-lg hover:shadow-xl transition">
        <div className="rounded-[calc(theme(borderRadius.2xl)-1px)] bg-white overflow-hidden">
          {/* Image */}
          <div className="h-60 w-full overflow-hidden relative">
            <img
              src={photoURL}
              alt={name || "User"}
              className="h-full w-full object-cover hover:scale-105 transition-transform"
            />
          </div>

          {/* Body */}
          <div className="p-5">
            <h2 className="text-xl font-bold text-[hsl(234_12%_12%)] truncate">
              {name}
            </h2>
            {gender && age && (
              <p className="mt-1 text-sm text-[hsl(232_10%_45%)]">
                {gender}, {age}
              </p>
            )}
            <p className="mt-3 text-sm text-[hsl(232_10%_35%)] line-clamp-3">
              {description}
            </p>
          </div>
        </div>
      </div>
    );
  };

  export default UserCard;
