import { 
  GraduationCap, 
  Github, 
  Linkedin, 
  ExternalLink, 
  Percent, 
  Target, 
  FileText, 
  Calculator, 
  BookOpen, 
  FileCheck, 
  BookMarked 
} from 'lucide-react'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-[#E1006A] text-white font-poppins">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center mb-4">
              <GraduationCap className="h-9 w-9 text-white" />
              <span className="ml-3 text-2xl font-extrabold tracking-tight font-poppins text-white">CATNavigator</span>
            </div>
            <p className="text-white mb-5 max-w-md leading-relaxed">
              Your comprehensive guide to CAT preparation and MBA admissions. We provide accurate data, interactive tools, and strategic insights to help you navigate your MBA journey successfully.
            </p>
            <div className="flex items-center gap-4 mt-4">
              <a href="https://github.com/srikarr3" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="bg-white/20 p-2 rounded-full hover:bg-white/10 hover:text-[#E1006A] transition-colors">
                <Github className="h-6 w-6" />
              </a>
              <a href="https://www.linkedin.com/in/srikar-mandava-60b4bb24b/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="bg-white/20 p-2 rounded-full hover:bg-white/10 hover:text-[#E1006A] transition-colors">
                <Linkedin className="h-6 w-6" />
              </a>
              <a href="https://srikar-portfolio-4evs.vercel.app/" target="_blank" rel="noopener noreferrer" aria-label="Portfolio" className="bg-white/20 p-2 rounded-full hover:bg-white/10 hover:text-[#E1006A] transition-colors">
                <ExternalLink className="h-6 w-6" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white font-poppins">Quick Links</h3>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <Percent className="h-4 w-4" />
                <a href="/marks-vs-percentile" className="text-white hover:text-white transition-colors font-medium flex-1">Marks vs Percentile</a>
              </li>
              <li className="flex items-center gap-2">
                <Target className="h-4 w-4" />
                <a href="/iim-cutoffs" className="text-white hover:text-white transition-colors font-medium flex-1">IIM Cutoffs</a>
              </li>
              <li className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                <a href="/post-cat-process" className="text-white hover:text-white transition-colors font-medium flex-1">Post-CAT Process</a>
              </li>
              <li className="flex items-center gap-2">
                <Calculator className="h-4 w-4" />
                <a href="/tools" className="text-white hover:text-white transition-colors font-medium flex-1">Tools & Calculators</a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white font-poppins">Resources</h3>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                <a href="/low-pi-wat-iims" className="text-white hover:text-white transition-colors font-medium flex-1">Low PI/WAT IIMs</a>
              </li>
              <li className="flex items-center gap-2">
                <GraduationCap className="h-4 w-4" />
                <a href="/other-colleges" className="text-white hover:text-white transition-colors font-medium flex-1">Other Colleges</a>
              </li>
              <li className="flex items-center gap-2">
                <FileCheck className="h-4 w-4" />
                <a href="/study-materials?category=mocks" className="text-white hover:text-white transition-colors font-medium flex-1">Mock Tests</a>
              </li>
              <li className="flex items-center gap-2">
                <BookMarked className="h-4 w-4" />
                <a href="/study-materials" className="text-white hover:text-white transition-colors font-medium flex-1">Study Materials</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/20 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-white text-sm font-poppins">
              {currentYear} CAT Navigator. All rights reserved.
            </p>
            <div className="mt-4 md:mt-0">
              <a href="mailto:msaisrikar333@gmail.com" className="text-white hover:text-white text-sm font-medium transition-colors" aria-label="Contact">Contact Me</a>
            </div>
          </div>
          <div className="mt-4 text-center">
            <p className="text-white text-xs font-poppins">
              Data sources: Official IIM websites, CAT conducting authorities, and verified educational platforms.<br/>
              This website is for educational purposes only and is not affiliated with any official CAT conducting body.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

