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

	books = [
		{ name: "Book 1", length1: 18 }, { name: "Book 2", length1: 18 }, { name: "Book 3", length1: 18 }, { name: "Book 4", length1: 18 }, { name: "Book 5", length1: 18 }, { name: "Book 6", length1: 18 }, { name: "Book 7", length1: 18 }, { name: "Book 8", length1: 15 }, { name: "Book 9", length1: 18 }, { name: "Book 10", length1: 18 },
		{ name: "Book 11", length1: 18 }, { name: "Book 12", length1: 18 }, { name: "Book 13", length1: 18 }, { name: "Book 14", length1: 18 }, { name: "Book 15", length1: 14 }, { name: "Book 16", length1: 14 }, { name: "Book 17", length1: 14 }, { name: "Book 18", length1: 14 }, { name: "Book 19", length1: 14 }, { name: "Book 20", length1: 14 },
		{ name: "Book 21", length1: 14 }, { name: "Book 22", length1: 14 }, { name: "Book 23", length1: 14 }, { name: "Book 24", length1: 14 }, { name: "Book 25", length1: 14 }, { name: "Book 26", length1: 14 }, { name: "Book 27", length1: 14 }, { name: "Book 28", length1: 14 }, { name: "Book 29", length1: 14 }, { name: "Book 30", length1: 14 },
		{ name: "Book 31", length1: 14 }, { name: "Book 32", length1: 14 }, { name: "Book 33", length1: 14 }, { name: "Book 34", length1: 14 }, { name: "Book 35", length1: 14 }, { name: "Book 36", length1: 15 }, { name: "Book 37", length1: 14 }, { name: "Book 38", length1: 14 }, { name: "Book 39", length1: 14 }, { name: "Book 40", length1: 14 },
		{ name: "Book 41", length1: 15 }, { name: "Book 42", length1: 14 }, { name: "Book 43", length1: 14 }, { name: "Book 44", length1: 15 }
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


		this.myTracks = [{
			src: 'gs://audio-pdf-app.appspot.com/3/0.mp3',
			preload: 'metadata' // tell the plugin to preload metadata such as duration for this track, set to 'none' to turn off
		}];


		const ref = this.storage.ref('3/0.mp3');
		this.profileUrl = ref.getDownloadURL()
		this.profileUrl.subscribe(data => {
			console.log(data);
			this.myTracks[0].src = data;
		})
		console.log(this.profileUrl);

	}
	itemSelected(index) {
		this.currentPic = 1;
		let len = index + 1;
		this.audioIndex = index;
		this.currentBookIndex = len;
		this.bookName = "Book " + len;
		console.log(this.bookName);
		this.bookLocation = "assets/books/" + this.bookName + "/" + this.currentPic + ".jpg";
		this.myTracks[0].src = 'gs://audio-pdf-app.appspot.com/' + this.audioIndex + '/' + this.currentPic + ".mp3";

		console.log(index);
		console.log(this.books[index]);
		this.showList = false;

	}

	ngAfterContentInit() {
		// get all tracks managed by AudioProvider so we can control playback via the API
		this.allTracks = this._audioProvider.tracks;
	}

	playSelectedTrack() {
		alert("playSelectedTrack")
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

		if (this.currentPic > 1) {
			this.currentPic = this.currentPic - 1;
			this.bookLocation = "assets/books/" + this.bookName + "/" + this.currentPic + ".jpg";
			this.myTracks[0].src = 'gs://audio-pdf-app.appspot.com/' + this.audioIndex + '/' + this.currentPic + ".mp3";
		}
	}

	next() {

		if (this.currentPic < this.books[this.currentBookIndex].length1) {
			this.currentPic = this.currentPic + 1;
			this.bookLocation = "assets/books/" + this.bookName + "/" + this.currentPic + ".jpg";
			this.myTracks[0].src = 'gs://audio-pdf-app.appspot.com/' + this.audioIndex + '/' + this.currentPic + ".mp3";
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

