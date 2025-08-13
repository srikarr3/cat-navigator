// Sample CAT score vs percentile data based on research
export const catScoreData = {
  2024: {
    overall: [
      { marks: 30, percentile: 70 },
      { marks: 35, percentile: 75 },
      { marks: 40, percentile: 80 },
      { marks: 45, percentile: 85 },
      { marks: 50, percentile: 88 },
      { marks: 55, percentile: 91 },
      { marks: 60, percentile: 93 },
      { marks: 65, percentile: 95 },
      { marks: 70, percentile: 97 },
      { marks: 75, percentile: 98 },
      { marks: 80, percentile: 99 },
      { marks: 85, percentile: 99.5 },
      { marks: 90, percentile: 99.8 },
      { marks: 95, percentile: 99.9 }
    ],
    varc: [
      { marks: 10, percentile: 70 },
      { marks: 12, percentile: 75 },
      { marks: 14, percentile: 80 },
      { marks: 16, percentile: 85 },
      { marks: 18, percentile: 90 },
      { marks: 20, percentile: 93 },
      { marks: 22, percentile: 95 },
      { marks: 24, percentile: 97 },
      { marks: 26, percentile: 98 },
      { marks: 28, percentile: 99 }
    ],
    dilr: [
      { marks: 8, percentile: 70 },
      { marks: 10, percentile: 75 },
      { marks: 12, percentile: 80 },
      { marks: 14, percentile: 85 },
      { marks: 16, percentile: 90 },
      { marks: 18, percentile: 93 },
      { marks: 20, percentile: 95 },
      { marks: 22, percentile: 97 },
      { marks: 24, percentile: 98 },
      { marks: 26, percentile: 99 }
    ],
    qa: [
      { marks: 12, percentile: 70 },
      { marks: 14, percentile: 75 },
      { marks: 16, percentile: 80 },
      { marks: 18, percentile: 85 },
      { marks: 20, percentile: 90 },
      { marks: 22, percentile: 93 },
      { marks: 24, percentile: 95 },
      { marks: 26, percentile: 97 },
      { marks: 28, percentile: 98 },
      { marks: 30, percentile: 99 }
    ]
  },
  2023: {
    overall: [
      { marks: 32, percentile: 70 },
      { marks: 37, percentile: 75 },
      { marks: 42, percentile: 80 },
      { marks: 47, percentile: 85 },
      { marks: 52, percentile: 88 },
      { marks: 57, percentile: 91 },
      { marks: 62, percentile: 93 },
      { marks: 67, percentile: 95 },
      { marks: 72, percentile: 97 },
      { marks: 76, percentile: 99 },
      { marks: 82, percentile: 99.5 },
      { marks: 87, percentile: 99.8 },
      { marks: 92, percentile: 99.9 }
    ]
  }
}

