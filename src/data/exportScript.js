// Comprehensive Data Export Script
// Generates CSV, JSON, and markdown files for CAT → IIM admissions data

import { 
  iimAdmissionData, 
  otherInstitutes, 
  catPercentileMappings,
  lowPIWATIIMs,
  freeResourceSheet 
} from './comprehensiveData.js'

// Generate CSV data for IIM admissions (as per user requirements)
export const generateIIMCSV = () => {
  const headers = [
    'Institute',
    'Year',
    'Category',
    'OverallPercentileCutoff',
    'VARC_percentile',
    'DILR_percentile',
    'QA_percentile',
    'EstimatedOverallMarks',
    'EstimatedVARCMarks',
    'EstimatedDILRMarks',
    'EstimatedQAMarks',
    'CAT_weight_pct',
    'PI_WAT_weight_pct',
    'Academics_weight_pct',
    'WorkExp_weight_pct',
    'SourceURLs',
    'ConfidenceScore'
  ]

  const rows = []
  
  iimAdmissionData.forEach(iim => {
    Object.entries(iim.cycles).forEach(([year, data]) => {
      rows.push([
        iim.name,
        year,
        'General-Male',
        data.overallPercentile,
        data.sectional.varc,
        data.sectional.dilr,
        data.sectional.qa,
        data.estimatedMarks.overall,
        data.estimatedMarks.varc,
        data.estimatedMarks.dilr,
        data.estimatedMarks.qa,
        data.process.cat,
        data.process.pi + data.process.wat,
        data.process.academics,
        data.process.workExp,
        data.source,
        data.confidence
      ])
    })
  })

  return [headers, ...rows]
}

// Generate CSV data for other institutes
export const generateOtherInstitutesCSV = () => {
  const headers = [
    'Institute',
    'Programs',
    'OverallCutoff',
    'VARC_Cutoff',
    'DILR_Cutoff',
    'QA_Cutoff',
    'CAT_Weight',
    'GD_Weight',
    'PI_Weight',
    'Fees',
    'Source',
    'Confidence'
  ]

  const rows = otherInstitutes.map(inst => [
    inst.name,
    inst.programs.join('; '),
    inst.cutoff.overall,
    inst.cutoff.varc,
    inst.cutoff.dilr,
    inst.cutoff.qa,
    inst.process.cat,
    inst.process.gd || 0,
    inst.process.pi,
    inst.fees,
    inst.source,
    inst.confidence
  ])

  return [headers, ...rows]
}

// Generate comprehensive JSON data
export const generateJSONData = () => {
  return {
    metadata: {
      lastUpdated: new Date().toISOString(),
      totalIIMs: iimAdmissionData.length,
      totalOtherInstitutes: otherInstitutes.length,
      dataSource: "Official IIM websites and verified sources",
      confidenceThreshold: "Data with confidence score >= 70",
      catMaxMarks: 204,
      targetYears: [2022, 2023, 2024, 2025]
    },
    catPercentileMappings,
    iimAdmissions: iimAdmissionData,
    otherInstitutes,
    lowPIWATIIMs,
    freeResourceSheet,
    dataQuality: {
      highConfidence: iimAdmissionData.filter(iim => 
        Object.values(iim.cycles).some(cycle => cycle.confidence >= 90)
      ).length,
      mediumConfidence: iimAdmissionData.filter(iim => 
        Object.values(iim.cycles).some(cycle => cycle.confidence >= 70 && cycle.confidence < 90)
      ).length,
      lowConfidence: iimAdmissionData.filter(iim => 
        Object.values(iim.cycles).some(cycle => cycle.confidence < 70)
      ).length
    }
  }
}

// Generate percentile to marks conversion table
export const generatePercentileMarksTable = () => {
  const targetPercentiles = [90, 95, 97, 99, 99.5, 99.9]
  const years = Object.keys(catPercentileMappings)
  
  const table = {
    headers: ['Target Percentile', 'Overall Marks', 'VARC Marks', 'DILR Marks', 'QA Marks', 'Overall % of Max', 'VARC % of Max', 'DILR % of Max', 'QA % of Max'],
    data: []
  }
  
  targetPercentiles.forEach(percentile => {
    const year = '2024' // Use latest year
    const overallMarks = convertPercentileToMarks(percentile, 'overall', year)
    const varcMarks = convertPercentileToMarks(percentile, 'varc', year)
    const dilrMarks = convertPercentileToMarks(percentile, 'dilr', year)
    const qaMarks = convertPercentileToMarks(percentile, 'qa', year)
    
    if (overallMarks) {
      table.data.push([
        `${percentile}%`,
        overallMarks,
        varcMarks || 'N/A',
        dilrMarks || 'N/A',
        qaMarks || 'N/A',
        `${((overallMarks / 204) * 100).toFixed(1)}%`,
        varcMarks ? `${((varcMarks / 72) * 100).toFixed(1)}%` : 'N/A',
        dilrMarks ? `${((dilrMarks / 60) * 100).toFixed(1)}%` : 'N/A',
        qaMarks ? `${((qaMarks / 72) * 100).toFixed(1)}%` : 'N/A'
      ])
    }
  })
  
  return table
}

