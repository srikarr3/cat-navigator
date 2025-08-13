import { useState } from 'react'
import { 
  Search, 
  Filter, 
  Download, 
  ExternalLink, 
  TrendingUp,
  MapPin,
  Calendar,
  Target,
  BarChart3
} from 'lucide-react'
import { iimAdmissionData } from '../data/comprehensiveData'
import { generateIIMCSV, downloadCSV } from '../data/exportData'

const IIMCutoffs = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedType, setSelectedType] = useState('all')
  const [selectedYear, setSelectedYear] = useState('2024')
  const [sortBy, setSortBy] = useState('cutoff')

  const iimTypes = ['all', 'Old IIM', 'New IIM', 'Baby IIM']
  const availableYears = ['2024', '2023', '2022']

  const filteredIIMs = iimAdmissionData
    .filter(iim => {
      const matchesSearch = iim.name.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesType = selectedType === 'all' || iim.type === selectedType
      const hasYearData = iim.cycles[selectedYear]
      return matchesSearch && matchesType && hasYearData
    })
    .sort((a, b) => {
      if (sortBy === 'cutoff') {
        return b.cycles[selectedYear].overallPercentile - a.cycles[selectedYear].overallPercentile
      } else if (sortBy === 'name') {
        return a.name.localeCompare(b.name)
      } else if (sortBy === 'established') {
        return a.established - b.established
      }
      return 0
    })

  const handleDownloadData = () => {
    const data = generateIIMCSV()
    downloadCSV(data, `iim_cutoffs_${selectedYear}.csv`)
  }

  const getTypeColor = (type) => {
    switch (type) {
      case 'Old IIM': return 'bg-pink-100 text-pink-800 border-pink-200'
      case 'New IIM': return 'bg-pink-50 text-pink-700 border-pink-200'
      case 'Baby IIM': return 'bg-pink-100 text-pink-800 border-pink-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getConfidenceColor = (score) => {
    if (score >= 90) return 'bg-pink-100 text-pink-800'
    if (score >= 70) return 'bg-pink-50 text-pink-700'
    return 'bg-gray-100 text-gray-800'
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-pink-600 mb-4">
          IIM-Wise Cutoff Data
        </h1>
        <p className="text-xl text-gray-600">
          Complete cutoff information for all 21 IIMs with sectional breakdowns and admission processes
        </p>
      </div>

      {/* Filters and Controls */}
      <div className="bg-white rounded-xl shadow-lg border border-pink-100 p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
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

          {/* Year Filter */}
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="px-4 py-2 border border-pink-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
          >
            {availableYears.map(year => (
              <option key={year} value={year}>CAT {year}</option>
            ))}
          </select>

          {/* Sort By */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 border border-pink-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
          >
            <option value="cutoff">Sort by Cutoff</option>
            <option value="name">Sort by Name</option>
            <option value="established">Sort by Established</option>
          </select>

          {/* Download Button */}
          <button
            onClick={handleDownloadData}
            className="bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700 transition-colors duration-300 flex items-center justify-center"
          >
            <Download className="w-4 h-4 mr-2" />
            Download
          </button>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 shadow-lg border border-pink-100 text-center">
          <div className="text-3xl font-bold text-pink-600 mb-2">{filteredIIMs.length}</div>
          <div className="text-gray-600">IIMs Found</div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-lg border border-pink-100 text-center">
          <div className="text-3xl font-bold text-pink-600 mb-2">
            {filteredIIMs.filter(iim => iim.type === 'Old IIM').length}
          </div>
          <div className="text-gray-600">Old IIMs</div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-lg border border-pink-100 text-center">
          <div className="text-3xl font-bold text-pink-600 mb-2">
            {filteredIIMs.filter(iim => iim.type === 'New IIM').length}
          </div>
          <div className="text-gray-600">New IIMs</div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-lg border border-pink-100 text-center">
          <div className="text-3xl font-bold text-pink-600 mb-2">
            {filteredIIMs.filter(iim => iim.type === 'Baby IIM').length}
          </div>
          <div className="text-gray-600">Baby IIMs</div>
        </div>
      </div>

      {/* IIM Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredIIMs.map((iim) => {
          const yearData = iim.cycles[selectedYear]
          if (!yearData) return null

          return (
            <div key={iim.name} className="bg-white rounded-xl shadow-lg border border-pink-100 overflow-hidden hover:shadow-xl transition-shadow duration-300">
              {/* Header */}
              <div className="p-6 border-b border-pink-100">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-xl font-bold text-gray-800">{iim.name}</h3>
                  <div className="flex flex-col items-end space-y-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getTypeColor(iim.type)}`}>
                      {iim.type}
                    </span>
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-pink-600 text-white">
                      NIRF #{iim.nirfRanking}
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center text-sm text-gray-600 mb-2">
                  <MapPin className="w-4 h-4 mr-2" />
                  {iim.campus}
                </div>
                
                <div className="flex items-center text-sm text-gray-600">
                  <Calendar className="w-4 h-4 mr-2" />
                  Est. {iim.established}
                </div>
              </div>

              {/* Cutoff Data */}
              <div className="p-6">
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-600">Overall Cutoff</span>
                    <span className="text-sm text-gray-500">CAT {selectedYear}</span>
                  </div>
                  <div className="text-3xl font-bold text-pink-600">
                    {yearData.overallPercentile}%
                  </div>
                  <div className="text-sm text-gray-600">
                    Est. Marks: {yearData.estimatedMarks.overall}
                  </div>
                </div>

                {/* Sectional Cutoffs */}
                <div className="grid grid-cols-3 gap-3 mb-4">
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-xs text-gray-600 mb-1">VARC</div>
                    <div className="font-semibold text-gray-800">{yearData.sectional.varc}%</div>
                    <div className="text-xs text-gray-500">{yearData.estimatedMarks.varc}</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-xs text-gray-600 mb-1">DILR</div>
                    <div className="font-semibold text-gray-800">{yearData.sectional.dilr}%</div>
                    <div className="text-xs text-gray-500">{yearData.estimatedMarks.dilr}</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-xs text-gray-600 mb-1">QA</div>
                    <div className="font-semibold text-gray-800">{yearData.sectional.qa}%</div>
                    <div className="text-xs text-gray-500">{yearData.estimatedMarks.qa}</div>
                  </div>
                </div>

                {/* Weightage Breakdown */}
                <div className="mb-4">
                  <div className="text-sm font-medium text-gray-600 mb-2">Selection Weightage</div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>CAT Score</span>
                      <span className="font-semibold text-pink-600">{yearData.process.cat}%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>PI + WAT</span>
                      <span className="font-semibold text-pink-600">
                        {yearData.process.pi + yearData.process.wat}%
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Academics</span>
                      <span className="font-semibold text-pink-600">{yearData.process.academics}%</span>
                    </div>
                    {yearData.process.workExp > 0 && (
                      <div className="flex justify-between text-sm">
                        <span>Work Experience</span>
                        <span className="font-semibold text-pink-600">{yearData.process.workExp}%</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-pink-100">
                  <div className="flex items-center">
                    <span className={`px-2 py-1 rounded-full text-xs ${getConfidenceColor(yearData.confidence)}`}>
                      {yearData.confidence}% Confidence
                    </span>
                  </div>
                  <a
                    href={yearData.source}
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
          )
        })}
      </div>

      {/* No Results Message */}
      {filteredIIMs.length === 0 && (
        <div className="text-center py-12">
          <Target className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-600 mb-2">No IIMs Found</h3>
          <p className="text-gray-500">Try adjusting your search criteria or filters</p>
        </div>
      )}

      {/* Data Source Info */}
      <div className="mt-12 bg-pink-50 border border-pink-200 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-pink-800 mb-3">📊 Data Source & Methodology</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-pink-700">
          <div>
            <h4 className="font-semibold mb-2">Primary Sources:</h4>
            <ul className="text-sm space-y-1">
              <li>• Official IIM websites</li>
              <li>• Admission policy documents</li>
              <li>• Prospectus PDFs</li>
              <li>• Admission committee announcements</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Data Quality:</h4>
            <ul className="text-sm space-y-1">
              <li>• Confidence scores: 70-95%</li>
              <li>• Last updated: December 2024</li>
              <li>• Covers 2022-2025 cycles</li>
              <li>• All 21 IIMs included</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default IIMCutoffs

