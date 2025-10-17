import jsPDF from 'jspdf'

export function generateApplicationPDF(application) {
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  })

  let yPosition = 20
  const pageHeight = pdf.internal.pageSize.getHeight()
  const margin = 15
  const maxWidth = 180

  // Helper function to add text with wrapping
  const addWrappedText = (text, fontSize, isBold, maxW = maxWidth) => {
    pdf.setFontSize(fontSize)
    if (isBold) {
      pdf.setFont(undefined, 'bold')
    } else {
      pdf.setFont(undefined, 'normal')
    }

    const lines = pdf.splitTextToSize(text, maxW)
    lines.forEach((line) => {
      if (yPosition > pageHeight - 20) {
        pdf.addPage()
        yPosition = 20
      }
      pdf.text(line, margin, yPosition)
      yPosition += 7
    })
  }

  // Add header
  addWrappedText(`${application.company} - ${application.jobTitle}`, 16, true)
  addWrappedText(`Applied: ${new Date(application.dateApplied).toLocaleDateString()}`, 10, false)
  yPosition += 5

  // Add each output section
  if (application.outputs?.resume) {
    pdf.setDrawColor(96, 165, 250)
    pdf.setLineWidth(0.5)
    pdf.line(margin, yPosition, maxWidth + margin, yPosition)
    yPosition += 5

    addWrappedText('OPTIMIZED RESUME', 14, true)
    yPosition += 3
    addWrappedText(application.outputs.resume, 9, false)
    yPosition += 10
  }

  if (application.outputs?.coverLetter) {
    pdf.setDrawColor(96, 165, 250)
    pdf.setLineWidth(0.5)
    pdf.line(margin, yPosition, maxWidth + margin, yPosition)
    yPosition += 5

    addWrappedText('COVER LETTER', 14, true)
    yPosition += 3
    addWrappedText(application.outputs.coverLetter, 9, false)
    yPosition += 10
  }

  if (application.outputs?.interviewPrep) {
    pdf.setDrawColor(96, 165, 250)
    pdf.setLineWidth(0.5)
    pdf.line(margin, yPosition, maxWidth + margin, yPosition)
    yPosition += 5

    addWrappedText('INTERVIEW PREP', 14, true)
    yPosition += 3
    addWrappedText(application.outputs.interviewPrep, 9, false)
    yPosition += 10
  }

  if (application.outputs?.jobAnalyzer) {
    pdf.setDrawColor(96, 165, 250)
    pdf.setLineWidth(0.5)
    pdf.line(margin, yPosition, maxWidth + margin, yPosition)
    yPosition += 5

    addWrappedText('JOB ANALYSIS', 14, true)
    yPosition += 3
    addWrappedText(application.outputs.jobAnalyzer, 9, false)
    yPosition += 10
  }

  // Download
  const filename = `${application.company}-${application.jobTitle}-package.pdf`
  pdf.save(filename)
}
