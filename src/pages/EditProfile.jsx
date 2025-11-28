import React, { useMemo, useState, useRef, useEffect } from "react";
import {
  User,
  Users,
  Calendar,
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
  ImageIcon,
  Trash2,
} from "lucide-react";
import UserCard from "../components/UserCard";
import LiquidEther from "../components/LiquidEther";
import axios from "axios";
import { BASE_URL } from "../lib/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BackButton from "../components/BackButton";

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

const onlyDigits = (s) => (s || "").toString().replace(/\D/g, "");

function SkillsInput({ value = [], onChange }) {
  const [input, setInput] = useState("");

  const addSkill = (raw) => {
    const s = (raw || "").trim();
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
      <label className="mb-1.5 block text-sm font-medium text-gray-400">
        Skills
      </label>
      <div className="rounded-md border p-2 flex flex-wrap gap-2 bg-[#0c0c0c]/70 backdrop-blur-md">
        {value.map((tag, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs border border-[hsl(var(--brand-start)/.5)] text-gray-200"
          >
            {tag}
            <button
              type="button"
              onClick={() => removeSkill(i)}
              className="opacity-70 hover:opacity-100 text-gray-300"
            >
              <X className="h-3 w-3" />
            </button>
          </span>
        ))}
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={
            value.length ? "Add more (Enter)" : "e.g., React, Node.js"
          }
          className="flex-1 min-w-[10rem] px-2 py-1 outline-none text-sm bg-transparent text-gray-200 placeholder-gray-500"
        />
        <button
          type="button"
          onClick={() => addSkill(input)}
          className="inline-flex items-center gap-1 rounded-md border border-[hsl(var(--brand-end)/.5)] text-white px-2 py-1 text-xs"
        >
          <Plus className="h-3 w-3" />
          Add
        </button>
      </div>
    </div>
  );
}

const GENDER_OPTIONS = ["Male", "Female", "Other"];
const EXPERIENCE_OPTIONS = ["Fresher", "Beginner", "Intermediate", "Advanced"];

