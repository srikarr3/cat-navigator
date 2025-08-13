// Export functions for comprehensive IIM admission data
import { iimAdmissionData, otherInstitutes, catPercentileMappings } from './comprehensiveData.js';

// Generate CSV data for IIM admissions
export const generateIIMCSV = () => {
  const headers = [
    'Institute',
    'NIRF_Ranking',
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
  ];

  const rows = [];
  
  iimAdmissionData.forEach(iim => {
    Object.entries(iim.cycles).forEach(([year, data]) => {
      rows.push([
        iim.name,
        iim.nirfRanking,
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
      ]);
    });
  });

  return [headers, ...rows];
};

// Generate CSV data for other institutes
export const generateOtherInstitutesCSV = () => {
  const headers = [
    'Institute',
    'NIRF_Ranking',
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
  ];

  const rows = otherInstitutes.map(inst => [
    inst.name,
    inst.nirfRanking,
    inst.programs.join(', '),
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
  ]);

  return [headers, ...rows];
};

// Generate JSON data
export const generateJSONData = () => {
  return {
    metadata: {
      lastUpdated: new Date().toISOString(),
      totalIIMs: iimAdmissionData.length,
      totalOtherInstitutes: otherInstitutes.length,
      dataSource: "Official IIM websites and verified sources",
      confidenceThreshold: "Data with confidence score >= 70"
    },
    catPercentileMappings,
    iimAdmissions: iimAdmissionData,
    otherInstitutes,
    freeResourceSheet: {
      name: "CAT Preparation Free Resources",
      url: "https://docs.google.com/spreadsheets/d/121TJowkkWLeaPSAYp5Cokg0If9iwBtFDF6CZ5JWIYO0/edit?gid=0#gid=0",
      description: "Comprehensive collection of free CAT preparation resources"
    }
  };
};

// Download CSV function
export const downloadCSV = (data, filename) => {
  const csvContent = data.map(row => 
    row.map(cell => `"${cell}"`).join(',')
  ).join('\n');
  
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};

// Download JSON function
export const downloadJSON = (data, filename) => {
  const jsonContent = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonContent], { type: 'application/json;charset=utf-8;' });
  const link = document.createElement('a');
  
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}; 