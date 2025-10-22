import { jsPDF } from 'jspdf'

export function generateApplicationPackagePDF(application) {
  const doc = new jsPDF()
  const pageWidth = doc.internal.pageSize.getWidth()
  const pageHeight = doc.internal.pageSize.getHeight()
  const margin = 15
  const contentWidth = pageWidth - 2 * margin
  let yPosition = margin

  // Color scheme
  const colors = {
    primary: [96, 165, 250],      // Blue (#60a5fa)
    dark: [15, 20, 25],           // Dark background
    text: [30, 30, 30],           // Dark text
    lightText: [100, 100, 100],   // Gray text
    divider: [200, 200, 200],     // Light gray
    accentBg: [245, 248, 255]     // Very light blue background
  }

  // Helper function to add text with automatic line breaking
  const addWrappedText = (text, fontSize, isBold = false, color = colors.text) => {
    doc.setFontSize(fontSize)
    doc.setTextColor(...color)
    if (isBold) {
      doc.setFont(undefined, 'bold')
    } else {
      doc.setFont(undefined, 'normal')
    }
    const lines = doc.splitTextToSize(text, contentWidth)
    lines.forEach((line) => {
      if (yPosition > pageHeight - margin - 5) {
        doc.addPage()
        yPosition = margin
      }
      doc.text(line, margin, yPosition)
      yPosition += 5
    })
  }

  // Helper function to add a section with improved design
  const addSection = (title, startNewPage = false) => {
    if (startNewPage) {
      doc.addPage()
      yPosition = margin + 5
    } else {
      yPosition += 8
    }

    // Section background
    doc.setFillColor(...colors.accentBg)
    doc.rect(margin - 2, yPosition - 4, contentWidth + 4, 8, 'F')

    // Section title
    doc.setFontSize(14)
    doc.setFont(undefined, 'bold')
    doc.setTextColor(...colors.primary)
    doc.text(title, margin, yPosition + 2)

    // Divider line below title
    doc.setDrawColor(...colors.divider)
    doc.setLineWidth(0.5)
    doc.line(margin, yPosition + 5, pageWidth - margin, yPosition + 5)

    yPosition += 8
  }

  // ========== COVER PAGE ==========
  doc.setFontSize(24)
  doc.setFont(undefined, 'bold')
  doc.setTextColor(...colors.primary)
  doc.text('elevaitr', margin, yPosition)
  yPosition += 10

  doc.setFontSize(12)
  doc.setFont(undefined, 'bold')
  doc.setTextColor(...colors.text)
  doc.text(`${application.company} — ${application.jobTitle}`, margin, yPosition)
  yPosition += 6

  doc.setFontSize(10)
  doc.setFont(undefined, 'normal')
  doc.setTextColor(...colors.lightText)
  doc.text(`Application Package • Generated ${new Date(application.dateApplied).toLocaleDateString()}`, margin, yPosition)
  
  // Divider
  doc.setDrawColor(...colors.divider)
  doc.setLineWidth(1)
  yPosition += 10
  doc.line(margin, yPosition, pageWidth - margin, yPosition)
  yPosition += 10

  // ========== JOB DESCRIPTION ==========
  if (application.jobDescription) {
    addSection('Job Description', false)
    addWrappedText(application.jobDescription, 10, false, colors.text)
  }

  // ========== RESUME ==========
  if (application.outputs?.resume) {
    addSection('Optimized Resume', false)
    addWrappedText(application.outputs.resume, 10, false, colors.text)
  }

  // ========== COVER LETTER ==========
  if (application.outputs?.coverLetter) {
    addSection('Cover Letter', true)
    addWrappedText(application.outputs.coverLetter, 10, false, colors.text)
  }

  // ========== INTERVIEW PREP ==========
  if (application.outputs?.interviewPrep) {
    addSection('Interview Preparation', true)
    addWrappedText(application.outputs.interviewPrep, 10, false, colors.text)
  }

  // ========== LINKEDIN ==========
  if (application.outputs?.linkedin || application.outputs?.linkedinProfile) {
    const linkedinContent = application.outputs.linkedin || application.outputs.linkedinProfile
    addSection('LinkedIn Profile Optimization', true)
    addWrappedText(linkedinContent, 10, false, colors.text)
  }

  // ========== FOOTER ==========
  doc.setFontSize(8)
  doc.setTextColor(...colors.lightText)
  doc.text('elevaitr • AI-Powered Job Application Platform', margin, pageHeight - 8)
  doc.text(`Generated on ${new Date().toLocaleString()}`, margin, pageHeight - 4)

  // Right-aligned page number
  const pageCount = doc.getNumberOfPages()
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i)
    doc.setFontSize(8)
    doc.setTextColor(...colors.lightText)
    doc.text(`Page ${i} of ${pageCount}`, pageWidth - margin - 15, pageHeight - 8, { align: 'right' })
  }

  // Save the PDF with explicit blob download for better reliability
  const filename = `${application.company}-${application.jobTitle}-${new Date().toISOString().split('T')[0]}.pdf`
  
  try {
    // Create blob from PDF
    const pdf = doc.output('blob')
    
    // Create download link
    const link = document.createElement('a')
    link.href = URL.createObjectURL(pdf)
    link.download = filename
    
    // Trigger download
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    
    // Clean up object URL
    URL.revokeObjectURL(link.href)
    
    console.log('PDF downloaded successfully:', filename)
  } catch (error) {
    console.error('Error creating PDF blob:', error)
    // Fallback to doc.save() if blob method fails
    doc.save(filename)
  }
}