const EditProfile = ({ user }) => {
  const etherRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const proxy = document.getElementById("ether-overlay");
    if (!proxy || !etherRef.current) return;
    const etherCanvas = etherRef.current.querySelector("canvas");
    if (!etherCanvas) return;
    const handleMove = (e) => {
      const fakeEvent = new MouseEvent("mousemove", {
        clientX: e.clientX,
        clientY: e.clientY,
      });
      etherCanvas.dispatchEvent(fakeEvent);
    };
    proxy.addEventListener("mousemove", handleMove);
    return () => proxy.removeEventListener("mousemove", handleMove);
  }, []);

  const [firstName, setFirstName] = useState(user?.firstName ?? "");
  const [lastName, setLastName] = useState(user?.lastName ?? "");
  const [gender, setGender] = useState(user?.gender ?? "");
  const [age, setAge] = useState(user?.age ?? 18);
  const [mobile, setMobile] = useState(user?.mobile ? String(user.mobile) : "");
  const [tagline, setTagline] = useState(
    user?.description ?? "Hey there! I am using DevMatch."
  );
  const [photoURL, setPhotoURL] = useState(user?.photoURL ?? "");
  const [previewUrl, setPreviewUrl] = useState(null);
  const [skills, setSkills] = useState(
    Array.isArray(user?.skills) ? user.skills : []
  );
  const [role, setRole] = useState(user?.role ?? "Student");
  const [experience, setExperience] = useState(user?.experience ?? "Fresher");
  const [linkedin, setLinkedin] = useState(user?.linkedin ?? "");
  const [githubURL, setGithubURL] = useState(user?.github ?? "");
  const [website, setWebsite] = useState(user?.website ?? "");
  const [submitted, setSubmitted] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (photoURL && typeof photoURL !== "string") {
      const url = URL.createObjectURL(photoURL);
      setPreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    } else {
      setPreviewUrl(null);
    }
  }, [photoURL]);

  const errors = useMemo(() => {
    const e = {};
    if (!firstName?.trim() || firstName.trim().length < 3)
      e.firstName = "First name must be at least 3 characters.";
    if (age == null || age === "" || Number(age) < 15)
      e.age = "Age must be 15 or above.";
    if (!gender) e.gender = "Select a valid gender.";
    if (!tagline?.trim()) e.tagline = "Tagline is required.";
    if (tagline.length > 100) e.tagline = "Maximum 100 characters allowed.";
    if (!role?.trim()) e.role = "Role is required.";
    if (!EXPERIENCE_OPTIONS.includes(experience))
      e.experience = "Select a valid experience level.";
    if (photoURL && typeof photoURL === "string" && !isHttpUrl(photoURL))
      e.photoURL = "Enter a valid URL.";
    if (linkedin && !isHttpUrl(linkedin)) e.linkedin = "Invalid LinkedIn URL.";
    if (githubURL && !isHttpUrl(githubURL)) e.github = "Invalid GitHub URL.";
    if (website && !isHttpUrl(website)) e.website = "Invalid website URL.";
    if (mobile) {
      const digits = onlyDigits(mobile);
      if (digits.length < 7 || digits.length > 15)
        e.mobile = "Enter a valid phone number (7–15 digits).";
    }
    return e;
  }, [
    firstName,
    age,
    gender,
    tagline,
    role,
    experience,
    photoURL,
    linkedin,
    githubURL,
    website,
    mobile,
  ]);

  const handleFileSelect = (file) => {
    if (!file) return;
    if (file.size && file.size > 5 * 1024 * 1024) {
      toast.error("Image size must be under 5MB.");
      return;
    }
    setPhotoURL(file);
  };

  const removeSelectedPhoto = () => {
    setPhotoURL("");
    setPreviewUrl(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

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
      const formData = new FormData();

      formData.append("firstName", firstName.trim());
      formData.append("lastName", lastName.trim());
      formData.append("age", Number(age));
      formData.append("gender", gender);
      formData.append("description", tagline.trim());
      formData.append("mobile", mobile ? Number(onlyDigits(mobile)) : "");
      formData.append("role", role);
      formData.append("experience", experience);
      formData.append("linkedin", linkedin ? normalizeUrl(linkedin) : "");
      formData.append("github", githubURL ? normalizeUrl(githubURL) : "");
      formData.append("website", website ? normalizeUrl(website) : "");

      skills.forEach((skill) => {
        formData.append("skills", skill);
      });

      if (photoURL && typeof photoURL !== "string") {
        formData.append("photo", photoURL);
      }

      const res = await axios.patch(`${BASE_URL}/profile/edit`, formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      dispatch(addUser(res?.data?.user));
      toast.success("Profile updated successfully", {
        position: "bottom-right",
      });
    } catch (err) {
      toast.error("Failed to update profile", {
        position: "bottom-right",
        transition: Bounce,
      });
    }
  };

  const handleCancel = () => window.location.reload();

  return (
    <div className="relative min-h-screen bg-black text-white">
      <div ref={etherRef} className="absolute inset-0 z-0 pointer-events-auto">
        <LiquidEther
          colors={["#5227FF", "#FF9FFC", "#B19EEF"]}
          mouseForce={20}
          cursorSize={100}
          isViscous={false}
          viscous={30}
          iterationsViscous={32}
          iterationsPoisson={32}
          resolution={0.5}
          isBounce={false}
          autoDemo={false}
          autoSpeed={0.5}
          autoIntensity={2.2}
          takeoverDuration={0.25}
          autoResumeDelay={3000}
          autoRampDuration={0.6}
        />
      </div>

      <div id="ether-overlay" className="absolute inset-0 z-10 pointer-events-none" />
      <div className="text-center pt-28 mb-8">
        <div className="absolute top-24 left-28">
          <BackButton />
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-[hsl(var(--brand-start))] to-[hsl(var(--brand-end))] text-transparent bg-clip-text">
          Edit Profile
        </h1>
        <p className="text-gray-400 mt-2 text-lg">Update your basic details</p>
      </div>

      <div className="relative z-20 max-w-7xl mx-auto px-6 pb-20 pt-6 grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-10">
        <div>
          <div className="bg-[#0c0c0c]/70 text-white border border-gray-500 rounded-2xl shadow-2xl p-6 sm:p-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-400">
                  First name
                </label>
                <div className="relative">
                  <input
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="Eg. John"
                    className={`w-full h-11 rounded-md px-10 border ${
                      errors.firstName ? "border-red-400" : "border-gray-300"
                    }`}
                  />
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-400">
                  Last name
                </label>
                <div className="relative">
                  <input
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Eg. Harley"
                    className="w-full h-11 rounded-md px-10 border border-gray-300"
                  />
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label className="mb-1.5 block text-sm font-medium text-gray-400">
                  Tagline
                </label>
                <input
                  value={tagline}
                  onChange={(e) => setTagline(e.target.value.slice(0, 100))}
                  className={`w-full h-11 rounded-md px-3 border ${
                    errors.tagline ? "border-red-400" : "border-gray-300"
                  }`}
                />
                <div className="flex justify-between text-xs mt-1 text-gray-500">
                  <span>Max 100 chars</span>
                  <span>{tagline.length}/100</span>
                </div>
              </div>

              <div className="grid grid-cols-[1fr_auto_2fr] gap-4 sm:col-span-2">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-400">
                    Gender
                  </label>
                  <div className="relative">
                    <select
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                      className={`w-full h-11 rounded-md border bg-[#0d0d0d]/70 text-gray-200 pl-10 pr-10 ${
                        errors.gender ? "border-red-400" : "border-gray-300"
                      }`}
                    >
                      <option value="" disabled>
                        Choose gender
                      </option>
                      {GENDER_OPTIONS.map((g) => (
                        <option key={g}>{g}</option>
                      ))}
                    </select>

                    <Users className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  </div>
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-400">
                    Age
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      className={`w-24 h-11 rounded-md border pl-10 ${
                        errors.age ? "border-red-400" : "border-gray-300"
                      }`}
                    />
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  </div>
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-400">
                    Mobile
                  </label>
                  <div className="relative">
                    <input
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)}
                      placeholder="Eg. 9876543210"
                      className={`w-full h-11 rounded-md border pl-10 ${
                        errors.mobile ? "border-red-400" : "border-gray-300"
                      }`}
                    />
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  </div>
                </div>
              </div>

              <div className="sm:col-span-2">
                <label className="mb-1.5 block text-sm font-medium text-gray-400">
                  Profile Photo
                </label>

                <div
                  onClick={() => fileInputRef.current?.click()}
                  className={`flex items-center justify-between gap-4 p-3 rounded-md border ${
                    errors.photoURL ? "border-red-400" : "border-gray-300"
                  } bg-[#0d0d0d]/50 cursor-pointer`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-md overflow-hidden bg-[#1f1b2b] flex items-center justify-center border border-gray-700">
                      {previewUrl || (typeof photoURL === "string" && photoURL) ? (
                        <img
                          src={previewUrl ?? photoURL}
                          alt="preview"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <ImageIcon className="h-6 w-6 text-gray-400" />
                      )}
                    </div>

                    <div>
                      <div className="text-sm font-medium">
                        {photoURL && typeof photoURL !== "string"
                          ? photoURL.name
                          : photoURL && typeof photoURL === "string"
                          ? "Using existing photo"
                          : "Upload profile photo"}
                      </div>
                      <div className="text-xs text-gray-400">PNG, JPG — up to 5MB</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {photoURL ? (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeSelectedPhoto();
                        }}
                        className="inline-flex items-center gap-2 rounded-md px-3 py-1 text-xs border border-gray-700 text-gray-200"
                      >
                        <Trash2 className="h-4 w-4" />
                        Remove
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          fileInputRef.current?.click();
                        }}
                        className="inline-flex items-center gap-2 rounded-md px-3 py-1 text-xs border border-[hsl(var(--brand-end)/.5)] text-white"
                      >
                        <Plus className="h-4 w-4" />
                        Upload
                      </button>
                    )}
                  </div>
                </div>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleFileSelect(file);
                  }}
                  className="hidden"
                />

                {errors.photoURL && (
                  <p className="text-xs text-red-500 mt-1">{errors.photoURL}</p>
                )}
              </div>

              <SkillsInput value={skills} onChange={setSkills} />

              {submitted && skills.length < 2 && (
                <p className="sm:col-span-2 -mt-2 text-xs text-red-500">
                  Add at least 2 skills.
                </p>
              )}

              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-400">
                  Role
                </label>
                <div className="relative">
                  <input
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className={`w-full h-11 rounded-md border border-gray-300 px-10 ${
                      errors.role ? "border-red-400" : ""
                    }`}
                  />
                  <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-400">
                  Experience
                </label>
                <div className="relative">
                  <select
                    value={experience}
                    onChange={(e) => setExperience(e.target.value)}
                    className={`w-full h-11 rounded-md border bg-[#0d0d0d]/70 text-gray-200 pl-10 pr-10 ${
                      errors.experience ? "border-red-400" : "border-gray-300"
                    }`}
                  >
                    <option value="" disabled>
                      Select Experience
                    </option>
                    {EXPERIENCE_OPTIONS.map((opt) => (
                      <option key={opt}>{opt}</option>
                    ))}
                  </select>

                  <BadgeCheck className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label className="mb-1.5 block text-sm font-medium text-gray-400">
                  LinkedIn
                </label>
                <div className="relative">
                  <input
                    value={linkedin}
                    onChange={(e) => setLinkedin(e.target.value)}
                    placeholder="Eg. https://www.linkedin.com/in/username"
                    className={`w-full h-11 rounded-md border border-gray-300 px-10 ${
                      errors.linkedin ? "border-red-400" : ""
                    }`}
                  />
                  <Linkedin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label className="mb-1.5 block text-sm font-medium text-gray-400">
                  GitHub
                </label>
                <div className="relative">
                  <input
                    value={githubURL}
                    onChange={(e) => setGithubURL(e.target.value)}
                    placeholder="Eg. https://github.com/username"
                    className={`w-full h-11 rounded-md border border-gray-300 px-10 ${
                      errors.github ? "border-red-400" : ""
                    }`}
                  />
                  <Github className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label className="mb-1.5 block text-sm font-medium text-gray-400">
                  Personal Website
                </label>
                <div className="relative">
                  <input
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    placeholder="Eg. https://yourdomain.com"
                    className={`w-full h-11 rounded-md border border-gray-300 px-10 ${
                      errors.website ? "border-red-400" : ""
                    }`}
                  />
                  <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                </div>
              </div>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleSave}
                className="inline-flex items-center justify-center rounded-md h-11 px-4 text-white font-medium bg-gradient-to-r from-[hsl(var(--brand-start))] to-[hsl(var(--brand-end))]"
              >
                <Save className="h-4 w-4 mr-2" /> Save changes
              </button>
              <button
                onClick={handleCancel}
                className="inline-flex items-center justify-center rounded-md h-11 px-4 border bg-[#0d0d0d]/70 text-gray-300"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>

        <div className="hidden scale-90 lg:block sticky -mt-8 -mb-8 top-16 self-start">
          <UserCard
            user={{
              firstName,
              lastName,
              age: Number(age),
              gender,
              description: tagline,
              photoURL: previewUrl ? previewUrl : photoURL,
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
