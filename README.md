# CSV to Excel Converter

A fast, privacy-focused web application for converting CSV files to Excel (.xlsx) format. All processing happens entirely in your browser—your files never leave your device.

## Features

- **Client-Side Processing**: All conversion happens in your browser. No file uploads, no server storage.
- **Privacy First**: Your CSV files are never sent to any server. Complete privacy and security.
- **Auto-Delimiter Detection**: Automatically detects comma, semicolon, or tab delimiters.
- **File Preview**: Preview the first 10 rows before conversion to verify data.
- **Header Row Support**: Option to include or exclude header rows.
- **Fast & Simple**: Clean, modern UI with drag-and-drop file upload.

## Limits (MVP)

To ensure fast, reliable in-browser conversion:

- **Maximum file size**: 10MB
- **Maximum rows**: 50,000 rows

Files exceeding these limits will show a friendly error message with suggestions. Large file support is planned for future updates.

## How to Run Locally

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Run the development server**:
   ```bash
   npm run dev
   ```

3. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

4. **Build for production**:
   ```bash
   npm run build
   npm start
   ```

## Tech Stack

- **Next.js 15+** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **SheetJS (xlsx)** - For Excel file generation

## Project Structure

```
app/
├── page.tsx                    # Home page
├── csv-to-excel/
│   ├── page.tsx               # Main converter tool
│   ├── layout.tsx             # SEO metadata
│   └── faq/
│       └── page.tsx           # FAQ page
├── csv-to-pdf/                # Stub page
├── pdf-to-csv/                # Stub page
├── csv-to-google-sheets/      # Stub page
└── csv-to-json/               # Stub page
```

## Privacy Explanation

This application is designed with privacy as a core feature:

- **No Backend**: There is no server-side processing. All code runs in your browser.
- **No File Uploads**: Files are read using the browser's FileReader API and processed locally.
- **No Storage**: We don't store, cache, or log any file data.
- **No Tracking**: No analytics or tracking of file contents.

Your data stays on your device from start to finish.

## Planned Next Steps

1. **Additional Converters**:
   - CSV to PDF
   - PDF to CSV
   - CSV to Google Sheets
   - CSV to JSON

2. **Large File Support**:
   - Server-side processing option for files exceeding current limits
   - Progress indicators for large conversions
   - Batch processing capabilities

3. **Enhanced Features**:
   - Custom delimiter input
   - Column selection
   - Multiple sheet support
   - Formatting options

## SEO

The application includes:

- SEO-optimized metadata for all pages
- Sitemap.xml for search engine indexing
- Robots.txt configuration
- Open Graph and Twitter Card metadata
- Canonical URLs for all pages

## License

This project is open source and available for use.

## Support

For issues, questions, or feature requests, please open an issue on the repository.