// Generate IIM rankings by cutoff
export const generateIIMRankings = (year = '2024') => {
  return iimAdmissionData
    .filter(iim => iim.cycles[year])
    .map(iim => ({
      rank: 0, // Will be set below
      name: iim.name,
      type: iim.type,
      overallCutoff: iim.cycles[year].overallPercentile,
      estimatedMarks: iim.cycles[year].estimatedMarks.overall,
      catWeight: iim.cycles[year].process.cat,
      piWatWeight: iim.cycles[year].process.pi + iim.cycles[year].process.wat,
      confidence: iim.cycles[year].confidence
    }))
    .sort((a, b) => b.overallCutoff - a.overallCutoff)
    .map((iim, index) => ({ ...iim, rank: index + 1 }))
}

// Generate low PI/WAT weightage IIMs
export const generateLowPIWATIIMs = () => {
  return iimAdmissionData
    .filter(iim => {
      const hasYearData = iim.cycles['2024']
      return hasYearData && (iim.cycles['2024'].process.cat >= 55)
    })
    .map(iim => ({
      name: iim.name,
      type: iim.type,
      catWeight: iim.cycles['2024'].process.cat,
      piWatWeight: iim.cycles['2024'].process.pi + iim.cycles['2024'].process.wat,
      otherWeight: iim.cycles['2024'].process.academics + iim.cycles['2024'].process.workExp,
      advantage: iim.cycles['2024'].process.cat >= 60 ? 'High CAT focus' : 'Balanced approach'
    }))
    .sort((a, b) => b.catWeight - a.catWeight)
}

// Utility function for percentile to marks conversion
const convertPercentileToMarks = (percentile, section = 'overall', year = '2024') => {
  const mappings = catPercentileMappings[year]?.[section] || catPercentileMappings['2024'][section]
  
  if (!mappings) return null
  
  // Find exact match
  const exactMatch = mappings.find(m => m.percentile === percentile)
  if (exactMatch) return exactMatch.marks
  
  // Interpolate
  for (let i = 0; i < mappings.length - 1; i++) {
    if (percentile >= mappings[i].percentile && percentile <= mappings[i + 1].percentile) {
      const ratio = (percentile - mappings[i].percentile) / (mappings[i + 1].percentile - mappings[i].percentile)
      return Math.round(mappings[i].marks + ratio * (mappings[i + 1].marks - mappings[i].marks))
    }
  }
  
  return null
}

// Generate data for charts
export const generateChartData = () => {
  const year = '2024'
  
  // Bar chart data: Institute vs Estimated Overall Marks
  const barChartData = iimAdmissionData
    .filter(iim => iim.cycles[year])
    .map(iim => ({
      institute: iim.name,
      marks: iim.cycles[year].estimatedMarks.overall,
      type: iim.type,
      cutoff: iim.cycles[year].overallPercentile
    }))
    .sort((a, b) => b.marks - a.marks)
  
  // Heatmap data: Institute vs Section % of max
  const heatmapData = iimAdmissionData
    .filter(iim => iim.cycles[year])
    .map(iim => ({
      institute: iim.name,
      varc: ((iim.cycles[year].estimatedMarks.varc / 72) * 100).toFixed(1),
      dilr: ((iim.cycles[year].estimatedMarks.dilr / 60) * 100).toFixed(1),
      qa: ((iim.cycles[year].estimatedMarks.qa / 72) * 100).toFixed(1),
      type: iim.type
    }))
  
  // Quick lookup table data
  const lookupTableData = {
    targetPercentiles: [90, 95, 97, 99, 99.5, 99.9],
    oldIIMs: {
      safePercentile: 90,
      safeMarks: convertPercentileToMarks(90, 'overall', year),
      sectionalFocus: 'Balanced performance in all sections'
    },
    midIIMs: {
      safePercentile: 95,
      safeMarks: convertPercentileToMarks(95, 'overall', year),
      sectionalFocus: 'Strong VARC, balanced DILR and QA'
    },
    newIIMs: {
      safePercentile: 90,
      safeMarks: convertPercentileToMarks(90, 'overall', year),
      sectionalFocus: 'Consistent sectional performance'
    }
  }
  
  return {
    barChart: barChartData,
    heatmap: heatmapData,
    lookupTable: lookupTableData
  }
}

// Export all data in one function
export const exportAllData = () => {
  return {
    iimCSV: generateIIMCSV(),
    otherInstitutesCSV: generateOtherInstitutesCSV(),
    jsonData: generateJSONData(),
    percentileTable: generatePercentileMarksTable(),
    iimRankings: generateIIMRankings(),
    lowPIWATIIMs: generateLowPIWATIIMs(),
    chartData: generateChartData()
  }
} 