import React from "react";
import {
  User as UserIcon,
  Briefcase,
  Layers,
  Code2,
  Github,
  Linkedin,
  Globe,
  Mars,
  Venus,
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
    <div className="w-[400px] mx-auto rounded-3xl overflow-hidden shadow-lg bg-[#0b0b0b]/90 backdrop-blur-3xl  border border-gray-800 hover:shadow-2xl transition flex flex-col select-none">
      {/* Profile photo with gradient overlay */}
      <div className="w-full h-96 bg-[#111] relative">
        {photoURL ? (
          <>
            <img
            className="w-full h-full object-cover"
              src={
                typeof user.photoURL === "string"
                  ? user.photoURL
                  : user.photoURL
                  ? URL.createObjectURL(user.photoURL)
                  : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIf4R5qPKHPNMyAqV-FjS_OTBB8pfUV29Phg&s"
              }
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

            {/* Name, Age, Gender overlay */}
            <div className="absolute bottom-4 left-6 text-white drop-shadow-lg">
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
          <div className="h-full w-full flex items-center justify-center bg-[#111]">
            <UserIcon className="h-12 w-12 text-gray-500" />
          </div>
        )}
      </div>

      {/* Body */}
      <div className="p-6 -mt-2 flex-1 flex flex-col text-gray-300">
        {/* Description */}
        {description && (
          <p className="text-[17px] leading-6 font-semibold text-gray-200">
            {description}
          </p>
        )}

        {/* Role & Experience pills */}
        <div className="mt-3 flex flex-wrap gap-2">
          <span className="inline-flex items-center gap-2 rounded-full border border-gray-700 bg-[#1a1a1a]/70 px-3 py-1 text-xs font-medium text-gray-300">
            <Briefcase className="h-3.5 w-3.5 text-[hsl(var(--brand-end))]" />
            {role}
          </span>
          <span className="inline-flex items-center gap-2 rounded-full border border-gray-700 bg-[#1a1a1a]/70 px-3 py-1 text-xs font-medium text-gray-300">
            <Layers className="h-3.5 w-3.5 text-[hsl(var(--brand-start))]" />
            {experience}
          </span>
        </div>

        {/* Skills */}
        {skills?.length > 0 && (
          <div className="mt-5">
            <div className="flex items-center gap-2 mb-2 text-gray-400">
              <Code2 className="h-4 w-4 text-[hsl(var(--brand-end))]" />
              <span className="text-xs font-semibold tracking-wide uppercase">
                Skills
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {skills.slice(0, 6).map((s, i) => (
                <span
                  key={`${s}-${i}`}
                  className="text-xs px-2 py-1 rounded-lg border border-gray-700 bg-[#1a1a1a]/70 text-gray-300"
                >
                  {s}
                </span>
              ))}
              {skills.length > 6 && (
                <span className="text-xs px-2 py-1 rounded-lg border border-gray-700 bg-[#1a1a1a]/70 text-gray-400">
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
                className="h-10 w-10 rounded-full grid place-items-center bg-[#0b0b0b]/70 border border-gray-700 hover:bg-[#0A66C2]/20 transition"
              >
                <Linkedin className="h-5 w-5 text-[#0A66C2]" />
              </a>
            )}
            {safeUrl(github) && (
              <a
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="h-10 w-10 rounded-full grid place-items-center bg-[#0b0b0b]/70 border border-gray-700 hover:bg-gray-700/40 transition"
              >
                <Github className="h-5 w-5 text-gray-200" />
              </a>
            )}
            {safeUrl(website) && (
              <a
                href={website}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Website"
                className="h-10 w-10 rounded-full grid place-items-center bg-[#0b0b0b]/70 border border-gray-700 hover:bg-green-600/20 transition"
              >
                <Globe className="h-5 w-5 text-green-400" />
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserCard;
