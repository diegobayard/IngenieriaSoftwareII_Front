import { Injectable } from '@angular/core';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { Turno } from './model/turno';


@Injectable({
  providedIn: 'root'
})
export class PdfGeneratorService {

  constructor() { 
    pdfMake.vfs = pdfFonts.pdfMake.vfs;
  }

  generatePdf(turno:Turno): void {
    const documentDefinition = {
      content: [
        { text: 'VIKINGS BARBER SHOP', style: 'h1', alignment: 'center' },
        { text: '\n\n\n\n', alignment: 'center' }, // Salto de línea
        { text: 'Turno Confirmado!', style: 'header', alignment: 'center' },
        { text: '\n', alignment: 'center' }, // Salto de línea
        { text: `Usuario: ${turno.username}`, style: 'subheader', alignment: 'center' },
        { text: `Email: ${turno.email}`, style: 'subheader', alignment: 'center' },
        { text: `Fecha: ${turno.dia}/${turno.mes}`, style: 'subheader', alignment: 'center' },
        { text: `Horario: ${turno.hora}Hs`, style: 'subheader', alignment: 'center' },
        { text: `Barbero: ${turno.barbero}`, style: 'subheader', alignment: 'center' },
        { text: '\n\nGracias por elegirnos!', style: 'header', alignment: 'center' },
        { text: '\n\nEl ticket lo puedo ver en cualquier momento en “Perfil” / ”Tickets” .   Si desea cancelar ir a “Perfil” / ”Tickets” y la lista de tickets busca el turno   y tiene botón Cancelar.', style: 'subheader', alignment: 'center' } // Doble salto de línea antes del agradecimiento
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true
        },
        h1: {
          fontSize: 25,
          bold: true
        },
        subheader: {
          fontSize: 14
        }
      }
    };

    const pdfDocGenerator = pdfMake.createPdf(documentDefinition);
    pdfDocGenerator.getDataUrl((dataUrl) => {
      const targetElement = document.getElementById('pdfViewer');
      if (targetElement) {
        targetElement.innerHTML = `<iframe src="${dataUrl}" style="width:100%; height:600px;"></iframe>`;
      }
    });
    //pdfMake.createPdf(documentDefinition).open();
  }

  generatePdf2(turno:Turno): void {
    const documentDefinition = {
      content: [
        { text: 'VIKINGS BARBER SHOP', style: 'h1', alignment: 'center' },
        { text: '\n\n\n\n', alignment: 'center' }, // Salto de línea
        { text: 'Turno Confirmado!', style: 'header', alignment: 'center' },
        { text: '\n', alignment: 'center' }, // Salto de línea
        { text: `Usuario: ${turno.username}`, style: 'subheader', alignment: 'center' },
        { text: `Email: ${turno.email}`, style: 'subheader', alignment: 'center' },
        { text: `Fecha: ${turno.dia}/${turno.mes}`, style: 'subheader', alignment: 'center' },
        { text: `Horario: ${turno.hora}Hs`, style: 'subheader', alignment: 'center' },
        { text: `Barbero: ${turno.barbero}`, style: 'subheader', alignment: 'center' },
        { text: '\n\nGracias por elegirnos!', style: 'header', alignment: 'center' },
        { text: '\n\nEl ticket lo puedo ver en cualquier momento en “Perfil” / ”Tickets” .   Si desea cancelar ir a “Perfil” / ”Tickets” y la lista de tickets busca el turno   y tiene botón Cancelar.', style: 'subheader', alignment: 'center' } // Doble salto de línea antes del agradecimiento
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true
        },
        h1: {
          fontSize: 25,
          bold: true
        },
        subheader: {
          fontSize: 14
        }
      }
    };

    pdfMake.createPdf(documentDefinition).open();

  }

}