// IIM cutoff data
export const iimCutoffs = [
  {
    name: "IIM Ahmedabad",
    type: "Old IIM",
    overall: { general: 80, obc: 75, sc: 70, st: 65 },
    sectional: {
      varc: { general: 70, obc: 65, sc: 60, st: 55 },
      dilr: { general: 70, obc: 65, sc: 60, st: 55 },
      qa: { general: 70, obc: 65, sc: 60, st: 55 }
    },
    admissionPolicy: "https://www.iima.ac.in/admissions"
  },
  {
    name: "IIM Bangalore",
    type: "Old IIM",
    overall: { general: 85, obc: 75, sc: 70, st: 65 },
    sectional: {
      varc: { general: 80, obc: 70, sc: 65, st: 60 },
      dilr: { general: 80, obc: 70, sc: 65, st: 60 },
      qa: { general: 80, obc: 70, sc: 65, st: 60 }
    },
    admissionPolicy: "https://www.iimb.ac.in/admissions"
  },
  {
    name: "IIM Calcutta",
    type: "Old IIM",
    overall: { general: 85, obc: 75, sc: 70, st: 65 },
    sectional: {
      varc: { general: 80, obc: 70, sc: 65, st: 60 },
      dilr: { general: 80, obc: 70, sc: 65, st: 60 },
      qa: { general: 80, obc: 70, sc: 65, st: 60 }
    },
    admissionPolicy: "https://www.iimcal.ac.in/admissions"
  },
  {
    name: "IIM Lucknow",
    type: "Old IIM",
    overall: { general: 90, obc: 82, sc: 70, st: 65 },
    sectional: {
      varc: { general: 85, obc: 75, sc: 65, st: 60 },
      dilr: { general: 85, obc: 75, sc: 65, st: 60 },
      qa: { general: 85, obc: 75, sc: 65, st: 60 }
    },
    admissionPolicy: "https://www.iiml.ac.in/admissions"
  },
  {
    name: "IIM Kozhikode",
    type: "Old IIM",
    overall: { general: 90, obc: 81, sc: 70, st: 65 },
    sectional: {
      varc: { general: 80, obc: 72, sc: 65, st: 60 },
      dilr: { general: 80, obc: 72, sc: 65, st: 60 },
      qa: { general: 80, obc: 72, sc: 65, st: 60 }
    },
    admissionPolicy: "https://www.iimk.ac.in/admissions"
  },
  {
    name: "IIM Indore",
    type: "Old IIM",
    overall: { general: 90, obc: 81, sc: 70, st: 65 },
    sectional: {
      varc: { general: 80, obc: 72, sc: 65, st: 60 },
      dilr: { general: 80, obc: 72, sc: 65, st: 60 },
      qa: { general: 80, obc: 72, sc: 65, st: 60 }
    },
    admissionPolicy: "https://www.iimidr.ac.in/admissions"
  },
  {
    name: "IIM Rohtak",
    type: "New IIM",
    overall: { general: 95, obc: 78, sc: 60, st: 55 },
    sectional: {
      varc: { general: 80, obc: 72, sc: 54, st: 48 },
      dilr: { general: 80, obc: 72, sc: 54, st: 48 },
      qa: { general: 80, obc: 72, sc: 54, st: 48 }
    },
    admissionPolicy: "https://www.iimrohtak.ac.in/admissions"
  },
  {
    name: "IIM Ranchi",
    type: "New IIM",
    overall: { general: 94, obc: 78, sc: 60, st: 55 },
    sectional: {
      varc: { general: 80, obc: 72, sc: 54, st: 48 },
      dilr: { general: 80, obc: 72, sc: 54, st: 48 },
      qa: { general: 80, obc: 72, sc: 54, st: 48 }
    },
    admissionPolicy: "https://www.iimranchi.ac.in/admissions"
  }
]

// Other colleges accepting CAT
export const otherColleges = [
  {
    name: "Faculty of Management Studies (FMS), Delhi",
    cutoff: { general: 98.5, obc: 96, sc: 88, st: 82 },
    fees: "₹20,000",
    process: "CAT + Extempore + Interview"
  },
  {
    name: "SP Jain Institute of Management & Research (SPJIMR), Mumbai",
    cutoff: { general: 95, obc: 90, sc: 85, st: 80 },
    fees: "₹20.5 Lakhs",
    process: "CAT + SPJAT + Interview"
  },
  {
    name: "Management Development Institute (MDI), Gurgaon",
    cutoff: { general: 94, obc: 88, sc: 82, st: 75 },
    fees: "₹25.18 Lakhs",
    process: "CAT + GD + Interview"
  },
  {
    name: "Indian Institute of Foreign Trade (IIFT), Delhi",
    cutoff: { general: 93, obc: 85, sc: 78, st: 70 },
    fees: "₹19.5 Lakhs",
    process: "CAT + Essay + Interview"
  },
  {
    name: "JBIMS, Mumbai",
    cutoff: { general: 99, obc: 95, sc: 90, st: 85 },
    fees: "₹6.5 Lakhs",
    process: "CAT + GD + Interview"
  }
]

