import { useState } from 'react'
import { 
  Search, 
  Filter, 
  Download, 
  ExternalLink, 
  Building,
  Target,
  GraduationCap,
  MapPin,
  DollarSign,
  Users,
  FileText,
  BookOpen
} from 'lucide-react'
import { otherInstitutes } from '../data/comprehensiveData'
import { generateOtherInstitutesCSV, downloadCSV } from '../data/exportData'

const OtherColleges = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [sortBy, setSortBy] = useState('cutoff')

  const categories = [
    { id: 'all', name: 'All Categories', color: 'gray' },
    { id: 'fms', name: 'FMS Delhi', color: 'blue' },
    { id: 'spjimr', name: 'SPJIMR Mumbai', color: 'green' },
    { id: 'mdi', name: 'MDI Gurgaon', color: 'purple' },
    { id: 'iift', name: 'IIFT Delhi', color: 'orange' },
    { id: 'jbims', name: 'JBIMS Mumbai', color: 'red' },
    { id: 'nitie', name: 'NITIE Mumbai', color: 'indigo' },
    { id: 'iit', name: 'IIT B-Schools', color: 'pink' }
  ]

  const filteredInstitutes = otherInstitutes
    .filter(inst => {
      const matchesSearch = inst.name.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = selectedCategory === 'all' || 
        (selectedCategory === 'fms' && inst.name.includes('FMS')) ||
        (selectedCategory === 'spjimr' && inst.name.includes('SPJIMR')) ||
        (selectedCategory === 'mdi' && inst.name.includes('MDI')) ||
        (selectedCategory === 'iift' && inst.name.includes('IIFT')) ||
        (selectedCategory === 'jbims' && inst.name.includes('JBIMS')) ||
        (selectedCategory === 'nitie' && inst.name.includes('NITIE')) ||
        (selectedCategory === 'iit' && inst.name.includes('IIT'))
      return matchesSearch && matchesCategory
    })
    .sort((a, b) => {
      if (sortBy === 'cutoff') return b.cutoff.overall - a.cutoff.overall
      if (sortBy === 'name') return a.name.localeCompare(b.name)
      if (sortBy === 'fees') {
        const aFees = parseFloat(a.fees.replace(/[^\d.]/g, ''))
        const bFees = parseFloat(b.fees.replace(/[^\d.]/g, ''))
        return aFees - bFees
      }
      return 0
    })

  const handleDownloadData = () => {
    const data = generateOtherInstitutesCSV()
    downloadCSV(data, 'other_institutes_data.csv')
  }

  const getConfidenceColor = (score) => {
    if (score >= 90) return 'bg-green-100 text-green-800'
    if (score >= 70) return 'bg-yellow-100 text-yellow-800'
    return 'bg-red-100 text-red-800'
  }

  const getProcessBreakdown = (process) => {
    const breakdown = []
    if (process.cat > 0) breakdown.push(`CAT: ${process.cat}%`)
    if (process.gd > 0) breakdown.push(`GD: ${process.gd}%`)
    if (process.pi > 0) breakdown.push(`PI: ${process.pi}%`)
    if (process.spjat > 0) breakdown.push(`SPJAT: ${process.spjat}%`)
    if (process.essay > 0) breakdown.push(`Essay: ${process.essay}%`)
    if (process.academics > 0) breakdown.push(`Academics: ${process.academics}%`)
    return breakdown
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-pink-600 mb-4">
          Other Colleges Accepting CAT
        </h1>
        <p className="text-xl text-gray-600">
          Comprehensive guide to non-IIM institutes with CAT-based admissions
        </p>
      </div>

      {/* Key Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 shadow-lg border border-pink-100 text-center">
          <div className="text-3xl font-bold text-pink-600 mb-2">{otherInstitutes.length}</div>
          <div className="text-gray-600">Total Institutes</div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-lg border border-pink-100 text-center">
          <div className="text-3xl font-bold text-pink-600 mb-2">
            {Math.round(otherInstitutes.reduce((sum, inst) => sum + inst.cutoff.overall, 0) / otherInstitutes.length)}%
          </div>
          <div className="text-gray-600">Avg. Cutoff</div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-lg border border-pink-100 text-center">
          <div className="text-3xl font-bold text-pink-600 mb-2">
            {Math.round(otherInstitutes.reduce((sum, inst) => sum + inst.process.cat, 0) / otherInstitutes.length)}%
          </div>
          <div className="text-gray-600">Avg. CAT Weight</div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-lg border border-pink-100 text-center">
          <div className="text-3xl font-bold text-pink-600 mb-2">
            {otherInstitutes.filter(inst => inst.fees.includes('Lakh')).length}
          </div>
          <div className="text-gray-600">Premium Programs</div>
        </div>
      </div>

      {/* Controls */}
      <div className="bg-white rounded-xl shadow-lg border border-pink-100 p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search institutes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-pink-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            />
          </div>

          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 border border-pink-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent cursor-pointer hover:border-pink-300 transition-colors duration-200"
          >
            {categories.map(category => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>

          {/* Sort By */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 border border-pink-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent cursor-pointer hover:border-pink-300 transition-colors duration-200"
          >
            <option value="cutoff">Sort by Cutoff</option>
            <option value="name">Sort by Name</option>
            <option value="fees">Sort by Fees</option>
          </select>

          {/* Download Button */}
          <button
            onClick={handleDownloadData}
            className="bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700 transition-all duration-300 flex items-center justify-center cursor-pointer active:scale-95"
          >
            <Download className="w-4 h-4 mr-2" />
            Download
          </button>
        </div>
      </div>

      {/* Institutes Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
        {filteredInstitutes.map((inst) => (
          <div key={inst.name} className="bg-white rounded-xl shadow-lg border border-pink-100 overflow-hidden hover:shadow-xl transition-shadow duration-300">
            {/* Header */}
            <div className="p-6 border-b border-pink-100">
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-xl font-bold text-gray-800">{inst.name}</h3>
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-pink-600 text-white">
                  NIRF #{inst.nirfRanking}
                </span>
              </div>
              
              {/* Programs */}
              <div className="mb-3">
                <div className="flex items-center text-sm text-gray-600 mb-2">
                  <GraduationCap className="w-4 h-4 mr-2" />
                  <span className="font-medium">Programs:</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {inst.programs.map((program, index) => (
                    <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                      {program}
                    </span>
                  ))}
                </div>
              </div>

              {/* Cutoff */}
              <div className="mb-3">
                <div className="flex items-center text-sm text-gray-600 mb-2">
                  <Target className="w-4 h-4 mr-2" />
                  <span className="font-medium">Overall Cutoff:</span>
                </div>
                <div className="text-2xl font-bold text-pink-600">{inst.cutoff.overall}%</div>
              </div>
            </div>

            {/* Details */}
            <div className="p-6">
              {/* Sectional Cutoffs */}
              <div className="grid grid-cols-3 gap-3 mb-4">
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-xs text-gray-600 mb-1">VARC</div>
                  <div className="font-semibold text-gray-800">{inst.cutoff.varc}%</div>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-xs text-gray-600 mb-1">DILR</div>
                  <div className="font-semibold text-gray-800">{inst.cutoff.dilr}%</div>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-xs text-gray-600 mb-1">QA</div>
                  <div className="font-semibold text-gray-800">{inst.cutoff.qa}%</div>
                </div>
              </div>

              {/* Selection Process */}
              <div className="mb-4">
                <div className="text-sm font-medium text-gray-600 mb-2">Selection Process:</div>
                <div className="space-y-2">
                  {getProcessBreakdown(inst.process).map((item, index) => (
                    <div key={index} className="flex justify-between text-sm">
                      <span>{item.split(':')[0]}</span>
                      <span className="font-semibold text-pink-600">{item.split(':')[1]}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Fees */}
              <div className="mb-4">
                <div className="flex items-center text-sm text-gray-600 mb-2">
                  <DollarSign className="w-4 h-4 mr-2" />
                  <span className="font-medium">Fees:</span>
                </div>
                <div className="text-lg font-semibold text-gray-800">{inst.fees}</div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-pink-100">
                <div className="flex items-center">
                  <span className={`px-2 py-1 rounded-full text-xs ${getConfidenceColor(inst.confidence)}`}>
                    {inst.confidence}% Confidence
                  </span>
                </div>
                <a
                  href={inst.source}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-pink-600 hover:text-pink-700 text-sm font-medium flex items-center"
                >
                  <ExternalLink className="w-4 h-4 mr-1" />
                  Source
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* No Results Message */}
      {filteredInstitutes.length === 0 && (
        <div className="text-center py-12">
          <Building className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-600 mb-2">No Institutes Found</h3>
          <p className="text-gray-500">Try adjusting your search criteria or filters</p>
        </div>
      )}

      {/* Comparison Table */}
      <div className="bg-white rounded-xl shadow-lg border border-pink-100 p-6 mb-8">
        <h2 className="text-2xl font-bold text-pink-600 mb-6 flex items-center">
          <FileText className="w-6 h-6 mr-3" />
          Quick Comparison Table
        </h2>
        
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-pink-50">
                <th className="border border-pink-200 p-3 text-left text-sm font-medium text-pink-800">Institute</th>
                <th className="border border-pink-200 p-3 text-left text-sm font-medium text-pink-800">Overall Cutoff</th>
                <th className="border border-pink-200 p-3 text-left text-sm font-medium text-pink-800">CAT Weight</th>
                <th className="border border-pink-200 p-3 text-left text-sm font-medium text-pink-800">Process</th>
                <th className="border border-pink-200 p-3 text-left text-sm font-medium text-pink-800">Fees</th>
                <th className="border border-pink-200 p-3 text-left text-sm font-medium text-pink-800">Confidence</th>
              </tr>
            </thead>
            <tbody>
              {filteredInstitutes.map((inst) => (
                <tr key={inst.name} className="hover:bg-pink-50">
                  <td className="border border-pink-200 p-3">
                    <div className="font-semibold text-gray-800">{inst.name}</div>
                    <div className="text-xs text-gray-600">{inst.programs.join(', ')}</div>
                  </td>
                  <td className="border border-pink-200 p-3">
                    <span className="text-lg font-bold text-pink-600">{inst.cutoff.overall}%</span>
                  </td>
                  <td className="border border-pink-200 p-3">
                    <span className="font-semibold text-blue-600">{inst.process.cat}%</span>
                  </td>
                  <td className="border border-pink-200 p-3">
                    <div className="text-sm">
                      {getProcessBreakdown(inst.process).map((item, index) => (
                        <div key={index} className="text-xs">{item}</div>
                      ))}
                    </div>
                  </td>
                  <td className="border border-pink-200 p-3 font-semibold text-gray-800">{inst.fees}</td>
                  <td className="border border-pink-200 p-3">
                    <span className={`px-2 py-1 rounded-full text-xs ${getConfidenceColor(inst.confidence)}`}>
                      {inst.confidence}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Strategic Insights - Side by Side Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
        {/* Left Column - Target Percentiles */}
        <div className="bg-white rounded-xl shadow-lg border border-pink-100 overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col">
          <div className="bg-white p-6 text-center border-b border-pink-200">
            <h2 className="text-2xl font-bold text-pink-700 flex items-center justify-center">
              <Target className="w-6 h-6 mr-3 text-pink-600" />
              Target Percentiles By Institute Type
            </h2>
          </div>
          
          <div className="p-6 space-y-6 flex-1 bg-white">
            {/* Elite Institutes */}
            <div className="border-l-4 border-pink-500 pl-4 bg-white p-4 rounded-r-lg">
              <h3 className="font-bold text-pink-700 text-lg mb-2 flex items-center">
                <span className="bg-pink-100 text-pink-600 p-1.5 rounded-full mr-2">🏆</span>
                Elite Institutes (99%+)
              </h3>
              <ul className="space-y-2 text-gray-800">
                <li className="flex items-start">
                  <span className="text-pink-500 mr-2">•</span>
                  <span><strong>FMS Delhi, JBIMS Mumbai</strong></span>
                </li>
                <li className="flex items-start">
                  <span className="text-pink-500 mr-2">•</span>
                  <span>Highest placement packages (25-30 LPA average)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-pink-500 mr-2">•</span>
                  <span>Strong alumni network in consulting & finance</span>
                </li>
              </ul>
            </div>
            
            {/* Premium Institutes */}
            <div className="bg-white p-4 rounded-lg border border-pink-100">
              <h3 className="font-bold text-pink-700 text-lg mb-2 flex items-center">
                <span className="bg-pink-100 text-pink-600 p-1.5 rounded-full mr-2">🎯</span>
                Premium Institutes (94-98%)
              </h3>
              <ul className="space-y-2 text-gray-800">
                <li className="flex items-start">
                  <span className="text-pink-500 mr-2">•</span>
                  <span><strong>SPJIMR, MDI, IIFT, IIT B-schools</strong></span>
                </li>
                <li className="flex items-start">
                  <span className="text-pink-500 mr-2">•</span>
                  <span>Excellent ROI (15-25 LPA average)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-pink-500 mr-2">•</span>
                  <span>Strong industry connections</span>
                </li>
              </ul>
            </div>
            
            {/* Good Institutes */}
            <div className="bg-white p-4 rounded-lg border border-pink-100">
              <h3 className="font-bold text-pink-700 text-lg mb-2 flex items-center">
                <span className="bg-pink-100 text-pink-600 p-1.5 rounded-full mr-2">📚</span>
                Good Institutes (90-94%)
              </h3>
              <ul className="space-y-2 text-gray-800">
                <li className="flex items-start">
                  <span className="text-pink-500 mr-2">•</span>
                  <span><strong>NITIE, IIT B-schools, New IIMs</strong></span>
                </li>
                <li className="flex items-start">
                  <span className="text-pink-500 mr-2">•</span>
                  <span>Balanced opportunities (10-18 LPA average)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-pink-500 mr-2">•</span>
                  <span>Growing reputation and infrastructure</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Right Column - Application Strategy */}
        <div className="bg-white rounded-xl shadow-lg border border-pink-100 overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col">
          <div className="bg-white p-6 text-center border-b border-pink-200">
            <h2 className="text-2xl font-bold text-pink-700 flex items-center justify-center">
              <Target className="w-6 h-6 mr-3 text-pink-600" />
              Application Strategy
            </h2>
          </div>
          
          <div className="p-6 flex-1 flex flex-col bg-white">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1">
            {/* 99%+ Card */}
            <div className="bg-white rounded-lg border border-pink-100 p-5 hover:shadow-md transition-shadow duration-200 h-full">
              <div className="flex items-center mb-3">
                <div className="bg-pink-100 text-pink-600 p-2 rounded-lg mr-3">
                  <Target className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-gray-800">99%+ Percentile</h3>
              </div>
              <ul className="space-y-2 text-sm text-gray-800">
                <li className="flex items-start">
                  <span className="text-pink-500 mr-2">•</span>
                  <span>Apply to all top 10 B-schools</span>
                </li>
                <li className="flex items-start">
                  <span className="text-pink-500 mr-2">•</span>
                  <span>Focus on IIM A/B/C for consulting/finance</span>
                </li>
                <li className="flex items-start">
                  <span className="text-pink-500 mr-2">•</span>
                  <span>Prepare for WAT-PI with current affairs</span>
                </li>
              </ul>
              </div>
              
              {/* 95-98% Card */}
            <div className="bg-white rounded-lg border border-pink-100 p-5 hover:shadow-md transition-shadow duration-200 h-full">
                <div className="flex items-center mb-3">
                <div className="bg-pink-100 text-pink-600 p-2 rounded-lg mr-3">
                  <Users className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-gray-800">95-98% Percentile</h3>
              </div>
              <ul className="space-y-2 text-sm text-gray-800">
                <li className="flex items-start">
                  <span className="text-pink-500 mr-2">•</span>
                  <span>Target IIMs (L, K, I, S, M)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-pink-500 mr-2">•</span>
                  <span>Apply to all new IIMs</span>
                </li>
                <li className="flex items-start">
                  <span className="text-pink-500 mr-2">•</span>
                  <span>Highlight work experience in SOPs</span>
                </li>
              </ul>
            </div>
            
              {/* 90-94% Card */}
            <div className="bg-white rounded-lg border border-pink-100 p-5 hover:shadow-md transition-shadow duration-200 h-full">
                <div className="flex items-center mb-3">
                  <div className="bg-pink-100 text-pink-600 p-2 rounded-lg mr-3">
                    <FileText className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-gray-800">90-94% Percentile</h3>
                </div>
                <ul className="space-y-2 text-sm text-gray-800">
                  <li className="flex items-start">
                    <span className="text-pink-500 mr-2">•</span>
                    <span>Focus on IITs and new IIMs</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-pink-500 mr-2">•</span>
                    <span>Consider specialized programs</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-pink-500 mr-2">•</span>
                    <span>Emphasize work experience</span>
                  </li>
                </ul>
              </div>
              
              {/* <90% Card */}
              <div className="bg-white rounded-lg border border-pink-100 p-4 hover:shadow-md transition-shadow duration-200 h-full">
                <div className="flex items-center mb-3">
                  <div className="bg-pink-100 text-pink-600 p-2 rounded-lg mr-3">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-gray-800">Below 90%</h3>
                </div>
                <ul className="space-y-2 text-sm text-gray-800">
                  <li className="flex items-start">
                    <span className="text-pink-500 mr-2">•</span>
                    <span>Consider state universities</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-pink-500 mr-2">•</span>
                    <span>Look for work experience</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-pink-500 mr-2">•</span>
                    <span>Prepare for next attempt</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center mt-12">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          Ready to explore your options beyond IIMs?
        </h3>
        <p className="text-gray-600 mb-6">
          Download the complete data and discover the perfect institute for your MBA journey
        </p>
        <button
          onClick={handleDownloadData}
          className="bg-pink-600 text-white px-8 py-3 rounded-lg hover:bg-pink-700 transition-all duration-300 font-semibold text-lg cursor-pointer active:scale-95"
        >
          <Download className="w-5 h-5 inline mr-2" />
          Download Complete Data
        </button>
      </div>
    </div>
  )
}

export default OtherColleges

