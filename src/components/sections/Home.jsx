import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "swiper/css"; // Import Swiper styles
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Keyboard } from "swiper/modules";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, useInView, useAnimation } from "framer-motion";
import emailjs from "emailjs-com";
const sections = ["About", "Resume", "Portfolio", "Contact"];
import {
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaGithub,
  FaTwitter,
  FaLinkedin,
  FaMobileAlt,
  FaCode,
  FaPaintBrush,
  FaServer,
} from "react-icons/fa";

import {
  SiFigma,
  SiXcode,
  SiReact,
  SiTailwindcss,
  SiJavascript,
  SiNodedotjs,
  SiCplusplus,
  SiPython,
  SiFlutter,
  SiMysql,
  SiDotnet,
} from "react-icons/si";

import Avatar from "/public/assets/Avatar.png";

const sliderSettings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 4, // Adjusts based on screen size
  slidesToScroll: 1,
  swipeToSlide: true,
  responsive: [
    {
      breakpoint: 1024, // Tablets
      settings: { slidesToShow: 3 },
    },
    {
      breakpoint: 768, // Mobile screens
      settings: { slidesToShow: 2 },
    },
    {
      breakpoint: 480, // Smaller mobile
      settings: { slidesToShow: 1 },
    },
  ],
};

const skills = [
  { icon: <SiFigma className="text-orange-500" />, name: "Figma", proficiency: 85 },
  {
    icon: <SiDotnet className="text-purple-500" />,
    name: ".Net",
    proficiency: 70
  },
  { icon: <SiXcode className="text-blue-500" />, name: "Xcode", proficiency: 75 },
  { icon: <SiReact className="text-cyan-400" />, name: "React", proficiency: 90 },
  { icon: <SiTailwindcss className="text-teal-400" />, name: "Tailwind CSS", proficiency: 95 },
  { icon: <SiJavascript className="text-yellow-400" />, name: "JavaScript", proficiency: 90 },
  { icon: <SiNodedotjs className="text-green-500" />, name: "Node.js", proficiency: 85 },
  {
    icon: <SiPython className="text-cyan-500" />,
    name: "Python",
    proficiency: 80
  },
  { icon: <SiCplusplus className="text-red-500" />, name: "C++", proficiency: 70 },
  { icon: <SiFlutter className="text-blue-500" />, name: "Flutter", proficiency: 75 },
  { icon: <SiMysql className="text-grey-500" />, name: "MySQL", proficiency: 80 },
];

// Define animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const fadeInLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const fadeInRight = {
  hidden: { opacity: 0, x: 60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

// Create a reusable component for animated sections
const AnimatedSection = ({ children, variants, className, delay = 0 }) => {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);

  return (
    <motion.section
      ref={ref}
      variants={variants || fadeInUp}
      initial="hidden"
      animate={controls}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.section>
  );
};

