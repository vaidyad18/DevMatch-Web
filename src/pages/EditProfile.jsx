import React, { useMemo, useRef, useState } from "react";
import {
  User,
  Users,
  Calendar,
  Link as LinkIcon,
  Save,
  Phone,
  Globe,
  Github,
  Linkedin,
  Briefcase,
  BadgeCheck,
  X,
  Plus,
  ChevronDown,
} from "lucide-react";
import UserCard from "../components/UserCard";
import axios from "axios";
import { BASE_URL } from "../lib/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const normalizeUrl = (val) => {
  if (!val) return "";
  try {
    const hasProtocol = /^https?:\/\//i.test(val);
    return hasProtocol ? val : `https://${val}`;
  } catch {
    return val;
  }
};

const isHttpUrl = (val) => {
  if (!val) return true;
  try {
    const u = new URL(normalizeUrl(val));
    return u.protocol === "http:" || u.protocol === "https:";
  } catch {
    return false;
  }
};

const onlyDigits = (s) => s.replace(/\D/g, "");

function SkillsInput({ value = [], onChange, label = "Skills" }) {
  const [input, setInput] = useState("");
  const inputRef = useRef(null);

  const addSkill = (raw) => {
    const s = raw.trim();
    if (!s) return;
    const exists = value.some((v) => v.toLowerCase() === s.toLowerCase());
    if (!exists) onChange([...value, s]);
    setInput("");
  };

  const removeSkill = (idx) => {
    const next = value.slice();
    next.splice(idx, 1);
    onChange(next);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === "," || e.key === "Tab") {
      e.preventDefault();
      addSkill(input);
    } else if (e.key === "Backspace" && !input && value.length) {
      removeSkill(value.length - 1);
    }
  };

  return (
    <div className="sm:col-span-2">
      <label className="mb-1.5 block text-sm font-medium text-[hsl(234_12%_12%)]">
        {label}
      </label>
      <div className="rounded-md border border-gray-300 p-2 flex flex-wrap gap-2 focus-within:ring-2 focus-within:ring-[hsl(20_95%_60%/.35)]">
        {value.map((tag, i) => (
          <span
            key={`${tag}-${i}`}
            className="inline-flex items-center gap-1 rounded-md bg-[hsl(20_95%_60%/0.12)] text-[hsl(234_12%_12%)] px-2 py-1 text-xs border border-[hsl(20_95%_60%/0.3)]"
          >
            {tag}
            <button
              type="button"
              onClick={() => removeSkill(i)}
              className="opacity-70 hover:opacity-100"
              aria-label={`Remove ${tag}`}
              title="Remove"
            >
              <X className="h-3 w-3" />
            </button>
          </span>
        ))}
        <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={value.length ? "Add more (Enter)" : "e.g., React, Node.js"}
          className="flex-1 min-w-[10rem] px-2 py-1 outline-none text-sm"
        />
        <button
          type="button"
          onClick={() => addSkill(input)}
          className="inline-flex items-center gap-1 rounded-md border border-[hsl(220_13%_91%)] bg-white hover:bg-[hsl(220_13%_96%)] text-[hsl(234_12%_12%)] px-2 py-1 text-xs"
        >
          <Plus className="h-3 w-3" />
          Add
        </button>
      </div>
      <p className="mt-1 text-xs text-[hsl(232_10%_45%)]">
        Press <span className="font-semibold">Enter</span> or <span className="font-semibold">,</span> to add.
      </p>
    </div>
  );
}

