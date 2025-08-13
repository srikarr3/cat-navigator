import { Link, useNavigate } from 'react-router-dom';
import { BarChart3, Target, BookOpen, Calculator, Users, FileText, Download } from 'lucide-react';
import { iimAdmissionData } from '../data/comprehensiveData';
import { generateIIMCSV, generateOtherInstitutesCSV, generateJSONData, downloadCSV, downloadJSON } from '../data/exportData';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import BackToTop from './common/BackToTop';

const Home = () => {
  const navigate = useNavigate();

  const navigateToCategory = (category) => {
    navigate({
      pathname: '/study-materials',
      search: `?category=${category}`,
      state: { category }
    });
  };
  const handleDownloadData = () => {
    const iimCSV = generateIIMCSV()
    downloadCSV(iimCSV, 'iim_admissions_data.csv')

    const otherCSV = generateOtherInstitutesCSV()
    downloadCSV(otherCSV, 'other_institutes_data.csv')

    const jsonData = generateJSONData()
    downloadJSON(jsonData, 'cat_admissions_data.json')
  }

  const topIIMs = iimAdmissionData
    .filter(iim => iim.cycles['2024'])
    .sort(
      (a, b) =>
        b.cycles['2024'].overallPercentile -
        a.cycles['2024'].overallPercentile
    )
    .slice(0, 5)

  const lowPIWATIIMs = iimAdmissionData
    .filter(iim => iim.cycles['2024']?.process.cat >= 55)
    .slice(0, 3)

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-pink-100 to-pink-50">
      <div className="max-w-7xl mx-auto px-4 py-12">


        {/* Quick Actions */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8 text-pink-600">
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                to: '/marks-vs-percentile',
                icon: BarChart3,
                label: 'Check Percentile',
                onClick: () => navigate('/marks-vs-percentile')
              },
              {
                to: '/iim-cutoffs',
                icon: Target,
                label: 'View Cutoffs',
                onClick: () => navigate('/iim-cutoffs')
              },
              { 
                to: '/tools', 
                icon: Calculator, 
                label: 'Use Tools',
                onClick: () => navigate('/tools')
              },
              {
                to: '/study-materials',
                icon: BookOpen,
                label: 'Study Materials',
                onClick: () => navigateToCategory('all'),
                subItems: [
                  { label: 'Books', category: 'books' },
                  { label: 'Mock Platforms', category: 'mocks' },
                  { label: 'Video & Strategy', category: 'videos' }
                ]
              }
            ].map((item, idx) => (
              <div key={idx} className="relative group">
                <div 
                  onClick={item.onClick}
                  className="cursor-pointer"
                >
                  <Card className="hover:shadow-lg transition-shadow duration-300 h-full">
                    <CardContent className="p-6 flex flex-col items-center justify-center text-center">
                      <item.icon className="w-10 h-10 mb-3 text-pink-600" />
                      <span className="font-bold text-lg text-pink-600">
                        {item.label}
                      </span>
                    </CardContent>
                  </Card>
                </div>
                {item.subItems && (
                  <div className="absolute z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none hidden group-hover:block" onClick={(e) => e.stopPropagation()}>
                    <div className="py-1">
                      {item.subItems.map((subItem, subIdx) => (
                        <button
                          key={subIdx}
                          onClick={() => navigateToCategory(subItem.category)}
                          className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-pink-50 block"
                        >
                          {subItem.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Top IIMs */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8 text-pink-600">
            Top IIMs by Cutoff (2024)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {topIIMs.map((iim, index) => (
              <Card key={iim.name}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-lg font-semibold text-pink-600">
                      #{index + 1}
                    </span>
                    <span className="text-sm text-gray-500">{iim.type}</span>
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-2">
                    {iim.name}
                  </h3>
                  <div className="text-2xl font-bold text-pink-600 mb-1">
                    {iim.cycles['2024'].overallPercentile}%
                  </div>
                  <div className="text-sm text-gray-600">
                    Est. Marks:{' '}
                    {iim.cycles['2024'].estimatedMarks.overall}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Low PI/WAT IIMs */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8 text-pink-600">
            IIMs with High CAT Weightage
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {lowPIWATIIMs.map(iim => (
              <Card key={iim.name}>
                <CardContent className="p-6 text-center">
                  <h3 className="font-semibold text-gray-800 mb-2">
                    {iim.name}
                  </h3>
                  <div className="text-3xl font-bold text-pink-600 mb-1">
                    {iim.cycles['2024'].process.cat}%
                  </div>
                  <div className="text-sm text-gray-600">CAT Weightage</div>
                  <div className="text-xs text-gray-500 mt-1">
                    PI+WAT:{' '}
                    {iim.cycles['2024'].process.pi +
                      iim.cycles['2024'].process.wat}
                    %
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Download Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8 text-pink-600">
            Download Complete Data
          </h2>
          <p className="text-center text-gray-600 max-w-3xl mx-auto mb-8">
            Download comprehensive CAT exam data including IIM cutoffs, admission criteria, and more in CSV or JSON format.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {[
              {
                title: 'IIM Data',
                desc: 'Detailed IIM admission data',
                onClick: () => {
                  const iimCSV = generateIIMCSV()
                  downloadCSV(iimCSV, 'iim_admissions_data.csv')
                },
                icon: <BarChart3 className="w-8 h-8 text-white" />,
                color: 'from-pink-500 to-pink-600'
              },
              {
                title: 'Other Institutes',
                desc: 'Non-IIM institute data',
                onClick: () => {
                  const otherCSV = generateOtherInstitutesCSV()
                  downloadCSV(otherCSV, 'other_institutes_data.csv')
                },
                icon: <Users className="w-8 h-8 text-white" />,
                color: 'from-blue-500 to-blue-600'
              },
              {
                title: 'Complete Dataset',
                desc: 'Structured JSON data',
                onClick: () => {
                  const jsonData = generateJSONData()
                  downloadJSON(jsonData, 'cat_admissions_data.json')
                },
                icon: <FileText className="w-8 h-8 text-white" />,
                color: 'from-purple-500 to-purple-600'
              }
            ].map((item, idx) => (
              <Card 
                key={idx}
                onClick={item.onClick}
                className="hover:shadow-lg transition-shadow duration-300 h-full cursor-pointer"
              >
                <CardContent className="p-6 flex flex-col items-center text-center h-full">
                  <div className={`mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r ${item.color} text-white`}>
                    {item.icon}
                  </div>
                  <h3 className="font-bold text-lg text-pink-600 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {item.desc}
                  </p>
                  <span className="text-sm font-medium text-pink-600 transition-colors hover:text-pink-700 mt-auto">
                    Download Now →
                  </span>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Button
              onClick={handleDownloadData}
              className="group relative overflow-hidden rounded-full bg-gradient-to-r from-pink-600 to-pink-700 px-8 py-6 text-lg font-medium text-white shadow-lg transition-all duration-300 hover:shadow-xl hover:shadow-pink-200"
            >
              <span className="relative z-10 flex items-center">
                <Download className="mr-2 h-5 w-5" />
                Download All Data (CSV + JSON)
              </span>
              <span className="absolute inset-0 -z-0 bg-gradient-to-r from-pink-700 to-pink-800 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </Button>
          </div>
        </section>

        {/* Free Resources */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8 text-pink-600">
            Free Resources
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { 
                title: 'All Resources', 
                description: 'Access all free study materials in one place',
                category: 'all',
                icon: '📚'
              },
              { 
                title: 'Books', 
                description: 'Recommended books and study materials',
                category: 'books',
                icon: '📖'
              },
              { 
                title: 'Mock Tests', 
                description: 'Practice with full-length mock tests',
                category: 'mocks',
                icon: '📝'
              },
              { 
                title: 'Video & Strategy', 
                description: 'Video lectures and preparation strategies',
                category: 'videos',
                icon: '🎥'
              }
            ].map((item, index) => (
              <Card 
                key={index}
                onClick={() => navigateToCategory(item.category)}
                className="hover:shadow-lg transition-shadow duration-300 h-full cursor-pointer"
              >
                <CardContent className="p-6 flex flex-col items-center justify-center text-center h-full">
                  <span className="text-4xl mb-4">{item.icon}</span>
                  <h3 className="font-bold text-lg text-pink-600 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-600">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
      <BackToTop />
    </div>
  );
}

// Export the Home component
export default Home;
