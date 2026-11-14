import { jsPDF } from 'jspdf';

/**
 * Generates and downloads a luxury, minimal, professional A4 PDF invoice
 * for completed Jain Jewellers purchases.
 * 
 * @param {Object} order - Completed order object from checkout
 */
export function generateInvoicePdf(order) {
  if (!order || !order.customer || !order.items) {
    console.error('generateInvoicePdf: Invalid order data provided');
    return;
  }

  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const PAGE_WIDTH = 210;
  const PAGE_HEIGHT = 297;
  const MARGIN_LEFT = 15;
  const MARGIN_RIGHT = 195;
  const CONTENT_WIDTH = MARGIN_RIGHT - MARGIN_LEFT; // 180mm

  // Brand Palette
  const BURGUNDY = [138, 2, 1];     // #8A0201
  const GOLD = [217, 149, 6];       // #D99506
  const CHARCOAL = [41, 35, 33];    // #292321
  const MUTED = [119, 113, 109];    // #77716D
  const IVORY = [250, 248, 244];    // #FAF8F4
  const BORDER = [232, 225, 216];   // #E8E1D8

  const invoiceNumber = `INV-2026-${(order.orderId || '').replace(/\D/g, '') || Math.floor(100000 + Math.random() * 900000)}`;

  // Helper: Format Indian Rupee currency safely
  const formatInr = (amount) => {
    const val = Number(amount) || 0;
    return `Rs. ${val.toLocaleString('en-IN')}`;
  };

  // Helper: Draw page header
  const drawHeader = () => {
    // Top Brand Name
    doc.setFont('Helvetica', 'bold');
    doc.setFontSize(22);
    doc.setTextColor(...BURGUNDY);
    doc.text('JAIN JEWELLERS', MARGIN_LEFT, 20);

    // Brand Tagline
    doc.setFont('Helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(...GOLD);
    doc.text('ROYAL HERITAGE FINE JEWELLERY • ESTD. 1984', MARGIN_LEFT, 25.5);

    doc.setFont('Helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(...MUTED);
    doc.text('100% BIS Hallmarked 22KT Gold & Certified Solitaire Atelier', MARGIN_LEFT, 29.5);

    // Tax Invoice Details (Right-aligned)
    doc.setFont('Helvetica', 'bold');
    doc.setFontSize(14);
    doc.setTextColor(...BURGUNDY);
    doc.text('TAX INVOICE', MARGIN_RIGHT, 19, { align: 'right' });

    doc.setFont('Helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(...CHARCOAL);
    doc.text(`Invoice No: ${invoiceNumber}`, MARGIN_RIGHT, 24, { align: 'right' });
    doc.text(`Order ID: ${order.orderId}`, MARGIN_RIGHT, 28, { align: 'right' });
    doc.text(`Invoice Date: ${order.orderDate}`, MARGIN_RIGHT, 32, { align: 'right' });
    doc.text(`Payment Method: ${(order.paymentMethod || 'PREPAID').toUpperCase()}`, MARGIN_RIGHT, 36, { align: 'right' });

    // Gold Divider Line
    doc.setDrawColor(...GOLD);
    doc.setLineWidth(0.5);
    doc.line(MARGIN_LEFT, 41, MARGIN_RIGHT, 41);
  };

  // Helper: Draw footer
  const drawFooter = () => {
    const footerY = PAGE_HEIGHT - 18;

    doc.setDrawColor(...BORDER);
    doc.setLineWidth(0.3);
    doc.line(MARGIN_LEFT, footerY - 4, MARGIN_RIGHT, footerY - 4);

    doc.setFont('Helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(...BURGUNDY);
    doc.text('Thank you for choosing Jain Jewellers.', PAGE_WIDTH / 2, footerY, { align: 'center' });

    doc.setFont('Helvetica', 'normal');
    doc.setFontSize(7);
    doc.setTextColor(...MUTED);
    doc.text(
      'Every piece carries our hallmark of authenticity, purity guarantee, and imperial craftsmanship.',
      PAGE_WIDTH / 2,
      footerY + 4,
      { align: 'center' }
    );
    doc.text(
      'This is a digitally generated tax invoice and requires no physical signature.',
      PAGE_WIDTH / 2,
      footerY + 7.5,
      { align: 'center' }
    );
  };

  // Render First Page
  drawHeader(true);

  // Customer & Atelier Details Section
  let y = 48;

  // Background Box for Parties
  doc.setFillColor(...IVORY);
  doc.rect(MARGIN_LEFT, y, CONTENT_WIDTH, 34, 'F');
  doc.setDrawColor(...BORDER);
  doc.setLineWidth(0.3);
  doc.rect(MARGIN_LEFT, y, CONTENT_WIDTH, 34, 'S');

  // Left Box: Billed / Delivered To
  doc.setFont('Helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(...BURGUNDY);
  doc.text('BILLED & DELIVERED TO:', MARGIN_LEFT + 4, y + 6);

  doc.setFont('Helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(...CHARCOAL);
  doc.text(order.customer.fullName || 'Customer', MARGIN_LEFT + 4, y + 11);

  doc.setFont('Helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(...CHARCOAL);

  const addressLines = [
    order.customer.address,
    `${order.customer.city}, ${order.customer.state} - ${order.customer.pinCode}`,
    `Mobile: +91 ${order.customer.mobile} | Email: ${order.customer.email}`,
  ].filter(Boolean);

  let addressY = y + 15.5;
  addressLines.forEach((line) => {
    const truncated = doc.splitTextToSize(line, 80);
    doc.text(truncated, MARGIN_LEFT + 4, addressY);
    addressY += 4;
  });

  // Vertical Separator in Box
  doc.setDrawColor(...BORDER);
  doc.line(MARGIN_LEFT + 90, y, MARGIN_LEFT + 90, y + 34);

  // Right Box: Registered Atelier Details
  const atelierX = MARGIN_LEFT + 94;
  doc.setFont('Helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(...BURGUNDY);
  doc.text('REGISTERED ATELIER / ISSUED BY:', atelierX, y + 6);

  doc.setFont('Helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(...CHARCOAL);
  doc.text('Jain Jewellers Private Limited', atelierX, y + 11);

  doc.setFont('Helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(...MUTED);
  doc.text('CIN: U36911RJ1984PTC003120 | GSTIN: 08AAACJ1234F1Z8', atelierX, y + 15.5);
  doc.text('Johari Bazaar, Pink City, Jaipur, Rajasthan 302003', atelierX, y + 19.5);
  doc.text('Atelier Care: +91 141 2568900 | care@jainjewellers.com', atelierX, y + 23.5);
  doc.text('Website: www.jainjewellers.com', atelierX, y + 27.5);

  // Order Details Table
  y += 41;

  // Table Columns Setup
  const cols = [
    { header: 'PRODUCT DESCRIPTION', x: MARGIN_LEFT + 2, width: 62, align: 'left' },
    { header: 'CODE', x: MARGIN_LEFT + 65, width: 16, align: 'left' },
    { header: 'KARAT', x: MARGIN_LEFT + 82, width: 15, align: 'left' },
    { header: 'COLOUR', x: MARGIN_LEFT + 98, width: 22, align: 'left' },
    { header: 'WEIGHT', x: MARGIN_LEFT + 121, width: 16, align: 'left' },
    { header: 'QTY', x: MARGIN_LEFT + 138, width: 10, align: 'center' },
    { header: 'UNIT PRICE', x: MARGIN_LEFT + 150, width: 16, align: 'right' },
    { header: 'TOTAL', x: MARGIN_RIGHT - 2, width: 14, align: 'right' },
  ];

  // Table Header Row
  doc.setFillColor(...BURGUNDY);
  doc.rect(MARGIN_LEFT, y, CONTENT_WIDTH, 7.5, 'F');

  doc.setFont('Helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(255, 255, 255);

  cols.forEach((col) => {
    if (col.align === 'right') {
      doc.text(col.header, col.x, y + 5, { align: 'right' });
    } else if (col.align === 'center') {
      doc.text(col.header, col.x + col.width / 2, y + 5, { align: 'center' });
    } else {
      doc.text(col.header, col.x, y + 5);
    }
  });

  y += 7.5;

  // Table Body Rows
  doc.setFontSize(8);

  order.items.forEach((item, index) => {
    // Check if new page is needed
    if (y > PAGE_HEIGHT - 60) {
      drawFooter();
      doc.addPage();
      drawHeader(false);
      y = 48;
    }

    const rowHeight = 11;
    const isEven = index % 2 === 0;

    // Alternating Row Background
    if (isEven) {
      doc.setFillColor(255, 255, 255);
    } else {
      doc.setFillColor(252, 250, 247);
    }
    doc.rect(MARGIN_LEFT, y, CONTENT_WIDTH, rowHeight, 'F');

    // Bottom row border
    doc.setDrawColor(...BORDER);
    doc.setLineWidth(0.2);
    doc.line(MARGIN_LEFT, y + rowHeight, MARGIN_RIGHT, y + rowHeight);

    // Text rendering
    doc.setFont('Helvetica', 'bold');
    doc.setTextColor(...CHARCOAL);

    // 1. Product Name (wrapped if long)
    const truncatedName = doc.splitTextToSize(item.name || 'Fine Jewellery Piece', 60);
    doc.text(truncatedName[0], cols[0].x, y + 4.5);
    if (truncatedName.length > 1) {
      doc.setFont('Helvetica', 'normal');
      doc.setFontSize(7);
      doc.setTextColor(...MUTED);
      doc.text(truncatedName[1], cols[0].x, y + 8.5);
      doc.setFontSize(8);
    }

    doc.setFont('Helvetica', 'normal');
    doc.setTextColor(...CHARCOAL);

    // 2. Product Code
    doc.text(String(item.productCode || '539118'), cols[1].x, y + 6);

    // 3. Karat
    doc.text(String(item.purity || '22Kt'), cols[2].x, y + 6);

    // 4. Colour
    doc.text(String(item.colour || 'Yellow Gold'), cols[3].x, y + 6);

    // 5. Weight
    doc.text(String(item.weight || '6.46g'), cols[4].x, y + 6);

    // 6. Quantity
    doc.text(String(item.quantity || 1), cols[5].x + cols[5].width / 2, y + 6, { align: 'center' });

    // 7. Unit Price
    doc.text(formatInr(item.price), cols[6].x + cols[6].width, y + 6, { align: 'right' });

    // 8. Line Total
    doc.setFont('Helvetica', 'bold');
    const lineTotal = (Number(item.price) || 0) * (Number(item.quantity) || 1);
    doc.text(formatInr(lineTotal), cols[7].x, y + 6, { align: 'right' });

    y += rowHeight;
  });

  // Space before Payment Summary
  y += 6;

  // Check if summary fits on page
  if (y > PAGE_HEIGHT - 65) {
    drawFooter();
    doc.addPage();
    drawHeader(false);
    y = 48;
  }

  // Payment Summary Box (Right-aligned, 75mm wide)
  const summaryBoxWidth = 80;
  const summaryBoxX = MARGIN_RIGHT - summaryBoxWidth;
  const summaryBoxHeight = 36;

  doc.setFillColor(...IVORY);
  doc.rect(summaryBoxX, y, summaryBoxWidth, summaryBoxHeight, 'F');
  doc.setDrawColor(...BORDER);
  doc.setLineWidth(0.3);
  doc.rect(summaryBoxX, y, summaryBoxWidth, summaryBoxHeight, 'S');

  let sumY = y + 6;

  // Subtotal
  doc.setFont('Helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(...CHARCOAL);
  doc.text('Subtotal:', summaryBoxX + 4, sumY);
  doc.text(formatInr(order.subtotal), MARGIN_RIGHT - 4, sumY, { align: 'right' });

  // Promotional Discount
  if (order.discount > 0) {
    sumY += 5;
    doc.setTextColor(34, 139, 34); // Forest green
    doc.text('Promotional Discount:', summaryBoxX + 4, sumY);
    doc.text(`- ${formatInr(order.discount)}`, MARGIN_RIGHT - 4, sumY, { align: 'right' });
    doc.setTextColor(...CHARCOAL);
  }

  // Insured Delivery
  sumY += 5;
  doc.text('Insured Doorstep Delivery:', summaryBoxX + 4, sumY);
  doc.setFont('Helvetica', 'bold');
  doc.setTextColor(34, 139, 34);
  doc.text('FREE', MARGIN_RIGHT - 4, sumY, { align: 'right' });

  // Applicable Taxes
  sumY += 5;
  doc.setFont('Helvetica', 'normal');
  doc.setTextColor(...MUTED);
  doc.text('GST (3% Hallmarked Fine Gold):', summaryBoxX + 4, sumY);
  doc.text('Included', MARGIN_RIGHT - 4, sumY, { align: 'right' });

  // Divider Line inside Summary Box
  sumY += 3;
  doc.setDrawColor(...BORDER);
  doc.line(summaryBoxX + 4, sumY, MARGIN_RIGHT - 4, sumY);

  // Final Total Paid
  sumY += 6;
  doc.setFont('Helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(...BURGUNDY);
  doc.text('TOTAL PAID:', summaryBoxX + 4, sumY);
  doc.text(formatInr(order.total), MARGIN_RIGHT - 4, sumY, { align: 'right' });

  // Payment Status Badge on Left
  const badgeY = y + 6;
  doc.setFillColor(236, 253, 245); // Emerald-50
  doc.roundedRect(MARGIN_LEFT, badgeY, 82, 24, 2, 2, 'F');
  doc.setDrawColor(167, 243, 208); // Emerald-200
  doc.setLineWidth(0.3);
  doc.roundedRect(MARGIN_LEFT, badgeY, 82, 24, 2, 2, 'S');

  doc.setFont('Helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(6, 95, 70); // Emerald-800
  doc.text('PAYMENT STATUS: CONFIRMED & SETTLED', MARGIN_LEFT + 4, badgeY + 6);

  doc.setFont('Helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(6, 95, 70);
  doc.text(`Method: ${(order.paymentMethod || 'PREPAID').toUpperCase()}`, MARGIN_LEFT + 4, badgeY + 11);
  doc.text(`Reference ID: PAY-${(order.orderId || '').replace(/\D/g, '')}-OK`, MARGIN_LEFT + 4, badgeY + 15);
  doc.text('100% Insured Delivery with Lifetime Exchange Assurance', MARGIN_LEFT + 4, badgeY + 19);

  // Always draw footer on the active page
  drawFooter();

  // Trigger client-side file download
  const filename = `Jain-Jewellers-Invoice-${order.orderId || 'PURCHASE'}.pdf`;
  doc.save(filename);
}
