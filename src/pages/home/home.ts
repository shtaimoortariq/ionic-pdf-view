// import { Component, Input, ElementRef, ViewChild } from '@angular/core';
// import { NavController, MenuController, NavParams, Platform, Nav } from 'ionic-angular';
// import { DocumentViewer, DocumentViewerOptions } from '@ionic-native/document-viewer';
// import { FileOpener } from '@ionic-native/file-opener';

// // COMPONENTS IMPORTS

// import { LoginPage } from '../login/login';
// import { Test1Page } from './../test1/test1';

// import { PDFJS as PDFJSViewer } from 'pdfjs-dist/webpack';
// import { AudioProvider } from 'ionic-audio';



// @Component({
// 	selector: 'page-home',
// 	templateUrl: 'home.html',
// 	inputs: ['menuButton']
// })
// export class HomePage {
// 	menuButton: boolean;
// 	selectedTrack;
// 	pdfDocument: PDFJSViewer.PDFDocumentProxy;
// 	PDFJSViewer: PDFJSViewer = PDFJSViewer;
// 	pageNumber: number;
// 	pageContainerUnique = {
// 		width: 0 as number,
// 		height: 0 as number,
// 		element: null as HTMLElement,
// 		canvas: null as HTMLCanvasElement,
// 		textContainer: null as HTMLElement,
// 		canvasWrapper: null as HTMLElement
// 	}
// 	@ViewChild('pageContainer') pageContainerRef: ElementRef;
// 	@ViewChild('viewer') viewerRef: ElementRef;
// 	@ViewChild('canvas') canvasRef: ElementRef;
// 	@ViewChild('canvasWrapper') canvasWrapperRef: ElementRef;
// 	@ViewChild('textContainer') textContainerRef: ElementRef;



// 	@Input('stringTest') stringTest: any;
// 	@ViewChild(Nav) nav: Nav;
// 	isHomeNav: boolean = true;
// 	myTracks: any[];
// 	allTracks: any[];

// 	constructor(private menu: MenuController, private document: DocumentViewer, public navCtrl: NavController, private pf: Platform, private fileOpener: FileOpener, private _audioProvider: AudioProvider) {

// 		console.log(this.menuButton)
// 		setTimeout(() => {
// 			console.log('home log', this.menuButton);
// 			if (this.menuButton !== undefined) {

// 				this.isHomeNav = this.menuButton;
// 			}
// 		}, 1000);

// 		this.myTracks = [{
// 			src: 'https://archive.org/download/JM2013-10-05.flac16/V0/jm2013-10-05-t12-MP3-V0.mp3',
// 			artist: 'John Mayer',
// 			title: 'Why Georgia',
// 			art: 'img/johnmayer.jpg',
// 			preload: 'metadata' // tell the plugin to preload metadata such as duration for this track, set to 'none' to turn off
// 		},
// 		{
// 			src: 'https://archive.org/download/JM2013-10-05.flac16/V0/jm2013-10-05-t30-MP3-V0.mp3',
// 			artist: 'John Mayer',
// 			title: 'Who Says',
// 			art: 'img/johnmayer.jpg',
// 			preload: 'metadata' // tell the plugin to preload metadata such as duration for this track,  set to 'none' to turn off
// 		}];

// 	}


// 	ionViewDidLoad() {
// 		this.pageContainerUnique.element = this.pageContainerRef.nativeElement as HTMLElement;
// 		this.pageContainerUnique.canvasWrapper = this.canvasWrapperRef.nativeElement as HTMLCanvasElement;
// 		this.pageContainerUnique.canvas = this.canvasRef.nativeElement as HTMLCanvasElement;
// 		this.pageContainerUnique.textContainer = this.textContainerRef.nativeElement as HTMLCanvasElement;
// 		this.loadPdf('../../assets/test1.pdf');
// 	}


// 	ngAfterContentInit() {     
// 		// get all tracks managed by AudioProvider so we can control playback via the API
// 		this.allTracks = this._audioProvider.tracks; 
// 	  }

// 	  playSelectedTrack() {
// 		  console.log("playSelectedTrack()");
// 		// use AudioProvider to control selected track 
// 		this._audioProvider.play(this.selectedTrack);
// 	  }

// 	  pauseSelectedTrack() {
// 		console.log("pauseSelectedTrack()");
// 		 // use AudioProvider to control selected track 
// 		 this._audioProvider.pause(this.selectedTrack);
// 	  }

// 	  onTrackFinished(track: any) {
// 		console.log('Track finished', track)
// 	  } 

// 	loadPdf(pdfPath: string): Promise<boolean> {
// 		return PDFJSViewer.getDocument(pdfPath)
// 			.then(pdf => {
// 				this.pdfDocument = pdf;
// 				console.log("pdf loaded:"); console.dir(this.pdfDocument);
// 				return this.loadPage(1);
// 			}).then((pdfPage) => {
// 				console.dir(pdfPage);
// 			}).catch(e => {
// 				console.error(e);
// 				return false;
// 			});
// 	}

// 	loadPage(pageNum) {
// 		console.log(pageNum);
// 		this.pageNumber = pageNum;
// 		let pdfPage: PDFJSViewer.PDFPageProxy;

// 		return this.pdfDocument.getPage(pageNum).then(thisPage => {
// 			pdfPage = thisPage;
// 			return this.renderOnePage(pdfPage);
// 		}).then(() => {
// 			return pdfPage;
// 		});

// 	} // loadpage()


// 	async renderOnePage(pdfPage: PDFJSViewer.PDFPageProxy) {

// 		let textContainer: HTMLElement;
// 		let canvas: HTMLCanvasElement;
// 		let wrapper: HTMLElement;

// 		let canvasContext: CanvasRenderingContext2D;
// 		let page: HTMLElement

// 		page = this.pageContainerUnique.element;
// 		textContainer = this.pageContainerUnique.textContainer;
// 		canvas = this.pageContainerUnique.canvas;
// 		wrapper = this.pageContainerUnique.canvasWrapper;

// 		canvasContext = canvas.getContext('2d') as CanvasRenderingContext2D;
// 		canvasContext.imageSmoothingEnabled = false;
// 		canvasContext.webkitImageSmoothingEnabled = false;
// 		canvasContext.mozImageSmoothingEnabled = false;
// 		canvasContext.oImageSmoothingEnabled = false;

// 		let viewport = pdfPage.getViewport(1) as PDFJSViewer.PDFPageViewport;

// 		canvas.width = viewport.width;
// 		canvas.height = viewport.height;
// 		page.style.width = `${viewport.width}px`;
// 		page.style.height = `${viewport.height}px`;
// 		wrapper.style.width = `${viewport.width}px`;
// 		wrapper.style.height = `${viewport.height}px`;
// 		textContainer.style.width = `${viewport.width}px`;
// 		textContainer.style.height = `${viewport.height}px`;

// 		//fix for 4K
// 		if (window.devicePixelRatio > 1) {
// 			let canvasWidth = canvas.width;
// 			let canvasHeight = canvas.height;

// 			canvas.width = canvasWidth * window.devicePixelRatio;
// 			canvas.height = canvasHeight * window.devicePixelRatio;
// 			canvas.style.width = canvasWidth + "px";
// 			canvas.style.height = canvasHeight + "px";

// 			canvasContext.scale(window.devicePixelRatio, window.devicePixelRatio);
// 		}

// 		// THIS RENDERS THE PAGE !!!!!!
// 		let renderTask: PDFJSViewer.PDFRenderTask = pdfPage.render({
// 			canvasContext,
// 			viewport
// 		});

// 		let container = textContainer;

// 		return renderTask.then(() => {
// 			//console.error("I WORK JUST UNTIL HERE");
// 			return pdfPage.getTextContent();

// 		}).then((textContent) => {

// 			let textLayer: HTMLElement;


// 			textLayer = this.pageContainerUnique.textContainer


// 			while (textLayer.lastChild) {
// 				textLayer.removeChild(textLayer.lastChild);
// 			}

// 			this.PDFJSViewer.renderTextLayer({
// 				textContent,
// 				container,
// 				viewport,
// 				textDivs: []
// 			});

// 			return true;
// 		});

// 	}

// 	closeMenu() {
// 		this.isHomeNav = false;

// 	}

// 	itemSelected() {
// 		console.log("selected");

// 	}

// 	itemSelect() {

// 		let options: DocumentViewerOptions = {
// 			title: 'My PDF'
// 		}
// 		this.pf.ready().then(() => {
// 			// this.document.viewDocument('./test1.pdf', 'application/pdf', options)
// 			console.log("function call")
// 			this.fileOpener.open('../../assets/test1.pdf', 'application/pdf')
// 				.then(() => console.log('File is opened'))
// 				.catch(e => console.log('Error openening file', e));

// 		})
// 		// this.navCtrl.push(Test1Page)
// 	}

// 	nextPage() {
// 		this.pageNumber = this.pageNumber + 1;
// 		console.log("nextPage ", this.pageNumber);
// 		this.loadPage(this.pageNumber)

// 	}

// 	previousPage() {
// 		this.pageNumber = this.pageNumber - 1;
// 		console.log("nextPage ", this.pageNumber);
// 		this.loadPage(this.pageNumber)
// 	}

// }






import { Component, Input, ElementRef, ViewChild } from '@angular/core';
import { NavController, MenuController, NavParams, Platform, Nav } from 'ionic-angular';
import { DocumentViewer, DocumentViewerOptions } from '@ionic-native/document-viewer';
import { FileOpener } from '@ionic-native/file-opener';
import { DomSanitizer } from '@angular/platform-browser';
import { Http } from '@angular/http';
import { File } from '@ionic-native/file';
import { AngularFireStorage } from 'angularfire2/storage';

// COMPONENTS IMPORTS
import { LoginPage } from '../login/login';
import { Test1Page } from './../test1/test1';
import { AudioProvider } from 'ionic-audio';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/timeout';
import { Observable } from 'rxjs/Observable';
import { log } from 'util';
import { ITrackConstraint } from 'ionic-audio';

@Component({
	selector: 'page-home',
	templateUrl: 'home.html',
	inputs: ['menuButton']
})
export class HomePage {
	profileUrl: Observable<any>;
	menuButton: boolean;
	audioIndex;
	pageNumber: number;
	pdfSrc: string = 'assets/test1.pdf';
	showList = true;
	bookLocation;
	prefixPic: any = "P00";
	currentPic = 1;
	bookName;
	currentBookIndex;
	myTracks: any[];
	allTracks: any[];
	selectedTrack: any;
	showplay: boolean = true;
	styleExp;


	books = [
		{ name: "Book 1", length1: 18, img: "assets/bookTitle/book 1.png" }, { name: "Book 2", length1: 18 }, { name: "Book 3", length1: 18 }, { name: "Book 4", length1: 18 }, { name: "Book 5", length1: 18 }, { name: "Book 6", length1: 18 }, { name: "Book 7", length1: 18 }, { name: "Book 8", length1: 15 }, { name: "Book 9", length1: 18 }, { name: "Book 10", length1: 18 },
		{ name: "Book 11", length1: 18 }, { name: "Book 12", length1: 18 }, { name: "Book 13", length1: 18 }, { name: "Book 14", length1: 18 }, { name: "Book 15", length1: 14 }, { name: "Book 16", length1: 14 }, { name: "Book 17", length1: 14 }, { name: "Book 18", length1: 14 }, { name: "Book 19", length1: 14 }, { name: "Book 20", length1: 14 },
		{ name: "Book 21", length1: 14 }, { name: "Book 22", length1: 14 }, { name: "Book 23", length1: 14 }, { name: "Book 24", length1: 14 }, { name: "Book 25", length1: 14 }, { name: "Book 26", length1: 14 }, { name: "Book 27", length1: 14 }, { name: "Book 28", length1: 14 }, { name: "Book 29", length1: 14 }, { name: "Book 30", length1: 14 },
		{ name: "Book 31", length1: 14 }, { name: "Book 32", length1: 14 }, { name: "Book 33", length1: 14 }, { name: "Book 34", length1: 14 }, { name: "Book 35", length1: 14 }, { name: "Book 36", length1: 15 }, { name: "Book 37", length1: 14 }, { name: "Book 38", length1: 14 }, { name: "Book 39", length1: 14 }, { name: "Book 40", length1: 14 },
		{ name: "Book 41", length1: 15 }, { name: "Book 42", length1: 14 }, { name: "Book 43", length1: 14 }, { name: "Book 44", length1: 15 } ,     { name: "Book 45", length1: 38 }
	]

