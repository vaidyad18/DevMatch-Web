import React from "react";
import {
  User as UserIcon,
  Calendar,
  Briefcase,
  Layers,
  Code2,
  Github,
  Linkedin,
  Globe,
  Mars,
  Venus,
  Circle,
  VenusAndMars,
} from "lucide-react";

const UserCard = ({ user }) => {
  const {
    firstName = "",
    lastName = "",
    age,
    gender,
    role = "Student",
    experience = "Fresher",
    linkedin,
    github,
    website,
    description = "Hey there! I am using DevMatch.",
    skills = [],
    photoURL,
  } = user;

  const name = `${firstName} ${lastName}`.trim() || "Unknown Dev";
  const GenderIcon =
    gender === "Male" ? Mars : gender === "Female" ? Venus : VenusAndMars;

  const safeUrl = (u) => (u && /^https?:\/\//i.test(u) ? u : undefined);

  return (
    <div
      className="w-[400px] mx-auto rounded-3xl overflow-hidden shadow-lg bg-white hover:shadow-2xl transition flex flex-col select-none"
      style={{
        background:
          "linear-gradient(#ffffff,#ffffff) padding-box, linear-gradient(90deg,hsl(var(--brand-start)),hsl(var(--brand-end))) border-box",
        border: "1px solid transparent",
      }}
    >
      {/* Profile photo with gradient overlay */}
      <div className="w-full h-96 bg-[hsl(220_13%_96%)] relative">
        {photoURL ? (
          <>
            <img
              src={photoURL}
              alt={name}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

            {/* Name, Age, Gender overlay */}
            <div className="absolute bottom-4 left-6 text-white">
              <h2 className="text-2xl font-bold">
                {name}
                {age && `, ${age}`}
              </h2>
              {gender && (
                <div className="flex items-center gap-1 mt-1 text-sm opacity-90">
                  <GenderIcon className="h-4 w-4" />
                  {gender}
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="h-full w-full flex items-center justify-center">
            <UserIcon className="h-12 w-12 text-[hsl(232_10%_45%)]" />
          </div>
        )}
      </div>

      {/* Body */}
      <div className="p-6 -mt-2 flex-1 flex flex-col">
        {/* Description */}
        {description && (
          <p className="text-[17px] leading-6 font-semibold text-[hsl(232_10%_35%)]">
            {description}
          </p>
        )}

        {/* Role & Experience pills */}
        <div className="mt-3 flex flex-wrap gap-2">
          <span className="inline-flex items-center gap-2 rounded-full border border-[hsl(220_13%_90%)] bg-[hsl(220_13%_98%)] px-3 py-1 text-xs font-medium text-[hsl(232_10%_40%)]">
            <Briefcase className="h-3.5 w-3.5" />
            {role}
          </span>
          <span className="inline-flex items-center gap-2 rounded-full border border-[hsl(220_13%_90%)] bg-[hsl(220_13%_98%)] px-3 py-1 text-xs font-medium text-[hsl(232_10%_40%)]">
            <Layers className="h-3.5 w-3.5" />
            {experience}
          </span>
        </div>

        {/* Skills */}
        {skills?.length > 0 && (
          <div className="mt-5">
            <div className="flex items-center gap-2 mb-2 text-[hsl(232_10%_45%)]">
              <Code2 className="h-4 w-4" />
              <span className="text-xs font-semibold tracking-wide">
                Skills
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {skills.slice(0, 6).map((s, i) => (
                <span
                  key={`${s}-${i}`}
                  className="text-xs px-2 py-1 rounded-lg border border-[hsl(220_13%_90%)] bg-[hsl(220_13%_98%)] text-[hsl(232_10%_45%)]"
                >
                  {s}
                </span>
              ))}
              {skills.length > 6 && (
                <span className="text-xs px-2 py-1 rounded-lg border border-[hsl(220_13%_90%)] bg-[hsl(220_13%_98%)] text-[hsl(232_10%_45%)]">
                  +{skills.length - 6} more
                </span>
              )}
            </div>
          </div>
        )}

        {/* Social icons */}
        {(safeUrl(linkedin) || safeUrl(github) || safeUrl(website)) && (
          <div className="mt-6 flex items-center gap-3">
            {safeUrl(linkedin) && (
              <a
                href={linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="h-10 w-10 rounded-full grid place-items-center bg-white shadow border border-gray-200 transition hover:bg-blue-100 hover:text-white"
              >
                <Linkedin className="h-5 w-5 text-[#0A66C2] group-hover:text-white" />
              </a>
            )}
            {safeUrl(github) && (
              <a
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="h-10 w-10 rounded-full grid place-items-center bg-white shadow border border-gray-200 transition hover:bg-gray-300 hover:text-white"
              >
                <Github className="h-5 w-5 text-black group-hover:text-white" />
              </a>
            )}
            {safeUrl(website) && (
              <a
                href={website}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Website"
                className="h-10 w-10 rounded-full grid place-items-center bg-white shadow border border-gray-200 transition hover:bg-green-100 hover:text-white"
              >
                <Globe className="h-5 w-5 text-green-600 group-hover:text-white" />
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserCard;
