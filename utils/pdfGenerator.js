// pdfGenerator.js
const PDFDocument = require('pdfkit');
const { Writable } = require('stream');
const getBufferFromStream = (stream) => {
  return new Promise((resolve, reject) => {
    const buffers = [];
    stream.on('data', buffers.push.bind(buffers));
    stream.on('end', () => resolve(Buffer.concat(buffers)));
    stream.on('error', reject);
  });
};

const generateEmployeeProfilePDF = async (employee) => {
  const doc = new PDFDocument();
  const stream = new Writable();
  let chunks = [];

  stream._write = (chunk, enc, next) => {
    chunks.push(chunk);
    next();
  };
  doc.pipe(stream);

  doc.fontSize(20).text('Employee Profile', { align: 'center' });
  doc.moveDown();
  doc.fontSize(12);

  Object.entries(employee).forEach(([key, value]) => {
    doc.text(`${key}: ${value}`);
  });

  doc.end();

  return getBufferFromStream(stream).then(buffer => ({
    filename: `employee_${employee.id}.pdf`,
    content: buffer,
  }));
};

module.exports = {
  generateEmployeeProfilePDF,
};
