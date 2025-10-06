import React, { useMemo, useState } from "react";
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

function SkillsInput({ value = [], onChange }) {
  const [input, setInput] = useState("");

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
    if (["Enter", ",", "Tab"].includes(e.key)) {
      e.preventDefault();
      addSkill(input);
    } else if (e.key === "Backspace" && !input && value.length) {
      removeSkill(value.length - 1);
    }
  };

  return (
    <div className="sm:col-span-2">
      <label className="mb-1.5 block text-sm font-medium text-[hsl(234_12%_12%)]">Skills</label>
      <div
        className="rounded-md border p-2 flex flex-wrap gap-2"
        style={{ borderColor: "hsl(220 13% 91%)" }}
      >
        {value.map((tag, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs border"
            style={{
              background: "hsl(var(--brand-start)/.1)",
              borderColor: "hsl(var(--brand-start)/.3)",
              color: "hsl(234 12% 12%)",
            }}
          >
            {tag}
            <button
              type="button"
              onClick={() => removeSkill(i)}
              className="opacity-70 hover:opacity-100"
            >
              <X className="h-3 w-3" />
            </button>
          </span>
        ))}
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={value.length ? "Add more (Enter)" : "e.g., React, Node.js"}
          className="flex-1 min-w-[10rem] px-2 py-1 outline-none text-sm bg-transparent"
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
  const [gender, setGender] = useState(user?.gender ?? "");
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
  const [submitted, setSubmitted] = useState(false);

  const dispatch = useDispatch();

  const errors = useMemo(() => {
    const e = {};
    if (!firstName?.trim() || firstName.trim().length < 3)
      e.firstName = "First name must be at least 3 characters.";
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
      if (digits.length < 7 || digits.length > 15)
        e.mobile = "Enter a valid phone number (7–15 digits).";
    }
    return e;
  }, [firstName, age, gender, tagline, role, experience, photoURL, linkedin, githubURL, website, mobile]);

  const handleSave = async () => {
    setSubmitted(true);
    const skillsInvalid = !Array.isArray(skills) || skills.length < 2;
    if (Object.keys(errors).length || skillsInvalid) {
      toast.error("Please fix the highlighted fields.", {
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
      const res = await axios.patch(`${BASE_URL}/profile/edit`, payload, { withCredentials: true });
      dispatch(addUser(res?.data?.user));
      toast.success("Profile updated successfully", {
        position: "bottom-right",
        transition: Bounce,
      });
    } catch {
      toast.error("Failed to update profile", {
        position: "bottom-right",
        transition: Bounce,
      });
    }
  };

  const handleCancel = () => window.location.reload();

  return (
    <div
      className="min-h-screen w-full px-4"
      style={{
        background:
          "radial-gradient(60rem 60rem at 10% -10%, hsl(var(--brand-start)/.15), transparent), radial-gradient(60rem 60rem at 90% 110%, hsl(var(--brand-end)/.15), transparent)",
      }}
    >
      <div className="mx-auto max-w-7xl py-10 flex items-start justify-center gap-8 lg:gap-12">
        <div className="w-full max-w-3xl">
          {/* Title outside card */}
          <div className="text-center mb-6">
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[hsl(var(--brand-start))] to-[hsl(var(--brand-end))]">
              Edit Profile
            </h1>
            <p className="mt-1 text-[hsl(232_10%_45%)]">Update your basic details</p>
          </div>

          {/* Gradient Card */}
          <div
            className="rounded-2xl mb-20 shadow-2xl"
            style={{
              background:
                "linear-gradient(#ffffff,#ffffff) padding-box, linear-gradient(90deg,hsl(var(--brand-start)),hsl(var(--brand-end))) border-box",
              border: "1px solid transparent",
            }}
          >
            <div className="rounded-2xl bg-white p-6 sm:p-8">
              {/* Form */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* First name */}
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-[hsl(234_12%_12%)]">First name</label>
                  <div className="relative">
                    <input
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="First name"
                      className={`w-full h-11 rounded-md px-10 border ${
                        errors.firstName ? "border-red-400" : "border-gray-300"
                      } focus-visible:ring-2 focus-visible:ring-[hsl(var(--brand-end))]`}
                    />
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  </div>
                  {errors.firstName && <p className="text-xs text-red-500 mt-1">{errors.firstName}</p>}
                </div>

                {/* Last name */}
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-[hsl(234_12%_12%)]">Last name</label>
                  <div className="relative">
                    <input
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      placeholder="Last name"
                      className="w-full h-11 rounded-md px-10 border border-gray-300 focus-visible:ring-2 focus-visible:ring-[hsl(var(--brand-end))]"
                    />
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  </div>
                </div>

                {/* Tagline */}
                <div className="sm:col-span-2">
                  <label className="mb-1.5 block text-sm font-medium text-[hsl(234_12%_12%)]">Tagline</label>
                  <input
                    value={tagline}
                    onChange={(e) => setTagline(e.target.value.slice(0, 100))}
                    className={`w-full h-11 rounded-md px-3 border ${
                      errors.tagline ? "border-red-400" : "border-gray-300"
                    } focus-visible:ring-2 focus-visible:ring-[hsl(var(--brand-end))]`}
                  />
                  <div className="flex justify-between text-xs mt-1 text-[hsl(232_10%_45%)]">
                    <span>Max 100 chars</span>
                    <span>{tagline.length}/100</span>
                  </div>
                </div>

                {/* Gender / Age / Mobile */}
                <div className="grid grid-cols-[1fr_auto_2fr] gap-4 sm:col-span-2">
                  {/* Gender */}
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-[hsl(234_12%_12%)]">Gender</label>
                    <div className="relative">
                      <select
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                        className="w-full h-11 rounded-md border border-gray-300 pl-10 pr-10 outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--brand-end))]"
                      >
                        <option value="" disabled>Choose gender</option>
                        {GENDER_OPTIONS.map((g) => (
                          <option key={g}>{g}</option>
                        ))}
                      </select>
                      <Users className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    </div>
                  </div>

                  {/* Age */}
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-[hsl(234_12%_12%)]">Age</label>
                    <div className="relative">
                      <input
                        type="number"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        className="w-24 h-11 rounded-md border border-gray-300 pl-10 focus-visible:ring-2 focus-visible:ring-[hsl(var(--brand-end))]"
                      />
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    </div>
                  </div>

                  {/* Mobile */}
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-[hsl(234_12%_12%)]">Mobile</label>
                    <div className="relative">
                      <input
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value)}
                        placeholder="9876543210"
                        className="w-full h-11 rounded-md border border-gray-300 pl-10 focus-visible:ring-2 focus-visible:ring-[hsl(var(--brand-end))]"
                      />
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    </div>
                  </div>
                </div>

                {/* Photo URL */}
                <div className="sm:col-span-2">
                  <label className="mb-1.5 block text-sm font-medium text-[hsl(234_12%_12%)]">Photo URL</label>
                  <div className="relative">
                    <input
                      value={photoURL}
                      onChange={(e) => setPhotoURL(e.target.value)}
                      placeholder="https://example.com/avatar.jpg"
                      className="w-full h-11 rounded-md border border-gray-300 px-10 focus-visible:ring-2 focus-visible:ring-[hsl(var(--brand-end))]"
                    />
                    <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  </div>
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
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      className="w-full h-11 rounded-md border border-gray-300 px-10 focus-visible:ring-2 focus-visible:ring-[hsl(var(--brand-end))]"
                    />
                    <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  </div>
                </div>

                {/* Experience */}
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-[hsl(234_12%_12%)]">Experience</label>
                  <div className="relative">
                    <select
                      value={experience}
                      onChange={(e) => setExperience(e.target.value)}
                      className="w-full h-11 rounded-md border border-gray-300 pl-10 pr-10 focus-visible:ring-2 focus-visible:ring-[hsl(var(--brand-end))]"
                    >
                      {EXPERIENCE_OPTIONS.map((opt) => (
                        <option key={opt}>{opt}</option>
                      ))}
                    </select>
                    <BadgeCheck className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  </div>
                </div>

                {/* LinkedIn */}
                <div className="sm:col-span-2">
                  <label className="mb-1.5 block text-sm font-medium text-[hsl(234_12%_12%)]">LinkedIn</label>
                  <div className="relative">
                    <input
                      value={linkedin}
                      onChange={(e) => setLinkedin(e.target.value)}
                      placeholder="https://www.linkedin.com/in/username"
                      className="w-full h-11 rounded-md border border-gray-300 px-10 focus-visible:ring-2 focus-visible:ring-[hsl(var(--brand-end))]"
                    />
                    <Linkedin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  </div>
                </div>

                {/* GitHub */}
                <div className="sm:col-span-2">
                  <label className="mb-1.5 block text-sm font-medium text-[hsl(234_12%_12%)]">GitHub</label>
                  <div className="relative">
                    <input
                      value={githubURL}
                      onChange={(e) => setGithubURL(e.target.value)}
                      placeholder="https://github.com/username"
                      className="w-full h-11 rounded-md border border-gray-300 px-10 focus-visible:ring-2 focus-visible:ring-[hsl(var(--brand-end))]"
                    />
                    <Github className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  </div>
                </div>

                {/* Website */}
                <div className="sm:col-span-2">
                  <label className="mb-1.5 block text-sm font-medium text-[hsl(234_12%_12%)]">Personal Website</label>
                  <div className="relative">
                    <input
                      value={website}
                      onChange={(e) => setWebsite(e.target.value)}
                      placeholder="https://yourdomain.com"
                      className="w-full h-11 rounded-md border border-gray-300 px-10 focus-visible:ring-2 focus-visible:ring-[hsl(var(--brand-end))]"
                    />
                    <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  </div>
                </div>
              </div>

              {/* Buttons */}
              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleSave}
                  className="inline-flex items-center justify-center rounded-md h-11 px-4 text-white font-medium bg-gradient-to-r from-[hsl(var(--brand-start))] to-[hsl(var(--brand-end))] hover:opacity-95"
                >
                  <Save className="h-4 w-4 mr-2" /> Save changes
                </button>
                <button
                  onClick={handleCancel}
                  className="inline-flex items-center justify-center rounded-md h-11 px-4 border border-gray-300 bg-white hover:bg-gray-50 text-[hsl(234_12%_12%)]"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Preview */}
        <div className="hidden lg:block w-[360px] mt-24 mb-20 shrink-0 sticky top-8">
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
              linkedin,
              github: githubURL,
              website,
            }}
          />
        </div>
      </div>

      <ToastContainer position="bottom-right" transition={Bounce} />
    </div>
  );
};

export default EditProfile;
