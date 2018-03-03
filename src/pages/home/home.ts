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

	books = [
		{ name: "Book 1", length1: 18 }, { name: "Book 2", length1: 18 }, { name: "Book 3", length1: 18 }, { name: "Book 4", length1: 18 }, { name: "Book 5", length1: 18 }, { name: "Book 6", length1: 18 }, { name: "Book 7", length1: 18 }, { name: "Book 8", length1: 15 }, { name: "Book 9", length1: 18 }, { name: "Book 10", length1: 18 },
		{ name: "Book 11", length1: 18 }, { name: "Book 12", length1: 18 }, { name: "Book 13", length1: 18 }, { name: "Book 14", length1: 18 }, { name: "Book 15", length1: 14 }, { name: "Book 16", length1: 14 }, { name: "Book 17", length1: 14 }, { name: "Book 18", length1: 14 }, { name: "Book 19", length1: 14 }, { name: "Book 20", length1: 14 },
		{ name: "Book 21", length1: 14 }, { name: "Book 22", length1: 14 }, { name: "Book 23", length1: 14 }, { name: "Book 24", length1: 14 }, { name: "Book 25", length1: 14 }, { name: "Book 26", length1: 14 }, { name: "Book 27", length1: 14 }, { name: "Book 28", length1: 14 }, { name: "Book 29", length1: 14 }, { name: "Book 30", length1: 14 },
		{ name: "Book 31", length1: 14 }, { name: "Book 32", length1: 14 }, { name: "Book 33", length1: 14 }, { name: "Book 34", length1: 14 }, { name: "Book 35", length1: 14 }, { name: "Book 36", length1: 15 }, { name: "Book 37", length1: 14 }, { name: "Book 38", length1: 14 }, { name: "Book 39", length1: 14 }, { name: "Book 40", length1: 14 },
		{ name: "Book 41", length1: 15 }, { name: "Book 42", length1: 14 }, { name: "Book 43", length1: 14 }, { name: "Book 44", length1: 15 }
	]

	booksSound = [
		['https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book1%2F0.mp3?alt=media&token=0b84364b-3ba9-4ada-9075-c52177d36ab0',
			'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book1%2F1.mp3?alt=media&token=f10bff45-9636-4f2f-ba4f-2fcc4f0fd72f',
			'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book1%2F2.mp3?alt=media&token=e7789882-9c38-45e1-ac4a-93f5df18f83c',
			'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book1%2F3.mp3?alt=media&token=3e1d2478-f2c7-41e3-b0b5-0c6437ba32fc',
			'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book1%2F4.mp3?alt=media&token=0eb96957-032e-44c0-8e1a-4d044c11b4f3',
			'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book1%2F5.mp3?alt=media&token=b1b817b9-a3f1-4ae6-8eaa-b2ab1da64e5b',
			'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book1%2F6.mp3?alt=media&token=33ef2081-b6ef-49db-9390-4a7a44a78f49'],
		['https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book2%2F0.mp3?alt=media&token=b7b84556-d1bf-4ba2-9235-a4ae95600d49',
			'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book2%2F1.mp3?alt=media&token=6d0e889e-9801-401a-a226-6b9622df0ce4',
			'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book2%2F2.mp3?alt=media&token=2cf1e744-b639-4dae-8a0e-9a20244a547b',
			'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book2%2F3.mp3?alt=media&token=f094d176-5551-4ba6-9c62-b45dbc0aa347',
			'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book2%2F4.mp3?alt=media&token=a4d8ee65-90b5-4b80-9752-54d9870bad66',
			'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book2%2F4.mp3?alt=media&token=a4d8ee65-90b5-4b80-9752-54d9870bad66',
			'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book2%2F4.mp3?alt=media&token=a4d8ee65-90b5-4b80-9752-54d9870bad66']
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
			src: 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book1%2F0.mp3?alt=media&token=0b84364b-3ba9-4ada-9075-c52177d36ab0',
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
		
		this.currentPic = 1;
		let len = index + 1;
		this.audioIndex = index;
		this.currentBookIndex = len;
		this.bookName = "Book " + len;
		console.log(this.bookName);
		this.bookLocation = "assets/books/" + this.bookName + "/" + this.currentPic + ".jpg";
		let book = "book" + len + "url" + index;
		//this.myTracks[0].src = this.booksSound[this.audioIndex][this.currentPic - 1];
		//this.myTracks[0].src = 'https://firebasestorage.googleapis.com/v0/b/audio-pdf-app.appspot.com/o/book2%2F2.mp3?alt=media&token=2cf1e744-b639-4dae-8a0e-9a20244a547b';
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

		if (this.currentPic > 1) {
			this.currentPic = this.currentPic - 1;
			this.bookLocation = "assets/books/" + this.bookName + "/" + this.currentPic + ".jpg";
			//	this.myTracks[0].src = 'gs://audio-pdf-app.appspot.com/'+ 'book' + this.audioIndex + '/' + this.currentPic + ".mp3";
			//this.myTracks[0].src = this.booksSound[this.audioIndex][this.currentPic - 1];
			console.log(this.myTracks[0].src);
			this.myTracks[0] = {
				src: this.booksSound[this.audioIndex][this.currentPic - 1],
				preload: 'metadata' // tell the plugin to preload metadata such as duration for this track, set to 'none' to turn off
			}
		}
	}

	next() {

		if (this.currentPic < this.books[this.currentBookIndex].length1) {
			this.currentPic = this.currentPic + 1;
			this.bookLocation = "assets/books/" + this.bookName + "/" + this.currentPic + ".jpg";
			//this.myTracks[0].src = this.booksSound[this.audioIndex][this.currentPic - 1];
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

