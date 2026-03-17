import { Injectable } from '@nestjs/common';
import { chromium } from 'playwright';
import {
  buildRecipeHtml,
  type RecipePdfData,
} from './recipe-pdf.template';

// A5: 210mm height, 10mm top + 10mm bottom margins = 190mm content per page
// 190mm * 96dpi / 25.4mm ≈ 718px
const PAGE_CONTENT_HEIGHT_PX = (190 * 96) / 25.4;

@Injectable()
export class PdfService {
  async generateRecipePdf(recipe: RecipePdfData): Promise<Buffer> {
    const html = buildRecipeHtml(recipe);

    const browser = await chromium.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    try {
      const page = await browser.newPage();

      // Match viewport to A5 so layout matches PDF
      await page.setViewportSize({
        width: Math.round((148 * 96) / 25.4),
        height: Math.round((210 * 96) / 25.4),
      });

      await page.setContent(html, {
        waitUntil: 'networkidle',
      });

      // Wait for fonts to load
      await page.evaluate(async () => {
        if (document.fonts?.ready) {
          await document.fonts.ready;
        }
      });

      // Hide dividers that fall at page breaks
      await page.evaluate((pageHeight: number) => {
        const dividers = document.querySelectorAll('[data-pdf-divider]');
        const threshold = 5;

        dividers.forEach((el) => {
          const rect = el.getBoundingClientRect();
          const top = rect.top + window.scrollY;

          const pageIndex = Math.floor(top / pageHeight);
          const pageStart = pageIndex * pageHeight;

          // Hide if at the top of a page (except first page)
          if (pageIndex > 0 && Math.abs(top - pageStart) < threshold) {
            (el as HTMLElement).style.display = 'none';
          }
        });
      }, PAGE_CONTENT_HEIGHT_PX);

      const pdfBuffer = await page.pdf({
        format: 'A5',
        printBackground: true,
        preferCSSPageSize: true,
      });

      return Buffer.from(pdfBuffer);
    } finally {
      await browser.close();
    }
  }
}
