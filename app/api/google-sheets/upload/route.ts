import { NextRequest, NextResponse } from "next/server";
import { google } from "googleapis";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { accessToken, data, sheetName, fileName } = body;

    if (!accessToken || !data || !Array.isArray(data)) {
      return NextResponse.json(
        { error: "Missing required parameters" },
        { status: 400 }
      );
    }

    // Create OAuth2 client
    const oauth2Client = new google.auth.OAuth2();
    oauth2Client.setCredentials({ access_token: accessToken });

    // Create Sheets API client
    const sheets = google.sheets({ version: "v4", auth: oauth2Client });

    // Create a new spreadsheet
    const spreadsheet = await sheets.spreadsheets.create({
      requestBody: {
        properties: {
          title: fileName || "CSV Import",
        },
        sheets: [
          {
            properties: {
              title: sheetName || "Sheet1",
            },
          },
        ],
      },
    });

    const spreadsheetId = spreadsheet.data.spreadsheetId;
    const range = `${sheetName || "Sheet1"}!A1`;

    if (!spreadsheetId) {
      return NextResponse.json(
        { error: "Failed to create spreadsheet" },
        { status: 500 }
      );
    }

    // Upload data to the sheet
    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range,
      valueInputOption: "RAW",
      requestBody: {
        values: data,
      },
    });

    const spreadsheetUrl = `https://docs.google.com/spreadsheets/d/${spreadsheetId}`;

    return NextResponse.json({
      success: true,
      spreadsheetId,
      spreadsheetUrl,
    });
  } catch (error: any) {
    console.error("Google Sheets upload error:", error);
    return NextResponse.json(
      {
        error: error.message || "Failed to upload to Google Sheets",
        details: error.response?.data || null,
      },
      { status: 500 }
    );
  }
}
