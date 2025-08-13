import { useState } from 'react'
import { 
  Target, 
  TrendingUp, 
  BarChart3, 
  Download,
  ExternalLink,
  Award,
  Lightbulb,
  Users,
  Calendar,
  MapPin
} from 'lucide-react'
import { iimAdmissionData } from '../data/comprehensiveData'
import { generateIIMCSV, downloadCSV } from '../data/exportData'

const LowPIWATIIMs = () => {
  const [sortBy, setSortBy] = useState('catWeight')
  const [selectedType, setSelectedType] = useState('all')

  const iimTypes = ['all', 'Old IIM', 'New IIM', 'Baby IIM']

  const filteredIIMs = iimAdmissionData
    .filter(iim => {
      const hasYearData = iim.cycles['2024']
      const matchesType = selectedType === 'all' || iim.type === selectedType
      return hasYearData && matchesType
    })
    .map(iim => ({
      ...iim,
      catWeight: iim.cycles['2024'].process.cat,
      piWatWeight: iim.cycles['2024'].process.pi + iim.cycles['2024'].process.wat,
      otherWeight: iim.cycles['2024'].process.academics + iim.cycles['2024'].process.workExp
    }))
    .sort((a, b) => {
      if (sortBy === 'catWeight') return b.catWeight - a.catWeight
      if (sortBy === 'piWatWeight') return a.piWatWeight - b.piWatWeight
      if (sortBy === 'name') return a.name.localeCompare(b.name)
      return 0
    })

  // Show all IIMs that match the current filters
  const topCATWeightIIMs = filteredIIMs
    .sort((a, b) => b.catWeight - a.catWeight) // Sort by CAT weight descending
    .slice(0, 10) // Show top 10 by default

  const handleDownloadData = () => {
    const data = generateIIMCSV()
    downloadCSV(data, 'low_pi_wat_iims_data.csv')
  }

  const getTypeColor = (type) => {
    switch (type) {
      case 'Old IIM': return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'New IIM': return 'bg-green-100 text-green-800 border-green-200'
      case 'Baby IIM': return 'bg-purple-100 text-purple-800 border-purple-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getWeightColor = (weight) => {
    if (weight >= 60) return 'bg-green-100 text-green-800 border-green-200'
    if (weight >= 55) return 'bg-blue-100 text-blue-800 border-blue-200'
    if (weight >= 50) return 'bg-yellow-100 text-yellow-800 border-yellow-200'
    return 'bg-gray-100 text-gray-800 border-gray-200'
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-pink-600 mb-4">
          IIMs with Low PI/WAT Weightage
        </h1>
        <p className="text-xl text-gray-600">
          Strategic advantage for candidates with strong CAT scores but limited PI/WAT preparation time
        </p>
      </div>

      {/* Key Insights */}
      <div className="bg-gradient-to-r from-pink-500 to-pink-600 rounded-xl p-8 text-white mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div>
            <div className="text-3xl font-bold mb-2">{topCATWeightIIMs.length}</div>
            <div className="text-pink-100">IIMs with CAT ≥55%</div>
          </div>
          <div>
            <div className="text-3xl font-bold mb-2">
              {Math.round(topCATWeightIIMs.reduce((sum, iim) => sum + iim.catWeight, 0) / topCATWeightIIMs.length)}%
            </div>
            <div className="text-pink-100">Average CAT Weightage</div>
          </div>
          <div>
            <div className="text-3xl font-bold mb-2">
              {Math.round(topCATWeightIIMs.reduce((sum, iim) => sum + iim.piWatWeight, 0) / topCATWeightIIMs.length)}%
            </div>
            <div className="text-pink-100">Average PI+WAT Weightage</div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="bg-white rounded-xl shadow-lg border border-pink-100 p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Sort By */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Sort By
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full p-3 border border-pink-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent cursor-pointer hover:border-pink-300 transition-colors"
            >
              <option value="catWeight">CAT Weightage (High to Low)</option>
              <option value="piWatWeight">PI+WAT Weightage (Low to High)</option>
              <option value="name">Name (A-Z)</option>
            </select>
          </div>

          {/* IIM Type Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              IIM Type
            </label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full p-3 border border-pink-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent cursor-pointer hover:border-pink-300 transition-colors"
            >
              {iimTypes.map(type => (
                <option key={type} value={type}>
                  {type === 'all' ? 'All Types' : type}
                </option>
              ))}
            </select>
          </div>

          {/* Download Button */}
          <div className="flex items-end">
            <button
              onClick={handleDownloadData}
              className="w-full bg-pink-600 text-white px-6 py-3 rounded-lg hover:bg-pink-700 transition-all duration-300 flex items-center justify-center cursor-pointer active:scale-95"
            >
              <Download className="w-4 h-4 mr-2" />
              Download Data
            </button>
          </div>
        </div>
      </div>

      {/* Top CAT Weightage IIMs */}
      <div className="bg-white rounded-xl shadow-lg border border-pink-100 p-6 mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-pink-600 flex items-center">
            <Award className="w-6 h-6 mr-3" />
            {selectedType === 'all' ? 'All IIMs' : `${selectedType} IIMs`} by CAT Weightage
          </h2>
          <span className="text-sm text-gray-500">
            Showing {Math.min(topCATWeightIIMs.length, 10)} of {filteredIIMs.length} IIMs
          </span>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {topCATWeightIIMs.map((iim, index) => (
            <div key={iim.name} className="border border-pink-200 rounded-lg p-6 hover:shadow-lg transition-shadow duration-300">
              {/* Ranking Badge */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-pink-600 text-white rounded-full flex items-center justify-center font-bold text-sm mr-3">
                    #{index + 1}
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getTypeColor(iim.type)}`}>
                    {iim.type}
                  </span>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-pink-600">{iim.catWeight}%</div>
                  <div className="text-xs text-gray-600">CAT Weight</div>
                </div>
              </div>

              {/* IIM Info */}
              <h3 className="font-bold text-gray-800 mb-2">{iim.name}</h3>
              <div className="flex items-center text-sm text-gray-600 mb-3">
                <MapPin className="w-4 h-4 mr-2" />
                {iim.campus}
              </div>

              {/* Weightage Breakdown */}
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span>CAT Score:</span>
                  <span className={`font-semibold px-2 py-1 rounded text-xs ${getWeightColor(iim.catWeight)}`}>
                    {iim.catWeight}%
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>PI + WAT:</span>
                  <span className="font-semibold text-blue-600">{iim.piWatWeight}%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Other Factors:</span>
                  <span className="font-semibold text-gray-600">{iim.otherWeight}%</span>
                </div>
              </div>

              {/* Strategic Advantage */}
              <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                <div className="text-sm text-green-800">
                  <strong>Advantage:</strong> {iim.catWeight >= 60 ? 'High CAT focus' : 'Balanced approach'} with {iim.piWatWeight}% PI+WAT weightage
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Strategic Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Why Choose Low PI/WAT IIMs */}
        <div className="bg-white rounded-xl shadow-lg border border-pink-100 p-6">
          <h2 className="text-2xl font-bold text-pink-600 mb-6 flex items-center">
            <Lightbulb className="w-6 h-6 mr-3" />
            Why Choose Low PI/WAT IIMs?
          </h2>
          
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="w-8 h-8 bg-pink-100 text-pink-600 rounded-full flex items-center justify-center font-bold text-sm mr-3 flex-shrink-0">
                1
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-1">CAT Score Dominance</h3>
                <p className="text-gray-600 text-sm">Your CAT performance carries maximum weight in final selection</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="w-8 h-8 bg-pink-100 text-pink-600 rounded-full flex items-center justify-center font-bold text-sm mr-3 flex-shrink-0">
                2
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-1">Reduced Interview Pressure</h3>
                <p className="text-gray-600 text-sm">Lower weightage on PI/WAT means less stress during final rounds</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="w-8 h-8 bg-pink-100 text-pink-600 rounded-full flex items-center justify-center font-bold text-sm mr-3 flex-shrink-0">
                3
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-1">Strategic Preparation</h3>
                <p className="text-gray-600 text-sm">Focus more on CAT improvement rather than extensive PI/WAT prep</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="w-8 h-8 bg-pink-100 text-pink-600 rounded-full flex items-center justify-center font-bold text-sm mr-3 flex-shrink-0">
                4
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-1">Time Efficiency</h3>
                <p className="text-gray-600 text-sm">Optimize your preparation time allocation</p>
              </div>
            </div>
          </div>
        </div>

        {/* Preparation Strategy */}
        <div className="bg-white rounded-xl shadow-lg border border-pink-100 p-6">
          <h2 className="text-2xl font-bold text-pink-600 mb-6 flex items-center">
            <Target className="w-6 h-6 mr-3" />
            Preparation Strategy
          </h2>
          
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h3 className="font-semibold text-blue-800 mb-2">🎯 Primary Focus (70% time)</h3>
              <ul className="text-blue-700 text-sm space-y-1">
                <li>• CAT score improvement</li>
                <li>• Sectional mastery</li>
                <li>• Mock test analysis</li>
                <li>• Time management</li>
              </ul>
            </div>

            <div className="p-4 bg-pink-50 border border-pink-200 rounded-lg">
              <h3 className="font-semibold text-pink-800 mb-2">📝 Secondary Focus (25% time)</h3>
              <ul className="text-pink-700 text-sm space-y-1">
                <li>• Basic PI preparation</li>
                <li>• WAT practice</li>
                <li>• Current affairs</li>
                <li>• Mock interviews</li>
              </ul>
            </div>

            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <h3 className="font-semibold text-yellow-800 mb-2">⚡ Quick Wins (5% time)</h3>
              <ul className="text-yellow-700 text-sm space-y-1">
                <li>• Resume preparation</li>
                <li>• Document verification</li>
                <li>• Travel arrangements</li>
                <li>• Mental preparation</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Complete Weightage Table */}
      <div className="bg-white rounded-xl shadow-lg border border-pink-100 p-6 mb-8">
        <h2 className="text-2xl font-bold text-pink-600 mb-6 flex items-center">
          <BarChart3 className="w-6 h-6 mr-3" />
          Complete Weightage Analysis
        </h2>
        
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-pink-50">
                <th className="border border-pink-200 p-3 text-left text-sm font-medium text-pink-800">Rank</th>
                <th className="border border-pink-200 p-3 text-left text-sm font-medium text-pink-800">IIM</th>
                <th className="border border-pink-200 p-3 text-left text-sm font-medium text-pink-800">Type</th>
                <th className="border border-pink-200 p-3 text-left text-sm font-medium text-pink-800">CAT Weight</th>
                <th className="border border-pink-200 p-3 text-left text-sm font-medium text-pink-800">PI+WAT Weight</th>
                <th className="border border-pink-200 p-3 text-left text-sm font-medium text-pink-800">Other Weight</th>
                <th className="border border-pink-200 p-3 text-left text-sm font-medium text-pink-800">Strategy</th>
              </tr>
            </thead>
            <tbody>
              {filteredIIMs.map((iim, index) => (
                <tr key={iim.name} className="hover:bg-pink-50">
                  <td className="border border-pink-200 p-3 font-semibold text-gray-800">#{index + 1}</td>
                  <td className="border border-pink-200 p-3">
                    <div className="font-semibold text-gray-800">{iim.name}</div>
                    <div className="text-xs text-gray-600">{iim.campus}</div>
                  </td>
                  <td className="border border-pink-200 p-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getTypeColor(iim.type)}`}>
                      {iim.type}
                    </span>
                  </td>
                  <td className="border border-pink-200 p-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getWeightColor(iim.catWeight)}`}>
                      {iim.catWeight}%
                    </span>
                  </td>
                  <td className="border border-pink-200 p-3 text-gray-800">{iim.piWatWeight}%</td>
                  <td className="border border-pink-200 p-3 text-gray-800">{iim.otherWeight}%</td>
                  <td className="border border-pink-200 p-3">
                    <div className="text-xs">
                      {iim.catWeight >= 60 ? (
                        <span className="text-green-600 font-medium">High CAT focus</span>
                      ) : iim.catWeight >= 55 ? (
                        <span className="text-blue-600 font-medium">Balanced approach</span>
                      ) : (
                        <span className="text-yellow-600 font-medium">Standard weightage</span>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Success Stories & Tips */}
      <div className="bg-white rounded-2xl shadow-lg border border-pink-100 p-8 mb-8">
        <h2 className="text-2xl font-bold text-pink-600 mb-6 flex items-center">
          <Lightbulb className="w-6 h-6 mr-2" />
          Success Tips
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 hover:bg-pink-50 rounded-lg transition-colors duration-200">
            <h3 className="font-semibold text-lg text-pink-700 mb-3 flex items-center">
              <span className="w-6 h-6 bg-pink-100 text-pink-600 rounded-full flex items-center justify-center text-sm mr-2">🎯</span>
              For 95+ Percentile
            </h3>
            <ul className="text-gray-700 space-y-2 text-sm pl-2">
              <li className="flex items-start">
                <span className="text-pink-500 mr-2">•</span>
                <span>Focus on CAT score improvement</span>
              </li>
              <li className="flex items-start">
                <span className="text-pink-500 mr-2">•</span>
                <span>Basic PI/WAT preparation sufficient</span>
              </li>
              <li className="flex items-start">
                <span className="text-pink-500 mr-2">•</span>
                <span>Target IIMs with 55%+ CAT weightage</span>
              </li>
              <li className="flex items-start">
                <span className="text-pink-500 mr-2">•</span>
                <span>Strong academic background helps</span>
              </li>
            </ul>
          </div>
          <div className="p-4 hover:bg-pink-50 rounded-lg transition-colors duration-200">
            <h3 className="font-semibold text-lg text-pink-700 mb-3 flex items-center">
              <span className="w-6 h-6 bg-pink-100 text-pink-600 rounded-full flex items-center justify-center text-sm mr-2">🚀</span>
              For 90-95 Percentile
            </h3>
            <ul className="text-gray-700 space-y-2 text-sm pl-2">
              <li className="flex items-start">
                <span className="text-pink-500 mr-2">•</span>
                <span>Balance CAT and PI/WAT prep</span>
              </li>
              <li className="flex items-start">
                <span className="text-pink-500 mr-2">•</span>
                <span>Target New and Baby IIMs</span>
              </li>
              <li className="flex items-start">
                <span className="text-pink-500 mr-2">•</span>
                <span>Work on interview skills</span>
              </li>
              <li className="flex items-start">
                <span className="text-pink-500 mr-2">•</span>
                <span>Highlight work experience</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          Ready to optimize your IIM preparation strategy?
        </h3>
        <p className="text-gray-600 mb-6">
          Download the complete data and start planning your MBA journey with data-driven insights
        </p>
        <button
          onClick={handleDownloadData}
          className="bg-pink-600 hover:bg-pink-700 text-white px-8 py-3 rounded-lg transition-all duration-300 font-semibold text-lg cursor-pointer active:scale-95 inline-flex items-center"
        >
          <Download className="w-5 h-5 mr-2" />
          Download Complete Data
        </button>
      </div>
    </div>
  )
}

export default LowPIWATIIMs