const Home = () => {
  const [activeSection, setActiveSection] = useState("About");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [hoveredProject, setHoveredProject] = useState(null);

  // Initial projects data
  const initialProjects = [
    {
      name: "Vogue Garage",
      category: "Applications",
      image: "/assets/logo.png", // Thumbnail
      previewImages: ["/assets/VogueGarage.png"],
      link: "https://voguegarageform.netlify.app/",
      description: "A software application for generating garage door manufacturing production sheets with printing and electronic sending capabilities.",
      techStack: ["React", "Node.js", "Firebase", "PDF Generation"],
      year: "2023",
      caseStudy: {
        problem: "Garage door manufacturers struggled with inefficient paper-based production sheets, leading to errors, delays in manufacturing, and difficulty tracking production status across different stages.",
        solution: "Developed a comprehensive digital form application that generates standardized production sheets for garage door manufacturing. Implemented features for printing or electronically sending forms to manufacturers for review.",
        results: "Reduced manufacturing errors by 35%, decreased production preparation time by 40%, and provided a foundation for future digital tracking of production processes via tablets."
      }
    },
    {
      name: "Monale",
      category: "Web Development",
      image: "/assets/MonalePLayGround.png",
      previewImages: ["/assets/ChatPlayGround.png"],
      link: "https://monale.netlify.app/",
      description: "An AI-powered chat application that helps students learn through interactive conversations.",
      techStack: ["React", "Python", "TailwindCSS", "OpenAI API"],
      year: "2024",
      caseStudy: {
        problem: "Students struggled with traditional learning materials that lacked interactive elements and personalized education experiences. Many found it difficult to get immediate answers to their questions.",
        solution: "Created an AI-powered educational platform using OpenAI's technology that allows students to engage in natural conversations about academic subjects, receive explanations, and get help with problem-solving.",
        results: "Usage analytics showed a 65% increase in engagement time compared to traditional study methods. Student surveys indicated a 42% improvement in concept understanding after using the platform."
      }
    },
    {
      name: "Portfolio Site",
      category: "UI/UX",
      image: "/assets/PortSite1.png",
      previewImages: ["/assets/portsite2.png", "/assets/PortSite1.png"],
      description: "A custom portfolio website designed to showcase skills and projects with a focus on modern UI/UX principles.",
      techStack: ["React", "TailwindCSS", "Framer Motion"],
      year: "2025",
      caseStudy: {
        problem: "Needed a professional platform to showcase development skills and projects to potential employers in a competitive job market. Standard templates lacked personalization and unique features.",
        solution: "Designed and built a custom portfolio from scratch using React and modern animation libraries. Focused on creating a memorable user experience with interactive elements and thoughtful UI/UX design.",
        results: "Created a distinctive personal brand that highlights technical capabilities and design sensibilities. Improved employer engagement with interactive project showcases and skill visualizations."
      }
    },
    {
      name: "ProductiveDeep",
      category: "Applications",
      image: "/assets/ProductiveDeep.png",
      previewImages: [
        "/assets/ProductiveDeep_2.png",
        "/assets/ProductiveDeep_3.png",
        "/assets/ProductiveDeep_4.png",
        "/assets/ProductiveDeep_5.png",
      ],
      description: "A productivity application designed to help users focus and manage their time effectively.",
      techStack: ["React Native", "Redux", "Firebase"],
      year: "2025",
      caseStudy: {
        problem: "In today's distracting digital environment, many people struggle with maintaining focus, managing their time effectively, and tracking productivity across multiple projects.",
        solution: "Developed a cross-platform mobile application that combines the Pomodoro technique with task management, progress tracking, and focus mode features. Included analytics to help users understand their productivity patterns.",
        results: "User testing showed a 35% improvement in task completion rates and a 28% reduction in reported procrastination. The app maintained a 4.6/5 rating in app stores with positive feedback on the intuitive UX."
      }
    },
  ];

  // State for projects
  const [projects, setProjects] = useState(initialProjects);

  // Function to add more images to a project
  const addImagesToProject = (projectName, newImages) => {
    setProjects(currentProjects => 
      currentProjects.map(project => {
        if (project.name === projectName) {
          return {
            ...project,
            previewImages: [...project.previewImages, ...newImages]
          };
        }
        return project;
      })
    );
  };

  // Function to add a new project
  const addNewProject = (project) => {
    // Ensure the project has a previewImages array
    const newProject = {
      ...project,
      previewImages: project.previewImages || [project.previewImage] || []
    };
    
    setProjects(currentProjects => [...currentProjects, newProject]);
  };

  // Example usage (uncomment to test):
  // useEffect(() => {
  //   // Add more screenshots to ProductiveDeep after component mounts
  //   addImagesToProject("ProductiveDeep", [
  //     "/assets/new_screenshot1.png",
  //     "/assets/new_screenshot2.png"
  //   ]);
  //
  //   // Add a completely new project
  //   // addNewProject({
  //   //   name: "New Mobile App",
  //   //   category: "Applications",
  //   //   image: "/assets/new_app_thumbnail.png",
  //   //   previewImages: [
  //   //     "/assets/new_app_screen1.png",
  //   //     "/assets/new_app_screen2.png"
  //   //   ],
  //   //   description: "A brand new mobile application with cutting edge features.",
  //   //   techStack: ["React Native", "Firebase", "Redux"],
  //   //   year: "2024"
  //   // });
  // }, []);

  const filteredProjects =
    selectedCategory === "All"
      ? projects
      : projects.filter((project) => project.category === selectedCategory);

  const [modalImage, setModalImage] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const openModal = (project) => {
    setModalImage(project);
    setIsOpen(true);
  };

  const closeModal = () => {
    setModalImage(null);
    setIsOpen(false);
  };

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [isSending, setIsSending] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = () => {
    let tempErrors = {};
    if (!formData.name.trim()) tempErrors.name = "Name is required";
    if (!formData.email.trim()) {
      tempErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = "Invalid email format";
    }
    if (!formData.message.trim())
      tempErrors.message = "Message cannot be empty";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSending(true);
    setSuccessMessage("");

    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      message: formData.message,
    };

    emailjs
      .send(
        "service_to9i7na", // Replace with your actual Service ID
        "template_5calttq", // Replace with your actual Template ID
        templateParams,
        "kpYxJnadfFDAvtN18" // Replace with your actual Public Key
      )
      .then((response) => {
        console.log("SUCCESS!", response.status, response.text);
        setSuccessMessage("Your message has been sent successfully!");
        setFormData({ name: "", email: "", message: "" }); // Reset form
      })
      .catch((error) => {
        console.error("FAILED...", error);
        setErrors({ form: "Failed to send message. Please try again later." });
      })
      .finally(() => {
        setIsSending(false);
      });
  };

  // Add GitHub integration state variables
  const [githubData, setGithubData] = useState({
    repos: [],
    contributions: null,
    loading: true,
    error: null
  });
  
  // Fetch GitHub data
  const fetchGithubData = useCallback(async () => {
    try {
      // Fetch user's repositories
      const reposResponse = await fetch('https://api.github.com/users/MrZoder/repos?sort=updated&per_page=4');
      
      if (!reposResponse.ok) {
        throw new Error('Failed to fetch repositories');
      }
      
      const repos = await reposResponse.json();
      
      // Update state with GitHub data
      setGithubData(prev => ({
        ...prev,
        repos,
        loading: false
      }));
    } catch (error) {
      setGithubData(prev => ({
        ...prev,
        loading: false,
        error: error.message
      }));
    }
  }, []);
  
  // Fetch GitHub data on component mount
  useEffect(() => {
    if (activeSection === "About") {
      fetchGithubData();
    }
  }, [activeSection, fetchGithubData]);

  return (
    <div className=" text-white max-w-7xl  sm mx-auto flex flex-col items-center p-6 ">
      <div className="w-full md:w-10/10 flex flex-col md:flex-row gap-6">
        {/* Sidebar */}
        <aside className="bg-[#2b2b2b] p-6 rounded-lg shadow-md w-full max-h-90 md:w-1/4 h-auto flex flex-col items-center mb-1 md:mb-0 border-1">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <img
                src={Avatar}
                alt="Avatar"
                className="w-20 rounded-full border-2 border-[#c8bb82]"
              />
              <motion.div 
                className="absolute inset-0 bg-[#c8bb82]/20 rounded-full"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
              />
            </motion.div>
          </motion.div>
          
          <motion.h2 
            className="text-lg font-semibold mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Zain Zahab
          </motion.h2>
          
          <motion.p 
            className="bg-[#1e1e1e] py-2 px-4 rounded-full text-[#c8bb82] text-sm"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            Full Stack Developer
          </motion.p>
          
          <motion.div 
            className="mt-4 space-y-3 text-sm text-gray-400 text-center w-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <motion.p 
              className="flex items-center gap-2"
              whileHover={{ x: 5, color: "#c8bb82" }}
            >
              <FaEnvelope className="text-[#c8bb82]" />
              <span className="text-white">zainzahab4@gmail.com</span>
            </motion.p>
            
            <motion.p 
              className="flex items-center gap-2"
              whileHover={{ x: 5, color: "#c8bb82" }}
            >
              <FaPhoneAlt className="text-[#c8bb82]" />
              <span className="text-white">+61 0481 401***</span>
            </motion.p>
            
            <motion.p 
              className="flex items-center gap-2"
              whileHover={{ x: 5, color: "#c8bb82" }}
            >
              <FaMapMarkerAlt className="text-[#c8bb82]" />
              <span className="text-white">Monteagle, NSW</span>
            </motion.p>
          </motion.div>

          {/* Social Media Icons */}
          <div className="flex mt-4 space-x-4 text-xl text-gray-400">
            <motion.a
              href="https://github.com/MrZoder?tab=repositories"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -5, color: "#c8bb82" }}
              whileTap={{ scale: 0.95 }}
            >
              <FaGithub className="cursor-pointer" />
            </motion.a>
            
            <motion.div
              whileHover={{ y: -5, color: "#c8bb82" }}
              whileTap={{ scale: 0.95 }}
            >
              <FaTwitter className="cursor-pointer" />
            </motion.div>
            
            <motion.div
              whileHover={{ y: -5, color: "#c8bb82" }}
              whileTap={{ scale: 0.95 }}
            >
              <FaLinkedin className="cursor-pointer" />
            </motion.div>
          </div>
          
          {/* Contact Button */}
          <motion.button
            className="mt-6 px-4 py-2 bg-[#c8bb82] text-black rounded-lg font-medium w-full flex items-center justify-center"
            whileHover={{ scale: 1.05, backgroundColor: "#dabe6e" }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            onClick={() => setActiveSection("Contact")}
          >
            <FaEnvelope className="mr-2" /> Contact Me
          </motion.button>
          
          {/* Download CV Button */}
          <motion.a
            href="/assets/Zain_Zahab_Resume.pdf"
            download="Zains_Resume.pdf"
            className="mt-3 px-4 py-2 bg-[#333] text-white rounded-lg font-medium w-full flex items-center justify-center"
            whileHover={{ scale: 1.05, backgroundColor: "#444" }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Download CV
          </motion.a>
        </aside>

        {/* Main Content */}
        <div className="w-full md:w-3/4 bg-[#1e1e1e] p-8 rounded-lg shadow-lg border-1">
          {/* Navbar */}
          <div className="py-4 flex items-center justify-between mx-4 md:mx-88">
            <nav
              className="bg-[#282828]/80 py-4 px-6 md:px-20  flex-wrap md:flex-nowrap space-x-4 md:space-x-8 text-sm rounded-lg border border-[#2e2e2e] shadow-md relative md:flex hidden"
              style={{
                clipPath: "polygon(9% 0%, 100% 0%, 100% 100%, 0% 100%)", // Left-angled carve-out
              }}>
              {sections.map((section) => (
                <button
                  key={section}
                  className={`cursor-pointer transition-colors duration-300 ${
                    activeSection === section ? "text-[#c8bb82]" : "text-white"
                  }`}
                  onClick={() => setActiveSection(section)}>
                  {section}
                </button>
              ))}
            </nav>
          </div>
          {/* Section Title & Navbar */}
          <div className="relative flex items-center -my-10 justify-between w-full mb-6">
            {/* Section Title */}
            <div className="flex flex-col">
              <h1 className="text-3xl font-bold text-white">{activeSection}</h1>
              <div className="w-26 border-b-6 border-[#f3dc75] mt-2"></div>{" "}
              {/* Thick Underline */}
            </div>
          </div>
          {/* Content Sections */}
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}>
            {activeSection === "About" && (
              <>
                {/* About Me Section - Redesigned */}
                <section className="p-4 rounded-lg">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Left Column - Professional Summary */}
                    <AnimatedSection
                      variants={fadeInLeft}
                      className="bg-[#222222] p-6 rounded-lg shadow-md"
                    >
                      <h2 className="text-xl font-bold text-[#c8bb82] mb-4 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        Professional Summary
                      </h2>
                      
                      <div className="space-y-4">
                        <p className="text-white leading-relaxed">
                          A passionate <span className="text-[#c8bb82] font-semibold">AI / Full Stack developer</span> specializing in 
                          cross-platform apps, REST APIs, UI/UX design, and performance optimization. 
                        </p>
                        
                        <p className="text-white leading-relaxed">
                          At just 19 years old, I bring fresh perspectives combined with technical skill. My work is characterized by 
                          <span className="text-[#c8bb82]"> exceptional attention to detail</span>, 
                          <span className="text-[#c8bb82]"> organizational excellence</span>, and an 
                          <span className="text-[#c8bb82]"> unrelenting work ethic</span> that enables me to quickly master new technologies and deliver quality results.
                        </p>
                      </div>
                    </AnimatedSection>
                    
                    {/* Right Column - Key Achievements */}
                    <AnimatedSection
                      variants={fadeInRight}
                      className="bg-[#222222] p-6 rounded-lg shadow-md"
                    >
                      <h2 className="text-xl font-bold text-[#c8bb82] mb-4 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                        </svg>
                        Key Achievements
                      </h2>
                      
                      <div className="space-y-4">
                        <div className="flex items-start">
                          <div className="bg-[#2a2a2a] p-2 rounded-full mr-3 mt-1">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#c8bb82]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          <div>
                            <h3 className="text-white font-medium">Educational Excellence</h3>
                            <p className="text-gray-300 text-sm">Currently pursuing a Bachelor's degree in Software Engineering with AI specialization while maintaining academic excellence.</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <div className="bg-[#2a2a2a] p-2 rounded-full mr-3 mt-1">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#c8bb82]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          <div>
                            <h3 className="text-white font-medium">AI Integration Expert</h3>
                            <p className="text-gray-300 text-sm">Developed Monale, an AI-powered educational platform that increased student engagement by 65% and concept understanding by 42%.</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <div className="bg-[#2a2a2a] p-2 rounded-full mr-3 mt-1">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#c8bb82]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          <div>
                            <h3 className="text-white font-medium">Business Impact</h3>
                            <p className="text-gray-300 text-sm">Developed a garage door production form application that reduced manufacturing errors by 35% and decreased preparation time by 40% by eliminating manual form writing.</p>
                          </div>
                        </div>
                      </div>
                    </AnimatedSection>
                  </div>
                  
                  {/* Work Philosophy Section */}
                  <AnimatedSection className="mt-8 bg-[#222222] p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-bold text-[#c8bb82] mb-4 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                      Work Philosophy
                    </h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <motion.div 
                        whileHover={{ y: -5 }}
                        className="bg-[#2a2a2a] p-4 rounded-lg"
                      >
                        <div className="text-[#c8bb82] text-3xl mb-2">01</div>
                        <h3 className="text-white font-medium mb-2">User-Centric Design</h3>
                        <p className="text-gray-300 text-sm">I approach every project by first understanding the end-user needs, ensuring the final product provides real value.</p>
                      </motion.div>
                      
                      <motion.div 
                        whileHover={{ y: -5 }}
                        className="bg-[#2a2a2a] p-4 rounded-lg"
                      >
                        <div className="text-[#c8bb82] text-3xl mb-2">02</div>
                        <h3 className="text-white font-medium mb-2">Clean, Efficient Code</h3>
                        <p className="text-gray-300 text-sm">I believe in writing maintainable, well-documented code that balances performance with readability.</p>
                      </motion.div>
                      
                      <motion.div 
                        whileHover={{ y: -5 }}
                        className="bg-[#2a2a2a] p-4 rounded-lg"
                      >
                        <div className="text-[#c8bb82] text-3xl mb-2">03</div>
                        <h3 className="text-white font-medium mb-2">Continuous Learning</h3>
                        <p className="text-gray-300 text-sm">Technology evolves rapidly, and I'm committed to staying at the forefront through dedicated ongoing education.</p>
                      </motion.div>
                    </div>
                  </AnimatedSection>
                </section>
                
                {/* What I'm Doing Section - Keep as is */}
                <h1 className="font-semibold text-white text-2xl mt-4">
                  What I&apos;m Doing
                </h1>
                <AnimatedSection 
                  variants={staggerContainer}
                  className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6"
                >
                  <motion.div 
                    variants={fadeInUp}
                    className="bg-[#222222] p-6 rounded-lg shadow-md flex items-center space-x-4"
                  >
                    <FaMobileAlt className="text-[#c8bb82] text-2xl" />
                    <div>
                      <h3 className="font-semibold text-white">Mobile Apps</h3>
                      <p className="text-sm text-gray-400">
                        Professional development for Android & iOS.
                      </p>
                    </div>
                  </motion.div>
                  <motion.div 
                    variants={fadeInUp}
                    className="bg-[#222222] p-6 rounded-lg shadow-md flex items-center space-x-4"
                  >
                    <FaCode className="text-[#c8bb82] text-2xl" />
                    <div>
                      <h3 className="font-semibold text-white">
                        Web Development
                      </h3>
                      <p className="text-sm text-gray-400">
                        High-quality development of websites.
                      </p>
                    </div>
                  </motion.div>
                  <motion.div 
                    variants={fadeInUp}
                    className="bg-[#222222] p-6 rounded-lg shadow-md flex items-center space-x-4"
                  >
                    <FaPaintBrush className="text-[#c8bb82] text-2xl" />
                    <div>
                      <h3 className="font-semibold text-white">UI/UX Design</h3>
                      <p className="text-sm text-gray-400">
                        Modern and high-quality designs.
                      </p>
                    </div>
                  </motion.div>
                  <motion.div 
                    variants={fadeInUp}
                    className="bg-[#222222] p-6 rounded-lg shadow-md flex items-center space-x-4"
                  >
                    <FaServer className="text-[#c8bb82] text-2xl" />
                    <div>
                      <h3 className="font-semibold text-white">
                        Backend Development
                      </h3>
                      <p className="text-sm text-gray-400">
                        Scalable and seamless user experience.
                      </p>
                    </div>
                  </motion.div>
                </AnimatedSection>

                <section className="mt-6 bg-[#222222] p-6 rounded-lg shadow-md">
                  <h2 className="text-xl font-bold text-[#c8bb82] mb-4 text-center">
                    Skills
                  </h2>
                  <AnimatedSection 
                    className="grid grid-cols-1 md:grid-cols-2 gap-6"
                  >
                    {skills.map((skill, index) => (
                      <motion.div 
                        key={index}
                        variants={fadeInUp}
                        className="flex items-center space-x-3"
                      >
                        <div className="text-3xl">
                          {skill.icon}
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between mb-1">
                            <span className="text-sm font-medium text-white">{skill.name}</span>
                            <span className="text-sm font-medium text-[#c8bb82]">{skill.proficiency}%</span>
                          </div>
                          <div className="w-full bg-[#333333] rounded-full h-2.5">
                            <motion.div 
                              className="bg-[#c8bb82] h-2.5 rounded-full"
                              initial={{ width: 0 }}
                              animate={{ width: `${skill.proficiency}%` }}
                              transition={{ duration: 1, ease: "easeOut", delay: index * 0.1 + 0.3 }}
                            />
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatedSection>
                </section>

                {/* Add after your skills section: */}
                <section className="mt-6 bg-[#222222] p-6 rounded-lg shadow-md">
                  <h2 className="text-xl font-bold text-[#c8bb82] mb-4 flex items-center">
                    <FaGithub className="mr-2" /> GitHub Activity
                  </h2>
                  
                  {githubData.loading ? (
                    <div className="flex justify-center items-center py-8">
                      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#c8bb82]"></div>
                    </div>
                  ) : githubData.error ? (
                    <div className="text-center text-red-400 py-4">
                      {githubData.error}
                    </div>
                  ) : (
                    <AnimatedSection 
                      className="space-y-4"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {githubData.repos.map((repo, index) => (
                          <motion.a
                            key={repo.id}
                            variants={fadeInUp}
                            href={repo.html_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-[#2a2a2a] p-4 rounded-lg hover:bg-[#333] transition-colors"
                            whileHover={{ y: -5 }}
                          >
                            <h3 className="font-medium text-white flex items-center">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                              </svg>
                              {repo.name}
                            </h3>
                            <p className="text-sm text-gray-400 my-2 line-clamp-2">{repo.description || 'No description available'}</p>
                            <div className="flex justify-between items-center mt-2 text-xs">
                              <div className="flex items-center">
                                <div className={`w-2 h-2 rounded-full mr-2 ${repo.language ? 'bg-[#c8bb82]' : 'bg-gray-400'}`}></div>
                                <span className="text-gray-300">{repo.language || 'Unknown'}</span>
                              </div>
                              <div className="flex items-center text-gray-400">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                                </svg>
                                {repo.stargazers_count}
                              </div>
                              <div className="flex items-center text-gray-400">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                                </svg>
                                {repo.forks_count}
                              </div>
                            </div>
                          </motion.a>
                        ))}
                      </div>
                      
                      <motion.div variants={fadeInUp} className="flex justify-center">
                        <a 
                          href="https://github.com/MrZoder?tab=repositories" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center text-[#c8bb82] hover:underline mt-2"
                        >
                          View all repositories
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </a>
                      </motion.div>
                    </AnimatedSection>
                  )}
                </section>
              </>
            )}
            {activeSection === "Resume" && (
              <section className="resume-section text-white p-8 rounded-lg shadow-lg">
                <h2 className="text-4xl font-bold border-b-2 pb-2 mb-6 text-[#dabe6e]">
                  Resume
                </h2>

                {/* Education Section */}
                <div className="mb-12">
                  <h3 className="text-2xl font-semibold mb-6 flex items-center">
                    <span className="mr-3">📖</span> Education
                  </h3>
                  <div className="relative pl-10">
                    <div className="absolute left-2 top-1 w-1 h-full bg-[#dabe6e]"></div>

                    <div className="mb-6 relative">
                      <span className="absolute -left-[38px] top-1 w-4 h-4 bg-[#dabe6e] rounded-full"></span>
                      <h4 className="font-bold text-white">
                        Torrens University Australia
                      </h4>
                      <p className="italic text-gray-400">
                        Diploma of Software Engingeering and Information
                        Technology (DSE)
                      </p>
                      <p className="text-[#dabe6e] font-semibold">
                        2023 — 2024
                      </p>
                    </div>

                    <div className="relative">
                      <span className="absolute -left-[38px] top-1 w-4 h-4 bg-[#dabe6e] rounded-full"></span>
                      <h4 className="font-bold text-white">
                        Torrens University Australia
                      </h4>
                      <p className="italic text-gray-400">
                        Bachelor degree in Software Engineering Specializing in
                        Artificial Intelligence (BSEAI)
                      </p>
                      <p className="text-[#dabe6e] font-semibold">
                        2023 — 2025
                      </p>
                    </div>
                  </div>
                </div>

                {/* Experience Section */}
                <div>
                  <h3 className="text-2xl font-semibold mb-6 flex items-center">
                    <span className="mr-3">💼</span> Experience
                  </h3>
                  <div className="relative pl-10">
                    <div className="absolute left-2 top-1 w-1 h-full bg-[#dabe6e]"></div>

                    {[
                      {
                        title: "Junior-Level AI Developer",
                        company: "Monale Co",
                        duration: "july, 2024 — 2024 • 5 mos",
                        location: "Australia, Sydney",
                        points: [
                          "Developed new features and implemented UI designs using Reactjs and Python.",
                          "Designed and created custom AI playground features including integration of tools and data entries.",
                          "Integrated Physics Bot into discord community to help students learn.",
                        ],
                      },
                      {
                        title: "C++ Developer",
                        company: "CheatingUp Team",
                        duration: "Oct, 2022 — Aug, 2023 • 1 yr, 5 mos",
                        location: "Australia, Remote",
                        points: [
                          "Developed a custom in-game modification menu, enhancing functionality and user experience through tailored scripting and UI design.",
                          "Integrated KeyAuth for secure Logins.",
                          "Optimized Menu performance for a smooth user experience.",
                        ],
                      },
                      {
                        title: "Web Developer",
                        company: "ZtechDevelopment LLC",
                        duration: "Sep, 2024 — Current • 5 mos",
                        location: "Australia, Remote",
                        points: [
                          "Tasked with creating company website and web applications.",
                          "Implemented responsive and user-friendly interfaces using React.js, Next.js, and Tailwind CSS.",
                          "Gained hands-on experience in debugging and refining app features.",
                        ],
                      },
                    ].map((job, index) => (
                      <div key={index} className="mb-8 relative">
                        <span className="absolute -left-[38px] top-1 w-4 h-4 bg-[#dabe6e] rounded-full"></span>
                        <h4 className="font-bold text-white">{job.title}</h4>
                        <p className="text-gray-300">{job.company}</p>
                        <p className="text-[#dabe6e] font-semibold">
                          {job.duration}
                        </p>
                        <p className="italic text-gray-400">{job.location}</p>
                        <ul className="list-disc ml-5 mt-2 text-gray-300">
                          {job.points.map((point, idx) => (
                            <li key={idx}>{point}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Download CV Button */}
                <div className="mt-8 text-center">
                  <a
                    href="/assets/Zain_Zahab_Resume.pdf" // Path to the resume file
                    download="Zains_Resume.pdf" // Name of the downloaded file
                    className="inline-flex  items-center bg-[#dabe6e] text-black px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-yellow-600">
                    <span className="mr-2">📥</span> Download CV
                  </a>
                </div>
              </section>
            )}

            {activeSection === "Portfolio" && (
              <section className="text-white p-6">
                {/* Category Filters */}
                <div className="mb-8">
                  {/* Desktop View: Horizontal Categories */}
                  <div className="hidden md:flex space-x-6 border-b border-gray-600 pb-2">
                    {["All", "Applications", "Web Development", "UI/UX"].map(
                      (category) => (
                        <button
                          key={category}
                          className={`px-4 py-2 transition-all duration-300 ${
                            selectedCategory === category
                              ? "text-[#dabe6e] border-b-2 border-[#dabe6e] font-medium"
                              : "text-gray-400 hover:text-gray-200"
                          }`}
                          onClick={() => setSelectedCategory(category)}>
                          {category}
                        </button>
                      )
                    )}
                  </div>

                  {/* Mobile View: Dropdown */}
                  <select
                    className="md:hidden w-full p-2 rounded-lg bg-gray-800 text-white border border-gray-600"
                    onChange={(e) => setSelectedCategory(e.target.value)}>
                    {["All", "Applications", "Web Development", "UI/UX"].map(
                      (category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      )
                    )}
                  </select>
                </div>

                {/* Projects Grid */}
                <motion.div 
                  variants={staggerContainer}
                  initial="hidden"
                  animate="visible"
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                  {filteredProjects.map((project, index) => (
                    <motion.div
                      key={index}
                      variants={fadeInUp}
                      className="bg-[#222222] rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 h-full"
                      whileHover={{ y: -5 }}
                      onClick={() => openModal(project)}>
                      {/* Project Image with Aspect Ratio Container */}
                      <div className="relative aspect-video overflow-hidden">
                        <img
                          src={project.image}
                          alt={project.name}
                          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                          <h3 className="text-xl font-bold text-white">{project.name}</h3>
                          <p className="text-sm text-gray-300">{project.category}</p>
                        </div>
                        
                        {project.previewImages && project.previewImages.length > 1 && (
                          <div className="absolute top-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded-md flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14" />
                            </svg>
                            {project.previewImages.length}
                          </div>
                        )}
                      </div>
                      
                      {/* Project Info */}
                      <div className="p-4">
                        <h3 className="text-lg font-bold text-white mb-1">{project.name}</h3>
                        <p className="text-sm text-gray-300 mb-3 line-clamp-2">
                          {project.description}
                        </p>
                        
                        {/* Tech Stack Tags */}
                        <div className="flex flex-wrap gap-2 mb-3">
                          {project.techStack?.slice(0, 3).map((tech, i) => (
                            <span key={i} className="px-2 py-1 text-xs bg-[#333333] rounded-full text-[#dabe6e]">
                              {tech}
                            </span>
                          ))}
                          {project.techStack?.length > 3 && (
                            <span className="px-2 py-1 text-xs bg-[#333333] rounded-full text-[#dabe6e]">
                              +{project.techStack.length - 3}
                            </span>
                          )}
                        </div>
                        
                        {/* View Project Button */}
                        <button className="w-full mt-2 px-4 py-2 bg-[#2a2a2a] hover:bg-[#333333] text-[#dabe6e] rounded-md transition-colors duration-300 flex items-center justify-center">
                          <span>View Details</span>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
                
                {/* Enhanced Modal Preview */}
                {isOpen && (
                  <motion.div 
                    className="fixed inset-0 bg-black/90 flex items-center justify-center z-50"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="relative bg-[#1a1a1a] p-6 rounded-lg max-w-5xl w-full max-h-[90vh] overflow-y-auto">
                      <button
                        className="absolute top-4 right-4 text-white text-xl bg-[#333] w-8 h-8 rounded-full flex items-center justify-center hover:bg-[#444] transition-colors z-10"
                        onClick={closeModal}>
                        ✖
                      </button>
                      
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Image Carousel */}
                        <div className="aspect-video bg-[#111] rounded-lg overflow-hidden">
                          <Swiper
                            spaceBetween={0}
                            slidesPerView={1}
                            navigation={true}
                            pagination={{ 
                              clickable: true, 
                              dynamicBullets: true 
                            }}
                            keyboard={{
                              enabled: true,
                            }}
                            modules={[Navigation, Pagination, Keyboard]}
                            loop={modalImage?.previewImages?.length > 1}
                            className="h-full"
                          >
                            {modalImage?.previewImages?.map((img, idx) => (
                              <SwiperSlide key={idx} className="flex items-center justify-center">
                                <img
                                  src={img}
                                  alt={`${modalImage?.name} Preview ${idx + 1}`}
                                  className="w-full h-full object-contain"
                                />
                                <div className="absolute bottom-4 right-4 bg-black/60 text-white text-xs px-2 py-1 rounded">
                                  {idx + 1} / {modalImage.previewImages.length}
                                </div>
                              </SwiperSlide>
                            ))}
                          </Swiper>
                        </div>
                        
                        {/* Project Details & Case Study */}
                        <div className="flex flex-col">
                          <h3 className="text-2xl font-bold text-white mb-2">{modalImage?.name}</h3>
                          <div className="flex items-center mb-4">
                            <span className="text-[#dabe6e] mr-2">{modalImage?.category}</span>
                            <span className="text-gray-400">• {modalImage?.year}</span>
                          </div>
                          
                          {/* Project Overview Tab */}
                          <div className="bg-[#222] p-4 rounded-lg mb-6">
                            <h4 className="text-white font-medium mb-2 flex items-center">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-[#c8bb82]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              Overview
                            </h4>
                            <p className="text-gray-300 mb-4">{modalImage?.description}</p>
                            
                            <h5 className="text-white font-medium mt-4 mb-2">Technologies Used:</h5>
                            <div className="flex flex-wrap gap-2">
                              {modalImage?.techStack?.map((tech, idx) => (
                                <span key={idx} className="px-3 py-1 bg-[#2a2a2a] rounded-full text-[#c8bb82]">
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </div>
                          
                          {/* Case Study Sections */}
                          {modalImage?.caseStudy && (
                            <div className="space-y-4">
                              <div className="bg-[#222] p-4 rounded-lg">
                                <h4 className="text-white font-medium mb-2 flex items-center">
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                  </svg>
                                  Problem
                                </h4>
                                <p className="text-gray-300">{modalImage.caseStudy.problem}</p>
                              </div>
                              
                              <div className="bg-[#222] p-4 rounded-lg">
                                <h4 className="text-white font-medium mb-2 flex items-center">
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                  </svg>
                                  Solution
                                </h4>
                                <p className="text-gray-300">{modalImage.caseStudy.solution}</p>
                              </div>
                              
                              <div className="bg-[#222] p-4 rounded-lg">
                                <h4 className="text-white font-medium mb-2 flex items-center">
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                  </svg>
                                  Results
                                </h4>
                                <p className="text-gray-300">{modalImage.caseStudy.results}</p>
                              </div>
                            </div>
                          )}
                          
                          {/* Visit Project Button */}
                          {modalImage?.link && (
                            <a 
                              href={modalImage?.link} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="mt-6 px-6 py-3 bg-[#dabe6e] text-black font-semibold rounded-lg hover:bg-[#bfa353] transition flex items-center justify-center"
                            >
                              Visit Live Project
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                              </svg>
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </section>
            )}

            {activeSection === "Contact" && (
              <section className="p-8 max-w-lg mx-auto text-center">
                <h2 className="text-3xl font-bold text-white mb-6">
                  Get in Touch
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="text-left">
                    <label className="block text-white font-medium">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your name"
                      className={`w-full p-3 rounded-lg border ${
                        errors.name ? "border-red-500" : "border-gray-400"
                      } focus:outline-none focus:ring-2 focus:ring-[#dabe6e] bg-[#222222] text-white`}
                    />
                    {errors.name && (
                      <p className="text-red-500 text-sm">{errors.name}</p>
                    )}
                  </div>

                  <div className="text-left">
                    <label className="block text-white font-medium">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email"
                      className={`w-full p-3 rounded-lg border ${
                        errors.email ? "border-red-500" : "border-gray-400"
                      } focus:outline-none focus:ring-2 focus:ring-[#dabe6e] bg-[#222222] text-white`}
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm">{errors.email}</p>
                    )}
                  </div>

                  <div className="text-left">
                    <label className="block text-white font-medium">
                      Message
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Write your message..."
                      rows="4"
                      className={`w-full p-3 rounded-lg border ${
                        errors.message ? "border-red-500" : "border-gray-400"
                      } focus:outline-none focus:ring-2 focus:ring-[#dabe6e] bg-[#222222] text-white`}
                    />
                    {errors.message && (
                      <p className="text-red-500 text-sm">{errors.message}</p>
                    )}
                  </div>

                  {errors.form && (
                    <p className="text-red-500 text-center">{errors.form}</p>
                  )}
                  {successMessage && (
                    <p className="text-green-500 text-center">
                      {successMessage}
                    </p>
                  )}

                  <button
                    type="submit"
                    className="w-full p-3 bg-[#dabe6e] text-black font-semibold rounded-lg hover:bg-[#bfa353] transition disabled:opacity-50"
                    disabled={isSending}>
                    {isSending ? "Sending..." : "Send Message"}
                  </button>
                </form>
              </section>
            )}

            {activeSection !== "About" && (
              <h1 className="text-2xl font-bold text-white">{""}</h1>
            )}
          </motion.div>
        </div>
      </div>
      {/* Fixed Navbar at the Bottom for Mobile */}
      <div className="fixed bottom-0 left-0 right-0 md:hidden bg-[#282828]/90 py-4 px-6  flex justify-between items-center z-10">
        <nav
          className="flex flex-wrap justify-between px-5 space-x-4 text-sm text-white font-bold "
          style={{
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          }}>
          {sections.map((section) => (
            <button
              key={section}
              className={`cursor-pointer transition-colors duration-300 ${
                activeSection === section ? "text-[#c8bb82]" : "text-white"
              }`}
              onClick={() => setActiveSection(section)}>
              {section}
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default Home;