// Mock test resources
export const mockTestResources = {
  free: [
    {
      name: "Cracku Free CAT Mocks",
      provider: "Cracku",
      count: "3 Full-length mocks",
      features: ["Video solutions", "Performance analysis", "Topic-wise tests"],
      link: "https://cracku.in/cat-mock-test"
    },
    {
      name: "iQuanta Free CAT Mocks",
      provider: "iQuanta",
      count: "AI-based mocks",
      features: ["Real exam simulation", "Detailed analysis", "Free topic tests"],
      link: "https://www.iquanta.in/cat-mock-test"
    },
    {
      name: "Career Launcher Free Mocks",
      provider: "Career Launcher",
      count: "Free full-length mocks",
      features: ["Sectional tests", "Topic-wise practice", "Performance tracking"],
      link: "https://www.careerlauncher.com/cat-mba/freecatmock/"
    }
  ],
  paid: [
    {
      name: "SIMCATs",
      provider: "IMS India",
      price: "₹2,500",
      count: "25+ mocks",
      features: ["Expert-designed", "Detailed analysis", "Video solutions", "Percentile prediction"],
      link: "https://www.imsindia.com/cat-test-series/"
    },
    {
      name: "AIMCATs",
      provider: "TIME",
      price: "₹3,000",
      count: "30+ mocks",
      features: ["Realistic simulation", "Comprehensive analysis", "All India ranking"],
      link: "https://www.time4education.com/AIMCAT"
    },
    {
      name: "CL CAT Test Series",
      provider: "Career Launcher",
      price: "₹2,800",
      count: "30+ mocks",
      features: ["Sectional tests", "Topic tests", "Performance analysis", "Video solutions"],
      link: "https://www.careerlauncher.com/cat-mba/testseries/"
    }
  ]
}

// Utility functions for calculations
export const calculatePercentile = (marks, section = 'overall', year = '2024') => {
  const data = catScoreData[year]?.[section] || catScoreData['2024'][section]
  
  if (!data) return null
  
  // Find the closest match or interpolate
  for (let i = 0; i < data.length - 1; i++) {
    if (marks >= data[i].marks && marks <= data[i + 1].marks) {
      // Linear interpolation
      const ratio = (marks - data[i].marks) / (data[i + 1].marks - data[i].marks)
      return data[i].percentile + ratio * (data[i + 1].percentile - data[i].percentile)
    }
  }
  
  // If marks are below minimum
  if (marks < data[0].marks) {
    return Math.max(0, data[0].percentile - (data[0].marks - marks) * 2)
  }
  
  // If marks are above maximum
  if (marks > data[data.length - 1].marks) {
    return Math.min(100, data[data.length - 1].percentile + (marks - data[data.length - 1].marks) * 0.1)
  }
  
  return null
}

export const calculateRequiredMarks = (targetPercentile, section = 'overall', year = '2024') => {
  const data = catScoreData[year]?.[section] || catScoreData['2024'][section]
  
  if (!data) return null
  
  // Find the closest match or interpolate
  for (let i = 0; i < data.length - 1; i++) {
    if (targetPercentile >= data[i].percentile && targetPercentile <= data[i + 1].percentile) {
      // Linear interpolation
      const ratio = (targetPercentile - data[i].percentile) / (data[i + 1].percentile - data[i].percentile)
      return Math.round(data[i].marks + ratio * (data[i + 1].marks - data[i].marks))
    }
  }
  
  // If percentile is below minimum
  if (targetPercentile < data[0].percentile) {
    return Math.max(0, data[0].marks - (data[0].percentile - targetPercentile) / 2)
  }
  
  // If percentile is above maximum
  if (targetPercentile > data[data.length - 1].percentile) {
    return data[data.length - 1].marks + (targetPercentile - data[data.length - 1].percentile) * 10
  }
  
  return null
}

