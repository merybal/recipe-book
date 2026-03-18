import { Injectable } from '@nestjs/common';
import { chromium } from 'playwright';
import {
  buildRecipeHtml,
  type RecipePdfData,
} from './recipe-pdf.template';

// A5: 210mm height, 10mm top + 10mm bottom margins = 190mm content per page
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

      // Emulate print media so layout matches PDF
      await page.emulateMedia({ media: 'print' });

      await page.setContent(html, {
        waitUntil: 'networkidle',
      });

      await page.evaluate(async () => {
        if (document.fonts?.ready) await document.fonts.ready;
      });

      // Hide dividers at page boundaries (top or bottom of a page)
      await page.evaluate((pageHeight: number) => {
        const dividers = document.querySelectorAll('[data-pdf-divider]');
        const threshold = 15;

        dividers.forEach((el) => {
          const rect = el.getBoundingClientRect();
          const top = rect.top + window.scrollY;
          const bottom = top + rect.height;

          let hide = false;
          for (let i = 1; i < 20; i++) {
            const boundary = i * pageHeight;
            if (
              Math.abs(top - boundary) < threshold ||
              Math.abs(bottom - boundary) < threshold
            ) {
              hide = true;
              break;
            }
          }
          if (hide) (el as HTMLElement).style.display = 'none';
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
