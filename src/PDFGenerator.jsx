import { jsPDF } from 'jspdf'

export function generateApplicationPackagePDF(application) {
  const doc = new jsPDF()
  const pageWidth = doc.internal.pageSize.getWidth()
  const pageHeight = doc.internal.pageSize.getHeight()
  const margin = 15
  const contentWidth = pageWidth - 2 * margin
  const accentBorderWidth = 4
  let yPosition = margin

  // Color scheme
  const colors = {
    primary: [96, 165, 250],      // Blue (#60a5fa)
    dark: [15, 20, 25],           // Dark background
    text: [30, 30, 30],           // Dark text
    lightText: [100, 100, 100],   // Gray text
    divider: [200, 200, 200],     // Light gray
    accentBg: [245, 248, 255],    // Very light blue background
    subtleGray: [248, 248, 248]   // Subtle gray for alternating sections
  }

  // Add left accent border on all pages
  const addAccentBorder = () => {
    doc.setFillColor(...colors.primary)
    doc.rect(0, 0, accentBorderWidth, pageHeight, 'F')
  }

  // Helper function to add wrapped text with proper formatting
  const addWrappedText = (text, fontSize = 10, isBold = false, textColor = colors.text) => {
    doc.setFontSize(fontSize)
    doc.setFont(undefined, isBold ? 'bold' : 'normal')
    doc.setTextColor(...textColor)
    
    const lines = doc.splitTextToSize(text, contentWidth)
    lines.forEach((line) => {
      if (yPosition > pageHeight - margin - 8) {
        doc.addPage()
        addAccentBorder()
        yPosition = margin
      }
      doc.text(line, margin + 2, yPosition)
      yPosition += 5
    })
  }

  // Helper function to add formatted interview prep with bold headers inline
  const addFormattedInterviewPrep = (text) => {
    const lines = text.split('\n')
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim()
      
      // Skip empty lines
      if (line.length === 0) {
        yPosition += 2
        continue
      }
      
      // Check if this is a Question header
      const questionMatch = line.match(/^(Question\s+\d+:)\s*(.*)/i)
      if (questionMatch) {
        const header = questionMatch[1] + ' '
        const content = questionMatch[2]
        
        // Add space before question
        if (yPosition > margin) {
          yPosition += 3
        }
        
        // Render header in bold
        doc.setFontSize(10)
        doc.setFont(undefined, 'bold')
        doc.setTextColor(...colors.text)
        doc.text(header, margin + 2, yPosition)
        
        // Estimate header width (each character ~2.3 units at font size 10)
        const headerWidth = header.length * 2.3
        const headerXEnd = margin + 2 + headerWidth
        
        // Render content in normal font starting after header
        doc.setFont(undefined, 'normal')
        const remainingWidth = contentWidth - headerWidth
        const contentLines = doc.splitTextToSize(content, remainingWidth)
        
        if (contentLines.length > 0) {
          // First line of content on same line as header
          doc.text(contentLines[0], headerXEnd, yPosition)
          yPosition += 5
          
          // Subsequent content lines start at normal margin
          for (let j = 1; j < contentLines.length; j++) {
            if (yPosition > pageHeight - margin - 8) {
              doc.addPage()
              addAccentBorder()
              yPosition = margin
            }
            doc.text(contentLines[j], margin + 2, yPosition)
            yPosition += 5
          }
        }
        
        // Process subsequent lines until we hit another header or empty line
        i++
        while (i < lines.length) {
          const nextLine = lines[i].trim()
          
          // Stop if we hit another header
          if (nextLine.match(/^Question\s+\d+:/i) || nextLine.match(/^Key\s+Points?\s+(to\s+Mention)?:/i)) {
            i--
            break
          }
          
          // Stop if we hit an empty line
          if (nextLine.length === 0) {
            break
          }
          
          // Render additional response text in normal font
          doc.setFontSize(10)
          doc.setFont(undefined, 'normal')
          doc.setTextColor(...colors.text)
          
          const textLines = doc.splitTextToSize(nextLine, contentWidth)
          textLines.forEach((tLine) => {
            if (yPosition > pageHeight - margin - 8) {
              doc.addPage()
              addAccentBorder()
              yPosition = margin
            }
            doc.text(tLine, margin + 2, yPosition)
            yPosition += 5
          })
          
          i++
        }
        continue
      }
      
      // Check if this is a Key Points header
      const keyPointMatch = line.match(/^(Key\s+Points?\s+(?:to\s+Mention)?:)\s*(.*)/i)
      if (keyPointMatch) {
        const header = keyPointMatch[1] + ' '
        const content = keyPointMatch[2]
        
        // Add space before key points
        if (yPosition > margin) {
          yPosition += 3
        }
        
        // Render header in bold
        doc.setFontSize(10)
        doc.setFont(undefined, 'bold')
        doc.setTextColor(...colors.text)
        doc.text(header, margin + 2, yPosition)
        
        // Estimate header width (each character ~2.3 units at font size 10)
        const headerWidth = header.length * 2.3
        const headerXEnd = margin + 2 + headerWidth
        
        // Render content in normal font starting after header
        doc.setFont(undefined, 'normal')
        const remainingWidth = contentWidth - headerWidth
        const contentLines = doc.splitTextToSize(content, remainingWidth)
        
        if (contentLines.length > 0) {
          // First line of content on same line as header
          doc.text(contentLines[0], headerXEnd, yPosition)
          yPosition += 5
          
          // Subsequent content lines start at normal margin
          for (let j = 1; j < contentLines.length; j++) {
            if (yPosition > pageHeight - margin - 8) {
              doc.addPage()
              addAccentBorder()
              yPosition = margin
            }
            doc.text(contentLines[j], margin + 2, yPosition)
            yPosition += 5
          }
        }
        
        // Process subsequent lines until we hit another header or empty line
        i++
        while (i < lines.length) {
          const nextLine = lines[i].trim()
          
          // Stop if we hit another header
          if (nextLine.match(/^Question\s+\d+:/i) || nextLine.match(/^Key\s+Points?\s+(to\s+Mention)?:/i)) {
            i--
            break
          }
          
          // Stop if we hit an empty line
          if (nextLine.length === 0) {
            break
          }
          
          // Render additional response text in normal font
          doc.setFontSize(10)
          doc.setFont(undefined, 'normal')
          doc.setTextColor(...colors.text)
          
          const textLines = doc.splitTextToSize(nextLine, contentWidth)
          textLines.forEach((tLine) => {
            if (yPosition > pageHeight - margin - 8) {
              doc.addPage()
              addAccentBorder()
              yPosition = margin
            }
            doc.text(tLine, margin + 2, yPosition)
            yPosition += 5
          })
          
          i++
        }
        continue
      }
    }
  }

  // Helper function to add a section with improved design
  const addSection = (title, startNewPage = false, sectionIndex = 0) => {
    if (startNewPage) {
      doc.addPage()
      addAccentBorder()
      yPosition = margin + 5
    } else {
      yPosition += 12
    }

    // Alternate subtle background for visual separation
    if (sectionIndex % 2 === 1) {
      doc.setFillColor(...colors.subtleGray)
      doc.rect(margin - 2, yPosition - 5, contentWidth + 4, 28, 'F')
    }

    // Section title - larger and more prominent
    doc.setFontSize(16)
    doc.setFont(undefined, 'bold')
    doc.setTextColor(...colors.primary)
    doc.text(title, margin + 2, yPosition + 2)

    // Divider line below title
    doc.setDrawColor(...colors.divider)
    doc.setLineWidth(0.5)
    doc.line(margin, yPosition + 6, pageWidth - margin, yPosition + 6)

    yPosition += 12
  }

  // Initial page setup
  addAccentBorder()

  // ========== COVER PAGE ==========
  doc.setFontSize(28)
  doc.setFont(undefined, 'bold')
  doc.setTextColor(...colors.primary)
  doc.text('elevaitr', margin + 2, yPosition)
  yPosition += 12

  doc.setFontSize(13)
  doc.setFont(undefined, 'bold')
  doc.setTextColor(...colors.text)
  doc.text(`${application.company} — ${application.jobTitle}`, margin + 2, yPosition)
  yPosition += 7

  doc.setFontSize(10)
  doc.setFont(undefined, 'normal')
  doc.setTextColor(...colors.lightText)
  doc.text(`Application Package • Generated ${new Date(application.dateApplied).toLocaleDateString()}`, margin + 2, yPosition)
  
  // Divider
  doc.setDrawColor(...colors.divider)
  doc.setLineWidth(1.5)
  yPosition += 12
  doc.line(margin, yPosition, pageWidth - margin, yPosition)
  yPosition += 14

  // ========== JOB DESCRIPTION ==========
  if (application.jobDescription) {
    addSection('Job Description', false, 0)
    addWrappedText(application.jobDescription, 10, false, colors.text)
  }

  // ========== RESUME ==========
  if (application.outputs?.resume) {
    addSection('Optimized Resume', false, 1)
    addWrappedText(application.outputs.resume, 10, false, colors.text)
  }

  // ========== COVER LETTER ==========
  if (application.outputs?.coverLetter) {
    addSection('Cover Letter', true, 2)
    addWrappedText(application.outputs.coverLetter, 10, false, colors.text)
  }

  // ========== INTERVIEW PREP ==========
  if (application.outputs?.interviewPrep) {
    addSection('Interview Preparation', true, 3)
    addFormattedInterviewPrep(application.outputs.interviewPrep)
  }

  // ========== LINKEDIN ==========
  if (application.outputs?.linkedin || application.outputs?.linkedinProfile) {
    const linkedinContent = application.outputs.linkedin || application.outputs.linkedinProfile
    addSection('LinkedIn Profile Optimization', true, 4)
    addWrappedText(linkedinContent, 10, false, colors.text)
  }

  // ========== FOOTER ==========
  const pageCount = doc.getNumberOfPages()
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i)
    
    // Footer divider line
    doc.setDrawColor(...colors.divider)
    doc.setLineWidth(0.5)
    doc.line(margin, pageHeight - 14, pageWidth - margin, pageHeight - 14)
    
    // Footer text
    doc.setFontSize(8)
    doc.setTextColor(...colors.lightText)
    doc.text('elevaitr • AI-Powered Job Application Platform', margin + 2, pageHeight - 10)
    doc.text(`Generated on ${new Date().toLocaleString()}`, margin + 2, pageHeight - 6)

    // Page number - right aligned
    doc.setFontSize(8)
    doc.setTextColor(...colors.lightText)
    doc.text(`Page ${i} of ${pageCount}`, pageWidth - margin - 2, pageHeight - 10, { align: 'right' })
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
