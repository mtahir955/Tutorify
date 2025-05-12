"use client";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../src/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../src/components/ui/card";
import { Input } from "../src/components/ui/input";
import { Label } from "../src/components/ui/label";
import { RadioGroup, RadioGroupItem } from "../src/components/ui/radio-group";
import { Textarea } from "../src/components/ui/textarea";
import { Checkbox } from "../src/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../src/components/ui/select";
import { Separator } from "../src/components/ui/separator";
import { Badge } from "../src/components/ui/badge";
import axios from "axios";
import { X } from "lucide-react";

export default function Editteacherprofile() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    fatherName: "",
    cnic: "",
    gender: "",
    bio: "",
    coursesOffered: [], // Changed to array
    education: "",
    certifications: "",
    experience: "",
    expertise: [],
    monthlyFee: "",
    country: "",
    state: "",
    city: "",
    resume: null,
    photo: null,
    availability: "",
    termsAccepted: false,
  });

  const [expertiseInput, setExpertiseInput] = useState("");
  const [coursesInput, setCoursesInput] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    axios
      .get("https://tutorify.live/api/getteacherprofile.php", {
        withCredentials: true,
      })
      .then((res) => {
        const data = res.data.data; // Access nested 'data'

        if (res.data.success && data) {
          const data = res.data.data;

          const parsedCourses = Array.isArray(data.courses_offered)
            ? data.courses_offered
            : typeof data.courses_offered === "string"
            ? data.courses_offered.split(",").map((s) => s.trim())
            : [];

          const parsedExpertise = Array.isArray(data.expertise)
            ? data.expertise
            : typeof data.expertise === "string"
            ? data.expertise.split(",").map((s) => s.trim())
            : [];

          setFormData({
            fullName: data.full_name || "",
            fatherName: data.father_name || "",
            cnic: data.cnic || "",
            gender: data.gender || "",
            bio: data.bio || "",
            coursesOffered: parsedCourses,
            education: data.education || "",
            certifications: data.certifications || "",
            experience: data.experience || "",
            expertise: parsedExpertise,
            monthlyFee: data.fee || "",
            country: data.country || "",
            state: data.state || "",
            city: data.city || "",
            resume: null, // Files can't be prefilled
            photo: null, // Files can't be prefilled
            availability: data.availability || "",
            termsAccepted: data.terms_accepted === 1, // convert int to boolean
          });
        } else {
          console.error("Failed to fetch teacher data:", res.data.message);
        }
      })
      .catch((err) => {
        console.error("API error:", err);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const { name } = e.target;
      setFormData((prev) => ({ ...prev, [name]: e.target.files?.[0] || null }));
    }
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: checked }));
  };

  const handleRadioChange = (value) => {
    setFormData((prev) => ({ ...prev, gender: value }));
  };

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Courses Offered Functions
  const addCourse = () => {
    if (
      coursesInput.trim() &&
      !formData.coursesOffered.includes(coursesInput.trim())
    ) {
      setFormData((prev) => ({
        ...prev,
        coursesOffered: [...prev.coursesOffered, coursesInput.trim()],
      }));
      setCoursesInput("");
    }
  };

  const removeCourse = (course) => {
    setFormData((prev) => ({
      ...prev,
      coursesOffered: prev.coursesOffered.filter((c) => c !== course),
    }));
  };

  const handleCourseKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addCourse();
    }
  };

  // Expertise Functions
  const addExpertise = () => {
    if (
      expertiseInput.trim() &&
      !formData.expertise.includes(expertiseInput.trim())
    ) {
      setFormData((prev) => ({
        ...prev,
        expertise: [...prev.expertise, expertiseInput.trim()],
      }));
      setExpertiseInput("");
    }
  };

  const removeExpertise = (item) => {
    setFormData((prev) => ({
      ...prev,
      expertise: prev.expertise.filter((expertise) => expertise !== item),
    }));
  };

  const handleExpertiseKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addExpertise();
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName) newErrors.fullName = "Full name is required";
    if (!formData.fatherName)
      newErrors.fatherName = "Father's name is required";
    if (!formData.cnic) newErrors.cnic = "CNIC number is required";
    if (!formData.gender) newErrors.gender = "Gender selection is required";
    if (!formData.education)
      newErrors.education = "Education details are required";
    if (!formData.monthlyFee) newErrors.monthlyFee = "Monthly fee is required";
    if (formData.monthlyFee && isNaN(Number(formData.monthlyFee))) {
      newErrors.monthlyFee = "Fee must be a valid number";
    }
    if (!formData.country) newErrors.country = "Country is required";
    if (!formData.termsAccepted)
      newErrors.termsAccepted = "You must accept the terms and conditions";

    if (formData.cnic && !/^\d{5}-\d{7}-\d{1}$/.test(formData.cnic)) {
      newErrors.cnic = "CNIC should be in format: 12345-1234567-1";
    }

    if (formData.experience && isNaN(Number(formData.experience))) {
      newErrors.experience = "Experience must be a number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const formDataToSubmit = new FormData();
        formDataToSubmit.append("fullName", formData.fullName);
        formDataToSubmit.append("fatherName", formData.fatherName);
        formDataToSubmit.append("cnic", formData.cnic);
        formDataToSubmit.append("gender", formData.gender);
        formDataToSubmit.append("bio", formData.bio);
        formDataToSubmit.append(
          "coursesOffered",
          JSON.stringify(formData.coursesOffered)
        );
        formDataToSubmit.append("education", formData.education);
        formDataToSubmit.append("certifications", formData.certifications);
        formDataToSubmit.append("experience", formData.experience);
        formDataToSubmit.append(
          "expertise",
          JSON.stringify(formData.expertise)
        );
        formDataToSubmit.append("monthlyFee", formData.monthlyFee);
        formDataToSubmit.append("country", formData.country);
        formDataToSubmit.append("state", formData.state);
        formDataToSubmit.append("city", formData.city);
        formDataToSubmit.append("availability", formData.availability);
        formDataToSubmit.append("termsAccepted", formData.termsAccepted);

        if (formData.resume) {
          formDataToSubmit.append("resume", formData.resume);
        }
        if (formData.photo) {
          formDataToSubmit.append("photo", formData.photo);
        }

        const response = await axios.post(
          "https://tutorify.live/api/teacher_reg.php",
          formDataToSubmit,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        console.log("Form submitted successfully:", response.data);
        navigate("/tutorsdashboard");
      } catch (error) {
        console.error("Error submitting form:", error);
        alert("Error submitting form. Please try again.");
      }
    } else {
      console.log("Form has errors:", errors);
    }
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 bg-white">
      <Card className="w-full max-w-4xl mx-auto shadow-lg">
        <CardHeader className="bg-cyan-100 border-b p-4 sm:p-6">
          <CardTitle className="text-xl sm:text-2xl md:text-3xl text-center">
            Edit Profile
          </CardTitle>
          <CardDescription className="text-center text-sm sm:text-base">
            Please fill out the form below to edit your profile
          </CardDescription>
        </CardHeader>
        
        <CardContent className="pt-4 sm:pt-6 bg-gray-50">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information Section */}
            <div>
              <h2 className="text-xl font-semibold mb-4">
                Personal Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="fullName" className="font-medium">
                    Full Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="fullName"
                    name="fullName"
                    placeholder="Enter your full name"
                    value={formData.fullName}
                    onChange={handleChange}
                    className={errors.fullName ? "border-red-500" : ""}
                  />
                  {errors.fullName && (
                    <p className="text-red-500 text-sm">{errors.fullName}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fatherName" className="font-medium">
                    Father's Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="fatherName"
                    name="fatherName"
                    placeholder="Enter your father's name"
                    value={formData.fatherName}
                    onChange={handleChange}
                    className={errors.fatherName ? "border-red-500" : ""}
                  />
                  {errors.fatherName && (
                    <p className="text-red-500 text-sm">{errors.fatherName}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cnic" className="font-medium">
                    CNIC Number <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="cnic"
                    name="cnic"
                    placeholder="12345-1234567-1"
                    value={formData.cnic}
                    onChange={handleChange}
                    className={errors.cnic ? "border-red-500" : ""}
                  />
                  {errors.cnic && (
                    <p className="text-red-500 text-sm">{errors.cnic}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label className="font-medium">
                    Gender <span className="text-red-500">*</span>
                  </Label>
                  <RadioGroup
                    value={formData.gender}
                    onValueChange={handleRadioChange}
                    className="flex space-x-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="male" id="male" />
                      <Label htmlFor="male">Male</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="female" id="female" />
                      <Label htmlFor="female">Female</Label>
                    </div>
                  </RadioGroup>
                  {errors.gender && (
                    <p className="text-red-500 text-sm">{errors.gender}</p>
                  )}
                </div>
              </div>
              <div className="mt-4 space-y-2">
                <Label htmlFor="bio" className="font-medium">
                  Short Bio
                </Label>
                <Textarea
                  id="bio"
                  name="bio"
                  placeholder="Tell us about yourself"
                  value={formData.bio}
                  onChange={handleChange}
                  rows={3}
                />
              </div>
            </div>

            <Separator />

            {/* Professional Details Section */}
            <div>
              <div>
                <h2 className="text-xl font-semibold mb-4">
                  Professional Details
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Courses Offered Section */}
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="coursesOffered" className="font-medium">
                      Courses Offered
                    </Label>
                    <div className="flex space-x-2">
                      <Input
                        id="coursesOffered"
                        value={coursesInput}
                        onChange={(e) => setCoursesInput(e.target.value)}
                        onKeyDown={handleCourseKeyDown}
                        placeholder="Add course and press Enter"
                      />
                      <Button
                        type="button"
                        onClick={addCourse}
                        variant="secondary"
                      >
                        Add
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {formData.coursesOffered.map((course) => (
                        <Badge
                          key={course}
                          variant="secondary"
                          className="flex items-center gap-1 px-3 py-1"
                        >
                          {course}
                          <X
                            className="h-3 w-3 cursor-pointer"
                            onClick={() => removeCourse(course)}
                          />
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="experience" className="font-medium">
                    Years of Experience
                  </Label>
                  <Input
                    id="experience"
                    name="experience"
                    type="number"
                    min="0"
                    placeholder="e.g., 5"
                    value={formData.experience}
                    onChange={handleChange}
                    className={errors.experience ? "border-red-500" : ""}
                  />
                  {errors.experience && (
                    <p className="text-red-500 text-sm">{errors.experience}</p>
                  )}
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="education" className="font-medium">
                    Education <span className="text-red-500">*</span>
                  </Label>
                  <Textarea
                    id="education"
                    name="education"
                    placeholder="List your educational qualifications"
                    value={formData.education}
                    onChange={handleChange}
                    rows={2}
                    className={errors.education ? "border-red-500" : ""}
                  />
                  {errors.education && (
                    <p className="text-red-500 text-sm">{errors.education}</p>
                  )}
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="certifications" className="font-medium">
                    Certifications
                  </Label>
                  <Textarea
                    id="certifications"
                    name="certifications"
                    placeholder="List any relevant certifications"
                    value={formData.certifications}
                    onChange={handleChange}
                    rows={2}
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="expertise" className="font-medium">
                    Areas of Expertise
                  </Label>
                  <div className="flex space-x-2">
                    <Input
                      id="expertise"
                      value={expertiseInput}
                      onChange={(e) => setExpertiseInput(e.target.value)}
                      onKeyDown={handleExpertiseKeyDown}
                      placeholder="Add expertise and press Enter"
                    />
                    <Button
                      type="button"
                      onClick={addExpertise}
                      variant="secondary"
                    >
                      Add
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {formData.expertise.map((item) => (
                      <Badge
                        key={item}
                        variant="secondary"
                        className="flex items-center gap-1 px-3 py-1"
                      >
                        {item}
                        <X
                          className="h-3 w-3 cursor-pointer"
                          onClick={() => removeExpertise(item)}
                        />
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            {/* Fee Information Section */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Fee Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="monthlyFee" className="font-medium">
                    Monthly Fee (PKR) <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative">
                    <Input
                      id="monthlyFee"
                      name="monthlyFee"
                      type="number"
                      placeholder="Enter monthly fee in PKR"
                      value={formData.monthlyFee}
                      onChange={handleChange}
                      className={
                        errors.monthlyFee ? "border-red-500 pl-8" : "pl-8"
                      }
                    />
                    <span className="absolute left-3 top-2.5 text-sm text-gray-500">
                      ₨
                    </span>
                  </div>
                  {errors.monthlyFee && (
                    <p className="text-red-500 text-sm">{errors.monthlyFee}</p>
                  )}
                </div>
              </div>
            </div>

            <Separator />

            {/* Location Information Section */}
            <div>
              <h2 className="text-xl font-semibold mb-4">
                Location Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2 ">
                  <Label htmlFor="country" className="font-medium">
                    Country <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    value={formData.country}
                    onValueChange={(value) =>
                      handleSelectChange("country", value)
                    }
                  >
                    <SelectTrigger
                      className={errors.country ? "border-red-500 " : ""}
                    >
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      <SelectItem value="pakistan">Pakistan</SelectItem>
                      <SelectItem value="india">India</SelectItem>
                      <SelectItem value="usa">United States</SelectItem>
                      <SelectItem value="uk">United Kingdom</SelectItem>
                      <SelectItem value="canada">Canada</SelectItem>
                      <SelectItem value="australia">Australia</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.country && (
                    <p className="text-red-500 text-sm">{errors.country}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state" className="font-medium">
                    State/Province
                  </Label>
                  <Select
                    value={formData.state}
                    onValueChange={(value) =>
                      handleSelectChange("state", value)
                    }
                    disabled={!formData.country}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select state" />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      {formData.country === "pakistan" && (
                        <>
                          <SelectItem value="punjab">Punjab</SelectItem>
                          <SelectItem value="sindh">Sindh</SelectItem>
                          <SelectItem value="kpk">
                            Khyber Pakhtunkhwa
                          </SelectItem>
                          <SelectItem value="balochistan">
                            Balochistan
                          </SelectItem>
                        </>
                      )}
                      {formData.country === "india" && (
                        <>
                          <SelectItem value="delhi">Delhi</SelectItem>
                          <SelectItem value="maharashtra">
                            Maharashtra
                          </SelectItem>
                          <SelectItem value="karnataka">Karnataka</SelectItem>
                        </>
                      )}
                      {formData.country === "usa" && (
                        <>
                          <SelectItem value="california">California</SelectItem>
                          <SelectItem value="texas">Texas</SelectItem>
                          <SelectItem value="newyork">New York</SelectItem>
                        </>
                      )}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city" className="font-medium">
                    City
                  </Label>
                  <Input
                    id="city"
                    name="city"
                    placeholder="Enter your city"
                    value={formData.city}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            <Separator />

            {/* Other Options Section */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Other Options</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="resume" className="font-medium">
                    Upload Resume/Certificates
                  </Label>
                  <Input
                    id="resume"
                    name="resume"
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                  />
                  <p className="text-sm text-muted-foreground">
                    Accepted formats: PDF, DOC, DOCX (Max: 5MB)
                  </p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="photo" className="font-medium">
                    Profile Photo
                  </Label>
                  <Input
                    id="photo"
                    name="photo"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                  <p className="text-sm text-muted-foreground">
                    Accepted formats: JPG, PNG (Max: 2MB)
                  </p>
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="availability" className="font-medium">
                    Availability
                  </Label>
                  <Input
                    id="availability"
                    name="availability"
                    placeholder="e.g., Weekdays 9AM-5PM, Weekends 10AM-2PM"
                    value={formData.availability}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4 pt-4">
              {/* <div className="flex items-start space-x-2">
                <Checkbox
                  id="termsAccepted"
                  checked={formData.termsAccepted}
                  onCheckedChange={(checked) =>
                    setFormData((prev) => ({ ...prev, termsAccepted: checked }))
                  }
                  className={errors.termsAccepted ? "border-red-500" : ""}
                />
                {/* <div className="grid gap-1.5 leading-none">
                  <Label
                    htmlFor="termsAccepted"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    I accept the terms and conditions{" "}
                    <span className="text-red-500">*</span>
                  </Label>
                  {errors.termsAccepted && (
                    <p className="text-red-500 text-sm">
                      {errors.termsAccepted}
                    </p>
                  )}
                </div> 
              </div> */}

              <Button
                type="submit"
                className="w-full md:w-auto bg-cyan-500 hover:bg-black text-white"
              >
                Save Changes
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