const GENDER_OPTIONS = ["Male", "Female", "Other"];
const EXPERIENCE_OPTIONS = ["Fresher", "Beginner", "Intermediate", "Advanced"];

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user?.firstName ?? "");
  const [lastName, setLastName] = useState(user?.lastName ?? "");
  const [gender, setGender] = useState(user?.gender ?? ""); // no default "Male"
  const [age, setAge] = useState(user?.age ?? 18);
  const [mobile, setMobile] = useState(user?.mobile ? String(user.mobile) : "");
  const [tagline, setTagline] = useState(user?.description ?? "Hey there! I am using DevMatch.");
  const [photoURL, setPhotoURL] = useState(user?.photoURL ?? "");
  const [skills, setSkills] = useState(Array.isArray(user?.skills) ? user.skills : []);
  const [role, setRole] = useState(user?.role ?? "Student");
  const [experience, setExperience] = useState(user?.experience ?? "Fresher");
  const [linkedin, setLinkedin] = useState(user?.linkedin ?? "");
  const [githubURL, setGithubURL] = useState(user?.github ?? "");
  const [website, setWebsite] = useState(user?.website ?? "");

  const [submitted, setSubmitted] = useState(false); // to gate skills error only on save
  const dispatch = useDispatch();

  const errors = useMemo(() => {
    const e = {};
    if (!firstName?.trim() || firstName.trim().length < 3) e.firstName = "First name must be at least 3 characters.";
    if (age == null || age === "" || Number(age) < 15) e.age = "Age must be 15 or above.";
    if (!gender) e.gender = "Select a valid gender.";
    if (!tagline?.trim()) e.tagline = "Tagline is required.";
    if (tagline.length > 100) e.tagline = "Maximum 100 characters allowed.";
    if (!role?.trim()) e.role = "Role is required.";
    if (!EXPERIENCE_OPTIONS.includes(experience)) e.experience = "Select a valid experience level.";
    if (photoURL && !isHttpUrl(photoURL)) e.photoURL = "Enter a valid URL.";
    if (linkedin && !isHttpUrl(linkedin)) e.linkedin = "Invalid LinkedIn URL.";
    if (githubURL && !isHttpUrl(githubURL)) e.github = "Invalid GitHub URL.";
    if (website && !isHttpUrl(website)) e.website = "Invalid website URL.";
    if (mobile) {
      const digits = onlyDigits(mobile);
      if (digits.length < 7 || digits.length > 15) e.mobile = "Enter a valid phone number (7–15 digits).";
    }
    // NOTE: skills validation handled on save (to only show then)
    return e;
  }, [firstName, age, gender, tagline, role, experience, photoURL, linkedin, githubURL, website, mobile]);

  const handleSave = async () => {
    setSubmitted(true); // show skills error if needed

    const skillsInvalid = !Array.isArray(skills) || skills.length < 2;
    if (Object.keys(errors).length || skillsInvalid) {
      toast.error("Please fix the highlighted fields.", {
        autoClose: 2000,
        position: "bottom-right",
        transition: Bounce,
      });
      return;
    }

    try {
      const payload = {
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        age: Number(age),
        gender,
        description: tagline.trim(),
        photoURL: photoURL ? normalizeUrl(photoURL) : "",
        mobile: mobile ? Number(onlyDigits(mobile)) : undefined,
        skills,
        role,
        experience,
        linkedin: linkedin ? normalizeUrl(linkedin) : "",
        github: githubURL ? normalizeUrl(githubURL) : "",
        website: website ? normalizeUrl(website) : "",
      };
      Object.keys(payload).forEach((k) => payload[k] === undefined && delete payload[k]);
      const res = await axios.patch(`${BASE_URL}/profile/edit`, payload, { withCredentials: true });
      dispatch(addUser(res?.data?.user));
      toast.success("Profile updated successfully", {
        autoClose: 2000,
        position: "bottom-right",
        closeOnClick: true,
        pauseOnHover: true,
        hideProgressBar: false,
        progressStyle: { height: "3px", background: "linear-gradient(90deg, hsl(20 95% 60%), hsl(330 85% 65%))" },
        style: { border: "1px solid hsl(220 13% 91%)", boxShadow: "0 10px 30px rgba(0,0,0,0.08)" },
        transition: Bounce,
        theme: "light",
      });
    } catch (err) {
      toast.error("Failed to update profile", {
        autoClose: 2200,
        position: "bottom-right",
        hideProgressBar: false,
        progressStyle: { height: "3px", background: "hsl(0 85% 60%)" },
        transition: Bounce,
        theme: "light",
      });
      console.error(err);
    }
  };

  const handleCancel = () => {
    setFirstName(user?.firstName ?? "");
    setLastName(user?.lastName ?? "");
    setGender(user?.gender ?? "");
    setAge(user?.age ?? 18);
    setMobile(user?.mobile ? String(user.mobile) : "");
    setTagline(user?.description ?? "Hey there! I am using DevMatch.");
    setPhotoURL(user?.photoURL ?? "");
    setSkills(Array.isArray(user?.skills) ? user.skills : []);
    setRole(user?.role ?? "Student");
    setExperience(user?.experience ?? "Fresher");
    setLinkedin(user?.linkedin ?? "");
    setGithubURL(user?.github ?? "");
    setWebsite(user?.website ?? "");
    setSubmitted(false);
  };

  return (
    <div className="min-h-screen w-full px-4 bg-[radial-gradient(60rem_60rem_at_10%_-10%,hsl(20_95%_60%/.15),transparent)]">
      <div className="mx-auto max-w-7xl py-8 flex items-start justify-center gap-8 lg:gap-12">
        <div className="w-full max-w-3xl">
          <div className="text-center mb-6">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[hsl(234_12%_12%)]">Edit profile</h1>
            <p className="mt-1 text-[hsl(232_10%_45%)]">Update your basic details.</p>
          </div>

          <div className="relative rounded-2xl p-[1px] bg-gradient-to-r from-[hsl(20_95%_60%/.35)] to-[hsl(330_85%_65%/.35)] shadow-2xl">
            <div className="rounded-[calc(theme(borderRadius.2xl)-1px)] bg-white border border-[hsl(220_13%_91%)] p-6 sm:p-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* First Name */}
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-[hsl(234_12%_12%)]">First name</label>
                  <div className="relative">
                    <input
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="First name"
                      className={`w-full h-11 rounded-md text-black border px-10 outline-none ${
                        errors.firstName ? "border-red-400" : "border-gray-300"
                      }`}
                    />
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[hsl(232_10%_45%)]" />
                  </div>
                  {errors.firstName && <p className="mt-1 text-xs text-red-500">{errors.firstName}</p>}
                </div>

                {/* Last Name */}
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-[hsl(234_12%_12%)]">Last name</label>
                  <div className="relative">
                    <input
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      placeholder="Last name"
                      className="w-full h-11 rounded-md text-black border border-gray-300 px-10 outline-none"
                    />
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[hsl(232_10%_45%)]" />
                  </div>
                </div>

                {/* Tagline (100 chars) */}
                <div className="sm:col-span-2">
                  <label className="mb-1.5 block text-sm font-medium text-[hsl(234_12%_12%)]">Tagline</label>
                  <div className="relative">
                    <input
                      type="text"
                      value={tagline}
                      onChange={(e) => setTagline(e.target.value.slice(0, 100))}
                      placeholder="Tell the community about yourself…"
                      className={`w-full h-11 rounded-md text-black border px-3 outline-none placeholder:text-[hsl(232_10%_65%)] ${
                        errors.tagline ? "border-red-400" : "border-gray-300"
                      }`}
                    />
                  </div>
                  <div className="mt-1 flex justify-between text-xs">
                    <span className="text-[hsl(232_10%_45%)]">Max 100 characters</span>
                    <span className={`${tagline.length > 100 ? "text-red-500" : "text-[hsl(232_10%_45%)]"}`}>
                      {tagline.length}/100 chars
                    </span>
                  </div>
                  {errors.tagline && <p className="mt-1 text-xs text-red-500">{errors.tagline}</p>}
                </div>

                {/* Gender, Age (narrow), Mobile (wide) */}
                <div className="grid grid-cols-[1fr_auto_2fr] gap-4 sm:col-span-2">
                  {/* Gender select with custom chevron & placeholder */}
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-[hsl(234_12%_12%)]">Gender</label>
                    <div className="relative">
                      <select
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                        className={`w-full h-11 rounded-md text-black border pl-10 pr-10 outline-none bg-white appearance-none ${
                          errors.gender ? "border-red-400" : "border-gray-300"
                        }`}
                      >
                        <option value="" disabled>
                          Choose gender
                        </option>
                        {GENDER_OPTIONS.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                      <Users className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[hsl(232_10%_45%)]" />
                      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[hsl(232_10%_45%)]" />
                    </div>
                    {errors.gender && <p className="mt-1 text-xs text-red-500">{errors.gender}</p>}
                  </div>

                  {/* Age (compact) */}
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-[hsl(234_12%_12%)]">Age</label>
                    <div className="relative">
                      <input
                        type="number"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        placeholder="Age"
                        className={`w-24 h-11 rounded-md text-black border pl-10 pr-3 outline-none ${
                          errors.age ? "border-red-400" : "border-gray-300"
                        }`}
                      />
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[hsl(232_10%_45%)]" />
                    </div>
                    {errors.age && <p className="mt-1 text-xs text-red-500">{errors.age}</p>}
                  </div>

                  {/* Mobile (wider) */}
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-[hsl(234_12%_12%)]">Mobile (optional)</label>
                    <div className="relative">
                      <input
                        inputMode="tel"
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value)}
                        placeholder="e.g., 9876543210"
                        className={`w-full h-11 rounded-md text-black border pl-10 pr-3 outline-none ${
                          errors.mobile ? "border-red-400" : "border-gray-300"
                        }`}
                      />
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[hsl(232_10%_45%)]" />
                    </div>
                    {errors.mobile && <p className="mt-1 text-xs text-red-500">{errors.mobile}</p>}
                  </div>
                </div>

                {/* Photo URL */}
                <div className="sm:col-span-2">
                  <label className="mb-1.5 block text-sm font-medium text-[hsl(234_12%_12%)]">Photo URL</label>
                  <div className="relative">
                    <input
                      type="text"
                      value={photoURL}
                      onChange={(e) => setPhotoURL(e.target.value)}
                      placeholder="https://example.com/avatar.jpg"
                      className={`w-full h-11 rounded-md text-black border px-10 outline-none ${
                        errors.photoURL ? "border-red-400" : "border-gray-300"
                      }`}
                    />
                    <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[hsl(232_10%_45%)]" />
                  </div>
                  {errors.photoURL && <p className="mt-1 text-xs text-red-500">{errors.photoURL}</p>}
                </div>

                {/* Skills */}
                <SkillsInput value={skills} onChange={setSkills} />
                {submitted && skills.length < 2 && (
                  <p className="sm:col-span-2 -mt-2 text-xs text-red-500">Add at least 2 skills.</p>
                )}

                {/* Role */}
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-[hsl(234_12%_12%)]">Role</label>
                  <div className="relative">
                    <input
                      type="text"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      placeholder="e.g., Student, Full-Stack Developer"
                      className={`w-full h-11 rounded-md text-black border px-10 outline-none ${
                        errors.role ? "border-red-400" : "border-gray-300"
                      }`}
                    />
                    <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[hsl(232_10%_45%)]" />
                  </div>
                  {errors.role && <p className="mt-1 text-xs text-red-500">{errors.role}</p>}
                </div>

                {/* Experience select fixed arrow */}
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-[hsl(234_12%_12%)]">Experience</label>
                  <div className="relative">
                    <select
                      value={experience}
                      onChange={(e) => setExperience(e.target.value)}
                      className={`w-full h-11 rounded-md text-black border pl-10 pr-10 outline-none bg-white appearance-none ${
                        errors.experience ? "border-red-400" : "border-gray-300"
                      }`}
                    >
                      {EXPERIENCE_OPTIONS.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                    <BadgeCheck className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[hsl(232_10%_45%)]" />
                    <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[hsl(232_10%_45%)]" />
                  </div>
                  {errors.experience && <p className="mt-1 text-xs text-red-500">{errors.experience}</p>}
                </div>

                {/* LinkedIn */}
                <div className="sm:col-span-2">
                  <label className="mb-1.5 block text-sm font-medium text-[hsl(234_12%_12%)]">LinkedIn (optional)</label>
                  <div className="relative">
                    <input
                      type="text"
                      value={linkedin}
                      onChange={(e) => setLinkedin(e.target.value)}
                      placeholder="https://www.linkedin.com/in/username"
                      className={`w-full h-11 rounded-md text-black border px-10 outline-none ${
                        errors.linkedin ? "border-red-400" : "border-gray-300"
                      }`}
                    />
                    <Linkedin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[hsl(232_10%_45%)]" />
                  </div>
                  {errors.linkedin && <p className="mt-1 text-xs text-red-500">{errors.linkedin}</p>}
                </div>

                {/* GitHub */}
                <div className="sm:col-span-2">
                  <label className="mb-1.5 block text-sm font-medium text-[hsl(234_12%_12%)]">GitHub (optional)</label>
                  <div className="relative">
                    <input
                      type="text"
                      value={githubURL}
                      onChange={(e) => setGithubURL(e.target.value)}
                      placeholder="https://github.com/username"
                      className={`w-full h-11 rounded-md text-black border px-10 outline-none ${
                        errors.github ? "border-red-400" : "border-gray-300"
                      }`}
                    />
                    <Github className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[hsl(232_10%_45%)]" />
                  </div>
                  {errors.github && <p className="mt-1 text-xs text-red-500">{errors.github}</p>}
                </div>

                {/* Website */}
                <div className="sm:col-span-2">
                  <label className="mb-1.5 block text-sm font-medium text-[hsl(234_12%_12%)]">Personal Website (optional)</label>
                  <div className="relative">
                    <input
                      type="text"
                      value={website}
                      onChange={(e) => setWebsite(e.target.value)}
                      placeholder="https://yourdomain.com"
                      className={`w-full h-11 rounded-md text-black border px-10 outline-none ${
                        errors.website ? "border-red-400" : "border-gray-300"
                      }`}
                    />
                    <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[hsl(232_10%_45%)]" />
                  </div>
                  {errors.website && <p className="mt-1 text-xs text-red-500">{errors.website}</p>}
                </div>
              </div>

              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={handleSave}
                  className="inline-flex cursor-pointer items-center justify-center rounded-md h-11 px-4 text-white font-medium bg-gradient-to-r from-[hsl(20_95%_60%)] to-[hsl(330_85%_65%)] hover:opacity-95"
                >
                  <Save className="h-4 w-4 mr-2" />
                  Save changes
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="inline-flex cursor-pointer items-center justify-center rounded-md h-11 px-4 border border-[hsl(220_13%_91%)] bg-white hover:bg-[hsl(220_13%_96%)] text-[hsl(234_12%_12%)]"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Preview card stays sticky on the right (unchanged) */}
        <div className="hidden lg:block w-[360px] shrink-0 sticky top-8">
          <UserCard
            user={{
              firstName,
              lastName,
              age: Number(age),
              gender,
              description: tagline,
              photoURL,
              mobile: mobile ? Number(onlyDigits(mobile)) : undefined,
              skills,
              role,
              experience,
              linkedin: linkedin ? normalizeUrl(linkedin) : "",
              github: githubURL ? normalizeUrl(githubURL) : "",
              website: website ? normalizeUrl(website) : "",
            }}
          />
        </div>
      </div>

      {/* Mobile preview */}
      <div className="lg:hidden mt-8 flex justify-center">
        <UserCard
          user={{
            firstName,
            lastName,
            age: Number(age),
            gender,
            description: tagline,
            photoURL,
            mobile: mobile ? Number(onlyDigits(mobile)) : undefined,
            skills,
            role,
            experience,
            linkedin: linkedin ? normalizeUrl(linkedin) : "",
            github: githubURL ? normalizeUrl(githubURL) : "",
            website: website ? normalizeUrl(website) : "",
          }}
        />
      </div>

      <ToastContainer
        position="bottom-right"
        autoClose={2000}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        draggable={false}
        hideProgressBar={false}
        transition={Bounce}
        theme="dark"
      />
    </div>
  );
};

export default EditProfile;
