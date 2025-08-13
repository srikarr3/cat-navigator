import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { 
  BookOpen, 
  ExternalLink, 
  Video, 
  FileText,
  Target,
  TrendingUp,
  Star,
  CheckCircle,
  ShieldCheck,
  Award,
  BookMarked,
  BarChart2,
  BookCheck
} from 'lucide-react'
import React from 'react'

const StudyMaterials = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [selectedCategory, setSelectedCategory] = useState('all')

  // Set initial category from URL parameters or navigation state and scroll to section
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const categoryParam = searchParams.get('category');
    
    if (categoryParam) {
      setSelectedCategory(categoryParam);
      // Scroll to the section after a small delay to allow the component to render
      const timer = setTimeout(() => {
        const section = document.getElementById(`category-${categoryParam}`);
        if (section) {
          section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
      return () => clearTimeout(timer);
    } else if (location.state?.category) {
      setSelectedCategory(location.state.category);
      // Clear the location state to prevent keeping it on refresh
      window.history.replaceState({}, document.title);
      
      // Scroll to the section after a small delay
      const timer = setTimeout(() => {
        const section = document.getElementById(`category-${location.state.category}`);
        if (section) {
          section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [location.state, location.search]);

  const handleCategoryChange = (categoryId) => {
    const newCategory = categoryId === 'all' ? 'all' : categoryId;
    setSelectedCategory(newCategory);
    // Update URL with the new category and scroll to top
    navigate(`/study-materials${newCategory !== 'all' ? `?category=${newCategory}` : ''}`, { 
      replace: true,
      state: { category: newCategory }
    });
    window.scrollTo(0, 0);
  };

  const categories = [
    { id: 'all', name: 'All Resources', icon: BookOpen },
    { id: 'books', name: 'Books', icon: BookMarked },
    { id: 'mocks', name: 'Mock Platforms', icon: Target },
    { id: 'videos', name: 'Video & Strategy', icon: Video },
  ]

  const studyMaterials = [
    // --- Books (10) ---
    {
      category: 'books',
      name: 'How to Prepare for Quantitative Aptitude for the CAT',
      provider: 'Arun Sharma',
      rating: 4.8,
      price: 'Paid',
      verified: true,
      trusted: true,
      bestFor: 'QA',
      updated: 'Latest',
      description: 'Comprehensive guide for CAT Quantitative Aptitude',
      features: [
        'Complete QA syllabus coverage',
        'Chapter-wise practice questions',
        'Previous year CAT questions',
        '3 difficulty levels',
        'Shortcut techniques'
      ],
      link: 'https://edge.mheducation.co.in/course/CAT-QA-ArunSharma-6'
    },
    {
      category: 'books',
      name: 'Quantitative Aptitude Quantum CAT',
      provider: 'Sarvesh Verma',
      rating: 4.7,
      price: 'Paid',
      verified: true,
      trusted: true,
      bestFor: 'Advanced QA',
      updated: 'Latest',
      description: 'Advanced level QA preparation book',
      features: [
        'Advanced level questions',
        'Comprehensive theory',
        'Practice exercises',
        'Shortcut methods',
        'Previous year questions'
      ],
      link: 'https://books.google.com/books/about/Quantitative_Aptitude_Quantum_Cat.html?id=VYRIEAAAQBAJ'
    },
    {
      category: 'books',
      name: 'Word Power Made Easy',
      provider: 'Norman Lewis',
      rating: 4.7,
      price: 'Affordable',
      verified: true,
      trusted: true,
      bestFor: 'Vocabulary',
      updated: 'Latest',
      description: 'Best-selling vocabulary builder',
      features: [
        'Vocabulary building',
        'Word roots and origins',
        'Memory techniques',
        'Practice exercises',
        'Etymology'
      ],
      link: 'https://books.google.com/books?id=W2lVHktWAuEC&printsec=frontcover'
    },
    {
      category: 'books',
      name: 'Verbal Ability & RC',
      provider: 'Arun Sharma & Meenakshi Upadhyay',
      rating: 4.7,
      price: 'Paid',
      verified: true,
      trusted: true,
      bestFor: 'VARC',
      updated: 'Latest',
      description: 'Comprehensive guide for VARC section',
      features: [
        'Reading comprehension',
        'Grammar rules',
        'Vocabulary building',
        'Practice exercises',
        'Previous year questions'
      ],
      link: 'https://edge.mheducation.co.in/course/CAT-VARC-MeenakshiUpadhyay-7'
    },
    {
      category: 'books',
      name: 'Pearson Guide to VARC',
      provider: 'Nishit Sinha',
      rating: 4.6,
      price: 'Paid',
      verified: true,
      trusted: true,
      bestFor: 'VARC',
      updated: 'Latest',
      description: 'Complete VARC preparation guide',
      features: [
        'Reading comprehension',
        'Verbal ability',
        'Practice exercises',
        'Previous year papers',
        'Mock tests'
      ],
      link: 'https://books.google.com/books/about/The_Pearson_Guide_to_Verbal_Ability_and.html?id=rmc8BAAAQBAJ'
    },
    {
      category: 'books',
      name: 'CAT DI & LR',
      provider: 'Gautam Puri',
      rating: 4.5,
      price: 'Paid',
      verified: true,
      trusted: true,
      bestFor: 'DILR',
      updated: 'Latest',
      description: 'Complete DILR preparation guide',
      features: [
        'Data interpretation',
        'Logical reasoning',
        'Practice sets',
        'Shortcut methods',
        'Previous year questions'
      ],
      link: 'https://books.google.com/books/about/CAT_2021_Data_Interpretation_Logical_Rea.html?id=ogptzgEACAAJ'
    },
    {
      category: 'books',
      name: 'DILR CAT',
      provider: 'Arun Sharma',
      rating: 4.6,
      price: 'Paid',
      verified: true,
      trusted: true,
      bestFor: 'DILR',
      updated: 'Latest',
      description: 'DILR preparation by Arun Sharma',
      features: [
        'Data interpretation',
        'Logical reasoning',
        'Practice exercises',
        'Previous year questions',
        'Shortcut techniques'
      ],
      link: 'https://arunsharmaacademy.com/scaleupdilr2025'
    },
    {
      category: 'books',
      name: 'A Modern Approach to Logical Reasoning',
      provider: 'R.S. Aggarwal',
      rating: 4.4,
      price: 'Affordable',
      verified: true,
      trusted: true,
      bestFor: 'LR Basics',
      updated: 'Latest',
      description: 'Fundamentals of logical reasoning',
      features: [
        'Logical reasoning concepts',
        'Practice exercises',
        'Solved examples',
        'Previous year questions',
        'Shortcut methods'
      ],
      link: 'https://www.schandpublishing.com/books/competitive-books/dr-rs-aggarwal/a-modern-approach-logical-reasoning/9789355013521/?srsltid=AfmBOooNmu9yUnx-_kylLugCscaGb0DYRvPGfMseLtWj55ptYYiOThHd'
    },
    {
      category: 'books',
      name: 'Quant RS Aggarwal',
      provider: 'RS Aggarwal',
      rating: 4.3,
      price: 'Affordable',
      verified: true,
      trusted: true,
      bestFor: 'QA Basics',
      updated: 'Latest',
      description: 'Basic quantitative aptitude guide',
      features: [
        'Basic concepts',
        'Practice exercises',
        'Solved examples',
        'Previous year questions',
        'Shortcut methods'
      ],
      link: 'https://www.schandpublishing.com/specialbook/r-s-aggarwal-books?srsltid=AfmBOorZbduMZbEl4wpR9FfyizjHkVVl4aDAxUqVaHUdfPYAmArqL7iW'
    },
    {
      category: 'books',
      name: 'Quantitative Aptitude for CAT',
      provider: 'Nishit Sinha',
      rating: 4.6,
      price: 'Paid',
      verified: true,
      trusted: true,
      bestFor: 'QA Concepts',
      updated: 'Latest',
      description: 'Conceptual clarity for QA section',
      features: [
        'Concept building',
        'Practice exercises',
        'Previous year questions',
        'Shortcut methods',
        'Performance tracking'
      ],
      link: 'https://pearsoned.co.in/web/books/9789367133422_Quantitative-Aptitude-for-CAT_Nishit-K-Sinha.aspx'
    },
    // --- Mocks / Platforms (10) ---
    {
      category: 'mocks',
      name: 'IIM Official CAT Mocks',
      provider: 'IIM CAT',
      rating: 4.9,
      price: 'Free',
      verified: true,
      trusted: true,
      bestFor: 'Mock Practice',
      updated: '2025',
      description: 'Official mock tests by IIMs',
      features: [
        'Official test interface',
        'Previous year papers',
        'Performance analysis',
        'Sectional tests',
        'Detailed solutions'
      ],
      link: 'https://iimcat.ac.in/'
    },
    {
      category: 'mocks',
      name: 'Open CAT – Career Launcher',
      provider: 'Career Launcher',
      rating: 4.8,
      price: 'Free',
      verified: true,
      trusted: true,
      bestFor: 'Mocks & Material',
      updated: '2025',
      description: 'Free mock tests and study material',
      features: [
        'Free mock tests',
        'Sectional tests',
        'Performance analysis',
        'Video solutions',
        'Study material'
      ],
      link: 'https://www.careerlauncher.com/cat-mba/freecatmock/'
    },
    {
      category: 'mocks',
      name: '2IIM Free CAT Material',
      provider: '2IIM',
      rating: 4.8,
      price: 'Free',
      verified: true,
      trusted: true,
      bestFor: 'Mocks & PYQ',
      updated: '2025',
      description: 'Free study material and mocks',
      features: [
        'Previous year papers',
        'Sectional tests',
        'Video solutions',
        'Study material',
        'Performance tracking'
      ],
      link: 'https://online.2iim.com/free-cat-study-material.shtml'
    },
    {
      category: 'mocks',
      name: 'Cracku Free Mocks',
      provider: 'Cracku',
      rating: 4.7,
      price: 'Free',
      verified: true,
      trusted: true,
      bestFor: 'Mocks & PYQ',
      updated: '2025',
      description: 'Free mock tests and previous year papers',
      features: [
        'Free mock tests',
        'Previous year papers',
        'Sectional tests',
        'Video solutions',
        'Performance analysis'
      ],
      link: 'https://cracku.in/free-cat-preparation'
    },
    {
      category: 'mocks',
      name: 'TestFunda CAT Mocks',
      provider: 'TestFunda',
      rating: 4.6,
      price: 'Free (Limited)',
      verified: true,
      trusted: true,
      bestFor: 'Mock Tests',
      updated: '2025',
      description: 'Free CAT mock tests with analysis',
      features: [
        'Free mock tests',
        'Sectional tests',
        'Performance analysis',
        'Previous year papers',
        'Detailed solutions'
      ],
      link: 'https://www.tcyonline.com/tests/cat-mock-test'
    },
    {
      category: 'mocks',
      name: 'TIME Free CAT Mocks',
      provider: 'T.I.M.E.',
      rating: 4.7,
      price: 'Free (Limited)',
      verified: true,
      trusted: true,
      bestFor: 'Mock Tests',
      updated: '2025',
      description: 'Free CAT mock tests by TIME',
      features: [
        'Free mock tests',
        'Sectional tests',
        'Performance analysis',
        'Previous year papers',
        'Detailed solutions'
      ],
      link: 'https://www.time4education.com/AIMCAT'
    },
    {
      category: 'mocks',
      name: 'Byju\'s CAT Mocks',
      provider: 'Byju\'s',
      rating: 4.6,
      price: 'Free (Limited)',
      verified: true,
      trusted: true,
      bestFor: 'Mock Tests',
      updated: '2025',
      description: 'Free CAT mock tests by Byju\'s',
      features: [
        'Free mock tests',
        'Sectional tests',
        'Performance analysis',
        'Previous year papers',
        'Detailed solutions'
      ],
      link: 'https://catking.in/catpreparationstrategy/'
    },
    {
      category: 'mocks',
      name: 'Unacademy CAT Mocks',
      provider: 'Unacademy',
      rating: 4.7,
      price: 'Free (Limited)',
      verified: true,
      trusted: true,
      bestFor: 'Mock Tests',
      updated: '2025',
      description: 'Free CAT mock tests by Unacademy',
      features: [
        'Free mock tests',
        'Sectional tests',
        'Performance analysis',
        'Previous year papers',
        'Video solutions'
      ],
      link: 'https://unacademy.com/goal/cat-other-mba-entrance-tests/XNDUS'
    },
    {
      category: 'mocks',
      name: 'iQuanta Mocks',
      provider: 'iQuanta',
      rating: 4.7,
      price: 'Premium',
      verified: true,
      trusted: true,
      bestFor: 'Mock Tests',
      updated: '2025',
      description: 'CAT mock tests by iQuanta',
      features: [
        'Paid mock tests',
        'Sectional tests',
        'Performance analysis',
        'Previous year papers',
        'Video solutions'
      ],
      link: 'https://www.iquanta.in/cat-mock-test'
    },
    {
      category: 'mocks',
      name: 'Rodha Mocks',
      provider: 'Rodha',
      rating: 4.8,
      price: 'Free',
      verified: true,
      trusted: true,
      bestFor: 'Mock Tests',
      updated: '2025',
      description: 'Free CAT mock tests by Rodha',
      features: [
        'Free mock tests',
        'Sectional tests',
        'Performance analysis',
        'Previous year papers',
        'Video solutions'
      ],
      link: 'https://www.rodha.co.in/'
    },
    {
      category: 'mocks',
      name: 'MBAP CAT Mocks',
      provider: 'MBAP',
      rating: 4.5,
      price: 'Free',
      verified: true,
      trusted: true,
      bestFor: 'Mock Tests',
      updated: '2025',
      description: 'Free CAT mock tests by MBAP',
      features: [
        'Free mock tests',
        'Sectional tests',
        'Performance analysis',
        'Previous year papers',
        'Detailed solutions'
      ],
      link: 'https://www.imsindia.com/programs/cat/test-series/'
    },
    
    // --- Video & Strategy (10) ---
    {
      category: 'videos',
      name: 'Rodha (IIT Delhi)',
      provider: 'Rodha',
      rating: 4.8,
      price: 'Free',
      verified: true,
      trusted: true,
      bestFor: 'Full Course',
      updated: '2025',
      description: 'Complete CAT preparation course',
      features: [
        'Complete syllabus coverage',
        'Live classes',
        'Doubt solving',
        'Practice questions',
        'Test series'
      ],
      link: 'https://www.youtube.com/channel/UCHXQiDwicRon0tRuWj6r9HA'
    },
    {
      category: 'videos',
      name: 'IQuanta YouTube',
      provider: 'iQuanta',
      rating: 4.7,
      price: 'Free',
      verified: true,
      trusted: true,
      bestFor: 'Concept Videos',
      updated: '2025',
      description: 'CAT preparation videos and strategies',
      features: [
        'Concept videos',
        'Shortcut methods',
        'Live sessions',
        'Doubt clearing',
        'Strategy videos'
      ],
      link: 'https://www.youtube.com/channel/UCJcXnTkWeIrXavsa_DUzq5w'
    },
    {
      category: 'videos',
      name: '2IIM YouTube Channel',
      provider: '2IIM',
      rating: 4.8,
      price: 'Free',
      verified: true,
      trusted: true,
      bestFor: 'PYQ Solutions',
      updated: '2025',
      description: 'Previous year question solutions',
      features: [
        'PYQ solutions',
        'Shortcut methods',
        'Sectional strategies',
        'Mock test analysis',
        'Time management'
      ],
      link: 'https://www.youtube.com/2iimcat'
    },
    {
      category: 'videos',
      name: 'Cracku YouTube',
      provider: 'Cracku',
      rating: 4.6,
      price: 'Free',
      verified: true,
      trusted: true,
      bestFor: 'PYQ Solutions',
      updated: '2025',
      description: 'Previous year question solutions',
      features: [
        'PYQ solutions',
        'Shortcut methods',
        'Sectional strategies',
        'Mock test analysis',
        'Time management'
      ],
      link: 'https://www.youtube.com/@CrackuInexam'
    },
    {
      category: 'videos',
      name: 'Unacademy CAT',
      provider: 'Unacademy',
      rating: 4.7,
      price: 'Free (Limited)',
      verified: true,
      trusted: true,
      bestFor: 'Live Classes',
      updated: '2025',
      description: 'Live classes for CAT preparation',
      features: [
        'Live classes',
        'Recorded lectures',
        'Doubt solving',
        'Practice questions',
        'Test series'
      ],
      link: 'https://unacademy.com/goal/cat-other-mba-entrance-tests/XNDUS'
    },
    {
      category: 'videos',
      name: 'Byju\'s CAT',
      provider: 'Byju\'s',
      rating: 4.6,
      price: 'Free (Limited)',
      verified: true,
      trusted: true,
      bestFor: 'Concept Videos',
      updated: '2025',
      description: 'Concept videos for CAT preparation',
      features: [
        'Concept videos',
        'Practice questions',
        'Shortcut methods',
        'Sectional strategies',
        'Time management'
      ],
      link: 'https://catking.in/catpreparationstrategy/'
    },
    {
      category: 'videos',
      name: 'MBA Pathshala',
      provider: 'MBA Pathshala',
      rating: 4.5,
      price: 'Free',
      verified: true,
      trusted: true,
      bestFor: 'Strategy Videos',
      updated: '2025',
      description: 'Strategy videos for CAT preparation',
      features: [
        'Strategy videos',
        'Sectional strategies',
        'Time management',
        'Mock test analysis',
        'Previous year papers'
      ],
      link: 'https://www.youtube.com/@CareerLauncher_MBA'
    },
    {
      category: 'videos',
      name: 'CATKing YouTube',
      provider: 'CATKing',
      rating: 4.4,
      price: 'Free',
      verified: true,
      trusted: true,
      bestFor: 'Shortcut Methods',
      updated: '2025',
      description: 'Shortcut methods for CAT preparation',
      features: [
        'Shortcut methods',
        'Sectional strategies',
        'Time management',
        'Mock test analysis',
        'Previous year papers'
      ],
      link: 'https://www.youtube.com/channel/UC4eEFUtZeW6iOqH8e9e0CyQ'
    },
    {
      category: 'videos',
      name: 'MBAP CAT Prep',
      provider: 'MBAP',
      rating: 4.3,
      price: 'Free',
      verified: true,
      trusted: true,
      bestFor: 'Sectional Strategies',
      updated: '2025',
      description: 'Sectional strategies for CAT preparation',
      features: [
        'Sectional strategies',
        'Time management',
        'Mock test analysis',
        'Previous year papers',
        'Shortcut methods'
      ],
      link: 'https://www.imsindia.com/programs/cat/test-series/'
    },
    {
      category: 'videos',
      name: 'T.I.M.E. CAT',
      provider: 'T.I.M.E.',
      rating: 4.5,
      price: 'Free (Limited)',
      verified: true,
      trusted: true,
      bestFor: 'Full Course',
      updated: '2025',
      description: 'Complete CAT preparation course',
      features: [
        'Complete syllabus coverage',
        'Live classes',
        'Doubt solving',
        'Practice questions',
        'Test series'
      ],
      link: 'https://www.time4education.com/AIMCAT'
    },
    
    // --- Free Platforms (10) ---
    {
      category: 'free',
      name: 'Cracku Free Mocks & Resources',
      provider: 'Cracku',
      rating: 4.7,
      price: 'Free',
      verified: true,
      trusted: true,
      bestFor: 'Mocks & Videos',
      updated: '2025',
      description: 'Free CAT preparation resources',
      features: [
        'Free mock tests',
        'Sectional tests',
        'Video solutions',
        'Previous year papers',
        'Study material'
      ],
      link: 'https://cracku.in/free-cat-preparation'
    },
    {
      category: 'free',
      name: 'Unacademy CAT Platform',
      provider: 'Unacademy',
      rating: 4.7,
      price: 'Free (Limited)',
      verified: true,
      trusted: true,
      bestFor: 'Live & Recorded',
      updated: '2025',
      description: 'Free CAT preparation content',
      features: [
        'Free live classes',
        'Recorded lectures',
        'Practice questions',
        'Mock tests',
        'Doubt solving'
      ],
      link: 'https://unacademy.com/goal/cat-other-mba-entrance-tests/XNDUS'
    }
  ]

  const filteredResources = studyMaterials.filter(
    (resource) =>
      selectedCategory === 'all' || resource.category === selectedCategory
  )

  const renderStars = (rating) => {
    return Array(5).fill(0).map((_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ))
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Study Materials & Resources
        </h1>
        <p className="text-xl text-gray-700 max-w-3xl mx-auto">
          Trusted collection of CAT preparation resources from verified providers
        </p>
      </div>

      {/* Google Sheets Link */}
      <div className="bg-gradient-to-r from-pink-50 to-pink-100 border-l-4 border-pink-400 rounded-lg p-6 mb-8">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="mb-4 md:mb-0 md:mr-6">
            <h3 className="text-xl font-bold text-gray-900 mb-2">📊 Complete Resource Database</h3>
            <p className="text-gray-700">Access our comprehensive collection of CAT preparation resources in one place</p>
          </div>
          <a 
            href="https://docs.google.com/spreadsheets/d/121TJowkkWLeaPSAYp5Cokg0If9iwBtFDF6CZ5JWIYO0/edit?gid=0#gid=0"
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center bg-pink-600 hover:bg-pink-700 font-medium rounded-lg px-6 py-3 transition-all duration-200 shadow-md hover:shadow-lg whitespace-nowrap"
          >
            <span className="text-white">Open Resource Database</span>
            <ExternalLink className="w-4 h-4 ml-2 text-white" />
          </a>
        </div>
      </div>

      {/* Category Navigation */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Browse by Category</h2>
        <div className="flex flex-wrap gap-3">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategoryChange(category.id)}
              className={`flex items-center px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 ${
                selectedCategory === category.id || (category.id === 'all' && selectedCategory === 'all')
                  ? 'bg-pink-600 text-white shadow-md hover:shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 hover:border-gray-300 shadow-sm hover:shadow-md'
              }`}
            >
              <category.icon className="w-4 h-4 mr-2 flex-shrink-0" />
              {category.name}
              <span className="ml-2 bg-white/20 px-2 py-0.5 rounded-full text-xs">
                {studyMaterials.filter(item => 
                  category.id === 'all' ? true : item.category === category.id
                ).length}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Resources Grid */}
      <div className="mb-12" id={selectedCategory === 'all' ? 'category-all' : `category-${selectedCategory}`}>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            {selectedCategory === 'all' ? 'All Study Resources' : 
             categories.find(c => c.id === selectedCategory)?.name}
          </h2>
          <div className="text-sm text-gray-500">
            Showing {filteredResources.length} resources
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResources.map((resource, index) => (
            <div 
              key={index}
              className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-pink-200 flex flex-col h-full"
            >
              <div className="p-6 flex-1 flex flex-col text-gray-800">
                {/* Badges */}
                <div className="flex flex-wrap gap-2 mb-3">
                  {resource.trusted && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      <ShieldCheck className="h-3 w-3 mr-1" /> Trusted
                    </span>
                  )}
                  {resource.verified && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      <CheckCircle className="h-3 w-3 mr-1" /> Verified
                    </span>
                  )}
                  {resource.bestFor && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-pink-100 text-pink-800">
                      {resource.bestFor}
                    </span>
                  )}
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-pink-600 transition-colors">
                  {resource.name}
                </h3>
                
                <div className="flex items-center text-sm text-gray-600 mb-4">
                  <span className="font-medium">{resource.provider}</span>
                  {resource.updated && (
                    <span className="mx-2">•</span>
                  )}
                  {resource.updated && (
                    <span className="text-gray-500">{resource.updated}</span>
                  )}
                </div>

                <p className="text-gray-800 mb-4 flex-1 leading-relaxed">
                  {resource.description}
                </p>

                <div className="mt-4 mb-5">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Key Features:</h4>
                  <ul className="space-y-1.5">
                    {resource.features.slice(0, 3).map((feature, i) => (
                      <li key={i} className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-auto pt-4 border-t border-gray-100">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      {renderStars(resource.rating)}
                      <span className="ml-2 text-sm text-gray-600">
                        {resource.rating}
                      </span>
                    </div>
                    <div className={`text-sm font-medium px-3 py-1 rounded-full ${
                      resource.price === 'Free' 
                        ? 'bg-green-100 text-green-900' 
                        : resource.price === 'Premium' 
                          ? 'bg-purple-100 text-purple-900'
                          : 'bg-pink-100 text-pink-900'
                    }`}>
                      {resource.price === 'Free' ? 'FREE' : resource.price}
                    </div>
                  </div>
                  
                  <a
                    href={resource.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full text-center bg-pink-600 hover:bg-pink-700 text-white font-medium py-2.5 px-4 rounded-lg transition-all duration-200 group-hover:shadow-lg group-hover:-translate-y-0.5 shadow-sm hover:shadow-md"
                  >
                    <span className="text-white font-semibold">View Details</span>
                    <ExternalLink className="h-4 w-4 inline-block ml-1.5 text-white group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default StudyMaterials
