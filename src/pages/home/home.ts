import { Component, Input, ElementRef, ViewChild} from '@angular/core';
import { NavController, MenuController, NavParams, Platform, Nav } from 'ionic-angular';
import { DocumentViewer, DocumentViewerOptions } from '@ionic-native/document-viewer';
import { FileOpener } from '@ionic-native/file-opener';

// COMPONENTS IMPORTS

import { LoginPage } from '../login/login';
import { Test1Page } from './../test1/test1';

import { PDFJS as PDFJSViewer } from 'pdfjs-dist/webpack';

@Component({
	selector: 'page-home',
	templateUrl: 'home.html',
	inputs: ['menuButton']
})
export class HomePage {
	menuButton: boolean;

	pdfDocument: PDFJSViewer.PDFDocumentProxy;
	PDFJSViewer: PDFJSViewer = PDFJSViewer;
	pageNumber: number;
	pageContainerUnique = {
		width: 0 as number,
		height: 0 as number,
		element: null as HTMLElement,
		canvas: null as HTMLCanvasElement,
		textContainer: null as HTMLElement,
		canvasWrapper: null as HTMLElement
	}
	@ViewChild('pageContainer') pageContainerRef: ElementRef;
	@ViewChild('viewer') viewerRef: ElementRef;
	@ViewChild('canvas') canvasRef: ElementRef;
	@ViewChild('canvasWrapper') canvasWrapperRef: ElementRef;
	@ViewChild('textContainer') textContainerRef: ElementRef;



	@Input('stringTest') stringTest: any;
	@ViewChild(Nav) nav: Nav;
	isHomeNav: boolean = true;
	constructor(private menu: MenuController, private document: DocumentViewer, public navCtrl: NavController, private pf: Platform, private fileOpener: FileOpener) {

		console.log(this.menuButton)
		setTimeout(() => {
			console.log('home log', this.menuButton);
			if (this.menuButton !== undefined) {

				this.isHomeNav = this.menuButton;
			}
		}, 1000);

	}


	ionViewDidLoad() {
		this.pageContainerUnique.element = this.pageContainerRef.nativeElement as HTMLElement;
		this.pageContainerUnique.canvasWrapper = this.canvasWrapperRef.nativeElement as HTMLCanvasElement;
		this.pageContainerUnique.canvas = this.canvasRef.nativeElement as HTMLCanvasElement;
		this.pageContainerUnique.textContainer = this.textContainerRef.nativeElement as HTMLCanvasElement;
		this.loadPdf('../../assets/test1.pdf');
	}


	loadPdf(pdfPath: string): Promise<boolean> {
		return PDFJSViewer.getDocument(pdfPath)
			.then(pdf => {
				this.pdfDocument = pdf;
				console.log("pdf loaded:"); console.dir(this.pdfDocument);
				return this.loadPage(1);
			}).then((pdfPage) => {
				console.dir(pdfPage);
			}).catch(e => {
				console.error(e);
				return false;
			});
	}

	loadPage(pageNum) {
		console.log(pageNum);
		this.pageNumber = pageNum;
		let pdfPage: PDFJSViewer.PDFPageProxy;

		return this.pdfDocument.getPage(pageNum).then(thisPage => {
			pdfPage = thisPage;
			return this.renderOnePage(pdfPage);
		}).then(() => {
			return pdfPage;
		});

	} // loadpage()


	async renderOnePage(pdfPage: PDFJSViewer.PDFPageProxy) {

		let textContainer: HTMLElement;
		let canvas: HTMLCanvasElement;
		let wrapper: HTMLElement;

		let canvasContext: CanvasRenderingContext2D;
		let page: HTMLElement

		page = this.pageContainerUnique.element;
		textContainer = this.pageContainerUnique.textContainer;
		canvas = this.pageContainerUnique.canvas;
		wrapper = this.pageContainerUnique.canvasWrapper;

		canvasContext = canvas.getContext('2d') as CanvasRenderingContext2D;
		canvasContext.imageSmoothingEnabled = false;
		canvasContext.webkitImageSmoothingEnabled = false;
		canvasContext.mozImageSmoothingEnabled = false;
		canvasContext.oImageSmoothingEnabled = false;

		let viewport = pdfPage.getViewport(1) as PDFJSViewer.PDFPageViewport;

		canvas.width = viewport.width;
		canvas.height = viewport.height;
		page.style.width = `${viewport.width}px`;
		page.style.height = `${viewport.height}px`;
		wrapper.style.width = `${viewport.width}px`;
		wrapper.style.height = `${viewport.height}px`;
		textContainer.style.width = `${viewport.width}px`;
		textContainer.style.height = `${viewport.height}px`;

		//fix for 4K
		if (window.devicePixelRatio > 1) {
			let canvasWidth = canvas.width;
			let canvasHeight = canvas.height;

			canvas.width = canvasWidth * window.devicePixelRatio;
			canvas.height = canvasHeight * window.devicePixelRatio;
			canvas.style.width = canvasWidth + "px";
			canvas.style.height = canvasHeight + "px";

			canvasContext.scale(window.devicePixelRatio, window.devicePixelRatio);
		}

		// THIS RENDERS THE PAGE !!!!!!
		let renderTask: PDFJSViewer.PDFRenderTask = pdfPage.render({
			canvasContext,
			viewport
		});

		let container = textContainer;

		return renderTask.then(() => {
			//console.error("I WORK JUST UNTIL HERE");
			return pdfPage.getTextContent();

		}).then((textContent) => {

			let textLayer: HTMLElement;


			textLayer = this.pageContainerUnique.textContainer


			while (textLayer.lastChild) {
				textLayer.removeChild(textLayer.lastChild);
			}

			this.PDFJSViewer.renderTextLayer({
				textContent,
				container,
				viewport,
				textDivs: []
			});

			return true;
		});

	}

	closeMenu() {
		this.isHomeNav = false;

	}

	itemSelected() {
		console.log("selected");

	}

	itemSelect() {

		let options: DocumentViewerOptions = {
			title: 'My PDF'
		}
		this.pf.ready().then(() => {
			// this.document.viewDocument('./test1.pdf', 'application/pdf', options)
			console.log("function call")
			this.fileOpener.open('../../assets/test1.pdf', 'application/pdf')
				.then(() => console.log('File is opened'))
				.catch(e => console.log('Error openening file', e));

		})
		// this.navCtrl.push(Test1Page)
	}

	nextPage() {
		this.pageNumber = this.pageNumber+1;
		console.log("nextPage ", this.pageNumber);
		this.loadPage(this.pageNumber)
		
	}

	previousPage() {
		this.pageNumber = this.pageNumber-1;
		console.log("nextPage ", this.pageNumber);
		this.loadPage(this.pageNumber)
	}

}
