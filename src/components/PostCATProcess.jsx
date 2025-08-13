import { useState } from 'react'
import { 
  Search, 
  Filter, 
  Download, 
  ExternalLink, 
  Calendar,
  Target,
  BarChart3,
  Users,
  FileText,
  TrendingUp,
  Clock,
  Award
} from 'lucide-react'
import { iimAdmissionData } from '../data/comprehensiveData'
import { generateIIMCSV, downloadCSV } from '../data/exportData'

const PostCATProcess = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedType, setSelectedType] = useState('all')
  const [selectedYear, setSelectedYear] = useState('2024')
  const [sortBy, setSortBy] = useState('catWeight')
  const [isDownloading, setIsDownloading] = useState(false)

  const iimTypes = ['all', 'Old IIM', 'New IIM', 'Baby IIM']

  const filteredIIMs = iimAdmissionData
    .filter(iim => {
      const matchesSearch = iim.name.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesType = selectedType === 'all' || iim.type === selectedType
      const hasYearData = iim.cycles[selectedYear]
      return matchesSearch && matchesType && hasYearData
    })
    .map(iim => ({
      ...iim,
      yearData: iim.cycles[selectedYear],
      catWeight: iim.cycles[selectedYear].process.cat,
      piWatWeight: iim.cycles[selectedYear].process.pi + iim.cycles[selectedYear].process.wat,
      otherWeight: iim.cycles[selectedYear].process.academics + iim.cycles[selectedYear].process.workExp
    }))
    .sort((a, b) => {
      if (sortBy === 'catWeight') return b.catWeight - a.catWeight
      if (sortBy === 'piWatWeight') return a.piWatWeight - b.piWatWeight
      if (sortBy === 'name') return a.name.localeCompare(b.name)
      return 0
    })

  const handleDownloadData = async () => {
    setIsDownloading(true)
    try {
      const data = generateIIMCSV()
      downloadCSV(data, `post_cat_process_${selectedYear}.csv`)
    } catch (error) {
      console.error('Error generating download:', error)
    } finally {
      setTimeout(() => setIsDownloading(false), 1000) // Reset after a short delay
    }
  }

  const getTypeColor = (type) => {
    switch (type) {
      case 'Old IIM': return 'bg-pink-100 text-pink-800 border-pink-200'
      case 'New IIM': return 'bg-green-100 text-green-800 border-green-200'
      case 'Baby IIM': return 'bg-purple-100 text-purple-800 border-purple-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getWeightColor = (weight) => {
    if (weight >= 60) return 'bg-green-100 text-green-800 border-green-200'
    if (weight >= 50) return 'bg-pink-100 text-pink-800 border-pink-200'
    if (weight >= 40) return 'bg-yellow-100 text-yellow-800 border-yellow-200'
    return 'bg-gray-100 text-gray-800 border-gray-200'
  }

  const getProcessStage = (iim) => {
    const stages = []
    if (iim.yearData.process.cat > 0) stages.push('CAT')
    if (iim.yearData.process.pi > 0) stages.push('PI')
    if (iim.yearData.process.wat > 0) stages.push('WAT')
    if (iim.yearData.process.academics > 0) stages.push('Academics')
    if (iim.yearData.process.workExp > 0) stages.push('Work Experience')
    return stages
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-pink-600 mb-4">
          Post-CAT Process Guides
        </h1>
        <p className="text-xl text-gray-600">
          Complete selection process details, weightages, and timelines for all IIMs
        </p>
      </div>

      {/* Process Overview */}
      <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden mb-12">
        <div className="bg-white px-6 py-5 border-b border-gray-100">
          <h2 className="text-2xl font-bold text-pink-600 text-center flex items-center justify-center">
            <FileText className="w-5 h-5 mr-2 text-pink-600" />
            Selection Process Overview
          </h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { 
                number: '01',
                title: 'CAT Score', 
                description: 'Initial screening',
                icon: <BarChart3 className="w-6 h-6 text-pink-600" />
              },
              { 
                number: '02',
                title: 'Shortlisting', 
                description: 'Based on cutoffs',
                icon: <Filter className="w-6 h-6 text-pink-600" />
              },
              { 
                number: '03',
                title: 'PI/WAT', 
                description: 'Personal interview',
                icon: <Users className="w-6 h-6 text-pink-600" />
              },
              { 
                number: '04',
                title: 'Final Selection', 
                description: 'Weighted score',
                icon: <Award className="w-6 h-6 text-pink-600" />
              }
            ].map((step, index) => (
              <div key={index} className="flex items-start space-x-4 p-5 hover:bg-pink-50 rounded-lg transition-colors border border-gray-100">
                <div className="relative">
                  <span className="absolute -top-3 -left-2 bg-pink-600 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                    {step.number}
                  </span>
                  <div className="w-12 h-12 rounded-full bg-pink-100 flex items-center justify-center">
                    {step.icon}
                  </div>
                </div>
                <div className="text-left pt-1">
                  <h3 className="font-semibold text-gray-900 text-lg">{step.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
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
              placeholder="Search IIMs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-pink-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            />
          </div>

          {/* IIM Type Filter */}
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="px-4 py-2 border border-pink-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
          >
            {iimTypes.map(type => (
              <option key={type} value={type}>
                {type === 'all' ? 'All Types' : type}
              </option>
            ))}
          </select>

          {/* Year Filter - Only 2024 available */}
          <div className="relative">
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              disabled
              className="px-4 py-2 border border-pink-200 rounded-lg bg-gray-50 text-gray-600 cursor-not-allowed w-full"
            >
              <option value="2024">CAT 2024</option>
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
              </svg>
            </div>
          </div>

          {/* Sort By */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 border border-pink-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
          >
            <option value="catWeight">Sort by CAT Weight</option>
            <option value="piWatWeight">Sort by PI+WAT Weight</option>
            <option value="name">Sort by Name</option>
          </select>
        </div>

        {/* Download Button */}
        <div className="mt-4 text-center">
          <button
            onClick={handleDownloadData}
            disabled={isDownloading}
            className={`bg-pink-600 text-white px-6 py-2 rounded-lg hover:bg-pink-700 transition-all duration-300 flex items-center mx-auto cursor-pointer active:scale-95 ${isDownloading ? 'opacity-75' : ''}`}
          >
            {isDownloading ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Preparing...
              </>
            ) : (
              <>
                <Download className="w-4 h-4 mr-2" />
                Download Process Data
              </>
            )}
          </button>
        </div>
      </div>

      {/* IIM Process Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
        {filteredIIMs.map((iim) => (
          <div key={iim.name} className="bg-white rounded-xl shadow-lg border border-pink-100 overflow-hidden hover:shadow-xl transition-shadow duration-300">
            {/* Header */}
            <div className="p-6 border-b border-pink-100">
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-xl font-bold text-gray-800">{iim.name}</h3>
                <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getTypeColor(iim.type)}`}>
                  {iim.type}
                </span>
              </div>
              
              <div className="text-sm text-gray-600 mb-2">
                <strong>Cutoff:</strong> {iim.yearData.overallPercentile}% (CAT {selectedYear})
              </div>
            </div>

            {/* Weightage Breakdown */}
            <div className="p-6">
              <h4 className="font-semibold text-gray-800 mb-4">Selection Weightage</h4>
              
              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">CAT Score</span>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getWeightColor(iim.catWeight)}`}>
                    {iim.catWeight}%
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">PI + WAT</span>
                  <span className="px-3 py-1 rounded-full text-sm font-medium bg-pink-100 text-pink-800 border border-pink-200">
                    {iim.piWatWeight}%
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Academics</span>
                  <span className="px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800 border border-green-200">
                    {iim.yearData.process.academics}%
                  </span>
                </div>
                
                {iim.yearData.process.workExp > 0 && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Work Experience</span>
                    <span className="px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800 border border-purple-200">
                      {iim.yearData.process.workExp}%
                    </span>
                  </div>
                )}
              </div>

              {/* Process Stages */}
              <div className="mb-4">
                <h4 className="font-semibold text-gray-800 mb-2">Selection Stages</h4>
                <div className="flex flex-wrap gap-2">
                  {getProcessStage(iim).map((stage, index) => (
                    <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                      {stage}
                    </span>
                  ))}
                </div>
              </div>

              {/* Strategic Insight */}
              <div className="p-3 bg-pink-50 border border-pink-200 rounded-lg">
                <div className="text-sm text-pink-800">
                  <strong>Strategy:</strong> {iim.catWeight >= 60 ? 'High CAT focus' : iim.catWeight >= 50 ? 'Balanced approach' : 'Strong PI/WAT needed'}
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-pink-100">
                <div className="text-xs text-gray-500">
                  Confidence: {iim.yearData.confidence}%
                </div>
                <a
                  href={iim.yearData.source}
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

      {/* Process Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Weightage Distribution */}
        <div className="bg-white rounded-xl shadow-lg border border-pink-100 p-6">
          <h2 className="text-2xl font-bold text-pink-600 mb-6 flex items-center">
            <BarChart3 className="w-6 h-6 mr-3" />
            Weightage Distribution Analysis
          </h2>
          
          <div className="space-y-4">
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <h3 className="font-semibold text-green-800 mb-2">🏆 High CAT Weightage (55%+)</h3>
              <div className="text-sm text-green-700">
                <div>• {filteredIIMs.filter(iim => iim.catWeight >= 55).length} IIMs</div>
                <div>• Ideal for strong CAT performers</div>
                <div>• Less PI/WAT pressure</div>
                <div>• Examples: IIM Kozhikode, IIM Indore, IIM Rohtak</div>
              </div>
            </div>

            <div className="p-4 bg-pink-50 border border-pink-200 rounded-lg">
              <h3 className="font-semibold text-pink-800 mb-2">⚖️ Balanced Weightage (50-55%)</h3>
              <div className="text-sm text-pink-700">
                <div>• {filteredIIMs.filter(iim => iim.catWeight >= 50 && iim.catWeight < 55).length} IIMs</div>
                <div>• Equal focus on CAT and PI/WAT</div>
                <div>• Well-rounded preparation needed</div>
                <div>• Examples: IIM Ahmedabad, IIM Bangalore, IIM Calcutta</div>
              </div>
            </div>

            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <h3 className="font-semibold text-yellow-800 mb-2">📝 PI/WAT Focused (&lt;50%)</h3>
              <div className="text-sm text-yellow-700">
                <div>• {filteredIIMs.filter(iim => iim.catWeight < 50).length} IIMs</div>
                <div>• Strong interview skills required</div>
                <div>• CAT score is qualifying only</div>
                <div>• Examples: Some specialized programs</div>
              </div>
            </div>
          </div>
        </div>

        {/* Timeline & Preparation */}
        <div className="bg-white rounded-xl shadow-lg border border-pink-100 p-6">
          <h2 className="text-2xl font-bold text-pink-600 mb-6 flex items-center">
            <Calendar className="w-6 h-6 mr-3" />
            Timeline & Preparation Guide
          </h2>
          
          <div className="space-y-4">
            <div className="p-4 bg-pink-50 border border-pink-200 rounded-lg">
              <h3 className="font-semibold text-pink-800 mb-2">📅 Typical Timeline (CAT 2024)</h3>
              <div className="text-sm text-pink-700 space-y-1">
                <div>• <strong>December:</strong> CAT result declaration</div>
                <div>• <strong>January:</strong> IIM shortlisting</div>
                <div>• <strong>February-March:</strong> PI/WAT rounds</div>
                <div>• <strong>April-May:</strong> Final selection</div>
                <div>• <strong>June:</strong> Program commencement</div>
              </div>
            </div>

            <div className="p-4 bg-pink-50 border border-pink-200 rounded-lg">
              <h3 className="font-semibold text-pink-800 mb-2">🎯 Preparation Strategy</h3>
              <div className="text-sm text-pink-700 space-y-1">
                <div>• <strong>CAT-focused IIMs:</strong> 70% CAT prep, 30% PI/WAT</div>
                <div>• <strong>Balanced IIMs:</strong> 50% CAT prep, 50% PI/WAT</div>
                <div>• <strong>PI/WAT-focused:</strong> 30% CAT prep, 70% PI/WAT</div>
              </div>
            </div>

            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <h3 className="font-semibold text-green-800 mb-2">💡 Key Success Factors</h3>
              <div className="text-sm text-green-700 space-y-1">
                <div>• Strong CAT percentile (90%+)</div>
                <div>• Consistent academic performance</div>
                <div>• Relevant work experience</div>
                <div>• Good communication skills</div>
                <div>• Current affairs knowledge</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Reference Table */}
      <div className="bg-white rounded-xl shadow-lg border border-pink-100 p-6 mb-8">
        <h2 className="text-2xl font-bold text-pink-600 mb-6 flex items-center">
          <FileText className="w-6 h-6 mr-3" />
          Quick Reference: Process Summary
        </h2>
        
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-pink-50">
                <th className="border border-pink-200 p-3 text-left text-sm font-medium text-pink-800">IIM</th>
                <th className="border border-pink-200 p-3 text-left text-sm font-medium text-pink-800">Type</th>
                <th className="border border-pink-200 p-3 text-left text-sm font-medium text-pink-800">CAT Weight</th>
                <th className="border border-pink-200 p-3 text-left text-sm font-medium text-pink-800">PI+WAT Weight</th>
                <th className="border border-pink-200 p-3 text-left text-sm font-medium text-pink-800">Other Weight</th>
                <th className="border border-pink-200 p-3 text-left text-sm font-medium text-pink-800">Strategy</th>
              </tr>
            </thead>
            <tbody>
              {filteredIIMs.map((iim) => (
                <tr key={iim.name} className="hover:bg-pink-50">
                  <td className="border border-pink-200 p-3">
                    <div className="font-semibold text-gray-800">{iim.name}</div>
                    <div className="text-xs text-gray-600">Cutoff: {iim.yearData.overallPercentile}%</div>
                  </td>
                  <td className="border border-pink-200 p-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getTypeColor(iim.type)}`}>
                      {iim.type}
                    </span>
                  </td>
                  <td className="border border-pink-200 p-3">
                    <span className={`px-2 py-1 rounded-full text-sm font-medium border ${getWeightColor(iim.catWeight)}`}>
                      {iim.catWeight}%
                    </span>
                  </td>
                  <td className="border border-pink-200 p-3 text-gray-800">{iim.piWatWeight}%</td>
                  <td className="border border-pink-200 p-3 text-gray-800">{iim.otherWeight}%</td>
                  <td className="border border-pink-200 p-3">
                    <div className="text-xs">
                      {iim.catWeight >= 60 ? (
                        <span className="text-green-600 font-medium">High CAT focus</span>
                      ) : iim.catWeight >= 50 ? (
                        <span className="text-pink-600 font-medium">Balanced approach</span>
                      ) : (
                        <span className="text-yellow-600 font-medium">PI/WAT focused</span>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          Ready to plan your post-CAT strategy?
        </h3>
        <p className="text-gray-600 mb-6">
          Download the complete process data and optimize your preparation approach
        </p>
        <button
          onClick={handleDownloadData}
          className="bg-pink-600 text-white px-8 py-3 rounded-lg hover:bg-pink-700 transition-colors duration-300 font-semibold text-lg"
        >
          <Download className="w-5 h-5 inline mr-2" />
          Download Process Data
        </button>
      </div>
    </div>
  )
}

export default PostCATProcess