	booksSound = [
		['https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book1%2F0.mp3?alt=media&token=0b84364b-3ba9-4ada-9075-c52177d36ab0', '','https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book1%2F1.mp3?alt=media&token=f10bff45-9636-4f2f-ba4f-2fcc4f0fd72f', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book1%2F2.mp3?alt=media&token=e7789882-9c38-45e1-ac4a-93f5df18f83c', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book1%2F3.mp3?alt=media&token=3e1d2478-f2c7-41e3-b0b5-0c6437ba32fc', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book1%2F4.mp3?alt=media&token=0eb96957-032e-44c0-8e1a-4d044c11b4f3', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book1%2F5.mp3?alt=media&token=b1b817b9-a3f1-4ae6-8eaa-b2ab1da64e5b', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book1%2F6.mp3?alt=media&token=33ef2081-b6ef-49db-9390-4a7a44a78f49', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book1%2F7.mp3?alt=media&token=a33fe1dc-d52e-492e-80c3-9261689e78b0', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book1%2F8.mp3?alt=media&token=4e3ff60c-a685-4f15-9d50-c0e72e5ff6da', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book1%2F9.mp3?alt=media&token=7e0c5538-e158-4ce6-bcd7-278a0fa36af5', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book1%2F10.mp3?alt=media&token=ed5efe2c-5cf6-4ac9-aee2-039b7994e0b4', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book1%2F11.mp3?alt=media&token=e4c6c251-61bc-44a4-bab4-4376085d2b4a', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book1%2F12.mp3?alt=media&token=cab5831e-7cc6-4e29-bfc3-cc25235d6a5e', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book1%2F13.mp3?alt=media&token=88103c29-0709-48ee-9f72-533c50be2b0e', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book1%2F14.mp3?alt=media&token=bafb4ad5-7a4f-47a6-aafe-b56872f96017', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book1%2F15.mp3?alt=media&token=fb2913b0-3a19-4c2b-9b5b-1d0ee1441aa3'],
		['https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book2%2F0.mp3?alt=media&token=b7b84556-d1bf-4ba2-9235-a4ae95600d49', '','https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book2%2F1.mp3?alt=media&token=6d0e889e-9801-401a-a226-6b9622df0ce4', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book2%2F3.mp3?alt=media&token=f094d176-5551-4ba6-9c62-b45dbc0aa347', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book2%2F4.mp3?alt=media&token=a4d8ee65-90b5-4b80-9752-54d9870bad66', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book2%2F5.mp3?alt=media&token=57aaf896-94bd-4c9b-8324-914fb6f98c31', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book2%2F6.mp3?alt=media&token=8350a345-94d0-4fa8-9bab-0603e9bb0772', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book2%2F7.mp3?alt=media&token=70653f42-2899-4275-8d42-47f82123660e', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book2%2F8.mp3?alt=media&token=dad76b48-7f6e-42b9-9116-e19d34354d0c', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book2%2F9.mp3?alt=media&token=6190d2d5-b136-43c1-86e0-f3f2d8f182e6', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book2%2F10.mp3?alt=media&token=35538a78-39ac-4f55-a7e9-2e32e092840f', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book2%2F11.mp3?alt=media&token=67efb851-1197-4a78-b79a-e66ce7e9f286', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book2%2F13.mp3?alt=media&token=9f26c3fb-acf8-46de-aca3-51051fae449c', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book2%2F13.mp3?alt=media&token=9f26c3fb-acf8-46de-aca3-51051fae449c', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book2%2F14.mp3?alt=media&token=7da6f772-3e1a-47c8-981e-a4ca35cd7904', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book2%2F14.mp3?alt=media&token=7da6f772-3e1a-47c8-981e-a4ca35cd7904'],
		['https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book3%2F0.mp3?alt=media&token=afd370c6-440d-431e-9dd6-bb2b8bc654c2', '','https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book3%2F1.mp3?alt=media&token=ac9f5682-1d21-4e3a-8a88-4ba15397bc51', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book3%2F2.mp3?alt=media&token=d243d54d-a839-4468-b6e5-e0437ad0b33d', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book3%2F3.mp3?alt=media&token=61215183-3c1f-481c-8b8c-90233081a10f', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book3%2F4.mp3?alt=media&token=c3799d00-b016-45a7-81ea-a3b99363d1ef', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book3%2F5.mp3?alt=media&token=37de5f0d-3acc-43cf-98be-7551be437647', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book3%2F6.mp3?alt=media&token=b6120405-7fce-48fe-98e7-2f12b997505b', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book3%2F7.mp3?alt=media&token=35c8f86d-ee0d-4221-8e45-8568b437501a', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book3%2F8.mp3?alt=media&token=3383113a-0325-4ab5-850d-450ded05733a', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book3%2F9.mp3?alt=media&token=6f2b3489-e1eb-48d0-998e-6ab2919bfc21', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book3%2F10.mp3?alt=media&token=aa3d5b36-4b80-436f-ad12-436c0d636c84', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book3%2F11.mp3?alt=media&token=04b4ca4a-947d-4de2-8182-ae7197ba5783', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book3%2F12.mp3?alt=media&token=fcb860d1-f62a-43dc-b723-eb7e3c3240d6', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book3%2F13.mp3?alt=media&token=7108211d-2b4e-4785-a152-cf397a72c413', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book3%2F14.mp3?alt=media&token=1eb189e3-5304-4106-b13a-638ab8197167', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book3%2F15.mp3?alt=media&token=bab26aa8-9502-4cea-8aa8-970dd4553229'],
		['https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book4%2F0.mp3?alt=media&token=e9f5eda4-538c-45c7-89fc-64ffc221c14d', '', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book4%2F1.mp3?alt=media&token=017ee8ac-1019-43a7-9b8e-6cdaa0a854c2', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book4%2F2.mp3?alt=media&token=5e8ae9fe-401e-46b5-ae3a-d5584690cc85', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book4%2F3.mp3?alt=media&token=731c9541-7d6a-4777-9171-1f37a3250ccb', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book4%2F4.mp3?alt=media&token=35b9fd22-247a-4c73-988e-fc2c17d162a1', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book4%2F5.mp3?alt=media&token=2d6aa1fa-4758-4944-9c29-823a9a893433', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book4%2F6.mp3?alt=media&token=5f57fdec-e67e-4945-8f8a-fc024a46f16b', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book4%2F7.mp3?alt=media&token=ff099b0d-e086-4352-8c2d-3bb5629eff24', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book4%2F8.mp3?alt=media&token=eb11a34a-5961-4192-92a5-5ae20e0ab830', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book4%2F9.mp3?alt=media&token=d7bcc456-a48d-4cc5-b58d-0de41120083b', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book4%2F10.mp3?alt=media&token=24ef005c-d922-4929-907a-e96b18b0e021', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book4%2F11.mp3?alt=media&token=7b9dd54c-60b2-4da5-b310-cc72275fbaf9', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book4%2F12.mp3?alt=media&token=6874b008-e734-427d-8892-b663316d2de7', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book4%2F13.mp3?alt=media&token=db13455f-75aa-4ebe-bf53-693bf9466c94', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book4%2F14.mp3?alt=media&token=357241d2-8463-47e0-8d03-5366518e6bc5', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book4%2F15.mp3?alt=media&token=1dfe71a0-4286-4bad-ae19-7f63f50ff978'],
		['https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book5%2F0.mp3?alt=media&token=cc6492f6-faf2-4188-911c-0a4bb7e081de', '','https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book5%2F1.mp3?alt=media&token=9f00ed10-eb42-4cbf-af44-866a71eb647b', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book5%2F2.mp3?alt=media&token=b02cde4b-a5d1-4404-8253-388f1001742c', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book5%2F3.mp3?alt=media&token=bd3f125a-899f-4787-a994-2a320872fb8c', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book5%2F4.mp3?alt=media&token=31237c84-f17d-46fe-a494-b618a65a28ef', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book5%2F5.mp3?alt=media&token=4c36ccec-64e9-499a-9b16-03a228bf5690', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book5%2F6.mp3?alt=media&token=07af55dd-d86d-42f6-a0dc-48a78d708511', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book5%2F7.mp3?alt=media&token=07394ee6-23b3-48cf-b82e-43571f357f7b', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book5%2F8.mp3?alt=media&token=93b11ff4-97ff-4acd-be00-5db7633818d9', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book5%2F9.mp3?alt=media&token=55a5ab71-5e46-4f8d-bf4e-1a9e9c9d2d1e', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book5%2F10.mp3?alt=media&token=3d566c38-dd5d-46f3-8f1c-c648656c27a9', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book5%2F11.mp3?alt=media&token=9b9de71b-0785-4b9c-b5e2-bd5fb2124e1a', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book5%2F12.mp3?alt=media&token=247b354f-b902-4d29-b1d5-7198be31c154', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book5%2F13.mp3?alt=media&token=8a22f853-829a-4e16-8921-6286b003d48d', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book5%2F14.mp3?alt=media&token=ce95b51f-b5a7-4565-8e00-d0aa78d9b725', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book5%2F15.mp3?alt=media&token=1e37b792-6bd8-4a05-b790-22910e009337'],
		['https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book6%2F0.mp3?alt=media&token=989c2012-3624-4bd3-a77c-166b8ee832be', '','https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book6%2F1.mp3?alt=media&token=62d0fdb4-ee78-4145-a621-6a4b1f325735', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book6%2F2%20(2).mp3?alt=media&token=0e55627e-7c63-400f-a5fe-91f1c168c6a6', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book6%2F3.mp3?alt=media&token=8cc833fc-4f09-4074-a720-e2e480e17871', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book6%2F4.mp3?alt=media&token=46a0cc18-42fe-4c76-adcc-a052fac1b635', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book6%2F5.mp3?alt=media&token=331806d9-c191-43c9-ae9a-2c1e959ad27c', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book6%2F6.mp3?alt=media&token=b21aeecd-b062-4934-85e2-0d3e1c086def', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book6%2F7.mp3?alt=media&token=5a57fe6f-cd92-4194-9cfb-f6649801f12c', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book6%2F8.mp3?alt=media&token=b471a588-2c99-4d1c-92de-26537abbe907', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book6%2F9.mp3?alt=media&token=86f9cb80-97ca-4361-8cb5-a4c26280350a', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book6%2F10.mp3?alt=media&token=5270310f-0b2a-48c8-b93b-5fdc066195f5', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book6%2F11.mp3?alt=media&token=3f1320c7-85a3-4541-aed6-fd6e4010b02a', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book6%2F12.mp3?alt=media&token=f198daa1-2634-43d5-bb40-c1b9940c3819', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book6%2F13.mp3?alt=media&token=550eb7c9-5e37-4e6b-b1d4-4f19334348df', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book6%2F14.mp3?alt=media&token=671edd60-104d-4ffa-b888-f0640151b8e3', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book6%2F15.mp3?alt=media&token=5bf7dc5b-072f-4a8b-b3f8-042d32e5002e'],
		['https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book7%2F0.mp3?alt=media&token=30887c36-e2db-477d-99c4-c50d70dd9d09', '','https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book7%2F1.mp3?alt=media&token=d1a4510d-a2ce-42e7-81e1-f6b763a75c90', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book7%2F2.mp3?alt=media&token=8612f18d-67fd-43a2-a081-2885a59de03f', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book7%2F3.mp3?alt=media&token=217ab062-b88a-4fc7-a9b8-a3823083fcda', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book7%2F4.mp3?alt=media&token=334a8713-4adf-4e50-afb1-18a65e25d54c', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book7%2F5.mp3?alt=media&token=c5763df2-f4ea-4bf4-8f8a-69abd17425fd', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book7%2F6.mp3?alt=media&token=6207277d-a395-402f-a2a9-5a426ab106e1', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book7%2F7.mp3?alt=media&token=6960105f-5654-4669-8e1c-9fde136f8b02', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book7%2F8.mp3?alt=media&token=7ef4983c-c8c8-4b29-a298-0e62d8e75bca', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book7%2F9.mp3?alt=media&token=ab494ad2-4c6e-41f8-874e-0b407a3bd47e', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book7%2F10.mp3?alt=media&token=37d278d6-ed1b-4606-82ac-f3f1badbb245', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book7%2F11.mp3?alt=media&token=b75d12ce-91e6-45fd-8bcf-6eb0fbdb8103', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book7%2F12.mp3?alt=media&token=cb9a92f4-550e-42c6-b190-ee63d54ad382', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book7%2F13.mp3?alt=media&token=3ebe2a01-fcd9-4a55-ba6e-439299aa8ef8', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book7%2F14.mp3?alt=media&token=6d88fe2b-6f98-4be5-8660-cd3f9b183f43', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book7%2F15.mp3?alt=media&token=b9817fda-763e-4ee3-b0a5-592b3f2e5c3b'],
		['https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book8%2F0.mp3?alt=media&token=047de202-2408-4399-8a65-779ee8fefa0d', '','https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book8%2F01.mp3?alt=media&token=22e16784-48c7-48fe-a3ca-e03efadeb491', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book8%2F02.mp3?alt=media&token=b9d84367-78ae-4f59-b213-a89501494955', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book8%2F03.mp3?alt=media&token=a5213c53-ae9e-4ceb-b8eb-054fa3afb965', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book8%2F04.mp3?alt=media&token=3a001233-f160-4014-9cbb-f647b0006865', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book8%2F05.mp3?alt=media&token=8982e96b-8a70-448c-8acb-63d0b371f640', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book8%2F06.mp3?alt=media&token=4830470f-0c73-4bf6-be3d-9cdb1047a7ff', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book8%2F07.mp3?alt=media&token=044a122b-107d-4a48-b1f9-cd3020d2c874', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book8%2F08.mp3?alt=media&token=fe164a2b-0b2a-48cd-b145-0ed4ce1c6c38', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book8%2F09.mp3?alt=media&token=7a03747a-bcb5-4093-8095-1fb6cdcf975f', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book8%2F10.mp3?alt=media&token=273dd0bb-dd79-4a3c-bd94-101d29439296', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book8%2F11.mp3?alt=media&token=9fa60a69-c4da-492e-8a2a-35f34d9b735f', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book8%2F12.mp3?alt=media&token=dfea82bb-c7c8-41d2-8990-d15a45b6f748'],
		['https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book9%2F0.mp3?alt=media&token=b9844e0a-a8fb-4a39-8a3a-8ae8b469107d', '','https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book9%2F1.mp3?alt=media&token=5b6b3bee-4ce7-4956-a5ea-8306faa384c7', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book9%2F2.mp3?alt=media&token=f3b4dad8-9319-4ab6-b1c3-57511fdc4508', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book9%2F3.mp3?alt=media&token=ac4f1657-d800-48c1-b240-8e2980512070', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book9%2F4.mp3?alt=media&token=dcfa3f79-f0b0-4b73-9eb7-5df0065d2d59', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book9%2F5.mp3?alt=media&token=2c326708-6363-4933-9e64-9e16799325e1', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book9%2F6.mp3?alt=media&token=f99ac257-b412-4787-b0a5-c8a36b0f00ed', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book9%2F7.mp3?alt=media&token=d79ca67f-c884-4c40-b293-9f6571520ef8', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book9%2F8.mp3?alt=media&token=bd6ad1c9-296d-4d7c-abbc-3ae1dec05332', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book9%2F9.mp3?alt=media&token=a5844c73-00d2-4c39-b63a-831014b57ca8', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book9%2F10.mp3?alt=media&token=3ab105fd-0d63-4090-934a-54a7c2716d62', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book9%2F11.mp3?alt=media&token=cbb15cb9-4e16-4f39-8e40-ebb9fd9de29e', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book9%2F12.mp3?alt=media&token=23423601-e760-4bfd-bc35-7d6b2c0f88d2', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book9%2F13.mp3?alt=media&token=f3ac7fd0-7c20-4b42-ac22-90657697766f', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book9%2F14.mp3?alt=media&token=5cf6ec05-ba25-4e7a-8a9c-3af926348ddc', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book9%2F15.mp3?alt=media&token=6e33e301-631d-4001-8b28-25920b677b55'],
		['https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book10%2F0.mp3?alt=media&token=99d0dc00-ad2c-4648-ac68-9081ce02c126', '','https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book10%2F1.mp3?alt=media&token=b1c8ec2c-5d2d-4c9e-b975-9c8e5319908a', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book10%2F2.mp3?alt=media&token=b2c38516-28f2-455a-a5d0-150ebbd0724e', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book10%2F3.mp3?alt=media&token=72a13e7d-f483-49de-b3d3-eaeaf68c63bd', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book10%2F4.mp3?alt=media&token=4feecf10-83ad-41ea-ab04-f3f6d4430047', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book10%2F5.mp3?alt=media&token=eb0319b8-954d-40a0-9b63-4be0e2dff237', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book10%2F6.mp3?alt=media&token=90a67a42-6cf7-4db5-a347-fa84cb36f5ce', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book10%2F6.mp3?alt=media&token=90a67a42-6cf7-4db5-a347-fa84cb36f5ce', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book10%2F7.mp3?alt=media&token=1fd39a15-b703-44b8-a934-23bf64e3375a', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book10%2F8.mp3?alt=media&token=c995e576-8fc8-45a9-aaad-9be2820843f1', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book10%2F9.mp3?alt=media&token=090ed053-b0d1-49ef-b4dc-a9f1870fb2d8', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book10%2F10.mp3?alt=media&token=cb7b1ccd-956d-46eb-a8a1-d3226bedcf95', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book10%2F11.mp3?alt=media&token=b9fb47c3-db95-4c6f-b292-674758524162', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book10%2F12.mp3?alt=media&token=51ac7a8e-ea3d-4009-b053-baf902b3ac84', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book10%2F13.mp3?alt=media&token=56cb923f-5fc7-4f24-b6b3-13ed3f8681a6', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book10%2F14.mp3?alt=media&token=aa18e7dd-2cdd-44ad-be84-1afb85642edf', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book10%2F15.mp3?alt=media&token=babfea6b-3ed1-4928-835e-42fdca06678f'],
		['https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book11%2F0.mp3?alt=media&token=a4420e72-7f8d-4ac9-9661-8016fa167920', '','https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book11%2F1.mp3?alt=media&token=341ae4d5-b9f2-43bc-9c16-303a55af2919', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book11%2F3.mp3?alt=media&token=409f4b6f-3d0a-4776-8dcf-67c34b45b59a', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book11%2F4.mp3?alt=media&token=d11d00fa-f351-4fb8-a777-a40bc0029c81', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book11%2F5.mp3?alt=media&token=62716a48-edc5-4437-beba-29c8f7ad23af', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book11%2F6.mp3?alt=media&token=54ee5cae-81b7-44a2-81cb-a9a33bd586fa', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book11%2F7.mp3?alt=media&token=9f8cbe87-2508-4c52-9d22-8fe33e728bc7', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book11%2F8.mp3?alt=media&token=33ff8684-70c2-4d89-a656-18592b6432c6', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book11%2F9.mp3?alt=media&token=99f28d67-075f-4cf0-9a0d-6479b95c22a7', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book11%2F10.mp3?alt=media&token=c40e330f-2a44-4c82-a5bc-1f7cf9afab4e', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book11%2F11.mp3?alt=media&token=8536c4d8-a0b6-42b7-af4e-ec9eb3f4a32e', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book11%2F12.mp3?alt=media&token=4a32ee21-2cc9-41db-adab-d39e01c0adc3', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book11%2F13.mp3?alt=media&token=a3aa0ac8-629d-4e66-a062-5c67c3161dbb', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book11%2F14-.mp3?alt=media&token=b716bbf9-3c0d-4e18-b722-dba355df90d6', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book11%2F15.mp3?alt=media&token=c560580e-51a8-4622-b5ef-929483cb2664'],
		['https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book11%2F0.mp3?alt=media&token=a4420e72-7f8d-4ac9-9661-8016fa167920', '','https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book11%2F1.mp3?alt=media&token=341ae4d5-b9f2-43bc-9c16-303a55af2919', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book11%2F3.mp3?alt=media&token=409f4b6f-3d0a-4776-8dcf-67c34b45b59a', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book11%2F4.mp3?alt=media&token=d11d00fa-f351-4fb8-a777-a40bc0029c81', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book11%2F5.mp3?alt=media&token=62716a48-edc5-4437-beba-29c8f7ad23af', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book11%2F6.mp3?alt=media&token=54ee5cae-81b7-44a2-81cb-a9a33bd586fa', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book11%2F7.mp3?alt=media&token=9f8cbe87-2508-4c52-9d22-8fe33e728bc7', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book11%2F8.mp3?alt=media&token=33ff8684-70c2-4d89-a656-18592b6432c6', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book11%2F9.mp3?alt=media&token=99f28d67-075f-4cf0-9a0d-6479b95c22a7', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book11%2F10.mp3?alt=media&token=c40e330f-2a44-4c82-a5bc-1f7cf9afab4e', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book11%2F11.mp3?alt=media&token=8536c4d8-a0b6-42b7-af4e-ec9eb3f4a32e', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book11%2F12.mp3?alt=media&token=4a32ee21-2cc9-41db-adab-d39e01c0adc3', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book11%2F13.mp3?alt=media&token=a3aa0ac8-629d-4e66-a062-5c67c3161dbb', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book11%2F14-.mp3?alt=media&token=b716bbf9-3c0d-4e18-b722-dba355df90d6', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book11%2F15.mp3?alt=media&token=c560580e-51a8-4622-b5ef-929483cb2664'],
		['https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book13%2F0.mp3?alt=media&token=cb66dfb2-5059-4ddf-9ba6-84a0f1f3d2e8', '','https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book13%2F1.mp3?alt=media&token=adb3d84b-d70e-4c6c-ad52-e70868871737', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book13%2F2.mp3?alt=media&token=8451f580-95de-4cd9-81c1-dc720794f816', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book13%2F3.mp3?alt=media&token=154b5ddd-a485-428b-835f-06ee8c3c99d4', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book13%2F4.mp3?alt=media&token=4f7fdbd1-4ce8-4dd3-bf12-77885ca61356', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book13%2F5.mp3?alt=media&token=6a653968-fb42-4168-9a52-33b13ebcf6d4', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book13%2F5.mp3?alt=media&token=6a653968-fb42-4168-9a52-33b13ebcf6d4', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book13%2F6.mp3?alt=media&token=14010e03-3ebd-4068-b5a5-38236300c9a9', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book13%2F5.mp3?alt=media&token=6a653968-fb42-4168-9a52-33b13ebcf6d4', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book13%2F6.mp3?alt=media&token=14010e03-3ebd-4068-b5a5-38236300c9a9', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book13%2F7.mp3?alt=media&token=ace582c5-edf6-4175-8cf5-f74403984aeb', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book13%2F7.mp3?alt=media&token=ace582c5-edf6-4175-8cf5-f74403984aeb', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book13%2F7.mp3?alt=media&token=ace582c5-edf6-4175-8cf5-f74403984aeb', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book13%2F7.mp3?alt=media&token=ace582c5-edf6-4175-8cf5-f74403984aeb', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book13%2F9.mp3?alt=media&token=e62c9f9b-04af-4a4a-a17b-d99abcbcba96', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book13%2F10.mp3?alt=media&token=b59267fe-8c3b-42fe-98b0-6ddee5869066', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book13%2F11.mp3?alt=media&token=6313b55a-b2d2-47a8-a7fa-b67bb9cabedd', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book13%2F12.mp3?alt=media&token=82a96fde-c801-4bc9-821b-d8a014d83074', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book13%2F13.mp3?alt=media&token=488a17ae-2ca1-4a57-b897-b8b5401a832e', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book13%2F14.mp3?alt=media&token=6c850274-2be2-48f1-bf66-51712b5b6910'],
		['https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book14%2F0.mp3?alt=media&token=652447d2-ca64-42d1-86d1-72b92853d93a', '','https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book14%2F1.mp3?alt=media&token=c6fec903-d23a-489a-8dc9-e8eb89e3e73c', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book14%2F2.mp3?alt=media&token=7431ac85-e8bc-4756-8460-9f92bbb3f568', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book14%2F3.mp3?alt=media&token=f2e8e42f-1c78-4191-99f3-fecc9cdbca88', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book14%2F4.mp3?alt=media&token=f8e04c58-6bd0-444d-a3f3-51e2fbfa75bf', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book14%2F5.mp3?alt=media&token=cb164fe1-bedd-44f2-9ca2-6afd2e50c099', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book14%2F6.mp3?alt=media&token=7d4099e6-85e1-45d1-b459-ef93adc50ec5', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book14%2F7.mp3?alt=media&token=3c3ac592-047a-4281-9cc1-cee03d1ccf78', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book14%2F8.mp3?alt=media&token=0c44e7f0-0072-4d22-85b4-5e56389cad9c', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book14%2F9.mp3?alt=media&token=ca539103-fded-459a-9585-2da453ff1b05', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book14%2F10.mp3?alt=media&token=05281e02-8a80-4ca7-a1b8-7eec4a53d890', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book14%2F11.mp3?alt=media&token=7b68957b-b80e-4cd2-aa2a-c940776775fc', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book14%2F12.mp3?alt=media&token=edd23c61-3a4b-426b-8f8b-c7d49e518c79', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book14%2F13.mp3?alt=media&token=f927d1ae-b174-4fa8-8f06-7836ff963112', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book14%2F14.mp3?alt=media&token=d178e089-9498-41ec-beb3-9fbf68e77452', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book14%2F15.mp3?alt=media&token=1b5e4e36-c6b5-4ae4-9c7f-5b0f6d6419db'],
		['https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book15%2F0.mp3?alt=media&token=0d40550a-147e-467a-8632-b4c3467359d7', '','https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book15%2F1.mp3?alt=media&token=9eac9fa0-d9d5-4abb-84a5-447c832c8884', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book15%2F2.mp3?alt=media&token=ad2371c1-f9b5-4e95-acda-c7c65282d911', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book15%2F3.mp3?alt=media&token=001ffb1a-6645-42e5-afea-5aecc1e92e5e', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book15%2F4.mp3?alt=media&token=a115c659-480d-4721-be6f-3d2e5d0643c4', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book15%2F5.mp3?alt=media&token=284d5219-a0f4-45f3-bec1-6ab7f7496ade', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book15%2F6.mp3?alt=media&token=63dd89ff-f36a-4bd2-8a54-1f961805b537', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book15%2F7.mp3?alt=media&token=1127dfc1-e619-46b2-86d6-93e36280893b', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book15%2F8.mp3?alt=media&token=c8549c32-e07f-4d50-b508-831ca5c064ee', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book15%2F9.mp3?alt=media&token=3d828065-dc20-4e24-9419-59b290d08df0', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book15%2F10.mp3?alt=media&token=1a65e596-08c2-49ee-88e5-cd75621885a7', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book15%2F11.mp3?alt=media&token=55aad052-cab8-4449-9577-ec59d10ae174'],
		['https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book16%2F0.mp3?alt=media&token=6daee83a-36d2-4ffa-91dd-7561cb35332c', '','https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book16%2F1.mp3?alt=media&token=7c299c0e-ab59-4817-a758-71e50a440d22', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book16%2F2.mp3?alt=media&token=45277790-2c11-4c6a-9caf-8117e5fa5201', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book16%2F3.mp3?alt=media&token=46dad6ab-1400-41db-a479-9b7472dd008f', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book16%2F4.mp3?alt=media&token=96d7b4c9-7852-4972-b779-ef42799a8b96', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book16%2F5.mp3?alt=media&token=b1374c4d-b7d6-44ec-80ac-f9add6fe402a', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book16%2F6.mp3?alt=media&token=b198248b-d019-4929-a401-7d3aa68c88d3', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book16%2F7.mp3?alt=media&token=e162c6a9-d195-41ca-9831-1b0b4fe7af2d', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book16%2F8.mp3?alt=media&token=78830542-7240-46e7-a76a-5a2b5f30bec2', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book16%2F9.mp3?alt=media&token=28bf5d29-0b7b-42a7-a2c4-5092c612be4e', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book16%2F10.mp3?alt=media&token=2eed435e-25c6-42ef-b221-17ff4bc22a76s', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book16%2F11.mp3?alt=media&token=4725997e-2f16-4bea-8c40-889bb1f7efb6'],
		['https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book17%2F0.mp3?alt=media&token=de77395f-7466-4bae-8f08-934c1ed27b01', '','https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book17%2F1.mp3?alt=media&token=c3d58ff6-ae27-4ea2-9dc7-8f3507fd2057', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book17%2F2.mp3?alt=media&token=5b187c43-54c5-47b9-8077-a2f7a518ba36', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book17%2F3.mp3?alt=media&token=bdd21eec-9878-417b-903f-845aae6ae0d9', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book17%2F3.mp3?alt=media&token=bdd21eec-9878-417b-903f-845aae6ae0d9', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book17%2F4.mp3?alt=media&token=2304cbda-6780-4afd-aa6b-8e1faa7d76d9', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book17%2F5.mp3?alt=media&token=1f192a7c-88c8-4599-bb0d-207c71971e8f', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book17%2F6.mp3?alt=media&token=24f235d7-f9e4-41c2-b81e-6e41113f3233', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book17%2F7.mp3?alt=media&token=baec01af-3d4d-41b0-bf57-b6f78bb59aee', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book17%2F8.mp3?alt=media&token=707e2ca6-7a85-420a-9ae2-0b960e8b17f2', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book17%2F9.mp3?alt=media&token=37849011-51c3-483e-9f79-91679dad4c6a', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book17%2F10.mp3?alt=media&token=695aaa95-cae5-44c9-a3da-d3d71250c97e', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book17%2F11.mp3?alt=media&token=6ed39e74-ab23-482c-b48c-34024e8d5021'],
		['https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book18%2F0.mp3?alt=media&token=897df7f0-f4d5-40c3-9954-144008f69b5d', '','https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book18%2F1.mp3?alt=media&token=a73c8083-200b-43e7-93ba-d3a8a7c9dfd8', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book18%2F2.mp3?alt=media&token=925ae5d2-39dc-4328-9ba5-6bb6b1eb1cab', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book18%2F3.mp3?alt=media&token=d3287c70-a551-43e9-9989-4c93885f6404', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book18%2F5.mp3?alt=media&token=b5a4e733-9a70-448d-810d-57acef80d334', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book18%2F5.mp3?alt=media&token=b5a4e733-9a70-448d-810d-57acef80d334', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book18%2F5.mp3?alt=media&token=b5a4e733-9a70-448d-810d-57acef80d334', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book18%2F7.mp3?alt=media&token=77164534-592e-4748-acaa-615cf2c5ec56', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book18%2F7.mp3?alt=media&token=77164534-592e-4748-acaa-615cf2c5ec56', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book18%2F7.mp3?alt=media&token=77164534-592e-4748-acaa-615cf2c5ec56', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book18%2F10.mp3?alt=media&token=947ce897-3ef6-40e9-8769-52ab12b58c42', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book18%2F11.mp3?alt=media&token=29acc92d-825f-4d3d-9569-b20cf8ed6ad2'],
		['https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book19%2F0.mp3?alt=media&token=bad875ef-d455-4a79-9de5-6ec0c9f44089', '','https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book19%2F1.mp3?alt=media&token=87aee05c-a39d-4683-a790-666dbad1ff99', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book19%2F2.mp3?alt=media&token=9285f2b0-99b1-4102-8cb6-6ef0d93c973d', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book19%2F2.mp3?alt=media&token=9285f2b0-99b1-4102-8cb6-6ef0d93c973d', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book19%2F4.mp3?alt=media&token=e594ef1c-1dfb-45b3-8c2a-3c04787fe7e3', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book19%2F4.mp3?alt=media&token=e594ef1c-1dfb-45b3-8c2a-3c04787fe7e3', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book19%2F6.mp3?alt=media&token=9b7d277b-3329-409a-91cc-f0ca7144a59e', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book19%2F7.mp3?alt=media&token=21057d0b-bd30-4654-aa9e-0f29cb26bf48', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book19%2F8.mp3?alt=media&token=d09750c8-a935-4b74-b97d-835c3e9f0e78', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book19%2F9.mp3?alt=media&token=475475c1-1d3f-4ecd-aca9-00a5c05d909b', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book19%2F10.mp3?alt=media&token=d8f1058a-5a9c-48a7-a1d9-31676f7c95de', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book19%2F11.mp3?alt=media&token=5453e684-d993-4336-81eb-05c88230e903'],
		['https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book20%2F0.mp3?alt=media&token=42fa279f-5f13-4b8d-9567-fcbb7830107e', '','https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book20%2F1.mp3?alt=media&token=67698680-441e-4590-a403-3dd52ebe2a14', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book20%2F2.mp3?alt=media&token=847833e4-8855-49ac-b101-201d245800f6', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book20%2F3.mp3?alt=media&token=dfaecedb-bd62-4671-98f3-f37778289ce2', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book20%2F4.mp3?alt=media&token=ee66f745-b9c5-4f8c-a7fa-cc8bba20c7d7', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book20%2F5.mp3?alt=media&token=d13b15a0-a35b-412c-8889-ad767f10c168', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book20%2F6.mp3?alt=media&token=b0649c51-bb97-4bea-848c-e39f9fcc0c01', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book20%2F7.mp3?alt=media&token=ab738ea2-ed00-4f05-a478-2775c32fc207', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book20%2F8.mp3?alt=media&token=c6035695-f6a8-409c-80ad-d40b9d9ef16a', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book20%2F9.mp3?alt=media&token=01aecdc5-18fa-4805-9093-f38b4b4e4191', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book20%2F10.mp3?alt=media&token=91b55f13-3a35-426f-879b-9bff526755c9', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book20%2F11.mp3?alt=media&token=aebd51f0-5c8c-4006-8662-e9dd87fcf7a9'],
		['https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book21%2F0.mp3?alt=media&token=4a9b8bba-d7fc-4021-8f04-150bce67d8e9', '','https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book21%2F0.mp3?alt=media&token=4a9b8bba-d7fc-4021-8f04-150bce67d8e9', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book21%2F1%20(3).mp3?alt=media&token=94d05e5a-0ac3-49ef-b6e9-b6ecafe81b9d', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book21%2F1%20(4).mp3?alt=media&token=0abe6500-26b4-4f81-ad6e-a7ca5d275d30', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book21%2F1%20(5).mp3?alt=media&token=87c83b14-2956-4ed8-858b-d84695d6a8ca', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book21%2F1%20(6).mp3?alt=media&token=0a66f145-c3af-49ac-b714-4b67d0396a63', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book21%2F1%20(7).mp3?alt=media&token=c1b9cbe3-c7eb-4d64-8df3-8595f3d64d1a', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book21%2F1%20(8).mp3?alt=media&token=e809365d-4bd2-4079-863b-6066bf73cc63', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book21%2F1%20(9).mp3?alt=media&token=38591717-ca6b-4c4d-bfb6-956ad017f1ea', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book21%2F1%20(10).mp3?alt=media&token=6b1170a1-544a-495d-85cd-796b38add9d8', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book21%2F1%20(11).mp3?alt=media&token=aac8efc9-e938-4809-b048-34bf3c500ce6'],
		['https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book22%2F0.mp3?alt=media&token=925de125-adc0-44df-920a-f8d774a24281', '','https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book22%2F1.mp3?alt=media&token=a91e5b39-f99d-43df-b9bc-23ff5cacb123', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book22%2F2.mp3?alt=media&token=7686b475-54ee-4c0d-a79e-5808a97b2712', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book22%2F3.mp3?alt=media&token=ddad7b40-a1c1-44bc-8fa3-bcecb1968300', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book22%2F4.mp3?alt=media&token=fccbf0e8-372f-4e6e-867c-f9d860d74716', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book22%2F5.mp3?alt=media&token=314a77b8-0dfa-49c8-888a-db9d18571573', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book22%2F6.mp3?alt=media&token=4cd6f984-221e-4be1-9f6b-70d7d11aeccc', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book22%2F7.mp3?alt=media&token=f2a3e945-126b-435f-b94a-f7365b4c5d91', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book22%2F8.mp3?alt=media&token=a5976ed5-ef75-4306-a845-3cb593847b17', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book22%2F9.mp3?alt=media&token=82ce8ffe-f336-4327-87e0-3e110533e78f', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book22%2F10.mp3?alt=media&token=02f8cfb6-998b-44df-bbf9-e7890a2bbc62', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book22%2F11.mp3?alt=media&token=0de6891c-d19e-448c-998a-136b4e474269'],
		['https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book23%2F0.mp3?alt=media&token=4d73004e-bede-47ae-87ed-70837bf34626', '','https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book23%2F1.mp3?alt=media&token=b9e15858-98ef-4320-a87c-8a2ec9b8e297', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book23%2F2.mp3?alt=media&token=0f74cbb7-edfb-4347-810b-a3a501dd92d0', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book23%2F3.mp3?alt=media&token=7f0e5034-3b7f-491e-b180-0cf8aa7c2bbc', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book23%2F4.mp3?alt=media&token=968949d0-20e0-4d3e-a0d2-a1eb8154f44c', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book23%2F5.mp3?alt=media&token=62bcd4c4-17ac-48fb-afa1-2e67ae62bd51', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book23%2F6.mp3?alt=media&token=7b253130-692f-4320-b19a-29a314788c6a', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book23%2F7.mp3?alt=media&token=1894b465-ed53-4103-9dad-130646fc6d07', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book23%2F8.mp3?alt=media&token=48a74463-75bb-4319-b004-f38f2f586e2a', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book23%2F9.mp3?alt=media&token=6c5b2b0c-12f8-4b6b-b324-f32ae2f9b637', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book23%2F10.mp3?alt=media&token=f62167dd-2cae-4386-8579-c96ce147e549', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book23%2F11.mp3?alt=media&token=2158e8da-f45b-42a9-ac41-fa82b0173b8c'],
		['https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book24%2F0.mp3?alt=media&token=689d5a80-02f9-4c2e-a8f3-2d7513e7939f', '','https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book24%2F1.mp3?alt=media&token=159106e9-8441-476b-8d6b-911c090c9625', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book24%2F2.mp3?alt=media&token=9989511c-6e6c-461e-9d02-d75c01d0c647', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book24%2F3.mp3?alt=media&token=5dab269d-0b13-411d-91ba-6d9924042e56', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book24%2F4.mp3?alt=media&token=a90edc7c-3a91-42e6-be60-e18a8657177b', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book24%2F5.mp3?alt=media&token=4f7835f7-4be5-4d99-ac1c-57ece3d50310', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book24%2F6.mp3?alt=media&token=3e15c8eb-9a32-4cf7-9243-45bee7b901cc', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book24%2F7.mp3?alt=media&token=7a4117bb-3ef2-48ff-b731-a0de2a46fc9b', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book24%2F8.mp3?alt=media&token=51548b49-6aee-4283-9433-a56152b5fbdf', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book24%2F9.mp3?alt=media&token=88258219-427f-4a49-86e2-a27af16e0bc3', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book24%2F10.mp3?alt=media&token=a8c33f0a-3829-4e86-b66e-9c0a6681c67a', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book24%2F11.mp3?alt=media&token=49690415-01f2-44fb-9792-d7c5cbec90fd'],
		['https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book25%2F0.mp3?alt=media&token=8a2784f2-1485-4c20-b25e-f2871dca57e9', '','https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book25%2F1.mp3?alt=media&token=7118286b-ccbf-469f-b2fa-6aa5011d417b', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book25%2F2.mp3?alt=media&token=a8c61a88-285e-4e4b-8875-e32b9137277e', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book25%2F3.mp3?alt=media&token=05b908eb-8771-44f1-8287-91882b7fd8c9', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book25%2F4.mp3?alt=media&token=7d107483-40d6-427e-9db0-fb1f0562aef5', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book25%2F5.mp3?alt=media&token=4848eddb-2fb5-4b43-bff8-ff30b1e294e4', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book25%2F6.mp3?alt=media&token=cb5c9282-961b-4d1a-9cc0-38f3ba998c5d', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book25%2F7.mp3?alt=media&token=28834996-f00a-429f-8971-3fe6dfb226ce', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book25%2F8.mp3?alt=media&token=5d546a4b-8c7b-43f0-95eb-c62a5195e093', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book25%2F9.mp3?alt=media&token=4ae5cd14-6b70-4a72-9b7e-0c6f8fe812ae', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book25%2F10.mp3?alt=media&token=39486537-6cf7-43bd-9992-5ab82539fc6f', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book25%2F11.mp3?alt=media&token=62e9d83b-35fa-4905-a58f-e315acd57eaa'],
		['https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book26%2F0.mp3?alt=media&token=6640a450-6591-4531-8307-b4c24c3f5af8', '','https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book26%2F1.mp3?alt=media&token=37706586-4086-41ad-84d6-a5623562d9bb', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book26%2F2.mp3?alt=media&token=7088c31c-d075-4bec-81b3-4bce02fefbef', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book26%2F3.mp3?alt=media&token=8104e9be-8d15-485d-a5e9-39b094f9c22b', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book26%2F4.mp3?alt=media&token=c9d85e3a-d3e8-4dd7-a1e3-cc1ba6ca2914', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book26%2F5.mp3?alt=media&token=c4ef5fef-fbb3-4751-a172-84e9077d9caf', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book26%2F6.mp3?alt=media&token=ead0d4bb-b8fb-4b01-91ce-67c271a0f2c4', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book26%2F7.mp3?alt=media&token=6e74a25f-e324-425d-ad47-d49b52c9ab03', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book26%2F8.mp3?alt=media&token=be3cb78a-09ed-474b-9a72-54df1b4158e2', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book26%2F9.mp3?alt=media&token=ea35a101-4c05-416a-9785-8348727b7f71', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book26%2F10.mp3?alt=media&token=c90abf97-720f-4455-a75d-495b20024b6d', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book26%2F11.mp3?alt=media&token=a037158e-9fa2-40de-a78d-d6039d2e3811'],
		['https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book27%2F0.mp3?alt=media&token=fced854f-0f7e-4a7a-8fdc-5c71ade6b3dd', '','https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book27%2F1.mp3?alt=media&token=fd26c54d-0df9-4b30-99f3-99fbbea4cf86', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book27%2F2.mp3?alt=media&token=938d768f-f139-473b-a506-788c5265ecf6', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book27%2F3.mp3?alt=media&token=ea219392-80a4-40ae-9777-76638555b571', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book27%2F4.mp3?alt=media&token=75e043ea-b254-491e-b5a7-60e47ff764d1', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book27%2F5.mp3?alt=media&token=a9135973-571d-4f2f-960b-c7c0e7dc0a5a', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book27%2F6.mp3?alt=media&token=538633a2-60f9-445b-ab0b-af7d02507fd9', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book27%2F7.mp3?alt=media&token=c5880ee6-272f-4d6a-a624-7c4542c92903', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book27%2F8.mp3?alt=media&token=f83a26b9-abb0-4c1d-8f59-40a3d66a6381', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book27%2F9.mp3?alt=media&token=7a99d169-68ea-41d3-a8dd-a7b4b1c08271', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book27%2F10.mp3?alt=media&token=323af3e8-9b6b-4e4a-8717-7037bec34b37', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book27%2F11.mp3?alt=media&token=e21be687-db22-4de8-8fb8-768f569d97d1'],
		['https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book28%2F0.wma?alt=media&token=68f1405e-237a-4145-9b19-b3874aa98a67', '','https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book28%2F1.wma?alt=media&token=ef575cd8-5bca-49ae-a935-6ff50a4e37c6', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book28%2F2.wma?alt=media&token=8fce8643-2479-4842-be27-ff8903dcff01', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book28%2F3.wma?alt=media&token=2ca24f09-f892-4cbb-ad61-8c1017604c0d', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book28%2F4.wma?alt=media&token=584b6da8-21dc-4202-b94a-37b346b43caa', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book28%2F5.wma?alt=media&token=869e59b8-df40-4661-be03-4b84fc0298c9', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book28%2F6.wma?alt=media&token=8196d67d-f3ed-4f1e-9949-adafd797f82c', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book28%2F7.wma?alt=media&token=b3c5b3ff-942c-4846-853c-74e991111911', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book28%2F8.wma?alt=media&token=d551ae8b-1076-4112-b5f0-d69a64c699ff', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book28%2F8.wma?alt=media&token=d551ae8b-1076-4112-b5f0-d69a64c699ff', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book28%2F9.wma?alt=media&token=4f68e2ae-ac5f-405f-b26d-dd0175992661', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book28%2F10.wma?alt=media&token=5bb4f225-db92-4951-bbe4-569c6c7eb3af', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book28%2F11.wma?alt=media&token=c0fa31a5-b913-4f23-bde9-704a00d87673'],
		['https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book29%2F0.wma?alt=media&token=d467e656-464c-4b7f-80ae-85086694c2d3', '','https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book29%2F1.wma?alt=media&token=10501b74-ee54-4fdb-98c6-6d17e6192d4c', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book29%2F2.wma?alt=media&token=d26b35c3-6ef7-49b8-8cff-17cb23e18db5', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book29%2F3.wma?alt=media&token=cce98620-1756-4446-8caf-1099ddacd2e3', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book29%2F3.wma?alt=media&token=cce98620-1756-4446-8caf-1099ddacd2e3', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book29%2F4.wma?alt=media&token=4f8e292f-741c-44c0-8194-e4875ad9b6c8', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book29%2F5.wma?alt=media&token=7fcde0a9-5076-409a-ba46-f9e2e949ef18', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book29%2F6.wma?alt=media&token=a0626580-0883-4ae1-b42a-a31e7e17916c', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book29%2F7.wma?alt=media&token=3b2a54f9-9021-4180-9c39-b669db19134f', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book29%2F8.wma?alt=media&token=1a447ec1-b4e4-46f0-95a1-42961e905ff8', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book29%2F9.wma?alt=media&token=5e8087dd-cb1c-408a-bb18-e13c5794c1db', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book29%2F10.wma?alt=media&token=2465d75d-2275-42d9-b516-ddf90c22de29', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book29%2F11.wma?alt=media&token=38038420-0f94-4433-893b-cc418d620503'],
		['https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book30%2F0.mp3?alt=media&token=58e24189-1b52-4ee5-9b42-6419ec977c0d', '','https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book30%2F1.mp3?alt=media&token=5a878152-dbc3-48c1-be50-7ce181a5c21e', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book30%2F2.mp3?alt=media&token=68f529f7-abc7-43af-845e-18913db8ccf3', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book30%2F3.mp3?alt=media&token=51334b9f-1825-4104-8341-b14e5670992c', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book30%2F4.mp3?alt=media&token=23f6ad26-725b-4641-b270-15f4ee14744e', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book30%2F5.mp3?alt=media&token=72d796a4-391a-44fe-acb6-8596be95f66b', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book30%2F6.mp3?alt=media&token=bc5f649d-2472-470e-835d-2034e64f9729', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book30%2F7.mp3?alt=media&token=9ec6f1e6-a581-482e-8c3c-a8d37c769893', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book30%2F8.mp3?alt=media&token=c993514e-65c4-45ba-9a3c-cf1bb29cf9c3', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book30%2F9.mp3?alt=media&token=b5ff2acd-fae1-4593-a5d8-ee71ce800922', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book30%2F10.mp3?alt=media&token=594adae4-d91e-4c97-925c-269869b83707', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book30%2F11.mp3?alt=media&token=91882927-f561-42f2-b2f8-e3d837822703'],
		['https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book31%2F0.mp3?alt=media&token=72c5fcc8-f15a-4c77-afee-68f27c106d29', '','https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book31%2F2.mp3?alt=media&token=49f93157-decc-4817-839f-0725dacd63f8', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book31%2F2.mp3?alt=media&token=49f93157-decc-4817-839f-0725dacd63f8', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book31%2F3.mp3?alt=media&token=03938fb1-2107-4a1b-8f11-2ffc61bf5d5c', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book31%2F4.mp3?alt=media&token=87ec21e5-b10b-43a2-a7a8-86f477bdc2a3', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book31%2F5.mp3?alt=media&token=d1b2a0e4-b1d2-410a-8406-40ae7f65d5b7', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book31%2F6.mp3?alt=media&token=f28a0e07-4a86-444e-a12b-1acef497d77a', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book31%2F7.mp3?alt=media&token=6d2c0d37-ccb0-4344-ab71-f3d7b8eae6aa', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book31%2F6.mp3?alt=media&token=f28a0e07-4a86-444e-a12b-1acef497d77a', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book31%2F9.mp3?alt=media&token=343153d8-be5a-497e-abe8-f6b29dbedf6b', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book31%2F9.mp3?alt=media&token=343153d8-be5a-497e-abe8-f6b29dbedf6b', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book31%2F10.mp3?alt=media&token=37955810-429d-4861-93e5-c9fb1faeda80', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book31%2F11.mp3?alt=media&token=707409b0-14f6-4f18-a647-82c37aa138b9'],
		['https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book32%2F0.mp3?alt=media&token=f54f5732-4681-450f-b4db-f35c5191b928', '','https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book32%2F1.mp3?alt=media&token=d2fd3079-227a-448e-9a96-f7faacb9acaa', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book32%2F2.mp3?alt=media&token=1ca53c0c-1d32-4bda-9579-77771550bbbb', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book32%2F3.mp3?alt=media&token=60cb38a3-5e98-4651-95a3-eb90c0e88c94', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book32%2F4.mp3?alt=media&token=d898d976-fefa-41ab-a501-be638bc9abfd', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book32%2F4.mp3?alt=media&token=d898d976-fefa-41ab-a501-be638bc9abfd', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book32%2F5.mp3?alt=media&token=82bb6e9a-89ab-4a9b-a799-d376ea242f62', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book32%2F6.mp3?alt=media&token=6c109a87-977d-4906-997a-5fb1f1b32b2c', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book32%2F7.mp3?alt=media&token=92184ecf-a361-43e5-b93f-62efb4ce2fe2', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book32%2F8.mp3?alt=media&token=cba971ec-06dc-4cf5-91b8-591760fd149a', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book32%2F9.mp3?alt=media&token=85134bcd-daff-4b60-8ce2-d081fe0dc838', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book32%2F10.mp3?alt=media&token=e7a69801-b4c7-4959-a4e2-29ae1ac60e59', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book32%2F11.mp3?alt=media&token=75f58353-b6a1-4c3a-9911-67b620af41f4'],
		['https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book33%2F0.mp3?alt=media&token=b9ef1f33-82e4-45c6-bbe6-cd2ad2a45b5d', '','https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book33%2F1.mp3?alt=media&token=da6a8ce3-b3ac-4a1a-840a-d2f46fd7cc0a', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book33%2F2.mp3?alt=media&token=68e14d6b-e71e-4deb-89eb-e32deaaab30c', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book33%2F3.mp3?alt=media&token=73eae42d-8fe1-45fd-b44a-0f192b12ad19', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book33%2F4.mp3?alt=media&token=3c516e3f-048b-4f4b-a98e-3439975bbe59', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book33%2F5.mp3?alt=media&token=1967a0d5-6f1a-4a8c-8b4a-bc6848154984', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book33%2F6.mp3?alt=media&token=cc29830e-4050-4219-91ff-85bc7e2f1a03', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book33%2F7.mp3?alt=media&token=1b7bc142-d35e-4fa8-961f-968f03be95ab', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book33%2F8.mp3?alt=media&token=3be4b8a6-7dc0-4615-9199-79f6dc0abf19', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book33%2F9.mp3?alt=media&token=8620dcd3-203b-45e7-8ccb-6d4aed0bcfb8', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book33%2F10.mp3?alt=media&token=c06e680f-8fe6-48a7-9147-6979fb1fd77f', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book33%2F11.mp3?alt=media&token=66e0c4a2-0e51-4649-abf2-569e925babb6'],
		['https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book34%2F0.mp3?alt=media&token=847e7161-13fc-4f69-81b2-07fced0478bf', '','https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book34%2F0.mp3?alt=media&token=847e7161-13fc-4f69-81b2-07fced0478bf', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book34%2F2.mp3?alt=media&token=38fca709-ea83-43c3-8d53-f5b3e659e5f3', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book34%2F3.mp3?alt=media&token=d84d605d-208c-4909-8c6a-68afd22ee408', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book34%2F4.mp3?alt=media&token=c554b6e4-ec03-4364-91d2-d5b9e342cac5', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book34%2F5.mp3?alt=media&token=134452ec-1229-4f0f-b341-0cc012adb2e7', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book34%2F6.mp3?alt=media&token=de776794-08c5-4ab7-83cb-a99ea054c144', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book34%2F7.mp3?alt=media&token=720faf8c-7c41-4e1f-a616-b38304ca7bb8', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book34%2F8.mp3?alt=media&token=8077339f-d5ef-4981-be2e-a41aab1b8b03', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book34%2F9.mp3?alt=media&token=581a1cd4-29e5-4573-bb7c-293e67bf215c', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book34%2F10.mp3?alt=media&token=74630ba1-36a5-430e-a80e-0c774b0aac48', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book34%2F11.mp3?alt=media&token=e93c2478-072a-4674-bb17-f1e392ba4780'],
		['https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book35%2F0.mp3?alt=media&token=082d22a4-0c6b-400c-8454-5bf19ad68269', '','https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book35%2F1.mp3?alt=media&token=e7e9c734-bb95-4140-9281-884700269221', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book35%2F2.mp3?alt=media&token=67e8f8c6-b9bb-4168-af54-5bcab19baedb', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book35%2F3.mp3?alt=media&token=422e7ce8-6211-4d8f-b80c-68b6625a7db4', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book35%2F4.mp3?alt=media&token=d3d61ca6-192f-4d0b-963d-fc8c011b59aa', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book35%2F5.mp3?alt=media&token=53750a69-0bca-40bd-a6a3-76b55c1b396d', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book35%2F6.mp3?alt=media&token=d3ea9616-0a0b-4d61-8ef9-27d8665f8291', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book35%2F7.mp3?alt=media&token=9a004f16-768b-48ec-9788-f914f697f86d', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book35%2F8.mp3?alt=media&token=87000c4c-c471-47ee-b213-84004221aa8c', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book35%2F9.mp3?alt=media&token=f31c5bc2-f97e-405a-b757-ac78452963ca', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book35%2F10.mp3?alt=media&token=25f1a206-2e7e-4452-b329-479e13656f54', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book35%2F11.mp3?alt=media&token=17ad3687-6757-4c04-995a-13f28db81e97'],
		['https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book36%2F0.mp3?alt=media&token=54fe15f4-0f50-4b64-bfad-7b9426fca960', '','https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book36%2F1.mp3?alt=media&token=71e0b291-22b8-4e00-ad4b-5dcb2b2a72d4', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book36%2F2.mp3?alt=media&token=48c36ea4-fda0-4377-abf2-bc97d591970e', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book36%2F3.mp3?alt=media&token=c3e59677-134e-4339-abaa-d43108b3bcb1', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book36%2F4.mp3?alt=media&token=3fbaa22d-57f2-445c-b8a5-96150ee8710c', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book36%2F5.mp3?alt=media&token=1be96584-d6b4-4c2f-b328-c3ec76071272', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book36%2F6.mp3?alt=media&token=ef7f1b60-d52b-4582-ac1d-849e99110cdf', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book36%2F7.mp3?alt=media&token=7f48ce6a-4711-4119-b303-fd59179e4066', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book36%2F8.mp3?alt=media&token=eeec24b4-0795-4345-a316-16427c467cfa', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book36%2F9.mp3?alt=media&token=82192d12-4b16-4d2f-abc5-307b87a66be1', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book36%2F10.mp3?alt=media&token=2346cc1d-8443-4c76-a267-42084311556d', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book36%2F11.mp3?alt=media&token=4c67696f-ec76-42cb-b186-4d28cdea1e1c'],
		['https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book37%2F0.mp3?alt=media&token=ee1163d7-52e7-47ae-9619-13ca8108bb6a', '','https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book37%2F1.mp3?alt=media&token=4c46c817-2bc8-4a4b-aec1-ff06884d78e6', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book37%2F2.mp3?alt=media&token=7cbd4107-b4bd-485c-946b-5b4106534260', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book37%2F3.mp3?alt=media&token=af847593-c33f-4878-b1cb-119584ad0b8d', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book37%2F4.mp3?alt=media&token=4d8b5748-5f5e-4289-a1b6-76e634a8c813', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book37%2F5.mp3?alt=media&token=f64a15c2-d438-433f-8682-20cb403aa224', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book37%2F6.mp3?alt=media&token=ab1525ef-c792-4e57-ab23-d41883d5df38', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book37%2F7.mp3?alt=media&token=11e83555-26cd-45a6-aa59-f05d6f1f56fc', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book37%2F8.mp3?alt=media&token=ea0e628d-2416-410a-a2b4-29fa80f4936d', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book37%2F9.mp3?alt=media&token=9b9c6414-134b-4b29-807e-9a0b56c0cd5a', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book37%2F10.mp3?alt=media&token=2277c5ea-dd3a-4ef0-bb77-e76a8645d4c1', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book37%2F11.mp3?alt=media&token=4be4c6d3-607f-409e-aabf-5d077a0f7ac3'],
		['https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book38%2F0.mp3?alt=media&token=ad67fa69-b118-4371-b954-353e28fe2358', '','https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book38%2F1.mp3?alt=media&token=f98ac15b-ef93-41f5-bce2-9c0d614ef33e', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book38%2F2.mp3?alt=media&token=2c59d8fc-ac4a-4636-a4fd-452f25b497fc', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book38%2F3.mp3?alt=media&token=bd9f19cc-bd08-49d8-b90e-59f4518dd8ce', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book38%2F4.mp3?alt=media&token=5fb12227-f4ae-412d-ade7-78cfd6cc8c71', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book38%2F5.mp3?alt=media&token=b0b09207-82cf-4dd7-8a82-bb80d2858c11', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book38%2F6.mp3?alt=media&token=e3e7694c-57ee-4916-b8f8-cfba19469e5e', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book38%2F7.mp3?alt=media&token=f4cf50c8-1715-4d81-af9d-4120000d4b12', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book38%2F8.mp3?alt=media&token=b987d34d-7506-40a5-a9b4-2edda495b6fcs', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book38%2F9.mp3?alt=media&token=3b63ce9c-9765-4173-b581-dee2d055c900', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book38%2F10.mp3?alt=media&token=fad67258-4ce0-452a-8ed6-67a4a6b29be9', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book38%2F11.mp3?alt=media&token=37deec81-f369-4224-8d2b-2d194b29fff4'],
		['https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book39%2F0.mp3?alt=media&token=36480761-cca6-421d-8660-1a456a68b334', '','https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book39%2F1.mp3?alt=media&token=5c09319f-7ab0-4c9d-baed-e68e341160d6', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book39%2F2.mp3?alt=media&token=008764e1-4b26-409a-81b4-d1bcd5f15b14', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book39%2F3.mp3?alt=media&token=1c797b5c-dc28-43ee-8f9d-c5d94790a40c', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book39%2F4.mp3?alt=media&token=26d6abeb-c42d-4463-880f-ecde568ccbcf', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book39%2F5.mp3?alt=media&token=148cdb72-f146-448d-801a-8e927632b8ab', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book39%2F6.mp3?alt=media&token=429793ce-e1ce-4d02-affa-d4153649443f', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book39%2F7.mp3?alt=media&token=23094a4f-cc18-4000-9d53-92ca01e237ca', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book39%2F8.mp3?alt=media&token=66c7608c-c388-4132-b5b1-da38f307be0e', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book39%2F9.mp3?alt=media&token=91ccb0f6-f20c-4bb5-b124-72660626d1a2', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book39%2F10.mp3?alt=media&token=611c86fd-233f-4d6c-9f3c-c1a4d6bb310e', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book39%2F11.mp3?alt=media&token=dcdc7357-9fc2-4d27-8ac6-385d5c7e4629'],
		['https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book40%2F0.mp3?alt=media&token=d3218beb-4d2d-4de1-b831-02187f98cacb', '','https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book40%2F1.mp3?alt=media&token=d538d9ad-cc3b-4306-ac8f-2f9e75158626', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book40%2F2.mp3?alt=media&token=93475908-d0b1-492f-acfb-1e9912c85704', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book40%2F3.mp3?alt=media&token=0669aae4-af18-41b1-a24f-43fe95de532e', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book40%2F4.mp3?alt=media&token=b4f9416a-bf8f-4f4d-8a3d-31c1bd6f123b', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book40%2F5.mp3?alt=media&token=09a52346-8ad1-40df-a6a3-2b4b8a322eac', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book40%2F6.mp3?alt=media&token=c23c5bcf-a191-40c3-a83b-0964ff162c47', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book40%2F7.mp3?alt=media&token=7994f728-7c16-4cdc-b431-c690bb326f8f', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book40%2F8.mp3?alt=media&token=03bbaaf8-d20e-494b-86de-d0e8d24c609f', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book40%2F9.mp3?alt=media&token=e7eecf24-e4c5-4bc8-8341-98945b2158be', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book40%2F10.mp3?alt=media&token=e8b68637-2298-4b7c-b411-e62999c799ec', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book40%2F11.mp3?alt=media&token=4c1e3815-f3a5-42f7-a082-8cea08da9af6'],
		['https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book41%2F0.mp3?alt=media&token=6dfa9450-12b2-4f64-a072-a65c920165f4', '','https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book41%2F0.mp3?alt=media&token=6dfa9450-12b2-4f64-a072-a65c920165f4', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book41%2F2.mp3?alt=media&token=ffc7a30a-c21a-405b-9158-d103976f9995', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book41%2F3.mp3?alt=media&token=221ec1ee-c042-4a7a-8da6-9fb3343dfda6', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book41%2F4.mp3?alt=media&token=88a1bb4e-e0e2-42c2-979a-a52507ac1c50', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book41%2F5.mp3?alt=media&token=378ec3d4-a70f-4886-bc89-9a500493b27c', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book41%2F6.mp3?alt=media&token=28736792-31e7-440e-9aa3-ccf9198f4e05', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book41%2F7.mp3?alt=media&token=2c6f2f77-1dda-439e-92c7-b23830111970', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book41%2F7.mp3?alt=media&token=2c6f2f77-1dda-439e-92c7-b23830111970', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book41%2F10.mp3?alt=media&token=83f71017-93f7-4075-9b0f-a736b8e6d8c5', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book41%2F11.mp3?alt=media&token=68a0cd9c-2919-4398-9858-38c0c417bb0c'],
		['https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book42%2F0.mp3?alt=media&token=19bbb68f-517e-4db1-a2db-f4b5f87c75eb', '','https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book42%2F1.mp3?alt=media&token=73cc9876-8cbc-432a-bce6-31914671a9c1', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book42%2F2.mp3?alt=media&token=1930d7f0-bc96-40ab-9548-ddab0eb93ae8', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book42%2F2.mp3?alt=media&token=1930d7f0-bc96-40ab-9548-ddab0eb93ae8', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book42%2F4.mp3?alt=media&token=ffcb7630-b1d9-4fdc-9845-823ec33b3a3c', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book42%2F5.mp3?alt=media&token=0450a994-8427-4bf1-8e7e-20238da86461', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book42%2F6.mp3?alt=media&token=99d25d0d-a39a-432e-988b-bb471abfe605', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book42%2F7.mp3?alt=media&token=1d94fa9b-29a4-4766-b049-c5fa316d45bc', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book42%2F8.mp3?alt=media&token=cdf37f71-41e1-4d5c-ab34-075cc66ea0c3', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book42%2F9.mp3?alt=media&token=7fef95ef-8297-44c7-9eeb-4e1ffd75b325', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book42%2F10.mp3?alt=media&token=1f87d5b6-5a94-4183-9f5c-6ed50b7a8535', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book42%2F11.mp3?alt=media&token=6d002c33-269b-4a30-ad30-4849526502c4'],
		['https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book43%2F0.mp3?alt=media&token=2e6709c7-f580-41d1-9481-0caa1dec4514', '','https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book43%2F1.mp3?alt=media&token=a5b0ab9c-f338-4077-8175-7787f0da5ad7', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book43%2F2.mp3?alt=media&token=0a1d62cf-7914-415c-a304-68589e1813a9', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book43%2F3.mp3?alt=media&token=100d9f5e-60f5-4bc1-b488-7307ec6540ec', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book43%2F4.mp3?alt=media&token=d69728da-967c-42e1-87a7-c97ed8c3261f', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book43%2F5.mp3?alt=media&token=b278201d-7db8-41e1-a100-1df4542a4584', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book43%2F6.mp3?alt=media&token=9b14d5df-a441-4cfa-96fc-cf450a6d30e2', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book43%2F7.mp3?alt=media&token=242717b7-52d8-4f0c-bc90-59c0a78f858a', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book43%2F8.mp3?alt=media&token=35f517cf-6dfb-4c07-8eb9-84f509f0b1c8', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book43%2F9.mp3?alt=media&token=270ccbe3-10e6-438b-a4f3-7bad1b18557e', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book43%2F10.mp3?alt=media&token=57b58e1c-fc0b-413a-971a-e1bb50239bce', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book43%2F11.mp3?alt=media&token=26f61d34-d860-44c7-9cdb-9f065ade3d19'],
		['https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book44%2F0.mp3?alt=media&token=e53302c5-a7fd-470d-bc94-6b322bfc3202', '','https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book44%2F1.mp3?alt=media&token=8e7d693a-520c-4cef-b876-6714047ab599', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book44%2F2.mp3?alt=media&token=432cff68-c0e2-401a-b4e5-8e8db525e051', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book44%2F3.mp3?alt=media&token=7141410b-a9e7-486f-a4ea-1c693354fc1f', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book44%2F4.mp3?alt=media&token=06161abe-44c3-456c-82b0-b98fb5efc0ed', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book44%2F5.mp3?alt=media&token=3d023b7b-2df8-4918-89fd-b0901dd28fe8', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book44%2F6.mp3?alt=media&token=7faf5046-1ba4-4ce0-983c-302ad82ddeb3', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book44%2F7.mp3?alt=media&token=e929a79e-93be-41d6-93c3-ef8548240c66', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book44%2F8.mp3?alt=media&token=db92c8a3-5cc0-4df6-aa86-9136127f781b', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book44%2F9.mp3?alt=media&token=649e2512-ce78-453b-8132-c8cf894c06df', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book44%2F10.mp3?alt=media&token=7a259249-a2db-4f4d-9dd2-5f0a965b5b78', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book44%2F10.mp3?alt=media&token=7a259249-a2db-4f4d-9dd2-5f0a965b5b78', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book44%2F10.mp3?alt=media&token=7a259249-a2db-4f4d-9dd2-5f0a965b5b78'],
		['https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book45%2F0.mp3?alt=media&token=5f24f3ab-b9ac-4658-b0b8-8c15d75c19d5', '', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book45%2F1.mp3?alt=media&token=cd62c35d-ea32-4227-ab74-3d5335d15fb5', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book45%2F2.mp3?alt=media&token=d894c143-6d2f-42b4-8cdb-f7c91351a4eb', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book45%2F3.mp3?alt=media&token=3393d0b2-f80c-4627-8543-4bb280ab6e8b', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book45%2F4.mp3?alt=media&token=90a6956e-87f2-4f65-a509-893df5823643', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book45%2F5.mp3?alt=media&token=c6ebdca2-5d69-4b3e-b7d2-61c77bfa2476', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book45%2F6.mp3?alt=media&token=7ec61367-6c1e-457d-8049-9e4a6e19dfcf', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book45%2F7.mp3?alt=media&token=faff2e22-ba52-4daf-b24a-594bbdc7e417', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book45%2F8.mp3?alt=media&token=f1ed3c97-2af8-4f88-852d-ab45840d8674', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book45%2F9.mp3?alt=media&token=0f7f32e2-d538-4dcf-b79b-37252a3c9745', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book45%2F10.mp3?alt=media&token=b4add8a8-982d-4c1a-aa46-a426b4e222e1', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book45%2F11.mp3?alt=media&token=c4f939dd-0893-45c1-8ff2-f84e57e4abef', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book45%2F12.mp3?alt=media&token=e1e76fc8-5fbf-401a-ad59-909d4072f157', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book45%2F13.mp3?alt=media&token=e1e76fc8-5fbf-401a-ad59-909d4072f157', 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book45%2F14.mp3?alt=media&token=1017e701-631f-4fba-9604-b2beb00a911b',
		'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book45%2F15.mp3?alt=media&token=0f3d889f-38a3-4da9-af32-67594e8fd4d5',
		'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book45%2F16.mp3?alt=media&token=f5a8c89f-c0e2-4330-a978-9d99d8699b78',
		'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book45%2F17.mp3?alt=media&token=f5a8c89f-c0e2-4330-a978-9d99d8699b78',
		'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book45%2F18.mp3?alt=media&token=8741b338-8bfd-402c-9eb3-7d71fbfb06a5',
		'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book45%2F19.mp3?alt=media&token=4ae5af30-4cca-427c-b558-4311113b097b',
		'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book45%2F20.mp3?alt=media&token=2f2ee8fc-6993-407c-8b12-06cf728917cc',
		'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book45%2F21.mp3?alt=media&token=a8cee7e2-bd9f-46e9-ae60-9c93d50b2aeb',
		'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book45%2F22.mp3?alt=media&token=fe761327-4e60-4ede-9931-837acad13339',
		'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book45%2F23.mp3?alt=media&token=5a04b5aa-9890-4144-a7cb-6f80677284ae',
		'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book45%2F24.mp3?alt=media&token=229e8e5f-b470-4bcd-835c-6575a4df6054',
		'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book45%2F25.mp3?alt=media&token=3a51bb01-7a97-46df-ad55-e78dac74e38d',
		'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book45%2F26.mp3?alt=media&token=4dac098b-f1c2-4814-ab4c-f2b653d59eb3',
		'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book45%2F27.mp3?alt=media&token=4dc10199-47c7-469a-97c3-7a6ca48384be',
		'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book45%2F28.mp3?alt=media&token=e719adab-3c56-4908-9c41-21859c4dc172',
		'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book45%2F29.mp3?alt=media&token=7eff549a-0413-44de-962e-cdd1892b1b52',
		'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book45%2F30.mp3?alt=media&token=78e3e2a1-4d1e-415d-bda6-b054d0bfaf5d',
		'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book45%2F31.mp3?alt=media&token=475984d2-219e-495c-b6d8-044ce0b0eaf6',
		'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book45%2F32.mp3?alt=media&token=a161f17a-515b-4f2d-b23a-dab30366e468']
	]

	@ViewChild(Nav) nav: Nav;
	isHomeNav: boolean = true;
	constructor(private menu: MenuController,
		private document: DocumentViewer,
		public navCtrl: NavController,
		private pf: Platform,
		private fileOpener: FileOpener,
		private file: File,
		public http: Http,
		private sanitizer: DomSanitizer,
		private _audioProvider: AudioProvider,
		private storage: AngularFireStorage) {

		console.log(this.menuButton)
		setTimeout(() => {
			console.log('home log', this.menuButton);
			if (this.menuButton !== undefined) {

				this.isHomeNav = this.menuButton;
			}
		}, 1000);



		pf.ready().then((readySource) => {
			console.log('Width: ' + pf.width());
			console.log('Height: ' + pf.height());

			let height = pf.height();

			let height1 = height - 575;
			let height2 = height1 * 0.66;
			let height3 = height2 + 300;
			this.styleExp = "" + height3 + "px";
			console.log("style", this.styleExp);
			

			// if (height >= 350 && height < 670) {
			// 	console.log('Condition 1 True ------------>');
				
			// 	this.styleExp = '355px';
			// }

			// if(height >= 670 && height < 751) {

			// 	console.log('Condition 2 True ------------>');
			// 	this.styleExp = '410px';

			// }
		});

		this.myTracks = [{
			src: '',
			preload: 'metadata' // tell the plugin to preload metadata such as duration for this track, set to 'none' to turn off
		}];


		// {
		// 	src: 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book1%2F2.mp3?alt=media&token=e7789882-9c38-45e1-ac4a-93f5df18f83c',
		// 	preload: 'metadata' // tell the plugin to preload metadata such as duration for this track, set to 'none' to turn off
		// }

		// const ref = this.storage.ref('book1/0.mp3');
		// this.profileUrl = ref.getDownloadURL()
		// this.profileUrl.subscribe(data => {
		// 	console.log(data);
		// 	this.myTracks[0].src = data;
		// })
		// console.log(this.profileUrl);

	}
	itemSelected(index) {
		console.log(index);
		//console.log(this.booksSound.length);

		this.currentPic = 1;
		let len = index + 1;
		this.audioIndex = index;
		this.currentBookIndex = len;
		this.bookName = "Book " + len;
		console.log(this.bookName);
		this.bookLocation = "assets/books/" + this.bookName + "/" + this.currentPic + ".jpg";
		let book = "book" + len + "url" + index;
		console.log(index);
		this.myTracks[0].src = this.booksSound[index][this.currentPic - 1];
		// this.myTracks[0].src = 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book2%2F2.mp3?alt=media&token=2cf1e744-b639-4dae-8a0e-9a20244a547b';
		console.log(this.myTracks[0]);



		console.log(this.audioIndex);
		console.log(this.books);
		this.showList = false;

	}

	ngAfterContentInit() {
		// get all tracks managed by AudioProvider so we can control playback via the API
		this.allTracks = this._audioProvider.tracks;
	}

	playSelectedTrack() {
		console.log("playSelectedTrack")
		// use AudioProvider to control selected track 
		this._audioProvider.play(this.selectedTrack);
	}

	pauseSelectedTrack() {
		// use AudioProvider to control selected track 
		this._audioProvider.pause(this.selectedTrack);
	}

	onTrackFinished(track: any) {
		console.log('Track finished', track)
	}

	showItemList() {
		this.showList = true;
	}

	closeMenu() {
		this.isHomeNav = false;
	}

	tapEvent(e) {


		if (e.direction == 4) {
			this.prev();
		} else if (e.direction == 2) {
			this.next();
		} else {

		}
	}
	prev() {
		this.pauseSelectedTrack();

		if (this.currentPic > 1) {
			console.log(this.currentPic);
			if (this.currentPic == 3) {
				this.showplay = false;
			} else {
				this.showplay = true;
			}
			this.currentPic = this.currentPic - 1;
			this.bookLocation = "assets/books/" + this.bookName + "/" + this.currentPic + ".jpg";
			//	this.myTracks[0].src = 'gs://audio-pdf-app.appspot.com/'+ 'book' + this.audioIndex + '/' + this.currentPic + ".mp3";
			//this.myTracks[0].src = this.booksSound[this.audioIndex][this.currentPic - 1];
			// console.log(this.myTracks[0].src);
			this.myTracks[0] = {
				src: this.booksSound[this.audioIndex][this.currentPic - 1],
				preload: 'metadata' // tell the plugin to preload metadata such as duration for this track, set to 'none' to turn off
			}
			// console.log(this.myTracks[0])
		}
	}

	next() {
		this.pauseSelectedTrack();

		if (this.currentPic < this.books[this.audioIndex].length1) {

			//console.log(this.booksSound[this.audioIndex][this.currentPic - 1]);
			if (this.currentPic == 1) {
				this.showplay = false;
			} else {
				this.showplay = true;
			}

			this.currentPic = this.currentPic + 1;
			this.bookLocation = "assets/books/" + this.bookName + "/" + this.currentPic + ".jpg";
			//this.myTracks[0].src = this.booksSound[this.audioIndex][this.currentPic - 1];

			console.log(this.booksSound[this.audioIndex][this.currentPic - 1]);
			this.myTracks[0] = {
				src: this.booksSound[this.audioIndex][this.currentPic - 1],
				preload: 'metadata' // tell the plugin to preload metadata such as duration for this track, set to 'none' to turn off
			}

			//	this.myTracks[0].src = 'gs://audio-pdf-app.appspot.com/' + 'book'+ this.audioIndex + '/' + this.currentPic + ".mp3";
		}
	}



	// ionViewDidLoad() {
	// 	this.pageContainerUnique.element = this.pageContainerRef.nativeElement as HTMLElement;
	// 	this.pageContainerUnique.canvasWrapper = this.canvasWrapperRef.nativeElement as HTMLCanvasElement;
	// 	this.pageContainerUnique.canvas = this.canvasRef.nativeElement as HTMLCanvasElement;
	// 	this.pageContainerUnique.textContainer = this.textContainerRef.nativeElement as HTMLCanvasElement;
	// 	this.loadPdf('assets/test1.pdf');
	// }


	// loadPdf(pdfPath: string): Promise<boolean> {
	// 	return PDFJSViewer.getDocument(pdfPath)
	// 		.then(pdf => {
	// 			this.pdfDocument = pdf;
	// 			console.log("pdf loaded:"); console.dir(this.pdfDocument);
	// 			return this.loadPage(1);
	// 		}).then((pdfPage) => {
	// 			console.dir(pdfPage);
	// 		}).catch(e => {
	// 			console.error(e);
	// 			return false;
	// 		});
	// }

	// loadPage(pageNum) {
	// 	console.log(pageNum);
	// 	this.pageNumber = pageNum;
	// 	let pdfPage: PDFJSViewer.PDFPageProxy;

	// 	return this.pdfDocument.getPage(pageNum).then(thisPage => {
	// 		pdfPage = thisPage;
	// 		return this.renderOnePage(pdfPage);
	// 	}).then(() => {
	// 		return pdfPage;
	// 	});

	// } // loadpage()

	// async renderOnePage(pdfPage: PDFJSViewer.PDFPageProxy) {

	// 	let textContainer: HTMLElement;
	// 	let canvas: HTMLCanvasElement;
	// 	let wrapper: HTMLElement;

	// 	let canvasContext: CanvasRenderingContext2D;
	// 	let page: HTMLElement

	// 	page = this.pageContainerUnique.element;
	// 	textContainer = this.pageContainerUnique.textContainer;
	// 	canvas = this.pageContainerUnique.canvas;
	// 	wrapper = this.pageContainerUnique.canvasWrapper;

	// 	canvasContext = canvas.getContext('2d') as CanvasRenderingContext2D;
	// 	canvasContext.imageSmoothingEnabled = false;
	// 	canvasContext.webkitImageSmoothingEnabled = false;
	// 	canvasContext.mozImageSmoothingEnabled = false;
	// 	canvasContext.oImageSmoothingEnabled = false;

	// 	let viewport = pdfPage.getViewport(1) as PDFJSViewer.PDFPageViewport;

	// 	canvas.width = viewport.width;
	// 	canvas.height = viewport.height;
	// 	page.style.width = `${viewport.width}px`;
	// 	page.style.height = `${viewport.height}px`;
	// 	wrapper.style.width = `${viewport.width}px`;
	// 	wrapper.style.height = `${viewport.height}px`;
	// 	textContainer.style.width = `${viewport.width}px`;
	// 	textContainer.style.height = `${viewport.height}px`;

	// 	//fix for 4K
	// 	if (window.devicePixelRatio > 1) {
	// 		let canvasWidth = canvas.width;
	// 		let canvasHeight = canvas.height;

	// 		canvas.width = canvasWidth * window.devicePixelRatio;
	// 		canvas.height = canvasHeight * window.devicePixelRatio;
	// 		canvas.style.width = canvasWidth + "px";
	// 		canvas.style.height = canvasHeight + "px";

	// 		canvasContext.scale(window.devicePixelRatio, window.devicePixelRatio);
	// 	}

	// 	// THIS RENDERS THE PAGE !!!!!!
	// 	let renderTask: PDFJSViewer.PDFRenderTask = pdfPage.render({
	// 		canvasContext,
	// 		viewport
	// 	});

	// 	let container = textContainer;

	// 	return renderTask.then(() => {
	// 		//console.error("I WORK JUST UNTIL HERE");
	// 		return pdfPage.getTextContent();

	// 	}).then((textContent) => {

	// 		let textLayer: HTMLElement;


	// 		textLayer = this.pageContainerUnique.textContainer


	// 		while (textLayer.lastChild) {
	// 			textLayer.removeChild(textLayer.lastChild);
	// 		}

	// 		this.PDFJSViewer.renderTextLayer({
	// 			textContent,
	// 			container,
	// 			viewport,
	// 			textDivs: []
	// 		});

	// 		return true;
	// 	});

	// }


	// itemSelected() {
	// 	console.log("selected");

	// }

	// itemSelect() {

	// 	let options: DocumentViewerOptions = {
	// 		title: 'My PDF'
	// 	}
	// 	this.pf.ready().then(() => {
	// 		// this.document.viewDocument('./test1.pdf', 'application/pdf', options)
	// 		console.log("function call")
	// 		this.fileOpener.open('../.																																																																																																												./assets/test1.pdf', 'application/pdf')
	// 			.then(() => console.log('File is opened'))
	// 			.catch(e => console.log('Error openening file', e));

	// 	})
	// 	// this.navCtrl.push(Test1Page)
	// }																															

	nextPage() {
		this.pageNumber = this.pageNumber + 1;
		console.log("nextPage ", this.pageNumber);
		//	this.loadPage(this.pageNumber)

	}

	previousPage() {
		this.pageNumber = this.pageNumber - 1;
		console.log("nextPage ", this.pageNumber);
		//	this.loadPage(this.pageNumber)
	}

}



