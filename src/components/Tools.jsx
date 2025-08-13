import { useState } from 'react'
import { 
  Calculator, 
  TrendingUp, 
  Target, 
  BarChart3, 
  Download,
  FileText,
  ExternalLink
} from 'lucide-react'
import { catPercentileMappings, convertPercentileToMarks } from '../data/comprehensiveData'
import { generateIIMCSV, generateOtherInstitutesCSV, generateJSONData, downloadCSV, downloadJSON } from '../data/exportData'

const Tools = () => {
  const [activeTab, setActiveTab] = useState('predictor')
  const [catScores, setCatScores] = useState({ overall: '', varc: '', dilr: '', qa: '' })
  const [targetPercentile, setTargetPercentile] = useState('')
  const [selectedYear, setSelectedYear] = useState('2024')
  const [results, setResults] = useState(null)

  const handleScoreInput = (section, value) => {
    setCatScores(prev => ({ ...prev, [section]: value }))
  }

  const predictPercentile = () => {
    const overall = parseFloat(catScores.overall)
    if (!overall) return

    const yearData = catPercentileMappings[selectedYear]?.overall || catPercentileMappings['2024'].overall
    
    // Find closest match or interpolate
    let predictedPercentile = null
    let confidence = 'Low'
    
    for (let i = 0; i < yearData.length - 1; i++) {
      if (overall >= yearData[i].marks && overall <= yearData[i + 1].marks) {
        const ratio = (overall - yearData[i].marks) / (yearData[i + 1].marks - yearData[i].marks)
        predictedPercentile = yearData[i].percentile + ratio * (yearData[i + 1].percentile - yearData[i].percentile)
        confidence = yearData[i].confidence
        break
      }
    }

    if (predictedPercentile === null) {
      if (overall < yearData[0].marks) {
        predictedPercentile = Math.max(0, yearData[0].percentile - (yearData[0].marks - overall) * 2)
      } else {
        predictedPercentile = Math.min(100, yearData[yearData.length - 1].percentile + (overall - yearData[yearData.length - 1].marks) * 0.1)
      }
    }

    setResults({
      type: 'percentile',
      overall: predictedPercentile,
      confidence,
      year: selectedYear
    })
  }

  const calculateRequiredMarks = () => {
    const percentile = parseFloat(targetPercentile)
    if (!percentile) return

    const yearData = catPercentileMappings[selectedYear]?.overall || catPercentileMappings['2024'].overall
    
    let requiredMarks = null
    let confidence = 'Low'
    
    for (let i = 0; i < yearData.length - 1; i++) {
      if (percentile >= yearData[i].percentile && percentile <= yearData[i + 1].percentile) {
        const ratio = (percentile - yearData[i].percentile) / (yearData[i + 1].percentile - yearData[i].percentile)
        requiredMarks = yearData[i].marks + ratio * (yearData[i + 1].marks - yearData[i].marks)
        confidence = yearData[i].confidence
        break
      }
    }

    if (requiredMarks === null) {
      if (percentile < yearData[0].percentile) {
        requiredMarks = Math.max(0, yearData[0].marks - (yearData[0].percentile - percentile) / 2)
      } else {
        requiredMarks = yearData[yearData.length - 1].marks + (percentile - yearData[yearData.length - 1].percentile) * 10
      }
    }

    setResults({
      type: 'marks',
      required: Math.round(requiredMarks),
      confidence,
      year: selectedYear
    })
  }

  const handleDownloadData = () => {
    // Download IIM data
    const iimCSV = generateIIMCSV()
    downloadCSV(iimCSV, 'iim_admissions_data.csv')
    
    // Download other institutes data
    const otherCSV = generateOtherInstitutesCSV()
    downloadCSV(otherCSV, 'other_institutes_data.csv')
    
    // Download JSON data
    const jsonData = generateJSONData()
    downloadJSON(jsonData, 'cat_admissions_data.json')
  }

  const tabs = [
    { id: 'predictor', label: 'Percentile Predictor', icon: TrendingUp },
    { id: 'calculator', label: 'Mark Calculator', icon: Calculator },
    { id: 'data', label: 'Data Export', icon: Download },
    { id: 'charts', label: 'Quick Charts', icon: BarChart3 }
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-pink-600 mb-4">
          CAT Analysis Tools
        </h1>
        <p className="text-xl text-gray-600">
          Powerful tools to analyze your CAT performance and plan your MBA journey
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="flex flex-wrap justify-center mb-8">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center px-6 py-3 mx-2 mb-2 rounded-lg transition-all duration-300 cursor-pointer ${
              activeTab === tab.id
                ? 'bg-pink-600 text-white shadow-lg'
                : 'bg-white text-gray-600 hover:bg-pink-50 border border-pink-200'
            }`}
          >
            <tab.icon className="w-5 h-5 mr-2" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="bg-white rounded-xl shadow-lg border border-pink-100 p-8">
        {/* Percentile Predictor Tab */}
        {activeTab === 'predictor' && (
          <div>
            <h2 className="text-2xl font-bold text-pink-600 mb-6 flex items-center">
              <TrendingUp className="w-6 h-6 mr-3" />
              CAT Percentile Predictor
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  CAT Year
                </label>
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  className="w-full p-3 border border-pink-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                >
                  <option value="2024">CAT 2024</option>
                  <option value="2023">CAT 2023</option>
                  <option value="2022">CAT 2022</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Overall CAT Score
                </label>
                <input
                  type="number"
                  value={catScores.overall}
                  onChange={(e) => handleScoreInput('overall', e.target.value)}
                  placeholder="Enter your overall score"
                  className="w-full p-3 border border-pink-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                />
              </div>
            </div>
            <button
              onClick={predictPercentile}
              className="w-full bg-pink-600 text-white py-3 rounded-lg hover:bg-pink-700 transition-colors duration-300 font-semibold cursor-pointer"
            >
              Predict Percentile
            </button>

            {results && results.type === 'percentile' && (
              <div className="mt-6 p-6 bg-pink-50 rounded-lg border border-pink-200">
                <h3 className="text-lg font-semibold text-pink-800 mb-2">Prediction Results</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-pink-600">
                      {results.overall.toFixed(1)}%
                    </div>
                    <div className="text-sm text-gray-600">Predicted Percentile</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-pink-600">
                      {results.year}
                    </div>
                    <div className="text-sm text-gray-600">CAT Year</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-pink-600">
                      {results.confidence}
                    </div>
                    <div className="text-sm text-gray-600">Confidence</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Mark Calculator Tab */}
        {activeTab === 'calculator' && (
          <div>
            <h2 className="text-2xl font-bold text-pink-600 mb-6 flex items-center">
              <Calculator className="w-6 h-6 mr-3" />
              Mark Requirement Calculator
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  CAT Year
                </label>
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  className="w-full p-3 border border-pink-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                >
                  <option value="2024">CAT 2024</option>
                  <option value="2023">CAT 2023</option>
                  <option value="2022">CAT 2022</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Target Percentile
                </label>
                <input
                  type="number"
                  value={targetPercentile}
                  onChange={(e) => setTargetPercentile(e.target.value)}
                  placeholder="Enter target percentile"
                  className="w-full p-3 border border-pink-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                />
              </div>
            </div>
            <button
              onClick={calculateRequiredMarks}
              className="w-full bg-pink-600 text-white py-3 rounded-lg hover:bg-pink-700 transition-colors duration-300 font-semibold cursor-pointer"
            >
              Calculate Required Marks
            </button>

            {results && results.type === 'marks' && (
              <div className="mt-6 p-6 bg-pink-50 rounded-lg border border-pink-200">
                <h3 className="text-lg font-semibold text-pink-800 mb-2">Calculation Results</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-pink-600">
                      {results.required}
                    </div>
                    <div className="text-sm text-gray-600">Required Marks</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-pink-600">
                      {results.year}
                    </div>
                    <div className="text-sm text-gray-600">CAT Year</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-pink-600">
                      {results.confidence}
                    </div>
                    <div className="text-sm text-gray-600">Confidence</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Data Export Tab */}
        {activeTab === 'data' && (
          <div>
            <h2 className="text-2xl font-bold text-pink-600 mb-6 flex items-center">
              <Download className="w-6 h-6 mr-3" />
              Data Export Tools
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="text-center p-6 border border-pink-200 rounded-lg">
                <FileText className="w-12 h-12 text-pink-600 mx-auto mb-4" />
                <h3 className="font-semibold text-gray-800 mb-2">IIM Admissions Data</h3>
                <p className="text-sm text-gray-600 mb-4">Complete cutoff data for all 21 IIMs</p>
                <button
                  onClick={() => {
                    const data = generateIIMCSV()
                    downloadCSV(data, 'iim_admissions_data.csv')
                  }}
                  className="bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700 transition-colors duration-300 cursor-pointer"
                >
                  Download CSV
                </button>
              </div>

              <div className="text-center p-6 border border-pink-200 rounded-lg">
                <FileText className="w-12 h-12 text-pink-600 mx-auto mb-4" />
                <h3 className="font-semibold text-gray-800 mb-2">Other Institutes</h3>
                <p className="text-sm text-gray-600 mb-4">Non-IIM colleges accepting CAT</p>
                <button
                  onClick={() => {
                    const data = generateOtherInstitutesCSV()
                    downloadCSV(data, 'other_institutes_data.csv')
                  }}
                  className="bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700 transition-colors duration-300 cursor-pointer"
                >
                  Download CSV
                </button>
              </div>

              <div className="text-center p-6 border border-pink-200 rounded-lg">
                <FileText className="w-12 h-12 text-pink-600 mx-auto mb-4" />
                <h3 className="font-semibold text-gray-800 mb-2">Complete Dataset</h3>
                <p className="text-sm text-gray-600 mb-4">All data in JSON format</p>
                <button
                  onClick={() => {
                    const data = generateJSONData()
                    downloadJSON(data, 'cat_admissions_data.json')
                  }}
                  className="bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700 transition-colors duration-300 cursor-pointer"
                >
                  Download JSON
                </button>
              </div>
            </div>

            <button
              onClick={handleDownloadData}
              className="w-full bg-pink-600 text-white py-3 rounded-lg hover:bg-pink-700 transition-colors duration-300 font-semibold cursor-pointer"
            >
              Download All Data Files
            </button>
          </div>
        )}

        {/* Quick Charts Tab */}
        {activeTab === 'charts' && (
          <div>
            <h2 className="text-2xl font-bold text-pink-600 mb-6 flex items-center">
              <BarChart3 className="w-6 h-6 mr-3" />
              Quick Reference Charts
            </h2>
            
            {/* Percentile to Marks Chart */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">CAT 2024 Percentile → Marks Mapping</h3>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-pink-200">
                  <thead>
                    <tr className="bg-pink-50">
                      <th className="border border-pink-200 p-3 text-left">Target Percentile</th>
                      <th className="border border-pink-200 p-3 text-left">Overall Marks</th>
                      <th className="border border-pink-200 p-3 text-left">VARC Marks</th>
                      <th className="border border-pink-200 p-3 text-left">DILR Marks</th>
                      <th className="border border-pink-200 p-3 text-left">QA Marks</th>
                      <th className="border border-pink-200 p-3 text-left">Confidence</th>
                    </tr>
                  </thead>
                  <tbody>
                    {catPercentileMappings['2024'].overall.map((item) => (
                      <tr key={item.percentile} className="hover:bg-pink-50">
                        <td className="border border-pink-200 p-3 font-semibold">{item.percentile}%</td>
                        <td className="border border-pink-200 p-3">{item.marks}</td>
                        <td className="border border-pink-200 p-3">
                          {convertPercentileToMarks(item.percentile, 'varc', '2024')}
                        </td>
                        <td className="border border-pink-200 p-3">
                          {convertPercentileToMarks(item.percentile, 'dilr', '2024')}
                        </td>
                        <td className="border border-pink-200 p-3">
                          {convertPercentileToMarks(item.percentile, 'qa', '2024')}
                        </td>
                        <td className="border border-pink-200 p-3">
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            item.confidence === 'High' ? 'bg-pink-100 text-pink-800' :
                            item.confidence === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {item.confidence}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Quick Tips */}
            <div className="bg-pink-50 border border-pink-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-pink-800 mb-3">💡 Quick Tips</h3>
              <ul className="text-pink-700 space-y-2">
                <li>• <strong>90%ile:</strong> Target for most New and Baby IIMs</li>
                <li>• <strong>95%ile:</strong> Safe for most Old IIMs</li>
                <li>• <strong>99%ile:</strong> Competitive for all IIMs</li>
                <li>• <strong>VARC:</strong> Often highest sectional cutoff</li>
                <li>• <strong>Balanced approach:</strong> Don't neglect any section</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Tools 